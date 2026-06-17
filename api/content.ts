import type { VercelRequest, VercelResponse } from "@vercel/node";
import { head, put } from "@vercel/blob";

const BLOB_PATHNAME = "bliss-site-content.json";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const blob = await head(BLOB_PATHNAME);
      const response = await fetch(blob.url);
      if (!response.ok) {
        return res.status(404).json({ error: "not_found" });
      }
      const data = await response.json();
      return res.status(200).json(data);
    } catch {
      return res.status(404).json({ error: "not_found" });
    }
  }

  if (req.method === "PUT") {
    const password = req.headers["x-admin-password"];
    const expected = process.env.ADMIN_PASSWORD ?? process.env.VITE_ADMIN_PASSWORD ?? "bliss2026";

    if (typeof password !== "string" || password !== expected) {
      return res.status(401).json({ error: "unauthorized" });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(503).json({ error: "blob_not_configured" });
    }

    try {
      await put(BLOB_PATHNAME, JSON.stringify(req.body), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Failed to save content:", error);
      return res.status(500).json({ error: "save_failed" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "method_not_allowed" });
}
