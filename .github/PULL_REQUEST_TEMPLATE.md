# Evidências de evolução — O Técnico de Informática
> Modelo operacional de PR. Não altera navegação pública, conteúdo editorial ou parâmetros comerciais.

## Micro-rodada e rastreabilidade
- Objetivo e escopo mínimo:
- Issue / tarefa de origem:
- Ambiente: [ ] local [ ] CI [ ] preview [ ] produção (somente verificada)
- Etapa: [ ] planejamento [ ] desenvolvimento [ ] QA [ ] homologação [ ] publicação [ ] monitoramento [ ] saneamento
- Status: [ ] aberto [ ] em validação [ ] bloqueado [ ] pronto para publicar [ ] publicado [ ] concluído [ ] obsoleto
- Progresso documentado: __% (critérios medidos, não estimativa de publicação)
- Base `main` (SHA):
- HEAD candidato (SHA):
- HEAD validado + data:
- Versão/deployment real (se aplicável):

## Fato × intenção
- **Executado nesta PR:** (somente mudanças presentes no diff)
- **Apenas verificado:** (consulta, CI ou QA sem alteração)
- **Depende de validação manual:** (login, visual, homologação, aprovação)
- **Não alterar:** (limites explícitos do escopo)
- **Dependências externas / bloqueios:**

## Evidências — sem alegações não comprovadas
- Diff/commit:
- CI, jobs e run URLs:
- Preview/HTTP/QA reais (URL, data, viewport):
- Prints ou artefatos (URLs; ocultar dados privados):
- Sem evidência: escrever **NÃO VALIDADO**, nunca PASS por inferência.

## Conclusão e não regressão
- [ ] Escopo limitado ao tema da PR, sem perda de commits exclusivos
- [ ] HEAD e checks obrigatórios correspondem à versão candidata
- [ ] Critérios funcionais e de segurança aplicáveis atendidos
- [ ] Nenhum dado, segredo, contato privado ou funil afetado fora do escopo
- [ ] Publicação separada de merge: se não houve publicação, registrar **NÃO PUBLICADO**
- [ ] Decisão de merge humana e pós-merge conferida

## Limpeza de fila (somente se pertinente)
- Item/branch candidato:
- Prova de integração/substituição:
- Comparação de commits exclusivos:
- Dependências/checks pendentes:
- Autorização explícita e URL do encerramento externo:
- **Nenhuma exclusão automática** a partir deste checklist.

## Aceite específico O Técnico
- [ ] Marca e domínio oficiais preservados; `npm run check:brand-isolation` quando aplicável.
- [ ] Guia/SEO: intenção própria, fontes primárias, autoria sustentada, interlinks e sitemap curado (nunca indexação prometida).
- [ ] Claims, avaliações, imagens e números comerciais sustentados por prova; sem imagens IA.
- [ ] Preços/prazos somente pela configuração canônica, sem novos valores literais.
- [ ] Gates obrigatórios pertinentes: `npm run verify`, `npm run build`, `npm run deploy:check` e a11y quando houver browser; **build verde não é publicação**.
- [ ] Quando houver mudança visual, incluir QA mobile 390/1440 e `prefers-reduced-motion`; quando houver analytics, não expor dados pessoais nem inferir pedidos de cliques WhatsApp.
- [ ] Nenhuma rota, slug ou canonical existente alterada sem aprovação explícita.
