# Review shortlist format

Write valid JSON with this shape:

```json
{
  "source": {
    "reviewsArtifact": "repo-relative path",
    "brief": "repo-relative path or null",
    "selectedAt": "current UTC timestamp",
    "websiteLanguage": "en"
  },
  "inspectedReviewIDs": ["id"],
  "recommendedReviewIDs": ["id"],
  "candidates": [
    {
      "reviewID": "id",
      "displayQuote": "A faithful complete review or contiguous excerpt.",
      "theme": "short factual label",
      "adaptation": null
    }
  ],
  "notes": []
}
```

The named reviews artifact owns app identity, retrieval metadata, and every original review field. Resolve title, nickname, rating, date, country, version, URL, and full body from it by `reviewID`; do not duplicate them here. Candidate array order is rank order.

Use `adaptation: null` only when `displayQuote` is byte-exact. Otherwise use:

```json
{
  "type": "excerpted",
  "sourceLanguage": "en",
  "displayLanguage": "en",
  "notes": ["Contiguous sentences 2 and 3."]
}
```

Allowed `adaptation.type` values:

- `translated`
- `lightly-corrected`
- `translated-and-lightly-corrected`
- `excerpted`
- `translated-and-excerpted`
- `excerpted-and-lightly-corrected`
- `translated-excerpted-and-lightly-corrected`

For excerpts, adaptation notes identify the source sentence or contiguous boundary without copying rejected bodies into notes.

`inspectedReviewIDs` contains every unique five-star review body actually inspected. Every recommended ID is unique, appears in `candidates`, and resolves exactly once in the source artifact. Notes stay factual and compact.
