---
name: write-app-landing-copy
description: Draft an evidence-bounded `app-input/site-content.yaml` from a completed `APP_BRIEF.md`. Do not research, edit the site, or perform the final copy review.
---

# Write app landing copy

Create the first complete public-copy proposal with a fresh writing context.

Read `APP_BRIEF.md`, `.agents/skills/references/copy-standard.md`, `.agents/skills/references/site-content.md`, `.agents/skills/references/media-and-brand.md` when the brief includes media, `SITE_CONTENT.example.yaml`, and the current homepage/component shape. The brief and its named artifacts are the factual boundary; do not collect new facts.

Choose one audience, problem, promise, distinction, and conversion action. Then draft metadata, hero, CTA, feature and value cards, capabilities, proof, FAQ, closing CTA, and media choices for the existing composition. Prefer specific supported benefits over feature inventory or generic marketing language. Omit unsupported proof, compatibility, pricing, and claims.

Assign media by the brief's pixel-inspected visible state, not by filename or source order. Open each selected local image beside the proposed title and description before writing the YAML. A card image must directly demonstrate its card copy. Use the placeholder handoff when the mapping is missing, uninspected, or only loosely related.

Create only `app-input/site-content.yaml` using the exact example shape. Include only content the builder should render. Omit unsupported optional sections. Do not add evidence references, workflow state, notes, open questions, or capture instructions to the YAML. Do not edit `APP_BRIEF.md`, `src/`, public routes, Blog, or Changelog.

Read the result once as a visitor journey and once against the evidence. Run `pnpm validate:site-content app-input/site-content.yaml`. Report deliberate omissions and unresolved questions separately. Leave final wording to `$edit-app-landing-copy`.
