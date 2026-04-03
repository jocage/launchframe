import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function SettingsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <DashboardShell user={session.user}>
      {children}
    </DashboardShell>
  );
}
