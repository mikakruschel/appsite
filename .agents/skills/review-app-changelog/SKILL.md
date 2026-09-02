---
name: review-app-changelog
description: Editorially clean unreviewed App Store changelog imports against their named artifact. Edit only matching imported entries; never alter Changelog infrastructure or marketing copy.
---

# Review app changelog

Require the repository root and exact matching changelog artifact. Review every `src/content/changelog/app-store-*.md` entry with `reviewed: false` against that artifact.

Edit only those entries:

- Preserve version, date, `draft: false`, and concrete user-relevant changes.
- Remove generic bug-fix language, generic headings, download or thank-you text, feedback requests, rating prompts, and promotional boilerplate.
- Normalize bullets and grammar lightly without broadening, combining, or inferring changes.
- Compare normalized release-note bodies across the imported entries and delete repeated entries. Two consecutive retained releases must never have the same notes.
- Delete an entry when no concrete user-relevant change remains.
- Set `reviewed: true` on every retained entry.

Account for every initially unreviewed path exactly once: it must either remain with concrete notes and `reviewed: true`, or be deleted. Rewriting retained entries does not remove generic-only files; delete those paths explicitly.

Never remove or alter the Changelog route, feed, collection, navigation link, footer link, brief, source artifact, or landing-page implementation.

Return retained and deleted paths with concise reasons, plus any matching imports still marked `reviewed: false` or containing only generic filler. A successful review reports none of either.
