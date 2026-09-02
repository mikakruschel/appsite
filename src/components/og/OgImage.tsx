import { ogIconSrc } from "@/lib/og-assets";
import type { ThemePalette } from "@/lib/site.types";

export type OgImageProps = {
  appName: string;
  headline: string;
  tagline: string;
  screenshotSrc?: string;
  theme: ThemePalette;
};

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function toDataUri(src: string) {
  return src.startsWith("data:") ? src : `data:image/png;base64,${src}`;
}

export default function OgImage({
  appName,
  headline,
  tagline,
  screenshotSrc,
  theme,
}: OgImageProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "56px 64px",
        background: theme.background,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "10px",
          background: theme.accent,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "48px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={toDataUri(ogIconSrc)}
              width={96}
              height={96}
              style={{ borderRadius: "22px", flexShrink: 0 }}
            />
            <div
              style={{
                fontSize: 44,
                fontWeight: 700,
                color: theme.label,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {appName}
            </div>
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: theme.label,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            {truncate(headline, 42)}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: theme.labelSecondary,
              lineHeight: 1.35,
            }}
          >
            {truncate(tagline, 100)}
          </div>
        </div>
        {screenshotSrc && (
          <img
            src={toDataUri(screenshotSrc)}
            width={480}
            height={518}
            style={{
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
