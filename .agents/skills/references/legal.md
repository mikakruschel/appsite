# Legal contract

Read when privacy or terms are researched, collected, written, built, maintained, or critiqued. Handle privacy and terms independently.

1. A complete verified document governing the target app or operator takes precedence and must be faithfully migrated.
2. If bounded research finds no governing document, adapt the starter legal text as a recorded fallback. Remove unsupported starter providers, integrations, and behavior. Record assumptions in `APP_BRIEF.md` and require user or legal review.
3. Omit a route only when the user explicitly decides that document is not applicable.
4. Never use fallback text to bypass a known governing document that was not completely extracted or safely migrated.
5. A pointer to an external policy is not a local migration. Generic Apple, payment, analytics, or independent-operator policies remain links rather than copied governing text.
6. Preserve distinctions among personal information, anonymous analytics, device identifiers, usage data, receipts, and App Store disclosures. Do not collapse them into claims such as "nothing collected."
7. Final handoff states when generated or fallback text needs user or legal review.
8. Keep legacy source URLs in the brief and research provenance, not in rendered policy notes. Convert links to migrated same-origin policies or pages into local routes. Do not append a public "source," "handoff," or "faithful implementation" link to the legacy site.

Research-specific extraction and sanitization requirements live in the website-research skill. Build legal routes with one rendered H1. If the layout renders the frontmatter title, remove an equivalent body H1 from the promoted artifact without altering the policy wording.
