import { redirect } from "next/navigation";

import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { getSession } from "@/lib/auth-session";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="__AUTH_SCREEN_CLASS__">
      <EmailAuthForm mode="sign-up" />
    </main>
  );
}
