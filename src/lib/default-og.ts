import { site } from "@/site.config";

export const ogImageResponseOptions = {
  width: 1200,
  height: 630,
  headers: {
    "Cache-Control": "public, max-age=31536000, immutable",
  },
} as const;

export function getDefaultOgContent() {
  return {
    appName: site.name,
    headline: site.home.headline,
    tagline: site.home.tagline,
    screenshotSrc: site.home.ogScreenshot,
    theme: site.theme.light,
  };
}
