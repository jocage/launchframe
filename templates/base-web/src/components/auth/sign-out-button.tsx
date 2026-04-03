"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);

    try {
      await authClient.signOut();
      router.push("/sign-in");
      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button type="button" className="__SIGN_OUT_BUTTON_CLASS__" onClick={() => void handleSignOut()}>
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
