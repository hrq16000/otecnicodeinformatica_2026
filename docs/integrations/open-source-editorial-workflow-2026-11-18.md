# Ferramentas abertas compatíveis — produção editorial e operação

Data da triagem: 18/11/2026. **Status: diretrizes absorvidas, ferramentas não instaladas.**
Esta política complementa `AGENTS.md`, não altera o runtime nem muda o fluxo de publicação.

## Onde há ganho real

| Ferramenta | Fonte | Aplicação possível | Estado |
|---|---|---|---|
| Cap | https://github.com/CapSoftware/Cap | gravar vídeos reais de diagnóstico/demonstração em máquina de teste | PILOTO_OFFLINE |
| Buzz | https://github.com/chidiwilliams/buzz | transcrever material autoral e produzir rascunho de legendas | PILOTO_OFFLINE |
| Handy | https://github.com/cjpais/Handy | ditado para edição humana, sem enviar voz a servidor remoto | OPCIONAL_LOCAL |
| Kokoro | https://github.com/hexgrad/kokoro | locução de guias próprios, mediante validação da voz e do modelo | CONDICIONAL |
| Podcastfy | https://github.com/souzatharsis/podcastfy | transformar guias autorais revisados em material sonoro | CONDICIONAL |
| Upscayl | https://github.com/upscayl/upscayl | ampliar imagem real/licenciada para suporte editorial | OPCIONAL_LOCAL |
| Penpot | https://github.com/penpot/penpot | prototipar componentes visuais exclusivos e acessíveis | OPCIONAL_DESIGN |
| Postiz | https://github.com/gitroomhq/postiz-app | planejar publicação social a partir de URLs oficiais | CONDICIONAL_SERVICO |
| Vane | https://github.com/ItzCrazyKns/Vane | levantar hipóteses de pesquisa, nunca ser fonte final dos guias | REFERENCIA |
| REA | https://github.com/morluto/rea | investigação de UI autorizada, somente se Playwright não bastar | REFERENCIA_SECURITY_REVIEW |
| DeepSeek Harness | https://github.com/deepseek-ai/deepseek-harness | repertório de composição de agentes; ainda developer preview | ADIAR |

### Referências de apresentação e organização

- https://vitormenoli.com/: observadas Home, Projetos e Prompts. **Aproveitar princípios** de clareza da promessa, exemplos verificáveis, filtro/busca e vínculo entre material e fonte. **Não copiar** marca, textos, SVG, cor, composição, imagens ou prompts.
- https://github.com/vitormenoli/Prompts-YouTube e https://github.com/vitormenoli/Prompts-Instagram: referência de catalogação por fonte, **não** acervo para republicação.
- https://github.com/vitormenoli/claude-video-editor e https://github.com/vitormenoli/claude-motion-studio-skill: exemplos de produção offline; licenças padronizadas não identificadas no inventário GitHub consultado. Não instalar/copiá-los sem autorização de uso e revisão integral.
- Os princípios de catálogo pesquisável só entram em uma rota própria se houver acervo editorial original suficiente, intenção SEO distinta, SSR, acessibilidade e ausência de canibalização. Não criar página vazia.

## Primeiro piloto permitido após escolher material autoral

1. Selecionar **um** vídeo demonstrativo autorizado sem nome, tela ou dados de cliente. Capturar em máquina de teste, não em produção.
2. Fazer a transcrição offline; revisar integralmente erros técnicos, unidades, avisos de segurança e linguagem. O conteúdo final deve ser original e verificável por fonte primária (Microsoft, CISA, CERT.br, NIST ou fabricante).
3. Armazenar somente a versão licenciada/aprovada, com título, descrição, fonte, licença de mídia, autoria e data de revisão. Nunca subir áudio bruto com PII para o repositório.
4. Se houver página publicada, integrar mídia pela arquitetura existente, preservando texto SSR, canonical, sitemap curado, CTA contextual e `prefers-reduced-motion`.
5. Executar `npm run verify`, `npm run build`, `npm run deploy:check` e testes aplicáveis. PR isolada, gates verdes e publicação controlada.

## Não implantar no frontend

Chatwoot, Twenty, Plane, SiYuan, Cherry Studio, Anarlog, Inbox Zero, Agentes Chat, LibreTranslate e Cal.diy não são bibliotecas React plug-and-play para este portal. Podem operar fora do site se houver necessidade operacional específica e contrato de segurança/infraestrutura. Não inserir scripts remotos, tokens OAuth, servidores extras, componentes de chat ou rastreamento sem justificativa e aceite.

**Limite:** este documento internaliza decisões. Nenhum vídeo, áudio, player, serviço, agente, endpoint ou chave foi implantado pela rodada documental. Não atribuir estado HOMOLOGADO a teste não realizado.
