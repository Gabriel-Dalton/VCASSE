import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReportPdf } from "@/components/report/pdf-template";
import { unifiedReportSchema } from "@/types/report";

export async function POST(request: Request) {
  try {
    const body = unifiedReportSchema.parse(await request.json());
    const buffer = await renderToBuffer(<ReportPdf report={body} />);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="sustainability-report-${body.id}.pdf"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "PDF generation failed", detail: String(error) }, { status: 400 });
  }
}
