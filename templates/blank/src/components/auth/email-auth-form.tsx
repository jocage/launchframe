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

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    setIsPending(true);
    setError(null);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            email,
            password,
            name
          })
        : await authClient.signIn.email({
            email,
            password
          });

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
    <form
      action={(formData) => {
        void handleSubmit(formData);
      }}
      className="auth-card"
    >
      <div className="auth-copy">
        <p className="eyebrow">{isSignUp ? "Create account" : "Welcome back"}</p>
        <h1>{isSignUp ? "Create your account" : "Sign in to your workspace"}</h1>
        <p className="lede">
          {isSignUp
            ? "Start from a minimal SaaS baseline with auth, billing, and strong project structure."
            : "Use your email and password to continue into the app."}
        </p>
      </div>

      <div className="auth-fields">
        {isSignUp ? (
          <label className="field">
            <span>Name</span>
            <input name="name" type="text" placeholder="Ada Lovelace" required />
          </label>
        ) : null}

        <label className="field">
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </label>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <button type="submit" className="auth-button" disabled={isPending}>
        {isPending ? "Working..." : isSignUp ? "Create account" : "Sign in"}
      </button>

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
