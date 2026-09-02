# Media and brand contract

Read when the workflow touches the app icon, screenshots, video, placeholders, or theme colors.

## Icon and media authority

- Replace the template icon. The current successful matching App Store scraper artifact `icon` is authoritative by default. Publish it from a repository-local asset; do not hotlink an App Store or website CDN from `AppIcon`, layout, favicon, metadata, or Open Graph code. Override it only with an explicit current-user choice of another current first-party icon and record the source and reason. Without a usable matching artifact, use a verified first-party fallback. Unreleased apps may use recorded provisional first-party artwork.
- `src/assets/app/placeholder-app-icon.png` is starter-only artwork. When a usable target-app icon is available, replace it on every published identity surface, including visible app icons, favicon, Apple touch icon, and Open Graph artwork. Do not publish `placeholder-app-icon` or `placeholder-favicon`; preserve or convert the selected source format as needed.
- Classify source media independently as `final`, `provisional`, or `reference-only`. `reference-only` never publishes. Classify each page slot separately as `final`, `provisional`, or `placeholder`.
- Before copying, renaming, classifying, or assigning any screenshot, open the image and inspect its pixels at a legible size. Array order, URL shape, metadata position, and a filename chosen before inspection are not visual evidence. Name downloaded files only after inspection, from the screen or state they actually show. If image inspection is unavailable, do not publish a newly selected screenshot as final; use the neutral placeholder and record the missing inspection.
- Record every proposed hero and feature-card mapping with the device family and source index or URL, local path, visible app screen or state, visible embedded claims, target slot, and the reason that state supports the slot. The primary visible state must directly demonstrate the slot's title or description. General product branding or a merely adjacent workflow is not enough.
- Prefer raw UI. Publish promotional composites only when embedded claims are verified, the product remains legible, and the rendered crop works.
- Inspect every relevant App Store device-family array before choosing media. Prefer media because its composition and demonstrated state fit the named slot, never because it has more pixels. Record the family and slot-specific reason.
- Reuse suitable verified first-party screenshots or rendered demos from the current product site before requesting new captures or using placeholders.
- Inspect each selected image again beside its final title and description. Reject or remap a screenshot when the visible state does not support that copy. Reject a promotional composite when an unsupported embedded claim is visible in any required rendered viewport.

## Hero and replacement handoffs

- Every initialized homepage has hero media. Use the strongest suitable target-app image or video.
- `HeroSection` layout describes page composition, not screenshot orientation. `horizontal` is side-by-side at large widths and normally fits tall or mobile-first media. `vertical` places media below copy and normally fits wide desktop or Mac media. Choose from the rendered hierarchy.
- Without suitable real hero media, keep the neutral template placeholder with empty alt text.
- Every provisional or placeholder slot needs an internal code TODO, repo-relative replacement path, and capture brief naming platform, screen or state, safe example content, crop or orientation, and the current deficiency. Never show replacement status to visitors.
- A documented placeholder is a normal handoff. It becomes a finding only when suitable verified media was ignored, the page presents it as final, or publication with it is explicitly in scope.
- Video needs one coherent treatment: assistive label and poster; muted looping autoplay in ordinary mode; native controls instead of autoplay under reduced motion; captions or equivalent adjacent text when needed.

## Accent selection

`theme.accent` is the template's always-visible control, link, and emphasis color. Record the exact source token and semantic role.

Choose the hue anchor in order:

1. Exact user-supplied color.
2. Current first-party homepage primary conversion background, then repeated normal-load accent treatment, then selected navigation highlight.
3. The current app target's exact bound global accent or repeated user-visible semantic accent from a matching codebase research artifact.
4. The distinctive mark in the verified App Store icon.
5. Intentional neutral branding.

Ordinary text, header or footer fields, large section backgrounds, embedded media, App Store badges, and interaction-only colors are not accent evidence. Never infer a color from Apple artwork URL segments such as `Purple` or numeric suffixes.

Apple `templatizedArtwork.bgColor` describes the icon field. Record it when useful, but do not treat it as the landing-page accent without independent semantic support.

Website evidence uses the exact computed color when available. Icon fallback uses a representative stable midtone from the distinctive mark, not a highlight, shadow, complementary invention, or neutral squircle field unless that field is itself the brand.

Codebase evidence requires an active target binding or repeated user-visible semantic role. Preserve its declared color space. Convert a non-sRGB source deterministically before writing the required six-digit sRGB landing-page token, and record both values. Never reinterpret raw Display P3 components as sRGB or promote an unbound palette value.

## Theme pairs

Treat each theme's `accent` and `accentLabel` as a pair.

- Write `accent` and `accentLabel` as exact six-digit sRGB hex values; `defineSiteConfig` rejects other formats. Never substitute a representative color or convert by eye.
- Require WCAG 2.2 AA for the actual text size and weight. Use 4.5:1 for normal text and 3:1 only for WCAG large-scale text.
- Run `pnpm check:contrast <accent-hex>` and use the exact black-or-white label it returns unless first-party treatment or explicit user direction supports the other.
- Require the selected pair to pass WCAG. If it fails, make the smallest accent lightness and then chroma adjustment that preserves the recorded hue family; do not switch the returned polarity merely because the other label has a higher WCAG ratio. Re-run the command after every adjustment, and use two-argument `pnpm check:contrast <text-hex> <background-hex>` to check accent text and links against page backgrounds.
- Resolve light and dark themes separately. Record the chosen pair, WCAG ratio, APCA Lc, tested font size and weight, and any change from the source token.

WCAG remains the conformance requirement; APCA chooses the preferred polarity.

## Repeated-card icons

Each repeated card needs a distinct icon that names its core concept. Do not reuse a convenient import or a generic `Info`, `Target`, `Globe`, `Cog`, palette, or document symbol for unrelated ideas. Import a better Lucide icon when needed.
