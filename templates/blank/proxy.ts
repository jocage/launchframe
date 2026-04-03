import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (
    !sessionCookie &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/billing") ||
      pathname.startsWith("/email"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionCookie && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/billing/:path*", "/email/:path*", "/sign-in", "/sign-up"]
};
