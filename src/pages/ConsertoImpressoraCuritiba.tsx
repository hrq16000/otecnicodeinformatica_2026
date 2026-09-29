import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Printer, MessageCircle, CalendarCheck, CheckCircle, Clock, Shield, ArrowRight } from "lucide-react";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";
import { VALOR_VISITA_LABEL } from "@/lib/precosConfig";

const WHATSAPP = WA_NUMBER;
const PATH = "/conserto-impressora-curitiba";

const TITLE = "Conserto de Impressora em Curitiba | Reparo Multimarcas";
const DESC =
  "Conserto e assistência técnica independente de impressoras em Curitiba: falha de impressão, papel, Wi-Fi, driver, jato de tinta, laser e multifuncionais.";

const FAQS = [
  { question: "Quanto custa consertar uma impressora em Curitiba?", answer: `A visita técnica de inspeção, quando aplicável, parte de ${VALOR_VISITA_LABEL}. Reparos de bancada, peças e suprimentos dependem do modelo e da causa confirmada; o escopo é apresentado antes da execução.` },
  { question: "Vocês trabalham com qual marca de impressora?", answer: "O atendimento é independente e multimarcas; não somos assistência autorizada dos fabricantes. A possibilidade de reparo depende do modelo, do tipo de mecanismo, da disponibilidade de peças e do defeito confirmado." },
  { question: "Minha impressora não puxa papel. O que pode ser?", answer: "Rolo de tração gasto, sujeira no caminho do papel, sensor ou peça mecânica podem causar o sintoma. O diagnóstico precisa separar essas hipóteses antes de indicar troca de peça." },
  { question: "Atendem em domicílio ou só na bancada?", answer: "O atendimento pode ser feito no endereço quando o diagnóstico permite. Casos que exigem desmontagem, teste prolongado ou peça específica podem seguir para bancada, conforme a triagem e a agenda." },
  { question: "Vale a pena consertar minha impressora ou comprar outra?", answer: "Depende do defeito, do estado geral, da disponibilidade de peças e do custo de uma equivalente. O orçamento deve ser comparado com o valor e a vida útil esperada do equipamento antes da decisão." },
  { question: "Vocês trabalham com cartucho, toner e tanque de tinta?", answer: "A triagem identifica se a falha está no suprimento, no reconhecimento do cartucho/toner, no sistema de tinta ou no próprio mecanismo da impressora. A solução e o valor dependem do modelo e da causa confirmada." },
];

