---
name: critique-app-landing-page
description: Independently audit a completed app landing page against its evidence, approved copy, rendered experience, and template contract. Review only.
---

# Critique app landing page

Do not edit files. Inspect the rendered desktop and mobile site, `APP_BRIEF.md`, implementation metadata, and relevant policy branches. During initialization, also read `app-input/site-content.yaml`; it is the approved copy.

When delegation is available, give one **economy** agent with low reasoning the deterministic verification work. It independently checks current-run artifact accounting; changelog `.versions[]`, reviewed imports, release ordering, and normalized duplicates; placeholder references; the legacy-hostname sweep; preserved starter drafts; exact YAML-to-source strings, icons, counts, and built structured data. Require a compact pass/fail report with commands and evidence paths. Consume that report instead of repeating successful checks unless it conflicts with rendered observation. Without delegation, batch these shell and source checks directly before visual review.

Use `template-fidelity` after initialization/build and [its contract](references/template-fidelity.md). Use `redesign` only after an authorized redesign. If browser QA is unavailable, inspect source plus built or locally fetched output and state the missing viewports.

First perform a mandatory YAML-to-render audit. Compare metadata, hero, CTA state, section headings, card and capability order/count/copy, FAQ, closing CTA, media treatment, proof omissions, and rendered structured data. Report each mismatch as `implementation-drift`. This is a model-led rendered-output review, not a source parser.

Then perform a mandatory image-to-copy audit. Open every local hero and feature-card asset at a legible size and compare what its pixels primarily show with the paired rendered title and description. Check promotional composites for visible unsupported claims. File paths, filenames, source order, provenance, and YAML fidelity do not establish relevance. Report an unrelated image, a merely adjacent workflow, or visible unsupported embedded copy even when the YAML and source agree. Browser unavailability does not waive local asset inspection; it only leaves responsive crop verification unavailable.

Then perform a mandatory published-icon audit. Resolve the favicon and Apple touch icon from built or locally fetched HTML, open the resolved local assets, and compare them with the brief's inspected target-app icon. When the brief identifies a usable target-app icon, both must show that icon. Any published reference to `placeholder-app-icon`, `placeholder-favicon`, an inherited Astro favicon, or another visually mismatched icon is an `implementation-only` finding. A placeholder is allowed only when the brief explicitly records that no usable target-app icon exists. Search for published placeholder references without dumping minified HTML:

```sh
rg -l -i 'placeholder-app-icon|placeholder-favicon' dist src
```

Then audit the brief's resolved inputs, using the deterministic verifier's report where assigned:

- every successful current-run artifact is consumed or has the recorded rejection reason;
- independently inspect every named changelog artifact through `.versions[].version`, `.releaseDate`, and `.releaseNotes`; never accept the brief's valid-entry count without this check and never query alternate keys such as `.entries`, `.releases`, `.items`, `.date`, or `.notes`;
- a named changelog artifact with valid entries has matching reviewed public releases whose normalized note bodies are unique, with consecutive releases always different; report duplicates with the action `Omit duplicated release notes.`;
- a successful nonempty reviews artifact agrees with the brief's rating and testimonial decision;
- the accent matches the recorded resolver token or a contrast-adjusted token in the same hue family, and the claimed visual source and role are real;
- every visitor link follows the legacy-site migration decision. During initialization the old product origin is replaced unless the brief proves it is another deployment of this repository. Old same-origin destinations require a local route, redirect, direct action, or recorded omission.

The deterministic verifier searches published source for the existing site's hostname, substituting the hostname recorded in the brief:

```sh
rg -n -F '<existing-site-hostname>' src public astro.config.*
```

Inspect every match and include the matched file paths in review coverage. Do not search `APP_BRIEF.md` or `app-input`, where evidence references are expected. For a legacy origin, flag every published match as a `potentially-unwanted-current-site-reference`; visitor-facing links, developer attribution, canonical metadata, structured data, and legal-source links are defects to remove or replace locally. For a verified same-repository deployment, canonical metadata may match, but internal links must use local routes and a generic link back to the site itself remains a defect. Never report this sweep as passed without running the command and accounting for its output.

Then review:

- proposition, audience clarity, conversion, and release language;
- narrative flow, specificity, readability, and unsupported or inherited copy;
- media relevance, crops, hierarchy, spacing, overflow, contrast, focus, and reduced motion;
- ratings, testimonials, pricing, compatibility, privacy, support, links, metadata, and structured data against evidence;
- Contact-route presence, injected app name and email, and local navbar/footer links against the brief;
- template composition, component use, legal routes, Blog/Changelog integrity, and preserved private starter drafts.

A genuine improvement to approved wording is `yaml-copy-change`; a non-copy code or visual correction is `implementation-only`. Preference alone is not a defect. Recommend the smallest verifiable fix and no redesign in template-fidelity mode.

Before returning no findings, report `YAML fidelity: pass`, `image-to-copy relevance: pass`, artifact reconciliation, changelog disposition, brand-source verification, the existing-site hostname sweep, the template-residual sweep, preserved starter draft paths, reviewed routes/viewports, and unavailable checks. Do not return no findings when the relevant local image pixels were not inspected. Read [the finding format](references/finding-format.md) when writing the response. Return at most eight impact-ordered findings plus concise preserve and coverage notes.
