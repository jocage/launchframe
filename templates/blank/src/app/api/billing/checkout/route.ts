import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";
import { getBillingProvider, getBillingProviderName } from "@/lib/billing";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const formData = await request.formData();
  const selected = String(formData.get("provider") ?? "");
  const providerName = getBillingProviderName(selected);
  const provider = getBillingProvider(providerName);
  const checkout = await provider.createCheckoutSession({
    userId: session.user.id,
    customerEmail: session.user.email,
    successUrl: `${env.NEXT_PUBLIC_APP_URL}/billing?success=1&provider=${providerName}`,
    cancelUrl: `${env.NEXT_PUBLIC_APP_URL}/billing?canceled=1&provider=${providerName}`
  });

  redirect(checkout.url);
}
