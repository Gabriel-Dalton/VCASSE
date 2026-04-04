import { SustainabilityProvider } from "./types";
import { getMockSource } from "./mock-data";

export const ecograderProvider: SustainabilityProvider = {
  id: "ecograder",
  label: "Ecograder",
  async run({ url, manualEntry }) {
    const manual = manualEntry as Record<string, number | boolean | string | null> | undefined;
    const mock = getMockSource(url, "ecograder");

    const numOrNull = (value: unknown): number | null =>
      typeof value === "number" && Number.isFinite(value) ? value : null;

    return {
      sourceName: "Ecograder",
      status: "ok",
      rawScore: numOrNull(manual?.rawScore ?? mock.rawScore),
      rawGrade: (manual?.rawGrade as string) ?? mock.rawGrade ?? null,
      carbonPerVisit: numOrNull(manual?.carbonPerVisit ?? mock.carbonPerVisit),
      pageWeight: numOrNull(manual?.pageWeight ?? mock.pageWeight),
      energyEstimate: numOrNull(manual?.energyEstimate ?? mock.energyEstimate),
      greenHostingDetected: (manual?.greenHostingDetected as boolean | null) ?? mock.greenHostingDetected ?? null,
      notes: ["Performance and transfer-size weighted scoring."],
      recommendations: ["Improve caching policy and compress CSS/JS bundles."],
      sourceUrl: "https://ecograder.com"
    };
  }
};
