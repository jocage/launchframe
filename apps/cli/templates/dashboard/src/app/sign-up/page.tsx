import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { getSession } from "@/lib/auth-session";

export default async function SignUpPage() {
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
          From zero to production SaaS in minutes, not months.
          <cite>— Your foundation, your rules</cite>
        </blockquote>
        <div className="auth-features">
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Next.js 16 with App Router</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>TypeScript strict mode</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>Testing with Vitest & Playwright</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-check">✓</div>
            <span>CI/CD with GitHub Actions</span>
          </div>
        </div>
      </div>
      <div className="auth-form-side">
        <EmailAuthForm mode="sign-up" />
      </div>
    </main>
  );
}
