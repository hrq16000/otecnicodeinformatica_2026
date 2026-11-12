# Auditoria de duplicidade programática — setembro/2026

**Data do diagnóstico:** 2026-09-27  
**Snapshot auditado:** `main@5ee3bca06ad94d52a4ac435b09ca527748327bdd`  
**Escopo:** diagnóstico de conteúdo repetido nas páginas locais/programáticas.  
**Alterações de SEO aplicadas:** nenhuma.

> Esta rodada não altera `robots`, `noindex`, sitemap, canonical, rotas, componentes, conteúdo publicado ou política de indexação. O único artefato produzido é este relatório.

## 1. Método

O repositório já possui gates de similaridade (`check-programmatic-similarity.mjs`, `check-local-doorway.mjs`, `check-intro-similarity.mjs`). Eles serviram como referência de método, mas a auditoria abaixo amplia a cobertura para o estoque programático inteiro, inclusive rotas hoje fora da coorte promovida.

A unidade de comparação foi o **conteúdo textual principal que deveria variar por página**, isto é, os campos/dados que alimentam o `<main>` editorial/local. Foram deliberadamente excluídos Header, Footer, navegação, CTA padrão, FAQ padrão, preços/políticas repetidos, grades de links e outros blocos compartilhados por design.

Normalização aplicada:
- Unicode/acentos, caixa e pontuação normalizados;
- nomes da localidade e, quando necessário, do serviço mascarados antes da comparação, para não contar simples troca de token como “conteúdo único”;
- shingles de **4 palavras**;
- Jaccard par a par dentro da mesma família;
- para cada página, `similaridade máxima` = maior Jaccard contra outra página da família;
- `% único` = `100 × (1 - similaridade máxima)`.

Faixas solicitadas:
- **> 60% único:** manter;
- **30–60% único:** candidata a enriquecimento com dado local real;
- **< 30% único:** candidata a consolidação ou noindex;
- **> 85% de similaridade:** candidata forte a thin/duplicate content.

### Observação metodológica

Para o lote inteiro, o acesso diagnóstico foi feito sobre as fontes canônicas que alimentam os blocos variáveis do `<main>`, em vez de um navegador local com `dist/` recém-compilado. Isso é intencionalmente conservador: mede justamente a parte que deveria ser diferente e evita inflar similaridade com layout compartilhado. A auditoria SSR já existente em `docs/relatorio-canibalizacao-4b.md` é usada separadamente como evidência de controle para a camada editorial.

## 2. Inventário exato

### 2.1 Páginas de bairro — `/bairros/<slug>`

Há **233 rotas explícitas** `bairros_.*.tsx`, divididas em três famílias reais:

| Família | Componente/base | Páginas |
| --- | --- | ---: |
| Bairro enriquecido | `BairroLocalLayout` + `BAIRROS` | 31 |
| Bairro legado inline | `BairroTemplate` | 190 |
| Malha territorial rasa | `BairroMalhaLayout` + `bairrosMalha` | 12 |
| **Total** |  | **233** |

### 2.2 Serviço × cidade — `/servicos/<servico>/<cidade>`

O gerador moderno declara **17 serviços × 16 cidades = 272 combinações** em `ServicoCidadePage`.

Há ainda **19 rotas literais serviço×cidade** em `src/routes`; 12 substituem combinações do gerador moderno por precedência de rota literal e 7 usam slugs de serviço adicionais. Portanto o universo distinto atual de `/servicos/<servico>/<cidade>` é:

**272 - 12 + 19 = 279 páginas.**

Dessas:
- **260** são efetivamente renderizadas por `ServicoCidadePage`;
- **19** são renderizadas por `ServicoBairroTemplate` em arquivos estáticos dedicados.

Serviços do produto cartesiano moderno (17): `formatacao-computador`, `remocao-virus`, `conserto-notebook`, `conserto-pc`, `conserto-tv`, `conserto-celular`, `upgrade-ssd`, `redes-wifi`, `backup-recuperacao`, `suporte-empresas`, `atendimento-remoto`, `montagem-de-pc`, `pc-gamer`, `suporte-home-office`, `suporte-tecnico-empresarial`, `manutencao-preventiva-empresas`, `backup-para-empresas`.

