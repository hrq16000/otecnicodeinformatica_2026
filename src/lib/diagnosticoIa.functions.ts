import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { z } from "zod";

/** Serviços existentes no portal — a IA só pode indicar um destes (nenhuma URL nova). */
export const SERVICOS_IA = {
  "computador-lento": "Computador lento",
  "computador-nao-liga": "Computador não liga",
  formatacao: "Formatação do computador",
  "manutencao-de-computador": "Manutenção de computador",
  "manutencao-de-notebook": "Manutenção de notebook",
  "upgrade-ssd-ram": "Upgrade de SSD e memória",
  "remocao-de-virus": "Remoção de vírus",
  "recuperacao-de-dados": "Recuperação de dados",
  "redes-e-wifi": "Redes e Wi-Fi",
  "conserto-monitor": "Conserto de monitor",
  "conserto-placa": "Conserto de placa",
  "pc-gamer": "PC gamer",
  "montagem-de-pc": "Montagem de PC",
  "suporte-home-office": "Suporte para home office",
  "suporte-tecnico-empresarial": "Suporte técnico para empresas",
} as const;

type ServicoSlug = keyof typeof SERVICOS_IA;
const SLUGS = Object.keys(SERVICOS_IA) as [ServicoSlug, ...ServicoSlug[]];

export type DiagnosticoIa = {
  servico: ServicoSlug;
  nome: string;
  href: string;
  motivo: string;
  verificacaoSegura: string;
  modalidade: "remoto" | "domicilio" | "coleta";
  urgencia: "baixa" | "media" | "alta";
};

const Input = z.object({ descricao: z.string().trim().min(10).max(1200) });

export const sugerirServico = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<DiagnosticoIa> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Serviço de IA não configurado.");

    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({
        schema: z.object({
          servico: z.enum(SLUGS),
          motivo: z.string(),
          verificacaoSegura: z.string(),
          modalidade: z.enum(["remoto", "domicilio", "coleta"]),
          urgencia: z.enum(["baixa", "media", "alta"]),
        }),
      }),
      system:
        "Você é a triagem de O Técnico de Informática. Leia o sintoma descrito pelo visitante e escolha o serviço mais adequado da lista. " +
        "Responda em português do Brasil, tom humano e direto. 'motivo': até 2 frases explicando a escolha. " +
        "'verificacaoSegura': 1 verificação simples e segura que o próprio visitante pode fazer (nunca desativar antivírus, Secure Boot ou UAC; nunca abrir o equipamento). " +
        "'urgencia': alta se há risco de perda de dados, cheiro de queimado, vírus/golpe ativo ou trabalho parado; media se o uso está prejudicado; baixa se é incômodo ou melhoria. " +
        "Não cite preços, prazos, garantias nem prometa resultado. Serviços: " +
        JSON.stringify(SERVICOS_IA),
      prompt: data.descricao,
      providerOptions: {
        openai: { forceReasoning: true, reasoningEffort: "low", store: false },
      },
    });

    try {
      const out = await result.output;
      return {
        ...out,
        nome: SERVICOS_IA[out.servico],
        href: `/servicos/${out.servico}`,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("429")) throw new Error("Muitas consultas agora. Tente novamente em instantes.");
      if (msg.includes("402")) throw new Error("A análise automática está indisponível no momento.");
      throw new Error("Não foi possível analisar agora. Descreva pelo WhatsApp que ajudamos.");
    }
  });
