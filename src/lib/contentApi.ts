import type { SiteContent } from "@/types/content";

const STORAGE_KEY = "bliss-site-content";

export function loadLocalContent(): SiteContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

export function saveLocalContent(content: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // localStorage full (e.g. large images) — server save is primary
  }
}

export async function fetchRemoteContent(): Promise<SiteContent | null> {
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as SiteContent;
  } catch {
    return null;
  }
}

export async function saveRemoteContent(
  content: SiteContent,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Password": password,
      },
      body: JSON.stringify(content),
      keepalive: true,
    });

    if (res.ok) return { ok: true };

    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error ?? "save_failed" };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
