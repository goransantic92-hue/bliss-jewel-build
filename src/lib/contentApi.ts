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

const MAX_CONTENT_BYTES = 4_000_000;

export function getContentPayloadSize(content: SiteContent): number {
  return new TextEncoder().encode(JSON.stringify(content)).length;
}

export async function uploadMedia(
  file: File,
  password: string
): Promise<{ ok: boolean; url?: string; error?: string }> {
  if (file.size > MAX_CONTENT_BYTES) {
    return { ok: false, error: "file_too_large" };
  }

  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Password": password,
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        data: btoa(binary),
      }),
    });

    if (res.ok) {
      const body = (await res.json()) as { url?: string };
      if (body.url) return { ok: true, url: body.url };
    }

    if (res.status === 401) return { ok: false, error: "unauthorized" };
    if (res.status === 413) return { ok: false, error: "file_too_large" };

    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error ?? "upload_failed" };
  } catch {
    return { ok: false, error: "network_error" };
  }
}

export async function saveRemoteContent(
  content: SiteContent,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (getContentPayloadSize(content) > MAX_CONTENT_BYTES) {
    return { ok: false, error: "payload_too_large" };
  }

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

    if (res.status === 401) return { ok: false, error: "unauthorized" };
    if (res.status === 413) return { ok: false, error: "payload_too_large" };

    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error ?? "save_failed" };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
