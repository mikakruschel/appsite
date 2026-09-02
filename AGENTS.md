## Development

Start and manage the background development server with:

```sh
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

After code or published-content changes, run `pnpm check` and `pnpm build`. After script, schema, importer, or validator changes, also run `pnpm test:tooling`. Documentation-only changes need `git diff --check`, not a production build.

For visible UI changes, verify affected desktop/mobile states with available browser tools. Do not search for or install a browser skill only for QA. If browser tooling is unavailable, inspect rendered output and report unverified visual states.

Bound rendered-output checks. Minified HTML often one line. Use targeted `rg -o`, selector, or parser; avoid plain `rg -n` printing whole document.

## App landing-page workflows

Use repository-local skill matching request. Skills live at `.agents/skills/<skill-name>/SKILL.md` and read shared contract at `.agents/skills/references/landing-page-policy.md`.

- Use `$initialize-app-landing-page` for new app or authorized reinitialization without redesign.
- Use matching research, copy, build, or critique skill for focused work.
- Use `$maintain-app-landing-page` for routine updates to initialized site.
- Use `$write-app-blog-article` for new article. Blog writing falls outside initialization.
- For explicit layout or visual redesign, edit initialized site directly, then use `$critique-app-landing-page` in redesign mode.

Initialization skill owns full research, copy, build, critique, and fix sequence. Follow it; do not assemble specialist steps independently.

## Implementation

Check relevant official documentation before framework-dependent changes:

- [Astro](https://docs.astro.build) for routes, collections, and components
- [Tailwind CSS](https://tailwindcss.com/docs) for styles and tokens
- [shadcn/ui](https://ui.shadcn.com/docs) for UI components and configuration
- [Base UI](https://base-ui.com/react/overview/getting-started) for accessible interactive components

Before adding UI component, check `src/components/ui/`. Add missing shadcn components with `pnpm exec shadcn add <component>`. CLI reads `components.json`.

Prefer static Astro components. Use React only when interface needs browser-side interaction.
