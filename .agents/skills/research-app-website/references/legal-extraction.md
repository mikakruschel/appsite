# Legal extraction

Each document governing target app/operator:

1. Stage complete extraction to unique run-dir path; no copying permission. Single doc per kind → `privacy.md`/`terms.md`. Multiple locales/jurisdictions → `privacy.<locale>.md`/`terms.<locale>.md` (unknown locale → `privacy-2.md`/`terms-2.md`, etc.). Never two candidates, same filename.
2. Preserve wording, headings, lists, tables, links, contacts, effective/updated dates.
3. Remove site chrome, nav, cookie banners, unrelated footer only.
4. Markup → Markdown; no summarize/improve/complete/meaning change.
5. Provenance + source-stated date separate. Never substitute retrieval date. Metadata comment first, separate from policy. Source title = leading H1. No Astro frontmatter in research; parent adds on promotion, may use staged title as layout H1 (no double render).

```md
<!--
Source requested URL: https://example.com/privacy
Source final URL: https://example.com/privacy
Retrieved: YYYY-MM-DDTHH:MM:SSZ
Locale/jurisdiction: <value or not found>
Content type: text/html
Source-stated effective/updated date: <value or not found>
Governs target app/operator: yes
Migration basis: confirmed target policy | explicit user source
Extraction status: complete
Sanitization status: safe
Extraction notes: <none or harmless formatting normalization>
-->

# Privacy Policy

<Faithfully converted policy content>
```

6. Strip/encode scripts, executable HTML, event handlers, forms, embeds, styles, `javascript:` links, unsafe schemes; keep visible wording + safe links.

## Completeness

Pass when headings, paragraphs, lists, tables, links, contacts, dates, incorporated docs present. Omitted body/table/linked doc/unresolved dynamic section = incomplete; disqualify promotion.

## Sanitization

After completeness pass. Artifact only if both pass. Unsafe/incomplete sanitization blocks staging.

## Manifest and blocks

Manifest every candidate, governance, basis, outcome. Block: uncertain source/operator/target applicability, incomplete/inaccessible extraction, unsafe sanitization — not unknown deployment/reuse permission. Identity tests applicability, never copyright/reuse auth. No governing policy found → report; never draft fallback in research. Locale/jurisdiction variants = separate artifacts; report. Parent collection, not research, picks `artifactPath` per local route.
