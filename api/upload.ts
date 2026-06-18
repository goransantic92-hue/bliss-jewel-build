import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_BYTES = 4_000_000;

function isAuthorized(req: VercelRequest): boolean {
  const password = req.headers["x-admin-password"];
  const expected = process.env.ADMIN_PASSWORD ?? process.env.VITE_ADMIN_PASSWORD ?? "bliss2026";
  return typeof password === "string" && password === expected;
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
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "method_not_allowed" });
    }

    if (!isAuthorized(req)) {
      return res.status(401).json({ error: "unauthorized" });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(503).json({ error: "storage_not_configured" });
    }

    const body = parseBody(req) as { filename?: string; contentType?: string; data?: string } | null;
    if (!body?.data || typeof body.data !== "string") {
      return res.status(400).json({ error: "invalid_body" });
    }

    const buffer = Buffer.from(body.data, "base64");
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: "file_too_large" });
    }

    const safeName = (body.filename ?? "upload")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 120);
    const pathname = `cms/${Date.now()}-${safeName}`;

    const { put } = await import("@vercel/blob");
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: body.contentType || "application/octet-stream",
      addRandomSuffix: false,
    });

    return res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error("API /upload failed:", error);
    return res.status(500).json({ error: "upload_failed" });
  }
}
