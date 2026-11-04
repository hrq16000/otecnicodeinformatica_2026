import { useEffect, useMemo, useState } from "react";
import { MapPin, Users, CheckCircle2, Info, ArrowRight, ShieldCheck, Search } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import HistoricoDDDs from "@/components/nacional/HistoricoDDDs";
import { FastHeader } from "@/components/FastHeader";
import { Footer } from "@/components/Footer";
import { Link } from "@/lib/router-compat";
import { commercialConfig } from "@/lib/config/commercial";
import { getGeoContext, subscribeGeo } from "@/lib/geoContext";
import {
  COMUNIDADE_RESUMO,
  regioesPublicaveis,
  ufDaRegiao,
} from "@/lib/nacional/comunidadePublica";

const PATH = "/comunidade-nacional";
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const preco = (centavos: number) => BRL.format(centavos / 100);
const politica = commercialConfig.comunidadeNacional;

// País ilustrativo, sem pinos falsos; os pontos vêm exclusivamente dos DDDs conferidos.
const BRASIL_CONTORNO =
  "M139 48 L180 55 L217 37 L258 79 L308 66 L332 104 L363 105 " +
  "L404 121 L435 163 L496 190 L470 246 L445 268 L431 312 L400 332 " +
  "L392 387 L357 428 L336 474 L295 523 L269 500 L253 460 L229 437 " +
  "L201 423 L184 408 L160 390 L143 353 L96 348 L70 315 L96 279 " +
  "L78 251 L46 235 L62 203 L45 172 L82 156 L92 101 L112 99 Z";

const siglas = [
  ["", "Todas as regiões"], ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"],
  ["AM", "Amazonas"], ["BA", "Bahia"], ["CE", "Ceará"], ["DF", "Distrito Federal"],
  ["ES", "Espírito Santo"], ["GO", "Goiás"], ["MA", "Maranhão"], ["MT", "Mato Grosso"],
  ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"], ["PA", "Pará"],
  ["PB", "Paraíba"], ["PR", "Paraná"], ["PE", "Pernambuco"], ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"],
  ["SP", "São Paulo"], ["SE", "Sergipe"], ["TO", "Tocantins"],
] as const;

