import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { getSession } from "@/lib/auth-session";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="shell auth-shell">
      <EmailAuthForm mode="sign-in" />
    </main>
  );
}
