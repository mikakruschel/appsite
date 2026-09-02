import assert from "node:assert/strict";
import test from "node:test";

import {
  collectAppStoreSocialProof,
  parseCustomerReviewFeed,
} from "./reviews-data.ts";
import { appStoreCountryCodes } from "./storefronts.ts";

const labeled = (label: string) => ({ label });

test("storefront list has no duplicates", () => {
  assert.equal(appStoreCountryCodes.length, 184);
  assert.equal(new Set(appStoreCountryCodes).size, appStoreCountryCodes.length);
});

test("parses and normalizes a customer review feed", () => {
  const reviews = parseCustomerReviewFeed(
    {
      feed: {
        entry: {
          id: labeled("123"),
          "im:rating": labeled("5"),
          "im:version": labeled("2.1"),
          "im:voteCount": labeled("4"),
          "im:voteSum": labeled("3"),
          title: labeled("Very useful"),
          content: labeled("Does exactly what I need."),
          updated: labeled("2026-07-20T10:00:00-07:00"),
          author: { name: labeled("Example User") },
          link: { attributes: { href: "https://example.com/review/123" } },
        },
      },
    },
    "US",
  );

  assert.deepEqual(reviews, [
    {
      id: "123",
      country: "US",
      rating: 5,
      title: "Very useful",
      body: "Does exactly what I need.",
      reviewerNickname: "Example User",
      createdDate: "2026-07-20T10:00:00-07:00",
      version: "2.1",
      voteCount: 4,
      voteSum: 3,
      url: "https://example.com/review/123",
    },
  ]);
});

test("does not emit a review without Apple's public author name", () => {
  const reviews = parseCustomerReviewFeed(
    {
      feed: {
        entry: {
          id: labeled("123"),
          "im:rating": labeled("5"),
          title: labeled("Very useful"),
          content: labeled("Does exactly what I need."),
          updated: labeled("2026-07-20T10:00:00-07:00"),
        },
      },
    },
    "US",
  );

  assert.deepEqual(reviews, []);
});

test("calculates a count-weighted rating and keeps reviews flat", async () => {
  const fetchFn: typeof fetch = async (input) => {
    const url = new URL(String(input));
    const country =
      url.searchParams.get("country") ?? url.pathname.split("/")[1] ?? "US";

    if (url.pathname === "/lookup") {
      return Response.json({
        results: [
          country === "US"
            ? { averageUserRating: 5, userRatingCount: 10 }
            : { averageUserRating: 3, userRatingCount: 30 },
        ],
      });
    }

    return Response.json({
      feed: {
        entry: [
          {
            id: labeled(country),
            "im:rating": labeled("5"),
            "im:version": labeled("1.0"),
            title: labeled(`${country} title`),
            content: labeled(`${country} body`),
            updated: labeled(
              country === "US"
                ? "2026-07-20T10:00:00Z"
                : "2026-07-21T10:00:00Z",
            ),
            author: { name: labeled(`${country} user`) },
          },
        ],
      },
    });
  };

  const result = await collectAppStoreSocialProof({
    appID: "123",
    requestDelayMs: 0,
    fetchFn,
  });

  const expectedCount = 10 + 30 * 183;
  const expectedAverage = (5 * 10 + 3 * 30 * 183) / expectedCount;
  assert.equal(result.ratings.aggregate?.average, expectedAverage);
  assert.equal(result.ratings.aggregate?.count, expectedCount);
  assert.equal(result.ratings.aggregate?.storefronts, 184);
  assert.equal(result.reviews.count, 184);
  assert.ok(result.reviews.items.some((review) => review.country === "DE"));
  assert.deepEqual(result.requests, {
    attempted: 368,
    succeeded: 368,
    failed: 0,
    minimumStartIntervalMs: 0,
  });
});
