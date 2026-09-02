# Build checklist

Use after implementation. This is binary verification, not the independent qualitative critique.

## Input and sanitization

- `APP_BRIEF.md` matches the app and `app-input/site-content.yaml` passes the checker.
- Compare visitor-facing source and rendered output with the YAML while reading the fields in order. Headings, descriptions, item counts, CTA labels, FAQ copy, metadata, and media treatments implement the checked handoff; any deliberate new wording was changed and rechecked in YAML first. This is a human-readable build check, not a source-parsing requirement.
- Every consumed artifact path exists and matches the brief identity.
- Read every rendered heading, card label, CTA, and metadata field in order. Search public source, built output, `README.md`, and app-specific setup or examples for obsolete app names, developers, domains, claims, links, assets, demo contact data, and inherited starter wording that is generic or mismatched rather than name-bearing.
- Confirm the exact starter-only heading `The essentials, thoughtfully covered` is absent from public source and built output.
- Update stale app-specific documentation while preserving unrelated user changes and reusable workflow, development, and repository guidance.

## Product and conversion

- Display name, icon, hero, CTA, release mode, pricing, platforms, and support destinations match the brief.
- With a verified contact email, navbar and footer each link once to `/contact/`; the Contact route renders the configured app name and email, and only its email anchor uses `mailto:`. Without a verified email, the route and both Contact links are absent.
- The published app icon is a matching repository-local asset; public code does not hotlink an App Store or website CDN for icon, favicon, metadata, or Open Graph use.
- Navbar, hero, closing CTA, favicon, application schema, and Open Graph assets use target-app identity.
- When the brief provides a usable target-app icon, built output has no published reference to `placeholder-app-icon`, `placeholder-favicon`, or inherited Astro favicon artwork.
- Unknown optional metadata is omitted rather than filled from starter defaults.
- Canonical URL is the generated site's target production URL from the brief when known. Never reuse the legacy origin. Localhost is acceptable for local-only handoff and must be reported before production.
- The legacy product hostname is absent from public links, developer attribution, canonical metadata, structured data, and legal-source notes. The only exception is canonical metadata for a verified same-repository deployment. Internal links use local routes, and the site never links generically back to itself.
- Every brief-named core workflow and usable core-media mapping is implemented or has a recorded evidence/relevance reason for omission.

## Media, theme, and accessibility

- Every media slot has correct provenance, status, crop, alt treatment, and replacement handoff.
- `accent` and `accentLabel` are exact six-digit sRGB hex values in both themes. Run `pnpm check:contrast <accent-hex>`, use its returned label, and record the chosen APCA Lc and any WCAG-driven accent adjustment.
- Repeated-card icons match distinct concepts.
- At 320px, common mobile, desktop, 200% zoom, light, and dark states: no material overflow, unreadable crop, blocked CTA, missing focus, or unusable hit target.
- Heading hierarchy, landmark names, reduced motion, carousel or video controls, and decorative versus meaningful alt treatment are correct.

## Proof, metadata, and legal

- Visible rating, configuration, and JSON-LD use the same verified average and count.
- Every testimonial resolves to one named shortlist candidate and source review; carousel count meets the component contract.
- Structured data omits unsupported rating, offer, download, install, OS, and platform fields.
- Visible price and offer schema describe the same transaction. Subscription or IAP price is not encoded as download price.
- Titles, descriptions, H1, canonical, language, social metadata, RSS metadata, and route-specific schema match visible content.
- Each legal route has one rendered H1, safe links, and the correct verified or fallback source status.

## Publishing

- Local Blog and Changelog routes, feeds, per-post Open Graph routes, and every pre-edit private starter draft path remain with `draft: true`.
- If present in the pre-edit starter, specifically verify `src/content/blog/welcome-to-orbit.md` and `src/content/changelog/1.0.0.md` at those exact paths with `draft: true`; replacing them with empty collections fails this check.
- `site.nav` and `site.footer` each have exactly one local Blog and one local Changelog link.
- No public Blog post was scraped from website research.
- Repository-local and explicitly supplied target-app posts were preserved or migrated.
- Every valid named App Store changelog entry was imported or has a recorded reason; no import remains unreviewed; generic-only entries are absent. Compare retained bodies with the artifact instead of treating `reviewed: true` alone as proof of review.
- Normalized published release-note bodies are unique, and no two consecutive releases have the same notes.

## Template fidelity and final commands

- Compare the homepage with the page-composition contract and current component APIs. When a captured pre-edit snapshot exists, use it as additional evidence. Order, named component choices, spacing, typography, responsive behavior, navigation, footer, shared styling, and hierarchy remain unless a brief-approved bounded extension required a local change. No retained slot uses hand-written markup in place of its catalog component; no shared component contains target-app-specific copy.
- Confirm every retained `Section` has meaningful content and every pre-existing private Blog and Changelog draft path still exists with `draft: true`.
- Run `pnpm check` and `pnpm build`.
- Verify the affected rendered routes and record any unavailable browser state.
