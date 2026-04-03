import { db } from "@/db";
import { projects } from "@/db/schema";

const shouldSeedDemoData = ["yes"].includes("__SEED_DEMO_DATA__");

async function main() {
  if (!shouldSeedDemoData) {
    console.log("Demo seed data disabled.");
    return;
  }

  await db
    .insert(projects)
    .values({
      id: "project-demo",
      name: "Demo Project",
      slug: "demo-project"
    })
    .onConflictDoNothing();

  console.log("Demo application data seed complete.");
  console.log("Note: auth users are not created by db:seed. Sign up through Better Auth flows.");
}

main().catch((error) => {
  console.error("Database seed failed.");
  console.error(
    "Make sure PostgreSQL is running, DATABASE_URL is set, and schema migrations have been applied first."
  );
  console.error(error);
  process.exit(1);
});
