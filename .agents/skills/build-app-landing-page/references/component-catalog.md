# Component catalog and selection rules

Inspect current component source before use; APIs change. Ranges describe balanced existing grids, never quotas. Apply [the core contract](../../references/landing-page-policy.md) and only its applicable branches.

## Structure and conversion

### `Layout`, `NavBar`, and `Footer`

Public pages; nav proportional to real destinations. Shared CTA, legal, replaced-origin rules. Active navbar CTA labels compact; omit navbar CTA for disabled badge. When `contactEmail` is configured, link Contact to the local `/contact/` route and inject the address into its editable MDX copy. No redundant utility-footer download links.

### `HeroSection`

Once—for clearest audience, benefit, action. Shared icon/media/placeholder/video rules. `layout`: `horizontal` | `vertical`; defaults in shared media rule. Content slots preserved: no platform-icon row, compatibility badge, QR code, extra action visual unless requested. Decision-critical compatibility in text.

### `Section`

One distinct narrative job. Useful heading/accessibility label.

Use the catalog component that owns a retained composition slot. Do not clone its markup locally. If an existing API cannot express a verified need, prefer a small reusable prop and keep app-specific values at the page or config call site; never hard-code target-app copy inside a shared component.

### `DownloadButton` and `DownloadCta`

Verified destinations only. `DownloadButton` defaults Apple logo; no `href` → disabled "Soon on the App Store" badge. `DownloadCta` = conventional icon. Override/hide logo for non-App-Store destinations. Omit closing CTA when it repeats nearby hero only.

## Product explanation

Template width: `FeatureCard`, `FeatureIconGrid`, `ValueCard` titles/labels + descriptions ≤3 rendered lines; do not change card width, type, or spacing to fit copy.

### `FeatureCard`

Grid = three, five, or six primary benefits. No split or weak features to fill the grid; no screenshot crops as filler. Count follows the supported story, not image availability.

Keep supported primary cards with temporary media; shared placeholder handoff.

Prefer raw UI. Existing named image preset; check desktop/mobile crop. No `imagePadding`/`imageFit` for routine product assets. No per-image crop APIs or shared geometry changes to force promotional composite.

Judge each composite under shared media contract. Card images decorative (empty `alt`, `aria-hidden`) when adjacent verified copy explains feature.

### `FeatureIconGrid`

Genuine breadth overview of three, five, or six concise secondary capabilities. ≤3 desktop columns. Count = useful distinct features product supports. No filler. Distinct semantic icons per feature in same/adjacent group. No feature-card repeat; no icon-only primary demonstrable benefits.

### `ValueCard`

Two or three supported differentiators: privacy, native integration, accessibility, offline. Privacy/security claims evidence-gated, not decorative.

### Custom demonstration

No component fully covers workflow, steps, annotated screenshot, comparison, detailed state. Prefer existing treatment or small API extension. Brief-approved core continuity item that cannot fit → smallest local component under shared bounded-extension contract; never replace overall composition or invent UI. Placeholder rule only when usable source proof unavailable.

### `PlatformIcons`

Verified support where decision-critical + deserving emphasis. Prefer concise CTA/demo/genuine-FAQ text when platforms elsewhere. No standalone icon-only section because data exists.

## Trust and objections

### `RatingsSummary`

Shared rating source/display rules. Compact treatment; stars match number. Decorative laurels = framing, not award claim. No redundant headings, dates, source links, trophies, badge language. No universal minimum; decision-relevant proof only.

### `ReviewsCarousel`

Current `ReviewsCarousel`: 8–20 unique verified source IDs. <8: omit component; no partial carousel, static clone, or cloned filler.

Other authorized testimonial treatments: other evidence-backed count OK.

Never clone/invent filler: universal invariant (shared evidence contract).

Desktop/mobile motion: pause/focus/reduced-motion behavior required.

### `FaqSection`

Three to seven genuine grouped objections. One or two answers belong in nearby static prose. No feature-to-question conversion to fill the accordion. `FaqSection` emits `FAQPage` for passed items; no questions solely for markup; do not strip built-in emission. Ordinary app sites should not expect Google FAQ rich results under current rules.

## Metadata and structured data

`Head` emits application schema on root homepage only. Builder omits unsupported store/offer/platform/author/rating; visible price/rating must match emitted values. Change route rule only for specialized sites with primary app-description page elsewhere.

## Permanent and optional routes

Blog and Changelog are permanent; handle their routes, feeds, content, and links under the shared Blog and changelog publication contract. Keep the local Contact route when a contact email is available, and preserve its standard MDX sentence with the injected app name and email. Privacy + terms are optional by applicability; keep or omit each route under the shared legal contract. External pointer ≠ migrated policy. Active official socials only; enlarge small social hit areas for accessibility.
