import { SourceResult } from "@/types/report";

function avg(values: Array<number | null>) {
  const clean = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  return clean.length ? clean.reduce((a, b) => a + b, 0) / clean.length : null;
}

function estimateFlag(values: Array<number | null>) {
  return values.filter((v) => v !== null).length < 2;
}

export function normalizeMetrics(sourceResults: SourceResult[]) {
  const carbonValues = sourceResults.map((s) => s.carbonPerVisit);
  const weightValues = sourceResults.map((s) => s.pageWeight);
  const scoreValues = sourceResults.map((s) => s.rawScore);
  const greenValues = sourceResults
    .map((s) => (s.greenHostingDetected === null ? null : s.greenHostingDetected ? 1 : 0));

  const coveragePoints = [carbonValues, weightValues, scoreValues, greenValues].flat().filter((v) => v !== null).length;
  const possible = sourceResults.length * 4;
  const dataCoverage = Math.round((coveragePoints / possible) * 100);

  return {
    carbonPerVisitEstimate: { value: avg(carbonValues), estimated: estimateFlag(carbonValues) },
    pageWeightEstimate: { value: avg(weightValues), estimated: estimateFlag(weightValues) },
    performanceEstimate: { value: avg(scoreValues), estimated: estimateFlag(scoreValues) },
    greenHostingLikelihood: { value: avg(greenValues), estimated: estimateFlag(greenValues) },
    sustainabilityConfidence: Math.round((dataCoverage * 0.7) + (sourceResults.length / 3) * 30),
    dataCoverage
  };
}
