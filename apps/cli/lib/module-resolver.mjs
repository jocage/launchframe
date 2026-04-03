import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJson(filePath) {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function loadPreset(repoRoot, presetName) {
  const presetPath = path.join(repoRoot, "presets", `${presetName}.json`);
  return readJson(presetPath);
}

async function loadModule(repoRoot, moduleName) {
  const modulePath = path.join(repoRoot, "modules", moduleName, "module.json");
  return readJson(modulePath);
}

function mapDatabaseModule(databaseDriver) {
  return databaseDriver === "postgres.js" ? "db-postgresjs" : "db-pg";
}

function mapBillingModules(billingProvider) {
  if (billingProvider === "stripe") {
    return ["billing-stripe"];
  }

  if (billingProvider === "polar") {
    return ["billing-polar"];
  }

  if (billingProvider === "both") {
    return ["billing-stripe", "billing-polar"];
  }

  return [];
}

function mapEmailModules(emailProvider) {
  if (emailProvider === "resend") {
    return ["email-resend"];
  }

  return [];
}

function mapAuthModules(authMode) {
  if (authMode === "email-password+github") {
    return ["auth-github"];
  }

  return [];
}

function mapDeployModules(deployTarget) {
  if (deployTarget === "docker") {
    return ["deploy-docker"];
  }

  return [];
}

function mapAiDxModules(aiTools) {
  if (!aiTools || aiTools.length === 0) {
    return [];
  }

  const modules = ["ai-dx"];
  const toolToModule = {
    cursor: "ai-dx-cursor",
    claude: "ai-dx-claude",
    gemini: "ai-dx-gemini"
  };

  for (const tool of aiTools) {
    if (toolToModule[tool]) {
      modules.push(toolToModule[tool]);
    }
  }

  return modules;
}

async function collectModuleGraph(repoRoot, initialModuleNames) {
  const visited = new Set();
  const modules = new Map();

  async function visit(moduleName) {
    if (visited.has(moduleName)) {
      return;
    }

    visited.add(moduleName);
    const moduleDefinition = await loadModule(repoRoot, moduleName);
    modules.set(moduleName, moduleDefinition);

    for (const dependency of moduleDefinition.dependsOn ?? []) {
      await visit(dependency);
    }
  }

  for (const moduleName of initialModuleNames) {
    await visit(moduleName);
  }

  return modules;
}

function validateConflicts(modules) {
  for (const moduleDefinition of modules.values()) {
    for (const conflict of moduleDefinition.conflictsWith ?? []) {
      if (modules.has(conflict)) {
        throw new Error(
          `Module conflict: ${moduleDefinition.name} cannot be combined with ${conflict}.`
        );
      }
    }
  }
}

function sortModules(modules) {
  const sorted = [];
  const visited = new Set();

  function visit(moduleName) {
    if (visited.has(moduleName)) {
      return;
    }

    visited.add(moduleName);
    const moduleDefinition = modules.get(moduleName);

    for (const dependency of moduleDefinition.dependsOn ?? []) {
      visit(dependency);
    }

    sorted.push(moduleName);
  }

  for (const moduleName of modules.keys()) {
    visit(moduleName);
  }

  return sorted;
}

export async function resolveScaffoldPlan(repoRoot, options) {
  const preset = await loadPreset(repoRoot, options.template);
  const initialModuleNames = [
    ...(preset.modules ?? []),
    mapDatabaseModule(options.databaseDriver),
    ...mapAuthModules(options.authMode),
    ...mapBillingModules(options.billingProvider),
    ...mapEmailModules(options.emailProvider),
    ...mapDeployModules(options.deployTarget),
    ...mapAiDxModules(options.aiTools)
  ];
  const uniqueModuleNames = [...new Set(initialModuleNames)];
  const modules = await collectModuleGraph(repoRoot, uniqueModuleNames);

  validateConflicts(modules);

  return {
    base: preset.base,
    preset: preset.name,
    template: preset.template,
    overrideFiles: preset.overrideFiles ?? [],
    tokenReplacements: preset.tokenReplacements ?? {},
    modules: sortModules(modules)
  };
}
