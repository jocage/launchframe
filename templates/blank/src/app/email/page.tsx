import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";
import { env } from "@/lib/env";

export default async function EmailPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const sent = params.sent === "1";
  const emailDisabled = env.EMAIL_PROVIDER === "none";

  return (
    <main className="shell auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Email</p>
        <h1>Transactional email</h1>
        <p className="lede">
          {emailDisabled
            ? "Email is disabled. Set EMAIL_PROVIDER to resend to enable transactional email."
            : "Test your Resend integration and verify that transactional email is wired correctly."}
        </p>

        {sent ? <p className="form-success">Test email sent to {session.user.email}.</p> : null}

        <div className="hero-actions" style={{ justifyContent: "flex-start" }}>
          <form action="/api/email/test" method="post">
            <button type="submit" className="auth-button" disabled={emailDisabled}>
              Send test email
            </button>
          </form>
          <Link href="/dashboard" className="btn-ghost">Back to dashboard</Link>
        </div>
      </section>
    </main>
  );
}
