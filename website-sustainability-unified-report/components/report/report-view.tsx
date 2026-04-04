"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Download, Copy } from "lucide-react";
import { UnifiedReport } from "@/types/report";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "./score-ring";

export function ReportView({ report }: { report: UnifiedReport }) {
  const [exporting, setExporting] = useState(false);

  const exportPdf = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/report/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(report) });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sustainability-report-${report.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{report.inputUrl}</p>
            <h1 className="mt-1 text-3xl font-semibold">Unified Sustainability Report</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">{report.executiveSummary}</p>
            <p className="mt-2 text-xs text-muted-foreground">Analyzed {format(new Date(report.analyzedAt), "PPP p")}</p>
          </div>
          <div className="flex items-center gap-6">
            <ScoreRing score={report.overallScore} />
            <div className="space-y-2">
              <Badge>Grade {report.overallGrade}</Badge>
              <p className="text-sm">Confidence: {report.confidenceScore}%</p>
              <div className="flex gap-2">
                <Button onClick={exportPdf} disabled={exporting}><Download className="mr-2 h-4 w-4" />Export PDF</Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(`${report.pageTitle}: score ${report.overallScore}/100 (${report.overallGrade}). ${report.executiveSummary}`)}
                >
                  <Copy className="mr-2 h-4 w-4" />Copy Summary
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Source-by-Source Comparison</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {report.sourceResults.map((s) => (
              <div key={s.sourceName} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{s.sourceName}</p>
                  <Badge>{s.status}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <p>Raw Score: {s.rawScore ?? "N/A"}</p>
                  <p>Grade: {s.rawGrade ?? "N/A"}</p>
                  <p>Carbon: {s.carbonPerVisit ?? "N/A"}g/visit</p>
                  <p>Weight: {s.pageWeight ?? "N/A"}KB</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Normalized Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Carbon per visit estimate: {report.normalizedMetrics.carbonPerVisitEstimate.value?.toFixed(2) ?? "N/A"} g {report.normalizedMetrics.carbonPerVisitEstimate.estimated && "(estimated)"}</p>
            <p>Page weight estimate: {report.normalizedMetrics.pageWeightEstimate.value?.toFixed(0) ?? "N/A"} KB {report.normalizedMetrics.pageWeightEstimate.estimated && "(estimated)"}</p>
            <p>Performance estimate: {report.normalizedMetrics.performanceEstimate.value?.toFixed(0) ?? "N/A"} /100</p>
            <p>Green hosting likelihood: {report.normalizedMetrics.greenHostingLikelihood.value !== null ? `${Math.round(report.normalizedMetrics.greenHostingLikelihood.value * 100)}%` : "N/A"}</p>
            <p>Data coverage: {report.normalizedMetrics.dataCoverage}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>What’s Working Well</CardTitle></CardHeader>
          <CardContent><ul className="list-disc space-y-2 pl-5 text-sm">{report.strengths.map((s) => <li key={s}>{s}</li>)}</ul></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Major Opportunities</CardTitle></CardHeader>
          <CardContent><ul className="list-disc space-y-2 pl-5 text-sm">{report.issues.map((s) => <li key={s}>{s}</li>)}</ul></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recommended Fixes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {report.recommendations.map((r) => (
            <div key={r.title} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">Priority {r.priority} · Impact {r.impact} · Effort {r.effort}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Methodology and Confidence</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {report.methodologyNotes.map((n) => <p key={n}>• {n}</p>)}
          <p className="pt-3 text-xs">{report.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  );
}
