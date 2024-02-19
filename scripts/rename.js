import { Command } from "commander";
import { replaceInFileSync } from "replace-in-file";

const program = new Command();
program.name("rename").description("CLI to rename default project name");

program
  .option("-n, --name <name>", "New custom full name")
  .option("-sn, --short-name <shortName>", "New custom short name")
  .action(({ name, shortName }) => {
    const shortNameLowercase = shortName.toLowerCase();
    replaceInFileSync({
      files: ["manifest.ts", "index.html", "tests/example.spec.ts"],
      from: "React in GitHub template",
      to: name,
    });
    replaceInFileSync({
      files: ["manifest.ts"],
      from: "riGHt",
      to: shortNameLowercase,
    });
    replaceInFileSync({
      files: [
        "vite.config.ts",
        "playwright.config.ts",
        "package.json",
        "manifest.ts",
      ],
      from: "right",
      to: shortNameLowercase,
    });
  });

program.parse();
