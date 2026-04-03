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
__AUTH_SOCIAL_BUTTON_HANDLER__

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
      className="__AUTH_FORM_CLASS__"
    >
      <div className="__AUTH_FORM_COPY_CLASS__">
        <p className="eyebrow">
          {isSignUp ? "Create account" : "__AUTH_FORM_SIGN_IN_EYEBROW__"}
        </p>
        <h1>{isSignUp ? "__AUTH_FORM_SIGN_UP_HEADING__" : "__AUTH_FORM_SIGN_IN_HEADING__"}</h1>
        <p className="lede">
          {isSignUp ? "__AUTH_FORM_SIGN_UP_LEDE__" : "__AUTH_FORM_SIGN_IN_LEDE__"}
        </p>
      </div>

      <div className="__AUTH_FORM_FIELDS_CLASS__">
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
__AUTH_SOCIAL_BUTTON__

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Create one"}
        </Link>
      </p>
    </form>
  );
}
