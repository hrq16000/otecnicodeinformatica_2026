# Benchmark competitivo — serviços de informática — 05/11/2026

Escopo: oportunidades de experiência do usuário, diferenciação editorial e SEO para **O Técnico de Informática**. Observações públicas; não equivalem a auditoria de tráfego, ranking ou conversão.

## Referências consultadas

| Referência | Padrão observável | Aprendizado aplicável |
| --- | --- | --- |
| https://www.tecnologic.com.br/consultoria | Ofertas B2B separadas em consultoria, redes, help desk e administração | Descrever a dor empresarial e o escopo sem prometer SLA não comprovado |
| https://aiotec.com.br/tecnico-de-informatica/tecnico-de-informatica-centro/ | Etapas comerciais e páginas de serviço/localização | Tornar o caminho até a modalidade apropriada mais curto, **sem** multiplicar páginas locais sem prova |
| https://www.teinfo.com.br/ | Redes, implantação de sistemas e manutenção organizadas por necessidade empresarial | Criar pontes editoriais para os serviços PJ existentes |
| https://www.getninjas.com.br/assistencia-tecnica | Entrada pela categoria/equipamento e escolha de profissional | Priorizar sintomas, equipamento e intenção antes da apresentação do serviço |
| https://www.ohub.com.br/empresas/suporte-tecnico-informatica | Escopos empresariais diferenciados (help desk, campo, manutenção) | Diferenciar contratação pontual de modalidade recorrente, apenas quando real |
| https://tecinfosolucoes.com.br/ | Portal do cliente e acompanhamento de solicitações | Considerar acompanhamento de atendimento somente quando houver backend e permissões efetivas |
| https://www.soluque.com.br/ | Núcleos de suporte, infraestrutura, automação e sites | Separar demandas de manutenção das demais soluções de tecnologia |

## Primeiro incremento aplicado no código

- `/servicos`: comparação SSR-visível de **suporte remoto / visita técnica / bancada**, com sintomas, limites e destinos internos existentes.
- Reutilização de três URLs oficiais e de `/precos-e-politicas`. **Nenhuma rota, canonical ou sitemap alterado.**
- Sem novas dependências, scripts de terceiros, imagens, promessas de tempo, avaliações ou números não comprovados.
- A seção **não** altera valores ou regras comerciais; o texto remete à fonte existente.

## Rodadas propostas — não implementadas neste incremento

1. **Empresas:** revisar páginas PJ para distinguir manutenção pontual, rede, backup e suporte recorrente; só afirmar o que a operação entrega.
2. **Prova operacional:** revisar perguntas de contratação, registros de serviço, avaliações autorizadas e acessibilidade sem fabricar métricas.
3. **SEO técnico:** medir performance mobile/SSR, verificar gates de indexação e as URLs aprovadas; nunca criar páginas por cidade automaticamente.
4. **Rede nacional:** distinguir atendimento comercial local da comunidade de profissionais, sem tratar presença em grupo como profissional verificado ou disponível. Exigir evidência geográfica antes de promover uma URL local.

## Regras de decisão

- Preservar a PR #384 e a PR #400; não misturar trabalhos estruturais de publicação ou operação nacional nesta rodada.
- Seguir `AGENTS.md`: PR, `npm run verify`, `npm run build`, `npm run deploy:check`, merge validado e prova de publicação no domínio oficial.
- Indexabilidade configurada não equivale a indexação efetiva no Google; confirmar no Search Console.
- A simples presença em uma listagem de concorrentes não demonstra participação de mercado ou posição de SEO.
