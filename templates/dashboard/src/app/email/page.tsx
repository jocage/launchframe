import Link from "next/link";

import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function EmailPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const sent = params.sent === "1";
  const emailDisabled = env.EMAIL_PROVIDER === "none";

  return (
    <>
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Email</p>
          <h1>Transactional email</h1>
          <p className="lede" style={{ marginTop: 4, fontSize: "0.9375rem" }}>
            {emailDisabled
              ? "Email is disabled. Set EMAIL_PROVIDER to resend to enable."
              : "Test your Resend integration and verify transactional email wiring."}
          </p>
        </div>
      </header>

      {sent ? <p className="form-success">Test email sent to {session?.user.email}.</p> : null}

      {emailDisabled ? (
        <div className="empty-state">
          <div className="empty-state-icon">📧</div>
          <h3>Email provider disabled</h3>
          <p>
            Switch EMAIL_PROVIDER to resend in your .env to enable transactional email.
          </p>
        </div>
      ) : (
        <div className="email-section">
          <div className="email-actions">
            <form action="/api/email/test" method="post">
              <button type="submit" className="btn-primary">
                Send test email
              </button>
            </form>
            <Link href="/dashboard" className="btn-ghost">Back to dashboard</Link>
          </div>
        </div>
      )}
    </>
  );
}
