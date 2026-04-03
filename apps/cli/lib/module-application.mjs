import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJson(filePath) {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function loadModule(repoRoot, moduleName) {
  const modulePath = path.join(repoRoot, "modules", moduleName, "module.json");
  return readJson(modulePath);
}

function getBillingProviderFromDefinitions(moduleDefinitions) {
  const providers = new Set();

  for (const moduleDefinition of moduleDefinitions) {
    for (const provider of moduleDefinition.template?.billingProviders ?? []) {
      providers.add(provider);
    }
  }

  if (providers.has("stripe") && providers.has("polar")) {
    return "both";
  }

  if (providers.has("stripe")) {
    return "stripe";
  }

  if (providers.has("polar")) {
    return "polar";
  }

  return "none";
}

function getEmailProviderFromDefinitions(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.emailProvider) {
      return moduleDefinition.template.emailProvider;
    }
  }

  return "none";
}

function getPackageDependenciesFromDefinitions(moduleDefinitions) {
  const dependencyLines = [];

  for (const moduleDefinition of moduleDefinitions) {
    dependencyLines.push(...(moduleDefinition.template?.packageDependencies ?? []));
  }

  return dependencyLines.join("\n");
}

function getBillingImportsFromDefinitions(moduleDefinitions) {
  const lines = [];

  for (const moduleDefinition of moduleDefinitions) {
    lines.push(...(moduleDefinition.template?.billing?.imports ?? []));
  }

  return lines.join("\n");
}

function getBillingFactoriesFromDefinitions(moduleDefinitions) {
  const lines = [];

  for (const moduleDefinition of moduleDefinitions) {
    lines.push(...(moduleDefinition.template?.billing?.factories ?? []));
  }

  return lines.join("\n");
}

function getStripeWebhookRouteBody(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.stripeWebhookRouteBody) {
      return moduleDefinition.template.billing.stripeWebhookRouteBody;
    }
  }

  return "  return new Response(\"Stripe billing is not enabled for this project.\", { status: 404 });";
}

function getPolarWebhookRouteBody(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.polarWebhookRouteBody) {
      return moduleDefinition.template.billing.polarWebhookRouteBody;
    }
  }

  return "  return new Response(\"Polar billing is not enabled for this project.\", { status: 404 });";
}

function getStripeWebhookRouteImport(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.stripeWebhookRouteBody) {
      return 'import { getBillingProvider } from "@/lib/billing";';
    }
  }

  return "";
}

function getStripeWebhookRouteSignature(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.stripeWebhookRouteBody) {
      return "request: Request";
    }
  }

  return "_request: Request";
}

function getPolarWebhookRouteImport(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.polarWebhookRouteBody) {
      return 'import { getBillingProvider } from "@/lib/billing";';
    }
  }

  return "";
}

function getPolarWebhookRouteSignature(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.billing?.polarWebhookRouteBody) {
      return "request: Request";
    }
  }

  return "_request: Request";
}

function getEmailImportsFromDefinitions(moduleDefinitions) {
  const lines = [];

  for (const moduleDefinition of moduleDefinitions) {
    lines.push(...(moduleDefinition.template?.email?.imports ?? []));
  }

  return lines.join("\n");
}

function getEmailEnvImport(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.email?.setup) {
      return 'import { env } from "@/lib/env";';
    }
  }

  return "";
}

function getEmailSetupFromDefinitions(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.email?.setup) {
      return moduleDefinition.template.email.setup;
    }
  }

  return "";
}

function getEmailFromAddressHelper(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.email?.setup) {
      return `function getFromAddress() {
  if (!env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is required for email sending.");
  }

  return env.EMAIL_FROM;
}`;
    }
  }

  return "";
}

function getEmailSendImplementation(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.email?.sendImplementation) {
      return moduleDefinition.template.email.sendImplementation;
    }
  }

  return '  return { skipped: true as const, provider: "none" as const };';
}

function getEmailSendSignature(moduleDefinitions) {
  for (const moduleDefinition of moduleDefinitions) {
    if (moduleDefinition.template?.email?.sendImplementation) {
      return "input";
    }
  }

  return "_input";
}

