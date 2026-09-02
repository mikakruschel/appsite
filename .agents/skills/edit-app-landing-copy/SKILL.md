---
name: edit-app-landing-copy
description: Independently edit landing-page copy for clarity, specificity, voice, and evidence. During initialization edit only `site-content.yaml`; after initialization edit published copy directly.
---

# Edit app landing copy

Read `.agents/skills/references/copy-standard.md`, the reliable brief, and the copy being edited. Preserve its supported meaning, audience, conversion action, and composition.

During initialization, edit only `app-input/site-content.yaml`, including a narrow revision requested by a post-build critique. Do not edit `src/`. After initialization, edit published copy directly and ignore the old YAML. For review-only requests, return replacements without editing.

Improve:

- immediate clarity and a consistent voice;
- concrete product-specific benefits, nouns, actions, and states;
- scannable headings, cards, CTA labels, and FAQ answers;
- qualifications and proof proportional to the evidence;
- natural language without hype, filler, generic SaaS framing, or invented urgency.

Do not introduce a stronger claim, new audience, new conversion action, new section job, or unsupported fact.

Edit in two passes. First make the page's argument coherent: the reader should recognize who the app is for, what they can do or change with it, why this app is a credible path, and what action comes next. Then line-edit for clarity, rhythm, repetition, and fit within the existing components.

Use these tests when a line is weak:

- **New-ability test:** mentally prefix a headline or benefit with `Now you can`. Keep it only if the result names a concrete, useful, supported ability. Do not force every line into that syntax.
- **Outcome-mechanism test:** lead with the supported user outcome when one exists, then explain the product action or mechanism that makes it possible. If the evidence supports only the feature, do not invent an outcome.
- **Audience-risk test:** read claims from the chosen audience's point of view. Words such as `automatic`, `new`, or `simple` may imply loss of control, immaturity, or missing capability. Prefer precise facts over reassurance.
- **CTA test:** make the label describe the actual next action or immediate result. Do not promise a benefit that the destination does not deliver.
- **Voice test:** derive vocabulary and tone from the brief and its evidence. Do not invent a brand personality or copy testimonial language into an unattributed product claim.

This review is the qualitative approval gate before build. Do not treat a passing checker as evidence that the copy is clear, persuasive, natural, or accurate. Read the complete page as one argument, remove repetition, and declare it build-ready only when the wording works for the intended audience and remains supported by the brief.

For initialization, preserve the exact YAML shape and run:

```sh
pnpm validate:site-content app-input/site-content.yaml
```

Fix errors. Judge and report warnings; do not mechanically rewrite supported copy merely to silence one. Keep research notes and unresolved questions out of the YAML. Report the material edits, removed or softened claims, remaining gaps, and your qualitative build-readiness decision.
