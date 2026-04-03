import "server-only";

import { env } from "@/lib/env";

__BILLING_PROVIDER_IMPORTS__

import type { BillingProvider, BillingProviderName } from "./types";

export function getBillingProviderName(input?: string): BillingProviderName {
  if (input === "stripe" || input === "polar") {
    return input;
  }

  if (env.BILLING_PROVIDER === "stripe" || env.BILLING_PROVIDER === "polar") {
    return env.BILLING_PROVIDER;
  }

  if (env.BILLING_PROVIDER === "both") {
    return "stripe";
  }

  throw new Error("Billing is disabled for this project.");
}

export function getBillingProvider(input?: string): BillingProvider {
  const provider = getBillingProviderName(input);
  const billingProviderFactories: Partial<Record<BillingProviderName, () => BillingProvider>> = {
__BILLING_PROVIDER_FACTORIES__
  };
  const factory = billingProviderFactories[provider];

  if (!factory) {
    throw new Error(`Billing provider is not installed: ${provider}.`);
  }

  return factory();
}
