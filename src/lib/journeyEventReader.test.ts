import { describe, expect, it } from "vitest";
import { JOURNEY_EVENT_TYPES, readJourneyEventTypes } from "./journeyEventReader";

describe("bounded journey event reads", () => {
  it("keeps page views even when WhatsApp clicks fill the reading limit", async () => {
    const result = await readJourneyEventTypes<{ type: (typeof JOURNEY_EVENT_TYPES)[number] }>(async type => ({
      data: type === "wa_click" ? Array.from({ length: 1000 }, () => ({ type })) : [{ type }],
      error: null,
    }));
    expect(result.data.filter(row => row.type === "page_view")).toHaveLength(1);
    expect(result.data.filter(row => row.type === "wa_click")).toHaveLength(1000);
    expect(result.limited).toBe(true);
  });
  it("does not hide a failed event read", async () => {
    await expect(readJourneyEventTypes(async type => ({ data: [], error: type === "page_view" ? { message: "Read failed" } : null }))).rejects.toThrow("Read failed");
  });
});