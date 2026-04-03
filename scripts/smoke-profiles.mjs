export const PROFILES = {
  blank: {
    outputDir: ".tmp/generated/blank-smoke",
    packageManager: "pnpm",
    args: [
      "--template",
      "blank",
      "--architecture",
      "route-colocated",
      "--package-manager",
      "pnpm",
      "--database-driver",
      "pg",
      "--billing",
      "stripe",
      "--auth",
      "email-password",
      "--email-provider",
      "resend",
      "--deploy-target",
      "vercel",
      "--seed-demo-data",
      "no",
      "--ai-tools",
      "all"
    ]
  },
  dashboard: {
    outputDir: ".tmp/generated/dashboard-smoke",
    packageManager: "pnpm",
    args: [
      "--template",
      "dashboard",
      "--architecture",
      "route-colocated",
      "--package-manager",
      "pnpm",
      "--database-driver",
      "pg",
      "--billing",
      "stripe",
      "--auth",
      "email-password+github",
      "--email-provider",
      "resend",
      "--deploy-target",
      "vercel",
      "--seed-demo-data",
      "yes",
      "--ai-tools",
      "all"
    ]
  },
  postgresjs: {
    outputDir: ".tmp/generated/postgresjs-smoke",
    packageManager: "npm",
    args: [
      "--template",
      "blank",
      "--architecture",
      "route-colocated",
      "--package-manager",
      "npm",
      "--database-driver",
      "postgres.js",
      "--billing",
      "none",
      "--auth",
      "email-password",
      "--email-provider",
      "none",
      "--deploy-target",
      "vercel",
      "--seed-demo-data",
      "no",
      "--ai-tools",
      "all"
    ]
  }
};

export function getInstallCommand(packageManager) {
  if (packageManager === "npm") {
    return ["npm", "install"];
  }

  if (packageManager === "bun") {
    return ["bun", "install"];
  }

  return ["pnpm", "install", "--ignore-workspace"];
}

export function getVerificationCommands(packageManager) {
  if (packageManager === "npm") {
    return [
      ["npm", "run", "lint"],
      ["npm", "run", "typecheck"],
      ["npm", "run", "test"],
      ["npm", "run", "build"]
    ];
  }

  if (packageManager === "bun") {
    return [
      ["bun", "run", "lint"],
      ["bun", "run", "typecheck"],
      ["bun", "run", "test"],
      ["bun", "run", "build"]
    ];
  }

  return [
    ["pnpm", "lint"],
    ["pnpm", "typecheck"],
    ["pnpm", "test"],
    ["pnpm", "build"]
  ];
}
