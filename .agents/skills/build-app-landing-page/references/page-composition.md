# Page composition

The brief bounds truthful claims; the current homepage bounds composition. Apply [the core contract](../../references/landing-page-policy.md). If this map drifts, inspect `src/pages/index.astro` and preserve its current order.

## Starter homepage order

Preserve order during initialize/build. Hide app-specific section only when dishonest; do not reorder adjacent sections to compensate. Component APIs: [component-catalog.md](component-catalog.md).

1. **`HeroSection`** — app, outcome, primary CTA, hero media. `layout`: `horizontal` | `vertical`; defaults in shared media rule.
2. **`Section` + `FeatureCard` grid** — three, five, or six primary demonstrable benefits. Keep supported cards with temporary media. Use `FeatureCard`; equivalent hand-written card markup is not template preservation.
3. **`Section` + `ValueCard` grid** — two or three supported differentiators (privacy, native integration, offline, accessibility). Evidence-gated, not decorative. Use `ValueCard`; do not reproduce its appearance with local `<div>` markup.
4. **`FeatureIconGrid`** — three, five, or six secondary capabilities, not feature-card restatement. Desktop ≤3 columns. No filler.
5. **`Section` with `ReviewsCarousel` then `RatingsSummary`** — shared testimonial + rating contract only; omit either when unsupported.
6. **`Section` + `FaqSection`** — three to seven real objections, not feature restatements.
7. **`DownloadCta`** — closing conversion. Omit when it repeats nearby hero CTA only.

`Layout` / `NavBar` / `Footer` wrap page. Always retain the Blog and Changelog links required by the shared publication contract. Apply evidence rules only to their content.

## Template-preservation contract

Current homepage = composition/design baseline. Preserve section order, named components, spacing, typography, responsive behavior, visual hierarchy. Omitting unsupported content may remove its owning slot, but may not replace a retained slot with ad hoc markup. Map supported target-app content into structure. Brief-approved continuity extension only under shared bounded-extension contract, only when existing component cannot carry verified core value.

No global type, nav/footer, shared styling, or overall order changes; no substantial custom composition in this workflow. Explicit redesign = direct site change outside initialize/build.

## What evidence supports

Brief release mode, not composition label. Assess evidence directly; no per-feature maturity tiers. Few facts → hero + essentials; distinct media/facts → demos + secondary benefits; current ratings + attributable testimony → proof. Composition choices, not brief fields.

Required (shared contract): CTA decision, target-app icon, hero media. Optional: store metadata, ratings, offers, platforms, non-hero media. Missing optional evidence never triggers template media/metadata. Omit unsupported JSON-LD download/install/OS/offer/rating fields.

## Selection test

Unsupported app-specific content → remove/hide. Brief-approved continuity item → map or bounded-extend; explicitly omit only with a recorded evidence or relevance reason. Do not discard usable core screenshots or workflows solely to reduce section count. Weak optional content never authorizes restructuring.

- Decision-relevant user question?
- Supported + app-specific?
- Already answered elsewhere?
- Primary visually demonstrable benefits > secondary breadth?
- Right treatment for content amount/hierarchy?
- User needs price, trial, subscription, IAP, availability date, or account requirements before acting? → near CTA, not buried in FAQ/schema.
- Removal reduces conviction or clarity?

Last answer no → omit section.
