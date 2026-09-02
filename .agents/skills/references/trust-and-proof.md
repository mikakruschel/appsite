# Trust and proof contract

Read when acquiring, publishing, maintaining, or critiquing ratings, reviews, testimonials, awards, or numerical proof.

## Acquisition and rating source

- During ordinary collection, reuse a matching all-storefront social-proof artifact when `retrievedAt` is within 24 hours; otherwise fetch once to a fresh path. An explicit rating or testimonial refresh always fetches once to a fresh path. A prior failed run may also retry once.
- The freshness window governs acquisition, not publication expiry. Copy, build, and critique consume the brief-named artifact until collection or maintenance explicitly replaces it.
- `ratings.aggregate` is the default rating source. It is a count-weighted aggregate of returned storefront-local lifetime ratings, not an official Apple worldwide figure. A country storefront or `ratings.byStorefront` replaces it only for an explicit country-specific request. Never describe the aggregate as global, worldwide, or all-country proof.
- Visible proof, configuration, and JSON-LD use the same rounded average and full count. Distinguish ratings from written reviews. Keep provenance internal unless disclosure prevents misleading visitors.

## Testimonials

- Publish only unique review IDs from the brief-named shortlist and matching source artifact. Never clone, invent, paraphrase, or silently strengthen a quote.
- A carousel uses five-star reviews only and the count required by the current component catalog. The count is a treatment limit, not an evidence quota. If too few reviews qualify, omit the treatment.
- Prefer a complete 20 to 40-word review. A strong complete review may be 15 to 45 words. For longer bodies, use one faithful contiguous 20 to 40-word passage. Never stitch passages, add ellipses, or hide material criticism or conditions.
- Use only the public reviewer nickname as visible attribution. Keep store, date, country, version, artifact, and adaptation details internal.
- Prefer specific, distinct, current benefits, workflows, or use cases. Reject vague praise, backhanded or complaint-adjacent language, subscription confusion, arguments with other reviewers, duplicate proof, support or bug reports, coercion, sensitive or offensive material, and unverified time-sensitive price or availability claims.
- Awards and other numerical proof require the same evidence discipline. Decorative framing must not imply an award.
