import Link from "next/link";
__DASHBOARD_REDIRECT_IMPORT__
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getSession } from "@/lib/auth-session";

__DASHBOARD_PAGE_PRELUDE__

export default async function DashboardPage() {
  const session = await getSession();

__DASHBOARD_SESSION_SETUP__
__DASHBOARD_AUTH_GUARD__

  return __DASHBOARD_PAGE_CONTENT__;
}
