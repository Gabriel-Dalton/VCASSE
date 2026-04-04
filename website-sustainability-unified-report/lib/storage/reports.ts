import { promises as fs } from "fs";
import path from "path";
import { UnifiedReport } from "@/types/report";

const storePath = path.join(process.cwd(), "data", "reports.json");

async function ensureStore() {
  try {
    await fs.access(storePath);
  } catch {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, "[]", "utf8");
  }
}

export async function saveReport(report: UnifiedReport) {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  const reports = JSON.parse(raw) as UnifiedReport[];
  reports.unshift(report);
  await fs.writeFile(storePath, JSON.stringify(reports.slice(0, 50), null, 2), "utf8");
}

export async function listReports() {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as UnifiedReport[];
}

export async function getReport(id: string) {
  const reports = await listReports();
  return reports.find((r) => r.id === id) ?? null;
}
