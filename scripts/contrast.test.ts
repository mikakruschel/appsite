import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

function runContrast(...colors: string[]): string {
  return execFileSync(
    process.execPath,
    ["--experimental-strip-types", "scripts/contrast.ts", ...colors],
    { encoding: "utf8" },
  );
}

test("reports WCAG and signed APCA contrast", () => {
  const output = runContrast("#ffffff", "#1689ff");
  assert.equal(output, "WCAG 3.47:1\nAPCA Lc -66.98\n");
});

test("chooses label polarity by absolute APCA contrast", () => {
  const output = runContrast("#1689ff");
  assert.equal(
    output,
    "#000000 WCAG 6.06:1 APCA Lc 42.56\n" +
      "#ffffff WCAG 3.47:1 APCA Lc -66.98\n" +
      "Use #ffffff\n",
  );
});
