import "server-only";

import { drizzle } from "__DRIZZLE_DRIVER_IMPORT__";
__DATABASE_CLIENT_IMPORT__

import { env } from "@/lib/env";

__DATABASE_GLOBAL_BLOCK__

const client = __DATABASE_CLIENT_EXPRESSION__;

if (env.NODE_ENV !== "production") {
__DATABASE_DEV_CACHE__
}

export const db = __DATABASE_DRIZZLE_EXPRESSION__;
