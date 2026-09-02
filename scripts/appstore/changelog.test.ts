import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { promisify } from "node:util";

import {
  isUnreviewedChangelogEntry,
  parseAppStoreChangelog,
  parseSerializedVersionHistory,
  renderChangelogEntry,
} from "./changelog.ts";

const execFileAsync = promisify(execFile);
const scriptDirectory = dirname(fileURLToPath(import.meta.url));

test("creates published changelog entries and skips incomplete releases", () => {
  const entries = parseAppStoreChangelog({
    versions: [
      {
        version: "2.1.0",
        releaseDate: "2026-08-11T08:00:00Z",
        releaseNotes:
          "• Added widgets\r\n• Fixed sync\r\n<script>alert('no')</script>",
      },
      { version: "2.0.0", releaseDate: "2026-07-01" },
    ],
  });

  assert.deepEqual(entries, [
    {
      version: "2.1.0",
      date: "2026-08-11",
      releaseNotes:
        "- Added widgets\n- Fixed sync\n&lt;script&gt;alert('no')&lt;/script&gt;",
      filename: "app-store-2.1.0.md",
    },
  ]);

  assert.equal(
    renderChangelogEntry(entries[0]),
    `---
version: "2.1.0"
date: 2026-08-11
draft: false
reviewed: false
---

- Added widgets
- Fixed sync
&lt;script&gt;alert('no')&lt;/script&gt;
`,
  );
});

test("rejects malformed artifacts", () => {
  assert.throws(
    () => parseAppStoreChangelog({ versions: "invalid" }),
    /versions array/,
  );
});

test("deduplicates repeated versions", () => {
  const release = {
    version: "1.0",
    releaseDate: "2026-01-01",
    releaseNotes: "Initial release",
  };

  assert.equal(
    parseAppStoreChangelog({ versions: [release, release] }).length,
    1,
  );
});

test("parses serialized App Store version history", () => {
  const data = {
    data: [
      {
        data: {
          shelfMapping: {
            mostRecentVersion: {
              seeAllAction: {
                pageData: {
                  shelves: [
                    {
                      items: [
                        {
                          primarySubtitle: "2.1.0",
                          secondarySubtitle:
                            "Tue Aug 11 2026 08:00:00 GMT+0000 (Coordinated Universal Time)",
                          text: "Added widgets",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    ],
  };
  const html = `<script id="serialized-server-data">${JSON.stringify(data)}</script>`;

  assert.deepEqual(parseSerializedVersionHistory(html), [
    {
      versionString: "2.1.0",
      releaseDate: "2026-08-11T08:00:00.000Z",
      releaseNotes: "Added widgets",
    },
  ]);
  assert.deepEqual(parseSerializedVersionHistory("<html></html>"), []);
});

test("only explicit reviewed: false is overwriteable", () => {
  assert.equal(
    isUnreviewedChangelogEntry(`---
version: "1.0"
reviewed: false
---

Release notes
`),
    true,
  );
  assert.equal(
    isUnreviewedChangelogEntry(`---
version: "1.0"
---

Curated release notes
`),
    false,
  );
  assert.equal(
    isUnreviewedChangelogEntry(`---
version: "1.0"
reviewed: true
---

Curated release notes
`),
    false,
  );
  assert.equal(
    isUnreviewedChangelogEntry("Curated notes without frontmatter"),
    false,
  );
});

test("the importer preserves a reviewed generated entry", async (context) => {
  const temporary = await mkdtemp(join(tmpdir(), "appstore-changelog-"));
  context.after(() => rm(temporary, { recursive: true, force: true }));

  const artifactPath = join(temporary, "changelog.json");
  const outDir = join(temporary, "entries");
  const outputPath = join(outDir, "app-store-1.0.md");
  const artifact = (releaseNotes: string) =>
    JSON.stringify({
      versions: [{ version: "1.0", releaseDate: "2026-01-01", releaseNotes }],
    });

  await writeFile(artifactPath, artifact("Initial raw notes"), "utf8");
  await execFileAsync(process.execPath, [
    "--experimental-strip-types",
    join(scriptDirectory, "changelog.ts"),
    "import",
    artifactPath,
    "--out-dir",
    outDir,
  ]);

  const reviewed = (await readFile(outputPath, "utf8"))
    .replace("reviewed: false\n", "")
    .replace("Initial raw notes", "Curated notes");
  await writeFile(outputPath, reviewed, "utf8");
  await writeFile(artifactPath, artifact("Changed raw notes"), "utf8");

  await execFileAsync(process.execPath, [
    "--experimental-strip-types",
    join(scriptDirectory, "changelog.ts"),
    "import",
    artifactPath,
    "--out-dir",
    outDir,
  ]);

  assert.equal(await readFile(outputPath, "utf8"), reviewed);
});
