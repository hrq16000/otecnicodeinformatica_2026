// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
const insert = vi.fn((_row: unknown) => Promise.resolve({ error: null }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ insert }) } }));
import { registrarPageView } from "./funnelAnalytics";
import { summarizeJourneys, type JourneyEvent } from "./seoJourney";
describe("persisted acquisition", () => {
  beforeEach(() => { sessionStorage.clear(); insert.mockClear(); });
  for (const [channel, source] of [["seo","google.com"],["social","instagram.com"],["direto","direto"]]) {
    it(`keeps ${source} eligible rather than manufacturing internal CTA UTMs`, () => {
      sessionStorage.setItem("attribution_v1",JSON.stringify({channel,source,landing_page:"/"}));
      registrarPageView();
      const row=insert.mock.calls[0]?.[0] as unknown as JourneyEvent;
      expect(row).toMatchObject({utm_source:source,utm_medium:null,utm_campaign:null,attribution_channel:channel});
      expect(summarizeJourneys([{...row,created_at:"2026-11-17T01:00:00Z"}],[],[]).visits).toHaveLength(1);
    });
  }
  it("preserves QA UTMs and excludes test visits", () => {
    sessionStorage.setItem("utm_payload_v1",JSON.stringify({utm_source:"qa",utm_medium:"test",utm_campaign:"simulation"}));
    registrarPageView();
    const row=insert.mock.calls[0]?.[0] as unknown as JourneyEvent;
    expect(row).toMatchObject({utm_source:"qa",utm_medium:"test",utm_campaign:"simulation"});
    expect(summarizeJourneys([{...row,created_at:"2026-11-17T01:00:00Z"}],[],[]).visits).toHaveLength(0);
  });
});