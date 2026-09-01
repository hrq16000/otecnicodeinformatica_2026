/**
 * PONTES SERVIÇO → ATLAS (Fase 2) — a volta da malha editorial.
 *
 * O Atlas já aponta para os serviços canônicos (ida). Estas pontes fecham o
 * ciclo: cada serviço curado declara a QUAL tema pertence e o que o leitor
 * ganha entendendo ANTES de contratar. Regras:
 *  - texto próprio por serviço (nunca template repetido);
 *  - fail-closed: serviço sem ponte declarada não renderiza nada;
 *  - a ponte é aditiva e educativa — não altera preço, escopo nem CTA.
 */
import { ATLAS_TEMAS, type AtlasTema } from "@/lib/atlasInformatica";

export interface AtlasPonteServicoDef {
  /** id do tema em ATLAS_TEMAS. */
  temaId: string;
  /** O que entender antes de contratar — texto próprio do serviço. */
  antesDeContratar: string;
}

export const ATLAS_PONTES_SERVICO: Record<string, AtlasPonteServicoDef> = {
  "upgrade-ssd-ram": {
    temaId: "hardware-upgrades",
    antesDeContratar:
      "Antes de investir em peça, vale confirmar o gargalo: lentidão desde a inicialização aponta para o disco; travamento com muitos programas abertos aponta para a memória. A trilha de hardware do Atlas mostra como identificar isso com verificações seguras — e o guia de decisão SSD ou RAM resume o critério usado na bancada.",
  },
  "recuperacao-de-dados": {
    temaId: "dados-backup",
    antesDeContratar:
      "Disco suspeito perde dados a cada tentativa de uso. A trilha de dados e backup do Atlas explica por que a prioridade é copiar antes de consertar, o que nunca fazer com um HD que faz ruído e como montar a rotina que evita a próxima perda.",
  },
  formatacao: {
    temaId: "windows-inicializacao",
    antesDeContratar:
      "Formatar resolve o que é software — e apaga o que não tem cópia. A trilha de Windows e inicialização do Atlas mostra como confirmar que o problema é mesmo de sistema e por que o backup é etapa obrigatória, não opcional, antes de qualquer reinstalação.",
  },
  "remocao-de-virus": {
    temaId: "seguranca-privacidade",
    antesDeContratar:
      "Remover a infecção sem entender a porta de entrada é convite para reincidência. A trilha de segurança do Atlas ensina a reconhecer página falsa, anexo de cobrança e instalador baixado por anúncio — os três caminhos mais comuns até a bancada.",
  },
  "redes-e-wifi": {
    temaId: "redes-wifi",
    antesDeContratar:
      "Boa parte dos problemas de Wi-Fi se resolve medindo antes de trocar: posição do roteador, canal congestionado, obstáculo físico. A trilha de redes do Atlas mostra como separar o que é do provedor, do roteador e do ambiente antes de contratar qualquer visita.",
  },
  "backup-para-empresas": {
    temaId: "informatica-empresas",
    antesDeContratar:
      "Backup que nunca foi restaurado é promessa, não cópia. A trilha empresarial do Atlas explica inventário, prioridade por impacto na operação e o teste de restauração que transforma a rotina de backup em garantia real de continuidade.",
  },
};

export interface AtlasPonteServicoResolvida {
  tema: AtlasTema;
  antesDeContratar: string;
  hubHref: string;
}

/** Resolve a ponte de um serviço. Sem ponte declarada, retorna null (fail-closed). */
export function atlasPonteDoServico(slug: string): AtlasPonteServicoResolvida | null {
  const ponte = ATLAS_PONTES_SERVICO[slug];
  if (!ponte) return null;
  const tema = ATLAS_TEMAS.find((t) => t.id === ponte.temaId);
  if (!tema) return null;
  return {
    tema,
    antesDeContratar: ponte.antesDeContratar,
    hubHref: `/guia-tecnico-informatica#tema-${tema.id}`,
  };
}
