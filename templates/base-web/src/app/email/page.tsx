import Link from "next/link";
__EMAIL_REDIRECT_IMPORT__
import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function EmailPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();

__EMAIL_SESSION_SETUP__
__EMAIL_AUTH_GUARD__

  const params = await searchParams;
  const sent = params.sent === "1";
  const emailDisabled = env.EMAIL_PROVIDER === "none";

  return (
    <main className="__AUTH_SCREEN_CLASS__">
      <section className="__AUTH_PANEL_CLASS__">
        <p className="eyebrow">Email</p>
        <h1>Transactional email baseline</h1>
        <p className="lede">
          {emailDisabled
            ? "Email provider is disabled for this generated app. Switch EMAIL_PROVIDER to resend when you want to wire transactional email."
            : "The starter routes email sending through a single server-side Resend service. Use this page to verify the wiring and then connect real auth and billing emails."}
        </p>

        {sent ? <p className="form-success">Test email sent to {displayEmailRecipient}.</p> : null}

__EMAIL_DEMO_BANNER__

        <div className="hero-actions">
          <form action="/api/email/test" method="post">
            <button type="submit" className="auth-button" disabled={emailDisabled || emailSendingDisabled}>
              Send test email
            </button>
          </form>
          <Link href="/dashboard">Back to dashboard</Link>
        </div>
      </section>
    </main>
  );
}
