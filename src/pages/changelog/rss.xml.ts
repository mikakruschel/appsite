import rss from "@astrojs/rss";
import { getChangelogReleases } from "@/lib/collections";
import { site } from "@/site.config";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const releases = await getChangelogReleases();
  const siteURL = context.site ?? site.siteURL;

  return rss({
    title: `${site.name} Changelog`,
    description: `Release notes and version history for ${site.name}.`,
    site: siteURL,
    items: releases.map((release) => {
      const anchor = release.data.version.replace(/\./g, "-");

      return {
        title: `Version ${release.data.version}`,
        pubDate: release.data.date,
        description: release.body?.trim() ?? "",
        link: new URL(`/changelog/#${anchor}`, siteURL).href,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
