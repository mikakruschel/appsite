---
name: collect-app-information
description: Reconcile supplied app sources into an evidence-backed `APP_BRIEF.md` without writing marketing copy or editing the site.
---

# Collect app information

Create the durable factual input for copywriting. Do not edit public source or create `site-content.yaml`.

Read [the core contract](../references/landing-page-policy.md), [brief guidance](references/brief-guidance.md), and `APP_BRIEF.example.md`. Read [source collection](references/source-collection.md) when an App Store, TestFlight, preorder, waitlist, website, or app source directory is supplied. Load only the policy branches activated by the sources.

Use `app-input/APP_BRIEF.draft.md` while collecting. Resume a matching draft; preserve mismatched work unless reinitialization was authorized. For a refresh, keep the existing root brief until the draft is complete.

Reconcile sources by subject:

- user direction and notes for current intent and capabilities;
- official distribution sources for release state, price, platforms, ratings, and links;
- first-party websites and legal documents for attributed claims, continuity, support, and policy text;
- codebase research artifacts for bounded implementation state, product terminology, and local asset candidates;
- landing-page repository files for existing local assets and implementation state.

Record disagreements and unknowns instead of blending them. Use fresh specialist agents for app source research, website research, brand color, and review selection when their conditions apply. Route website research and review selection to **economy** agents with low reasoning. Route app source research and brand resolution to **balanced** agents with low reasoning. Escalate unresolved evidence conflicts to a frontier agent only when they block the brief. Brand resolution is required unless the user supplied an exact color. Consume specialist results, not their reasoning transcript.

Before promoting the draft, reconcile every artifact created or successfully refreshed in the current run. Name each consumed metadata, changelog, reviews, codebase, website, legal, and shortlist artifact in the brief. Record a specific rejection reason for any unused artifact. Re-read the final files after retries; a successful reviews or codebase artifact cannot remain described as unavailable. Inspect changelog releases only through the documented `.versions[].version`, `.releaseDate`, and `.releaseNotes` fields. A changelog artifact with valid entries must be named as a build input. Record the brand resolver's exact token, visible role, source, and confidence, and reject any description that contradicts the inspected visual source.

Complete the brief with identity, audience, problem, proposition, features, differentiators, release mode, CTA, assets and media handoffs, proof decisions, legal disposition, and exact source paths. Optional missing evidence is recorded and omitted downstream; ask only when identity, release mode, conversion, or required legal handling cannot be resolved safely.

For every proposed hero or feature-card asset, apply the media contract's visual mapping gate before completing the brief. Record what the inspected pixels show and why that visible state supports the named slot. Do not infer screenshot meaning from App Store order or assign semantic filenames before inspection. If the pixels cannot be inspected or no candidate directly supports a slot, record a placeholder and capture handoff instead of a final mapping.

Promote the draft to root `APP_BRIEF.md` only when [brief guidance](references/brief-guidance.md) and the artifact reconciliation pass. Report the brief, consumed and rejected artifacts, usable assets, omissions, and any blocking question.
