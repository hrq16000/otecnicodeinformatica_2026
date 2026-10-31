import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { resolveRedirect } from "./lib/redirectMatrix";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const CANONICAL_HOST = "otecnicodeinformatica.com.br";

/**
 * Redirecionamento HTTP 301 na borda SSR para aliases oficiais.
 * Um alias nao e pagina indexavel: preserva a query e vai em um salto ao
 * destino canônico, antes do roteador TanStack emitir 404 para a URL antiga.
 *
 * GET/HEAD apenas; POST e outros metodos nunca sofrem redirects silenciosos.
 * Usa a matriz unica (incluindo aliases editoriais), sem lista paralela.
 */
export function canonicalAliasRedirect(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const destino = resolveRedirect(url.pathname);
  if (!destino || destino === url.pathname) return null;

  url.pathname = destino;
  if (url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
  }
  return Response.redirect(url.toString(), 301);
}

export function canonicalHostRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const isCanonicalDomain =
    url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;

  // Não interfere em previews, localhost ou domínios internos do provedor.
  if (!isCanonicalDomain) return null;

  if (url.protocol === "https:" && url.hostname === CANONICAL_HOST) return null;

  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";

  return Response.redirect(url.toString(), 308);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const aliasRedirect = canonicalAliasRedirect(request);
      if (aliasRedirect) return aliasRedirect;
      const canonicalRedirect = canonicalHostRedirect(request);
      if (canonicalRedirect) return canonicalRedirect;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
