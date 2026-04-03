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

  console.log("Database seed complete.");
}

main().catch((error) => {
  console.error("Database seed failed.");
  console.error(error);
  process.exit(1);
});
