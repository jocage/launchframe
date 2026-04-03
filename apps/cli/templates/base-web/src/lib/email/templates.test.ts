import { describe, expect, it } from "vitest";

import { __EMAIL_TEMPLATE_TEST_IMPORT__ } from "@/lib/email/templates";

describe("__EMAIL_TEMPLATE_TEST_SUITE__", () => {
  it("__EMAIL_TEMPLATE_TEST_CASE__", () => {
    const template = __EMAIL_TEMPLATE_TEST_FACTORY__;

    expect(template.subject).toContain("__EMAIL_TEMPLATE_EXPECT_SUBJECT__");
    expect(template.text).toContain("__EMAIL_TEMPLATE_EXPECT_TEXT__");
  });
});