export async function buildModuleTokenReplacements(repoRoot, scaffoldPlan) {
  const replacements = {};
  const moduleDefinitions = [];

  for (const moduleName of scaffoldPlan.modules) {
    const moduleDefinition = await loadModule(repoRoot, moduleName);
    moduleDefinitions.push(moduleDefinition);

    for (const [token, value] of Object.entries(
      moduleDefinition.template?.tokenReplacements ?? {}
    )) {
      replacements[token] = value;
    }
  }

  replacements.__BILLING_PROVIDER__ = getBillingProviderFromDefinitions(moduleDefinitions);
  replacements.__EMAIL_PROVIDER__ = getEmailProviderFromDefinitions(moduleDefinitions);
  replacements.__PROVIDER_PACKAGE_DEPENDENCIES__ =
    getPackageDependenciesFromDefinitions(moduleDefinitions);
  replacements.__BILLING_PROVIDER_IMPORTS__ = getBillingImportsFromDefinitions(moduleDefinitions);
  replacements.__BILLING_PROVIDER_FACTORIES__ =
    getBillingFactoriesFromDefinitions(moduleDefinitions);
  replacements.__STRIPE_WEBHOOK_ROUTE_IMPORT__ =
    getStripeWebhookRouteImport(moduleDefinitions);
  replacements.__STRIPE_WEBHOOK_ROUTE_SIGNATURE__ =
    getStripeWebhookRouteSignature(moduleDefinitions);
  replacements.__STRIPE_WEBHOOK_ROUTE_BODY__ =
    getStripeWebhookRouteBody(moduleDefinitions);
  replacements.__POLAR_WEBHOOK_ROUTE_IMPORT__ =
    getPolarWebhookRouteImport(moduleDefinitions);
  replacements.__POLAR_WEBHOOK_ROUTE_SIGNATURE__ =
    getPolarWebhookRouteSignature(moduleDefinitions);
  replacements.__POLAR_WEBHOOK_ROUTE_BODY__ = getPolarWebhookRouteBody(moduleDefinitions);
  replacements.__EMAIL_PROVIDER_IMPORTS__ = getEmailImportsFromDefinitions(moduleDefinitions);
  replacements.__EMAIL_ENV_IMPORT__ = getEmailEnvImport(moduleDefinitions);
  replacements.__EMAIL_PROVIDER_SETUP__ = getEmailSetupFromDefinitions(moduleDefinitions);
  replacements.__EMAIL_FROM_ADDRESS_HELPER__ =
    getEmailFromAddressHelper(moduleDefinitions);
  replacements.__EMAIL_SEND_SIGNATURE__ = getEmailSendSignature(moduleDefinitions);
  replacements.__EMAIL_SEND_IMPLEMENTATION__ =
    getEmailSendImplementation(moduleDefinitions);

  return replacements;
}

export async function buildModuleFileOverlays(repoRoot, scaffoldPlan) {
  const overlays = [];

  for (const moduleName of scaffoldPlan.modules) {
    const moduleDefinition = await loadModule(repoRoot, moduleName);

    for (const relativeFilePath of moduleDefinition.template?.copyFiles ?? []) {
      overlays.push({
        source: path.join(repoRoot, "modules", moduleName, "files", relativeFilePath),
        destination: relativeFilePath
      });
    }
  }

  return overlays;
}

export function buildModulePruneList(scaffoldPlan) {
  const filesToRemove = [];
  const moduleSet = new Set(scaffoldPlan.modules);

  if (!moduleSet.has("billing-stripe")) {
    filesToRemove.push("src/lib/billing/providers/stripe.ts");
    filesToRemove.push("src/app/api/webhooks/stripe/route.ts");
  }

  if (!moduleSet.has("billing-polar")) {
    filesToRemove.push("src/lib/billing/providers/polar.ts");
    filesToRemove.push("src/app/api/webhooks/polar/route.ts");
  }

  return filesToRemove;
}
