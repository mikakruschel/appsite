import { parseDocument } from "yaml";
import { siteContentSchema, type SiteContent } from "./schema.ts";

export type Finding = {
  severity: "error" | "warning";
  rule: string;
  path: string;
  message: string;
};

export type ValidationResult = {
  content?: SiteContent;
  findings: Finding[];
};

const starterText = [
  // Site identity and metadata.
  "A calm, fictional daily planning app used to demonstrate this app landing-page template.",
  "Make room for a day that works.",
  "Orbit turns tasks, notes, and routines into a clear plan you can actually follow.",
  "The essentials, thoughtfully covered",
  "Orbit is a fictional demo app",
  "Demo Studio",
  "hello@example.com",
  "Lorem ipsum",
  // Homepage headings and product copy.
  "A calmer way to shape your day",
  "Loved by people with full days",
  "Make space for what matters today.",
  "See the day clearly",
  "Turn a busy list into a realistic plan with room to breathe.",
  "Notice your momentum",
  "Simple progress insights show what is moving without turning work into a scoreboard.",
  "Keep everything close",
  "Capture tasks, notes, and projects in one focused workspace.",
  "Private by default",
  "Your plans stay yours, with no advertising profiles or attention tracking.",
  "In sync",
  "Pick up on any supported device without managing files or exports.",
  "Designed for focus",
  "A quiet interface keeps the next meaningful action within reach.",
  "Quick capture",
  "Save a thought before it disappears.",
  "Flexible projects",
  "Keep work and personal plans organized.",
  "Gentle reminders",
  "Get a nudge without notification overload.",
  "Works offline",
  "Plan anywhere and sync changes later.",
  "Flexible views",
  "Move between today and the week ahead.",
  "Fast search",
  "Find any task, note, or project in seconds.",
  // Fictional proof and FAQ copy.
  "Orbit gives me one calm view of the day instead of another complicated system to maintain.",
  "I capture an idea on my phone and it is waiting on my Mac when I sit down to work.",
  "The weekly view makes it obvious what deserves my attention and what can wait.",
  "Fast, thoughtful, and refreshingly quiet. It has become part of my morning routine.",
  "Exactly enough structure without getting in my way.",
  "I planned a busy launch week in Orbit and could finally see the breathing room between deadlines.",
  "Simple, quick, and genuinely pleasant to use.",
  "The gentle reminders help me follow through without making every task feel urgent.",
  "Is Orbit free to try?",
  "Yes. The fictional demo app includes a free starter plan, with optional upgrades shown before purchase.",
  "Which devices does it support?",
  "This demo supports iPhone, iPad, and Mac, with changes kept in sync across devices.",
  "Can I use it without an internet connection?",
  "Yes. Your plans remain available offline and synchronize when a connection returns.",
  "Dashboard preview of the fictional Orbit app",
].map((text) => ({ text, lowercase: text.toLowerCase() }));

const graphemeSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});
const cardDescriptionMaximum = 80;

function checkText(
  findings: Finding[],
  path: string,
  value: string,
  maximum?: number,
): void {
  const lowerValue = value.toLowerCase();

  for (const placeholder of starterText) {
    if (lowerValue.includes(placeholder.lowercase)) {
      findings.push({
        severity: "error",
        rule: "starter-placeholder",
        path,
        message: `contains starter text: ${JSON.stringify(placeholder.text)}`,
      });
    }
  }

  if (/\b(?:TODO|TBD|FIXME)\b/u.test(value)) {
    findings.push({
      severity: "error",
      rule: "unfinished-placeholder",
      path,
      message: "contains TODO, TBD, or FIXME",
    });
  }

  if (value.includes("—")) {
    findings.push({
      severity: "warning",
      rule: "em-dash",
      path,
      message: "contains an em dash",
    });
  }

  if (maximum !== undefined) {
    const length = [...graphemeSegmenter.segment(value)].length;
    if (length > maximum) {
      findings.push({
        severity: "warning",
        rule: "copy-length",
        path,
        message: `${length} characters; suggested maximum is ${maximum}`,
      });
    }
  }
}

function checkSectionHeading(
  findings: Finding[],
  path: string,
  value: string,
): void {
  checkText(findings, path, value);

  if (value.endsWith(".")) {
    findings.push({
      severity: "error",
      rule: "section-heading-punctuation",
      path,
      message: "section headings must not end with a period",
    });
  }
}

function checkItemCount(
  findings: Finding[],
  path: string,
  count: number,
  allowedCounts: readonly number[],
): void {
  if (!allowedCounts.includes(count)) {
    findings.push({
      severity: "error",
      rule: "component-count",
      path,
      message: `${count} items; expected ${allowedCounts.join(", ")}`,
    });
  }
}

function checkRepeatedCardIcons(
  findings: Finding[],
  homepage: SiteContent["homepage"],
): void {
  const firstPathByIcon = new Map<string, string>();
  const groups = [
    ["valueCards", homepage.valueCards?.items],
    ["capabilities", homepage.capabilities?.items],
  ] as const;

  for (const [group, items] of groups) {
    if (!items) continue;

    for (const [index, item] of items.entries()) {
      const path = `homepage.${group}.items[${index}].icon`;
      const firstPath = firstPathByIcon.get(item.icon);

      if (firstPath) {
        findings.push({
          severity: "error",
          rule: "duplicate-icon",
          path,
          message: `${JSON.stringify(item.icon)} is already used at ${firstPath}`,
        });
      } else {
        firstPathByIcon.set(item.icon, path);
      }
    }
  }
}

