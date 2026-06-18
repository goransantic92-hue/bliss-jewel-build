import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { DEFAULT_CONTENT } from "@/data/defaultContent";
import { useAuth } from "@/context/AuthContext";
import {
  fetchRemoteContent,
  loadLocalContent,
  saveLocalContent,
  saveRemoteContent,
} from "@/lib/contentApi";
import { syncCategoryLabels } from "@/lib/contentUtils";
import { applyTheme } from "@/lib/theme";
import type { SiteContent } from "@/types/content";

const ContentContext = createContext<ContentContextValue | null>(null);

export type SaveStatus = "idle" | "saving" | "saved" | "error" | "local_only";

type UpdateOptions = {
  immediate?: boolean;
};

type ContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  saveStatus: SaveStatus;
  updateContent: (updater: (prev: SiteContent) => SiteContent, options?: UpdateOptions) => void;
  saveNow: () => Promise<void>;
  resetContent: () => void;
  getProductBySlug: (slug: string) => SiteContent["products"][0] | undefined;
  getCollectionBySlug: (slug: string) => SiteContent["collections"][0] | undefined;
};

async function loadFromPublic(): Promise<SiteContent | null> {
  try {
    const res = await fetch("/site-content.json", { cache: "no-cache" });
    if (!res.ok) return null;
    return syncCategoryLabels((await res.json()) as SiteContent);
  } catch {
    return null;
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const { isAdmin, getAdminPassword } = useAuth();
  const [content, setContent] = useState<SiteContent>(() => syncCategoryLabels(DEFAULT_CONTENT));
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const contentRef = useRef(content);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSaveRef = useRef(false);

  contentRef.current = content;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchRemoteContent();
      if (!cancelled && remote) {
        const synced = syncCategoryLabels(remote);
        setContent(synced);
        saveLocalContent(synced);
        setIsLoading(false);
        return;
      }

      const local = loadLocalContent();
      if (!cancelled && local) {
        setContent(syncCategoryLabels(local));
        setIsLoading(false);
        return;
      }

      const file = await loadFromPublic();
      if (!cancelled && file) setContent(file);
      if (!cancelled) setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) applyTheme(content.theme);
  }, [content.theme, isLoading]);

  const persistContent = useCallback(
    async (next: SiteContent) => {
      saveLocalContent(next);

      const password = getAdminPassword();
      if (!password) {
        setSaveStatus("local_only");
        return;
      }

      pendingSaveRef.current = false;
      setSaveStatus("saving");
      const result = await saveRemoteContent(next, password);

      if (result.ok) {
        setSaveStatus("saved");
        return;
      }

      setSaveStatus(result.error === "storage_not_configured" ? "local_only" : "error");

      if (result.error === "storage_not_configured") {
        toast.error("Server storage nije podešen", {
          description: "U Vercel → Storage dodaj Blob. Do tada promene su samo u ovom pregledaču.",
        });
      } else if (result.error === "unauthorized") {
        toast.error("Sesija je istekla", {
          description: "Odjavite se i prijavite ponovo sa admin lozinkom.",
        });
      } else if (result.error === "payload_too_large") {
        toast.error("Sadržaj je prevelik za čuvanje", {
          description: "Koristite Upload za slike umesto ugrađivanja. Uklonite stare ugrađene slike ako ih ima.",
        });
      } else if (result.error === "network_error") {
        toast.error("Nema konekcije sa serverom — sačuvano lokalno u pregledaču");
      } else {
        toast.error("Čuvanje na server nije uspelo — sačuvano lokalno u pregledaču");
      }
    },
    [getAdminPassword]
  );

  const saveNow = useCallback(async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    await persistContent(contentRef.current);
  }, [persistContent]);

  const scheduleSave = useCallback(
    (next: SiteContent, immediate = false) => {
      saveLocalContent(next);
      if (!isAdmin) return;

      if (immediate) {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        void persistContent(next);
        return;
      }

      pendingSaveRef.current = true;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        pendingSaveRef.current = false;
        void persistContent(next);
      }, 400);
    },
    [isAdmin, persistContent]
  );

  const updateContent = useCallback(
    (updater: (prev: SiteContent) => SiteContent, options?: UpdateOptions) => {
      setContent((prev) => {
        const next = syncCategoryLabels(updater(prev));
        scheduleSave(next, options?.immediate);
        return next;
      });
    },
    [scheduleSave]
  );

  const resetContent = useCallback(() => {
    const next = syncCategoryLabels(DEFAULT_CONTENT);
    setContent(next);
    scheduleSave(next, true);
  }, [scheduleSave]);

  useEffect(() => {
    const flush = () => {
      if (!pendingSaveRef.current || !isAdmin) return;
      const password = getAdminPassword();
      if (!password) return;
      void saveRemoteContent(contentRef.current, password);
    };

    window.addEventListener("beforeunload", flush);
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("beforeunload", flush);
      window.removeEventListener("pagehide", flush);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [isAdmin, getAdminPassword]);

  const getProductBySlug = useCallback(
    (slug: string) => content.products.find((p) => p.slug === slug),
    [content.products]
  );

  const getCollectionBySlug = useCallback(
    (slug: string) => content.collections.find((c) => c.slug === slug),
    [content.collections]
  );

  const value = useMemo(
    () => ({
      content,
      isLoading,
      saveStatus,
      updateContent,
      saveNow,
      resetContent,
      getProductBySlug,
      getCollectionBySlug,
    }),
    [content, isLoading, saveStatus, updateContent, saveNow, resetContent, getProductBySlug, getCollectionBySlug]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
