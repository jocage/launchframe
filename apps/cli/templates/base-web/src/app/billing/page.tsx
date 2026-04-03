__BILLING_REDIRECT_IMPORT__
import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function BillingPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();

__BILLING_SESSION_SETUP__
__BILLING_AUTH_GUARD__

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
    <main className="__AUTH_SCREEN_CLASS__">
      <section className="__AUTH_PANEL_CLASS__">
        <p className="eyebrow">Billing</p>
        <h1>Choose your billing provider</h1>
        <p className="lede">
          The starter routes all billing actions through a provider abstraction. Current
          default: <strong>{env.BILLING_PROVIDER}</strong>.
        </p>

        {success ? <p className="form-success">Checkout completed or redirected successfully.</p> : null}
        {canceled ? <p className="form-error">Checkout was canceled.</p> : null}

__BILLING_DEMO_BANNER__

        {providers.length === 0 ? (
          <p className="form-error">
            Billing is disabled for this generated app. Re-run the starter with a billing
            provider to enable checkout flows.
          </p>
        ) : (
          <div className="billing-grid">
            {providers.map((provider) => (
__BILLING_PROVIDER_CARD__
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
