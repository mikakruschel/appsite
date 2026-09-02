# Legacy-site migration

Read when an existing product website is being researched, repurposed, or replaced.

## Preserve visitor value

- Preserve decision-relevant value, not the old layout. Inventory the primary differentiator, workflow demonstration, material proof, purchase-objection resolution, and primary conversion action.
- Classify each core or supporting module as `map`, `extend`, or `omit`. Name its target component or bounded extension. Give a reason for every core or supporting omission and every extension.
- Optional legacy content may be omitted without replacement. Never silently flatten a core module into generic copy, an icon-only summary, or a placeholder when usable source proof exists.
- Reserve bounded extensions for core modules unless the user explicitly requires a supporting module. Anything larger is a redesign, not initialization or build work.

## Initialization default

Initialization replaces the live product site. Treat its origin as legacy and unavailable after deployment. A reachable page, matching product identity, canonical tag, or App Store website/support URL does not preserve it.

Copy or edit supported product value into the new site. Do not add the legacy homepage to navigation, footer, developer attribution, canonical metadata, structured data, or public legal-source notes.

Resolve every visitor-facing same-origin destination to one of:

- an implemented local route, file, or intentional redirect;
- a verified durable external destination on a different origin;
- a verified direct action such as `mailto:`;
- omission with a recorded reason.

Inspect support and contact pages rather than preserving wrappers blindly. If an old support page only exposes a verified email address, use a direct contact action or local route. Keep a distinct help center or documentation destination only when it uses a separate origin that will remain available, or migrate its route.

Legal migration follows [legal.md](legal.md) independently of origin replacement.

## Same-repository exception

Skip legacy migration only when explicit user direction or repository/deployment evidence proves the live URL is another deployment of the current repository. Visual similarity and shared product identity are not proof.

Record the evidence in the brief. Normalize internal links to local routes. Canonical metadata may use the verified deployment URL, but do not add a generic navigation or footer link from the site back to itself.
