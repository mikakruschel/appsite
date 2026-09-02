# Research output contract

Fresh `app-input/research/web/<host>/<UTC-timestamp>/` per attempt. All attempts (incl. partial/failed) → `manifest.json` + `website.md`. Privacy/terms only for complete, sanitized docs governing target app/operator. Unique path per legal file (`privacy.md`/`terms.md` for one doc; `privacy.<locale>.md`/`terms.<locale>.md` for variants).

When legal candidates exist, apply [legal-extraction.md](legal-extraction.md).

## `manifest.json`

`manifest.json` = inventory; exclude from `filesCreated`. Current-run files only, never older. Parent consumes `manifest.json` + `filesCreated` artifacts.

```json
{
  "sourceURL": "https://example.com",
  "runID": "2026-07-13T130000Z",
  "status": "complete | partial | failed",
  "filesCreated": ["website.md", "privacy.en-US.md"],
  "blog": {
    "status": "present | none | inaccessible",
    "indexURL": "https://example.com/blog",
    "feedURL": "https://example.com/blog/rss.xml"
  },
  "legalCandidates": [
    {
      "kind": "privacy",
      "requestedURL": "https://example.com/privacy",
      "finalURL": "https://example.com/privacy",
      "sourceIdentity": "confirmed",
      "governsTarget": true,
      "migrationStatus": "staged",
      "migrationBasis": "confirmed-target-policy",
      "extractionStatus": "complete",
      "sanitizationStatus": "safe",
      "locale": "en-US",
      "artifactPath": "privacy.en-US.md"
    }
  ],
  "startedAt": "2026-07-13T13:00:00Z",
  "completedAt": "2026-07-13T13:04:00Z"
}
```

Per legal candidate in `legalCandidates`: kind; requested/final URLs; source identity; target governance; migration status (`staged`/`blocked`/`not-applicable`); basis (`confirmed-target-policy`/`explicit-user-source`/`independent-reference`/`identity-uncertain`); extraction/sanitization status; locale; nullable artifact path. Host/deployment ≠ copy eligibility. Failed extraction → `incomplete`/`inaccessible`; unknown identity → `unconfirmed`; no extraction → sanitization `not-applicable`. `artifactPath` only after confirmed applicability + passing extraction/sanitization. Unique path per legal file; never two candidates, same filename. Parent picks `artifactPath` per local route for locale/jurisdiction variants. `filesCreated` = this run only.

## `website.md`

H1 required: `Website research`. Omit empty optional sections; keep `Unknowns and conflicts` + `Pages inspected`. Finding: `- [source: <kind>; status: <status>] Finding — <source URL>`.

Headers: Website (requested homepage URL); Researched (UTC); Target app; App Store ID; Operator; Policy candidates; Site relationship (`legacy-replaced` | `same-repository-deployment`). Use `legacy-replaced` by default. Use `same-repository-deployment` only when explicit user direction or repository/deployment evidence proves the URL is another deployment of the current repository. A reachable page, matching identity, canonical tag, or App Store website/support URL is not sufficient.

Order: Product summary; Existing-site value map; Audience and positioning; Features; Pricing and calls to action; Platforms and requirements; Reviews, ratings, awards, and numerical claims; Blog reference; Brand and assets; Support, social, and legal links; Unknowns and conflicts; Pages inspected.

- Product summary: concise facts + source links.
- Existing-site value map: required for `legacy-replaced`. Decision-relevant modules only. Per module: section + URL; priority (`core`/`supporting`/`optional`); visitor question/conversion job; claim/proof/objection; interaction/CTA; media/UI provenance + crop limits; representation needs (`text`/`media`/`sequence`/`comparison`/`interaction`/`conversion`); note on loss if reduced to generic copy. Research records value + needs. Collection owns final `map`/`extend`/`omit` after starter + brief inspection.
- Finding sections: Audience and positioning; Features; Pricing and calls to action; Platforms and requirements; Reviews, ratings, awards, and numerical claims.
- Blog reference: `present`, `none`, or `inaccessible`, plus the verified index and feed URLs when found. Do not list posts or create migration artifacts.
- Brand and assets: describe visible normal-load homepage roles without choosing the final accent. Record the element label or location and page URL for primary CTA, repeated emphasis, navigation highlight, and intentional neutral treatment. Do not run source-wide color extraction, rank variables, or guess exact tokens from screenshots. The fresh brand resolver owns computed-style inspection and the final decision.
- Support, social, legal links: Label: URL — status: `staged`/`incomplete`/`inaccessible`/`identity-unconfirmed`/`independent-reference`.
- Unknowns and conflicts: missing fact/disagreement + competing URLs.
- Pages inspected per page: requested/final/declared canonical URLs; retrieved (UTC); title; locale; content type; limitations.

## Evidence dimensions

One source kind:

- `first-party`: product owner/developer website;
- `official-store`: official distribution-platform listing;
- `independent`: identifiable third-party source;
- `researcher`: research agent analysis.

One evidence status:

- `observed`: directly inspectable page/store metadata, e.g. displayed price or link target;
- `attributed-claim`: source assertion, not independently established;
- `inference`: researcher conclusion not directly stated by source;
- `conflict`: relevant sources disagree or seem outdated;
- `unknown`: no reliable evidence found.

Attribute privacy/security/performance/count/award/usage claims unless independently established. Source support ≠ proof.

## Legal artifacts

Path naming per intro. Completeness, sanitization, header comment, promotion: [legal-extraction.md](legal-extraction.md).
