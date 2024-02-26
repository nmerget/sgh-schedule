import { test, expect } from "@playwright/test";

test.describe("weekly", () => {
  test("home", async ({ page }) => {
    await page.goto("/sgh-schedule?matchDate=current&matchType=home");
    await expect(page).toHaveScreenshot("matches.png", { fullPage: true });
  });
  test("guest", async ({ page }) => {
    await page.goto("/sgh-schedule?matchDate=current&matchType=guest");
    await expect(page).toHaveScreenshot("matches.png", { fullPage: true });
  });
});
