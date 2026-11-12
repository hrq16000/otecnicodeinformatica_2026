# Priorização de enriquecimento — outubro/2026

> Rodada exclusivamente diagnóstica. Este arquivo organiza a fila de enriquecimento; **não altera conteúdo de página, rota, schema, robots, canonical, sitemap nem política de indexação**.

## 1. Fontes cruzadas

Fontes internas, todas lidas do `main` desta rodada:

- `src/data/gscSnapshot.json` — Search Console real, período de **2026-08-11 a 2026-09-08**;
- `reports/auditoria-duplicidade-2026-09.md` — faixas de conteúdo único das famílias programáticas;
- `src/lib/servicoCidadeData.ts`, `src/lib/servicoCuritibaBlocos.json` e `src/lib/servicoSjpBlocos.json`;
- `src/lib/servicoBairroFactory.ts` e `src/lib/servicoBairroBlocos4s.json`;
- `src/pages/arrumar-pc/cities.ts` e `src/pages/arrumar-pc/services.ts`;
- mapa de rotas literais em `src/legacyRouteElements.tsx`.

Fonte pública de população:

- IBGE — **Estimativas da População 2026**, data de referência **01/07/2026**, publicadas no DOU em 28/08/2026:
  https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-de-populacao.html
- valores municipais conferidos nas páginas públicas **Cidades e Estados | IBGE**.

## 2. Critério e score reproduzível

Só entram no ranking páginas cuja auditoria atual está em **30–60%** ou **<30%** de conteúdo único. Páginas já acima de 60% são registradas no cruzamento GSC, mas excluídas da fila.

### Pesos

**A. Sinal real no GSC — peso alto**

- +60 se a URL tiver pelo menos 1 impressão ou clique no snapshot;
- +1 por impressão, limitado a +20;
- +20 por clique, limitado a +40.

Máximo deste bloco: **120 pontos**.

**B. Curitiba/RMC — peso alto**

- +50 para páginas das famílias locais de Curitiba e região metropolitana (`ServicoCidadePage`, bairro e serviço×bairro);
- a URL `/arrumar-pc/.../curitiba-nacional` continua pertencendo à malha nacional e **não** recebe este bônus.

**C. Porte populacional na malha nacional — peso médio**

Somente para capitais presentes em `ArrumarPCServicoCidadeTemplate`:

`score_pop = 25 × população_2026_da_cidade / população_2026_de_São_Paulo`

Máximo: **25 pontos**. Campinas permanece na malha nacional, mas recebe **0 neste critério**, porque o pedido é especificamente “capital de maior porte populacional”.

### Desempate

Como várias páginas locais ficam com o mesmo score bruto, o desempate **não adiciona pontos**:

1. intenção explicitamente transacional serviço×local;
2. ordem declarada das cidades em `servicoCidadeData.ts`;
3. ordem declarada dos serviços em `SERVICOS`;
4. URL, apenas para estabilidade final.

Isso é uma regra de execução da fila, não uma alegação de demanda maior.

## 3. Cruzamento GSC × faixa de conteúdo único

O snapshot possui 57 páginas no total, mas somente **6 URLs** pertencem às famílias service×cidade/bairro desta rodada.

| URL | Cliques | Impressões | Família/coorte | Faixa atual | Entra no ranking? |
| --- | ---: | ---: | --- | --- | --- |
| `/servicos/suporte-tecnico-empresarial/curitiba` | 0 | 10 | ServicoCidadePage — bloco autoral Curitiba | **>60%** | Não |
| `/servicos/conserto-pc-notebook/centro` | 0 | 6 | ServicoBairroTemplate — factory 4S com bloco autoral | **>60%** | Não |
| `/servicos/conserto-notebook/curitiba` | 0 | 2 | ServicoCidadePage — bloco autoral Curitiba | **>60%** | Não |
| `/servicos/conserto-pc/curitiba` | 0 | 2 | ServicoCidadePage — bloco autoral Curitiba | **>60%** | Não |
| `/bairros/cic` | 0 | 1 | BairroLocalLayout | **>60%** | Não |
| `/servicos/formatacao-computador/curitiba` | 0 | 1 | ServicoCidadePage — bloco autoral Curitiba | **>60%** | Não |

