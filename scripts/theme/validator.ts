import { calcAPCA } from "apca-w3";
import type {
  AccentLabel,
  HexColor,
  SiteConfig,
} from "../../src/lib/site.types.ts";

export function validateSiteConfig(config: SiteConfig): void {
  for (const scheme of ["light", "dark"] as const) {
    const { accent, accentLabel } = config.theme[scheme];
    if (!/^#[\da-f]{6}$/i.test(accent)) {
      throw new Error(
        `theme.${scheme}.accent must be a six-digit sRGB hex color`,
      );
    }
    if (!["#000000", "#ffffff"].includes(accentLabel)) {
      throw new Error(`theme.${scheme}.accentLabel must be #000000 or #ffffff`);
    }
    const expectedLabel = ["#000000", "#ffffff"].reduce((best, candidate) =>
      Math.abs(calcAPCA(candidate, accent)) > Math.abs(calcAPCA(best, accent))
        ? candidate
        : best,
    ) as AccentLabel;
    if (accentLabel !== expectedLabel) {
      throw new Error(
        `theme.${scheme}.accentLabel must be ${expectedLabel} for ${accent} according to APCA`,
      );
    }
    if (wcagContrast(accentLabel, accent) < 4.5) {
      throw new Error(
        `theme.${scheme}.accent must be adjusted until ${accentLabel} reaches WCAG 4.5:1`,
      );
    }
  }
}

function wcagContrast(first: HexColor, second: HexColor): number {
  const luminance = (color: HexColor) => {
    const channels = color
      .slice(1)
      .match(/../g)!
      .map((part) => parseInt(part, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const values = [luminance(first), luminance(second)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}
