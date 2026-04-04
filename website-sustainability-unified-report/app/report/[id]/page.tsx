import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportView } from "@/components/report/report-view";
import { Button } from "@/components/ui/button";
import { getReport } from "@/lib/storage/reports";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-8">
      <div className="flex justify-end">
        <Button variant="outline" asChild><Link href="/">Run another analysis</Link></Button>
      </div>
      <ReportView report={report} />
    </div>
  );
}
