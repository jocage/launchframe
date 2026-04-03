#!/usr/bin/env node

import { existsSync } from "node:fs";
import { access, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { emitKeypressEvents } from "node:readline";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import {
  buildModuleFileOverlays,
  buildModulePruneList,
  buildModuleTokenReplacements
} from "../lib/module-application.mjs";
import { resolveScaffoldPlan } from "../lib/module-resolver.mjs";

const TEMPLATE_OPTIONS = [
  {
    value: "blank",
    label: "Blank",
    description: "Minimal SaaS shell with auth, billing, email, and protected routes."
  },
  {
    value: "dashboard",
    label: "Dashboard",
    description: "Starter dashboard with app shell, overview UI, settings, and protected flows."
  }
];
const ARCHITECTURE_OPTIONS = [
  {
    value: "route-colocated",
    label: "Route Colocated",
    description: "Default App Router structure with route-local pieces near the route."
  },
  {
    value: "feature-first",
    label: "Feature First",
    description: "Domain-oriented structure for larger products."
  },
  {
    value: "monorepo-ready",
    label: "Monorepo Ready",
    description: "Future-friendly layout for shared packages and multiple apps."
  }
];
const PACKAGE_MANAGER_OPTIONS = [
  {
    value: "pnpm",
    label: "pnpm",
    description: "Recommended default. Fast and monorepo-friendly."
  },
  {
    value: "npm",
    label: "npm",
    description: "Mainstream fallback with the broadest default availability."
  },
  {
    value: "bun",
    label: "bun",
    description: "Experimental option. Fast, but ecosystem parity still needs validation."
  }
];
const DATABASE_DRIVER_OPTIONS = [
  {
    value: "pg",
    label: "pg",
    description: "Recommended default PostgreSQL driver."
  },
  {
    value: "postgres.js",
    label: "postgres.js",
    description: "Modern alternative driver, planned as follow-up support."
  }
];
const BILLING_OPTIONS = [
  {
    value: "stripe",
    label: "Stripe",
    description: "Recommended default billing provider."
  },
  {
    value: "polar",
    label: "Polar",
    description: "Alternative billing provider."
  },
  {
    value: "both",
    label: "Both",
    description: "Keep both provider entrypoints available."
  },
  {
    value: "none",
    label: "None",
    description: "Generate the app without a billing provider selection."
  }
];
const AUTH_OPTIONS = [
  {
    value: "email-password",
    label: "Email + Password",
    description: "Recommended default auth path."
  },
  {
    value: "email-password+github",
    label: "Email + Password + GitHub",
    description: "Useful default when you want a starter social provider later."
  }
];
const EMAIL_PROVIDER_OPTIONS = [
  {
    value: "resend",
    label: "Resend",
    description: "Recommended transactional email provider."
  },
  {
    value: "none",
    label: "None",
    description: "Keep the email layer scaffold but treat it as disabled."
  }
];
const DEPLOY_TARGET_OPTIONS = [
  {
    value: "vercel",
    label: "Vercel",
    description: "Recommended default for Next.js deployment."
  },
  {
    value: "docker",
    label: "Docker",
    description: "Use the starter as a self-hosted baseline."
  }
];
const SEED_OPTIONS = [
  {
    value: "yes",
    label: "Yes",
    description: "Keep demo seed data enabled."
  },
  {
    value: "no",
    label: "No",
    description: "Generate without expecting demo seed data usage."
  }
];
const TEXT_FILE_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".example",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);
const TEXT_FILE_NAMES = new Set(["Dockerfile", ".dockerignore"]);