Cidades do produto cartesiano moderno (16): `curitiba`, `sao-jose-dos-pinhais`, `araucaria`, `campo-largo`, `pinhais`, `colombo`, `almirante-tamandare`, `fazenda-rio-grande`, `piraquara`, `campo-magro`, `quatro-barras`, `balsa-nova`, `contenda`, `mandirituba`, `tijucas-do-sul`, `rio-branco-do-sul`.

Rotas literais serviço×cidade (19):

- `/servicos/conserto-pc-notebook/araucaria`
- `/servicos/conserto-pc-notebook/campo-largo`
- `/servicos/conserto-pc-notebook/pinhais`
- `/servicos/conserto-pc-notebook/sao-jose-dos-pinhais`
- `/servicos/formatacao-computador/araucaria`
- `/servicos/formatacao-computador/campo-largo`
- `/servicos/formatacao-computador/pinhais`
- `/servicos/formatacao-computador/sao-jose-dos-pinhais`
- `/servicos/redes-wifi/araucaria`
- `/servicos/redes-wifi/campo-largo`
- `/servicos/redes-wifi/pinhais`
- `/servicos/redes-wifi/sao-jose-dos-pinhais`
- `/servicos/remocao-virus/araucaria`
- `/servicos/remocao-virus/campo-largo`
- `/servicos/remocao-virus/pinhais`
- `/servicos/remocao-virus/sao-jose-dos-pinhais`
- `/servicos/upgrade-ssd-memoria/araucaria`
- `/servicos/upgrade-ssd-memoria/pinhais`
- `/servicos/upgrade-ssd-memoria/sao-jose-dos-pinhais`

### 2.3 Serviço × bairro — `/servicos/<servico>/<bairro>`

Embora seja uma camada adjacente ao pedido principal, ela usa o mesmo motor local e foi incluída para não esconder duplicidade na malha.

- **45** rotas literais serviço×bairro em `src/routes`;
- **11** combinações adicionais geradas por `servicoBairroFactory.ts`;
- total distinto: **56 páginas serviço×bairro**.

Somando as 19 serviço×cidade estáticas, a família `ServicoBairroTemplate` possui **75 páginas**.

### 2.4 Legado nacional serviço × cidade — `/arrumar-pc/servico/<servico>/<cidade>`

O gerador possui **6 serviços × 20 cidades = 120 páginas** usando `ArrumarPCServicoCidadeTemplate`.

Serviços (6): `formatacao-windows`, `remocao-de-virus`, `pc-lento`, `tela-azul`, `wifi-e-internet`, `recuperacao-de-arquivos`.

Cidades (20): `sao-paulo`, `rio-de-janeiro`, `belo-horizonte`, `brasilia`, `porto-alegre`, `florianopolis`, `salvador`, `recife`, `fortaleza`, `manaus`, `campinas`, `goiania`, `curitiba-nacional`, `belem`, `natal`, `joao-pessoa`, `vitoria`, `cuiaba`, `campo-grande`, `maceio`.

## 3. Resultado por família de template

| Família de template | Total | % médio de conteúdo único | Páginas >85% similares | >60% único | 30–60% | <30% | Recomendação sugerida pela faixa |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `BairroLocalLayout` | 31 | **97,8%** | 0 | 31 | 0 | 0 | Manter |
| `BairroTemplate` legado | 190 | **51,3%** | **71** | 100 | 0 | **90** | Família média pede enriquecimento; tratar os 90 casos <30% como candidatos a consolidação/noindex |
| `BairroMalhaLayout` | 12 | **0,0%** | **12** | 0 | 0 | 12 | Candidata a consolidação/noindex; o código já os identifica como SHALLOW |
| `ServicoCidadePage` | 260 | **6,1%** | **244** | 16 | 0 | **244** | Separar coortes: manter os 16 autorais; revisar os 244 fallbacks |
| `ServicoBairroTemplate` | 75 | **75,4%** | 4 | 65 | 2 | 8 | Manter a família; enriquecer 2 e revisar/consolidar 8 casos fracos |
| `ArrumarPCServicoCidadeTemplate` | 120 | **0,0%** | **120** | 0 | 0 | **120** | Candidata a consolidação/noindex |
| **Total da malha auditada** | **688** | **29,1%** | **451** | **212** | **2** | **474** | Diagnóstico apenas; nenhuma ação aplicada |

