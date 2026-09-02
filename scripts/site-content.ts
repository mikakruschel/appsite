import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { validateSiteContent, type Finding } from "./site-content/validator.ts";

const suppliedPath = process.argv[2];
let filePath = "app-input/site-content.yaml";
if (suppliedPath) filePath = suppliedPath;
filePath = resolve(filePath);

function printFinding(finding: Finding): void {
  let location = "";
  if (finding.path) location = ` ${finding.path}`;
  console.log(
    `${finding.severity.toUpperCase()} ${finding.rule}${location}: ${finding.message}`,
  );
}

try {
  const source = await readFile(filePath, "utf8");
  const result = validateSiteContent(source);

  for (const finding of result.findings) printFinding(finding);

  const errors = result.findings.filter(
    (finding) => finding.severity === "error",
  ).length;
  const warnings = result.findings.length - errors;
  let errorLabel = "errors";
  if (errors === 1) errorLabel = "error";
  let warningLabel = "warnings";
  if (warnings === 1) warningLabel = "warning";
  console.log(`${errors} ${errorLabel}, ${warnings} ${warningLabel}`);

  if (errors > 0) process.exitCode = 1;
} catch (caught) {
  let message = String(caught);
  if (caught instanceof Error) message = caught.message;
  console.error(`ERROR file ${filePath}: ${message}`);
  process.exitCode = 1;
}