async function main() {
  const args = process.argv.slice(2);
  const cliOptions = parseArgs(args);
  const prompts = readline.createInterface({ input, output });

  try {
    const rawProjectName =
      cliOptions.projectName ?? (await prompt(prompts, "Project name", "my-panda-app"));
    const projectName = normalizeProjectName(rawProjectName);
    const template =
      cliOptions.template ??
      (await promptSelect(prompts, "Template", TEMPLATE_OPTIONS, "blank"));
    const architecture =
      cliOptions.architecture ??
      (await promptSelect(
        prompts,
        "Architecture",
        ARCHITECTURE_OPTIONS,
        "route-colocated"
      ));
    const packageManager =
      cliOptions.packageManager ??
      (await promptSelect(
        prompts,
        "Package manager",
        PACKAGE_MANAGER_OPTIONS,
        "pnpm"
      ));
    const databaseDriver =
      cliOptions.databaseDriver ??
      (await promptSelect(
        prompts,
        "Postgres driver",
        DATABASE_DRIVER_OPTIONS,
        "pg"
      ));
    const billingProvider =
      cliOptions.billingProvider ??
      (await promptSelect(prompts, "Billing", BILLING_OPTIONS, "stripe"));
    const authMode =
      cliOptions.authMode ??
      (await promptSelect(prompts, "Auth", AUTH_OPTIONS, "email-password"));
    const emailProvider =
      cliOptions.emailProvider ??
      (await promptSelect(prompts, "Email provider", EMAIL_PROVIDER_OPTIONS, "resend"));
    const deployTarget =
      cliOptions.deployTarget ??
      (await promptSelect(prompts, "Deploy target", DEPLOY_TARGET_OPTIONS, "vercel"));
    const seedDemoData =
      cliOptions.seedDemoData ??
      (await promptSelect(prompts, "Seed demo data", SEED_OPTIONS, "yes"));

    const destination = path.resolve(process.cwd(), projectName);
    await ensureTargetDoesNotExist(destination);
    const isNestedInsidePnpmWorkspace =
      packageManager === "pnpm" && (await hasParentWorkspace(destination));

    if (rawProjectName !== projectName) {
      output.write(`\nUsing directory name: ${projectName}\n`);
    }

    output.write(`\nScaffolding ${projectName} from the ${template} template...\n`);

    const repoRoot = getRepoRoot();
    const scaffoldPlan = await resolveScaffoldPlan(repoRoot, {
      template,
      databaseDriver,
      authMode,
      billingProvider,
      emailProvider,
      deployTarget
    });
    const baseTemplateDir = path.resolve(repoRoot, "templates", scaffoldPlan.base);
    const presetTemplateDir = path.resolve(repoRoot, "templates", scaffoldPlan.template);
    const installCommand = getInstallCommand(packageManager, isNestedInsidePnpmWorkspace);
    const runPrefix = getRunPrefix(packageManager);
    const moduleTokenReplacements = await buildModuleTokenReplacements(repoRoot, scaffoldPlan);
    const moduleFileOverlays = await buildModuleFileOverlays(repoRoot, scaffoldPlan);
    await assembleTemplate(baseTemplateDir, presetTemplateDir, destination, scaffoldPlan.overrideFiles);
    await applyModuleFileOverlays(destination, moduleFileOverlays);
    await replaceTokensRecursively(destination, {
      __PROJECT_NAME__: projectName,
      __PACKAGE_MANAGER__: getPackageManagerSpec(packageManager),
      __PACKAGE_MANAGER_NAME__: packageManager,
      __INSTALL_COMMAND__: installCommand,
      __RUN_DEV_COMMAND__: getDevCommand(packageManager),
      __CHECK_COMMAND__: getCheckCommand(packageManager),
      __CI_CACHE__: getCiCache(packageManager),
      __CI_INSTALL_COMMAND__: getCiInstallCommand(packageManager),
      __CI_RUN_LINT__: `${runPrefix} lint`,
      __CI_RUN_TYPECHECK__: `${runPrefix} typecheck`,
      __CI_RUN_TEST__: `${runPrefix} test`,
      __CI_RUN_BUILD__: `${runPrefix} build`,
      __DEPLOY_TARGET__: deployTarget,
      __DOCKER_BASE_IMAGE__: getDockerBaseImage(packageManager),
      __DOCKER_SETUP__: getDockerSetup(packageManager),
      __DOCKER_INSTALL_COMMAND__: getDockerInstallCommand(packageManager),
      __DOCKER_BUILD_COMMAND__: getDockerBuildCommand(packageManager),
      __DOCKER_START_COMMAND__: getDockerStartCommand(packageManager),
      __SEED_DEMO_DATA__: seedDemoData,
      ...scaffoldPlan.tokenReplacements,
      ...moduleTokenReplacements
    });
    await pruneGeneratedFiles(destination, buildModulePruneList(scaffoldPlan));
    await writeStarterConfig(destination, {
      base: scaffoldPlan.base,
      preset: scaffoldPlan.preset,
      modules: scaffoldPlan.modules,
      template,
      architecture,
      packageManager,
      databaseDriver,
      billingProvider,
      authMode,
      emailProvider,
      deployTarget,
      seedDemoData
    });

    output.write("\nDone.\n");
    output.write(`\nNext steps:\n`);
    output.write(`  cd ${projectName}\n`);
    output.write(`  ${installCommand}\n`);
    output.write(`  ${getDevCommand(packageManager)}\n\n`);
    if (isNestedInsidePnpmWorkspace) {
      output.write(
        "Note: this project was created inside another pnpm workspace, so install uses --ignore-workspace.\n\n"
      );
    }
  } catch (error) {
    output.write(`\nError: ${formatError(error)}\n`);
    process.exitCode = 1;
  } finally {
    prompts.close();
  }
}

