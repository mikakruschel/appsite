import { z } from "astro/zod";

const text = z.string().trim().min(1);
const assetPath = text.refine(
  (value) => value.startsWith("src/assets/"),
  "media paths must be repository-local under src/assets/",
);

const actionSchema = z
  .object({
    kind: z.enum([
      "app-store",
      "testflight",
      "preorder",
      "waitlist",
      "web",
      "disabled-app-store-badge",
    ]),
    label: text,
    url: z.url().optional(),
    supportingNote: text.optional(),
  })
  .strict()
  .superRefine((action, context) => {
    const disabled = action.kind === "disabled-app-store-badge";

    if (disabled && action.url) {
      context.addIssue({
        code: "custom",
        path: ["url"],
        message: "a disabled App Store badge must not have a URL",
      });
    }

    if (!disabled && !action.url) {
      context.addIssue({
        code: "custom",
        path: ["url"],
        message: `active ${action.kind} action requires a verified URL`,
      });
    }
  });

const heroMediaSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("image"),
      source: assetPath,
      alt: z.string(),
    })
    .strict(),
  z
    .object({
      kind: z.literal("video"),
      source: assetPath,
      poster: assetPath,
      alt: z.string(),
    })
    .strict(),
]);

const cardImageSchema = z
  .object({
    source: assetPath,
    preset: z.enum(["focus-top", "focus-bottom", "inset", "fill"]).optional(),
  })
  .strict();

const copyCardSchema = z
  .object({
    title: text,
    description: text,
    icon: text,
  })
  .strict();

const featureCardSchema = z
  .object({
    title: text,
    description: text,
    image: cardImageSchema,
  })
  .strict();

const proofSchema = z
  .object({
    heading: text,
    testimonials: z
      .object({
        items: z.array(
          z
            .object({
              quote: text,
              author: text,
            })
            .strict(),
        ),
      })
      .strict()
      .optional(),
    rating: z
      .object({
        average: z.number().min(1).max(5),
        count: z.number().int().positive(),
      })
      .strict()
      .optional(),
  })
  .strict()
  .refine((proof) => proof.testimonials || proof.rating, {
    message: "proof requires testimonials or a rating",
  });

export const siteContentSchema = z
  .object({
    metadata: z
      .object({
        pageTitle: text,
        description: text,
      })
      .strict(),
    homepage: z
      .object({
        hero: z
          .object({
            layout: z.enum(["horizontal", "vertical"]),
            headline: text,
            tagline: text,
            action: actionSchema,
            media: heroMediaSchema,
          })
          .strict(),
        featureCards: z
          .object({
            heading: text,
            items: z.array(featureCardSchema),
          })
          .strict()
          .optional(),
        valueCards: z
          .object({
            heading: text.optional(),
            items: z.array(copyCardSchema),
          })
          .strict()
          .optional(),
        capabilities: z
          .object({
            heading: text,
            items: z.array(copyCardSchema),
          })
          .strict()
          .optional(),
        proof: proofSchema.optional(),
        faq: z
          .object({
            heading: text,
            items: z.array(
              z
                .object({
                  question: text,
                  answer: text,
                })
                .strict(),
            ),
          })
          .strict()
          .optional(),
        closingCta: z
          .object({
            headline: text,
            buttonLabel: text,
            footnote: text.optional(),
          })
          .strict()
          .optional(),
      })
      .strict(),
  })
  .strict();

export type SiteContent = z.infer<typeof siteContentSchema>;
