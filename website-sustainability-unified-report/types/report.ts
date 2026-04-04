import { z } from "zod";

export const sourceResultSchema = z.object({
  sourceName: z.string(),
  status: z.enum(["ok", "partial", "error"]),
  rawScore: z.number().min(0).max(100).nullable(),
  rawGrade: z.string().nullable(),
  carbonPerVisit: z.number().nullable(),
  pageWeight: z.number().nullable(),
  energyEstimate: z.number().nullable(),
  greenHostingDetected: z.boolean().nullable(),
  notes: z.array(z.string()),
  recommendations: z.array(z.string()),
  sourceUrl: z.string().url().nullable()
});

export const recommendationSchema = z.object({
  title: z.string(),
  priority: z.enum(["High", "Medium", "Low"]),
  impact: z.enum(["High", "Medium", "Low"]),
  effort: z.enum(["High", "Medium", "Low"]),
  description: z.string()
});

export const normalizedMetricsSchema = z.object({
  carbonPerVisitEstimate: z.object({ value: z.number().nullable(), estimated: z.boolean() }),
  pageWeightEstimate: z.object({ value: z.number().nullable(), estimated: z.boolean() }),
  performanceEstimate: z.object({ value: z.number().nullable(), estimated: z.boolean() }),
  greenHostingLikelihood: z.object({ value: z.number().min(0).max(1).nullable(), estimated: z.boolean() }),
  sustainabilityConfidence: z.number().min(0).max(100),
  dataCoverage: z.number().min(0).max(100)
});

export const unifiedReportSchema = z.object({
  id: z.string(),
  inputUrl: z.string().url(),
  analyzedAt: z.string(),
  pageTitle: z.string(),
  overallScore: z.number().min(0).max(100),
  overallGrade: z.string(),
  confidenceScore: z.number().min(0).max(100),
  executiveSummary: z.string(),
  sourceResults: z.array(sourceResultSchema),
  normalizedMetrics: normalizedMetricsSchema,
  strengths: z.array(z.string()),
  issues: z.array(z.string()),
  recommendations: z.array(recommendationSchema),
  methodologyNotes: z.array(z.string()),
  disclaimer: z.string()
});

export type SourceResult = z.infer<typeof sourceResultSchema>;
export type UnifiedRecommendation = z.infer<typeof recommendationSchema>;
export type UnifiedReport = z.infer<typeof unifiedReportSchema>;

export const generateReportRequestSchema = z.object({
  url: z.string().url(),
  providerMode: z.enum(["mock", "manual"]).default("mock"),
  selectedProviders: z.array(z.string()).default(["websiteCarbon", "ecograder", "betterweb"]),
  manualEntries: z.record(z.string(), z.any()).optional()
});
