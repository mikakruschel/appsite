import { site } from "../../src/site.config.ts";
import { validateSiteConfig } from "./validator.ts";

try {
  validateSiteConfig(site);
} catch (caught) {
  const message = caught instanceof Error ? caught.message : String(caught);
  console.error(`ERROR theme: ${message}`);
  process.exitCode = 1;
}
