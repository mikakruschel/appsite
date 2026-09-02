---
name: build-app-landing-page
description: Implement a completed brief and checked `site-content.yaml` in the Astro starter without researching, rewriting copy, or redesigning.
---

# Build app landing page

Read `APP_BRIEF.md`, `app-input/site-content.yaml`, [the core contract](../references/landing-page-policy.md), [component catalog](references/component-catalog.md), [page composition](references/page-composition.md), and the current component source. Read media, trust, publishing, legal, or existing-site contracts only when activated by the brief.

Before editing, run `pnpm validate:site-content app-input/site-content.yaml`. Stop if the file is missing or invalid.

For every brief-named App Store changelog artifact, independently inspect `.versions[].version`, `.releaseDate`, and `.releaseNotes` before accepting the brief's valid-entry count or disposition. Do not query `.entries`, `.releases`, `.items`, `.date`, or `.notes`. When the artifact has valid entries, run `pnpm import:appstore-changelog <artifact-path>`, then apply `$review-app-changelog` to that exact artifact before final validation. If no valid entry exists, record that reason. Preserving the private starter draft does not satisfy a named target-app changelog.

Map the checked YAML into the starter exactly:

- replace identity, metadata, CTA, links, theme, assets, page copy, proof, and structured data;
- when the brief has a verified contact email, keep `/contact/`, inject the app name and email through `site.config.ts`, and point navbar and footer Contact links to the local route; otherwise remove the route and both links;
- migrate legacy-site content and routes under the existing-site contract without publishing the legacy origin as a destination;
- preserve section order, named components, responsive behavior, navigation, footer, and shared styling;
- omit unsupported content and remove every public starter or other-app residue;
- preserve private starter Blog and Changelog drafts and permanent publishing infrastructure;
- apply verified legal artifacts or clearly recorded fallbacks;

Before editing, open every hero and feature-card image named by the YAML and compare its visible state and embedded text with the paired title and description. Do not trust semantic filenames or a prior mapping without inspecting the pixels. Stop and return an uninspected, unrelated, or unsupported-claim mapping to the appropriate collection/copy step; do not implement it as final media. After implementation, inspect every selected image in its rendered desktop and mobile crop. When browser rendering is unavailable, local pixel inspection remains mandatory and the crop coverage remains explicitly unavailable.

Do not shorten, polish, or otherwise rewrite visitor copy in source. If copy must change, return it to `$edit-app-landing-copy`, recheck YAML, and then implement that value.

The Contact page's standard question and email sentence is template-owned utility copy, not a new copywriting surface. Preserve that sentence and its injected values.

Read and apply [the build checklist](references/build-checklist.md). Compare YAML with the rendered site in field order, including metadata, item counts, omissions, and structured data. Then run `pnpm check` and `pnpm build`. Start the repository background server and verify desktop and mobile when browser tooling is available; otherwise inspect built output and report the missing visual coverage.

Report implemented files, deliberate omissions, checks, provisional assets, legal-review needs, and unresolved publication gaps.
