import { lazy, Suspense } from "react";
import { ServicoLandingLayout } from "@/components/servico/ServicoLandingLayout";
import { VISUAL_3S_SERVICO_SLUGS } from "@/lib/visualEmpresarial3s";
import { visual3T } from "@/lib/visualEmpresarial3t";
import { blocos3T, cta3T } from "@/lib/blocos3t";
import { blocos3U, cta3U } from "@/lib/blocos3u";
import { Blocos3U } from "@/components/servico/Blocos3U";
import { blocos4A, cta4A } from "@/lib/blocos4a";
import { Blocos4A } from "@/components/servico/Blocos4A";
import { ClarezaVariacao } from "@/components/servico/ClarezaVariacao";
import { FichaComercialServico } from "@/components/servico/FichaComercialServico";
import { AtlasPonteServico } from "@/components/informatica/AtlasPonteServico";
import { BibliotecaPonte } from "@/components/informatica/BibliotecaPonte";

import { MontagemWizard } from "@/components/servico/MontagemWizard";
import { ProvasVisuaisMonitor } from "@/components/servico/ProvasVisuaisMonitor";
import { WorkstationSection } from "@/components/servico/WorkstationSection";
import type { ServicoLandingData } from "@/components/servico/ServicoLandingLayout";
import { SERVICOS_LOCAL } from "@/lib/servicosLocal";
import { visualDoServico } from "@/lib/servicoVisual3q";
import { visualEmpresarial } from "@/lib/servicoVisual3r";
import { siteConfig } from "@/lib/siteConfig";

const Blocos3T = lazy(() =>
  import("@/components/servico/Blocos3T").then((m) => ({ default: m.Blocos3T })),
);
const SuporteEmpresarialBlocos = lazy(() =>
  import("@/components/servico/SuporteEmpresarialBlocos").then((m) => ({
    default: m.SuporteEmpresarialBlocos,
  })),
);
const SuporteModalidadesSection = lazy(() =>
  import("@/components/servico/SuporteModalidadesSection").then((m) => ({
    default: m.SuporteModalidadesSection,
  })),
);

const LazyBelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

type CoreDataEntry = {
  status: "pending" | "fulfilled" | "rejected";
  promise: Promise<void>;
  data?: ServicoLandingData;
  error?: unknown;
};

const PRIORITY_CORE_DATA_LOADERS: Record<string, () => Promise<ServicoLandingData>> = {
  formatacao: () => import("@/lib/servicosCoreShards/formatacao").then((m) => m.default),
  "upgrade-ssd-ram": () => import("@/lib/servicosCoreShards/upgrade-ssd-ram").then((m) => m.default),
  "recuperacao-de-dados": () => import("@/lib/servicosCoreShards/recuperacao-de-dados").then((m) => m.default),
  "suporte-tecnico-empresarial": () =>
    import("@/lib/servicosCoreShards/suporte-tecnico-empresarial").then((m) => m.default),
};

const coreDataCache = new Map<string, CoreDataEntry>();

const readCoreData = (slug: string): ServicoLandingData | undefined => {
  let entry = coreDataCache.get(slug);
  if (!entry) {
    entry = {
      status: "pending",
      promise: Promise.resolve(),
    };
    const target = entry;
    const loader =
      PRIORITY_CORE_DATA_LOADERS[slug] ??
      (() =>
        import("@/lib/servicosCore").then(
          (m) => m.SERVICOS_CORE[slug] as ServicoLandingData | undefined,
        ));
    target.promise = loader().then(
      (data) => {
        target.data = data;
        target.status = "fulfilled";
      },
      (error) => {
        target.error = error;
        target.status = "rejected";
      },
    );
    coreDataCache.set(slug, target);
  }

  if (entry.status === "pending") throw entry.promise;
  if (entry.status === "rejected") throw entry.error;
  return entry.data;
};


/**
 * Página de serviço essencial (data-driven). Recebe o slug canônico e
 * renderiza a partir de SERVICOS_CORE com a identidade nova. A camada
 * SERVICOS_LOCAL adiciona conteúdo local, FAQ de intenção local e
 * links internos contextuais para reforço de SEO local em Curitiba.
 */
