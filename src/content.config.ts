import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      coverImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    reviewed: z.boolean().default(true),
  }),
});

export const collections = { blog, changelog };
