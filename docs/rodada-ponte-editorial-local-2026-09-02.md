# Rodada via Git — ponte editorial local

**Data:** 2026-09-02  
**Escopo:** páginas canônicas de cidade e bairro  
**Status:** código publicado no main; deploy público depende do mecanismo documentado do projeto.

## Entrega

As páginas de cidades (/tecnico-informatica-*) e bairros (/bairros/*) passaram a oferecer uma ponte editorial antes dos blocos de serviços:

- Atlas de Informática;
- diagnóstico de computador lento ou Windows que não inicia;
- backup e preparação antes de formatar.

O texto explica que a localidade determina cobertura, mas não determina a causa do defeito. A sequência orienta o leitor e permite que ele resolva a dúvida sem contratar serviço.

## Segurança editorial

- Nenhuma URL nova foi criada.
- Canonicals, dados locais e política de indexação não foram alterados.
- As páginas SHALLOW continuam sem promoção automática a index.
- Não foram adicionados números, avaliações, prazos ou resultados inventados.
- O bloco comercial permanece separado do conteúdo de orientação.

## Validações

- check-route-tree — OK.
- check-national-authority-map — OK.
- check-interlinks-quality — OK: 75 links em 15 páginas, sem avisos.
- git diff --check — OK.
