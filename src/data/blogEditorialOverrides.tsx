import { EditorialReferences } from "@/components/BlogPostFAQ";
import type { BlogPostContent } from "@/data/blogPostsContent";
import { Link } from "@/lib/router-compat";

export const blogEditorialOverrides: Record<string, BlogPostContent> = {
  "como-configurar-2fa-em-tudo": {
    title: "Como Configurar 2FA e MFA sem Perder o Acesso",
    excerpt:
      "Guia para escolher um segundo fator, preparar a recuperação, ativar MFA com segurança e reagir a solicitações inesperadas.",
    date: "2026-04-20",
    readTime: "12 min",
    category: "Segurança e Redes",
    content: (
      <>
        <p className="lead">
          Ativar 2FA ou MFA reduz o dano de uma senha exposta, mas uma configuração sem recuperação pode bloquear o próprio titular. O caminho seguro é escolher o método adequado, cadastrar uma alternativa independente, guardar os códigos de recuperação e testar uma nova entrada antes de encerrar a sessão que já funciona.
        </p>

        <h2>2FA e MFA não são exatamente a mesma coisa</h2>
        <p>
          2FA combina dois fatores; MFA combina dois ou mais. Os fatores podem ser algo que você sabe, algo que possui ou uma característica biométrica usada para liberar um autenticador. Duas senhas continuam pertencendo à mesma categoria e não formam 2FA por si só.
        </p>
        <p>
          MFA não substitui senha exclusiva, atualização do dispositivo nem revisão de sessões. Ela acrescenta uma barreira quando uma credencial deixa de ser segredo.
        </p>

        <h2>Compare os métodos pelo risco que eles cobrem</h2>
        <table>
          <thead>
            <tr><th>Método</th><th>Vantagem</th><th>Limite principal</th></tr>
          </thead>
          <tbody>
            <tr><td>SMS ou ligação</td><td>Disponível em muitos serviços</td><td>Depende da linha telefônica e não é resistente a phishing</td></tr>
            <tr><td>Código TOTP</td><td>Pode ser gerado sem sinal da operadora</td><td>O código pode ser entregue a uma página falsa</td></tr>
            <tr><td>Confirmação no aplicativo</td><td>Entrada simples e contextual</td><td>Pedidos inesperados podem induzir aprovação</td></tr>
            <tr><td>Passkey ou chave FIDO</td><td>Usa criptografia vinculada ao serviço legítimo</td><td>Exige suporte do serviço e recuperação planejada</td></tr>
          </tbody>
        </table>
        <p>
          O NIST diferencia códigos digitados manualmente de autenticadores criptográficos resistentes a phishing. Quando a conta oferecer passkey ou chave de segurança, essa opção tende a proteger melhor contra páginas impostoras. Quando não oferecer, TOTP ou mesmo SMS ainda podem acrescentar uma barreira em relação à senha isolada.
        </p>

        <h2>Priorize as contas que recuperam as demais</h2>
        <ol>
          <li><strong>E-mail principal</strong>, usado para redefinir outras senhas.</li>
          <li><strong>Gerenciador de senhas e identidade principal</strong> do computador ou celular.</li>
          <li><strong>Contas financeiras, governamentais e de comunicação</strong>.</li>
          <li><strong>Administração de domínio, nuvem, site e acesso remoto</strong>.</li>
          <li><strong>Redes sociais, lojas e demais serviços</strong>.</li>
        </ol>

        <h2>Prepare a recuperação antes de ativar</h2>
        <ul>
          <li>Confirme telefone e e-mail de recuperação atuais.</li>
          <li>Defina onde guardar códigos de recuperação sem depender da mesma conta.</li>
          <li>Quando possível, registre dois autenticadores independentes ou uma chave reserva.</li>
          <li>Em empresa, documente responsável, substituição de aparelho e saída de colaborador.</li>
          <li>Não deixe QR Code, segredo TOTP e códigos de recuperação apenas na galeria do aparelho principal.</li>
        </ul>

        <h2>Ativação segura, passo a passo</h2>
        <ol>
          <li>Abra o aplicativo legítimo ou digite o endereço oficial; não comece por um link recebido.</li>
          <li>Entre nas configurações de segurança e revise primeiro os dados de recuperação.</li>
          <li>Escolha o método mais forte compatível com o serviço e com seus dispositivos.</li>
          <li>Conclua o cadastro e guarde os códigos de recuperação em local separado.</li>
          <li>Adicione um método reserva, quando disponível.</li>
          <li>Abra uma janela privativa ou outro dispositivo e teste uma nova entrada antes de encerrar a sessão válida.</li>
        </ol>

        <h2>Se chegar uma solicitação que você não iniciou</h2>
        <p>
          Recuse a solicitação. Não aprove para interromper notificações e não informe códigos a quem entrou em contato. Abra a conta diretamente, revise sessões e dispositivos, encerre acessos desconhecidos e troque a senha se houver sinal de uso indevido. Preserve os alertas e horários quando existir impacto financeiro ou corporativo.
        </p>

        <h2>Troca ou perda do celular</h2>
        <p>
          Com o aparelho antigo ainda disponível, confirme como cada serviço transfere ou recadastra o autenticador. Registre o novo aparelho, teste uma entrada e só então remova o anterior. Não presuma que todos os códigos TOTP serão transferidos automaticamente. Se o aparelho foi perdido, use um método reserva ou o processo oficial de recuperação e revogue o dispositivo ausente.
        </p>

        <h2>Limites: quando parar e pedir ajuda</h2>
        <p>
          Se todos os fatores foram perdidos, use somente o processo oficial do provedor. Um técnico pode ajudar a proteger o dispositivo e organizar evidências, mas não pode contornar a verificação de identidade. Em contas corporativas, o administrador autorizado deve revogar sessões e redefinir métodos pelo console oficial.
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
