import { devices, PlaywrightTestConfig } from "@playwright/test";
import config from "./playwright.config";

const weeklyConfig: PlaywrightTestConfig = {
  ...config,
  snapshotPathTemplate: "{snapshotDir}/{testName}{ext}",
  snapshotDir: "./weekly/__snapshots__",
  testDir: "./weekly",
  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"], viewport: { width: 512, height: 512 } },
    },
  ],
};

export default weeklyConfig;
