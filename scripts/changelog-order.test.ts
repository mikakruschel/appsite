import assert from "node:assert/strict";
import test from "node:test";

import { compareChangelogReleases } from "../src/lib/changelog-order.ts";

const release = (id: string, version: string, date: string) => ({
  id,
  data: { version, date: new Date(`${date}T00:00:00Z`) },
});

test("orders changelog releases by date, then numeric version", () => {
  const releases = [
    release("app-store-2.9.md", "2.9", "2026-08-31"),
    release("app-store-2.10.md", "2.10", "2026-08-31"),
    release("app-store-3.0.md", "3.0", "2026-08-30"),
  ];

  assert.deepEqual(
    releases.sort(compareChangelogReleases).map(({ data }) => data.version),
    ["2.10", "2.9", "3.0"],
  );
});

test("orders version labels returned by App Store history", () => {
  const versions = [
    "0.0.61",
    "Version 2.1.1",
    "19",
    "8.05.6",
    "v3.4.4",
    "2025.1",
  ];
  const releases = versions.map((version, index) =>
    release(`release-${index}.md`, version, "2026-08-31"),
  );

  assert.deepEqual(
    releases.sort(compareChangelogReleases).map(({ data }) => data.version),
    ["2025.1", "19", "8.05.6", "v3.4.4", "Version 2.1.1", "0.0.61"],
  );
});

test("uses the entry ID as a deterministic final tie-breaker", () => {
  const releases = [
    release("second.md", "2.0", "2026-08-31"),
    release("first.md", "2.0", "2026-08-31"),
  ];

  assert.deepEqual(
    releases.sort(compareChangelogReleases).map(({ id }) => id),
    ["first.md", "second.md"],
  );
});
