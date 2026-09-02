# AppSite

AppSite is an Astro template for building app landing pages with coding agents. Repository-local skills turn App Store metadata, existing websites, product notes, source code, and assets into a finished site.

## Create a site

Open this repository with an agent, then run:

```text
Use $initialize-app-landing-page to create a landing page for my app: <App Store or website URL>
```

You can also include product notes, asset paths, or a path to the app's source code.

## How initialization works

Initialization runs focused agents in a fixed sequence:

1. Research reconciles the supplied sources and records verified facts and decisions in `APP_BRIEF.md`.
2. Copy agents draft and edit a checked `app-input/site-content.yaml` handoff.
3. The build agent maps that copy into the Astro site, runs the project checks, and verifies desktop and mobile layouts.
4. A fresh agent critiques the result. The coordinator then makes one fix pass.

Each agent gets a narrow job and a checked artifact from the previous step.

After initialization, you have a regular Astro project rather than a fixed template controlled by one configuration file. Edit components, styles, routes, and content directly, or describe the change to an agent in plain language. Repository workflows cover routine updates, blog articles, and redesigns. Only rerun initialization when you intend to replace the app and its product information.

## Local development

Requires Node.js 22.12 or newer and pnpm.

```sh
pnpm install
pnpm astro dev --background
```

Manage the background server with `pnpm astro dev status`, `pnpm astro dev logs`, and `pnpm astro dev stop`.

| Command                             | Purpose                                 |
| ----------------------------------- | --------------------------------------- |
| `pnpm check`                        | Run theme, Astro, and TypeScript checks |
| `pnpm build`                        | Build the static site into `dist/`      |
| `pnpm preview`                      | Preview the production build            |
| `pnpm test:tooling`                 | Test the repository tooling             |
| `pnpm validate:site-content <file>` | Validate a copy handoff                 |
| `pnpm format`                       | Format the repository                   |

## Deploy the generated site

The site detects its URL on Vercel, Netlify, Cloudflare Pages, and Coolify. Set `SITE_URL` in your host’s build environment to use a specific public URL, then build:

```sh
pnpm check
pnpm build
```

Configure a static host to run `pnpm build` with Node.js 22.12 or newer and publish `dist/`.
