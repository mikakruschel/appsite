import type {
  ApplePlatform,
  SiteConfig,
  StructuredDataOffers,
} from "@/lib/site.types";

const platformOperatingSystems: Record<ApplePlatform, string> = {
  iphone: "iOS",
  ipad: "iPadOS",
  mac: "macOS",
  watch: "watchOS",
  vision: "visionOS",
  tv: "tvOS",
};

function buildOffers(offers: StructuredDataOffers) {
  const { price } = offers;

  return {
    "@type": "Offer",
    price,
    ...(price > 0 && {
      priceCurrency: offers.priceCurrency ?? "USD",
    }),
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  datePublished: Date;
  url: string;
  image: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    url: string;
  };
};

export function buildArticleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished.toISOString(),
    url: article.url,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.url && { url: article.author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: article.publisher.name,
      url: article.publisher.url,
    },
  };
}

function isAbsoluteHttpUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function hasMobilePlatform(platforms?: ApplePlatform[]) {
  return (platforms ?? []).some(
    (platform) => platform === "iphone" || platform === "ipad",
  );
}

export function buildApplicationSchema(site: SiteConfig) {
  const operatingSystem = (site.platforms ?? [])
    .map((platform) => platformOperatingSystems[platform])
    .join(", ");

  const schemaType = hasMobilePlatform(site.platforms)
    ? "MobileApplication"
    : "SoftwareApplication";

  const downloadUrl =
    site.downloadURL && isAbsoluteHttpUrl(site.downloadURL)
      ? site.downloadURL
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: site.name,
    ...(site.jsonLd && {
      applicationCategory: site.jsonLd.applicationCategory,
      offers: buildOffers(site.jsonLd.offers),
    }),
    ...(operatingSystem && { operatingSystem }),
    description: site.description,
    url: site.siteURL,
    ...(downloadUrl && {
      downloadUrl,
      installUrl: downloadUrl,
    }),
    ...(site.developer && {
      author: {
        "@type": "Person",
        name: site.developer,
        ...(site.developerWebsite && { url: site.developerWebsite }),
      },
    }),
    ...(site.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: site.rating.average,
        ratingCount: site.rating.count,
      },
    }),
  };
}
