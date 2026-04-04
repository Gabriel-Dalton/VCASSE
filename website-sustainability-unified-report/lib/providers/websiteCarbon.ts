import { SustainabilityProvider } from "./types";
import { getMockSource } from "./mock-data";

export const websiteCarbonProvider: SustainabilityProvider = {
  id: "websiteCarbon",
  label: "Website Carbon",
  async run({ url, manualEntry }) {
    const manual = manualEntry as Record<string, number | boolean | string | null> | undefined;
    const mock = getMockSource(url, "websiteCarbon");

    const numOrNull = (value: unknown): number | null =>
      typeof value === "number" && Number.isFinite(value) ? value : null;

    return {
      sourceName: "Website Carbon",
      status: "ok",
      rawScore: numOrNull(manual?.rawScore ?? mock.rawScore),
      rawGrade: (manual?.rawGrade as string) ?? mock.rawGrade ?? null,
      carbonPerVisit: numOrNull(manual?.carbonPerVisit ?? mock.carbonPerVisit),
      pageWeight: numOrNull(manual?.pageWeight ?? mock.pageWeight),
      energyEstimate: numOrNull(manual?.energyEstimate ?? mock.energyEstimate),
      greenHostingDetected: (manual?.greenHostingDetected as boolean | null) ?? mock.greenHostingDetected ?? null,
      notes: ["Model inspired by Website Carbon-like benchmarking."],
      recommendations: ["Reduce image payload and long-tail scripts."],
      sourceUrl: "https://www.websitecarbon.com"
    };
  }
};
