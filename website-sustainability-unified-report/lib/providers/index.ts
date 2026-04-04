import { betterwebProvider } from "./betterweb";
import { ecograderProvider } from "./ecograder";
import { websiteCarbonProvider } from "./websiteCarbon";
import { SustainabilityProvider } from "./types";

const providers: Record<string, SustainabilityProvider> = {
  websiteCarbon: websiteCarbonProvider,
  ecograder: ecograderProvider,
  betterweb: betterwebProvider
};

export async function collectProviderResults(
  url: string,
  selectedProviders: string[],
  manualEntries?: Record<string, Record<string, unknown>>
) {
  const active = selectedProviders.map((id) => providers[id]).filter(Boolean);

  return Promise.all(
    active.map((provider) => provider.run({ url, manualEntry: manualEntries?.[provider.id] }))
  );
}