### Totais estritos do escopo pedido

Se forem consideradas **somente** as 233 páginas `/bairros/*` + as 279 serviço×cidade modernas + as 120 serviço×cidade legadas, sem as 56 serviço×bairro adicionais:

- **>60% único: 166 páginas**
- **30–60% único: 0 páginas**
- **<30% único: 466 páginas**
- total: **632 páginas**
- páginas com >85% de similaridade: **447**

Se for considerada a **malha local programática completa**, incluindo as 56 serviço×bairro:

- **>60% único: 212 páginas**
- **30–60% único: 2 páginas**
- **<30% único: 474 páginas**
- total: **688 páginas**
- páginas com >85% de similaridade: **451**

## 4. BairroLocalLayout — 31/31 páginas enriquecidas

Campos comparados: `introducaoLocal`, `contextoLocal`, `logisticaLocal`, `operacaoLocal`, `atendimentoLocal`, `coletaBancada` e `publicoAtendido`. FAQ e blocos compartilhados foram excluídos.

Resultado:
- média de conteúdo único: **97,8%**;
- maior similaridade observada: **0,062**;
- 0 páginas acima de 85% de similaridade;
- 31/31 na faixa >60%.

Os pares mais próximos ainda são muito diferentes:
- Santa Felicidade ↔ Sítio Cercado: 6,2% de similaridade;
- Xaxim ↔ Boqueirão: 5,8%.

**Leitura:** essa coorte tem conteúdo local genuinamente distinto.

## 5. BairroTemplate legado — 190/190 páginas

Esta é a família mais heterogênea. Há lotes autorais fortes e lotes produzidos por substituição de bairro/cidade.

| Onda/localidade | Páginas | Único médio | >85% similares | >60% | 30–60% | <30% |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| São José dos Pinhais | 19 | 81,1% | 2 | 17 | 0 | 2 |
| Araucária | 26 | 56,9% | 2 | 13 | 0 | 13 |
| Campo Largo | 26 | 46,7% | 13 | 13 | 0 | 13 |
| Colombo | 19 | 48,0% | 6 | 8 | 0 | 11 |
| Pinhais | 26 | 47,9% | 13 | 13 | 0 | 13 |
| Fazenda Rio Grande | 14 | 48,0% | 7 | 7 | 0 | 7 |
| Almirante Tamandaré | 14 | 46,0% | 7 | 7 | 0 | 7 |
| Piraquara | 13 | 27,9% | 9 | 4 | 0 | 9 |
| Campo Magro + Quatro Barras | 18 | 26,6% | 12 | 6 | 0 | 12 |
| Curitiba legado | 15 | 80,4% | 0 | 12 | 0 | 3 |
| **Total** | **190** | **51,3%** | **71** | **100** | **0** | **90** |

### Clusters mais críticos

Após mascarar somente o nome da localidade, foram encontrados blocos **literalmente idênticos** (Jaccard 1,000) em ondas inteiras. Exemplos:

- **Pinhais — 13 páginas:** Emiliano Perneta, Maria Antonieta, Vargem Grande, Estância Pinhais, Alto Tarumã, Graciosa, Jardim Amélia, Palmital, Atuba Pinhais, Sete Vilas, Vila Tarumã, Vale das Águas e Jardim Cláudia.
- **Campo Largo — 13 páginas:** Jardim América, Botiatuva, Rondinha, São Silvestre, Três Córregos, Itaqui, Ouro Fino, Bateias, Palmital, Santa Cruz, Correia de Freitas, Jardim Planalto e Vila Solene.
- **Fazenda Rio Grande — 7 páginas:** Iguaçu, Gralha Azul, Santa Terezinha, Jardim Estados, Pioneiros, São Lourenço e Hortência.
- **Almirante Tamandaré — 7 páginas:** Tanguá, São Venâncio, Jardim Graziela, Jardim Roma, Colônia Antônio Prado, Tranqueira e Jardim Paraíso.
- **Piraquara — 8 páginas** com texto idêntico; `/bairros/centro-piraquara` também chega a 91,2% de similaridade com o cluster.
- **Campo Magro — 5 páginas** idênticas + centro com 91,6%; **Quatro Barras — 5 páginas** idênticas + centro com 91,6%.
- **São José dos Pinhais:** `ipe-sjp` ↔ `borda-do-campo-sjp` = 100%.
- **Araucária:** Costeira ↔ Fazenda Velha = 87,0%.
- **Colombo:** seis páginas passam de 85%; o maior par chega a 89,9%.

