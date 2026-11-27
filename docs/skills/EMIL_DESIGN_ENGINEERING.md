# Design engineering premium — análise e adoção Emil Kowalski

**Estado:** R0 + R1.2/R1.3 — diagnóstico estático e auditoria inicial desktop/mobile; implementação NÃO iniciada.
**Data:** 27/11/2026 • **Repositório:** hrq16000/otecnicodeinformatica_2026 • **Checkpoint analisado da main:** `7ed5f7835ece4eb8740489b7c495f0c2e4bbc84f`.

Este documento é incremental. As regras locais de AGENTS.md, DESIGN.md, segurança, SEO, arquitetura, publicação, dados e funis prevalecem. Não autoriza alterações de runtime, instalações, custos, merge ou deploy. Não substitui a homologação visual da versão efetivamente publicada. A auditoria ao vivo posterior (R1.2) está registrada na seção 7; não implica homologação da produção.

## 1. Diagnóstico por projeto (evidência de leitura)

- **Contexto:** Portal técnico editorial SSR.
- **Observação concreta:** Home contém HeroTriagem, TrustStrip, ContextosBento, EncontreSuaSolucao, DiagnosticoIa, FAQ SSR; src/styles.css tem 80 @keyframes e 12 menções a reduced-motion. MotionProvider central já existe.
- **Stack presente (package.json):** @playwright/test 1.56.1, @tanstack/react-start 1.169.5, react ^19.2.0, sonner ^2.0.7, tailwindcss ^4.2.1, vite ^8.3.8, vitest ^4.1.9.
- **Home/entrada observada:** src/routes/index.tsx, src/pages/Index.tsx.
- **CSS amostrado:** src/styles.css (80 @keyframes; 12 referências a prefers-reduced-motion; 1 ocorrências de transição ampla). Contagem textual de declarações, não prova de uso/renderização ou defeito.
- **Documentação local a preservar:** AGENTS.md/README.md e contratos relevantes; nenhum guia específico encontrado na seleção.
- **Oportunidade prioritária (hipótese a validar):** Aproveitar sistema de motion existente; inventariar keyframes e reduzir reveals redundantes/blur de PageHero. Diferenciar diagnóstico, educação e contratação com tipografia e fotos reais.
- **Limite local:** Não criar animações em operações, não copiar marcas ou domínios de outros projetos, não inventar métricas, não tocar em contratos comerciais.

## 2. Fonte primária e repertório

