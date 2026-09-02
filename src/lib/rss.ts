import { site } from "@/site.config";

export type RssFeed = {
  title: string;
  href: string;
};

export const blogRssFeed: RssFeed = {
  title: `${site.name} Blog`,
  href: "/blog/rss.xml",
};

export const changelogRssFeed: RssFeed = {
  title: `${site.name} Changelog`,
  href: "/changelog/rss.xml",
};
