import { getCollection, type CollectionEntry } from "astro:content";
import { compareChangelogReleases } from "@/lib/changelog-order";

/** Exclude drafts and imported changelog entries awaiting editorial review. */
function includeEntry({
  data,
}: {
  data: { draft?: boolean; reviewed?: boolean };
}) {
  return data.draft !== true && data.reviewed !== false;
}

export async function getBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  return (await getCollection("blog", includeEntry)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getChangelogReleases(): Promise<
  CollectionEntry<"changelog">[]
> {
  return (await getCollection("changelog", includeEntry)).sort(
    compareChangelogReleases,
  );
}