Há ainda páginas na faixa <30% único sem ultrapassar 85% de similaridade, por exemplo Cristo Rei/Tingui/Uberaba no lote Curitiba (76,5% similares). Por isso a coluna “<30%” é maior que a coluna “>85% similares”.

## 6. BairroMalhaLayout — 12 páginas

O próprio código descreve essa coorte como `SHALLOW`. Depois de excluir modalidades, serviços, navegação e CTAs compartilhados e mascarar nome/cidade, não resta bloco editorial local próprio: o texto específico é uma frase gerada por interpolação.

Resultado:
- média única: **0%**;
- 12/12 com similaridade estrutural máxima;
- 12/12 na faixa <30%.

**Recomendação diagnóstica:** candidatas a permanecer fora do índice até receber dado local verificável, ou a serem consolidadas. **Nenhuma política foi alterada nesta rodada.**

## 7. ServicoCidadePage — 260 páginas efetivamente dinâmicas

Existem duas coortes completamente diferentes dentro do mesmo componente:

### 7.1 Com bloco local autoral — 16 páginas

Fontes: `servicoCuritibaBlocos.json` e `servicoSjpBlocos.json`, descontando a rota de Wi-Fi/SJP que é substituída por rota literal.

Comparados `intro` + parágrafos dos blocos locais, sem FAQ/CTA:
- média única: **99,1%**;
- maior similaridade: 1,9%;
- 16/16 >60%;
- 0 candidatas >85%.

### 7.2 Fallback genérico — 244 páginas

Essas páginas não possuem bloco local autoral. Retirado o conteúdo compartilhado por design, a variação substantiva é apenas serviço/cidade interpolados.

Resultado conservador:
- conteúdo local único: **0%**;
- 244/244 <30%;
- 244/244 com uma página irmã >85% similar dentro da família.

**Recomendação diagnóstica:** não misturar os 16 casos autorais com os 244 fallbacks. Os 16 podem ser mantidos; os 244 são candidatos a enriquecimento real, consolidação ou noindex conforme prioridade/mercado. Nada foi aplicado.

## 8. ServicoBairroTemplate — 75 páginas

A família reúne três coortes:

| Coorte | Páginas | Único médio | >85% similares | >60% | 30–60% | <30% |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Builders Wi-Fi/TV | 31 | 53,0% | 4 | 21 | 2 | 8 |
| Estáticas inline dedicadas | 33 | 88,5% | 0 | 33 | 0 | 0 |
| Factory 4S com blocos autorais | 11 | 99,1% | 0 | 11 | 0 | 0 |
| **Total** | **75** | **75,4%** | **4** | **65** | **2** | **8** |

Os 8 casos <30% estão concentrados nos pares Wi-Fi/TV que reutilizam a mesma narrativa do bairro:
- Alto da XV: TV ↔ Wi-Fi = 89,1% similares;
- Rebouças: TV ↔ Wi-Fi = 88,6%;
- Jardim das Américas: TV ↔ Wi-Fi = 81,5%;
- Ecoville: TV ↔ Wi-Fi = 76,9%.

Os **2 casos na faixa 30–60%** são TV/Wi-Fi no Cajuru, ambos com 59,7% de conteúdo único.

A antiga quarentena de 11 combinações do factory não está mais textualmente rasa: os blocos 4S atuais medem média de 99,1% único. O histórico de 81–83% de sobreposição registrado no código descreve o estado anterior à reabilitação, não o estado textual atual dos blocos exclusivos.

