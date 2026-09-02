type ChangelogRelease = {
  id: string;
  data: {
    date: Date;
    version: string;
  };
};

const versionCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

const comparableVersion = (version: string): string =>
  version.match(/\d+(?:\.\d+)*/)?.[0] ?? version;

export function compareChangelogReleases(
  left: ChangelogRelease,
  right: ChangelogRelease,
): number {
  const dateOrder = right.data.date.valueOf() - left.data.date.valueOf();
  if (dateOrder !== 0) return dateOrder;

  const versionOrder = versionCollator.compare(
    comparableVersion(right.data.version),
    comparableVersion(left.data.version),
  );
  if (versionOrder !== 0) return versionOrder;

  const labelOrder = versionCollator.compare(
    right.data.version,
    left.data.version,
  );
  if (labelOrder !== 0) return labelOrder;

  return left.id.localeCompare(right.id, "en");
}
