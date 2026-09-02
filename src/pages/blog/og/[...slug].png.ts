import type { APIRoute, GetStaticPaths } from "astro";
import { createElement } from "react";
import { ImageResponse } from "takumi-js/response";
import OgImage from "@/components/og/OgImage";
import { getBlogPosts } from "@/lib/collections";
import { getDefaultOgContent, ogImageResponseOptions } from "@/lib/default-og";

export const prerender = true;

export const getStaticPaths = (async () => {
  const posts = await getBlogPosts();

  return posts
    .filter((post) => !post.data.coverImage)
    .map((post) => ({
      params: { slug: post.id },
      props: {
        headline: post.data.title,
        tagline: post.data.description,
      },
    }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { headline, tagline } = props as {
    headline: string;
    tagline: string;
  };

  const { appName, screenshotSrc, theme } = getDefaultOgContent();

  return new ImageResponse(
    createElement(OgImage, {
      appName,
      headline,
      tagline,
      screenshotSrc,
      theme,
    }),
    ogImageResponseOptions,
  );
};
