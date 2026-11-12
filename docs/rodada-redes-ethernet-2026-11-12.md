# Rodada de Redes — Ethernet sem conexão (12/11/2026)

- Revisão da URL existente `/blog/computador-nao-conecta-na-internet-por-cabo`: título, URL, canonical, data original, capa e aprovação preservados.
- A comparação isola Wi-Fi e dados móveis, sem interromper sessão remota ou rede gerenciada. O exemplo de ligação direta separa o trecho de parede do restante, sem declarar uma peça defeituosa.
- O guia delimita o que IPv4 automático, gateway e DNS permitem concluir, explica o que registrar para suporte e mantém a redefinição como último recurso.
- Cinco referências visíveis: [Ethernet no Windows](https://support.microsoft.com/pt-br/windows/experience/connectivity-networking/fix-ethernet-connection-problems-in-windows), [endereçamento automático](https://learn.microsoft.com/pt-br/windows-server/troubleshoot/how-to-use-automatic-tcpip-addressing-without-a-dh), [ipconfig](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig), [ping](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping) e [nslookup](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup).

Validação local: 35 testes editoriais isolados e 15 contratos de catálogo/HTML; intenção, links, revisão técnica e afirmações; compilação Vite e nove guias no HTML SSR, com comparação entre processos frios, cinco FAQs em paridade e slug inexistente retornando 404. O Chromium disponível não iniciou por restrição de socket; não houve verificação do DOM pós-JavaScript nesta rodada. O modo padrão continua exigindo navegador; `--ssr-only` é diagnóstico explícito, com relatório separado.

Sem merge ou deploy. Próximo guia: recuperação de arquivo corrompido sem sobrescrever o original (Produtividade).
