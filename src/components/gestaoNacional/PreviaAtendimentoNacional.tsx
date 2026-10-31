/**
 * Bloco editorial de PRÉVIA — sem rota/entrada no site.
 * Integrar somente após aprovação contratual, preços, cadastro, cobertura,
 * comprovante de pagamento e testes. Nunca confundir com checkout ativo.
 */
const URL_COMUNIDADE_TECNICOS =
  "https://chat.whatsapp.com/KUki7iAKg2f5ahsGfn4Su5?s=cl&p=a&iam=2";

export function PreviaAtendimentoNacional() {
  return (
    <section aria-labelledby="gestao-nacional-titulo" className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <div className="rounded-lg border border-amber-400 bg-amber-50 p-4 text-amber-950">
        <strong>Proposta em preparação — atendimento nacional ainda não disponível nesta modalidade.</strong>
        <p className="mt-1 text-sm">
          A contratação, os pagamentos e o cadastro de profissionais desta nova modalidade
          ainda dependem de implantação e validação. As condições abaixo são uma prévia.
        </p>
      </div>
      <header>
        <h2 id="gestao-nacional-titulo" className="text-2xl font-semibold">
          Atendimento direto com profissionais de informática
        </h2>
        <p className="mt-2">
          O cliente contrata diretamente o técnico cadastrado, conforme disponibilidade local.
          A plataforma organiza informações e apresentação imparcial de profissionais,
          sem leilão, despacho manual ou escolha por operador.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="space-y-2 rounded-xl border p-5">
          <h3 className="font-semibold">Atendimento padrão — até uma hora</h3>
          <p className="text-2xl font-bold">R$ 159,99</p>
          <dl>
            <div className="flex justify-between gap-4"><dt>Repasse previsto ao técnico</dt><dd>R$ 150,00</dd></div>
            <div className="flex justify-between gap-4"><dt>Taxa fixa da plataforma, incluída</dt><dd>R$ 9,99</dd></div>
          </dl>
        </article>
        <article className="space-y-2 rounded-xl border p-5">
          <h3 className="font-semibold">Urgência / horário especial — até uma hora</h3>
          <p className="text-2xl font-bold">R$ 359,99</p>
          <dl>
            <div className="flex justify-between gap-4"><dt>Repasse previsto ao técnico</dt><dd>R$ 330,00</dd></div>
            <div className="flex justify-between gap-4"><dt>Taxa fixa da plataforma, incluída</dt><dd>R$ 29,99</dd></div>
          </dl>
        </article>
      </div>
      <div className="space-y-2 rounded-lg border p-5">
        <h3 className="font-semibold">Condições previstas</h3>
        <p>
          Hora adicional: R$ 69,99, mediante autorização prévia. Até 3 km de ida,
          deslocamento isento. Acima desse limite, tarifas por quilômetro de ida e volta
          serão apresentadas no orçamento aprovado; estacionamento é fornecido ou pago
          pelo cliente. Quilometragem e estacionamento são repassados ao técnico.
        </p>
        <p>
          No máximo três solicitações por dia para serviços diferentes.
          Não há confirmação de atendimento sem disponibilidade validada,
          condições aceitas e pagamento efetivamente confirmado em canal autorizado.
          A execução do serviço e seu aceite ocorrem diretamente entre cliente e profissional.
        </p>
        <p className="text-sm">
          Nenhuma alteração de preço ou escopo é negociada informalmente no local;
          mudanças exigem novo orçamento e autorização expressa.
          Cancelamentos e reembolsos observarão a política legalmente revisada.
        </p>
      </div>
      <aside aria-label="Participação profissional" className="rounded-lg border p-5">
        <h3 className="font-semibold">Área de participação para profissionais</h3>
        <p className="mt-2">
          Para elegibilidade futura, será necessário participar da comunidade WhatsApp
          e concluir cadastro e validação na plataforma. Participar do grupo não garante
          habilitação nem disponibilidade de chamados.
        </p>
        <a
          href={URL_COMUNIDADE_TECNICOS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-semibold underline underline-offset-4"
        >
          Conhecer a comunidade de técnicos
        </a>
      </aside>
    </section>
  );
}
