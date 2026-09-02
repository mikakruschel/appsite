---
name: write-app-blog-article
description: Plan, write, and edit a user-requested article for the Blog of an initialized app landing page. Use for app tutorials, explainers, product stories, and feature articles. Not for initialization, changelog imports, or bulk SEO content.
---

# Write app Blog article

Create one useful article inside the existing Astro Blog. Do not add this skill to initialization or replace the Blog collection, routes, feed, layout, or metadata system.

Read [the core contract](../references/landing-page-policy.md), [the Blog contract](../references/publishing.md), [the copy standard](../references/copy-standard.md), the matching completed `APP_BRIEF.md`, and the current Blog schema and layout. Read [media and brand](../references/media-and-brand.md) only when the article uses or adds media.

## Guard the scope

- Require an initialized target-app site and matching completed brief. Route an uninitialized or mismatched site to collection or initialization.
- Use the topic, audience, purpose, and publication state the user supplied. Ask only when the missing choice would materially change the article.
- Write one article unless the user explicitly requests a series or batch.
- Do not run Google searches, infer search demand, or add keywords by default. When the user explicitly requests live topic research, treat search results only as discovery and open reliable sources before using their claims.
- Do not alter homepage copy, product positioning, shared Blog infrastructure, or the old initialization YAML.

## Choose and support the article

If the user supplied a topic, keep it unless evidence shows the app cannot support it. If the user asks for ideas, derive a short list from verified app workflows, meaningful releases, recurring review themes, support material, or user-supplied analytics. Do not manufacture topics to reach a quota.

Define one reader, one question or task, and the concrete result the article should deliver. Choose a format that fits the material, such as a tutorial, explanation, release story, comparison of supported workflows, or practical use case. There is no target word count.

Trace app claims to the brief and its named artifacts. Use current user-supplied material or reliable external sources for facts outside the brief. Link public external claims to their sources in the article when a reader needs that provenance. Omit facts that remain uncertain.

## Draft in the native Blog

Create `src/content/blog/<descriptive-slug>.md`. Use MDX only when the article genuinely needs an existing component.

Frontmatter must match `src/content.config.ts`:

```yaml
---
title: A descriptive article title
date: YYYY-MM-DD
description: A concise summary that also works as page metadata.
draft: true
---
```

New articles default to `draft: true`. Use `draft: false` only when the user explicitly asks to publish the article. Add `coverImage` only for a verified repository-local asset that suits the article. Do not generate or download decorative media unless the user asks.

The layout renders the title as the page's H1, so article bodies begin with prose or H2. Write an answer-first opening for a direct question or tutorial. Other formats may open with the specific event, problem, or observation that gives the article a reason to exist.

Teach the subject before asking the reader to download the app. Mention the app where its verified behavior helps the reader. Add only relevant internal links and one accurate conversion action when it fits. Use descriptive link and image text. Do not stuff exact phrases, create fake FAQs, pad the article, or repeat the landing page in article form.

## Write with a human voice

Derive the voice from the brief, first-party writing, and existing target-app articles. When no distinct voice is established, write plainly and with quiet confidence. Do not invent a brand personality.

- Have a point. An article should make a useful judgment, teach a real task, or explain a concrete decision. A neutral catalogue of features is not an article.
- Start where the substance starts. Cut openings such as `In today's world`, `Whether you're...`, `Let's dive in`, and background the intended reader already knows.
- Name the object, action, state, constraint, or result. Rewrite any sentence that could appear unchanged on another app's Blog.
- Vary sentence and paragraph length. Do not give every section the same setup, list, and summary cadence.
- Use the brief's terminology consistently. Do not cycle through synonyms to avoid repeating the correct product term.
- Use first person only for a real, supported author or product-team perspective. Never fabricate personal experience, customer stories, emotions, or behind-the-scenes decisions.
- Let qualifications remain visible. A precise caveat sounds more credible than vague reassurance.
- Use sentence-case headings that tell the reader what changes or what they will learn. Avoid generic headings such as `Why it matters`, `Key takeaways`, and `Conclusion` unless they carry specific meaning in context.
- End with the next useful fact, limitation, or action. Do not recap the article merely because it is ending.

Cut the common generated-writing tells:

- puffery, promotional adjectives, and claims that something is `seamless`, `effortless`, `robust`, `powerful`, or `game-changing`;
- vague attribution such as `experts say`, `many users`, or `research shows` without a named source;
- em dashes, decorative boldface, title-case headings, forced groups of three, and `not just X, but Y` constructions;
- bolted-on participle clauses such as `highlighting`, `showcasing`, or `ensuring` when they add no fact;
- inflated verbs and abstract jargon where `is`, `has`, `uses`, or another plain verb works;
- chatbot transitions, rhetorical setup, repeated `Here's how`, and generic conclusions.

## Article-specific checks

Read the finished article three times:

1. **Evidence:** Trace every app claim to the brief or a named source. Remove or qualify anything stronger than the evidence.
2. **Structure:** Check that each section advances the reader's task or understanding. Cut repetition, padding, and detours.
3. **Voice:** Ask `What makes this sound generated?` Rewrite formulaic rhythm, generic phrasing, fake enthusiasm, and sentences that describe a feeling instead of a mechanism or fact.

Confirm that the title, description, opening, and body all promise and deliver the same article; the body has no H1; frontmatter matches the Blog schema; internal links resolve to real local routes; and any image text describes the pixels. These checks are part of editing the article. General repository build and visual QA remain governed by `AGENTS.md` and do not belong to this skill.

Report the article path, topic and evidence used, draft or published state, and any claims or media omitted for lack of support.
