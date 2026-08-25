# P0 — JSON-LD SSR determinístico

Status: **RESOLVIDO** · Escopo: apenas infraestrutura de renderização. Nenhuma
mudança de conteúdo, URL, metadado ou schema. Rodada 4C **não** iniciada.

## 1. Sintoma

Algumas respostas SSR omitiam os schemas específicos da rota e serviam apenas
os 2 globais (`Organization`, `WebSite`), em vez dos 6–7 esperados. O mesmo
commit, na mesma URL, alternava entre HTML completo e HTML pobre — daí a
classificação inicial como "intermitência de infraestrutura".

## 2. Reprodução determinística

`scripts/p0/render-jsonld-once.mjs` executa **um render por processo Node**,
com cache de módulos vazio. Isso reproduz o isolate frio de produção, que
nenhum teste in-process alcança (o segundo render do mesmo processo já está
quente).

Baseline antes da correção, 30 execuções por rota:

| Rota | Variantes de JSON-LD | Blocos |
| --- | --- | --- |
| `/` (import estático) | 1 | 7..7 |
| `/problemas/computador-lento` | 2 | 2..6 |
| `/servicos/upgrade-ssd-ram` | 2 | 2..7 |
| `/blog/como-resolver-tela-azul-windows` | 2 | 2..7 |
| `/bairros/boqueirao` | 2 | 2..6 |

A home era a única estável — e é a única página com import estático. Todas as
demais são `React.lazy`. Essa correlação isolou a causa.

## 3. Causa raiz (provada, não suposta)

O sink que serializa o JSON-LD coletado era **irmão** do ponto de suspensão.

Em isolate frio o chunk da página ainda não está no cache de módulos: o subtree
suspende e o React Fizz **continua renderizando os irmãos**, adiando a página
para outra tarefa de stream. O sink então executava **antes** de a rota
registrar seus slots no coletor da requisição, e o HTML saía apenas com os nós
institucionais. Em isolate quente nada suspendia, o sink via o conjunto
completo e o mesmo commit servia 6–7 blocos.

Isso invalida qualquer sink irmão, inclusive dentro da fronteira de `Suspense`
do `__root` — hipótese testada e descartada: continuava servindo 2 blocos.

## 4. Correção estrutural

O sink passa a ser composto **dentro do módulo resolvido da página**, deixando
de ser irmão do ponto de suspensão:

- `src/legacyRouteElements.tsx` — `comSinkDeJsonLd` envolve o componente da
  página e `lazyPagina` aplica essa composição no `.then()` do `React.lazy`
  (410 páginas). A home, import estático, usa o mesmo wrapper.
- `src/routes/blog_.$slug.tsx` — única rota fora do mapa legado; compõe o sink
  explicitamente.
- `src/routes/__root.tsx` — deixa de emitir o sink; mantém apenas o provider do
  coletor e o registro institucional.

Sem timer, delay, retry, dupla renderização ou dependência de hidratação: a
garantia é de ordem de renderização dentro de um segmento já resolvido.

## 5. Verificação

`npm run check:jsonld-ssr` (12 renders por rota, cada um em processo novo):

```
OK   /                                      | variantes=1 | blocos=7..7
OK   /problemas/computador-lento            | variantes=1 | blocos=6..6
OK   /servicos/upgrade-ssd-ram              | variantes=1 | blocos=7..7
OK   /blog/como-resolver-tela-azul-windows  | variantes=1 | blocos=7..7
OK   /bairros/boqueirao                     | variantes=1 | blocos=6..6
```

Regressões: 720 testes unitários verdes, typecheck limpo, build OK,
`check:schema-standards` com 464 nós em 153 páginas indexáveis (0 não
renderizadas) e `check:geo` sem falhas novas.

## 6. Proteção permanente

O gate `check:jsonld-ssr` roda no CI logo após `check:schema-standards`. É
fail-closed: sem `dist/server/index.mjs` ele falha em vez de passar vazio.
Qualquer sink que volte a ser irmão de um `React.lazy` reprova o build.
