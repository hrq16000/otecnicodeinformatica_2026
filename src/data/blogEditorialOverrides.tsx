import { Link } from "@/lib/router-compat";
import { EditorialReferences } from "@/components/BlogPostFAQ";
import type { BlogPostContent } from "@/data/blogPostsContent";

/**
 * Overrides editoriais para artigos herdados do monólito.
 *
 * A página mescla este mapa depois de `blogPostsContentBase`, portanto o slug
 * preserva rota e canonical enquanto recebe a versão materialmente revisada.
 */
export const blogEditorialOverrides: Record<string, BlogPostContent> = {
  "como-configurar-2fa-em-tudo": {
    title: "Como configurar 2FA e MFA sem perder o acesso às contas",
    excerpt:
      "Como priorizar contas, escolher entre SMS, aplicativo, passkey ou chave física e preparar a recuperação antes de ativar 2FA/MFA.",
    date: "2026-09-27",
    readTime: "12 min",
    category: "Segurança",
    content: (
      <>
        <p className="lead">
          Ativar 2FA ou MFA reduz o risco de uma senha vazada virar acesso à conta, mas o resultado depende do método escolhido e de um plano de recuperação. Este guia ajuda a priorizar contas, comparar SMS, aplicativo autenticador, passkey e chave física, testar o acesso e guardar meios de recuperação antes de depender do novo fator.
        </p>

        <h2>Resposta curta</h2>
        <p>
          Comece pelo e-mail principal e pelas contas que recuperam outras contas. Prefira passkey ou chave de segurança quando o serviço oferecer; em seguida, use aplicativo autenticador ou confirmação com correspondência de número. SMS ainda é melhor que depender só de senha quando é a única opção. Antes de concluir, cadastre um método reserva, salve os códigos de recuperação fora do aparelho principal e teste uma nova entrada.
        </p>

        <h2>2FA e MFA não são exatamente a mesma coisa</h2>
        <p>
          2FA usa dois fatores; MFA usa dois ou mais. Um fator pode ser algo que você sabe, algo que possui ou uma característica biométrica. Duas senhas diferentes continuam sendo o mesmo tipo de fator. O ganho vem de combinar categorias independentes, por exemplo senha e chave criptográfica.
        </p>
        <p>
          MFA não substitui senha exclusiva, atualização do dispositivo nem revisão de sessões. Ela limita o dano quando uma credencial deixa de ser segredo.
        </p>

        <h2>Compare os métodos pelo risco que eles cobrem</h2>
        <table>
          <thead>
            <tr><th>Método</th><th>Vantagem</th><th>Limite principal</th></tr>
          </thead>
          <tbody>
            <tr><td>SMS ou ligação</td><td>Ampla disponibilidade</td><td>Depende da linha e não é resistente a phishing</td></tr>
            <tr><td>Código TOTP</td><td>Funciona sem sinal da operadora</td><td>O código pode ser digitado numa página falsa</td></tr>
            <tr><td>Notificação no app</td><td>Entrada simples</td><td>Pedidos inesperados podem induzir aprovação</td></tr>
            <tr><td>Passkey ou chave FIDO</td><td>Vincula a autenticação ao serviço legítimo</td><td>Exige suporte do serviço e recuperação planejada</td></tr>
          </tbody>
        </table>
        <p>
          A CISA orienta priorizar MFA resistente a phishing. O NIST SP 800-63B-4 explica que códigos digitados manualmente, inclusive OTP, podem ser retransmitidos por uma página impostora; mecanismos criptográficos vinculados ao verificador oferecem resistência superior.
        </p>

        <h2>Ordem recomendada de ativação</h2>
        <p>Priorize pelo impacto de perda e pelo poder de recuperar outras contas:</p>
        <ol>
          <li><strong>E-mail principal</strong>, usado para redefinir outras senhas.</li>
          <li><strong>Gerenciador de senhas e identidade principal</strong> do computador ou celular.</li>
          <li><strong>Contas financeiras, governamentais e de comunicação</strong>.</li>
          <li><strong>Administração de domínio, nuvem, site e acesso remoto</strong>.</li>
          <li><strong>Redes sociais, lojas e demais serviços</strong>.</li>
        </ol>

        <h2>Antes de ativar: monte a recuperação</h2>
        <ul>
          <li>Confirme telefone e e-mail de recuperação atuais.</li>
          <li>Decida onde guardar códigos de recuperação sem depender da mesma conta.</li>
          <li>Quando possível, registre dois autenticadores independentes ou uma chave reserva.</li>
          <li>Em empresa, documente responsável, substituição de aparelho e saída de colaborador.</li>
          <li>Não fotografe QR Code ou código de recuperação para deixá-lo na mesma galeria sincronizada.</li>
        </ul>

        <h2>Ativação segura, passo a passo</h2>
        <ol>
          <li>Entre digitando o endereço oficial ou usando o aplicativo legítimo; não parta de link recebido.</li>
          <li>Abra as configurações de segurança e revise primeiro os dados de recuperação.</li>
          <li>Escolha o método mais forte que o serviço e seus dispositivos suportam.</li>
          <li>Conclua o cadastro e guarde os códigos de recuperação em local separado.</li>
          <li>Adicione o método reserva, quando disponível.</li>
          <li>Abra uma janela privativa ou outro dispositivo e teste uma nova entrada antes de encerrar a sessão válida.</li>
        </ol>

        <h2>Como responder a uma solicitação que você não iniciou</h2>
        <p>Recuse a solicitação. Não aprove para “parar as notificações” e não informe código a quem entrou em contato. Em seguida:</p>
        <ul>
          <li>abra diretamente a conta e revise atividade recente e sessões;</li>
          <li>troque a senha se houver sinal de tentativa com credencial correta;</li>
          <li>encerre acessos desconhecidos e confira métodos de recuperação;</li>
          <li>registre o horário e preserve alertas se houver impacto financeiro ou corporativo.</li>
        </ul>

        <h2>Erros que enfraquecem a proteção</h2>
        <ul>
          <li>usar o e-mail comprometido como único canal de recuperação;</li>
          <li>guardar todos os códigos apenas no aparelho que pode ser perdido;</li>
          <li>aprovar notificação sem conferir a tentativa;</li>
          <li>manter aparelho antigo ou chave desconhecida cadastrado;</li>
          <li>confundir biometria que só desbloqueia o aparelho com um fator registrado no serviço.</li>
        </ul>

        <h2>Limites: quando pedir ajuda</h2>
        <p>
          Se perdeu todos os fatores, use somente o processo oficial de recuperação do provedor. Um técnico pode ajudar a proteger o dispositivo e organizar evidências, mas não pode contornar a verificação de identidade. Em contas corporativas, o administrador deve revogar sessões e redefinir métodos pelo console autorizado.
        </p>

        <h2>Checklist final</h2>
        <ul>
          <li>As contas que recuperam outras contas foram priorizadas.</li>
          <li>O método mais forte disponível foi escolhido.</li>
          <li>Existe um método reserva independente.</li>
          <li>Os códigos de recuperação estão fora do aparelho principal.</li>
          <li>Uma nova entrada foi testada antes de encerrar a sessão válida.</li>
        </ul>

        <p>
          Se a conta já foi comprometida, siga primeiro o guia de <Link to="/blog/como-recuperar-conta-hackeada" className="text-accent">recuperação de conta invadida</Link>. Para ambiente de trabalho, continue com a <Link to="/blog/como-proteger-rede-wifi-empresa" className="text-accent">proteção da rede Wi-Fi empresarial</Link>.
        </p>
        <EditorialReferences slug="como-configurar-2fa-em-tudo" />
      </>
    ),
  },
};

export default blogEditorialOverrides;
