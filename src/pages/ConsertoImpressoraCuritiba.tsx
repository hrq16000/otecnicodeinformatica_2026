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
import { MODALIDADES, VALOR_VISITA_LABEL } from "@/lib/precosConfig";

const WHATSAPP = WA_NUMBER;
const PATH = "/conserto-impressora-curitiba";

const TITLE = "Assistência Técnica e Conserto de Impressora em Curitiba";
const DESC =
  "Assistência técnica e conserto de impressora em Curitiba: HP, Epson, Brother, Canon e outras marcas, com diagnóstico de impressão, papel, Wi-Fi e driver." ;

const FAQS = [
  { question: "Existe vínculo oficial com HP, Epson, Brother ou Canon?", answer: "Não declaramos credenciamento oficial com fabricantes. O atendimento é assistência técnica independente e depende do modelo, do defeito e da disponibilidade de peças ou suprimentos compatíveis." },
  { question: "Quanto custa consertar uma impressora em Curitiba?", answer: `A visita técnica de inspeção parte de ${VALOR_VISITA_LABEL} quando essa modalidade é compatível. Serviços de bancada, coleta, peças e materiais seguem a política comercial vigente e o orçamento é apresentado antes da execução.` },
  { question: "Vocês trabalham com qual marca de impressora?", answer: "Avaliamos impressoras HP, Epson, Brother, Canon, Samsung, Lexmark, Ricoh, Xerox, Pantum e outras, conforme modelo, disponibilidade de peça e tipo de defeito. O atendimento é assistência técnica independente; não afirmamos credenciamento do fabricante." },
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
        serviceName="Conserto de Impressora"
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
            Assistência Técnica e Conserto de Impressora em Curitiba
          </h1>
          <p className="tldr text-xl text-white/90 max-w-3xl mx-auto mb-8" data-speakable="true">
            Assistência técnica independente para impressoras em Curitiba, com diagnóstico de falhas de
            impressão, alimentação de papel, conexão, driver, Wi-Fi e multifuncionais. A triagem separa
            configuração de defeito físico antes de indicar peça ou reparo.
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
            Visita técnica de inspeção a partir de <span className="text-accent">{VALOR_VISITA_LABEL}</span>
          </p>
          <p className="text-muted-foreground mt-2">
            Quando a visita é compatível · peças não inclusas · bancada e coleta seguem a política comercial vigente
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">
            Problemas que resolvemos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: "Impressora não puxa papel", d: "Troca do rolo de tração e limpeza do mecanismo." },
              { t: "Imprime borrado ou com falhas", d: "Limpeza profunda da cabeça de impressão ou troca quando necessário." },
              { t: "Erro de driver / não conecta no Wi-Fi", d: "Verificação de driver, porta, endereço de rede e comunicação antes de alterar o roteador ou fixar IP." },
              { t: "Cartucho ou toner não reconhecido", d: "Verificação de encaixe, suprimento, chip e compatibilidade antes de indicar substituição." },
              { t: "Atolamento constante de papel", d: "Limpeza dos sensores e troca de roletes desgastados." },
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center mb-4">
              Como funciona o valor do atendimento
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              O preço depende da modalidade e da causa confirmada. Os valores abaixo vêm da fonte
              central de preços do portal; peça, suprimento e material não estão inclusos salvo indicação expressa.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {MODALIDADES.map((m) => (
                <div key={m.id} className="rounded-xl border bg-card p-5">
                  <h3 className="font-bold text-primary">{m.titulo}</h3>
                  <p className="mt-2 text-lg font-semibold text-accent">{m.valorLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.unidade}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{m.resumo}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              O orçamento do reparo é informado depois do diagnóstico e depende da sua aprovação.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Por que escolher a O Técnico de Informática</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { i: <Clock className="w-7 h-7 text-accent" />, t: "Atendimento conforme a agenda", d: "A modalidade e o horário são definidos na triagem conforme o tipo de falha." },
              { i: <Shield className="w-7 h-7 text-accent" />, t: "Diagnóstico antes da troca", d: "A causa é isolada antes de indicar peça, suprimento ou intervenção." },
              { i: <CheckCircle className="w-7 h-7 text-accent" />, t: "Escopo antes da execução", d: "O diagnóstico define modalidade, reparo e eventual peça antes da execução." },
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
