import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroTriagem } from "./HeroTriagem";

describe("Home — destino interno da triagem", () => {
  it("expõe no HTML SSR o alvo de /#triagem no próprio formulário", () => {
    const html = renderToStaticMarkup(<HeroTriagem />);
    expect(html).toMatch(/<form\b[^>]*\bid="triagem"[^>]*\brole="search"/);
    expect(html).toContain('aria-label="Descreva o que está acontecendo"');
    expect(html).toContain('scroll-mt-[var(--site-header-space)]');
    expect(html).toContain('id="triagem-sintoma"');
  });
});
