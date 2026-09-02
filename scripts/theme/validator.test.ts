import assert from "node:assert/strict";
import test from "node:test";
import type { SiteConfig } from "../../src/lib/site.types.ts";
import { validateSiteConfig } from "./validator.ts";

const config = {
  siteURL: "http://localhost:4321",
  name: "Test",
  description: "Test",
  home: { headline: "Test", tagline: "Test" },
  theme: {
    light: {
      background: "white",
      label: "black",
      card: "white",
      labelSecondary: "gray",
      accent: "#1447e6",
      accentLabel: "#ffffff",
    },
    dark: {
      background: "black",
      label: "white",
      card: "black",
      labelSecondary: "gray",
      accent: "#1447e6",
      accentLabel: "#ffffff",
    },
  },
} satisfies SiteConfig;

test("accepts a valid theme", () => {
  assert.doesNotThrow(() => validateSiteConfig(config));
});

test("requires six-digit sRGB hex accents", () => {
  assert.throws(
    () =>
      validateSiteConfig({
        ...config,
        theme: {
          ...config.theme,
          light: { ...config.theme.light, accent: "#fff" },
        },
      } as unknown as SiteConfig),
    /theme\.light\.accent must be a six-digit sRGB hex color/,
  );
});

test("requires black or white accent labels", () => {
  assert.throws(
    () =>
      validateSiteConfig({
        ...config,
        theme: {
          ...config.theme,
          light: { ...config.theme.light, accentLabel: "#fffffe" },
        },
      } as unknown as SiteConfig),
    /theme\.light\.accentLabel must be #000000 or #ffffff/,
  );
});

test("requires the accent label preferred by APCA", () => {
  assert.throws(
    () =>
      validateSiteConfig({
        ...config,
        theme: {
          ...config.theme,
          light: { ...config.theme.light, accentLabel: "#000000" },
        },
      }),
    /theme\.light\.accentLabel must be #ffffff .* according to APCA/,
  );
});

test("requires WCAG 4.5:1 accent contrast", () => {
  assert.throws(
    () =>
      validateSiteConfig({
        ...config,
        theme: {
          ...config.theme,
          light: { ...config.theme.light, accent: "#1689ff" },
        },
      }),
    /theme\.light\.accent must be adjusted .* WCAG 4\.5:1/,
  );
});
