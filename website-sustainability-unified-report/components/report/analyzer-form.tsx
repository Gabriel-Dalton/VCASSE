"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const steps = ["Validating URL", "Collecting source findings", "Normalizing metrics", "Computing unified score", "Finalizing report"];

export function AnalyzerForm() {
  const [url, setUrl] = useState("https://vercel.com");
  const [mode, setMode] = useState<"mock" | "manual">("mock");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [manualScore, setManualScore] = useState("72");
  const router = useRouter();

  async function onGenerate() {
    setLoading(true);
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 320));
    }

    const payload = {
      url,
      providerMode: mode,
      selectedProviders: ["websiteCarbon", "ecograder", "betterweb"],
      manualEntries:
        mode === "manual"
          ? {
              websiteCarbon: { rawScore: Number(manualScore), rawGrade: "B", carbonPerVisit: 0.53, pageWeight: 1760 },
              ecograder: { rawScore: Number(manualScore) + 3, rawGrade: "B+", carbonPerVisit: 0.49, pageWeight: 1650 },
              betterweb: { rawScore: Number(manualScore) - 2, rawGrade: "B-", carbonPerVisit: 0.6, pageWeight: 1880 }
            }
          : undefined
    };

    const res = await fetch("/api/report/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (json.id) {
      router.push(`/report/${json.id}`);
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze any website URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="url" className="mb-2 block text-sm font-medium">Website URL</label>
          <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
        </div>

        <div className="flex gap-2">
          <Button variant={mode === "mock" ? "default" : "outline"} onClick={() => setMode("mock")}>Mock data mode</Button>
          <Button variant={mode === "manual" ? "default" : "outline"} onClick={() => setMode("manual")}>Manual import mode</Button>
        </div>

        {mode === "manual" && (
          <div className="rounded-lg border p-3">
            <p className="mb-2 text-sm font-medium">Manual import (quick parser demo)</p>
            <label className="mb-1 block text-xs text-muted-foreground">Base raw score to normalize</label>
            <Input value={manualScore} onChange={(e) => setManualScore(e.target.value)} inputMode="numeric" />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={onGenerate} disabled={loading}>{loading ? "Generating..." : "Generate Report"}</Button>
          <Button variant="outline" asChild><Link href="/history">View history</Link></Button>
        </div>

        {loading && (
          <div role="status" aria-live="polite" className="rounded-lg border bg-secondary/50 p-3 text-sm">
            <p className="font-medium">{steps[step]}</p>
            <p className="text-muted-foreground">Step {step + 1} of {steps.length}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
