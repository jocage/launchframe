import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  BETTER_AUTH_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BILLING_PROVIDER: z.enum(["stripe", "polar", "both", "none"]).default("stripe"),
  EMAIL_PROVIDER: z.enum(["resend", "none"]).default("resend"),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  STRIPE_PRICE_ID: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  POLAR_ACCESS_TOKEN: z.string().min(1).optional(),
  POLAR_ORGANIZATION_ID: z.string().min(1).optional(),
  POLAR_PRODUCT_ID: z.string().min(1).optional(),
  POLAR_SERVER: z.enum(["production", "sandbox"]).default("sandbox"),
  POLAR_WEBHOOK_SECRET: z.string().min(1).optional()
});

type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;
const isBuildRuntime =
  process.env.npm_lifecycle_event === "build" ||
  process.env.NEXT_PHASE === "phase-production-build";

function readRequiredValue(name: string, fallback: string) {
  const value = process.env[name];

  if (value) {
    return value;
  }

  if (isBuildRuntime) {
    return fallback;
  }

  return value;
}

function parseEnv(): Env {
  return envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: readRequiredValue("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    BETTER_AUTH_URL: readRequiredValue("BETTER_AUTH_URL", "http://localhost:3000"),
    DATABASE_URL: readRequiredValue(
      "DATABASE_URL",
      "postgresql://postgres:postgres@localhost:5432/launchframe"
    ),
    BETTER_AUTH_SECRET: readRequiredValue("BETTER_AUTH_SECRET", "build-placeholder-secret"),
    BILLING_PROVIDER: process.env.BILLING_PROVIDER,
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID,
    POLAR_PRODUCT_ID: process.env.POLAR_PRODUCT_ID,
    POLAR_SERVER: process.env.POLAR_SERVER,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET
  });
}

export function getEnv(): Env {
  cachedEnv ??= parseEnv();
  return cachedEnv;
}

export const env = new Proxy({} as Env, {
  get(_target, property) {
    return getEnv()[property as keyof Env];
  }
});
