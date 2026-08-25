/**
 * RODADA 5A — FONTE ÚNICA DOS OWNERS CONGELADOS (4A–4F).
 *
 * Congelamento editorial: nenhuma destas URLs pode ser reeditada durante a
 * observação. Este módulo é puro (sem efeito colateral) e é a única lista
 * usada pelos relatórios de observação — não existe governança paralela.
 *
 * `mudancaMaterial` = data da última alteração material publicada da rodada.
 * Ela é o corte para decidir POST_CHANGE_CRAWL (§6 do briefing).
 */
import { OWNERS_4A } from "./owners-4a.mjs";
import { OWNERS_4B } from "./owners-4b.mjs";

/** Datas de referência por rodada (última mudança material publicada). */
export const MUDANCA_MATERIAL = {
  "4A": "2026-08-18",
  "4B": "2026-08-20",
  "4C": "2026-08-21",
  "4D": "2026-08-22",
  "4E": "2026-08-23",
  "4F": "2026-08-24",
};

const owner = (path, rodada, cluster) => ({
  path,
  rodada,
  cluster,
  mudancaMaterial: MUDANCA_MATERIAL[rodada],
});

export const COHORTS = [
  {
    id: "A",
    nome: "ATP técnico (4A + 4B)",
    owners: [
      ...OWNERS_4A.map((o) => owner(o.path, "4A", o.cluster)),
      ...OWNERS_4B.map((o) => owner(o.path, "4B", o.cluster)),
    ],
  },
  {
    id: "B",
    nome: "Comercial local (4C)",
    owners: [
      owner("/tecnico-informatica-curitiba", "4C", "contratação de técnico — Curitiba"),
      owner("/assistencia-tecnica-curitiba", "4C", "bancada / ordem de serviço"),
      owner("/atendimento-domicilio", "4C", "visita no endereço"),
      owner("/atendimento-remoto", "4C", "sessão remota"),
      owner("/areas-atendidas", "4C", "cobertura e deslocamento"),
      owner("/tecnico-informatica-sao-jose-pinhais", "4C", "contratação — São José dos Pinhais"),
    ],
  },
  {
    id: "C",
    nome: "B2B (4D)",
    owners: [
      owner("/empresa-de-ti-curitiba", "4D", "empresa de TI"),
      owner("/empresas", "4D", "hub empresarial"),
      owner("/servicos/suporte-tecnico-empresarial", "4D", "suporte PJ"),
      owner("/servicos/manutencao-preventiva-empresas", "4D", "preventiva PJ"),
      owner("/servicos/backup-para-empresas", "4D", "backup PJ"),
      owner("/servicos/suporte-home-office", "4D", "home office"),
    ],
  },
  {
    id: "D",
    nome: "Redes e remoto (4E)",
    owners: [
      owner("/problemas/wifi-instavel", "4E", "wi-fi cai / lento"),
      owner("/solucoes/diagnostico", "4E", "diagnóstico de rede"),
      owner("/equipamentos/roteador", "4E", "roteador"),
      owner("/servicos/redes-e-wifi", "4E", "serviço de redes"),
    ],
  },
  {
    id: "E",
    nome: "Autoridade consolidada (4F)",
    owners: [
      owner("/equipamentos/notebook", "4F", "hub de notebook"),
      owner("/problemas/arquivos-apagados", "4F", "recuperação de arquivos"),
    ],
  },
];

/** Lista achatada, sem duplicatas (o primeiro cohort vence). */
export const OWNERS_CONGELADOS = (() => {
  const vistos = new Set();
  const out = [];
  for (const c of COHORTS) {
    for (const o of c.owners) {
      if (vistos.has(o.path)) continue;
      vistos.add(o.path);
      out.push({ ...o, cohort: c.id, cohortNome: c.nome });
    }
  }
  return out;
})();

/** Coorte editorial nacional 9B — observada em separado, gate próprio. */
export const COHORT_9B = [
  "/blog/o-que-e-informatica",
  "/blog/informatica-basica",
  "/blog/como-aprender-informatica",
];
