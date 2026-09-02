import rss from "@astrojs/rss";
import { getBlogPosts } from "@/lib/collections";
import { site } from "@/site.config";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();

  return rss({
    title: `${site.name} Blog`,
    description: `Blog posts from ${site.name}.`,
    site: context.site ?? site.siteURL,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