Fonte verificada: [emilkowalski/skills — revisão 64eb3deb](https://github.com/emilkowalski/skills/tree/64eb3deb9a5fbfa041faf783e0bc3fd635872e9c). Consultar `SKILL.md` do módulo e, quando necessário, RECIPES/STANDARDS antes da implementação. Esta é uma síntese autoral de princípios adaptados à aplicação; não instala nem executa scripts externos.

| Módulo | Uso no próximo trabalho visual |
| --- | --- |
| emil-design-eng | Refinar origem, feedback, legibilidade e detalhes; calibrar critérios de gosto |
| find-animation-opportunities | Ler UI e código, inventariar oportunidades e rejeições sem editar |
| remove-animations | Subtrair loops/reveals e atrasos que não se justificam |
| improve-animations / review-animations | Auditar componentes existentes e propor ajustes isolados |
| animate / animation-vocabulary | Escolher propósito, curva, duração, propriedade, entrada/saída e vocabulário |
| choreograph | Definir lead, apoio, simultaneidade, interrupção e o que permanece imóvel |
| animation-performance | Medir paint, layout, custo JS, frames, camadas e regressões |
| mobile-native / gestures | Touch, safe areas, hover, teclado, swipe e controle interrompível |
| apple-design | Continuidade espacial e adaptação da interação, sem copiar interfaces |
| prototype | Comparar duas ou três composições em branch local, inclusive versão sem motion |
| break-ui | Testar dados extremos, vazio, erro, loading, nomes longos, zoom e viewport |
| learn-taste | Registrar decisões confirmadas e seus motivos em DESIGN.md ou documento equivalente |
| pick-ui-library / ask-emil / ask-sonner | Escolher mecanismo mínimo e reaproveitar componentes existentes; módulos específicos só quando necessários |

Módulos mobile nativos (animate-expo/write-swift) não são aplicáveis por padrão a uma aplicação web. Não atualizar dependências só para cumprir esta diretriz; validar licença, SSR, bundle e compatibilidade se houver necessidade real. Referências anteriores (TasteSkill, Transitions.dev, React Bits, GSAP/Lottie/3D) são complementares quando compatíveis, não justificativa de efeitos obrigatórios.

## 3. Experiência premium: direção de arte primeiro

- Escolher uma personalidade (tipografia, paleta, contraste, espaço, forma, fotos/mídia reais, ritmo e assinatura) derivada da marca e da intenção de cada página.
- Estruturar o primeiro viewport para explicar o benefício e ação primária; evitar padrões repetitivos de cards/gradientes, sombras pesadas, excesso de badges e composição indistinguível entre projetos.
- Usar hierarquia editorial, alinhamento, espaço negativo e elementos visuais específicos ao negócio. Fazer teste sem marcas: a composição ainda comunica a proposta? Não copiar layout, ativos, textos ou marcas de sites premiados.
- Uma experiência de campanha rara pode ter um momento assinado (ex.: revelação localizada, galeria ou transformação explicativa). Não impor uma quantidade de animações; a ausência de motion pode ser a decisão correta.
- Nas rotas transacionais, busca, listas e administração, privilegiar velocidade, foco e estabilidade. Conteúdo, CTA, preços, resultados, navegação e formulários devem funcionar sem movimento, e conteúdo público/SEO deve ficar disponível antes da hidratação quando aplicável.

## 4. Critério de decisão de motion

Toda proposta precisa declarar **superfície, propósito, frequência, propriedade, easing, duração, fallback e interrupção**. Rejeitar quando não houver utilidade ou quando a frequência tornar o movimento incômodo.

| Superfície | Escolha inicial (adaptar tokens existentes) |
| --- | --- |
| Atalho de teclado ou ação repetida centenas de vezes | Imediato, sem animação ornamental |
| Press feedback ocasional | `scale(0.97)`, 100–160ms; manter hit target estável |
| Tooltip / popover pequeno | 125–200ms, origem no gatilho; tooltip seguinte sem atraso |
| Dropdown / seleção ocasional | 150–250ms, entrada/saída com resposta rápida |
| Modal / drawer | 200–500ms quando necessário, foco/escape, sem espera para interagir |
| Marketing / explicação rara | Só sequência com propósito, conteúdo legível e alternativa estática |

Se não existirem tokens equivalentes, avaliar curva de entrada/saída `cubic-bezier(0.23, 1, 0.32, 1)`, movimento entre estados `cubic-bezier(0.77, 0, 0.175, 1)` e drawer `cubic-bezier(0.32, 0.72, 0, 1)` da referência. Não adicionar sistema paralelo. Evitar ease-in em UI, transition: all, scale(0), layout properties animadas, loops decorativos e atraso no CTA. Usar transform/opacity, origem do gatilho, CSS para movimento previsível, springs para gesto realmente interrompível; `will-change` só com evidência. Não duplicar animação de pai e filhos; sem stagger em listas frequentes. Hover apenas em hover/pointer fine; respeitar reduced-motion e preferência local mais estrita, sem esconder conteúdo. Para 3D, orçamento específico, degradação estática e nenhuma dependência imposta.

## 5. Micro-rodadas futuras — sem autorização implícita de código

1. R1 — Auditoria visual real em Home e rotas críticas, 390/768/1440, registrar screenshots, fonte commit/deployment, interação, frequência, oportunidade e rejeição; comparar baseline de performance. Avaliar se os indícios acima se confirmam.
2. R2 — Direção de arte e protótipo de uma superfície, criar brief com paleta, tipografia, layout, mídia e assinatura; comparar com versão sem motion; evitar alterar contratos.
3. R3 — Implementar apenas o ajuste aprovado, em micro-PR; reusar tokens e componentes existentes. Validar teclado, foco, toque, reduced-motion, interrupção, loading/vazio/erro, textos longos e sem overflow.
4. R4 — Revisão por `review-animations`, `animation-performance`, `break-ui`; registrar antes/depois, LCP/CLS/INP ou gates locais e teste de uso real. Verificar que SEO, SSR, canonical, sitemap, dados, rotas e conversões não regrediram.
5. R5 — Aprender com feedback explícito; acrescentar decisões justificadas ao documento de design local. Merge/publicação só no fluxo aprovado do projeto; uma publicação quando necessária, sem Lovable Max sem autorização.

## 6. GO/NO-GO

GO para implementação somente com baseline visual, brief próprio da marca, propósito de cada movimento, seleção dos módulos pertinentes e uma micro-superfície definida. GO para release somente com gates locais, comparação real nos viewports, interação funcional, reduced-motion, zero regressão crítica de performance/conversão, sem novos riscos de acessibilidade, SSR/SEO e privacidade. NO-GO se movimento interferir na ação, se houver conteúdo invisível, template copiado, alteração comercial incidental, bloqueio de dados, dependência sem justificativa ou validação inconclusiva.

**Registro desta rodada:** leitura de referências e arquivos; documentação proposta/registrada em branch isolada. Nenhum código de aplicação, dependência, banco, DNS ou configuração de hospedagem foi alterado por esta diretriz.

## 7. R1.2 — Auditoria visual inicial da Home (27/11/2026)

- **URL pública observada:** https://otecnicodeinformatica.com.br/
- **Viewport efetivo:** 1800 × 1125 CSS px; scrollWidth 1787; 1 h1; captura na extensão.
- **Evidência:** captura de tela do primeiro viewport e leitura de estado público. A Home apresenta pergunta orientada ao problema, campo de diagnóstico, seis atalhos de sintomas e quatro caminhos editoriais. O CTA principal está visível e a disposição de texto é clara. O banner de cookies no canto inferior esquerdo encobre parcialmente o primeiro card/caminho e a faixa inferior; botão flutuante de atendimento ocupa o canto oposto. O espaço amplo à direita deve ser refinado com composição editorial, não preenchido por efeito ornamental. Não foi observada rolagem horizontal nessa medição.
- **P0 — antes de direção de arte:** Separar consentimento e CTA flutuante dos caminhos principais sem retirar controles legais; conferir 390/768/1440 e foco/teclado.
- **P1 — candidato de protótipo:** Refinar HeroTriagem e ritmos tipográficos; manter texto de sintomas, input e CTAs imediatamente disponíveis. Eventual movimento apenas no feedback de seleção e transição da etapa, não em digitação, navegação habitual ou resultados. Reutilizar MotionProvider já presente em vez de nova dependência.
- **Skills aplicáveis:** find-animation-opportunities, remove-animations, review-animations, emil-design-eng, animation-performance, break-ui e mobile-native quando houver baseline móvel. `prototype` somente após terminar R1.
- **Limites:** Calibração para 1440/390 px não concluída por timeout na extensão; o navegador alternativo permitiu inspeção desktop sem ajuste do viewport. Mobile e tablet estavam pendentes na R1.2; recuperação mobile consta na seção 8. Não houve submissão de formulários, acionamento de WhatsApp, mudança de consentimento, verificação de commit implantado, medição de Web Vitals ou teste completo de acessibilidade/funil. Nenhuma captura foi incluída no Git. Não alterar contratos comerciais, SEO, dados, dependências, código ou produção com base neste diagnóstico. A aprovação R1 integral permanece pendente.

## 8. R1.3 — Recuperação da baseline mobile (27/11/2026)

- **URL pública observada:** https://otecnicodeinformatica.com.br/
- **Viewport medido:** 390 × 844 CSS px, scrollWidth 377.
- **Evidência:** captura(s) do primeiro viewport, leitura de DOM/estado público. H1, diagnóstico e CTA visíveis, mas o botão flutuante de chat sobrepõe a extremidade inferior direita do CTA e o painel de cookies ocupa grande parte dos atalhos de sintomas. Quebra de palavra 'tecno-/logia' na headline. Sem overflow horizontal. Confirma o risco R1.2 de competição entre elementos fixos.
- **P0 — prioridade antes de prototipar:** Orquestrar consentimento/chat/CTA, sem retirar opções legais; validar atalho e navegação por teclado e toque; refinar wrapping da headline.
- **P1 — direção de arte e motion:** Manter triagem acima da dobra; evitar qualquer motion que esconda ação.
- **Skills aplicáveis:** find-animation-opportunities, remove-animations, review-animations, emil-design-eng, animation-performance, break-ui, mobile-native; prototype após diagnóstico completo.
- **Limites:** Desktop anterior registrado na seção 7; tentativa de recalibrar 1440 exatos interrompida. Tablet, outras rotas, teclado, reduced-motion, LCP/CLS/INP, build/deployment SHA e funil completo pendentes. Não houve submissão de formulário, WhatsApp, alteração de consentimento, código, dependências, dados, produção ou merge. Não incluímos screenshots no Git. Esta é baseline inicial, não homologação.
