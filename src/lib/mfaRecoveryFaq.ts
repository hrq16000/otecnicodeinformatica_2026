/** Mesma lista para o FAQ visível e o FAQPage do guia MFA. */
export const MFA_RECOVERY_FAQ = [
  { q: "Perdi o celular. Preciso desativar o MFA?", a: "Não como primeira ação. Use uma alternativa já cadastrada no login oficial, como código reserva, chave ou outro aparelho aceito. Sem alternativa, siga o fluxo do provedor; em conta gerenciada, contate o administrador." },
  { q: "O backup do Authenticator recupera todas as contas?", a: "Não. No Microsoft Authenticator, contas de trabalho ou escola podem reaparecer só pelo nome e exigir novo registro. A restauração também depende do tipo de dispositivo. Teste cada conta antes de apagar o aparelho antigo." },
  { q: "O formulário Microsoft contorna a verificação em duas etapas?", a: "Não. A Microsoft informa que, com a verificação em duas etapas ativa e nenhuma alternativa acessível, o formulário não permite contornar essa proteção. Não há garantia de recuperação por um técnico ou pelo suporte." },
  { q: "Posso sair da única sessão aberta para testar o novo método?", a: "Prefira testar em outra janela, preservando a sessão confiável durante a troca planejada. Se houver suspeita de invasão, siga a contenção oficial: adicionar um método não equivale a revogar sessões antigas." },
  { q: "Quem pode redefinir o MFA de uma conta corporativa?", a: "O administrador autorizado, conforme a política da organização e após verificar a identidade. Novo registro pode remover métodos existentes; não o execute por tentativa nem compartilhe códigos ou segredos com terceiros." },
];
