import { BairroTemplate } from "./BairroTemplate";

// Referências locais verificadas em 27/09/2026:
// - Câmara Municipal de Campo Largo: documentação oficial identifica a localidade Timbotuva e a Rua Germânia, iniciando na BR-277, km 108.
// - A documentação cita coordenadas e participação da Secretaria Municipal de Desenvolvimento Urbano/Econômico na definição da via.
const data = {
  nome: "Timbotuva",
  slug: "timbotuva-cl",
  cidade: "Campo Largo",
  metaTitle: "Técnico de Informática no Timbotuva, Campo Largo | Suporte",
  metaDescription: "Suporte de informática no Timbotuva, Campo Largo. Triagem para Wi-Fi, notebook, Windows e hardware com definição entre remoto, visita e bancada.",
  h1: "Técnico de Informática no Timbotuva – Campo Largo",
  subtitulo: "Triagem de conectividade e equipamento para decidir entre suporte remoto, visita e bancada.",
  descricaoLonga: `Timbotuva aparece em documentação oficial da Câmara Municipal de Campo Largo, inclusive em projetos de denominação de vias e referências urbanísticas. A Rua Germânia, por exemplo, é descrita como localizada em Timbotuva e com início na BR-277, km 108. Essa documentação confirma a localidade e permite manter a página ancorada em informação pública verificável.

Nesta página, o foco técnico está em conectividade e na escolha correta da modalidade de atendimento. Problemas de Windows, configuração, navegador, e-mail, impressora de rede e alguns erros de software podem começar por triagem remota quando o computador ainda funciona e possui conexão estável.

Quando a máquina não liga, não apresenta vídeo, aquece demais ou possui falha de alimentação, o atendimento precisa ser presencial ou em bancada. Em notebook, fonte, bateria, temperatura e armazenamento são avaliados conforme o sintoma.

No Wi-Fi, comparar outros dispositivos e pontos do imóvel ajuda a separar falha do computador de problema na infraestrutura. Se apenas um notebook perde conexão, adaptador e driver entram primeiro. Se todos os aparelhos falham, o foco muda para roteador, cobertura ou conexão principal.

Quando existem arquivos importantes, backup entra antes de formatação ou troca de disco. Se o armazenamento apresenta sinais de falha, insistir em uso pode aumentar o risco de perda. A página de Timbotuva foi reescrita para explicar esse fluxo com conteúdo próprio, sem prometer tempo de chegada e sem atribuir características locais não comprovadas.`,
  pontosReferencia: [
    "Timbotuva – Campo Largo",
    "Rua Germânia",
    "BR-277, km 108"
  ],
  tempoDeslocamento: "Modalidade e agenda definidas após triagem do endereço e do defeito",
  tituloSecaoPrincipal: "Conectividade e acesso remoto no Timbotuva",
  tituloSecaoContexto: "Quando a rede existe, mas o computador ainda não comunica direito",
  triagemResumo: "No Timbotuva, a triagem começa verificando se o computador obtém rede, navega, resolve nomes e mantém conexão estável. A partir daí, separamos configuração, driver, adaptador e infraestrutura antes de decidir por visita ou troca de equipamento.",
  faqTitulo: "Perguntas sobre rede e acesso remoto no Timbotuva",
  faqsCustom: [
    { question: "O computador conecta ao Wi-Fi, mas a internet cai. O que vocês testam?", answer: "Verificamos estabilidade do adaptador, endereço de rede, DNS e comportamento de outros dispositivos. Conectar ao Wi-Fi não garante que toda a comunicação esteja funcionando corretamente." },
    { question: "Se o acesso remoto não conecta, isso prova que a internet está ruim?", answer: "Não. Firewall, serviço, configuração, DNS ou o próprio software de acesso podem impedir a sessão mesmo com navegação normal. A triagem separa essas camadas." },
    { question: "Notebook só funciona perto do roteador. Precisa trocar o roteador?", answer: "Primeiro comparamos outros aparelhos no mesmo ponto e avaliamos adaptador, antena e cobertura. Troca de roteador só faz sentido quando os testes indicam problema na infraestrutura." },
    { question: "Quando um problema de rede passa a exigir visita?", answer: "Quando precisamos testar cabeamento, portas, posicionamento, alimentação do roteador ou quando o computador não mantém conexão suficiente para diagnóstico remoto." },
  ],
  servicosDestaque: [
    "Diagnóstico de Wi-Fi e rede",
    "Triagem e suporte remoto",
    "Notebook que não liga",
    "Correção de Windows",
    "Backup e preservação de arquivos",
    "Avaliação de fonte e bateria"
  ],
  conteudoExclusivo: `Conectar ao Wi-Fi não encerra o diagnóstico de rede

Uma máquina pode mostrar sinal e ainda falhar em DNS, gateway, estabilidade do adaptador ou comunicação com serviços específicos. Por isso, a triagem compara navegação, outros dispositivos e comportamento do mesmo computador em condições diferentes.

Se o notebook funciona apenas perto do roteador, avaliamos cobertura e o próprio adaptador. Se navega, mas o acesso remoto não conecta, firewall, serviço e configuração entram no diagnóstico. Quando a conexão cai em todos os aparelhos, a investigação passa para infraestrutura.

No Timbotuva, a página foi reorganizada para explicar essas camadas de conectividade e não repetir o roteiro de falhas físicas usado em outras localidades.`,
  problemasComuns: [
    "Notebook conecta ao Wi-Fi, mas perde internet",
    "Acesso remoto falha apesar de a navegação funcionar",
    "Driver de rede desaparece depois de atualização",
    "Notebook só mantém conexão perto do roteador",
    "Windows perde configuração de IP ou DNS",
    "Vários dispositivos apresentam queda ao mesmo tempo"
  ],
  dicasLocais: `Ao pedir atendimento no Timbotuva, informe o endereço e uma referência local confiável, como a Rua Germânia ou o acesso pela BR-277. Diga se o computador ainda acessa a internet; isso ajuda a avaliar suporte remoto. Para máquina sem vídeo ou sem energia, informe LEDs, ventoinhas e bipes.`,
};

const TimbotuvaCL = () => <BairroTemplate data={data} />;

export default TimbotuvaCL;
