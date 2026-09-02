# Critique response format

Return at most eight findings ordered by impact.

```markdown
## Findings

### P1 — Short outcome-focused title

- Location: <section, element, route, or file>
- Evidence: <observed issue and conflicting brief fact when relevant>
- Why it matters: <concrete visitor or discovery impact>
- Action: <smallest valid fix, including replacement wording for copy findings>
- Route: <`implementation-drift`, `yaml-copy-change`, or `implementation-only` during initialization>
- Scope: `out-of-template-scope` <only when applicable>
```

Priorities: `P0` blocker or misleading; `P1` high impact; `P2` worthwhile; `P3` polish with a concrete benefit.

End with:

- `Preserve`: up to three important non-regression decisions.
- `Rejected temptations`: optional unsupported, stuffed, taste-only, or out-of-scope changes deliberately excluded.
- `Review coverage`: routes, viewports, sources, and unavailable checks.

Omit empty sections. Do not add a score, narrative recap, or full-page rewrite.
