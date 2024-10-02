import { test, expect } from "@playwright/test";

const types = ["home", "guest"];
const days = ["sa", "so"];
const maxSites = [1, 2, 3];

test.describe("weekly", () => {
  types.forEach((type) => {
    days.forEach((day) => {
      maxSites.forEach((site) => {
        test(`${type} ${day} ${site}`, async ({ page }) => {
          await page.goto(
            `/sgh-schedule?matchDate=current&matchType=${type}&matchDay=${day}&site=${site}`,
          );
          if ((await page.locator("section").count()) > 0) {
            await expect(page).toHaveScreenshot("matches.png", {
              fullPage: true,
            });
          }
        });
      });
    });
  });
});
