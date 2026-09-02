import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { fail, parseAppStoreCli, resolveAppStoreAppID } from "./data-only.ts";
import { collectAppStoreSocialProof } from "./reviews-data.ts";

const { input, countryOption, outPath } = parseAppStoreCli(
  process.argv.slice(2),
  `Usage: pnpm fetch:appstore-reviews <app-id-or-url> [--country <code>] [--out <path>]

Fetch storefront ratings and recent customer reviews. Without --country,
queries all supported storefronts and calculates a count-weighted aggregate;
it is not an official Apple worldwide metric.

Arguments:
  <app-id-or-url>  Numeric App Store ID or apps.apple.com app URL

Options:
  --country <code> Limit collection to one storefront
  --out <path>     Write JSON to a file instead of stdout
  -h, --help       Show this help message

Example:
  pnpm fetch:appstore-reviews 123456789 --country de --out app-input/reviews.json`,
);
const { resolvedAppID } = resolveAppStoreAppID(input);

const collected = await collectAppStoreSocialProof({
  appID: resolvedAppID,
  country: countryOption,
}).catch((error) =>
  fail(`Failed to collect App Store ratings and reviews: ${String(error)}`),
);

if (collected.requests.succeeded === 0) {
  fail(
    `Failed to reach App Store ratings and review services (${collected.requests.failed} failed requests)`,
  );
}

const output = `${JSON.stringify(
  {
    source: {
      requested: input,
      appID: resolvedAppID,
      retrievedAt: new Date().toISOString(),
      countries:
        countryOption === undefined
          ? "all-supported-storefronts"
          : collected.countries,
      storefrontsQueried: collected.countries.length,
      ratingsEndpoint: "https://itunes.apple.com/lookup",
      reviewsEndpoint:
        "https://itunes.apple.com/{country}/rss/customerreviews/id={appID}/sortBy=mostRecent/json",
      coverage:
        "Public storefront-local rating aggregates and the recent customer-review RSS feed. Review feeds are bounded by Apple and are not complete review history.",
      requests: collected.requests,
    },
    appID: Number(resolvedAppID),
    ratings: collected.ratings,
    reviews: collected.reviews,
    failures: collected.failures,
  },
  null,
  2,
)}\n`;

if (outPath) {
  const destination = resolve(outPath);
  await mkdir(dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp-${process.pid}`;
  await writeFile(temporary, output, "utf8");
  await rename(temporary, destination);
  console.error(
    `Wrote App Store ratings and reviews to ${destination} (${collected.reviews.count} reviews; ${collected.failures.length} failed requests)`,
  );
} else {
  process.stdout.write(output);
}
