# Rodada editorial — antivírus, fontes e FAQ técnico

Data da validação: 6 de setembro de 2026.

## Escopo

Revisão material do guia `como-escolher-um-bom-antivirus`, no pilar Segurança. A URL, o slug e o canonical existentes foram preservados; nenhuma página nova foi criada.

## Melhorias entregues

- explicação atualizada sobre Segurança do Windows, Microsoft Defender Antivirus e produto de terceiros registrado;
- checklist prático antes da compra, começando pela confirmação do provedor realmente ativo;
- acesso controlado a pastas apresentado como camada contra ransomware, sem tratá-lo como substituto do backup;
- remoção de promessas amplas de cobertura e de afirmações absolutas sobre a convivência entre antivírus;
- linguagem de falso suporte revisada para orientar sem depender de afirmação universal sobre fabricantes;
- cinco perguntas técnicas próprias no lugar do FAQ comercial genérico;
- referências oficiais visíveis e manifesto editorial atualizado;
- CTA de serviço mantido somente depois do diagnóstico e das alternativas autônomas.

## Fontes consultadas

- Microsoft Support — Windows Security app overview: <https://support.microsoft.com/en-us/windows/security/windows-security/windows-security-app-overview>
- Microsoft Support — Virus and threat protection in the Windows Security app: <https://support.microsoft.com/en-us/windows/security/threat-malware-protection/virus-and-threat-protection-in-the-windows-security-app>
- CISA — Project Upskill Checklist: <https://www.cisa.gov/resources-tools/resources/project-upskill-checklist>

As páginas da Microsoft responderam com HTTP 200. A página oficial da CISA foi lida pelo mecanismo de pesquisa, mas devolveu HTTP 403 ao cliente de linha de comando por restrição automatizada do próprio site.

## Validações

- `npm run build`: aprovado;
- `npm run verify`: 35/35 etapas, sem falhas;
- testes: 46 arquivos e 860 testes aprovados;
- `npm run ssr:with-server -- npm run deploy:check`: 37/37 etapas, sem falhas;
- schema.org: 740 nós em 247 páginas indexáveis;
- JSON-LD estático: 1.666 blocos válidos em 247 HTMLs;
- paridade de FAQ: 1.518 perguntas em 270 `FAQPage`, sem divergência;
- links internos: nenhum quebrado;
- páginas órfãs: nenhuma;
- HTML específico do guia: checklist, fontes, pergunta técnica e `FAQPage` confirmados.

## Dívida fora do escopo

Os validadores mantêm avisos preexistentes, entre eles metadados longos em outras páginas, 26 imagens de IA herdadas no baseline e ausência de credenciais Lovable/Search Console para confirmar vereditos de publicação. Nenhum desses avisos foi introduzido por esta revisão.

O smoke público confirmou que o domínio responde, mas ainda não confirma esta alteração antes do merge e do deploy do ambiente conectado. Build verde não foi tratado como publicação pública.
