import { describe, expect, it } from "vitest";

import { createBillingUpdatePlaceholderTemplate } from "@/lib/email/templates";

describe("createBillingUpdatePlaceholderTemplate", () => {
  it("mentions the billing provider", () => {
    const template = createBillingUpdatePlaceholderTemplate({
      appName: "Launchframe",
      provider: "stripe"
    });

    expect(template.subject).toContain("billing");
    expect(template.text).toContain("stripe");
  });
});
