import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useParams } from "@/lib/router-compat";
import { PROCEDIMENTOS } from "./ProcedimentosPlaca";
import NotFound from "./NotFound";

/**
 * Owner real das cinco rotas /procedimentos/:slug. Antes, o template de
 * problemas devolvia uma página sem o procedimento e sem canonical SSR.
 * Estes perfis permanecem noindex até revisão editorial individual.
 */
export default function ProcedimentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const item = PROCEDIMENTOS.find((p) => p.slug === slug);
  if (!item) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <nav aria-label="Trilha de navegação" className="mb-6 text-sm">
          <Link to="/">Início</Link> {" / "}
          <Link to="/procedimentos-placa">Procedimentos em placa</Link> {" / "}
          <span aria-current="page">{item.title}</span>
        </nav>
        <article>
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {item.title}: indicações e avaliação técnica
          </h1>
          <p className="mt-5 text-lg leading-relaxed">{item.desc}</p>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Quando considerar a avaliação?</h2>
            <p className="mt-3">
              Entre os sinais que podem justificar uma análise especializada estão: {item.indicacao.toLowerCase()}.
              Isso não comprova, por si só, a necessidade de realizar {item.title.toLowerCase()}.
              Um diagnóstico deve confirmar a causa do defeito e a viabilidade do reparo.
            </p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Segurança e tomada de decisão</h2>
            <p className="mt-3">
              Não aqueça, solde ou desmonte placas por tentativa. Desligue o equipamento
              e procure uma avaliação apropriada. O procedimento, o orçamento e as
              condições de atendimento dependem do defeito constatado e do profissional disponível.
            </p>
          </section>
          <div className="mt-10 rounded-xl border border-border p-6">
            <p className="font-semibold">Quer conhecer os outros tipos de reparo em placa?</p>
            <Link to="/procedimentos-placa" className="mt-3 inline-block text-primary underline">
              Comparar todos os procedimentos
            </Link>
            <p className="mt-4">
              <Link to="/contato" className="text-primary underline">Solicitar orientação para avaliação técnica</Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
