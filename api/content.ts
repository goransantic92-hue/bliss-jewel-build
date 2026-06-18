import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient, type RedisClientType } from "redis";

const STORAGE_KEY = "bliss-site-content";
const BLOB_PATHNAME = "bliss-site-content.json";

type StorageError = "storage_not_configured" | "write_failed";

function getStorageStatus(): "redis" | "blob" | "upstash" | "none" {
  if (process.env.REDIS_URL) return "redis";
  if (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) return "upstash";
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  return "none";
}

async function withRedis<T>(fn: (client: RedisClientType) => Promise<T>): Promise<T | null> {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  const client = createClient({ url });
  client.on("error", (error) => console.error("Redis client error:", error));

  try {
    await client.connect();
    return await fn(client as RedisClientType);
  } catch (error) {
    console.error("Redis operation failed:", error);
    return null;
  } finally {
    try {
      await client.quit();
    } catch {
      // ignore disconnect errors
    }
  }
}

function upstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function upstashCommand<T>(command: (string | number)[]): Promise<T | null> {
  const cfg = upstashConfig();
  if (!cfg) return null;

  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { result?: T };
  return json.result ?? null;
}

async function readFromRedis(): Promise<unknown | null> {
  if (process.env.REDIS_URL) {
    const raw = await withRedis(async (client) => client.get(STORAGE_KEY));
    if (!raw || typeof raw !== "string") return null;
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  }

  try {
    const raw = await upstashCommand<string>(["GET", STORAGE_KEY]);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch (error) {
    console.error("Upstash read failed:", error);
    return null;
  }
}

async function writeToRedis(data: unknown): Promise<boolean> {
  const payload = JSON.stringify(data);

  if (process.env.REDIS_URL) {
    const result = await withRedis(async (client) => client.set(STORAGE_KEY, payload));
    return result === "OK";
  }

  const result = await upstashCommand<string>(["SET", STORAGE_KEY, payload]);
  return result === "OK";
}

async function readFromBlob(): Promise<unknown | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME) ?? blobs[0];
    if (!blob) return null;

    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Blob read failed:", error);
    return null;
  }
}

async function writeToBlob(data: unknown): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;

  try {
    const { put } = await import("@vercel/blob");
    await put(BLOB_PATHNAME, JSON.stringify(data), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return true;
  } catch (error) {
    console.error("Blob write failed:", error);
    return false;
  }
}

async function readStoredContent(): Promise<unknown | null> {
  return (await readFromRedis()) ?? (await readFromBlob());
}

async function writeStoredContent(data: unknown): Promise<{ ok: true } | { ok: false; error: StorageError }> {
  if (process.env.REDIS_URL || upstashConfig()) {
    const ok = await writeToRedis(data);
    return ok ? { ok: true } : { ok: false, error: "write_failed" };
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const ok = await writeToBlob(data);
    return ok ? { ok: true } : { ok: false, error: "write_failed" };
  }

  return { ok: false, error: "storage_not_configured" };
}

function parseBody(req: VercelRequest): unknown | null {
  if (!req.body) return null;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const data = await readStoredContent();
      if (!data) {
        return res.status(404).json({ error: "not_found", storage: getStorageStatus() });
      }
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const password = req.headers["x-admin-password"];
      const expected = process.env.ADMIN_PASSWORD ?? process.env.VITE_ADMIN_PASSWORD ?? "bliss2026";

      if (typeof password !== "string" || password !== expected) {
        return res.status(401).json({ error: "unauthorized" });
      }

      const body = parseBody(req);
      if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "invalid_body" });
      }

      const result = await writeStoredContent(body);
      if (result.ok === false) {
        return res.status(result.error === "storage_not_configured" ? 503 : 500).json({
          error: result.error,
          storage: getStorageStatus(),
        });
      }

      return res.status(200).json({ ok: true, storage: getStorageStatus() });
    }

    res.setHeader("Allow", "GET, PUT");
    return res.status(405).json({ error: "method_not_allowed" });
  } catch (error) {
    console.error("API /content failed:", error);
    return res.status(500).json({ error: "internal_error", storage: getStorageStatus() });
  }
}
