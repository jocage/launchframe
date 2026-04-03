import "server-only";

import Stripe from "stripe";

import { env } from "@/lib/env";

import type {
  BillingProvider,
  CheckoutSessionInput,
  PortalSessionInput,
  WebhookInput
} from "../types";

let stripeClient: Stripe | null = null;

function getStripe() {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is required for Stripe billing.");
  }

  stripeClient ??= new Stripe(env.STRIPE_SECRET_KEY);
  return stripeClient;
}

export class StripeBillingProvider implements BillingProvider {
  async createCheckoutSession(input: CheckoutSessionInput) {
    if (!env.STRIPE_PRICE_ID) {
      throw new Error("STRIPE_PRICE_ID is required for Stripe checkout.");
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      customer_email: input.customerEmail,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      allow_promotion_codes: true,
      metadata: {
        userId: input.userId
      }
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return { url: session.url };
  }

  async createCustomerPortalSession(
    _input: PortalSessionInput
  ): Promise<{ url: string }> {
    throw new Error(
      "Stripe portal requires a persisted Stripe customer ID. Add customer mapping before enabling portal access."
    );
  }

  async handleWebhook(input: WebhookInput) {
    if (!env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is required for Stripe webhooks.");
    }

    const signature = input.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing Stripe signature header.");
    }

    const stripe = getStripe();
    stripe.webhooks.constructEvent(input.rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  }
}