## 9. ArrumarPCServicoCidadeTemplate — 120 páginas

O produto cartesiano é 6 serviços × 20 cidades. A cidade é interpolada em title/H1/copy, enquanto descrição e problemas são definidos no nível do serviço e repetidos em todas as cidades.

Retirados CTA/FAQ/layout e mascarada a cidade:
- 120/120 ficam na faixa <30%;
- 120/120 têm irmã estrutural >85% similar;
- média de conteúdo local único: **0%**.

**Recomendação diagnóstica:** candidata a consolidação/noindex por não conter contexto verificável próprio de cada cidade. O estado atual de indexação não foi modificado.

## 10. Cruzamento com os 109 pares /problemas × /blog

A documentação existente em `reports/national-authority-overlap.md` contém **109 pares** e classifica **109/109 como `BRIDGE`**. O próprio relatório registra que termos compartilhados não significam canibalização estrutural porque:
- `/problemas/*` responde a diagnóstico/local;
- `/blog/*` responde a intenção educacional/nacional.

Esse padrão **não é o mesmo** encontrado nos clusters programáticos acima, nos quais há substituição de localidade sobre texto praticamente igual e Jaccard de 0,85 a 1,00.

Como controle adicional, `docs/relatorio-canibalizacao-4b.md` mede HTML SSR de uma amostra editorial e encontrou:
- maior Jaccard textual: **0,128**;
- **0 pares** acima do teto de 0,34;
- veredito geral: **OK**.

Portanto, **nenhum dos 109 pares é elevado a “prioridade mais alta por duplicação estrutural” neste relatório**. Isso não elimina a necessidade de governança semântica: os “casos de maior atenção” do relatório de overlap continuam merecendo interlinking e separação clara de intenção, mas não devem ser confundidos com clones programáticos.

Observação: a matriz de 109 é um relatório de overlap de termos/intenção; a medição SSR 4B é uma amostra textual separada, não um recálculo full-body dos 109 pares. A conclusão aqui é “não há evidência do mesmo padrão de clone”, não “similaridade zero”.

## 11. Priorização sugerida para a próxima rodada — sem aplicar

1. **Manter como está:** 31 bairros `BairroLocalLayout`, 16 serviço×cidade com bloco autoral, 33 páginas estáticas dedicadas de `ServicoBairroTemplate` e 11 páginas factory 4S.
2. **Enriquecer com dado local real:** os 2 casos Cajuru na faixa 30–60% e, por ordem de impacto, os lotes legados cujo conteúdo médio ficou entre 30–60% quando agregados por onda.
3. **Candidatas a consolidação/noindex:** 90 bairros legado <30%, 12 páginas `BairroMalhaLayout`, 244 fallbacks de `ServicoCidadePage`, 120 páginas `ArrumarPCServicoCidadeTemplate` e 8 builders Wi-Fi/TV <30%.
4. Antes de qualquer mudança futura de indexabilidade, cruzar essas candidatas com tráfego, impressões GSC, backlinks, conversão e evidência local real. Este relatório sozinho mede conteúdo, não valor comercial.

## 12. Confirmação de não alteração

Nesta rodada:
- não foi alterado `robots`;
- não foi adicionado/removido `noindex`;
- não foi alterado sitemap;
- nenhuma rota foi apagada, mesclada ou redirecionada;
- nenhuma página foi reescrita;
- nenhum componente foi alterado.

## Apêndice A — 233 rotas /bairros inventariadas

<details>
<summary>Expandir lista completa</summary>

