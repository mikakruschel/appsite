import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { fetchAppStoreDataOnly, parseAppStoreCli } from "./data-only.ts";

export type AppStoreChangelogEntry = {
  version: string;
  date: string;
  releaseNotes: string;
  filename: string;
};

type RawVersion = {
  version?: unknown;
  releaseDate?: unknown;
  releaseNotes?: unknown;
};

const fetchUsage = `Usage: pnpm fetch:appstore-changelog <app-id-or-url> [--country <code>] [--out <path>]
       pnpm import:appstore-changelog <artifact-path> [--out-dir <path>]

Fetch App Store version history or import a fetched artifact into Astro.

Fetch arguments:
  <app-id-or-url>  Numeric App Store ID or apps.apple.com app URL

Fetch options:
  --country <code> Storefront code; uses the URL country or us by default
  --out <path>     Write JSON to a file instead of stdout
  -h, --help       Show this help message

Examples:
  pnpm fetch:appstore-changelog 123456789 --out app-input/changelog.json
  pnpm import:appstore-changelog app-input/changelog.json`;

const importUsage = `Usage: pnpm import:appstore-changelog <artifact-path> [--out-dir <path>]

Generate unreviewed Astro changelog entries from a fetched artifact.

Arguments:
  <artifact-path>  JSON produced by pnpm fetch:appstore-changelog

Options:
  --out-dir <path> Destination directory (default: src/content/changelog)
  -h, --help       Show this help message`;

const releaseDate = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;

  const date = value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;

  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString().slice(0, 10) !== date
    ? undefined
    : date;
};

const filenameForVersion = (version: string): string | undefined => {
  const slug = version
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `app-store-${slug}.md` : undefined;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const normalizeReleaseNotes = (notes: string): string =>
  notes
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => escapeHtml(line).replace(/^\s*[•●]\s*/, "- "))
    .join("\n")
    .trim();

export const parseAppStoreChangelog = (
  input: unknown,
): AppStoreChangelogEntry[] => {
  if (!input || typeof input !== "object" || !("versions" in input)) {
    throw new Error(
      "Expected an App Store changelog artifact with a versions array.",
    );
  }

  const versions = input.versions;
  if (!Array.isArray(versions)) {
    throw new Error(
      "Expected an App Store changelog artifact with a versions array.",
    );
  }

  const entries: AppStoreChangelogEntry[] = [];
  const filenames = new Map<string, string>();

  for (const raw of versions as RawVersion[]) {
    const version = typeof raw?.version === "string" ? raw.version.trim() : "";
    const date = releaseDate(raw?.releaseDate);
    const notes =
      typeof raw?.releaseNotes === "string"
        ? normalizeReleaseNotes(raw.releaseNotes)
        : "";
    const filename = filenameForVersion(version);

    if (!version || !date || !notes || !filename) continue;

    const previousVersion = filenames.get(filename);
    if (previousVersion && previousVersion !== version) {
      throw new Error(
        `Versions ${JSON.stringify(previousVersion)} and ${JSON.stringify(version)} map to the same filename.`,
      );
    }

    if (previousVersion) continue;
    filenames.set(filename, version);
    entries.push({ version, date, releaseNotes: notes, filename });
  }

  return entries;
};

export const renderChangelogEntry = (
  entry: AppStoreChangelogEntry,
): string => `---
version: ${JSON.stringify(entry.version)}
date: ${entry.date}
draft: false
reviewed: false
---

${entry.releaseNotes}
`;

export const isUnreviewedChangelogEntry = (content: string): boolean => {
  const frontmatter = content.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
  )?.[1];
  return frontmatter ? /^reviewed:\s*false\s*$/m.test(frontmatter) : false;
};

