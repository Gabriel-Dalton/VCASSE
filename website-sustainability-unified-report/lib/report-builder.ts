import { collectProviderResults } from "@/lib/providers";
import { computeUnifiedScore } from "@/lib/scoring/engine";
import { UnifiedReport } from "@/types/report";

function verdict(score: number) {
  if (score >= 80) return "This site demonstrates strong sustainability performance with room for fine-tuning in delivery efficiency.";
  if (score >= 65) return "This site performs moderately well on digital sustainability, but page weight, media efficiency, and code delivery create unnecessary carbon impact.";
  return "This site has notable sustainability debt and should prioritize payload reductions, rendering performance, and cleaner hosting signals.";
}

export async function buildUnifiedReport({
  url,
  selectedProviders,
  manualEntries
}: {
  url: string;
  selectedProviders: string[];
  manualEntries?: Record<string, Record<string, unknown>>;
}): Promise<UnifiedReport> {
  const sourceResults = await collectProviderResults(url, selectedProviders, manualEntries);
  const score = computeUnifiedScore(sourceResults);

  const strengths: string[] = [];
  const issues: string[] = [];

  if ((score.normalizedMetrics.greenHostingLikelihood.value ?? 0) > 0.6) strengths.push("Likely green-hosted infrastructure.");
  if ((score.normalizedMetrics.pageWeightEstimate.value ?? 9999) < 1600) strengths.push("Lean transfer weight relative to peer benchmarks.");

  if ((score.normalizedMetrics.carbonPerVisitEstimate.value ?? 9) > 0.8) issues.push("Estimated carbon per visit is above preferred target range.");
  if ((score.normalizedMetrics.pageWeightEstimate.value ?? 0) > 2200) issues.push("High page transfer weight increases energy demand.");
  if ((score.confidenceScore ?? 0) < 65) issues.push("Confidence is limited due to sparse or inconsistent source data.");

  const recommendations = [
    {
      title: "Optimize media delivery",
      priority: "High" as const,
      impact: "High" as const,
      effort: "Medium" as const,
      description: "Convert large images/video to modern formats and apply adaptive compression and lazy loading."
    },
    {
      title: "Reduce unused JavaScript",
      priority: "High" as const,
      impact: "Medium" as const,
      effort: "Medium" as const,
      description: "Audit third-party scripts, tree-shake bundles, and defer non-critical code paths."
    },
    {
      title: "Strengthen cache directives",
      priority: "Medium" as const,
      impact: "Medium" as const,
      effort: "Low" as const,
      description: "Set long-lived immutable cache headers for static assets to lower repeat transfer emissions."
    }
  ];

  return {
    id: crypto.randomUUID(),
    inputUrl: url,
    analyzedAt: new Date().toISOString(),
    pageTitle: new URL(url).hostname,
    overallScore: score.overallScore,
    overallGrade: score.overallGrade,
    confidenceScore: score.confidenceScore,
    executiveSummary: verdict(score.overallScore),
    sourceResults,
    normalizedMetrics: score.normalizedMetrics,
    strengths,
    issues,
    recommendations,
    methodologyNotes: [
      "Source data is normalized into shared carbon, weight, performance, and hosting dimensions.",
      "Missing values are retained as null and represented as estimated when inferred from available sources.",
      "Unified score combines efficiency metrics with evidence-quality weighting to avoid over-trusting sparse data."
    ],
    disclaimer:
      "This report combines direct source metrics with normalized internal calculations. It is designed for directional decision-making, not legal or regulatory certification."
  };
}
