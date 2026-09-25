#!/usr/bin/env node
/**
 * Servidor HTTP local para o Worker Cloudflare gerado em dist/server.
 *
 * Diferentemente do `vite dev`, executa o bundle e os assets de produção.
 * Destina-se a smoke tests e Lighthouse após `npm run build`.
 *
 * Uso: node scripts/serve-worker-build.mjs [porta]
 */
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";
import { brotliCompress, constants as zlibConstants, gzip } from "node:zlib";

const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const ROOT = process.cwd();
const CLIENT_DIR = path.resolve(ROOT, "dist/client");
const WORKER_ENTRY = path.resolve(ROOT, "dist/server/index.mjs");
const compressBrotli = promisify(brotliCompress);
const compressGzip = promisify(gzip);

const MIME = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const workerModule = await import(pathToFileURL(WORKER_ENTRY).href);
const worker = workerModule.default;

const COMPRESSIBLE_CONTENT =
  /^(?:text\/|application\/(?:javascript|json|manifest\+json|xml))/i;

async function encodeBody(body, acceptEncoding, contentType) {
  if (body.byteLength < 1024 || !COMPRESSIBLE_CONTENT.test(contentType || "")) {
    return { body };
  }
  if (/\bbr\b/i.test(acceptEncoding || "")) {
    return {
      body: await compressBrotli(body, {
        params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 4 },
      }),
      encoding: "br",
    };
  }
  if (/\bgzip\b/i.test(acceptEncoding || "")) {
    return { body: await compressGzip(body), encoding: "gzip" };
  }
  return { body };
}

async function assetFetch(request) {
  const url = new URL(request.url);
  const decoded = decodeURIComponent(url.pathname);
  const relative = decoded.replace(/^\/+/, "");
  const candidate = path.resolve(CLIENT_DIR, relative);
  if (
    candidate !== CLIENT_DIR &&
    !candidate.startsWith(`${CLIENT_DIR}${path.sep}`)
  ) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const info = await stat(candidate);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    const body = request.method === "HEAD" ? null : await readFile(candidate);
    return new Response(body, {
      status: 200,
      headers: {
        "content-type":
          MIME[path.extname(candidate).toLowerCase()] ||
          "application/octet-stream",
        "content-length": String(info.size),
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = `http://${req.headers.host || `127.0.0.1:${PORT}`}${req.url || "/"}`;
    const init = {
      method: req.method,
      headers: req.headers,
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = req;
      init.duplex = "half";
    }

    const response = await worker.fetch(
      new Request(url, init),
      { ASSETS: { fetch: assetFetch } },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    res.statusCode = response.status;
    for (const [name, value] of response.headers) res.setHeader(name, value);
    if (req.method === "HEAD" || !response.body) return res.end();
    const originalBody = Buffer.from(await response.arrayBuffer());
    const alreadyEncoded = response.headers.has("content-encoding");
    const encoded = alreadyEncoded
      ? { body: originalBody }
      : await encodeBody(
          originalBody,
          String(req.headers["accept-encoding"] || ""),
          response.headers.get("content-type") || "",
        );
    if (encoded.encoding) {
      res.setHeader("content-encoding", encoded.encoding);
      res.setHeader("vary", "Accept-Encoding");
    }
    res.setHeader("content-length", String(encoded.body.byteLength));
    res.end(encoded.body);
  } catch (error) {
    console.error("[serve-worker-build]", error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[serve-worker-build] http://127.0.0.1:${PORT}`);
});
