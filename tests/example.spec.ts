import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SGH Schedule/);
});

test("has screenshot", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("all-matches.png", { fullPage: true });
});
