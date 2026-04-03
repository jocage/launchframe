import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";
import { sendEmail } from "@/lib/email";
import { createWelcomeEmailTemplate } from "@/lib/email/templates";
import { env } from "@/lib/env";

export async function POST() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (env.EMAIL_PROVIDER === "none") {
    redirect("/email");
  }

  await sendEmail({
    to: session.user.email,
    template: createWelcomeEmailTemplate({
      appName: "Launchframe",
      recipientName: session.user.name
    })
  });

  redirect("/email?sent=1");
}
