---
name: select-app-reviews
description: Shortlist verified App Store reviews from a matching `appstore:reviews` artifact into a compact testimonial artifact. Required before planning testimonials from a nonzero usable review collection.
---

# Select app reviews

Create an evidence-preserving shortlist. Do not edit the brief, source artifact, website, or implementation.

Require the exact reviews artifact, sibling output path, and either a matching draft brief or explicit app identity, audience, positioning, benefits, and website language. Read [the trust contract](../references/trust-and-proof.md).

## Inspect without flooding context

Use targeted `jq` or streaming queries. First confirm app identity, retrieval metadata, all-storefront scope, counts, and request success. Attribution is `reviews.items[].reviewerNickname` only and is never guessed.

If the artifact reports reviews but no nicknames, inspect a sample schema before treating testimony as unusable. A missing nickname field may indicate an incompatible artifact rather than an empty review collection.

Filter to five stars before reading bodies. Let `inspectionTarget` be the smaller of 200 and the eligible five-star count.

- At 200 or fewer eligible reviews, inspect every unique full body.
- Above 200, inspect a balanced recent batch and thematic batch drawn from brief benefits, workflows, audiences, and use cases. Deduplicate IDs and replenish until the target is met.
- Keep exact inspected IDs for the output but never print or return review bodies or the inspected-ID list.
- Translate promising foreign-language bodies before deciding that too few reviews qualify.

## Qualify and rank

A candidate must be a five-star, standalone, specific benefit, workflow, use case, or value statement. Prefer current reviews when candidates are otherwise equal and keep distinct themes in the recommended set.

Reject vague praise, complaint-adjacent or backhanded wording, support and bug reports, coercion, sensitive or offensive material, duplicate proof, and context-dependent quotes. Reject price, plan, trial, subscription, paywall, discount, availability, and competitor claims unless separately verified and explicitly requested as proof. Never weaken criteria to reach a component count.

Use the complete review when it meets the trust contract. For a longer body, select one faithful contiguous passage. Preserve criticism, conditions, specificity, meaning, sentiment, and tone. Translation and light spelling, punctuation, or grammar correction are allowed when recorded. Never stitch, paraphrase, use the title as the quote, or add ellipses. Read [examples.md](examples.md) only when an excerpt or adaptation decision remains ambiguous.

Rank 20 to 30 qualified candidates when possible. The current `ReviewsCarousel` requires 8 to 20 ordered unique recommended IDs. Recommend up to 20 when at least eight qualify; otherwise recommend `[]` and omit the carousel. Never return a partial 1 to 7-ID recommendation.

## Write and verify

Immediately before writing, read [references/shortlist-format.md](references/shortlist-format.md). Keep candidates in rank order. Do not copy fields that consumers can resolve from the named reviews artifact.

Fetch each candidate again by exact ID and verify its five-star rating, public nickname, source body, and display quote. Recommended IDs must be unique, name listed candidates, and resolve exactly once in the source artifact. Write atomically beside the source artifact.

Return only the shortlist path, inspected count, candidate count, recommended count, and blocking identity or input issue.
