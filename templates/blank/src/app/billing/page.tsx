import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function BillingPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const success = params.success === "1";
  const canceled = params.canceled === "1";
  const providers =
    env.BILLING_PROVIDER === "both"
      ? ["stripe", "polar"]
      : env.BILLING_PROVIDER === "none"
        ? []
        : [env.BILLING_PROVIDER];

  return (
    <main className="shell auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Billing</p>
        <h1>Choose your billing provider</h1>
        <p className="lede">
          Provider abstraction routes all billing actions. Current
          default: <strong>{env.BILLING_PROVIDER}</strong>.
        </p>

        {success ? <p className="form-success">Checkout completed or redirected successfully.</p> : null}
        {canceled ? <p className="form-error">Checkout was canceled.</p> : null}

        {providers.length === 0 ? (
          <p className="form-error">
            Billing is disabled. Re-run the starter with a billing provider to enable checkout flows.
          </p>
        ) : (
          <div className="billing-grid">
            {providers.map((provider) => (
              <form
                key={provider}
                action="/api/billing/checkout"
                method="post"
                className="billing-card"
              >
                <input type="hidden" name="provider" value={provider} />
                <h2>{provider === "stripe" ? "Stripe" : "Polar"}</h2>
                <p>
                  {provider === "stripe"
                    ? "Create a subscription checkout session using the configured Stripe price."
                    : "Create a Polar checkout session using the configured product identifier."}
                </p>
                <button type="submit" className="auth-button">
                  {provider === "stripe" ? "Start Stripe checkout" : "Start Polar checkout"}
                </button>
              </form>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
