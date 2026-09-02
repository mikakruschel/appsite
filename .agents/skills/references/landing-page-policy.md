# Landing-page core contract

Read this core for collection, copy, build, initialization, critique, and maintenance. Specialist skills own procedure; this contract owns shared truth. Do not duplicate it in skill entrypoints.

## Read only the applicable branches

- Legacy product website or verified same-repository deployment: [existing-site.md](existing-site.md).
- Icon, screenshots, video, placeholders, or theme: [media-and-brand.md](media-and-brand.md).
- Ratings, reviews, testimonials, awards, or numerical proof: [trust-and-proof.md](trust-and-proof.md).
- Blog or Changelog during initialization, build, maintenance, or critique: [publishing.md](publishing.md).
- Privacy or terms research, migration, fallback, copy, build, maintenance, or critique: [legal.md](legal.md).

Do not read an inapplicable branch merely because it exists.

## Workflow boundaries

- A matching brief or draft describes the same app. Match App Store ID when present; otherwise match public display name plus primary first-party URL.
- A refresh replaces only the brief. Keep the root brief active until the matching draft is complete.
- Reinitialization creates a new brief and rebuilds through `$initialize-app-landing-page`; preserve the current implementation until sources and decisions reconcile.
- Routine maintenance updates an initialized site through `$maintain-app-landing-page`.
- Initialization and build preserve the starter composition. A bounded extension is a local, evidence-backed addition that keeps the starter type, spacing, tokens, responsive behavior, and interaction style. It is allowed only for a brief-named core continuity need that existing components cannot carry.
- Redesign changes section order, visual system, or composition. It is outside initialization and build. After initialization, an explicit user redesign may proceed directly. A redesign critique still enforces evidence, identity, CTA, legal, accessibility, and the contracts of starter components that remain in use.

## Delegated-agent model profiles

When the runtime can choose subagent models, route by required capability instead of inheriting the coordinator's model:

- **Economy:** the fastest low-cost model that reliably supports the required tools. Use for bounded extraction, filtering, metadata collection, link checks, and deterministic transformations. Prefer low reasoning.
- **Balanced:** a general-purpose model with reliable writing, coding, visual inspection, and tool use. Use for reconciliation, copy work, implementation, and routine QA. Prefer low reasoning; use medium for dependent judgments.
- **Frontier:** the strongest available model. Reserve it for conflicting evidence, final independent critique, or decisions where a subtle mistake would affect later stages. Prefer medium reasoning.

These are capability requirements, not provider-specific model names. If model selection is unavailable, use the current model with the requested reasoning level. A model chosen for the coordinator is not a blanket choice for subagents unless the user explicitly requests that model for every agent.

## Evidence boundary

- The completed `APP_BRIEF.md` and its exact named artifacts are the factual boundary. Generated public wording is never evidence. Throughout initialization—including its post-build critique and accepted fixes—`app-input/site-content.yaml` is the canonical public-copy handoff. Only after initialization is complete do public source files own later wording. Verified facts and explicit user decisions in the brief always win.
- Current user-supplied product statements are authoritative first-party facts unless they conflict with a newer explicit user statement. A capability does not establish public availability; release mode and CTA apply to the app as a whole.
- Static app-source inspection can establish bounded implementation facts when it traces a user-visible path to implementation. It does not establish release state, production readiness, product priority, customer benefit, privacy or security compliance, pricing, or a public destination. Tests, previews, comments, documentation, dependencies, symbols, and unused assets are not standalone evidence of an available feature.
- Separate direct observation, attributed source claims, inference, conflicts, and generated copy.
- Never invent or imply capabilities, compatibility, pricing, availability, outcomes, performance, ratings, reviews, awards, adoption, privacy or security behavior, urgency, guarantees, or support terms.
- Keep qualifications beside the affected public claim or action. Keep provenance, retrieval details, asset status, and implementation handoffs internal unless omission would mislead visitors.
- Ask only when a missing answer blocks accurate identity, proposition, release mode, conversion, required legal migration, or another decision that cannot safely default. Optional gaps may remain unknown and their public content should be omitted.

## Identity and conversion

- Keep the exact App Store listing title as store evidence. Use the shortest corroborated first-party product name on navbar branding, `site.name`, headings, closing CTA, and natural legal references. Do not carry an ASO subtitle into brand surfaces. If a shorter name is not corroborated, record the ambiguity and ask.
- Every completed site needs one primary conversion action. Released, TestFlight, preorder, waitlist, and web actions require an accurate label and verified live target-app destination.
- For an unreleased app without a user-directed active action, use a disabled, non-interactive `Soon on the App Store` badge. Never invent a destination.
- Align visible CTA language, release language, metadata, and structured data with the same decision.

## Handoff truthfulness

- Report the final implementation and named evidence, not stale plans.
- Do not claim production deployment from a local URL or existing product website.
- State unavailable verification, provisional assets, fallback legal text, and unresolved publication gaps plainly.
