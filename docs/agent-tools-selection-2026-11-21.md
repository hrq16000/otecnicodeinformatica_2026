# Ferramentas externas compatíveis com O Técnico de Informática — 21/11/2026

**Estado:** curadoria e método para o agente, não instalação, integração, homologação de código nem publicação. A precedência é de `AGENTS.md`, `SECURITY.md`, `.agents/skills/security-evidence-triage/SKILL.md`, documentação de SEO, autorização/segurança e gates oficiais.

**Fontes lidas:** https://andrelug.com/materiais/mapa-107 (20 ferramentas de conteúdo), /mapa-103 (24 agentes de programação), /mapa-104 (24 agentes operacionais), além dos 19 GitHub indicados diretamente. A lista não comprova segurança, licença ou maturidade de todos os projetos.

## Roteamento por necessidade

| Necessidade no portal | Referências candidatas | Decisão e restrições |
| --- | --- | --- |
| Segurança, Auth, RLS, funções e PRs | [Cloudflare security-audit-skill](https://github.com/cloudflare/security-audit-skill), [PR-Agent](https://github.com/The-PR-Agent/pr-agent) | Método de revisão + evidência reproduzível **no gate local existente**. Não duplicar bot nem executar scan externo com segredos |
| UX de serviços e artigos | [Hallmark](https://github.com/Nutlope/hallmark), [Impeccable](https://github.com/pbakaus/impeccable), [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Critérios de clareza, hierarquia, a11y, 390/1440, reduced-motion e LCP. Sem mudar marca, SEO, URL, preços ou inserir imagens IA |
| Documentação técnica e código | [Context7](https://github.com/upstash/context7), [Spec Kit](https://github.com/github/spec-kit), [Task Master](https://github.com/eyaltoledano/claude-task-master) | Consultar APIs atuais e decompor micro-PRs; aproveitar documentação/CI, evitar outra plataforma de gerenciamento |
| Vídeos educativos, tutoriais e legendas | [Whishper](https://github.com/pluja/whishper), [AutoSubs](https://github.com/tmoroney/auto-subs), [OpenShorts](https://github.com/mutonby/openshorts), [Rescript](https://github.com/wassgha/rescript), [HyperFrames](https://github.com/heygen-com/hyperframes) | **Um** piloto de edição offline por demanda, com direitos sobre mídia e revisões humanas; não adicionar FFmpeg/GPU/worker ao SSR |
| Narração/transcrição e ditado | [VoiceStudio](https://github.com/debpalash/VoiceStudio), [Voicebox](https://github.com/jamiepine/voicebox), [FluidVoice](https://github.com/altic-dev/FluidVoice), [Hex](https://github.com/anomalyco/hex) | Operação local opcional; voz de terceiro somente consentida e devidamente identificada; verificar SO/hardware |
| Suporte de equipamentos Android TV | [CleanYourTV](https://github.com/Gathin23/cleanyourtv), [TV Detox](https://github.com/Ansub/tv-detox) | **Referência para guias e atendimento assistido**, com consentimento do proprietário e reversão; não executar ADB remotamente nem remover apps do cliente sem avaliação |
| Memória/contexto de agentes | [Claude-Mem](https://github.com/thedotmack/claude-mem), [AI Memory](https://github.com/akitaonrails/ai-memory) | Preferir docs/PR e histórico Git; hooks que copiam sessões precisam de política de segredos, dados de clientes, retenção e acesso |
| Engenharia reversa | [REA](https://github.com/morluto/rea), [Craft Anything](https://github.com/storytold/craft-anything) | Observação autorizada, sem cópia de código, marca e controles de terceiros; Playwright existente primeiro |
| Automação, agentes e modelos gratuitos | [Activepieces](https://github.com/activepieces/activepieces), [Stagehand](https://github.com/browserbase/stagehand), [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) | ADIAR até caso de uso; **FreeLLMAPI nunca inferência de produção** segundo o upstream; credenciais operacionais nunca delegadas por padrão |

[Remotion](https://github.com/remotion-dev/remotion) tem licença comercial especial e deve ser validado antes de produção de vídeo contratada. Nada de geração ou publicação de conteúdo por conta de uma ferramenta nova.

## Prática a usar em novas rodadas

1. Começar pelo defeito/entrega real; consultar skill local e `AGENTS.md` antes de sugerir repositório externo.
2. Para UI, preservar texto factual e fonte oficial, mídia real licenciada, CTA permitido, marca, metadados, sitemap curado, reduced-motion e ausência de scroll horizontal.
3. Para segurança, registrar fronteira, hipótese, evidência e correção mínima seguindo `security-evidence-triage`. Não afirmar auditoria concluída sem teste e achado reproduzido.
4. Para conteúdo audiovisual: gerar **fora** do deploy com voz/mídia autorizadas; incluir revisão técnica, legenda, direitos e tamanho/performance.
5. Se exigir instalar código externo, registrar antes versão fixa, licença, permissões, segredos, privacidade, custo e rollback. Execução é etapa separada.
6. PR isolada e gates pertinentes reais; não executar testes longos por documentação. `main`, SQL/RLS, produção, preços e domínio ficam intocados.

**Verificação:** material documental; nenhum software externo, serviço, CI, SQL, pacote ou deploy executado por esta seleção.
