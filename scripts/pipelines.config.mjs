/**
 * Fonte única dos três comandos oficiais do projeto.
 *
 *   npm run verify        → gates essenciais de código/conteúdo (não precisa de dist/)
 *   npm run build         → build completo (prebuild + vite build + postbuild)
 *   npm run deploy:check  → gates essenciais de publicação (precisa de dist/)
 *
 * Regras:
 * - Cada passo aponta para um script npm que continua existindo isoladamente
 *   (diagnóstico avançado permanece disponível).
 * - `optional: true` marca passos que dependem de rede/credenciais externas:
 *   falham como aviso, nunca bloqueiam sozinhos.
 * - Nada aqui substitui gates; apenas orquestra os já existentes.
 */

/** @typedef {{ name: string, script: string, optional?: boolean, why?: string }} PipelineStep */

/** @type {PipelineStep[]} */
export const verifySteps = [
  { name: 'Biome (correctness/suspicious)', script: 'lint:biome' },
  { name: 'Motion system (classes legadas)', script: 'lint:motion' },
  { name: 'Testes unitários e de integração', script: 'test' },
  { name: 'Árvore de rotas (TanStack)', script: 'check:route-tree' },
  { name: 'Exports ausentes', script: 'check:missing-exports' },
  { name: 'Isolamento de marca', script: 'check:brand-isolation' },
  { name: 'Contato canônico (WhatsApp único)', script: 'check:canonical-contact' },
  { name: 'Claims de confiança (E-E-A-T)', script: 'check:trust-claims' },
  { name: 'Governança editorial', script: 'check:editorial-governance' },
  { name: 'Links internos', script: 'check:internal-links' },
  { name: 'Qualidade dos interlinks', script: 'check:interlinks-quality' },
  { name: 'Catraca anti-órfãs', script: 'check:orphan-ratchet' },
  { name: 'Canibalização de intenção', script: 'check:cannibalization' },
  { name: 'Duplicatas em /problemas', script: 'check:problem-duplicates' },
  { name: 'Intenção em /problemas', script: 'check:problem-intent' },
  { name: 'Mapa de autoridade nacional', script: 'check:national-authority-map' },
  { name: 'Imagens reais (anti-IA)', script: 'check:ai-images' },
  { name: 'Privacidade das fotos (EXIF/GPS)', script: 'check:photos' },
  { name: 'Segurança (regressões, exposição, baseline)', script: 'check:security' },
  { name: 'Contrato de eventos de analytics', script: 'check:analytics-event-contract' },
  { name: 'PII em analytics', script: 'check:analytics-pii' },
];

/** @type {PipelineStep[]} */
export const deployCheckSteps = [
  { name: 'Env de observabilidade', script: 'check:observability-env' },
  { name: 'Sitemap editorial sincronizado', script: 'check:editorial-sitemap' },
  { name: 'Sitemap dinâmico (curado, fail-closed)', script: 'sitemap:dynamic:check' },
  { name: 'robots.txt e X-Robots-Tag', script: 'check:robots' },
  { name: 'Cabeçalhos de indexação', script: 'check:index-headers' },
  { name: 'Conformidade GEO (meta, OG/Twitter, canonical)', script: 'check:geo' },
  { name: 'Padrões de schema.org', script: 'check:schema-standards' },
  { name: 'JSON-LD determinístico em SSR', script: 'check:jsonld-ssr' },
  { name: 'JSON-LD validado (snapshots SSR)', script: 'validate:jsonld' },
  { name: 'Rich results (strict)', script: 'check:rich-results:strict' },
  { name: 'Paridade de breadcrumb', script: 'check:breadcrumb-parity' },
  { name: 'Unicidade de title/description', script: 'check:meta-uniqueness' },
  { name: 'Alt text real das imagens', script: 'check:image-alt' },
  { name: 'Créditos e licenças das imagens', script: 'check:image-credits' },
  { name: 'WhatsApp oculto no DOM', script: 'check:wa-number-dom' },
  { name: 'Vazamento de contato (CNPJ/e-mail/telefone)', script: 'check:contact-leak' },
  { name: 'Status do sitemap enviado', script: 'check:sitemap-status', optional: true, why: 'depende de credenciais do Search Console' },
  { name: 'Vereditos editoriais', script: 'report:editorial-verdicts', optional: true, why: 'depende de dados reais do GSC' },
  { name: 'Smoke pós-deploy', script: 'smoke:pos-deploy', optional: true, why: 'depende do site publicado responder' },
  { name: 'Relatório de indexação pós-deploy', script: 'report:post-deploy-indexacao', optional: true, why: 'depende de APIs de indexação' },
];

export const pipelines = {
  verify: {
    title: 'verify — gates essenciais de código e conteúdo',
    steps: verifySteps,
  },
  'deploy:check': {
    title: 'deploy:check — gates essenciais de publicação (exige dist/)',
    steps: deployCheckSteps,
    requiresDist: true,
  },
};