**Conclusão do cruzamento:** nesta fotografia de GSC, **nenhuma página abaixo de 60% possui sinal próprio de GSC**. Portanto, o componente GSC do score é zero para todas as candidatas atuais. Isso não significa “demanda zero”; significa apenas que este snapshot ainda não registrou impressão/clique para essas URLs.

## 4. Malhas separadas

### 4.1 ServicoCidadePage — Curitiba e região metropolitana

A matriz moderna declara 17 serviços × 16 cidades. Depois das precedências de rotas literais, a auditoria encontrou **260 páginas efetivamente dinâmicas**:

- **16** com bloco local autoral, todas >60%;
- **244** fallbacks genéricos, todos na faixa **<30%** e com conteúdo local único conservador medido em **0%**.

As páginas abaixo de 60% desta família recebem +50 pelo mercado principal.

### 4.2 ArrumarPCServicoCidadeTemplate — malha nacional

Produto cartesiano legado:

- 6 serviços × 20 cidades = **120 páginas**;
- **120/120** na faixa **<30%**;
- conteúdo local único conservador: **0%**.

Esta família não recebe o bônus de Curitiba/RMC. O porte populacional é usado somente como peso médio entre as capitais.

## 5. População IBGE 2026 usada no componente nacional

| Cidade da malha nacional | População estimada 2026 | Capital? | Pontos de população |
| --- | ---: | :---: | ---: |
| São Paulo | 11.911.337 | sim | 25,0 |
| Rio de Janeiro | 6.731.133 | sim | 14,1 |
| Brasília | 3.009.996 | sim | 6,3 |
| Fortaleza | 2.582.360 | sim | 5,4 |
| Salvador | 2.559.945 | sim | 5,4 |
| Belo Horizonte | 2.415.451 | sim | 5,1 |
| Manaus | 2.327.101 | sim | 4,9 |
| Curitiba | 1.832.183 | sim | 3,8 |
| Recife | 1.588.983 | sim | 3,3 |
| Goiânia | 1.511.709 | sim | 3,2 |
| Belém | 1.396.157 | sim | 2,9 |
| Porto Alegre | 1.388.791 | sim | 2,9 |
| Campinas | 1.189.761 | **não** | **0,0** |
| Maceió | 995.134 | sim | 2,1 |
| Campo Grande | 970.843 | sim | 2,0 |
| João Pessoa | 906.093 | sim | 1,9 |
| Natal | 783.196 | sim | 1,6 |
| Cuiabá | 698.917 | sim | 1,5 |
| Florianópolis | 598.370 | sim | 1,3 |
| Vitória | 343.935 | sim | 0,7 |

Observação: os valores são estimativas municipais do IBGE para 2026. A regra de score não interpreta população como prova de procura pelo serviço; ela apenas cumpre o peso médio de porte populacional solicitado para a malha nacional.

## 6. Top 40 páginas para enriquecimento

Todas as 40 abaixo estão empatadas em **50,0 pontos brutos**. A ordem é o desempate operacional descrito na seção 2. Como as candidatas nacionais chegam a no máximo 25 pontos pelo componente populacional e nenhuma candidata <60% recebeu sinal GSC neste snapshot, a fila inicial fica inteiramente no mercado Curitiba/RMC.

