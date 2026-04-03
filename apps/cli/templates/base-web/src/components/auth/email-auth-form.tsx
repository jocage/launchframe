"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

type EmailAuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
__AUTH_SOCIAL_BUTTON_HANDLER__

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    setIsPending(true);
    setError(null);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "Authentication failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Authentication failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">__PROJECT_NAME__</div>

        <div className="auth-header">
          <h1>{isSignUp ? "__AUTH_FORM_SIGN_UP_HEADING__" : "__AUTH_FORM_SIGN_IN_HEADING__"}</h1>
          <p>{isSignUp ? "__AUTH_FORM_SIGN_UP_LEDE__" : "__AUTH_FORM_SIGN_IN_LEDE__"}</p>
        </div>
__AUTH_SOCIAL_BUTTON__

        <div className="auth-tabs">
          <Link href="/sign-in" className={`auth-tab ${!isSignUp ? "active" : ""}`}>
            Sign in
          </Link>
          <Link href="/sign-up" className={`auth-tab ${isSignUp ? "active" : ""}`}>
            Sign up
          </Link>
        </div>

        <form
          action={(formData) => { void handleSubmit(formData); }}
          className="auth-form"
        >
          {isSignUp ? (
            <label className="auth-field">
              <span className="auth-label">NAME</span>
              <div className="auth-input-wrap">
                <svg className="auth-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="7" r="3.5" /><path d="M3.5 17.5c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" /></svg>
                <input name="name" type="text" placeholder="Ada Lovelace" required />
              </div>
            </label>
          ) : null}

          <label className="auth-field">
            <span className="auth-label">EMAIL</span>
            <div className="auth-input-wrap">
              <svg className="auth-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="16" height="12" rx="2" /><path d="M2 6l8 5 8-5" /></svg>
              <input name="email" type="email" placeholder="you@example.com" required />
            </div>
          </label>

          <label className="auth-field">
            <span className="auth-label">PASSWORD</span>
            <div className="auth-input-wrap">
              <svg className="auth-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="9" width="12" height="8" rx="2" /><path d="M7 9V6a3 3 0 016 0v3" /></svg>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
              <button
                type="button"
                className="auth-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" /><circle cx="10" cy="10" r="2.5" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" /><circle cx="10" cy="10" r="2.5" /><line x1="3" y1="17" x2="17" y2="3" /></svg>
                )}
              </button>
            </div>
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="auth-submit" disabled={isPending}>
            {isPending ? "Working..." : isSignUp ? "Create account" : "Sign in"}{" "}
            {!isPending && <span className="auth-submit-arrow">→</span>}
          </button>
        </form>

        <p className="auth-footer">secured by better-auth</p>
      </div>
    </div>
  );
}
