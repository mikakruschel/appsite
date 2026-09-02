import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { site } from "./src/site.config.ts";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: site.siteURL,

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },

  integrations: [
    mdx(),
    react(),
    sitemap(),
    {
      name: "site-url",
      hooks: {
        "astro:config:setup": ({ command, logger }) => {
          if (command === "build" && site.siteURL === "http://localhost:4321") {
            logger.warn(
              "Building with http://localhost:4321. Set SITE_URL or expose your host's URL variable during the build so canonical, Open Graph, feed, and sitemap URLs are public.",
            );
          }
        },
      },
    },
  ],
});