- `/bairros/academia-sjp`
- `/bairros/afonso-pena`
- `/bairros/agricola-sjp`
- `/bairros/agua-verde`
- `/bairros/alto-boqueirao`
- `/bairros/alto-da-gloria`
- `/bairros/alto-da-xv`
- `/bairros/alto-maracana`
- `/bairros/alto-taruma`
- `/bairros/antonio-olivero-cm`
- `/bairros/aristocrata`
- `/bairros/atuba`
- `/bairros/atuba-colombo`
- `/bairros/atuba-pinhais`
- `/bairros/aviacao`
- `/bairros/bacacheri`
- `/bairros/bairro-alto`
- `/bairros/barigui-araucaria`
- `/bairros/barro-preto`
- `/bairros/bateias`
- `/bairros/batel`
- `/bairros/bigorrilho`
- `/bairros/boa-vista`
- `/bairros/boa-vista-at`
- `/bairros/boneca-do-iguacu-sjp`
- `/bairros/boqueirao`
- `/bairros/boqueirao-araucaria`
- `/bairros/borda-campo-sjp`
- `/bairros/borda-do-campo-qb`
- `/bairros/borda-do-campo-sjp`
- `/bairros/botiatuva`
- `/bairros/botiatuva-cm`
- `/bairros/braga`
- `/bairros/butiatuvinha`
- `/bairros/cabral`
- `/bairros/cachoeira-araucaria`
- `/bairros/cachoeira-at`
- `/bairros/caiua-piraquara`
- `/bairros/cajuru`
- `/bairros/california-araucaria`
- `/bairros/campina-da-barra`
- `/bairros/campina-do-siqueira`
- `/bairros/campina-grande-colombo`
- `/bairros/campo-comprido`
- `/bairros/campo-largo-roseira-sjp`
- `/bairros/campo-pequeno`
- `/bairros/campo-tenente-at`
- `/bairros/capao-da-imbuia`
- `/bairros/capela-velha`
- `/bairros/centro`
- `/bairros/centro-almirante-tamandare`
- `/bairros/centro-araucaria`
- `/bairros/centro-campo-largo`
- `/bairros/centro-campo-magro`
- `/bairros/centro-civico`
- `/bairros/centro-colombo`
- `/bairros/centro-fazenda-rio-grande`
- `/bairros/centro-pinhais`
- `/bairros/centro-piraquara`
- `/bairros/centro-quatro-barras`
- `/bairros/chapada`
- `/bairros/cic`
- `/bairros/cidade-jardim-sjp`
- `/bairros/colonia-antonio-prado`
- `/bairros/colonia-malhada-cl`
- `/bairros/colonia-murici-sjp`
- `/bairros/correia-de-freitas`
- `/bairros/costeira`
- `/bairros/costeira-araucaria`
- `/bairros/cristo-rei`
- `/bairros/cruzeiro`
- `/bairros/del-rey`
- `/bairros/embu-colombo`
- `/bairros/emiliano-perneta`
- `/bairros/espigao-alegre-cm`
- `/bairros/estacao-araucaria`
- `/bairros/estancia-pinhais`
- `/bairros/eucaliptos-frg`
- `/bairros/fanny`
- `/bairros/fatima-colombo`
- `/bairros/fazenda-velha-araucaria`
- `/bairros/fazendinha`
- `/bairros/ferraria`
- `/bairros/gabirobal`
- `/bairros/graciosa`
- `/bairros/graciosa-qb`
- `/bairros/gralha-azul`
- `/bairros/guabirotuba`
- `/bairros/guajuvira`
- `/bairros/guaraituba-colombo`
- `/bairros/guarituba-piraquara`
- `/bairros/guatupe`
- `/bairros/hauer`
- `/bairros/hortencia-frg`
- `/bairros/hugo-lange`
- `/bairros/iguacu-araucaria`
- `/bairros/iguacu-frg`
- `/bairros/independencia-sjp`
- `/bairros/industrial-araucaria`
- `/bairros/ipe-sjp`
- `/bairros/irai-piraquara`
- `/bairros/italia-sjp`
- `/bairros/itaqui`
- `/bairros/jardim-amelia`
- `/bairros/jardim-america-campo-largo`
- `/bairros/jardim-bela-vista-piraquara`
- `/bairros/jardim-boa-vista-araucaria`
- `/bairros/jardim-boa-vista-cm`
- `/bairros/jardim-botanico`
- `/bairros/jardim-claudia`
- `/bairros/jardim-claudia-ii-pinhais`
- `/bairros/jardim-condor-frg`
- `/bairros/jardim-das-americas`
- `/bairros/jardim-das-pedras-frg`
- `/bairros/jardim-dona-rosa-pinhais`
- `/bairros/jardim-esperanca-cl`
- `/bairros/jardim-esplanada-pinhais`
- `/bairros/jardim-estados`
- `/bairros/jardim-florestal-qb`
- `/bairros/jardim-graziela`
- `/bairros/jardim-guilhermina`
- `/bairros/jardim-iguacu-araucaria`
- `/bairros/jardim-ipe-frg`
- `/bairros/jardim-japao-qb`
- `/bairros/jardim-karla-pinhais`
- `/bairros/jardim-laranjeiras-cl`
- `/bairros/jardim-menino-deus-qb`
- `/bairros/jardim-monte-santo`
- `/bairros/jardim-novo-horizonte-cl`
- `/bairros/jardim-osasco`
- `/bairros/jardim-paraiso-at`
- `/bairros/jardim-paranagua-at`
- `/bairros/jardim-pedro-demeterco`
- `/bairros/jardim-planalto-campo-largo`
- `/bairros/jardim-planalto-ii-cl`
- `/bairros/jardim-primavera-piraquara`
- `/bairros/jardim-roma`
- `/bairros/jardim-santo-antonio-piraquara`
- `/bairros/jardim-sao-jorge-at`
- `/bairros/jardim-sao-paulo-piraquara`
- `/bairros/jardim-shangrila-araucaria`
- `/bairros/jardim-social`
- `/bairros/jardim-tropical-pinhais`
- `/bairros/jardim-uniao-piraquara`
- `/bairros/jardim-wissinger-pinhais`
- `/bairros/joquei-clube-cm`
- `/bairros/juveve`
- `/bairros/lamenha-grande-cl`
- `/bairros/lindoia`
- `/bairros/maracana-colombo`
- `/bairros/maria-antonieta`
- `/bairros/merces`
- `/bairros/monza-colombo`
- `/bairros/nacoes-frg`
- `/bairros/novo-mundo`
- `/bairros/osvaldo-cruz-colombo`
- `/bairros/ouro-fino`
- `/bairros/ouro-fino-sjp`
- `/bairros/palmital-campo-largo`
- `/bairros/palmital-colombo`
- `/bairros/palmital-pinhais`
- `/bairros/parque-da-fonte`
- `/bairros/parque-industrial-frg`
- `/bairros/parque-nascentes-pinhais`
- `/bairros/passauna`
- `/bairros/pedro-moro-sjp`
- `/bairros/pineville`
- `/bairros/pinheirinho`
- `/bairros/pioneiros-frg`
- `/bairros/planta-deodoro-piraquara`
- `/bairros/planta-sao-tiago-araucaria`
- `/bairros/portao`
- `/bairros/porto-das-laranjeiras`
- `/bairros/prado-velho`
- `/bairros/prado-velho-piraquara`
- `/bairros/quississana-sjp`
- `/bairros/reboucas`
- `/bairros/rio-pequeno-sjp`
- `/bairros/rio-verde-cm`
- `/bairros/roca-grande`
- `/bairros/rondinha`
- `/bairros/sabia`
- `/bairros/santa-cruz-campo-largo`
- `/bairros/santa-felicidade`
- `/bairros/santa-quiteria`
- `/bairros/santa-terezinha-colombo`
- `/bairros/santa-terezinha-frg`
- `/bairros/sao-cristao-piraquara`
- `/bairros/sao-cristovao`
- `/bairros/sao-dimas-colombo`
- `/bairros/sao-domingos`
- `/bairros/sao-francisco`
- `/bairros/sao-gabriel-colombo`
- `/bairros/sao-jose-campo-largo`
- `/bairros/sao-jose-dos-pinhais`
- `/bairros/sao-lourenco-frg`
- `/bairros/sao-lourenco-qb`
- `/bairros/sao-marcos`
- `/bairros/sao-marcos-campo-largo`
- `/bairros/sao-miguel-araucaria`
- `/bairros/sao-sebastiao-cm`
- `/bairros/sao-silvestre`
- `/bairros/sao-venancio`
- `/bairros/sede-campo-magro`
- `/bairros/seminario`
- `/bairros/sete-vilas`
- `/bairros/sitio-cercado`
- `/bairros/tangua-at`
- `/bairros/taruma`
- `/bairros/taxiqueira-colombo`
- `/bairros/thomaz-coelho`
- `/bairros/thomaz-coelho-ii`
- `/bairros/timbotuva-cl`
- `/bairros/tindiquera`
- `/bairros/tingui`
- `/bairros/tranqueira-at`
- `/bairros/tres-corregos`
- `/bairros/uberaba`
- `/bairros/vale-das-aguas`
- `/bairros/vargem-grande`
- `/bairros/vila-amelia-pinhais`
- `/bairros/vila-candida-cl`
- `/bairros/vila-izabel`
- `/bairros/vila-macedo-piraquara`
- `/bairros/vila-maria-antonieta-pinhais`
- `/bairros/vila-maria-qb`
- `/bairros/vila-nova-araucaria`
- `/bairros/vila-sao-jose-qb`
- `/bairros/vila-solene`
- `/bairros/vila-taruma`
- `/bairros/vista-alegre`
- `/bairros/weissopolis`
- `/bairros/xaxim`

