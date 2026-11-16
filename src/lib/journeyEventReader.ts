export const JOURNEY_EVENT_TYPES = ["page_view", "wa_click"] as const;

// Separate bounded reads prevent a click burst from displacing page views.
export async function readJourneyEventTypes<T>(
  read: (type: (typeof JOURNEY_EVENT_TYPES)[number]) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
) {
  const results = await Promise.all(JOURNEY_EVENT_TYPES.map(type => read(type)));
  for (const result of results) {
    if (result.error) throw new Error(result.error.message);
  }
  return {
    data: results.flatMap(result => result.data ?? []),
    limited: results.some(result => (result.data?.length ?? 0) >= 1000),
  };
}