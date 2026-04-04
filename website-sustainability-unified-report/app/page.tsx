import Link from "next/link";
import { AnalyzerForm } from "@/components/report/analyzer-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-8">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">Website Sustainability Unified Report</p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">Unified sustainability analysis across multiple methods.</h1>
        <p className="max-w-3xl text-muted-foreground">Generate a transparent, client-ready sustainability report that keeps source-level findings visible while producing one normalized score and actionable roadmap.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <AnalyzerForm />
        <Card>
          <CardHeader><CardTitle>Example report preview</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Overall score + grade + confidence</p>
            <p>• Source-by-source comparison table</p>
            <p>• Normalized metrics with estimated markers</p>
            <p>• Executive summary for proposals</p>
            <p>• Clean PDF export</p>
            <Link href="/history" className="inline-block pt-2 text-primary underline">Browse past reports</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
