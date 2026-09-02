import { appStoreCountryCodes, appStoreCountryCodeSet } from "./storefronts.ts";

export type StorefrontRating = {
  average: number;
  count: number;
};

export type AppStoreReview = {
  id: string;
  country: string;
  rating: number;
  title: string;
  body: string;
  reviewerNickname: string;
  createdDate: string;
  version?: string;
  voteCount?: number;
  voteSum?: number;
  url?: string;
};

export type StorefrontFailure = {
  country: string;
  resource: "ratings" | "reviews";
  status?: number;
  message: string;
};

type FetchLike = typeof fetch;

const retryableStatuses = new Set([403, 408, 425, 429, 500, 502, 503, 504]);

const delay = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const createRequestGate = (intervalMilliseconds: number) => {
  let nextRequestAt = 0;

  return async () => {
    const now = Date.now();
    const wait = Math.max(0, nextRequestAt - now);
    nextRequestAt = Math.max(now, nextRequestAt) + intervalMilliseconds;
    if (wait > 0) await delay(wait);
  };
};

const fetchWithRetry = async (
  url: URL,
  fetchFn: FetchLike,
  beforeRequest: () => Promise<void>,
  attempts = 3,
): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      await beforeRequest();
      const response = await fetchFn(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "app-landing-page-research/1.0",
        },
      });

      if (
        response.ok ||
        !retryableStatuses.has(response.status) ||
        attempt === attempts - 1
      ) {
        return response;
      }

      const retryAfter = Number(response.headers.get("retry-after"));
      await delay(
        Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1_000
          : 500 * 2 ** attempt,
      );
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1) throw error;
      await delay(500 * 2 ** attempt);
    }
  }

  throw lastError;
};

const labeledString = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (
    value &&
    typeof value === "object" &&
    "label" in value &&
    typeof value.label === "string"
  ) {
    return value.label;
  }
  return undefined;
};

const finiteNumber = (value: unknown): number | undefined => {
  const raw =
    labeledString(value) ??
    (typeof value === "string" || typeof value === "number"
      ? value
      : undefined);
  if (raw === undefined) return undefined;
  const number = Number(raw);
  return Number.isFinite(number) ? number : undefined;
};

export const parseCustomerReviewFeed = (
  input: unknown,
  country: string,
): AppStoreReview[] => {
  const feed =
    input && typeof input === "object" && "feed" in input
      ? input.feed
      : undefined;
  const rawEntries =
    feed && typeof feed === "object" && "entry" in feed
      ? feed.entry
      : undefined;
  const entries = Array.isArray(rawEntries)
    ? rawEntries
    : rawEntries
      ? [rawEntries]
      : [];

  return entries.flatMap((entry): AppStoreReview[] => {
    if (!entry || typeof entry !== "object") return [];

    const id = labeledString(entry.id);
    const rating = finiteNumber(entry["im:rating" as keyof typeof entry]);
    const title = labeledString(entry.title);
    const body = labeledString(entry.content);
    const createdDate = labeledString(entry.updated);
    const author =
      entry.author && typeof entry.author === "object"
        ? labeledString(entry.author.name)
        : undefined;

    if (
      !id ||
      rating === undefined ||
      !title ||
      !body ||
      !createdDate ||
      !author
    ) {
      return [];
    }

    const rawLink =
      entry.link &&
      typeof entry.link === "object" &&
      "attributes" in entry.link &&
      entry.link.attributes &&
      typeof entry.link.attributes === "object" &&
      "href" in entry.link.attributes &&
      typeof entry.link.attributes.href === "string"
        ? entry.link.attributes.href
        : undefined;

    return [
      {
        id,
        country,
        rating,
        title,
        body,
        reviewerNickname: author,
        createdDate,
        version: labeledString(entry["im:version" as keyof typeof entry]),
        voteCount: finiteNumber(entry["im:voteCount" as keyof typeof entry]),
        voteSum: finiteNumber(entry["im:voteSum" as keyof typeof entry]),
        url: rawLink,
      },
    ];
  });
};

const fetchStorefrontRating = async (
  appID: string,
  country: string,
  fetchFn: FetchLike,
  beforeRequest: () => Promise<void>,
): Promise<StorefrontRating | undefined> => {
  const url = new URL("https://itunes.apple.com/lookup");
  url.searchParams.set("id", appID);
  url.searchParams.set("country", country);

  const response = await fetchWithRetry(url, fetchFn, beforeRequest);
  if (!response.ok) {
    throw Object.assign(
      new Error(`iTunes Lookup returned HTTP ${response.status}`),
      { status: response.status },
    );
  }

  const data: any = await response.json();
  const product = Array.isArray(data?.results) ? data.results[0] : undefined;
  if (!product) return undefined;

  const average = finiteNumber(product.averageUserRating);
  const count = finiteNumber(product.userRatingCount);
  if (average === undefined || count === undefined || count <= 0) {
    return undefined;
  }

  return { average, count };
};

