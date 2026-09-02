# Site-content handoff

`APP_BRIEF.md` is the durable evidence and decision record. Visitor-facing page content lives temporarily in `app-input/site-content.yaml` during copy and initialization.

The YAML file is not runtime content and is intentionally ignored with the rest of `app-input/`. The build phase maps its checked content into the Astro source. It remains canonical through the post-build critique and every accepted initialization fix. After initialization is complete, the implementation becomes the public-copy source of truth; routine or user-authored edits do not need to update the old YAML handoff.

## Lifecycle

- Collection writes only `APP_BRIEF.md` and leaves any existing YAML handoff untouched.
- Copy writing creates `app-input/site-content.yaml` from the completed brief.
- Copy editing edits and checks that artifact.
- Build maps the checked content into the starter without inventing alternatives.
- Post-build critique is read-only. Implementation drift is fixed by applying the existing YAML value to source. A genuinely new copy decision edits YAML first, reruns its checker, and then rebuilds the affected source.
- Post-initialization copy editing and maintenance edit the implementation and governing brief decisions directly. They ignore `app-input/site-content.yaml` unless a new initialization or explicit wholesale rewrite recreates it.

## Format and checks

Use [`SITE_CONTENT.example.yaml`](../../../SITE_CONTENT.example.yaml) as the complete shape. The executable schema is `scripts/site-content/schema.ts`.

Run:

```sh
pnpm validate:site-content app-input/site-content.yaml
```

The YAML contains only renderable content. Do not put workflow state, evidence references, research notes, open questions, or omitted-section explanations in it. Leave an optional homepage section out when it should not render. Keep evidence and unresolved questions in the brief or the agent's report.

The checker reports:

- errors for malformed or unknown fields, missing required content, invalid CTA state, invalid component counts, numeric proof headings, period-terminated section headings, and known placeholder text;
- warnings for em dashes in visitor copy and when compact UI copy exceeds a suggested character limit. Copy-length warnings are limited to the hero headline, button labels, and card titles or descriptions.

Errors block the phase. Warnings require an explicit copy or composition decision; they are not automatic failures. Do not change component geometry merely to silence a copy-length warning.

YAML formatting is not enforced. Any syntactically valid representation of the schema is accepted.

Hero image media requires `kind`, `source`, and `alt`. Hero video media also
requires a repository-local image `poster`:

```yaml
media:
  kind: video
  source: src/assets/videos/product-overview.mp4
  poster: src/assets/screenshots/product-overview-poster.webp
  alt: Product overview showing the main planning workflow
```

The checker cannot decide whether copy is true, natural, or effective. The fresh copy editor is the qualitative approval gate before build. The independent critic reviews it again in the rendered site after build.
