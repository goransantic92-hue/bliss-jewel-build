import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStorageStatus, readStoredContent, writeStoredContent } from "./_lib/storage";

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
    if (!result.ok) {
      return res.status(result.error === "storage_not_configured" ? 503 : 500).json({
        error: result.error,
        storage: getStorageStatus(),
      });
    }

    return res.status(200).json({ ok: true, storage: getStorageStatus() });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "method_not_allowed" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
