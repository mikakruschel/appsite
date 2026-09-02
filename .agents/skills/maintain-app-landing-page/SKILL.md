---
name: maintain-app-landing-page
description: Apply routine changelog, rating, testimonial, screenshot, icon, version, link, or published-copy sync updates to an initialized site. Not for recollection, wholesale copy work, rebuilding, reinitialization, or redesign.
---

# Maintain app landing page

Apply only the requested routine update. Preserve product decisions and unrelated work.

Read [the core contract](../references/landing-page-policy.md) and only the branches touched by the request.

## Guard

- Require a matching completed root brief and an initialized implementation. Otherwise route to collection or initialization.
- Confirm every source artifact belongs to the current app. Stop on identity mismatch.
- Inspect current changes and name the brief fields plus public surfaces the request will modify. Do not expand the edit beyond them.
- Structural or visual redesign is outside this skill. Headline, promise, audience, conversion kind or action, and section-argument changes return to copy editing or collection. A verified destination or compact label correction that preserves the same conversion action remains maintenance.

## Apply the requested update

### Changelog

For an explicit history refresh, fetch a fresh artifact and record its path. Otherwise use the brief-named artifact.

```sh
pnpm fetch:appstore-changelog <app-id-or-url> --out app-input/research/app-store/<app-id>/<UTC-timestamp>-changelog.json
pnpm import:appstore-changelog <artifact-path>
```

Apply `$review-app-changelog` to new unreviewed entries. Preserve all permanent publishing infrastructure.

### Ratings and testimonials

For a rating refresh, apply the trust contract and fetch only when its acquisition rule requires it:

```sh
pnpm fetch:appstore-reviews <app-id-or-url> --out app-input/research/app-store/<app-id>/<UTC-timestamp>-reviews.json
```

Record the new artifact path, retrieval metadata, and `ratings.aggregate` decision in `APP_BRIEF.md`, then synchronize visible rating, `site.rating`, and JSON-LD. A ratings-only update keeps the existing testimonial shortlist.

Refresh testimonials through `$select-app-reviews` when the user requests it or when published quotes would point to a different source artifact. Record the new shortlist path. Omit a carousel that no longer meets its component contract.

### Media, copy, and small fixes

Honor source and slot statuses when swapping screenshots or icons. `reference-only` media never publishes. Update the owning evidence or decision field and provenance in `APP_BRIEF.md` first, then update the implementation. The ignored initialization YAML is no longer a synchronization target.

Version, label, URL, path, support email, and small factual corrections may be edited directly. Record their owning brief evidence or decision field before updating the implementation. A support-email change must keep navbar and footer links on the local Contact route and update the injected address in `site.config.ts`. A change to promise, tone, audience, hierarchy, or argument returns to copy editing.

## Verify

Run `pnpm check` and `pnpm build` for implementation changes. Verify affected desktop and mobile states when UI changed and browser tools are available. Report the exact updated artifacts, surfaces, checks, and remaining provisional or legal-review status.