function parseArgs(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (!arg.startsWith("--") && !options.projectName) {
      options.projectName = arg;
      continue;
    }

    if (arg === "--template") {
      const nextValue = args[index + 1];
      if (nextValue && TEMPLATE_OPTIONS.some((option) => option.value === nextValue)) {
        options.template = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid template. Expected one of: ${TEMPLATE_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--package-manager") {
      const nextValue = args[index + 1];
      if (nextValue && PACKAGE_MANAGER_OPTIONS.some((option) => option.value === nextValue)) {
        options.packageManager = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid package manager. Expected one of: ${PACKAGE_MANAGER_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--architecture") {
      const nextValue = args[index + 1];
      if (nextValue && ARCHITECTURE_OPTIONS.some((option) => option.value === nextValue)) {
        options.architecture = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid architecture. Expected one of: ${ARCHITECTURE_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--database-driver") {
      const nextValue = args[index + 1];
      if (
        nextValue &&
        DATABASE_DRIVER_OPTIONS.some((option) => option.value === nextValue)
      ) {
        options.databaseDriver = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid database driver. Expected one of: ${DATABASE_DRIVER_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--billing") {
      const nextValue = args[index + 1];
      if (nextValue && BILLING_OPTIONS.some((option) => option.value === nextValue)) {
        options.billingProvider = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid billing provider. Expected one of: ${BILLING_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--auth") {
      const nextValue = args[index + 1];
      if (nextValue && AUTH_OPTIONS.some((option) => option.value === nextValue)) {
        options.authMode = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid auth mode. Expected one of: ${AUTH_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--email-provider") {
      const nextValue = args[index + 1];
      if (nextValue && EMAIL_PROVIDER_OPTIONS.some((option) => option.value === nextValue)) {
        options.emailProvider = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid email provider. Expected one of: ${EMAIL_PROVIDER_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--deploy-target") {
      const nextValue = args[index + 1];
      if (nextValue && DEPLOY_TARGET_OPTIONS.some((option) => option.value === nextValue)) {
        options.deployTarget = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid deploy target. Expected one of: ${DEPLOY_TARGET_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    if (arg === "--seed-demo-data") {
      const nextValue = args[index + 1];
      if (nextValue && SEED_OPTIONS.some((option) => option.value === nextValue)) {
        options.seedDemoData = nextValue;
        index += 1;
        continue;
      }

      throw new Error(
        `Invalid seed option. Expected one of: ${SEED_OPTIONS.map((option) => option.value).join(", ")}`
      );
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

async function prompt(prompts, label, fallback) {
  const answer = await prompts.question(`${label} (${fallback}): `);
  return answer.trim() || fallback;
}

async function promptSelect(prompts, label, options, fallback) {
  if (input.isTTY && output.isTTY) {
    return promptSelectWithArrows(label, options, fallback);
  }

  return promptSelectWithTextInput(prompts, label, options, fallback);
}

async function promptSelectWithTextInput(prompts, label, options, fallback) {
  output.write(`\n${label}\n`);

  for (const [index, option] of options.entries()) {
    output.write(`  ${index + 1}. ${option.label} (${option.value})\n`);
    output.write(`     ${option.description}\n`);
  }

  const fallbackIndex = options.findIndex((option) => option.value === fallback) + 1;
  const answer = await prompts.question(`Choose ${label.toLowerCase()} (${fallbackIndex}): `);
  const normalized = answer.trim();

  if (!normalized) {
    return fallback;
  }

  const numericIndex = Number(normalized);
  if (!Number.isNaN(numericIndex)) {
    const selected = options[numericIndex - 1];
    if (!selected) {
      throw new Error(`Invalid ${label.toLowerCase()} selection.`);
    }

    return selected.value;
  }

  const directMatch = options.find((option) => option.value === normalized);
  if (directMatch) {
    return directMatch.value;
  }

  throw new Error(`Invalid ${label.toLowerCase()} selection.`);
}

async function promptSelectWithArrows(label, options, fallback) {
  const fallbackIndex = Math.max(
    0,
    options.findIndex((option) => option.value === fallback)
  );
  let selectedIndex = fallbackIndex;

  emitKeypressEvents(input);
  input.setRawMode?.(true);

  const cleanup = () => {
    input.setRawMode?.(false);
    input.pause();
    input.removeListener("keypress", onKeypress);
  };

  const render = () => {
    output.write(`\x1b[2J\x1b[0f`);
    output.write(`${label}\n`);
    output.write("Use ↑/↓ to move, Enter to select.\n\n");

    for (const [index, option] of options.entries()) {
      const isSelected = index === selectedIndex;
      const marker = isSelected ? "❯" : " ";
      const line = `${marker} ${option.label} (${option.value})`;
      output.write(`${isSelected ? "\x1b[36m" : ""}${line}\x1b[0m\n`);
      output.write(`   ${option.description}\n`);
    }
  };

  const selection = await new Promise((resolve, reject) => {
    onKeypress = (_str, key) => {
      if (key?.name === "up") {
        selectedIndex = selectedIndex === 0 ? options.length - 1 : selectedIndex - 1;
        render();
        return;
      }

      if (key?.name === "down") {
        selectedIndex = selectedIndex === options.length - 1 ? 0 : selectedIndex + 1;
        render();
        return;
      }

      if (key?.name === "return") {
        output.write("\n");
        resolve(options[selectedIndex].value);
        return;
      }

      if (key?.ctrl && key.name === "c") {
        reject(new Error("Prompt canceled."));
      }
    };

    input.on("keypress", onKeypress);
    input.resume();
    render();
  });

  cleanup();
  return selection;
}

let onKeypress = null;

function slugifyProjectSegment(value) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!normalized) {
    throw new Error("Project name must contain at least one letter or number.");
  }

  return normalized;
}

function normalizeProjectName(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error("Project name must contain at least one letter or number.");
  }

  const normalizedPath = path.normalize(trimmed);
  const dirname = path.dirname(normalizedPath);
  const basename = path.basename(normalizedPath);
  const normalizedBase = slugifyProjectSegment(basename);

  if (dirname === "." || dirname === "") {
    return normalizedBase;
  }

  return path.join(dirname, normalizedBase);
}

function getInstallCommand(packageManager, isNestedInsidePnpmWorkspace = false) {
  if (packageManager === "npm") {
    return "npm install";
  }

  if (packageManager === "bun") {
    return "bun install";
  }

  if (isNestedInsidePnpmWorkspace) {
    return "pnpm install --ignore-workspace";
  }

  return "pnpm install";
}

function getDevCommand(packageManager) {
  if (packageManager === "npm") {
    return "npm run dev";
  }

  if (packageManager === "bun") {
    return "bun run dev";
  }

  return "pnpm dev";
}

function getRunPrefix(packageManager) {
  if (packageManager === "npm") {
    return "npm run";
  }

  if (packageManager === "bun") {
    return "bun run";
  }

  return "pnpm";
}

function getCheckCommand(packageManager) {
  const runPrefix = getRunPrefix(packageManager);
  return `${runPrefix} lint && ${runPrefix} typecheck && ${runPrefix} format:check`;
}

function getDockerBaseImage(packageManager) {
  if (packageManager === "bun") {
    return "oven/bun:1.2.22-alpine";
  }

  return "node:20-alpine";
}

function getDockerSetup(packageManager) {
  if (packageManager === "pnpm") {
    return "RUN corepack enable";
  }

  return "";
}

function getDockerInstallCommand(packageManager) {
  if (packageManager === "pnpm") {
    return "pnpm install --no-frozen-lockfile";
  }

  if (packageManager === "bun") {
    return "bun install";
  }

  return "npm install";
}

function getDockerBuildCommand(packageManager) {
  if (packageManager === "pnpm") {
    return "pnpm build";
  }

  if (packageManager === "bun") {
    return "bun run build";
  }

  return "npm run build";
}

function getDockerStartCommand(packageManager) {
  if (packageManager === "pnpm") {
    return "pnpm start";
  }

  if (packageManager === "bun") {
    return "bun run start";
  }

  return "npm run start";
}

function getPackageManagerSpec(packageManager) {
  if (packageManager === "npm") {
    return "npm@11";
  }

  if (packageManager === "bun") {
    return "bun@1";
  }

  return "pnpm@10.18.0";
}

function getCiCache(packageManager) {
  if (packageManager === "pnpm") {
    return "pnpm";
  }

  if (packageManager === "npm") {
    return "npm";
  }

  return "npm";
}

function getCiInstallCommand(packageManager) {
  if (packageManager === "npm") {
    return "npm ci";
  }

  if (packageManager === "bun") {
    return "bun install --frozen-lockfile";
  }

  return "pnpm install --frozen-lockfile";
}

async function writeStarterConfig(destination, selections) {
  await writeFile(
    path.join(destination, "launchframe.json"),
    `${JSON.stringify(
      {
        starter: "launchframe",
        version: 1,
        ...selections
      },
      null,
      2
    )}\n`
  );
}

async function hasParentWorkspace(destination) {
  let current = path.dirname(destination);

  while (true) {
    const workspaceFile = path.join(current, "pnpm-workspace.yaml");

    try {
      await access(workspaceFile);
      return true;
    } catch (error) {
      if (!error || error.code !== "ENOENT") {
        throw error;
      }
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return false;
    }

    current = parent;
  }
}

function getRepoRoot() {
  const packageRoot = path.resolve(import.meta.dirname, "..");

  if (hasScaffoldAssets(packageRoot)) {
    return packageRoot;
  }

  return path.resolve(import.meta.dirname, "..", "..", "..");
}

function hasScaffoldAssets(root) {
  return ["modules", "presets", "templates"].every((directory) =>
    existsSync(path.join(root, directory))
  );
}

async function ensureTargetDoesNotExist(destination) {
  try {
    await access(destination);
    throw new Error(`Target directory already exists: ${destination}`);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

async function copyTemplate(sourceDir, destinationDir, replacements) {
  await cp(sourceDir, destinationDir, { recursive: true });
  await replaceTokensRecursively(destinationDir, replacements);
}

async function assembleTemplate(baseDir, presetDir, destinationDir, overrideFiles) {
  await cp(baseDir, destinationDir, { recursive: true });

  for (const relativeFilePath of overrideFiles) {
    const sourcePath = path.join(presetDir, relativeFilePath);
    const destinationPath = path.join(destinationDir, relativeFilePath);

    await mkdir(path.dirname(destinationPath), { recursive: true });
    await cp(sourcePath, destinationPath);
  }
}

async function applyModuleFileOverlays(destinationDir, fileOverlays) {
  for (const fileOverlay of fileOverlays) {
    const destinationPath = path.join(destinationDir, fileOverlay.destination);
    await mkdir(path.dirname(destinationPath), { recursive: true });
    await cp(fileOverlay.source, destinationPath);
  }
}

async function replaceTokensRecursively(currentDir, replacements) {
  const entries = await readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const targetPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await replaceTokensRecursively(targetPath, replacements);
      continue;
    }

    if (!entry.isFile() || !shouldReplaceTokens(targetPath)) {
      continue;
    }

    let content = await readFile(targetPath, "utf8");

    for (const [token, value] of Object.entries(replacements)) {
      content = content.split(token).join(value);
    }

    await writeFile(targetPath, content);
  }
}

async function pruneGeneratedFiles(destinationDir, relativePaths) {
  for (const relativePath of relativePaths) {
    await rm(path.join(destinationDir, relativePath), {
      force: true
    });
  }
}

function shouldReplaceTokens(filePath) {
  return (
    TEXT_FILE_EXTENSIONS.has(path.extname(filePath)) ||
    TEXT_FILE_NAMES.has(path.basename(filePath))
  );
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}

await main();
