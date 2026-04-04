import { SourceResult } from "@/types/report";

const database: Record<string, Record<string, Partial<SourceResult>>> = {
  "https://www.apple.com": {
    websiteCarbon: { rawScore: 58, rawGrade: "C", carbonPerVisit: 0.91, pageWeight: 2730, energyEstimate: 0.0046, greenHostingDetected: true },
    ecograder: { rawScore: 64, rawGrade: "B-", carbonPerVisit: 0.8, pageWeight: 2410, energyEstimate: 0.0042, greenHostingDetected: true },
    betterweb: { rawScore: 61, rawGrade: "C+", carbonPerVisit: 0.87, pageWeight: 2560, energyEstimate: null, greenHostingDetected: null }
  },
  "https://vercel.com": {
    websiteCarbon: { rawScore: 79, rawGrade: "A-", carbonPerVisit: 0.35, pageWeight: 1380, energyEstimate: 0.0022, greenHostingDetected: true },
    ecograder: { rawScore: 83, rawGrade: "A", carbonPerVisit: 0.31, pageWeight: 1200, energyEstimate: 0.0019, greenHostingDetected: true },
    betterweb: { rawScore: 76, rawGrade: "B+", carbonPerVisit: 0.42, pageWeight: 1480, energyEstimate: null, greenHostingDetected: true }
  }
};

export function getMockSource(url: string, provider: string): Partial<SourceResult> {
  const key = Object.keys(database).find((k) => url.includes(new URL(k).hostname));
  if (!key) {
    return {
      rawScore: 67,
      rawGrade: "B-",
      carbonPerVisit: 0.65,
      pageWeight: 1800,
      energyEstimate: 0.003,
      greenHostingDetected: null
    };
  }

  return database[key][provider] ?? {};
}
