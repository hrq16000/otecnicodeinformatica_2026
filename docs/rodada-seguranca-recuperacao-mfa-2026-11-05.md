# Segurança — recuperação de MFA — 05/11/2026

Continuação da issue #397 e do PR #398. URL existente: /blog/como-configurar-2fa-em-tudo.

## Entrega editorial

Ampliado o guia existente, sem criar URL concorrente. Mantidos slug, título principal, data de publicação 2026-04-20, aprovação anterior, capa e canonical. Atualizada apenas a data de revisão material para 2026-11-05.

Incluída decisão por cenário: troca planejada, perda com método reserva, conta pessoal sem alternativa e conta gerenciada. Corrigido o passo que encerrava a única sessão confiável antes do teste. Restaurar um backup do Authenticator deixou de ser tratado como garantia de restauração de toda credencial. Novo registro MFA e revogação de sessões são ações diferentes; não há promessa de desbloqueio por técnico nem receita para contornar verificação.

Também removidas afirmações absolutas sobre códigos, sessões e comprometimento de e-mail. Nenhum segredo, código real, credencial ou ferramenta de bypass foi adicionado. Nenhum valor comercial, fluxo de atendimento ou URL pública foi alterado.

## Fontes

Quatro fontes primárias novas, consultadas em 05/11/2026:

- https://support.google.com/accounts/answer/185834?hl=pt-BR
- https://support.microsoft.com/en-us/accounts-billing/manage/help-with-the-microsoft-account-recovery-form
- https://support.microsoft.com/en-us/authenticator/restore-account-credentials-from-microsoft-authenticator
- https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-userdevicesettings

NIST consultado novamente: https://pages.nist.gov/800-63-4/sp800-63b/authenticators/. Mantida a referência CISA já cadastrada; a abertura direta nesta rodada retornou 403, portanto não se atualizou sua data de consulta. Não foram atribuídas novas afirmações específicas a esse documento. Os seis links cadastrados renderizam no bloco de referências do artigo, testado no componente.

## FAQs e revisão React

Cinco FAQs técnicas em mfaRecoveryFaq.ts, compartilhadas com BlogPostFAQ. Teste compara integralmente perguntas/respostas visíveis e o objeto FAQPage registrado. Conteúdo estático, import direto, sem novos efeitos, requisições ou dependências; revisão React aplicada ao escopo alterado.

Isso não substitui a inspeção de Article, BreadcrumbList e FAQPage no HTML servido. O preview tinha incompatibilidade de entrada de servidor registrada anteriormente; não foi corrigido nem teve aprovação declarada nesta rodada.

## Validações

- Testes específicos: 4/4.
- Testes unitários: 54 arquivos, 904/904.
- Leitor editorial: 7/7.
- Intenção, revisão técnica, links internos e confiança: aprovados.
- Inventário de afirmações regenerado e validado: 272 ocorrências; deslocamentos de linhas sincronizados.
- Build direto Vite cliente e SSR: aprovado.
- Diff sem erros de whitespace.

Sem declaração de verify global, build com todos os pre/postbuilds, deploy:check, E2E ou acessibilidade global aprovados. Sem relaxamento de gates, sem merge e sem deploy. PRs #384 e #400 preservados.

## Conclusão do lote

Os cinco temas priorizados têm revisão de redação concluída no PR: Windows 11, SMART, migração de arquivos, Wi-Fi ausente e recuperação MFA. Isso não equivale a cinco publicações: Windows 11 ainda tem requisitos de promoção próprios, e o lote depende de integração, gates globais e validação do HTML servido. Próximo esforço deve ser consolidar essa integração antes de abrir mais URLs.
