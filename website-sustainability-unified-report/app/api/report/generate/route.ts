import { NextResponse } from "next/server";
import { buildUnifiedReport } from "@/lib/report-builder";
import { saveReport } from "@/lib/storage/reports";
import { generateReportRequestSchema, unifiedReportSchema } from "@/types/report";

export async function POST(request: Request) {
  try {
    const payload = generateReportRequestSchema.parse(await request.json());
    const report = await buildUnifiedReport({
      url: payload.url,
      selectedProviders: payload.selectedProviders,
      manualEntries: payload.manualEntries as Record<string, Record<string, unknown>> | undefined
    });

    const validated = unifiedReportSchema.parse(report);
    await saveReport(validated);

    return NextResponse.json(validated);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to generate report", detail: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
