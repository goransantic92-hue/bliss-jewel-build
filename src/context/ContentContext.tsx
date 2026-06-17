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
import { fetchRemoteContent, saveRemoteContent } from "@/lib/contentApi";
import { syncCategoryLabels } from "@/lib/contentUtils";
import { applyTheme } from "@/lib/theme";
import type { SiteContent } from "@/types/content";

const ContentContext = createContext<ContentContextValue | null>(null);

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type ContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  saveStatus: SaveStatus;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
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

  contentRef.current = content;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchRemoteContent();
      if (!cancelled && remote) {
        setContent(syncCategoryLabels(remote));
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
      const password = getAdminPassword();
      if (!password) return;

      setSaveStatus("saving");
      const result = await saveRemoteContent(next, password);

      if (result.ok) {
        setSaveStatus("saved");
        return;
      }

      setSaveStatus("error");
      if (result.error === "blob_not_configured") {
        toast.error("Vercel Blob nije podešen", {
          description: "U Vercel dashboardu dodaj Blob storage za ovaj projekat.",
        });
      } else if (result.error === "network_error") {
        toast.error("Nema konekcije sa serverom");
      } else {
        toast.error("Čuvanje nije uspelo");
      }
    },
    [getAdminPassword]
  );

  const scheduleSave = useCallback(
    (next: SiteContent) => {
      if (!isAdmin) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        void persistContent(next);
      }, 600);
    },
    [isAdmin, persistContent]
  );

  const updateContent = useCallback(
    (updater: (prev: SiteContent) => SiteContent) => {
      setContent((prev) => {
        const next = syncCategoryLabels(updater(prev));
        scheduleSave(next);
        return next;
      });
    },
    [scheduleSave]
  );

  const resetContent = useCallback(() => {
    const next = syncCategoryLabels(DEFAULT_CONTENT);
    setContent(next);
    scheduleSave(next);
  }, [scheduleSave]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

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
      resetContent,
      getProductBySlug,
      getCollectionBySlug,
    }),
    [content, isLoading, saveStatus, updateContent, resetContent, getProductBySlug, getCollectionBySlug]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
