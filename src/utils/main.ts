import { PlaywrightCrawler } from "crawlee";
import { writeFileSync } from "node:fs";
import { MatchGroupType } from "../data";
import { cleanTeamName } from "./index.ts";

const crawler = new PlaywrightCrawler({
  launchContext: {
    launchOptions: {
      headless: true,
    },
  },
  requestHandler: async ({ page }) => {
    const pageLoaded = await page.getByText("SG Hainhausen").all();
    if (pageLoaded.length > 0) {
      const tables = await page.locator(".result-set").all();
      for (const table of tables) {
        const tableRows = await table.locator("tr:has(td)").all();
        const groups: MatchGroupType[] = [];

        for (const row of tableRows) {
          const day = await row.locator("td:nth-child(1)").textContent();
          const date = await row.locator("td:nth-child(2)").textContent();
          const time = await row.locator("td:nth-child(3)").textContent();
          const building = await row.locator("td:nth-child(4)").textContent();
          const number = await row.locator("td:nth-child(5)").textContent();
          const league = await row.locator("td:nth-child(6)").textContent();
          const home = await row.locator("td:nth-child(7)").textContent();
          const guest = await row.locator("td:nth-child(8)").textContent();

          const trimmedDay = day?.trim();
          const trimmedDate = date?.trim();

          if (trimmedDay?.length !== 0 && trimmedDate?.length !== 0) {
            groups.push({
              day: trimmedDay || "",
              date: trimmedDate || "",
              matches: [],
            });
          }

          if (groups.length > 0) {
            groups.at(-1)?.matches.push({
              time: time?.replace("v", "").trim().substring(0, 5),
              building: building?.trim(),
              number: number?.trim(),
              league: league?.trim(),
              home: cleanTeamName(home?.trim()),
              guest: cleanTeamName(guest?.trim()),
              isHomeMatch: home?.toLowerCase().includes("hainhausen"),
            });
          }
        }
        writeFileSync("./src/data/live.json", JSON.stringify(groups));
      }
    }
  },
});

// Start the crawler and wait for it to finish
await crawler.run([
  "https://hhv-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBDE.woa/wa/clubInfoDisplay?club=69917",
]);
