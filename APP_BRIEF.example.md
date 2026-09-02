# App brief

This file is completed during initial landing-page setup. Remove instructional text and irrelevant fields when creating `APP_BRIEF.md`. Use `Unknown` for important information that still needs confirmation; never invent an answer.

## Sources

- App Store:
- Existing website:
- App source directory:
- Product documentation or press kit:
- Local assets:
- Additional notes:

## Research artifacts used

Only list artifacts that belong to this app and were consumed when completing the brief.

### App Store

- JSON path:
- App ID:
- Country/storefront:
- Retrieved:
- Requested source:

### Website runs

- Manifest path:
- Source website:
- Completed:

### Codebase runs

- Manifest path:
- Codebase report path:
- Source root:
- Source revision and working-tree state:
- Target identity:
- Completed:

## Current-run artifacts not used

List every artifact created or successfully refreshed by the current collection run that was not consumed above, with a specific reason. Use `None` only after checking the final files following all retries.

- Artifact path and reason:

## Release and conversion

Record the primary CTA kind and label. Active CTAs require a verified live URL. Unreleased apps default to a disabled `Soon on the App Store` badge unless the user directs another CTA.

Allowed values: `released`, `testflight`, `preorder`, or `unreleased`.

- Status: unreleased
- Site goal:
- Primary call-to-action kind: app-store | testflight | preorder | waitlist | web | disabled-app-store-badge
- Primary call-to-action label:
- Primary call-to-action URL:
- Target canonical site URL: <generated site's production URL only; never copy the legacy origin>
- Existing website relationship: legacy replaced | same repository deployment (include verification evidence)
- App Store ID:
- App Store URL:
- TestFlight, preorder, or waitlist URL:
- Target release date:

## Product

- Store listing title (exact):
- Public display name:
- One-sentence explanation:
- Primary audience:
- Problem addressed:
- Current workaround or alternative:
- Top audience objections or hesitations:
- Known traffic source or visitor awareness context:
- Key features, implementation status, and exact evidence paths:
- Supported platforms:
- Pricing:
- Differentiators:
- Developer or publisher:
- Legal owner or data controller:

## Brand

- Preferred tone:
- Preferred person and point of view:
- Existing brand language:
- Verbatim customer language and source:
- Words and phrases to use:
- Words and phrases to avoid:
- Product terminology and capitalization:
- Accent token, semantic role, source, confidence, and reason:
- Apple artwork background color (`templatizedArtwork.bgColor`, when available): <icon squircle fill only; not automatic accent>
- References:
- Things to avoid:

## Available assets

- App icon source, status (`final` | `provisional`), and verified artifact path or source URL (required):
- Raw UI screenshots and the feature/platform each shows:
- Device families compared and visual comparison method:
- Promotional screenshot composites, embedded claims, crop constraints, and feature mapping:
- Per-screenshot disposition: final | provisional | reference-only
- Video or animation:
- Logos or brand artwork:
- Asset source and target-app provenance:
- Missing high-priority media:
- Hero media (required): <real target-app path, selected device family + slot-specific reason, or placeholder; layout per the shared media rule; planned replacement path and capture brief>
- Feature-card placeholder mappings: <card; temporary source; planned replacement path; platform/screen/state; safe example content; crop/orientation>

## Trust and evidence

- Verified ratings and review counts:
- Verified reviews or testimonials:
- Review shortlist artifact and selected unique review IDs:
- Testimonial presentation (`carousel` | `omitted` — apply the shared testimonial contract and catalog treatment limit):
- Verified awards and recognition:
- Privacy and security claims:
- Other numerical claims:

Include an exact source reference for every claim in this section: URL, artifact path, or explicit user decision with date and context. Never invent a URL for user-supplied or local evidence.

For material product facts elsewhere in the brief, identify whether each item is a user decision, an observed source fact, an attributed claim, or generated public copy. Include source URLs and retrieval dates where future verification may matter.

## Links

- Developer website: <omit when the only candidate is the legacy product origin>
- Support: <source URL plus final destination: implemented local route/redirect | durable external URL on a different origin | direct contact action | omit>
- Contact: <source URL/action plus final destination>
- Other visitor destinations: <source URL → implemented route/file/redirect | verified durable external destination on a different origin | direct action | omit>
- Privacy policy:
- Terms:
- Social profiles:

## Blog

Blog remains a permanent local section whether populated or empty. Public website research is reference-only and never supplies authored post content.

- Public first-party index URL:
- Public first-party feed URL:
- Research manifest path:
- Local target-app post source: repository | user-supplied path | none
- Existing local public posts:
- Old Blog routes needing source-based migration or redirects:
- Notes:

## Legal research and migration

Apply the shared legal contract. Record applicability, artifact, migration, and fallback-review status for privacy and terms independently.

### Privacy

- Applicability decision: required | not applicable | unknown
- Applicability basis:
- Source URL:
- Research manifest path:
- Artifact path:
- Locale/jurisdiction:
- Other staged variants (not promoted):
- Governs this app/operator: yes | no | unknown
- Migration status: staged | fallback | blocked | not applicable
- Migration basis: confirmed target policy | explicit user source | independent reference | starter fallback | identity uncertain
- Extraction status:
- Sanitization status:
- Fallback review status: not applicable | user/legal review required | reviewed

### Terms

- Applicability decision: required | not applicable | unknown
- Applicability basis:
- Source URL:
- Research manifest path:
- Artifact path:
- Locale/jurisdiction:
- Other staged variants (not promoted):
- Governs this app/operator: yes | no | unknown
- Migration status: staged | fallback | blocked | not applicable
- Migration basis: confirmed target policy | explicit user source | independent reference | starter fallback | identity uncertain
- Extraction status:
- Sanitization status:
- Fallback review status: not applicable | user/legal review required | reviewed

## Site requirements

- User-required sections (only explicit user decisions):
- Optional sections:
- Analytics or integrations:
- Localization:

## Legacy-site migration

Use only when an existing product site may be replaced or repurposed. Preserve visitor value, not the old layout. For each decision-relevant module record:

- Source module and URL:
- Priority: core | supporting | optional
- Visitor question or conversion job:
- Verified proof, interaction, CTA, and media:
- Disposition: map | extend | omit
- Target section/component or bounded extension:
- Reason for extension or omission:

## Open questions and conflicts

- None yet.

## Copy handoff

Collection does not draft public wording. Copy phases create and validate the temporary component-shaped handoff separately at `app-input/site-content.yaml`; see `SITE_CONTENT.example.yaml`. Do not duplicate generated copy in this evidence brief.
