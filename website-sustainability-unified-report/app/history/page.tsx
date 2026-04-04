import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listReports } from "@/lib/storage/reports";

export default async function HistoryPage() {
  const reports = await listReports();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      <Card>
        <CardHeader><CardTitle>Saved Reports</CardTitle></CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved reports yet.</p>
          ) : (
            <ul className="space-y-3">
              {reports.map((report) => (
                <li key={report.id} className="rounded-lg border p-3">
                  <Link href={`/report/${report.id}`} className="font-medium text-primary underline">{report.inputUrl}</Link>
                  <p className="text-sm text-muted-foreground">{format(new Date(report.analyzedAt), "PPP p")} · Score {report.overallScore}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
