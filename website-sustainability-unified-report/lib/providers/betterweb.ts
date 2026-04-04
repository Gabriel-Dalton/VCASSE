import { SustainabilityProvider } from "./types";
import { getMockSource } from "./mock-data";

export const betterwebProvider: SustainabilityProvider = {
  id: "betterweb",
  label: "Betterweb.eco",
  async run({ url, manualEntry }) {
    const manual = manualEntry as Record<string, number | boolean | string | null> | undefined;
    const mock = getMockSource(url, "betterweb");

    const numOrNull = (value: unknown): number | null =>
      typeof value === "number" && Number.isFinite(value) ? value : null;

    return {
      sourceName: "Betterweb.eco",
      status: "partial",
      rawScore: numOrNull(manual?.rawScore ?? mock.rawScore),
      rawGrade: (manual?.rawGrade as string) ?? mock.rawGrade ?? null,
      carbonPerVisit: numOrNull(manual?.carbonPerVisit ?? mock.carbonPerVisit),
      pageWeight: numOrNull(manual?.pageWeight ?? mock.pageWeight),
      energyEstimate: numOrNull(manual?.energyEstimate ?? mock.energyEstimate),
      greenHostingDetected: (manual?.greenHostingDetected as boolean | null) ?? mock.greenHostingDetected ?? null,
      notes: ["Some fields may be unavailable from this source."],
      recommendations: ["Prioritize lazy-loading below-the-fold media."],
      sourceUrl: "https://betterweb.eco"
    };
  }
};
