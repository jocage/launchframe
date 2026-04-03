import "server-only";

import { env } from "@/lib/env";

import type {
  BillingProvider,
  CheckoutSessionInput,
  PortalSessionInput,
  WebhookInput
} from "../types";

function getPolarApiBaseUrl() {
  return env.POLAR_SERVER === "production"
    ? "https://api.polar.sh/v1"
    : "https://sandbox-api.polar.sh/v1";
}

async function polarFetch<T>(pathname: string, body: Record<string, unknown>) {
  if (!env.POLAR_ACCESS_TOKEN) {
    throw new Error("POLAR_ACCESS_TOKEN is required for Polar billing.");
  }

  const response = await fetch(`${getPolarApiBaseUrl()}${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.POLAR_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Polar request failed: ${message}`);
  }

  return (await response.json()) as T;
}

export class PolarBillingProvider implements BillingProvider {
  async createCheckoutSession(input: CheckoutSessionInput) {
    if (!env.POLAR_PRODUCT_ID) {
      throw new Error("POLAR_PRODUCT_ID is required for Polar checkout.");
    }

    const checkout = await polarFetch<{ url?: string }>("/checkouts", {
      products: [env.POLAR_PRODUCT_ID],
      external_customer_id: input.userId,
      customer_email: input.customerEmail,
      success_url: input.successUrl,
      metadata: {
        userId: input.userId
      }
    });

    if (!checkout.url) {
      throw new Error("Polar did not return a checkout URL.");
    }

    return { url: checkout.url };
  }

  async createCustomerPortalSession(input: PortalSessionInput) {
    const session = await polarFetch<{ customer_portal_url?: string }>("/customer-sessions/", {
      external_customer_id: input.userId
    });

    if (!session.customer_portal_url) {
      throw new Error("Polar did not return a customer portal URL.");
    }

    return { url: session.customer_portal_url };
  }

  async handleWebhook(_input: WebhookInput) {
    throw new Error(
      "Polar webhook verification is intentionally left for follow-up implementation after confirming your webhook signing strategy."
    );
  }
}