export const ServicoCore = ({
  slug,
  baseData,
}: {
  slug: string;
  baseData?: ServicoLandingData;
}) => {
  const base = baseData ?? readCoreData(slug);
  if (!base) return null;

  const local = SERVICOS_LOCAL[slug];
  const data = local
    ? {
        ...base,
        faqs: [...base.faqs, ...local.faqsLocais],
        blocoLocal: local.blocoLocal,
        linksLocais: local.linksLocais,
      }
    : base;

  // Blocos de política/checklist + wizard de solicitação (Rodada 3L / wizard).
  const extra =
    slug === "suporte-tecnico-empresarial" ? (
      <LazyBelowFold>
        <SuporteEmpresarialBlocos />
        <SuporteModalidadesSection />
      </LazyBelowFold>
    ) : slug === "montagem-de-pc" ? (
      <>
        <WorkstationSection />
        <MontagemWizard />
      </>
    ) : slug === "conserto-monitor" ? (
      <ProvasVisuaisMonitor />
    ) : undefined;

  // Rodada 3P — piloto visual de serviço (manutenção de notebook).
  const piloto =
    slug === "manutencao-de-notebook"
      ? {
          resumo: [
            { label: "Atendimento", value: "Domicílio, coleta e entrega ou remoto" },
            { label: "Região", value: "Curitiba e Região Metropolitana" },
            { label: "Diagnóstico", value: `A partir de ${siteConfig.minPriceLabel}` },
            { label: "Aprovação", value: "Valor informado antes de qualquer reparo" },
          ],
          toc: [
            { id: "incluso", label: "O que está incluso" },
            { id: "quando-chamar", label: "Quando chamar o técnico" },
            { id: "como-funciona", label: "Como funciona o atendimento" },
            { id: "fatores-valor", label: "O que influencia o valor" },
            { id: "faq", label: "Perguntas frequentes" },
          ],
        }
      : {};

  // Rodada 3Q — propagação controlada do padrão visual para as seis
  // páginas comerciais do escopo. Cada slug tem resumo, sumário, caixas
  // e CTA intermediário próprios (nenhum conteúdo editorial alterado).
  const visual = visualDoServico(slug as string);
  const visual3q = visual
    ? {
        resumo: visual.resumo,
        toc: visual.toc,
        confianca: true,
        caixas: visual.caixas,
        caixasTitulo: visual.caixasTitulo,
        caixasPosicao: visual.caixasPosicao,
        ctaIntermediario: visual.ctaIntermediario,
      }
    : {};

  // Rodada 3R — propagação de apresentação (resumo + sumário + faixa de
  // confiança) para as páginas de serviço empresariais. Só se aplica
  // quando o slug não pertence ao escopo fechado da 3Q.
  const empresarial = visual ? undefined : visualEmpresarial(slug as string);
  const visual3r = empresarial
    ? { resumo: empresarial.resumo, toc: empresarial.toc, confianca: true }
    : {};

  // Rodada 3S — variante visual empresarial (escopo fechado, só apresentação).
  const variante3s = VISUAL_3S_SERVICO_SLUGS.includes(slug as never)
    ? ({ variante: "empresarial" } as const)
    : {};

  // Rodada 3T — propagação do padrão empresarial com hero e contexto próprios
  // (preventiva e backup). Redes/Wi-Fi permanece de público misto.
  const cfg3t = visual3T(slug as string);
  const variante3t = cfg3t
    ? ({
        variante: "empresarial",
        heroEmpresarial: cfg3t.hero,
        contextoEmpresarial: cfg3t.contexto,
      } as const)
    : {};

  // Rodada 3T — blocos editoriais próprios das três páginas do escopo,
  // sumário estendido com as âncoras reais e CTA intermediário próprio.
  const cfgBlocos = blocos3T(slug as string);
  const baseToc = visual?.toc ?? empresarial?.toc ?? (piloto as { toc?: { id: string; label: string }[] }).toc;
  const blocos3t = cfgBlocos
    ? {
        toc: [...(baseToc ?? []).slice(0, -1), ...cfgBlocos.tocExtra, { id: "faq", label: "Perguntas frequentes" }],
        confianca: true,
        ctaIntermediario: cta3T(slug as string),
      }
    : {};

  // Rodada 3U — blocos próprios da montagem de PC (escopo, fluxo, contextos,
  // compatibilidade, peças do cliente, BIOS, testes e garantias distintas).
  const path3u = `/servicos/${slug}`;
  const cfg3u = blocos3U(path3u);
  const blocos3u = cfg3u
    ? {
        resumo: cfg3u.resumo,
        toc: [...cfg3u.tocExtra, { id: "faq", label: "Perguntas frequentes" }],
        confianca: true,
        ctaIntermediario: cta3U(path3u),
      }
    : {};

  // Rodada 4A — TV/Smart TV e reparo de placas: eyebrow técnico, indicadores
  // do hero (máximo quatro), sumário próprio e CTA intermediário da vertical.
  const cfg4a = blocos4A(path3u);
  const blocos4a = cfg4a
    ? {
        eyebrow: cfg4a.eyebrow,
        resumo: cfg4a.resumo,
        toc: [...cfg4a.tocExtra, { id: "faq", label: "Perguntas frequentes" }],
        confianca: true,
        ctaIntermediario: cta4A(path3u),
        clarezaHero: <ClarezaVariacao path={path3u} />,
      }
    : {};

  // Rodada 4C — ficha comercial padronizada (mesmos campos obrigatórios em
  // todas as páginas de serviço). Aditiva: entra depois dos blocos da rodada.
  // Fase 2 do Atlas — ponte serviço → trilha do tema (fail-closed: só slugs
  // com ponte curada em atlasPonteServicos.ts renderizam o bloco).
  const ficha = (
    <>
      <FichaComercialServico slug={slug as string} nome={base.serviceName} />
      <AtlasPonteServico slug={slug as string} />
      <BibliotecaPonte chave={slug as string} />
    </>
  );

  const extraFinal = cfgBlocos ? (
    <>
      {extra}
      <LazyBelowFold>
        <Blocos3T slug={slug as string} />
      </LazyBelowFold>
      {ficha}
    </>
  ) : cfg3u ? (
    <>
      <Blocos3U path={path3u} />
      {extra}
      {ficha}
    </>
  ) : cfg4a ? (
    <>
      <Blocos4A path={path3u} />
      {extra}
      {ficha}
    </>
  ) : (
    <>
      {extra}
      {ficha}
    </>
  );


  return (
    <ServicoLandingLayout
      data={{
        ...data,
        ...piloto,
        ...visual3q,
        ...visual3r,
        ...variante3s,
        ...variante3t,
        ...blocos3t,
        ...blocos3u,
        ...blocos4a,
        extra: extraFinal,
      }}
    />
  );

};



export default ServicoCore;
