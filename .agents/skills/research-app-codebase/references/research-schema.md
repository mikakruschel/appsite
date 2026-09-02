# Codebase research output contract

Create a fresh `app-input/research/codebase/<source-directory-name>/<UTC-timestamp>/` directory per attempt. Every attempt, including a partial or failed one, produces `manifest.json` and `codebase.md` when the landing-page repository is writable.

## `manifest.json`

The manifest inventories only the current run. `filesCreated` excludes `manifest.json`.

```json
{
  "sourceRoot": "/absolute/path/to/app",
  "runID": "2026-08-26T130000Z",
  "status": "complete | partial | failed",
  "sourceRevision": {
    "kind": "git | other | unavailable",
    "value": "full revision or null",
    "workingTreeModified": true
  },
  "targetIdentity": {
    "displayName": "Example",
    "bundleOrPackageIdentifiers": ["com.example.app"],
    "applicationTargets": ["Example"]
  },
  "filesCreated": ["codebase.md"],
  "limitations": ["Reason a material area could not be inspected"],
  "startedAt": "2026-08-26T13:00:00Z",
  "completedAt": "2026-08-26T13:04:00Z"
}
```

Use `null`, an empty array, or a limitation instead of guessing. `workingTreeModified` records only whether tracked or untracked changes exist. Do not list changed files unless they are cited evidence. Never mutate the source repository to obtain revision data.

## `codebase.md`

Use `# Codebase research` as the H1. Record the source root, researched time in UTC, known target identity, detected application targets, source revision, and status.

Use these sections in order and omit empty optional sections:

1. Identity and application targets
2. Platforms and requirements
3. User-visible workflows
4. Candidate features
5. Product terminology
6. Brand color evidence
7. Assets and media
8. Gated, partial, and non-production functionality
9. Privacy and capability indicators
10. Unknowns and conflicts
11. Files inspected

Keep `Unknowns and conflicts` and `Files inspected` even when short.

### Finding format

Use one evidence status:

- `observed`: directly supported by inspected source or configuration;
- `inference`: a reasoned conclusion that is not directly declared;
- `conflict`: inspected sources disagree;
- `unknown`: the source does not support a reliable answer.

Feature and workflow findings also use one implementation status:

- `implemented-reachable`: source connects a user-visible entry point to working implementation;
- `implemented-gated`: implementation exists behind a feature, account, entitlement, build, or availability gate;
- `partial`: a user path or required implementation is incomplete;
- `test-or-preview-only`: evidence exists only in tests, fixtures, samples, or previews;
- `documentation-only`: evidence exists only in prose, comments, plans, or metadata claims;
- `unused-or-unreachable`: implementation or an asset exists but no current product path reaches it;
- `uncertain`: available evidence cannot establish another status.

Format a user-visible finding as:

```markdown
- [evidence: observed; implementation: implemented-reachable] Users can export a selected document as PDF. The export command calls the PDF renderer and presents a system share sheet. Evidence: `/absolute/path/Commands.swift:41`, `/absolute/path/PDFExporter.swift:18`.
```

State what the user can do and the resulting app behavior. Do not convert mechanics into a benefit or outcome claim. Keep gates and qualifications in the same finding.

### Brand color evidence

Include this section when source establishes an exact color with an active semantic role. Use one compact finding per light, dark, or platform variant:

```markdown
- Token or components: `#009AF5`
- Color space: `sRGB`
- Role: primary application target global accent color
- Source: `/absolute/path/AccentColor.colorset/Contents.json:4`, `/absolute/path/project.pbxproj:920`
- Confidence: high
- Reason: The application target binds `AccentColor` as its global accent, and the asset defines this exact sRGB value.
```

Use `high`, `medium`, or `low`. Keep the reason factual. When the source color space is not sRGB, record its original components and color space. Do not present those components as an sRGB hex token unless an exact deterministic conversion was performed and recorded. If no qualifying color exists, omit the section and record the limitation under `Unknowns and conflicts`.

### Assets

For each useful candidate, record:

- exact absolute source path;
- format and dimensions when cheaply inspectable;
- app target and screen or feature association;
- whether current source references it;
- provenance confidence and any embedded text or crop constraint;
- research disposition: `active-candidate`, `provisional-candidate`, `reference-only`, or `uncertain`.

Research disposition is not publication approval. The parent may promote an asset into the brief only after identity, provenance, suitability, and status reconcile with other sources.

### Files inspected

List only files that materially supported a finding or limitation. Group routine related files when that stays precise. Do not dump a repository-wide file inventory.
