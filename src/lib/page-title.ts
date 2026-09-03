import { site } from "@/site.config";

export function formatPageTitle(pageTitle: string) {
  return `${pageTitle} - ${site.name}`;
}

export function formatHomePageTitle() {
  return site.home.pageTitle ?? site.name;
}
