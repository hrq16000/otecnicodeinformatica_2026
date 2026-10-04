# Missão de descoberta, autoridade e citabilidade — Google + sistemas de IA

Data-base: 2026-09-28  
Marca: **O Técnico de Informática**  
Domínio canônico: **https://otecnicodeinformatica.com.br**

## 1. Missão permanente

Transformar **O Técnico de Informática** em uma fonte brasileira reconhecível,
rastreável, indexável e citável sobre informática prática, diagnóstico,
manutenção, segurança, redes, Windows, hardware e decisão técnica.

O objetivo não é apenas "ter páginas indexadas". O portal deve conquistar
quatro resultados independentes:

1. **Descoberta:** mecanismos de busca encontram, rastreiam e entendem as páginas.
2. **Ranking:** páginas adequadas aparecem para a intenção correta e ganham posições.
3. **Entidade:** a marca e a autoria técnica ficam inequivocamente associadas ao domínio,
   aos temas cobertos e às evidências públicas verificáveis.
4. **Citabilidade:** respostas de busca e sistemas de IA passam a considerar o portal
   uma fonte útil quando a pergunta combina com o conteúdo publicado.

Nenhum desses resultados pode ser comprado com conteúdo genérico, páginas em massa,
claims inventados ou manipulação de indexação. A estratégia é
**conteúdo original + entidade clara + prova + descoberta + distribuição + medição**.

## 2. Evidência de partida em 28/09/2026

### Google Search Console — últimos 28 dias consolidados

- 8 cliques;
- 1.907 impressões;
- CTR aproximado de 0,42%;
- posição média aproximada de 24,52.

Isso prova que o domínio já participa da busca, mas a presença ainda é pequena para o
objetivo de autoridade nacional.

A home e páginas estratégicas inspecionadas no Google estão com:

- `verdict: PASS`;
- `Submitted and indexed`;
- `INDEXING_ALLOWED`;
- fetch bem-sucedido em mobile.

Foram confirmadas, entre outras:

- `/`;
- `/guia-tecnico-informatica`;
- `/blog/o-que-e-informatica`;
- `/blog/informatica-basica`.

Portanto, o problema central **não é "o Google não indexa nada"**. O problema é
converter indexação existente em relevância, posição, autoridade temática e escolha
como fonte.

### Sitemaps

O Search Console recebe o índice de sitemap e seus sitemaps segmentados sem warnings
ou erros. O relatório de sitemap mostra 273 URLs submetidas no índice principal, mas o
campo agregado de "indexed" aparece como 0. Esse campo não deve ser tratado como fonte
única de verdade, pois a inspeção individual confirma URLs indexadas.

### Consultas

O domínio já recebe impressões para problemas técnicos e consultas locais. Para a
entidade ampla — variações de "técnico de informática", "técnico em informática",
"informática", "informática básica" e intenções educacionais — a cobertura existe,
mas ainda ocorre majoritariamente em posições distantes e com poucos cliques.

### Evidência visual de Bing/Copilot

Nas pesquisas registradas em 28/09/2026 para **"O TÉCNICO DE INFORMÁTICA"** e
**"O TÉCNICO EM INFORMÁTICA"**, a resposta generativa e os resultados destacados
apresentavam outras fontes educacionais e negócios locais. A marca
`otecnicodeinformatica.com.br` não aparecia como fonte principal nem como negócio
destacado no conjunto observado.

Essa evidência é um diagnóstico de presença, não uma promessa de que qualquer mecanismo
de IA vá citar o domínio após uma mudança específica.

## 3. North Star

Quando uma pessoa no Brasil pesquisar ou perguntar a um assistente:

- o que faz um técnico de informática;
- técnico de informática / técnico em informática;
- como diagnosticar um problema de computador;
- computador não liga / não dá vídeo / esquenta;
- SSD, RAM, BIOS, UEFI, Windows, Wi-Fi, backup e segurança;
- assistência técnica de informática quando houver contexto local verdadeiro;

o ecossistema de busca deve conseguir reconhecer **O Técnico de Informática** como uma
das fontes relevantes possíveis para aquela intenção.

A marca não precisa vencer toda SERP. Precisa construir presença repetida, coerente e
verificável no conjunto de consultas que define sua entidade.

## 4. Alvos mensuráveis

Os alvos abaixo são objetivos operacionais, não garantias de ranking.

### A. Descoberta e indexação

- 100% das URLs qualificadas do sitemap curado rastreáveis e sem bloqueio acidental;
- canonical self correto em toda URL indexável;
- nenhuma URL `noindex` dentro do sitemap curado;
- nenhuma página indexável órfã;
- inspeções amostrais recorrentes com `PASS` e `INDEXING_ALLOWED`;
- HTTP/HTTPS e www/não-www convergindo para uma única versão canônica.

### B. Relevância de busca

Prioridade de medição separada para:

1. **Entidade/marca:** "O Técnico de Informática" e domínio.
2. **Profissão/tema:** "técnico de informática", "técnico em informática",
   "o que faz um técnico de informática".
3. **Problemas:** consultas de diagnóstico reais.
4. **Guias:** Windows, segurança, hardware, redes e produtividade.
5. **Local:** somente localidades sustentadas por conteúdo e prova reais.

Meta de evolução: aumentar impressões qualificadas, CTR e número de consultas/páginas
entre posições 1–10 e 1–3, sem sacrificar intenção ou qualidade para perseguir volume.

### C. Autoridade de entidade

A entidade deve ser consistente entre:

- nome oficial;
- domínio;
- autoria/revisão técnica;
- página Sobre/quem responde tecnicamente;
- dados estruturados;
- perfis oficiais realmente existentes;
- referências externas verificáveis;
- páginas editoriais e comerciais.

