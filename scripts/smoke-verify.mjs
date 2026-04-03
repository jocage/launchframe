import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

import {
  PROFILES,
  getInstallCommand,
  getVerificationCommands
} from "./smoke-profiles.mjs";

async function runCommand(command, cwd) {
  await new Promise((resolve, reject) => {
    const child = spawn(command[0], command.slice(1), {
      cwd,
      stdio: "inherit"
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `Command failed with exit code ${code ?? "unknown"}: ${command.join(" ")}`
        )
      );
    });
    child.on("error", reject);
  });
}

async function main() {
  const profileName = process.argv[2];
  const profile = profileName ? PROFILES[profileName] : null;

  if (!profile) {
    const available = Object.keys(PROFILES).join(", ");
    throw new Error(`Unknown verify profile. Expected one of: ${available}`);
  }

  const repoRoot = path.resolve(import.meta.dirname, "..");
  const generatorPath = path.resolve(repoRoot, "scripts/smoke-generate.mjs");
  const appDir = path.resolve(repoRoot, profile.outputDir);

  await runCommand(["node", generatorPath, profileName], repoRoot);
  await runCommand(getInstallCommand(profile.packageManager), appDir);

  for (const command of getVerificationCommands(profile.packageManager)) {
    await runCommand(command, appDir);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