const fetchStorefrontReviews = async (
  appID: string,
  country: string,
  fetchFn: FetchLike,
  beforeRequest: () => Promise<void>,
): Promise<AppStoreReview[]> => {
  const url = new URL(
    `https://itunes.apple.com/${country}/rss/customerreviews/id=${appID}/sortBy=mostRecent/json`,
  );
  const response = await fetchWithRetry(url, fetchFn, beforeRequest);

  if (response.status === 400 || response.status === 404) return [];
  if (!response.ok) {
    throw Object.assign(
      new Error(`Customer-review feed returned HTTP ${response.status}`),
      { status: response.status },
    );
  }

  return parseCustomerReviewFeed(await response.json(), country);
};

const runWithConcurrency = async (
  tasks: Array<() => Promise<void>>,
  concurrency: number,
) => {
  let nextTask = 0;
  const worker = async () => {
    while (nextTask < tasks.length) {
      const task = tasks[nextTask];
      nextTask += 1;
      await task();
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(Math.max(1, concurrency), tasks.length) },
      worker,
    ),
  );
};

export const collectAppStoreSocialProof = async ({
  appID,
  country,
  concurrency = 8,
  requestDelayMs = 50,
  fetchFn = fetch,
}: {
  appID: string;
  country?: string;
  concurrency?: number;
  requestDelayMs?: number;
  fetchFn?: FetchLike;
}) => {
  const normalizedCountry = country?.toUpperCase();
  if (normalizedCountry && !appStoreCountryCodeSet.has(normalizedCountry)) {
    throw new Error(`Unsupported App Store country code: ${country}`);
  }

  const countries = normalizedCountry
    ? [normalizedCountry]
    : [...appStoreCountryCodes];
  const ratingsByStorefront: Record<string, StorefrontRating> = {};
  const reviews: AppStoreReview[] = [];
  const failures: StorefrontFailure[] = [];
  let requestsSucceeded = 0;
  const beforeRequest = createRequestGate(Math.max(0, requestDelayMs));

  const captureFailure = (
    error: unknown,
    countryCode: string,
    resource: StorefrontFailure["resource"],
  ) => {
    const status =
      error &&
      typeof error === "object" &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : undefined;
    failures.push({
      country: countryCode,
      resource,
      status,
      message: error instanceof Error ? error.message : String(error),
    });
  };

  const tasks = countries.flatMap((countryCode) => [
    async () => {
      try {
        const rating = await fetchStorefrontRating(
          appID,
          countryCode,
          fetchFn,
          beforeRequest,
        );
        requestsSucceeded += 1;
        if (rating) ratingsByStorefront[countryCode] = rating;
      } catch (error) {
        captureFailure(error, countryCode, "ratings");
      }
    },
    async () => {
      try {
        reviews.push(
          ...(await fetchStorefrontReviews(
            appID,
            countryCode,
            fetchFn,
            beforeRequest,
          )),
        );
        requestsSucceeded += 1;
      } catch (error) {
        captureFailure(error, countryCode, "reviews");
      }
    },
  ]);

  await runWithConcurrency(tasks, concurrency);

  const ratingEntries = Object.values(ratingsByStorefront);
  const ratingCount = ratingEntries.reduce(
    (total, rating) => total + rating.count,
    0,
  );
  const weightedRatingTotal = ratingEntries.reduce(
    (total, rating) => total + rating.average * rating.count,
    0,
  );
  const uniqueReviews = [
    ...new Map(
      reviews.map((review) => [`${review.country}:${review.id}`, review]),
    ).values(),
  ].sort(
    (left, right) =>
      Date.parse(right.createdDate) - Date.parse(left.createdDate),
  );

  return {
    countries,
    requests: {
      attempted: tasks.length,
      succeeded: requestsSucceeded,
      failed: failures.length,
      minimumStartIntervalMs: Math.max(0, requestDelayMs),
    },
    ratings: {
      aggregate:
        ratingCount > 0
          ? {
              average: weightedRatingTotal / ratingCount,
              count: ratingCount,
              storefronts: ratingEntries.length,
              method:
                "Count-weighted aggregate of storefront-local lifetime ratings; not an official Apple worldwide metric.",
            }
          : undefined,
      byStorefront: Object.fromEntries(
        Object.entries(ratingsByStorefront).sort(([left], [right]) =>
          left.localeCompare(right),
        ),
      ),
    },
    reviews: {
      count: uniqueReviews.length,
      storefronts: new Set(uniqueReviews.map((review) => review.country)).size,
      items: uniqueReviews,
    },
    failures: failures.sort(
      (left, right) =>
        left.country.localeCompare(right.country) ||
        left.resource.localeCompare(right.resource),
    ),
  };
};
