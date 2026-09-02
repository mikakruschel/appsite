import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { fetchAppStoreDataOnly, parseAppStoreCli } from "./data-only.ts";

const { input, countryOption, outPath } = parseAppStoreCli(
  process.argv.slice(2),
  `Usage: pnpm fetch:appstore-metadata <app-id-or-url> [--country <code>] [--out <path>]

Fetch structured App Store metadata for one storefront.

Arguments:
  <app-id-or-url>  Numeric App Store ID or apps.apple.com app URL

Options:
  --country <code> Storefront code; uses the URL country or us by default
  --out <path>     Write JSON to a file instead of stdout
  -h, --help       Show this help message

Example:
  pnpm fetch:appstore-metadata 123456789 --country de --out app-input/app.json`,
);

const { data, product, dataOnlyURL, resolvedAppID, country, storefrontHeader } =
  await fetchAppStoreDataOnly({ input, countryOption, outPath });

const rawIconBackgroundColor = product.templatizedArtwork?.bgColor;
const iconBackgroundColor =
  typeof rawIconBackgroundColor === "string" &&
  /^[0-9a-f]{6}$/i.test(rawIconBackgroundColor)
    ? `#${rawIconBackgroundColor.toLowerCase()}`
    : undefined;

const artworkURL = (
  artwork: any,
  width = 512,
  height = width,
): string | undefined => {
  if (typeof artwork?.url !== "string") return undefined;

  return artwork.url
    .replaceAll("{w}", String(width))
    .replaceAll("{h}", String(height))
    .replaceAll("{c}", "bb")
    .replaceAll("{f}", "webp");
};

const iconVariantForDeviceFamilies = (
  deviceFamilies: string[],
): "ia" | "at" | "bb" | "ic" | undefined => {
  const families = new Set(
    deviceFamilies.map((family) => family.toLowerCase()),
  );

  if (families.has("iphone") || families.has("ipad")) return "ia";
  if (families.has("mac")) return "at";
  if (families.has("appletv") || families.has("tv") || families.has("tvos")) {
    return "bb";
  }
  if (
    families.has("watch") ||
    families.has("watchos") ||
    families.has("vision") ||
    families.has("visionos")
  ) {
    return "ic";
  }

  return undefined;
};

const appIconURL = (
  artwork: any,
  deviceFamilies: string[],
): string | undefined => {
  const url = artworkURL(artwork);
  const variant = iconVariantForDeviceFamilies(deviceFamilies);
  if (!url || !variant) return url;

  return url
    .replace(/w\.(webp|png|jpg)$/, `${variant}-75.webp`)
    .replace(/bb-?\d*\.(webp|png|jpg)$/, `${variant}-75.webp`);
};

const screenshots = Object.entries(product.screenshotsByType ?? {}).reduce(
  (grouped, [type, entries]) => {
    const normalizedType = type.toLowerCase();
    const destination = normalizedType.startsWith("ipad")
      ? grouped.ipad
      : normalizedType.includes("tv")
        ? grouped.tv
        : normalizedType.startsWith("iphone") ||
            normalizedType.startsWith("ipod")
          ? grouped.iphone
          : undefined;

    if (!destination || !Array.isArray(entries)) return grouped;

    for (const entry of entries) {
      const url = artworkURL(entry, entry?.width, entry?.height);
      if (url) destination.push(url);
    }

    return grouped;
  },
  { iphone: [] as string[], ipad: [] as string[], tv: [] as string[] },
);

const offer = product.offers?.[0];
const versionHistory: any[] = data.pageData?.versionHistory ?? [];
const latestVersion = versionHistory[0];
const softwareInfo = product.softwareInfo ?? {};
const deviceFamilies: string[] = product.deviceFamilies ?? [];
const formattedPrice =
  offer?.type === "get" && Number(offer?.price) === 0
    ? "Free"
    : offer?.priceFormatted;
const languages =
  typeof softwareInfo.languagesDisplayString === "string"
    ? softwareInfo.languagesDisplayString
        .split(",")
        .map((language: string) => language.trim())
        .filter(Boolean)
    : [];

const mapped = {
  source: {
    requested: input,
    dataOnlyURL: dataOnlyURL.toString(),
    storefrontHeader,
    country,
    retrievedAt: new Date().toISOString(),
    coverage:
      "Structured App Store dataOnly metadata for one storefront. Ratings and customer reviews are intentionally excluded; verify missing terms, platform-specific screenshots, and historical fields separately.",
  },
  appID: Number(product.id ?? resolvedAppID),
  bundleID: product.bundleId,
  developer: product.artistName,
  developerID: product.artistId,
  developerUrl: product.artistUrl,
  sellerName: softwareInfo.seller,
  deviceFamilies,
  description: product.description?.standard ?? product.description,
  subtitle: product.subtitle,
  formattedPrice,
  price: offer?.price,
  currency: offer?.currencyCode,
  hasInAppPurchases:
    product.hasInAppPurchases ?? softwareInfo.hasInAppPurchases ?? false,
  icon: appIconURL(product.iconArtwork ?? product.artwork, deviceFamilies),
  iconBackgroundColor,
  screenshots,
  languages,
  name: product.name,
  released: product.releaseDate,
  updated: latestVersion?.releaseDate,
  minimumOSVersion: product.minimumOSVersion,
  version: offer?.version?.display ?? latestVersion?.versionString,
  releaseNotes: latestVersion?.releaseNotes,
  categories: product.genreNames ?? [],
  primaryCategory: product.genreNames?.[0],
  contentRating: data.pageData?.["rating-and-advisories"]?.["rating-text"],
  url: product.url,
  supportUrl: softwareInfo.supportUrl,
  privacyPolicyUrl: softwareInfo.privacyPolicyUrl,
  websiteUrl: softwareInfo.websiteUrl,
};

const output = `${JSON.stringify(mapped, null, 2)}\n`;

if (outPath) {
  const destination = resolve(outPath);
  await mkdir(dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp-${process.pid}`;
  await writeFile(temporary, output, "utf8");
  await rename(temporary, destination);
  console.error(`Wrote App Store metadata to ${destination}`);
} else {
  process.stdout.write(output);
}
