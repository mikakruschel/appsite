import { calcAPCA } from "apca-w3";

type RGB = [number, number, number];

const [first, second] = process.argv.slice(2);

function parseColor(value: string | undefined): { color: string; rgb: RGB } {
  const hex = /^#?([\da-f]{6})$/i.exec(value ?? "")?.[1];
  if (!hex) throw new Error(`Expected a 6-digit hex color, received: ${value}`);

  return {
    color: `#${hex}`,
    rgb: [0, 2, 4].map(
      (offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255,
    ) as RGB,
  };
}

function wcagY([r, g, b]: RGB): number {
  const linear = [r, g, b].map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function measure(text: string | undefined, background: string | undefined) {
  const textColor = parseColor(text);
  const backgroundColor = parseColor(background);
  const light = Math.max(wcagY(textColor.rgb), wcagY(backgroundColor.rgb));
  const dark = Math.min(wcagY(textColor.rgb), wcagY(backgroundColor.rgb));
  return {
    apca: calcAPCA(textColor.color, backgroundColor.color),
    wcag: (light + 0.05) / (dark + 0.05),
  };
}

try {
  if (!second) {
    const candidates = ["#000000", "#ffffff"].map((text) => ({
      text,
      ...measure(text, first),
    }));
    for (const candidate of candidates) {
      console.log(
        `${candidate.text} WCAG ${candidate.wcag.toFixed(2)}:1 APCA Lc ${candidate.apca.toFixed(2)}`,
      );
    }
    const choice = candidates.reduce((best, candidate) =>
      Math.abs(candidate.apca) > Math.abs(best.apca) ? candidate : best,
    );
    console.log(`Use ${choice.text}`);
  } else {
    const result = measure(first, second);
    console.log(`WCAG ${result.wcag.toFixed(2)}:1`);
    console.log(`APCA Lc ${result.apca.toFixed(2)}`);
  }
} catch (caught) {
  const message = caught instanceof Error ? caught.message : String(caught);
  console.error(
    `Usage: pnpm check:contrast <background-hex> OR <text-hex> <background-hex>\n${message}`,
  );
  process.exitCode = 1;
}
