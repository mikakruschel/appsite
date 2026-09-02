import type { APIRoute } from "astro";
import { getBlogPosts, getChangelogReleases } from "@/lib/collections";
import { site } from "@/site.config";

export const prerender = true;

export const GET: APIRoute = async ({ site: astroSite }) => {
  const siteURL = astroSite ?? new URL(site.siteURL);
  const url = (path: string) => new URL(path, siteURL).href;
  const [posts, releases] = await Promise.all([
    getBlogPosts(),
    getChangelogReleases(),
  ]);

  const platformLabels = {
    iphone: "iPhone",
    ipad: "iPad",
    mac: "Mac",
    watch: "Apple Watch",
    vision: "Apple Vision Pro",
    tv: "Apple TV",
  };
  const overview = site.platforms?.length
    ? [
        `- Supported platforms: ${site.platforms.map((platform) => platformLabels[platform]).join(", ")}`,
      ]
    : [];

  if (site.downloadURL) {
    overview.push(
      `- Availability: [Download ${site.name}](${site.downloadURL})`,
    );
  }

  const sections = [
    `# ${site.name}\n\n> ${site.description}`,
    `## Overview\n\n${overview.join("\n")}`,
    `## Pages\n\n- [Home](${url("/")})\n- [Privacy](${url("/privacy/")})\n- [Terms](${url("/terms/")})`,
  ];

  if (posts.length) {
    const links = posts.map(
      (post) =>
        `  - [${post.data.title}](${url(`/blog/${post.id}/`)}), published ${post.data.date.toISOString().slice(0, 10)}`,
    );
    sections.push(
      `## Blog\n\n- [All blog posts](${url("/blog/")})\n${links.join("\n")}`,
    );
  }

  if (releases.length) {
    sections.push(`## Changelog\n\n- [Release notes](${url("/changelog/")})`);
  }

  return new Response(`${sections.join("\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
