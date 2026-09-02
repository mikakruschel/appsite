import type { APIRoute } from "astro";
import { createElement } from "react";
import { ImageResponse } from "takumi-js/response";
import OgImage from "@/components/og/OgImage";
import { getDefaultOgContent, ogImageResponseOptions } from "@/lib/default-og";

export const prerender = true;

export const GET: APIRoute = () =>
  new ImageResponse(
    createElement(OgImage, getDefaultOgContent()),
    ogImageResponseOptions,
  );