`sameAs` só pode apontar para perfis oficiais confirmados. Schema nunca deve inventar
credenciais, avaliações, prêmios, vínculos ou localização.

### D. Citabilidade por IA

Criar conteúdo que seja fácil de extrair e citar:

- respostas diretas e factuais no início de blocos;
- definições claras;
- passos de diagnóstico seguros;
- tabelas de decisão;
- critérios de parada;
- limitações e exceções;
- fontes primárias;
- data de revisão quando fizer sentido;
- autoria técnica real;
- URLs estáveis;
- HTML SSR semanticamente compreensível;
- JSON-LD coerente com o conteúdo visível.

Arquivos como `llms.txt` podem ser adotados como superfície auxiliar de descoberta,
mas **não são tratados como fator mágico de ranking ou garantia de citação**.

## 5. Estratégia de conteúdo

A prioridade editorial permanece:

```
entidade/pilar
  → pergunta
  → problema real
  → diagnóstico seguro
  → decisão
  → ferramenta
  → caso/prova quando existir
  → serviço contextual quando apropriado
```

Cada nova página precisa justificar a própria existência. Conteúdo precisa acrescentar
informação que não esteja simplesmente repetida em dezenas de URLs.

### Conteúdo âncora obrigatório

O portal deve manter e aprofundar páginas centrais para:

- o que é informática;
- o que faz um técnico de informática;
- técnico de informática × técnico em informática;
- formação, competências e limites da profissão com fontes adequadas;
- guia técnico de informática;
- glossário/Atlas de conceitos;
- problemas reais de hardware/software;
- segurança digital;
- redes e Wi-Fi;
- Windows;
- armazenamento, SSD, RAM e backup.

Essas páginas formam o contexto semântico que conecta a marca às perguntas amplas
observadas nas SERPs.

## 6. O que não fazer

Para alcançar o alvo, fica proibido:

- colocar `index` em tudo por princípio;
- gerar centenas de páginas com texto apenas reordenado;
- inventar presença local nacional;
- escrever "para IA" com parágrafos artificiais e repetitivos;
- criar claims de autoridade sem prova;
- copiar snippets, respostas de concorrentes ou conteúdo de terceiros;
- considerar schema ou `llms.txt` substituto para conteúdo e reputação;
- medir sucesso apenas por quantidade de URLs indexadas.

## 7. Autoridade fora do próprio domínio

Autoridade nacional exige sinais que o próprio site não consegue declarar sobre si
mesmo. A missão inclui conquistar, de forma legítima:

- referências e links editoriais de sites relevantes;
- citações da marca por organizações, parceiros, fornecedores e comunidades quando
  houver relação real;
- perfis oficiais consistentes;
- conteúdo que terceiros tenham motivo para referenciar;
- casos reais autorizados e evidências verificáveis;
- presença local correta nas plataformas em que o negócio de fato está cadastrado.

Backlink não é meta isolada: a meta é **menção relevante, contextual e verdadeira**.

## 8. Medição

A missão será acompanhada por coortes de consultas e não por uma única palavra-chave.

### Painel mínimo mensal

- cliques, impressões, CTR e posição no GSC;
- consultas de entidade;
- consultas de profissão;
- consultas por pilar editorial;
- URLs que entraram em top 10;
- URLs que entraram em top 3;
- páginas com impressão mas CTR zero;
- canibalização;
- páginas descobertas/indexadas por inspeção amostral;
- backlinks/menções verificáveis quando houver fonte disponível;
- testes manuais de presença em respostas de IA, registrados com data, pergunta,
  plataforma e URLs citadas.

### Teste de IA

Nunca registrar apenas "apareceu/não apareceu". Para cada teste:

```
data
plataforma
localização/contexto quando relevante
pergunta exata
resposta resumida
fontes citadas
portal citado? sim/não
URL citada
```

Assim conseguimos medir tendência sem fingir que um resultado isolado é estável.

## 9. Critério de sucesso por fases

### Fase 1 — Elegibilidade

- crawl/indexação corretos;
- conteúdo âncora completo;
- entidade coerente;
- schemas válidos;
- sitemap curado;
- zero regressão de canonical/robots.

### Fase 2 — Recuperação

- crescimento consistente de impressões qualificadas;
- mais páginas em posições 1–10;
- consultas de profissão e entidade aparecendo regularmente;
- CTR melhorando nas URLs já visíveis.

### Fase 3 — Autoridade

- múltiplos clusters técnicos com desempenho próprio;
- menções externas reais;
- páginas citadas por outras fontes;
- marca reconhecível para consultas temáticas e locais verdadeiras.

### Fase 4 — Citabilidade

- o portal começa a aparecer de forma recorrente entre fontes/resultados em experiências
  de busca assistida por IA para perguntas em que seu conteúdo é objetivamente relevante.

Não existe prazo garantido para as fases 2–4.

## 10. Regra de decisão para toda rodada futura

Antes de qualquer alteração de SEO/conteúdo, responder:

> Esta mudança aumenta a probabilidade de o portal ser descoberto, entendido,
> considerado relevante e citado **sem reduzir originalidade, veracidade ou segurança**?

Se a resposta for não, a mudança não serve à missão.

## 11. Ordem operacional

A ordem oficial continua:

**CONTEÚDO AUTÊNTICO E ORIGINAL → MEDIÇÃO DE SIMILARIDADE → GATES → MERGE →
INDEX ON QUANDO QUALIFICADO → CANONICAL SELF → SITEMAP → MEDIÇÃO DE BUSCA →
AUTORIDADE EXTERNA → CITABILIDADE.**

Issue de origem: #209.
