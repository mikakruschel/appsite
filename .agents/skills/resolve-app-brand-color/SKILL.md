---
name: resolve-app-brand-color
description: Inspect an available rendered first-party homepage and/or verified App Store icon, then return one evidence-based landing-page accent decision. Read-only and normally delegated from collection.
---

# Resolve app brand color

Read the accent-selection section of [media and brand](../references/media-and-brand.md). Require at least one visual source. Inspect the normal-load homepage at desktop and mobile widths when supplied, and inspect the verified App Store icon when supplied.

Choose the first supported source in contract order. Website evidence uses the exact computed color from the visible element. If computed styles are unavailable, use the backing declaration and lower confidence. Icon fallback uses a representative midtone from the distinctive mark, not a highlight, shadow, complementary invention, or neutral field unless the field is itself the brand.

Return only:

```json
{
  "token": "#176b87",
  "role": "homepage primary CTA background",
  "source": "https://example.com/",
  "confidence": "high",
  "reason": "The normal-load primary conversion button uses this background."
}
```

Use `high`, `medium`, or `low`. Keep the reason factual. Do not edit files or choose final light and dark label pairs; build owns contrast adaptation.
