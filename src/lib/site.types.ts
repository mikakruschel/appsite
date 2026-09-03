export type ApplePlatform =
  "iphone" | "ipad" | "mac" | "watch" | "vision" | "tv";

export type HexColor = `#${string}`;
export type AccentLabel = "#000000" | "#ffffff";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialPlatform =
  | "mastodon"
  | "twitter"
  | "bluesky"
  | "reddit"
  | "instagram"
  | "threads"
  | "youtube"
  | "discord"
  | "github";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label?: string;
};

/** Six palette tokens per color scheme — derived CSS (borders, glass, tints) lives in global.css */
export type ThemePalette = {
  background: string;
  label: string;
  card: string;
  labelSecondary: string;
  accent: HexColor;
  accentLabel: AccentLabel;
};

export type SiteTheme = {
  light: ThemePalette;
  dark: ThemePalette;
};

/** Homepage copy and social preview asset — hero presentation stays in index.astro */
export type HomeConfig = {
  headline: string;
  tagline: string;
  /** Overrides `<title>`; defaults to the app name when omitted. */
  pageTitle?: string;
  /** Overrides site description for homepage meta/OG when set. */
  metaDescription?: string;
  /** PNG/JPEG/WebP imported with `?inline` for Takumi OG rendering. */
  ogScreenshot?: string;
};

export type ApplicationCategory =
  | "GameApplication"
  | "SocialNetworkingApplication"
  | "TravelApplication"
  | "ShoppingApplication"
  | "SportsApplication"
  | "LifestyleApplication"
  | "BusinessApplication"
  | "DesignApplication"
  | "DeveloperApplication"
  | "DriverApplication"
  | "EducationalApplication"
  | "HealthApplication"
  | "FinanceApplication"
  | "SecurityApplication"
  | "BrowserApplication"
  | "CommunicationApplication"
  | "DesktopEnhancementApplication"
  | "EntertainmentApplication"
  | "MultimediaApplication"
  | "HomeApplication"
  | "UtilitiesApplication"
  | "ReferenceApplication";

export type StructuredDataOffers = {
  /** Use 0 for freemium apps (free download with optional in-app purchases). */
  price: number;
  priceCurrency?: string;
};

export type JsonLdConfig = {
  applicationCategory: ApplicationCategory;
  offers: StructuredDataOffers;
};

export type SiteConfig = {
  appStoreID?: string;
  /** Omit for an unreleased app; App Store CTAs render as non-interactive coming-soon badges. */
  downloadURL?: string;
  siteURL: string;
  name: string;
  description: string;
  home: HomeConfig;
  contactEmail?: string;
  developer?: string;
  developerWebsite?: string;
  jsonLd?: JsonLdConfig;
  platforms?: ApplePlatform[];
  theme: SiteTheme;
  /** Publishes `aggregateRating` in JSON-LD; requires a visible `RatingsSummary` on the homepage. */
  rating?: {
    average: number;
    count: number;
  };
  nav?: NavLink[];
  footer?: NavLink[];
  social?: SocialLink[];
};
