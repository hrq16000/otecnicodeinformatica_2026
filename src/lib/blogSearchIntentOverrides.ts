/**
 * Ajustes editoriais de intenção para artigos que já possuem conteúdo forte,
 * mas precisam responder consultas distintas observadas no Search Console.
 *
 * Regras:
 * - não cria URL;
 * - não altera indexabilidade;
 * - não substitui o corpo editorial;
 * - title/excerpt precisam continuar coerentes com o conteúdo já publicado;
 * - usado tanto no SSR quanto na página hidratada para evitar divergência.
 */

export interface BlogSearchIntentOverride {
  title?: string;
  excerpt?: string;
  intent: "definicao" | "fundamentos" | "aprendizagem";
}

export const BLOG_SEARCH_INTENT_OVERRIDES: Record<string, BlogSearchIntentOverride> = {
  "o-que-e-informatica": {
    title: "O que é informática? Significado, definição e exemplos",
    excerpt:
      "O que significa informática? Veja a definição, exemplos, áreas que ela abrange e as diferenças entre informática, computação e TI.",
    intent: "definicao",
  },
  "informatica-basica": {
    title: "Informática básica: conteúdos, noções e resumo para iniciantes",
    excerpt:
      "Informática básica: resumo dos conhecimentos e noções essenciais, com arquivos, internet, e-mail, texto, planilhas, segurança e hardware.",
    intent: "fundamentos",
  },
  "como-aprender-informatica": {
    excerpt:
      "Como aprender informática do zero: roteiro passo a passo para iniciantes, com sequência de estudo, prática e objetivos para trabalho ou concurso.",
    intent: "aprendizagem",
  },
};

export function applyBlogSearchIntent<T extends { title: string; excerpt: string }>(
  slug: string | null | undefined,
  post: T,
): T {
  if (!slug) return post;
  const override = BLOG_SEARCH_INTENT_OVERRIDES[slug];
  if (!override) return post;

  return {
    ...post,
    ...(override.title ? { title: override.title } : {}),
    ...(override.excerpt ? { excerpt: override.excerpt } : {}),
  };
}
