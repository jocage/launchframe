import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function BillingPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();
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
    <>
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Billing</p>
          <h1>Manage your subscription</h1>
          <p className="lede" style={{ marginTop: 4, fontSize: "0.9375rem" }}>
            Current provider: <strong>{env.BILLING_PROVIDER}</strong>
          </p>
        </div>
      </header>

      {success ? <p className="form-success">Checkout completed or redirected successfully.</p> : null}
      {canceled ? <p className="form-error">Checkout was canceled.</p> : null}

      {providers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💳</div>
          <h3>Billing is disabled</h3>
          <p>
            Re-run the starter with a billing provider to enable checkout flows.
          </p>
        </div>
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
              <h2>
                <span className="bento-card-icon" style={{ width: 32, height: 32, fontSize: "1rem" }}>
                  {provider === "stripe" ? "💜" : "🧊"}
                </span>
                {provider === "stripe" ? "Stripe" : "Polar"}
              </h2>
              <p>
                {provider === "stripe"
                  ? "Create a subscription checkout session using the configured Stripe price."
                  : "Create a Polar checkout session using the configured product identifier."}
              </p>
              <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                {provider === "stripe" ? "Start Stripe checkout" : "Start Polar checkout"}
              </button>
            </form>
          ))}
        </div>
      )}
    </>
  );
}