export default function ComunidadeNacional() {
  const [uf, setUf] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const inicial = ufDaRegiao(getGeoContext()?.region);
    if (inicial) setUf((anterior) => anterior || inicial);
    return subscribeGeo((g) => {
      const detectada = ufDaRegiao(g?.region);
      if (detectada) setUf((anterior) => anterior || detectada);
    });
  }, []);

  const pontos = useMemo(() => regioesPublicaveis(), []);
  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return pontos.filter((p) =>
      (!uf || p.uf === uf) &&
      (!termo ||
        [p.ddd, p.uf, p.estado, p.cidadeReferencia].some((v) =>
          v.toLocaleLowerCase("pt-BR").includes(termo),
        )),
    );
  }, [pontos, uf, busca]);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Comunidade nacional de técnicos | Mapa por DDD e participação gratuita"
        description="Conheça a comunidade nacional de técnicos independentes, entenda a referência de R$ 159,99 e a taxa transparente de R$ 9,99, e consulte regiões indicadas por DDD sem exposição de dados pessoais."
        path={PATH}
        breadcrumbs={[{ name: "Início", path: "/" }, { name: "Comunidade nacional", path: PATH }]}
      />
      <FastHeader />
      <div aria-hidden="true" className="h-[var(--site-header-space)]" />
      <main>
        <section className="border-b border-border bg-card py-12 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-primary">
                  <Users className="h-4 w-4" aria-hidden="true" /> Comunidade de alcance nacional
                </span>
                <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  Profissionais valorizados. Cliente e técnico negociam diretamente.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Técnicos independentes de várias regiões do Brasil se conectam para compartilhar
                  conhecimento, divulgar o próprio trabalho e fortalecer a profissão.
                  A participação no grupo é gratuita, sem cobrança para entrar nem leilão de preços.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={COMUNIDADE_RESUMO.grupoWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground hover:opacity-90"
                  >
                    Participar gratuitamente <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#mapa-nacional" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border px-5 font-semibold text-foreground hover:bg-muted">
                    Ver o mapa de regiões
                  </a>
                </div>
              </div>
              <aside className="rounded-3xl border border-border bg-background p-7 lg:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Crescimento da comunidade</p>
                <p className="mt-2 font-heading text-5xl font-bold text-primary">
                  {COMUNIDADE_RESUMO.membrosInformadosMaisDe}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  membros exibidos na captura do grupo em {COMUNIDADE_RESUMO.atualizadoEm}.
                  Membros do grupo não equivalem a técnicos cadastrados, validados ou disponíveis.
                </p>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-foreground">Privacidade em primeiro lugar</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No mapa, aparecem somente regiões de DDD verificadas. Nenhum nome, número de
                    telefone, conversa ou endereço pessoal é divulgado.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="mapa-nacional" className="container mx-auto max-w-6xl scroll-mt-24 py-12 md:py-16">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-foreground">Mapa da comunidade pelo Brasil</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Cada ponto representa um DDD identificado nas capturas da comunidade, não um
              profissional pronto para atender. O DDD indica a área de numeração telefônica
              e não comprova a cidade onde o integrante mora ou trabalha atualmente.
            </p>
          </div>
          <div className="grid gap-7 lg:grid-cols-5">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-3 sm:p-6 lg:col-span-3">
              <svg
                viewBox="0 0 560 565"
                role="img"
                aria-label="Mapa ilustrativo do Brasil. Pontos indicam apenas DDDs conferidos."
                className="mx-auto h-auto w-full max-w-[480px]"
              >
                <defs>
                  <linearGradient id="comunidade-brasil-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#d4e7de" />
                    <stop offset="1" stopColor="#9fceba" />
                  </linearGradient>
                </defs>
                <path d={BRASIL_CONTORNO} fill="url(#comunidade-brasil-grad)" stroke="#5c967f" strokeWidth="3" strokeLinejoin="round" />
                {pontos.map((p) => {
                  const x = 65 + ((p.longitude + 75) / 42) * 430;
                  const y = 38 + ((6 - p.latitude) / 40) * 490;
                  return (
                    <a key={p.ddd} href={"#ddd-" + p.ddd} aria-label={"DDD " + p.ddd + ": " + p.estado}>
                      <circle cx={x} cy={y} r="17" fill="#123e57" stroke="white" strokeWidth="3" />
                      <text x={x} y={y + 4} fontSize="12" fontWeight="bold" textAnchor="middle" fill="white">{p.ddd}</text>
                    </a>
                  );
                })}
              </svg>
              <p className="px-3 pb-3 text-center text-xs text-muted-foreground">
                Ilustração esquemática. Os pontos não representam a localização exata de pessoas.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-background p-5 sm:p-7 lg:col-span-2">
              <label htmlFor="comunidade-uf" className="block text-sm font-semibold text-foreground">
                Escolher um estado
              </label>
              <select
                id="comunidade-uf"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground"
              >
                {siglas.map(([codigo, nome]) => <option key={codigo} value={codigo}>{nome}</option>)}
              </select>
              <label htmlFor="comunidade-busca" className="mt-5 block text-sm font-semibold text-foreground">Buscar DDD ou região</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3">
                <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <input
                  id="comunidade-busca"
                  type="search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="min-h-12 w-full bg-transparent text-foreground outline-none"
                  placeholder="Ex.: 41, PR, Curitiba"
                />
              </div>
              <div aria-live="polite" className="mt-6">
                <h3 className="font-heading text-lg font-bold text-foreground">Regiões identificadas</h3>
                {filtrados.length ? (
                  <ul className="mt-3 max-h-[350px] space-y-2 overflow-auto">
                    {filtrados.map((r) => (
                      <li id={"ddd-" + r.ddd} key={r.ddd} className="rounded-xl border border-border bg-card p-3">
                        <p className="flex items-center gap-2 font-semibold text-foreground">
                          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                          DDD {r.ddd} · {r.estado} ({r.uf})
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Polo de referência: {r.cidadeReferencia} · Evidência conferida em {r.revisadoEm}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 rounded-xl bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
                    {pontos.length === 0
                      ? "Os DDDs estão em conferência a partir das capturas da comunidade. Nenhuma região será divulgada sem evidência."
                      : "Ainda não há DDD publicado com este filtro. Isso não significa ausência de técnicos na região."}
                  </div>
                )}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Localização aproximada por IP pode sugerir um estado, mas você sempre pode alterá-lo.
                Não usamos GPS para declarar que um profissional está disponível.
              </p>
            </div>
          </div>
        </section>

        <HistoricoDDDs />

        <section className="border-y border-border bg-card py-14">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-heading text-3xl font-bold text-foreground">Atendimento rápido: referência clara, negociação livre</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-border bg-background p-6">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-foreground">Serviço programado</h3>
                <p className="mt-3 font-heading text-3xl font-bold text-foreground">{preco(politica.atendimentoProgramadoCentavos)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Referência sugerida para serviço rápido de até uma hora, em horário comercial
                  e com agendamento prévio, conforme aceite do profissional.
                </p>
              </article>
              <article className="rounded-2xl border border-border bg-background p-6">
                <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-foreground">Distribuição transparente</h3>
                <p className="mt-3 text-lg font-bold text-foreground">
                  {preco(politica.repasseTecnicoCentavos)} ao técnico
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  + {preco(politica.taxaClienteCentavos)} de taxa da plataforma, já inclusos
                  na referência de {preco(politica.atendimentoProgramadoCentavos)}.
                  Deslocamento por quilometragem e estacionamento, quando combinados, são
                  destinados integralmente ao profissional e aprovados à parte.
                </p>
              </article>
              <article className="rounded-2xl border border-border bg-background p-6">
                <Info className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-foreground">Preço negociado livremente</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Cliente e técnico podem combinar outro valor diretamente. Nessa modalidade,
                  a taxa fixa de {preco(politica.taxaClienteCentavos)} é responsabilidade
                  exclusiva do cliente, por link de Pix quando o pagamento estiver integrado.
                  O profissional não paga para participar da comunidade.
                </p>
              </article>
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground">
              A plataforma fornece infraestrutura e divulgação, não despacha profissionais.
              Disponibilidade, agenda, escopo, orçamento e execução são combinados entre
              cliente e técnico. Não há cobrança ou confirmação de agenda nesta página.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl py-14">
          <h2 className="font-heading text-3xl font-bold text-foreground">Como participar e encontrar ajuda</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground">Sou profissional de informática</h3>
              <p className="mt-3 text-muted-foreground">
                Entre gratuitamente no grupo, conheça outros técnicos e contribua com a comunidade.
                O cadastro público de profissionais do portal é separado e possui suas próprias condições;
                participar do grupo não exige contratação de plano.
              </p>
              <a href={COMUNIDADE_RESUMO.grupoWhatsApp} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground">
                Entrar no grupo do WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground">Preciso de atendimento</h3>
              <p className="mt-3 text-muted-foreground">
                Consulte os perfis públicos já aprovados, confirme a região e negocie
                diretamente com o profissional. A presença no grupo não é confirmação de
                cadastro, especialidade, agenda ou disponibilidade.
              </p>
              <Link to="/profissionais"
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl border border-border px-5 font-semibold text-foreground">
                Ver profissionais cadastrados <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
