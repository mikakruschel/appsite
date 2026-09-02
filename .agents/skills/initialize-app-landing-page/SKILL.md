---
name: initialize-app-landing-page
description: Initialize this landing-page template from supplied app sources using fresh research, copy, build, and critique agents. Use for a new app or authorized reinitialization without redesign.
---

# Initialize app landing page

Read [the core contract](../references/landing-page-policy.md). Preserve the starter composition and unrelated user work. A mismatched existing brief or site requires explicit reinitialization approval.

Run this sequence in order. When delegation is available, use a fresh agent with no inherited conversation context for every named skill. Give it only the repository path, required input paths, requested output, and model profile. Wait for the artifact before continuing. Route collection, copy drafting, copy editing, build, and critique to **balanced** agents; use medium reasoning for collection, drafting, build, and critique, and low reasoning for editing. The critique delegates its deterministic checks to one **economy** agent. Use a frontier agent only when unresolved conflicting evidence blocks a high-impact decision.

1. **Research:** `$collect-app-information` produces a completed `APP_BRIEF.md`. Pass any user-supplied app source directory unchanged. Collection delegates `$research-app-codebase` for each supplied app source root, reconciles every artifact created by the current run, treats any live product site as legacy unless it is proven to be another deployment of this repository, requires brand-color resolution unless the user supplied a color, and uses review selection for every successful nonempty reviews artifact.
2. **Draft copy:** `$write-app-landing-copy` reads the brief and creates only `app-input/site-content.yaml`.
3. **Edit copy:** `$edit-app-landing-copy` reviews only the brief and YAML, then runs `pnpm validate:site-content app-input/site-content.yaml`. Do not edit `src/` before this succeeds.
4. **Build:** `$build-app-landing-page` imports and reviews every valid brief-named App Store changelog, maps the checked YAML into the starter without rewriting it, then runs the repository checks and local QA.
5. **Critique:** one fresh read-only `$critique-app-landing-page` compares the rendered site with the brief and YAML and returns findings. Save its result at `app-input/critique.md`.
6. **Fix:** reproduce accepted findings. Implementation drift uses the existing YAML value; a new copy decision goes back to the existing copy-editor agent and checker before rebuilding. Resume that agent instead of spawning a correction agent unless it is unavailable. Implementation-only findings may edit source directly. Re-run affected checks once. Do not start another critique cycle.

If delegation is unavailable, perform the same sequence yourself and read each specialist skill immediately before its step. Record the critique as a fallback self-review, never as independent.

Reuse a matching completed artifact instead of recreating it unless the user requested a refresh or rewrite. During initialization, YAML remains canonical. After initialization completes, public source owns later manual and maintenance edits.

Do not finish without a reconciled brief, checked YAML, every named changelog accounted for, passing build checks, and `app-input/critique.md`. Read [the handoff format](references/handoff.md) only for the final response.
