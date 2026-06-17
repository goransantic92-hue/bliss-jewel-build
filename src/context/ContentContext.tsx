import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CONTENT } from "@/data/defaultContent";
import { syncCategoryLabels } from "@/lib/contentUtils";
import { applyTheme } from "@/lib/theme";
import type { SiteContent } from "@/types/content";

const STORAGE_KEY = "bliss-site-content";

const ContentContext = createContext<ContentContextValue | null>(null);

type ContentContextValue = {
  content: SiteContent;
  isLoading: boolean;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  resetContent: () => void;
  getProductBySlug: (slug: string) => SiteContent["products"][0] | undefined;
  getCollectionBySlug: (slug: string) => SiteContent["collections"][0] | undefined;
};

function loadFromStorage(): SiteContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return syncCategoryLabels(JSON.parse(raw) as SiteContent);
  } catch {
    return null;
  }
}

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
  const [content, setContent] = useState<SiteContent>(() => syncCategoryLabels(DEFAULT_CONTENT));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = loadFromStorage();
      if (stored) {
        if (!cancelled) setContent(stored);
        if (!cancelled) setIsLoading(false);
        return;
      }
      const remote = await loadFromPublic();
      if (!cancelled && remote) setContent(remote);
      if (!cancelled) setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      applyTheme(content.theme);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  }, [content, isLoading]);

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => syncCategoryLabels(updater(prev)));
  }, []);

  const resetContent = useCallback(() => {
    setContent(syncCategoryLabels(DEFAULT_CONTENT));
    localStorage.removeItem(STORAGE_KEY);
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
      updateContent,
      resetContent,
      getProductBySlug,
      getCollectionBySlug,
    }),
    [content, isLoading, updateContent, resetContent, getProductBySlug, getCollectionBySlug]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