| # | URL | Família | Score | Motivo | Conteúdo único |
| ---: | --- | --- | ---: | --- | --- |
| 1 | `https://otecnicodeinformatica.com.br/servicos/conserto-tv/curitiba` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 2 | `https://otecnicodeinformatica.com.br/servicos/conserto-celular/curitiba` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 3 | `https://otecnicodeinformatica.com.br/servicos/suporte-empresas/curitiba` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 4 | `https://otecnicodeinformatica.com.br/servicos/atendimento-remoto/curitiba` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 5 | `https://otecnicodeinformatica.com.br/servicos/conserto-tv/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 6 | `https://otecnicodeinformatica.com.br/servicos/conserto-celular/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 7 | `https://otecnicodeinformatica.com.br/servicos/upgrade-ssd/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 8 | `https://otecnicodeinformatica.com.br/servicos/suporte-empresas/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 9 | `https://otecnicodeinformatica.com.br/servicos/atendimento-remoto/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 10 | `https://otecnicodeinformatica.com.br/servicos/montagem-de-pc/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 11 | `https://otecnicodeinformatica.com.br/servicos/pc-gamer/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 12 | `https://otecnicodeinformatica.com.br/servicos/suporte-home-office/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 13 | `https://otecnicodeinformatica.com.br/servicos/suporte-tecnico-empresarial/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 14 | `https://otecnicodeinformatica.com.br/servicos/manutencao-preventiva-empresas/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 15 | `https://otecnicodeinformatica.com.br/servicos/backup-para-empresas/sao-jose-dos-pinhais` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 16 | `https://otecnicodeinformatica.com.br/servicos/conserto-notebook/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 17 | `https://otecnicodeinformatica.com.br/servicos/conserto-pc/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 18 | `https://otecnicodeinformatica.com.br/servicos/conserto-tv/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 19 | `https://otecnicodeinformatica.com.br/servicos/conserto-celular/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 20 | `https://otecnicodeinformatica.com.br/servicos/upgrade-ssd/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 21 | `https://otecnicodeinformatica.com.br/servicos/backup-recuperacao/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 22 | `https://otecnicodeinformatica.com.br/servicos/suporte-empresas/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 23 | `https://otecnicodeinformatica.com.br/servicos/atendimento-remoto/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 24 | `https://otecnicodeinformatica.com.br/servicos/montagem-de-pc/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 25 | `https://otecnicodeinformatica.com.br/servicos/pc-gamer/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 26 | `https://otecnicodeinformatica.com.br/servicos/suporte-home-office/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 27 | `https://otecnicodeinformatica.com.br/servicos/suporte-tecnico-empresarial/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 28 | `https://otecnicodeinformatica.com.br/servicos/manutencao-preventiva-empresas/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 29 | `https://otecnicodeinformatica.com.br/servicos/backup-para-empresas/araucaria` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 30 | `https://otecnicodeinformatica.com.br/servicos/conserto-notebook/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 31 | `https://otecnicodeinformatica.com.br/servicos/conserto-pc/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 32 | `https://otecnicodeinformatica.com.br/servicos/conserto-tv/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 33 | `https://otecnicodeinformatica.com.br/servicos/conserto-celular/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 34 | `https://otecnicodeinformatica.com.br/servicos/upgrade-ssd/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 35 | `https://otecnicodeinformatica.com.br/servicos/backup-recuperacao/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 36 | `https://otecnicodeinformatica.com.br/servicos/suporte-empresas/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 37 | `https://otecnicodeinformatica.com.br/servicos/atendimento-remoto/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 38 | `https://otecnicodeinformatica.com.br/servicos/montagem-de-pc/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 39 | `https://otecnicodeinformatica.com.br/servicos/pc-gamer/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |
| 40 | `https://otecnicodeinformatica.com.br/servicos/suporte-home-office/campo-largo` | `ServicoCidadePage` | **50,0** | RMC / mercado principal (+50); sem sinal GSC nesta fotografia; fallback genérico auditado na faixa <30% | **<30%** |

## 7. Leitura operacional do ranking

- O fato de #1 a #40 terem o mesmo score é intencional e transparente: **não existe evidência no snapshot atual para afirmar que #1 tem mais demanda que #40**.
- A vantagem dessas URLs é estratégica: estão no mercado principal e ainda pertencem ao lote genérico <30%.
- Páginas de bairro e serviço×bairro abaixo de 60% também recebem o bônus local de +50; ficam depois das service×cidade no desempate porque a fila solicitada está orientada a potencial de atendimento pago e a intenção serviço×local é mais diretamente transacional.
- A malha `ArrumarPCServicoCidadeTemplate` continua priorizada internamente por população de capital, mas entra depois das candidatas locais enquanto não houver sinal GSC próprio.
- Se um snapshot futuro registrar impressões/cliques para uma página <60%, o peso GSC faz essa URL subir imediatamente de prioridade sem necessidade de mudar a fórmula.

## 8. Garantia de escopo

Nesta rodada:

- nenhum conteúdo de página foi reescrito;
- nenhuma rota foi criada, removida ou redirecionada;
- nenhum schema foi alterado;
- nenhum `index/noindex` foi alterado;
- nenhum canonical foi alterado;
- nenhum sitemap foi alterado;
- nenhum componente de produção foi alterado;
- **somente este relatório foi adicionado**.
