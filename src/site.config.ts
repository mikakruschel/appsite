import type { SiteConfig } from "@/lib/site.types";

function getSiteUrl(): string {
  const env = process.env;
  if (env.SITE_URL) return env.SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (env.NETLIFY === "true" && env.URL) return env.URL;
  if (env.COOLIFY_URL) return env.COOLIFY_URL.split(",")[0].trim();
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  if (env.CF_PAGES_URL) return env.CF_PAGES_URL;
  return "http://localhost:4321";
}

const contactEmail = "hello@example.com";

/**
 * Fictional, compile-safe demo configuration.
 *
 * `$initialize-app-landing-page` replaces this metadata and composes the
 * homepage for the target app. Optional evidence stays absent until verified.
 */
export const site: SiteConfig = {
  siteURL: getSiteUrl(),
  name: "Orbit",
  description:
    "A calm, fictional daily planning app used to demonstrate this app landing-page template.",
  contactEmail,
  home: {
    headline: "Make room for a day that works.",
    tagline:
      "Orbit turns tasks, notes, and routines into a clear plan you can actually follow.",
  },
  developer: "Demo Studio",
  platforms: ["iphone", "ipad", "mac"],
  rating: {
    average: 4.8,
    count: 1240,
  },
  theme: {
    light: {
      background: "oklch(0.97 0 0)",
      label: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      labelSecondary: "oklch(0.556 0 0)",
      accent: "#1447e6",
      accentLabel: "#ffffff",
    },
    dark: {
      background: "oklch(0.269 0 0)",
      label: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      labelSecondary: "oklch(0.708 0 0)",
      accent: "#3f63c9",
      accentLabel: "#ffffff",
    },
  },
  nav: [
    { label: "Blog", href: "/blog/" },
    { label: "Changelog", href: "/changelog/" },
    { label: "Contact", href: "/contact/" },
  ],
  footer: [
    { label: "Blog", href: "/blog/" },
    { label: "Changelog", href: "/changelog/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Contact", href: "/contact/" },
  ],
  social: [],
};
