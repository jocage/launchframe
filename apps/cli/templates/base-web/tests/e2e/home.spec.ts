import { expect, test } from "@playwright/test";

test("__HOME_E2E_TEST_NAME__", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /__HOME_E2E_HEADING__/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /__HOME_E2E_LINK__/i })).toBeVisible();
});
