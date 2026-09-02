# Blog and Changelog contract

Read during initialization, build, maintenance, and critique.

## Permanent infrastructure

- Keep local `/blog/` and `/changelog/` routes, RSS feeds, per-post Open Graph routes, existing starter drafts, and exactly one Blog and one Changelog link in both `site.nav` and `site.footer`.
- Empty public collections are valid. Initialization and build never remove this infrastructure. Only a separate explicit user-requested site change may do so.
- Keep starter entries private with `draft: true`. Remove published starter or other-app posts and releases.
- Record the existing private starter draft paths before changelog import and confirm the same paths and `draft: true` state afterward. Imported target releases never overwrite or replace those drafts, including when a version or slug collides; rename the imported target entry instead.
- This starter currently includes `src/content/blog/welcome-to-orbit.md` and `src/content/changelog/1.0.0.md`. If present before initialization, both exact paths must still exist with `draft: true` at handoff; an empty collection is not an equivalent preservation.

## Blog sources

- Website research records only the first-party Blog index and feed. It does not enumerate posts, copy bodies, download post media, or create migration artifacts.
- Preserve or convert target-app Blog posts already in the repository. During initialization, publish additional posts only from local content the user explicitly supplies or identifies for migration.
- After initialization, `$write-app-blog-article` may create an article only when the user explicitly requests the topic, asks for topic ideas, or requests an article series. New articles remain drafts unless the user explicitly asks to publish them.
- When replacing the canonical site, record old Blog URLs that need source-based migration or redirects. Never reconstruct authored posts from the public website during initialization.

## App Store changelog

- Import only from the matching brief-named App Store version-history artifact.
- Use `pnpm import:appstore-changelog <artifact-path>` for the mechanical import. Do not replace the repository importer with an ad hoc script.
- Import every entry with a valid version, valid date, and non-empty release notes. Apple may truncate history; do not infer missing releases or delete older verified releases merely because the latest artifact omits them.
- Import as `draft: false`, `reviewed: false`. Never create an import as reviewed or flip that flag during import; only `$review-app-changelog` may mark a retained entry `reviewed: true` after comparing its body with the named artifact and removing generic filler.
- Published release-note bodies must be unique after whitespace and bullet normalization. At minimum, two consecutive releases must not publish the same notes; omit the duplicated release entry.
- Before handoff, no imported `app-store-*.md` may remain unreviewed. If cleanup removes every release, keep the Changelog route, feed, and links.
- No artifact or no valid entry means no import. Changelog import never populates Blog.