export const parseSerializedVersionHistory = (html: string): any[] => {
  const json = html.match(
    /<script\b[^>]*\bid=["']serialized-server-data["'][^>]*>([\s\S]*?)<\/script>/i,
  )?.[1];
  if (!json) return [];

  try {
    const parsed = JSON.parse(json);
    const data = Array.isArray(parsed) ? parsed : parsed?.data;
    const items =
      data?.[0]?.data?.shelfMapping?.mostRecentVersion?.seeAllAction?.pageData
        ?.shelves?.[0]?.items ?? [];
    return items.map((item: any) => {
      const date = new Date(item?.secondarySubtitle);
      return {
        versionString: item?.primarySubtitle,
        releaseDate: Number.isNaN(date.valueOf())
          ? undefined
          : date.toISOString(),
        releaseNotes: item?.text,
      };
    });
  } catch {
    return [];
  }
};

const fetchChangelog = async (args: string[]) => {
  const { input, countryOption, outPath } = parseAppStoreCli(args, fetchUsage);
  const {
    data,
    product,
    dataOnlyURL,
    resolvedAppID,
    country,
    storefrontHeader,
  } = await fetchAppStoreDataOnly({ input, countryOption, outPath });
  let versionHistory: any[] = data.pageData?.versionHistory ?? [];
  let coverage = "App Store dataOnly versionHistory (What's New entries).";
  if (versionHistory.length === 0) {
    const pageURL =
      product.url ?? `https://apps.apple.com/${country}/app/id${resolvedAppID}`;
    const page = await fetch(pageURL).catch(() => undefined);
    if (page?.ok)
      versionHistory = parseSerializedVersionHistory(await page.text());
    if (versionHistory.length > 0)
      coverage = "App Store serialized version history.";
  }

  const mapped = {
    source: {
      requested: input,
      dataOnlyURL: dataOnlyURL.toString(),
      storefrontHeader,
      country,
      retrievedAt: new Date().toISOString(),
      coverage: `${coverage} Apple may truncate older releases.`,
    },
    appID: Number(product.id ?? resolvedAppID),
    name: product.name,
    versions: versionHistory.map((entry) => ({
      version: entry?.versionString,
      releaseDate: entry?.releaseDate,
      releaseNotes: entry?.releaseNotes,
    })),
  };

  const output = `${JSON.stringify(mapped, null, 2)}\n`;
  if (!outPath) {
    process.stdout.write(output);
    return;
  }

  const destination = resolve(outPath);
  await mkdir(dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp-${process.pid}`;
  await writeFile(temporary, output, "utf8");
  await rename(temporary, destination);
  console.error(`Wrote App Store changelog to ${destination}`);
};

const parseImportArgs = (args: string[]) => {
  if (args.includes("-h") || args.includes("--help")) {
    process.stdout.write(`${importUsage}\n`);
    return;
  }

  let artifactPath: string | undefined;
  let outDir = "src/content/changelog";

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--out-dir") {
      const value = args[index + 1];
      if (!value) throw new Error("--out-dir requires a path.");
      outDir = value;
      index += 1;
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}\n\n${importUsage}`);
    } else if (!artifactPath) {
      artifactPath = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}\n\n${importUsage}`);
    }
  }

  if (!artifactPath) throw new Error(importUsage);
  return { artifactPath, outDir };
};

const importChangelog = async (args: string[]) => {
  const options = parseImportArgs(args);
  if (!options) return;

  const artifact = JSON.parse(
    await readFile(resolve(options.artifactPath), "utf8"),
  );
  const entries = parseAppStoreChangelog(artifact);
  if (entries.length === 0) {
    throw new Error(
      "The artifact contains no releases with a version, date, and release notes.",
    );
  }

  const destination = resolve(options.outDir);
  await mkdir(destination, { recursive: true });

  let imported = 0;
  let preserved = 0;

  for (const entry of entries) {
    const outputPath = resolve(destination, entry.filename);
    if (dirname(outputPath) !== destination) {
      throw new Error(`Unsafe generated filename: ${entry.filename}`);
    }

    try {
      const existing = await readFile(outputPath, "utf8");
      if (!isUnreviewedChangelogEntry(existing)) {
        preserved += 1;
        continue;
      }
    } catch (error) {
      if (
        !error ||
        typeof error !== "object" ||
        !("code" in error) ||
        error.code !== "ENOENT"
      ) {
        throw error;
      }
    }

    const temporary = `${outputPath}.tmp-${process.pid}`;
    await writeFile(temporary, renderChangelogEntry(entry), "utf8");
    await rename(temporary, outputPath);
    imported += 1;
  }

  process.stderr.write(
    `Imported ${imported} unreviewed App Store release${imported === 1 ? "" : "s"}; preserved ${preserved} reviewed release${preserved === 1 ? "" : "s"} in ${destination}\n`,
  );
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args[0] === "import") await importChangelog(args.slice(1));
  else await fetchChangelog(args);
};

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  await main();
}