function collectEditorialFindings(content: SiteContent): Finding[] {
  const findings: Finding[] = [];
  const { metadata, homepage } = content;

  checkRepeatedCardIcons(findings, homepage);

  checkText(findings, "metadata.pageTitle", metadata.pageTitle);
  checkText(findings, "metadata.description", metadata.description);

  const { hero } = homepage;
  checkText(findings, "homepage.hero.headline", hero.headline, 70);
  checkText(findings, "homepage.hero.tagline", hero.tagline);
  checkText(findings, "homepage.hero.action.label", hero.action.label, 36);
  if (hero.action.supportingNote) {
    checkText(
      findings,
      "homepage.hero.action.supportingNote",
      hero.action.supportingNote,
    );
  }
  checkText(findings, "homepage.hero.media.alt", hero.media.alt);

  if (homepage.featureCards) {
    checkItemCount(
      findings,
      "homepage.featureCards.items",
      homepage.featureCards.items.length,
      [3, 5, 6],
    );
    checkSectionHeading(
      findings,
      "homepage.featureCards.heading",
      homepage.featureCards.heading,
    );
    for (const [index, item] of homepage.featureCards.items.entries()) {
      const itemPath = `homepage.featureCards.items[${index}]`;
      checkText(findings, `${itemPath}.title`, item.title, 48);
      checkText(
        findings,
        `${itemPath}.description`,
        item.description,
        cardDescriptionMaximum,
      );
    }
  }

  if (homepage.valueCards) {
    checkItemCount(
      findings,
      "homepage.valueCards.items",
      homepage.valueCards.items.length,
      [2, 3],
    );
    if (homepage.valueCards.heading) {
      checkSectionHeading(
        findings,
        "homepage.valueCards.heading",
        homepage.valueCards.heading,
      );
    }
    for (const [index, item] of homepage.valueCards.items.entries()) {
      const itemPath = `homepage.valueCards.items[${index}]`;
      checkText(findings, `${itemPath}.title`, item.title, 48);
      checkText(
        findings,
        `${itemPath}.description`,
        item.description,
        cardDescriptionMaximum,
      );
    }
  }

  if (homepage.capabilities) {
    checkItemCount(
      findings,
      "homepage.capabilities.items",
      homepage.capabilities.items.length,
      [3, 5, 6],
    );
    checkSectionHeading(
      findings,
      "homepage.capabilities.heading",
      homepage.capabilities.heading,
    );
    for (const [index, item] of homepage.capabilities.items.entries()) {
      const itemPath = `homepage.capabilities.items[${index}]`;
      checkText(findings, `${itemPath}.title`, item.title, 48);
      checkText(
        findings,
        `${itemPath}.description`,
        item.description,
        cardDescriptionMaximum,
      );
    }
  }

  if (homepage.proof) {
    checkSectionHeading(
      findings,
      "homepage.proof.heading",
      homepage.proof.heading,
    );
    if (/\p{Number}/u.test(homepage.proof.heading)) {
      findings.push({
        severity: "error",
        rule: "numeric-proof-heading",
        path: "homepage.proof.heading",
        message: "proof headings must not contain numbers",
      });
    }
    if (homepage.proof.testimonials) {
      checkItemCount(
        findings,
        "homepage.proof.testimonials.items",
        homepage.proof.testimonials.items.length,
        Array.from({ length: 13 }, (_, index) => index + 8),
      );
      for (const [index, item] of homepage.proof.testimonials.items.entries()) {
        const itemPath = `homepage.proof.testimonials.items[${index}]`;
        checkText(findings, `${itemPath}.quote`, item.quote);
        checkText(findings, `${itemPath}.author`, item.author);

        const wordCount = item.quote.trim().split(/\s+/u).length;
        if (wordCount < 15 || wordCount > 45) {
          findings.push({
            severity: "error",
            rule: "testimonial-length",
            path: `${itemPath}.quote`,
            message: `${wordCount} words; testimonials must contain 15 to 45`,
          });
        }
      }
    }
  }

  if (homepage.faq) {
    checkItemCount(
      findings,
      "homepage.faq.items",
      homepage.faq.items.length,
      [3, 4, 5, 6, 7],
    );
    checkSectionHeading(findings, "homepage.faq.heading", homepage.faq.heading);
    for (const [index, item] of homepage.faq.items.entries()) {
      const itemPath = `homepage.faq.items[${index}]`;
      checkText(findings, `${itemPath}.question`, item.question);
      checkText(findings, `${itemPath}.answer`, item.answer);
    }
  }

  if (homepage.closingCta) {
    checkText(
      findings,
      "homepage.closingCta.headline",
      homepage.closingCta.headline,
    );
    checkText(
      findings,
      "homepage.closingCta.buttonLabel",
      homepage.closingCta.buttonLabel,
      36,
    );
    if (homepage.closingCta.footnote) {
      checkText(
        findings,
        "homepage.closingCta.footnote",
        homepage.closingCta.footnote,
      );
    }
  }

  return findings;
}

export function validateSiteContent(source: string): ValidationResult {
  const findings: Finding[] = [];
  const document = parseDocument(source, {
    prettyErrors: true,
    uniqueKeys: true,
  });

  if (document.errors.length > 0) {
    for (const parseError of document.errors) {
      findings.push({
        severity: "error",
        rule: "yaml-syntax",
        path: "",
        message: parseError.message,
      });
    }
    return { findings };
  }

  const parsed = siteContentSchema.safeParse(document.toJS());
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      findings.push({
        severity: "error",
        rule: "schema",
        path: issue.path.join("."),
        message: issue.message,
      });
    }
    return { findings };
  }

  findings.push(...collectEditorialFindings(parsed.data));
  return { content: parsed.data, findings };
}
