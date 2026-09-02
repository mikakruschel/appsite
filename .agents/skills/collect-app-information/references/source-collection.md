# Source collection

Read when collection has an App Store, TestFlight, preorder, waitlist, product-website, or app source-directory input.

## App source directory

Run codebase research only when the user supplies an exact app source directory. Do not assume that the landing-page repository, its parent, or a nearby directory contains the app. Inspect the supplied root only.

Delegate a fresh `$research-app-codebase` agent with no inherited conversation context (`fork_turns: "none"` when supported). Give it only the landing-page repository root, exact app source root, fresh `app-input/research/codebase/<source-directory-name>/<UTC-timestamp>/` run directory, and known identity hints such as app name, bundle or package identifier, and application target. Do not seed positioning, feature priority, desired conclusions, or draft copy.

Without delegation, apply the codebase-research skill directly. Consume its manifest and `codebase.md`, not its reasoning transcript. A matching prior run may be reused only when its absolute source root, target identity, and recorded source revision still match and the user did not request a refresh.

Reconcile code findings conservatively. `implemented-reachable` can support a brief feature when identity matches. `implemented-gated` needs its gate preserved and may need user confirmation before public use. `partial`, test-only, documentation-only, unused, and uncertain findings do not support unqualified public feature claims. Code does not override official release state, live destinations, pricing, or explicit current user direction. Record disagreements between code and public sources as conflicts instead of treating either source as silently newer.

Codebase asset findings are candidates only. Promote an asset into the brief after target-app provenance, current use, format, crop limits, and publication status reconcile. Codebase research never copies the asset. Reconcile a codebase brand-color finding separately under the shared accent-selection order. It qualifies only when the report records an exact active semantic role, source, color space, confidence, and reason.

## App Store

Write fresh matching outputs to one run-scoped directory:

```sh
pnpm fetch:appstore-metadata <app-id-or-url> --out app-input/research/app-store/<app-id>/<UTC-timestamp>.json
pnpm fetch:appstore-changelog <app-id-or-url> --out app-input/research/app-store/<app-id>/<UTC-timestamp>-changelog.json
```

Treat a run as successful only when input, resolved app ID, country, and retrieval time match. The metadata collector does not supply ratings and reviews. Inspect the official rendered storefront only for material fields absent from the artifact.

Record the exact metadata and changelog paths. The changelog artifact schema is fixed: releases are in `.versions`, with `.versions[].version`, `.versions[].releaseDate`, and `.versions[].releaseNotes`. Do not probe alternate keys such as `.entries`, `.releases`, `.items`, `.date`, or `.notes`. A valid entry has a non-empty string `version`, a valid `releaseDate`, and non-empty string `releaseNotes`. Apple may truncate history; never infer omitted versions.

Inspect every changelog artifact with a field-specific query that reads `.versions` directly. First confirm that `.versions` is an array, then report its length and inspect each entry's `version`, `releaseDate`, and release-note type and length without printing note bodies. If a prior query used another schema, discard its result and rerun against `.versions`. When field validity is uncertain, read `parseAppStoreChangelog` in `scripts/appstore/changelog.ts`; it is the authority for importer validity. Never write `valid entries: none` until this exact inspection returns zero valid entries.

Inspect other artifacts with field-specific queries. Do not print, stringify, or arbitrarily truncate a whole metadata, changelog, or reviews artifact into agent context.

For a released app, apply [the trust and proof contract](../../references/trust-and-proof.md). Reuse a matching fresh all-storefront artifact or fetch once:

```sh
pnpm fetch:appstore-reviews <app-id-or-url> --out app-input/research/app-store/<app-id>/<UTC-timestamp>-reviews.json
```

Isolated country failures are noise and do not justify retries. Judge ratings and reviews independently. Record storefront coverage; when failures make `ratings.aggregate` materially unrepresentative, omit aggregate proof or use a clearly scoped reliable storefront result. Keep prior artifacts but consume only a successful matching run.

## Website research

When a website or discovered privacy, terms, support, or contact URL matters, delegate a fresh `$research-app-website` agent with no inherited conversation context (`fork_turns: "none"` when supported). Give it only the repository, URL, fresh run directory, known app identity, operator, policy candidates, and any evidence that the live site is another deployment of the current repository. Do not seed positioning or expected conclusions.

During initialization, treat every other live product site as legacy that the generated site replaces. Reachability does not preserve its origin. Copy or adapt supported content and migrate required routes; do not carry the legacy homepage into public navigation, footer, developer attribution, canonical metadata, structured data, or legal-page source links. The only exception is a verified `same-repository-deployment`.

Without delegation, apply the website-research skill directly. Consume its manifest and named artifacts. Keep locale or jurisdiction variants separate; collection chooses one artifact per local route.

Website Blog research is reference-only. Never use it as authored Blog content.

## TestFlight, preorder, and waitlist

Inspect the supplied public link read-only and verify that it belongs to the target app. Record the conversion kind, visible label, availability state, and exact destination. Do not run App Store collectors without an App Store URL or ID, and do not infer invite validity, capacity, release status, or public availability from the URL alone.

## Brand color

Record an exact user-supplied accent directly. Otherwise run `$resolve-app-brand-color` after collecting the available website or App Store evidence. Use a fresh agent with no inherited conversation context when delegation is available; without delegation, apply it directly and record that the decision was not independent. Give it only the target identity, homepage URL or `None`, and matching App Store artifact or `None`.

When neither website nor App Store visual evidence is available, consume a matching codebase report's qualifying brand-color evidence directly. Preserve its semantic role, source, color space, confidence, and reason. Convert non-sRGB evidence deterministically before choosing a landing-page token and record the conversion. At least one qualifying website, icon, or codebase color source is required. Do not complete collection with an uninspected icon guess, an unbound code palette value, or a website color that lacks a visible role.

## Review shortlist

Inspect only `reviews.count` before deciding. Any nonzero usable collection requires `$select-app-reviews` before the brief plans testimonials.

More than 100 reviews prefers a fresh selector agent with no inherited conversation context and only the source artifact, draft brief, and sibling shortlist output path. With 100 or fewer reviews, or without delegation, apply the selector directly. Consume only its compact artifact, then verify recommended IDs and ratings against the source.

Use `ReviewsCarousel` only when the recommended set meets the current component limit. Otherwise record testimonial presentation as omitted.
