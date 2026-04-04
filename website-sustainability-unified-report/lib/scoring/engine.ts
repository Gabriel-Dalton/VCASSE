import { SourceResult } from "@/types/report";
import { normalizeMetrics } from "@/lib/normalization/normalize";

export function toGrade(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

/**
 * Unified score is documented and deterministic.
 *
 * Dimensions:
 * - carbon efficiency (35%): lower carbon per visit => higher score
 * - transfer efficiency (25%): lower page weight => higher score
 * - performance efficiency (20%): average source performance-like score
 * - hosting quality (10%): green hosting probability
 * - evidence quality (10%): coverage + cross-source agreement
 */
export function computeUnifiedScore(sourceResults: SourceResult[]) {
  const normalized = normalizeMetrics(sourceResults);
  const carbon = normalized.carbonPerVisitEstimate.value;
  const weight = normalized.pageWeightEstimate.value;
  const perf = normalized.performanceEstimate.value;
  const green = normalized.greenHostingLikelihood.value;

  const carbonScore = carbon === null ? 50 : Math.max(0, Math.min(100, 100 - carbon * 60));
  const weightScore = weight === null ? 50 : Math.max(0, Math.min(100, 100 - (weight / 3000) * 100));
  const perfScore = perf ?? 50;
  const greenScore = green === null ? 50 : green * 100;

  const rawScores = sourceResults.map((s) => s.rawScore).filter((v): v is number => v !== null);
  const agreement = rawScores.length > 1 ? 100 - (Math.max(...rawScores) - Math.min(...rawScores)) : 60;
  const evidenceQuality = Math.round((normalized.dataCoverage * 0.65) + (agreement * 0.35));

  const overallScore = Math.round(
    carbonScore * 0.35 +
      weightScore * 0.25 +
      perfScore * 0.2 +
      greenScore * 0.1 +
      evidenceQuality * 0.1
  );

  return {
    overallScore,
    overallGrade: toGrade(overallScore),
    confidenceScore: Math.round((normalized.sustainabilityConfidence * 0.6) + (evidenceQuality * 0.4)),
    normalizedMetrics: normalized
  };
}
