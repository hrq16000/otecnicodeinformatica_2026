/**
 * TESTES NEGATIVOS E DE NÃO-REGRESSÃO DOS GATES
 * ---------------------------------------------
 * Um gate só é confiável quando REPROVA o defeito que promete detectar e
 * APROVA o estado saudável. Aqui montamos projetos-fixture mínimos em /tmp
 * (src/routes + public/sitemap*.xml) e executamos o gate real com `cwd` na
 * fixture, sem tocar no repositório.
 *
 * Cobertura:
 *   FAIL_BROKEN_LINK          link interno para rota inexistente
 *   FAIL_MISSING_STATIC_FILE  asset referenciado que não existe
 *   FAIL_SITEMAP_WITHOUT_ROUTE  URL no sitemap sem arquivo de rota (rota stale)
 *   FAIL_NON_CANONICAL_DOMAIN URL de outro domínio no sitemap
 *   WARN_ORPHAN_INDEXABLE     URL indexável sem link interno (--strict)
 *   não-regressão             fixture saudável passa; asset existente não falha
 */
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";

const REPO = process.cwd();
const GATE = join(REPO, "scripts/check-internal-links.mjs");
const DOMAIN = "exemplo-fixture.com.br";
const BASE = `https://${DOMAIN}`;

let raiz;

const escrever = (rel, conteudo) => {
  const alvo = join(raiz, rel);
  mkdirSync(dirname(alvo), { recursive: true });
  writeFileSync(alvo, conteudo);
};

/** Cria uma rota de arquivo TanStack válida. */
const rota = (arquivo, pattern) =>
  escrever(
    `src/routes/${arquivo}`,
    `import { createFileRoute } from "@tanstack/react-router";\n` +
      `export const Route = createFileRoute("${pattern}")({ component: () => null });\n`,
  );

const sitemap = (paths) =>
  escrever(
    "public/sitemap-main.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset>${paths
      .map((p) => `<url><loc>${p.startsWith("http") ? p : `${BASE}${p}`}</loc></url>`)
      .join("")}</urlset>`,
  );

/** Executa o gate na fixture; devolve { code, saida }. */
const rodar = (args = []) => {
  try {
    const saida = execFileSync("node", [GATE, ...args], {
      cwd: raiz,
      encoding: "utf8",
      env: { ...process.env, VITE_SITE_DOMAIN: DOMAIN },
    });
    return { code: 0, saida };
  } catch (e) {
    return { code: e.status ?? 1, saida: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
};

/** Fixture saudável: home + /servicos, ambos linkados, sitemap coerente. */
const fixtureSaudavel = () => {
  rota("index.tsx", "/");
  rota("servicos.tsx", "/servicos");
  escrever(
    "src/components/Nav.tsx",
    `export const Nav = () => (<nav><a href="/">Home</a><a href="/servicos">Serviços</a></nav>);\n`,
  );
  sitemap(["/", "/servicos"]);
};

beforeEach(() => {
  raiz = mkdtempSync(join(tmpdir(), "gate-fixture-"));
  mkdirSync(join(raiz, "public"), { recursive: true });
});

afterEach(() => rmSync(raiz, { recursive: true, force: true }));

describe("check-internal-links — testes negativos", () => {
  it("reprova link interno para rota inexistente", () => {
    fixtureSaudavel();
    escrever("src/components/Quebrado.tsx", `export const X = () => <a href="/rota-que-nao-existe">ir</a>;\n`);
    const { code, saida } = rodar();
    expect(code).toBe(1);
    expect(saida).toContain("FAIL_BROKEN_LINK");
    expect(saida).toContain("/rota-que-nao-existe");
  });

  it("reprova asset referenciado que não existe em public/ nem dist/", () => {
    fixtureSaudavel();
    escrever("src/components/Foto.tsx", `export const F = () => <img src="/x.png" />;\n`);
    escrever("src/components/Link.tsx", `export const L = () => <a href="/imagens/inexistente.pdf">baixar</a>;\n`);
    const { code, saida } = rodar();
    expect(code).toBe(1);
    expect(saida).toContain("FAIL_MISSING_STATIC_FILE");
    expect(saida).toContain("/imagens/inexistente.pdf");
  });

  it("reprova URL no sitemap sem rota correspondente (rota stale)", () => {
    fixtureSaudavel();
    sitemap(["/", "/servicos", "/pagina-removida"]);
    const { code, saida } = rodar();
    expect(code).toBe(1);
    expect(saida).toContain("FAIL_SITEMAP_WITHOUT_ROUTE");
    expect(saida).toContain("/pagina-removida");
  });

  it("reprova URL de domínio não canônico no sitemap", () => {
    fixtureSaudavel();
    sitemap(["/", "https://outro-dominio.com/servicos"]);
    const { code, saida } = rodar();
    expect(code).toBe(1);
    expect(saida).toContain("FAIL_NON_CANONICAL_DOMAIN");
  });

  it("acusa página órfã indexável e falha apenas em --strict", () => {
    rota("index.tsx", "/");
    rota("orfa.tsx", "/orfa");
    escrever("src/components/Nav.tsx", `export const Nav = () => <a href="/">Home</a>;\n`);
    sitemap(["/", "/orfa"]);

    const brando = rodar();
    expect(brando.code).toBe(0);
    expect(brando.saida).toContain("WARN_ORPHAN_INDEXABLE");

    const estrito = rodar(["--strict"]);
    expect(estrito.code).toBe(1);
  });
});

describe("check-internal-links — não-regressão (não pode falhar indevidamente)", () => {
  it("aprova fixture saudável", () => {
    fixtureSaudavel();
    const { code, saida } = rodar();
    expect(code).toBe(0);
    expect(saida).toContain("Nenhum link quebrado");
  });

  it("não acusa asset que existe em public/", () => {
    fixtureSaudavel();
    escrever("public/documento.pdf", "%PDF-1.4\n");
    escrever("src/components/Doc.tsx", `export const D = () => <a href="/documento.pdf">baixar</a>;\n`);
    const { code, saida } = rodar();
    expect(code).toBe(0);
    expect(saida).not.toContain("FAIL_MISSING_STATIC_FILE");
  });

  it("não acusa rotas privadas (/admin, /api) como link quebrado", () => {
    fixtureSaudavel();
    escrever("src/components/Admin.tsx", `export const A = () => <a href="/admin/painel">painel</a>;\n`);
    const { code, saida } = rodar();
    expect(code).toBe(0);
    expect(saida).not.toContain("FAIL_BROKEN_LINK");
  });

  it("resolve segmentos dinâmicos ($slug) sem marcar link quebrado", () => {
    fixtureSaudavel();
    rota("blog_.$slug.tsx", "/blog_/$slug");
    escrever("src/components/Post.tsx", `export const P = () => <a href="/blog/algum-artigo">ler</a>;\n`);
    const { code, saida } = rodar();
    expect(code).toBe(0);
    expect(saida).not.toContain("FAIL_BROKEN_LINK");
  });

  it("é fail-closed quando src/routes não existe", () => {
    sitemap(["/"]);
    const { code, saida } = rodar();
    expect(code).toBe(1);
    expect(saida).toContain("UNKNOWN_ROUTES_DIR_MISSING");
  });
});
