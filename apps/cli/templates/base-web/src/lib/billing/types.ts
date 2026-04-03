export type BillingProviderName = "stripe" | "polar";

export type CheckoutSessionInput = {
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  userId: string;
};

export type PortalSessionInput = {
  customerEmail: string;
  returnUrl: string;
  userId: string;
};

export type WebhookInput = {
  headers: Headers;
  rawBody: string;
};

export interface BillingProvider {
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string }>;
  createCustomerPortalSession(input: PortalSessionInput): Promise<{ url: string }>;
  handleWebhook(input: WebhookInput): Promise<void>;
}