const ConsertoImpressoraCuritiba = () => {
  useEffect(() => {
    document.title = TITLE;
    trackPageView(PATH, "Conserto de Impressora Curitiba");
  }, []);

  const waClick = () => {
    trackCTAClick("whatsapp", "conserto-impressora");
    const msg = encodeURIComponent("Olá! Minha impressora está com problema, gostaria de agendar atendimento.");
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };
  const callClick = () => {
    trackCTAClick("whatsapp", "conserto-impressora-agendar");
    const msg = encodeURIComponent("Olá! Quero agendar conserto de impressora em Curitiba.");
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESC}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Conserto de Impressora", path: PATH },
        ]}
      />
      <ServiceLandingSchema
        serviceName="Conserto e Assistência Técnica Independente de Impressora"
        description={DESC}
        path={PATH}
        priceFrom={99.99}
        faqs={FAQS}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Conserto de Impressora" }]} />

      <section className="pt-14 pb-12 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6">
            <Printer className="w-5 h-5" /> <span className="font-medium">Atendimento conforme a agenda</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Conserto de Impressora em Curitiba
          </h1>
          <p className="tldr text-xl text-white/90 max-w-3xl mx-auto mb-8" data-speakable="true">
            Assistência técnica independente e multimarcas em Curitiba, com diagnóstico de falhas de
            impressão, alimentação de papel, conexão, driver, rede e mecanismo. A causa é separada
            antes de indicar peça, suprimento ou <strong>qualquer reparo</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={waClick} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp agora
            </Button>
            <Button size="lg" variant="outline" onClick={callClick} className="bg-white text-primary hover:bg-white/90">
              <CalendarCheck className="mr-2 w-5 h-5" /> Agendar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary">
            Visita técnica de inspeção, quando aplicável: <span className="text-accent">{VALOR_VISITA_LABEL}</span>
          </p>
          <p className="text-muted-foreground mt-2">Triagem por sintoma · orçamento antes do reparo · atendimento conforme a agenda</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">
            Problemas que resolvemos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: "Impressora não puxa papel", d: "Verificação de tração, caminho do papel, sensores e obstruções antes de indicar peça." },
              { t: "Imprime borrado ou com falhas", d: "Separação entre suprimento, cabeça de impressão, alinhamento, fusor ou mecanismo conforme a tecnologia." },
              { t: "Erro de driver / não conecta no Wi-Fi", d: "Teste de rede, endereço, porta, fila e driver antes de alterar a configuração." },
              { t: "Cartucho ou toner não reconhecido", d: "Verificação de encaixe, suprimento, chip e compatibilidade antes de indicar substituição." },
              { t: "Atolamento constante de papel", d: "Inspeção do caminho do papel, roletes, sensores e resíduos para localizar o ponto do atolamento." },
              { t: "Sistema de tinta / tanque", d: "Diagnóstico de alimentação, ar no circuito, reconhecimento e fluxo antes de alterar o sistema." },
            ].map((p) => (
              <div key={p.t} className="p-5 rounded-xl border bg-card hover:shadow-md transition">
                <CheckCircle className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary mb-1">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-4">
              Precisa arrumar uma impressora? Comece pelo sintoma
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              “Impressora não funciona” pode ser papel, suprimento, conexão, driver, fila de impressão
              ou defeito mecânico. Separar o sintoma antes do orçamento evita trocar peça ou cartucho
              por tentativa.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              <a href="/problemas/impressora-nao-imprime" className="rounded-xl border bg-card p-5 hover:shadow-md transition">
                <h3 className="font-bold text-primary mb-2">Impressora não imprime</h3>
                <p className="text-sm text-muted-foreground">
                  Veja a triagem entre fila, conexão, driver, papel e suprimento antes do reparo.
                </p>
              </a>
              <a href="/blog/impressora-offline-como-resolver" className="rounded-xl border bg-card p-5 hover:shadow-md transition">
                <h3 className="font-bold text-primary mb-2">Impressora aparece offline</h3>
                <p className="text-sm text-muted-foreground">
                  Entenda quando a falha está no Windows, na rede, no endereço da impressora ou no equipamento.
                </p>
              </a>
              <a href="/blog/como-instalar-impressora-windows-passo-a-passo" className="rounded-xl border bg-card p-5 hover:shadow-md transition">
                <h3 className="font-bold text-primary mb-2">Instalação e configuração no Windows</h3>
                <p className="text-sm text-muted-foreground">
                  Roteiro para instalar corretamente e diferenciar configuração de defeito físico.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-4">
            O que muda o orçamento do conserto
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            O mesmo sintoma pode ter causas e custos diferentes. O orçamento é definido pelo modelo,
            pela tecnologia da impressora, pela peça necessária e pela possibilidade de testar o
            equipamento no local ou em bancada.
          </p>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-sm" data-speakable="true">
              <thead className="bg-muted">
                <tr><th className="text-left p-3">Sinal observado</th><th className="text-left p-3">O que precisa ser separado</th></tr>
              </thead>
              <tbody>
                {[
                  ["Não puxa ou atola papel", "Obstrução, rolete, sensor, bandeja e caminho mecânico."],
                  ["Imprime falhado ou borrado", "Suprimento, cabeça, alinhamento, fusor ou transferência conforme a tecnologia."],
                  ["Aparece offline", "Rede, endereço IP, porta, fila, driver e comunicação do próprio equipamento."],
                  ["Não reconhece cartucho/toner", "Encaixe, chip, compatibilidade, contato e estado do suprimento."],
                  ["Não liga ou reinicia", "Fonte, alimentação, placa e eventual dano elétrico antes de insistir no uso."],
                ].map(([sinal, teste]) => (
                  <tr key={sinal} className="border-t"><td className="p-3 font-semibold text-primary">{sinal}</td><td className="p-3">{teste}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            As condições comerciais vigentes ficam na página de preços e políticas. Peças, suprimentos e materiais dependem do caso e não são presumidos no valor de inspeção.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Por que escolher a O Técnico de Informática</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { i: <Clock className="w-7 h-7 text-accent" />, t: "Atendimento conforme a agenda", d: "A modalidade e o horário são definidos na triagem conforme o tipo de falha." },
              { i: <Shield className="w-7 h-7 text-accent" />, t: "Diagnóstico antes da troca", d: "A causa é isolada antes de indicar peça, suprimento ou intervenção." },
              { i: <CheckCircle className="w-7 h-7 text-accent" />, t: "Valor antes", d: "Você só paga se aprovar. Sem taxa surpresa." },
            ].map((b) => (
              <div key={b.t} className="text-center p-6 rounded-xl border bg-card">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">{b.i}</div>
                <h3 className="font-bold mb-1">{b.t}</h3>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((f) => (
              <details key={f.question} className="group bg-background rounded-xl border p-5">
                <summary className="cursor-pointer font-semibold text-foreground flex justify-between items-center">
                  {f.question}
                  <ArrowRight className="w-4 h-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Sua impressora parou no meio de um trabalho?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Faça a triagem pelo sintoma e confirme a disponibilidade de atendimento antes do deslocamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={waClick} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageCircle className="mr-2 w-5 h-5" /> Falar no WhatsApp
            </Button>
            <Button size="lg" variant="outline" onClick={callClick} className="bg-white text-primary hover:bg-white/90">
              <CalendarCheck className="mr-2 w-5 h-5" /> Agendar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsertoImpressoraCuritiba;
