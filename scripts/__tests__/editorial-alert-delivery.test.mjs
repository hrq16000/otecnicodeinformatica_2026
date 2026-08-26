import { describe, expect, it } from "vitest";
import {
  classificarFalha,
  entregarAlertas,
  eventId,
  lerConfiguracao,
  mensagemSlack,
  normalizarEvento,
} from "../lib/editorial-alert-delivery.mjs";

const evento = (over = {}) => ({
  url: "/blog/impressora-offline-como-resolver",
  lote: "10C/2",
  owner: "impressora-offline",
  source: "GSC",
  eventType: "GSC_EVENT",
  previousState: "CRAWLED",
  currentState: "INDEXED",
  severity: "SUCCESS",
  observedAt: "2026-08-26T03:00:00.000Z",
  ...over,
});

const adapterMock = (respostas) => {
  const chamadas = [];
  let i = 0;
  return {
    chamadas,
    canal: "mock",
    async enviar(e, cfg) {
      chamadas.push({ url: e.url, cfg: Boolean(cfg) });
      const r = respostas[Math.min(i, respostas.length - 1)];
      i += 1;
      return r;
    },
  };
};

const cfg = (over = {}) => ({
  slack: { enabled: false, severities: ["SUCCESS"], status: "NOT_CONFIGURED" },
  email: { enabled: false, severities: ["SUCCESS"], status: "NOT_CONFIGURED" },
  ...over,
});

const slackOn = { enabled: true, webhookUrl: "https://x", severities: ["SUCCESS", "WARNING", "ERROR"], status: "CONFIGURED" };
const emailOn = { enabled: true, apiKey: "k", to: "a@b.c", from: "c@d.e", severities: ["SUCCESS"], status: "CONFIGURED" };

describe("configuração de canais (Slack e e-mail independentes)", () => {
  it("sem env algum → ambos NOT_CONFIGURED", () => {
    const c = lerConfiguracao({});
    expect(c.slack.status).toBe("NOT_CONFIGURED");
    expect(c.email.status).toBe("NOT_CONFIGURED");
  });

  it("só Slack configurado não habilita e-mail", () => {
    const c = lerConfiguracao({ EDITORIAL_SLACK_WEBHOOK_URL: "https://hooks/x" });
    expect(c.slack.enabled).toBe(true);
    expect(c.email.enabled).toBe(false);
  });

  it("só e-mail configurado não habilita Slack", () => {
    const c = lerConfiguracao({
      RESEND_API_KEY: "k",
      EDITORIAL_ALERT_EMAIL_TO: "a@b.c",
      EDITORIAL_ALERT_EMAIL_FROM: "x@y.z",
    });
    expect(c.email.enabled).toBe(true);
    expect(c.slack.enabled).toBe(false);
  });
});

describe("entrega", () => {
  it("nenhum canal → DELIVERY_DISABLED sem quebrar", async () => {
    const r = await entregarAlertas([evento()], { config: cfg(), auditoria: { entregas: {} }, adapters: {} });
    expect(r.resumo.estado).toBe("DELIVERY_DISABLED");
    expect(r.resultados[0].state).toBe("DELIVERY_DISABLED");
  });

  it("ambos configurados → entrega nos dois canais", async () => {
    const slack = adapterMock([{ status: 200 }]);
    const email = adapterMock([{ status: 200 }]);
    const r = await entregarAlertas([evento()], {
      config: cfg({ slack: slackOn, email: emailOn }),
      auditoria: { entregas: {} },
      adapters: { slack, email },
    });
    expect(r.resumo.enviados).toBe(2);
    expect(slack.chamadas).toHaveLength(1);
    expect(email.chamadas).toHaveLength(1);
  });

  it("filtro de severidade por canal", async () => {
    const email = adapterMock([{ status: 200 }]);
    const r = await entregarAlertas([evento({ severity: "WARNING", currentState: "CRAWLED_NOT_INDEXED" })], {
      config: cfg({ email: { ...emailOn, severities: ["ERROR"] } }),
      auditoria: { entregas: {} },
      adapters: { email },
    });
    expect(r.resultados[0].state).toBe("FILTERED_SEVERITY");
    expect(email.chamadas).toHaveLength(0);
  });

  it("evento duplicado NÃO gera segunda mensagem (idempotência eventId+channel)", async () => {
    const slack = adapterMock([{ status: 200 }]);
    const primeira = await entregarAlertas([evento()], {
      config: cfg({ slack: slackOn }),
      auditoria: { entregas: {} },
      adapters: { slack },
    });
    const segunda = await entregarAlertas([evento(), evento()], {
      config: cfg({ slack: slackOn }),
      auditoria: { entregas: primeira.entregas },
      adapters: { slack },
    });
    expect(slack.chamadas).toHaveLength(1);
    expect(segunda.resultados.every((r) => r.state === "ALREADY_DELIVERED")).toBe(true);
  });

  it("429 e 500 são transitórios e sofrem retry; sucesso posterior entrega", async () => {
    const slack = adapterMock([{ status: 429 }, { status: 500 }, { status: 200 }]);
    const r = await entregarAlertas([evento()], {
      config: cfg({ slack: slackOn }),
      auditoria: { entregas: {} },
      adapters: { slack },
    });
    expect(slack.chamadas.length).toBe(3);
    expect(r.resultados[0].state).toBe("DELIVERED");
  });

  it("erro de configuração (403) não faz retry contínuo", async () => {
    const slack = adapterMock([{ status: 403 }]);
    const r = await entregarAlertas([evento()], {
      config: cfg({ slack: slackOn }),
      auditoria: { entregas: {} },
      adapters: { slack },
    });
    expect(slack.chamadas).toHaveLength(1);
    expect(r.resultados[0].state).toBe("FAILED_CONFIG");
  });

  it("dry-run não chama adapter", async () => {
    const slack = adapterMock([{ status: 200 }]);
    const r = await entregarAlertas([evento()], {
      config: cfg({ slack: slackOn }),
      auditoria: { entregas: {} },
      adapters: { slack },
      dryRun: true,
    });
    expect(slack.chamadas).toHaveLength(0);
    expect(r.resultados[0].state).toBe("DRY_RUN");
  });
});

describe("classificação e payload", () => {
  it("classifica falhas", () => {
    expect(classificarFalha({ status: 200 })).toBe("DELIVERED");
    expect(classificarFalha({ status: 429 })).toBe("RETRYABLE");
    expect(classificarFalha({ status: 503 })).toBe("RETRYABLE");
    expect(classificarFalha({ status: 0, erro: "timeout" })).toBe("RETRYABLE");
    expect(classificarFalha({ status: 401 })).toBe("FAILED_CONFIG");
  });

  it("eventId é estável para a mesma transição", () => {
    expect(eventId(evento())).toBe(eventId(evento({ observedAt: "2026-09-01T00:00:00.000Z" })));
  });

  it("payload não contém segredo", () => {
    const texto = mensagemSlack(normalizarEvento(evento()));
    expect(texto).toContain("INDEXED");
    expect(texto).toContain("Antes: CRAWLED");
    expect(texto).not.toMatch(/hooks\.slack\.com|re_[A-Za-z0-9]{8}/);
  });
});
