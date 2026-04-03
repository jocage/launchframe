import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { PROFILES } from "./smoke-profiles.mjs";

async function main() {
  const profileName = process.argv[2];
  const profile = profileName ? PROFILES[profileName] : null;

  if (!profile) {
    const available = Object.keys(PROFILES).join(", ");
    throw new Error(`Unknown smoke profile. Expected one of: ${available}`);
  }

  const repoRoot = path.resolve(import.meta.dirname, "..");
  const destination = path.resolve(repoRoot, profile.outputDir);
  const destinationParent = path.dirname(destination);
  const destinationName = path.basename(destination);

  await mkdir(destinationParent, { recursive: true });
  await rm(destination, { recursive: true, force: true });

  const cliPath = path.resolve(repoRoot, "apps/cli/bin/create-launchframe.mjs");
  const child = spawn("node", [cliPath, destinationName, ...profile.args], {
    cwd: destinationParent,
    stdio: "inherit"
  });

  await new Promise((resolve, reject) => {
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Smoke generation failed with exit code ${code ?? "unknown"}.`));
    });
    child.on("error", reject);
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
