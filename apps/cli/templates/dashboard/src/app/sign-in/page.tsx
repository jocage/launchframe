import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { getSession } from "@/lib/auth-session";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="auth-screen">
      <div className="auth-brand">
        <div className="logo">
          launch<span>frame</span>
        </div>
        <blockquote>
          Stop rebuilding auth, billing, and email for every new project.
          <cite>— Ship what matters, not infrastructure</cite>
        </blockquote>
        <div className="auth-features">
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Authentication with session management</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Stripe & Polar billing ready</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Transactional email wired</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Database with migrations & seeds</span>
          </div>
        </div>
      </div>
      <div className="auth-form-side">
        <EmailAuthForm mode="sign-in" />
      </div>
    </main>
  );
}