</details>

## Apêndice B — definição exaustiva das matrizes serviço×cidade

### B.1 /servicos/&lt;servico&gt;/&lt;cidade&gt;

Produto cartesiano moderno:
- serviços (17): `formatacao-computador`, `remocao-virus`, `conserto-notebook`, `conserto-pc`, `conserto-tv`, `conserto-celular`, `upgrade-ssd`, `redes-wifi`, `backup-recuperacao`, `suporte-empresas`, `atendimento-remoto`, `montagem-de-pc`, `pc-gamer`, `suporte-home-office`, `suporte-tecnico-empresarial`, `manutencao-preventiva-empresas`, `backup-para-empresas`;
- cidades (16): `curitiba`, `sao-jose-dos-pinhais`, `araucaria`, `campo-largo`, `pinhais`, `colombo`, `almirante-tamandare`, `fazenda-rio-grande`, `piraquara`, `campo-magro`, `quatro-barras`, `balsa-nova`, `contenda`, `mandirituba`, `tijucas-do-sul`, `rio-branco-do-sul`;
- combinações: **272**.

Além disso, as 19 rotas literais listadas na seção 2.2 têm precedência/adição conforme o slug, produzindo **279 URLs distintas**.

### B.2 /arrumar-pc/servico/&lt;servico&gt;/&lt;cidade&gt;

