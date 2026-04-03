import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";
import { env } from "./env";

export async function getSession() {
  try {
    return await auth.api.getSession({
      headers: await headers()
    });
  } catch (error) {
    if (env.NODE_ENV !== "production") {
      console.warn("Better Auth session lookup failed. Falling back to anonymous mode.", error);
      return null;
    }

    throw error;
  }
}
