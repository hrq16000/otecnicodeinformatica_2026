# Auditoria do acervo — rede, conectividade, segurança e backup

**Data da auditoria:** 2026-08-26  
**Escopo:** inventário do acervo editorial público, auxiliares e drafts; sem criação de URLs.  
**Branch de trabalho:** `codex/onda-11a-wifi-diagnostico`

## Resumo executivo

O inventário local possui **161 entradas** no `reports/national-authority-inventory.json`:

- **33** owners existentes;
- **128** drafts ou entradas noindex;
- o inventário de código editorial contém **187 artigos** (168 manuais e 19 programáticos), conforme `reports/editorial-inventory.md`.

A diferença entre 161 e 187 ocorre porque os relatórios têm universos diferentes: o primeiro inclui URLs classificadas na autoridade nacional; o segundo inclui o acervo editorial completo. Nenhum número deve ser tratado como “159 artigos públicos” sem definir o universo.

## Owners canônicos identificados

| Cluster | Owner principal | Papel | Situação | Drafts/auxiliares que não devem virar URL automaticamente |
| --- | --- | --- | --- | --- |
| Wi-Fi, cobertura e quedas | `/blog/como-melhorar-sinal-wifi-em-casa` | pilar diagnóstico | existente/indexável | `wifi-caindo-toda-hora`, `wifi-lento-como-melhorar` |
| Provedor, velocidade e roteador | `/blog/internet-lenta-provedor-ou-roteador` | pilar de separação de origem | existente no código | `como-fazer-teste-velocidade-internet`, `como-aumentar-velocidade-internet` |
| Configuração, segurança e mesh | `/blog/como-configurar-roteador-wifi-iniciantes` | pilar técnico | existente/indexável | `como-configurar-repetidor-wifi`, `como-usar-rede-wifi-para-visitas`, `como-trocar-senha-wifi` |
| Dispositivo na rede | `/blog/como-conectar-wifi-tv-nao-conecta` | satélite de equipamento | existente/indexável | casos específicos devem permanecer subordinados ao diagnóstico de rede |
| Backup doméstico | `/blog/backup-como-proteger-seus-arquivos` | pilar de proteção de dados | existing owner | `como-fazer-backup-na-nuvem`, `como-configurar-backup-automatizado` |
| Backup empresarial | `/blog/backup-nuvem-empresas-qual-escolher` | satélite empresarial | existing owner | drafts de nuvem devem separar sincronização, retenção e restauração |

## Mapa diagnóstico: Provedor × Rede local × Dispositivo

| Evidência observável | Provedor/enlace | Rede local | Dispositivo |
| --- | --- | --- | --- |
| Teste por cabo direto ruim em horários diferentes | hipótese forte | ainda possível, se cabo/roteador estiverem limitando | improvável se dois dispositivos repetem |
| Cabo bom, Wi-Fi perto bom, Wi-Fi longe ruim | descartado provisoriamente | cobertura, obstáculos, canal, mesh ou repetidor | improvável |
| Apenas um computador ou celular falha no mesmo cômodo | improvável | possível, se perfil/rede de convidados diferir | driver, adaptador, economia de energia ou configuração |
| Todos perdem internet, mas continuam conectados ao SSID | modem, DNS upstream ou provedor | roteador/DNS local também possível | improvável |
| Todos perdem o SSID e o roteador reinicia | enlace ou energia também devem ser conferidos | fonte, firmware, aquecimento ou roteador | improvável |
| Velocidade boa, chamadas e jogos instáveis | latência/perda no enlace | saturação de upload, bufferbloat ou interferência | adaptador pode agravar |
| Backup falha apenas quando o Wi-Fi cai | depende da origem da queda | rede local/interferência/cobertura | cliente pode perder sessão ou armazenamento |

## Duplicidades e canibalização: resultado da triagem

O acervo contém grupos de intenção que devem ser consolidados ou mantidos fora do índice. A regra aplicada é preservar o owner que responde ao diagnóstico amplo e usar drafts como fonte de perguntas, não como páginas automáticas.

### Grupo Wi-Fi/velocidade

- Owner: `como-melhorar-sinal-wifi-em-casa` — cobertura, sinal e quedas no ambiente.
- Owner: `internet-lenta-provedor-ou-roteador` — teste por cabo, provedor, roteador e dispositivo.
- Não publicar separadamente, sem contrato de intenção: `wifi-lento-como-melhorar`, `wifi-caindo-toda-hora`, `como-fazer-teste-velocidade-internet`, `como-aumentar-velocidade-internet`.

### Grupo roteador/mesh/repetidor

- Owner: `como-configurar-roteador-wifi-iniciantes` — configuração, segurança, bandas e modo de operação.
- Enriquecimento deve cobrir mesh e repetidor como decisões comparativas dentro do owner.
- `como-configurar-repetidor-wifi` só merece conteúdo independente se houver intenção e prova técnica que não caibam no pilar.

### Grupo backup/nuvem/sincronização

- Owner: `backup-como-proteger-seus-arquivos` — backup preventivo e restauração.
- Owner: `backup-nuvem-empresas-qual-escolher` — ambiente empresarial, retenção e sincronização.
- `como-fazer-backup-na-nuvem` e `como-configurar-backup-automatizado` devem permanecer drafts até receberem contrato de intenção distinto.

## Priorização editorial

1. **P1 — diagnóstico de origem:** enriquecer `internet-lenta-provedor-ou-roteador` com velocidade × latência × perda e diário de evidências.
2. **P1 — cobertura e estabilidade:** enriquecer `como-melhorar-sinal-wifi-em-casa` com comparação por cômodo, banda, interferência e decisão mesh/repetidor/cabo.
3. **P1 — configuração segura:** enriquecer `como-configurar-roteador-wifi-iniciantes` com verificação pós-configuração, rede de convidados e segurança básica.
4. **P2 — proteção de dados:** conectar backup, nuvem, sincronização e restauração aos cenários de queda/intermitência.
5. **P2 — dispositivos:** manter TV, impressora e notebook como satélites de dispositivo, sempre apontando de volta ao diagnóstico de rede.

## Decisão

O acervo não precisa de dezenas de novas URLs para responder “minha internet/Wi-Fi está ruim”. A estratégia correta é enriquecer os owners canônicos, absorver perguntas úteis dos drafts e manter as variações programáticas noindex até revisão. O mapa Provedor × Rede local × Dispositivo deve ser a estrutura central de todos os próximos conteúdos desse cluster.

## Validação executada

- Inventário nacional lido do JSON de autoridade.
- Inventário editorial lido do relatório gerado pelo projeto.
- Registry, clusters, links internos e drafts relacionados cruzados.
- `node scripts/check-cannibalization.mjs` executado: 19 páginas comerciais P0 comparadas; nenhum conflito comercial P0 encontrado; dois avisos de proximidade em páginas comerciais foram reportados pelo próprio checker.

O checker comercial P0 não substitui a revisão editorial dos drafts; por isso os agrupamentos acima permanecem documentados como consolidação editorial, não como um falso “zero canibalização”.
