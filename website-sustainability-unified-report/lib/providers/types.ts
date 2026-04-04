import { SourceResult } from "@/types/report";

export interface ProviderInput {
  url: string;
  manualEntry?: Record<string, unknown>;
}

export interface SustainabilityProvider {
  id: string;
  label: string;
  run(input: ProviderInput): Promise<SourceResult>;
}