Produto cartesiano legado:
- serviços (6): `formatacao-windows`, `remocao-de-virus`, `pc-lento`, `tela-azul`, `wifi-e-internet`, `recuperacao-de-arquivos`;
- cidades (20): `sao-paulo`, `rio-de-janeiro`, `belo-horizonte`, `brasilia`, `porto-alegre`, `florianopolis`, `salvador`, `recife`, `fortaleza`, `manaus`, `campinas`, `goiania`, `curitiba-nacional`, `belem`, `natal`, `joao-pessoa`, `vitoria`, `cuiaba`, `campo-grande`, `maceio`;
- combinações: **120**.

## Apêndice C — arquivos-fonte de referência

- `src/routes/*`
- `src/components/bairro/BairroLocalLayout.tsx`
- `src/components/bairro/BairroMalhaLayout.tsx`
- `src/pages/bairros/BairroTemplate.tsx`
- `src/lib/bairrosData.ts` + `bairrosLote2..5.ts`
- `src/lib/bairrosMalha.ts`
- `src/pages/servico-bairro/ServicoCidadePage.tsx`
- `src/pages/servico-bairro/ServicoBairroTemplate.tsx`
- `src/pages/servico-bairro/wifiTvBairroData.ts`
- `src/lib/servicoBairroFactory.ts`
- `src/lib/servicoBairroBlocos4s.json`
- `src/lib/servicoCuritibaBlocos.json`
- `src/lib/servicoSjpBlocos.json`
- `src/pages/arrumar-pc/ArrumarPCServicoCidadeTemplate.tsx`
- `src/pages/arrumar-pc/cities.ts`
- `src/pages/arrumar-pc/services.ts`
- `reports/national-authority-overlap.md`
- `docs/relatorio-canibalizacao-4b.md`
