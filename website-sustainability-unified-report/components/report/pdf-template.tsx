import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { UnifiedReport } from "@/types/report";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, color: "#0f172a" },
  h1: { fontSize: 20, fontWeight: 700, marginBottom: 6 },
  h2: { fontSize: 13, fontWeight: 700, marginBottom: 8, marginTop: 16 },
  muted: { color: "#475569", marginBottom: 4 },
  card: { border: "1px solid #dbe2ea", borderRadius: 8, padding: 10, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  strong: { fontWeight: 700 }
});

export function ReportPdf({ report }: { report: UnifiedReport }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Website Sustainability Unified Report</Text>
        <Text style={styles.muted}>{report.inputUrl}</Text>
        <Text style={styles.muted}>Analyzed at: {new Date(report.analyzedAt).toLocaleString()}</Text>

        <View style={styles.card}>
          <Text style={styles.strong}>Executive Summary</Text>
          <Text>{report.executiveSummary}</Text>
          <Text>Overall Score: {report.overallScore}/100 ({report.overallGrade})</Text>
          <Text>Confidence: {report.confidenceScore}%</Text>
        </View>

        <Text style={styles.h2}>Source Comparison</Text>
        {report.sourceResults.map((src) => (
          <View style={styles.card} key={src.sourceName}>
            <Text style={styles.strong}>{src.sourceName}</Text>
            <View style={styles.row}>
              <Text>Score: {src.rawScore ?? "N/A"}</Text>
              <Text>Carbon/Visit: {src.carbonPerVisit ?? "N/A"}g</Text>
              <Text>Weight: {src.pageWeight ?? "N/A"}KB</Text>
            </View>
          </View>
        ))}

        <Text style={styles.h2}>Recommendations</Text>
        {report.recommendations.map((rec) => (
          <View style={styles.card} key={rec.title}>
            <Text style={styles.strong}>{rec.title}</Text>
            <Text>{rec.description}</Text>
            <Text>{rec.priority} priority · {rec.impact} impact · {rec.effort} effort</Text>
          </View>
        ))}

        <Text style={styles.h2}>Methodology & Disclaimer</Text>
        {report.methodologyNotes.map((note) => <Text key={note}>• {note}</Text>)}
        <Text style={{ marginTop: 8 }}>{report.disclaimer}</Text>
      </Page>
    </Document>
  );
}
