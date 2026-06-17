import { list, put } from "@vercel/blob";

const STORAGE_KEY = "bliss-site-content";
const BLOB_PATHNAME = "bliss-site-content.json";

export type StorageError = "storage_not_configured" | "read_failed" | "write_failed";

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function readFromRedis(): Promise<unknown | null> {
  const cfg = redisConfig();
  if (!cfg) return null;

  try {
    const res = await fetch(`${cfg.url}/get/${encodeURIComponent(STORAGE_KEY)}`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: string | null };
    if (!json.result) return null;
    return JSON.parse(json.result) as unknown;
  } catch (error) {
    console.error("Redis read failed:", error);
    return null;
  }
}

async function writeToRedis(data: unknown): Promise<boolean> {
  const cfg = redisConfig();
  if (!cfg) return false;

  try {
    const res = await fetch(`${cfg.url}/set/${encodeURIComponent(STORAGE_KEY)}/${encodeURIComponent(JSON.stringify(data))}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}` },
    });
    return res.ok;
  } catch (error) {
    console.error("Redis write failed:", error);
    return false;
  }
}

export async function readStoredContent(): Promise<unknown | null> {
  const fromRedis = await readFromRedis();
  if (fromRedis) return fromRedis;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
      const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME) ?? blobs[0];
      if (!blob) return null;

      const response = await fetch(blob.url, { cache: "no-store" });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Blob read failed:", error);
    }
  }

  return null;
}

export async function writeStoredContent(data: unknown): Promise<{ ok: true } | { ok: false; error: StorageError }> {
  if (redisConfig()) {
    const ok = await writeToRedis(data);
    return ok ? { ok: true } : { ok: false, error: "write_failed" };
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_PATHNAME, JSON.stringify(data), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return { ok: true };
    } catch (error) {
      console.error("Blob write failed:", error);
      return { ok: false, error: "write_failed" };
    }
  }

  return { ok: false, error: "storage_not_configured" };
}

export function getStorageStatus(): "redis" | "blob" | "none" {
  if (redisConfig()) return "redis";
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  return "none";
}
