import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { parse, stringify } from "yaml";
import { validateSiteContent } from "./validator.ts";

const exampleUrl = new URL("../../SITE_CONTENT.example.yaml", import.meta.url);

test("the example is a valid build handoff", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const result = validateSiteContent(source);

  assert.deepEqual(result.findings, []);
});

test("video hero media requires an image poster", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.hero.media = {
    kind: "video",
    source: "src/assets/videos/daymark-overview.mp4",
    alt: "Daymark daily planning walkthrough",
  };

  const result = validateSiteContent(stringify(content));

  assert(
    result.findings.some(
      (finding) =>
        finding.rule === "schema" &&
        finding.path === "homepage.hero.media.poster",
    ),
  );
});

test("video hero media accepts a repository-local source and poster", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.hero.media = {
    kind: "video",
    source: "src/assets/videos/daymark-overview.mp4",
    poster: "src/assets/screenshots/daymark-video-poster.webp",
    alt: "Daymark daily planning walkthrough",
  };

  assert.deepEqual(validateSiteContent(stringify(content)).findings, []);
});

test("an active action without a URL is an error", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const result = validateSiteContent(
    source.replace(
      /\n      url: https:\/\/apps\.apple\.com\/app\/daymark\/id1234567890/u,
      "",
    ),
  );

  assert(
    result.findings.some(
      (finding) =>
        finding.severity === "error" &&
        finding.path === "homepage.hero.action.url",
    ),
  );
});

test("card descriptions warn above 80 visible characters", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.featureCards.items[0].description = "a".repeat(81);
  const result = validateSiteContent(stringify(content));

  assert(
    result.findings.some(
      (finding) =>
        finding.severity === "warning" &&
        finding.rule === "copy-length" &&
        finding.path === "homepage.featureCards.items[0].description",
    ),
  );

  content.homepage.featureCards.items[0].description = "a".repeat(80);
  const resultAtLimit = validateSiteContent(stringify(content));
  assert.equal(
    resultAtLimit.findings.some(
      (finding) =>
        finding.rule === "copy-length" &&
        finding.path === "homepage.featureCards.items[0].description",
    ),
    false,
  );
});

test("unknown workflow fields are rejected", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const contentWithStage = `stage: edited\n${source}`;

  assert(
    validateSiteContent(contentWithStage).findings.some(
      (finding) => finding.rule === "schema" && finding.path === "",
    ),
  );
});

test("exact starter residuals in copy fields are rejected", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const cases = [
    {
      path: "metadata.description",
      value:
        "A calm, fictional daily planning app used to demonstrate this app landing-page template.",
    },
    {
      path: "homepage.faq.heading",
      value: "The essentials, thoughtfully covered",
    },
    {
      path: "homepage.hero.tagline",
      value:
        "Orbit turns tasks, notes, and routines into a clear plan you can actually follow.",
    },
    {
      path: "homepage.hero.action.supportingNote",
      value: "Contact Demo Studio at hello@example.com.",
    },
    {
      path: "homepage.featureCards.items[0].title",
      value: "See the day clearly",
    },
    {
      path: "homepage.proof.testimonials.items[0].quote",
      value:
        "Orbit gives me one calm view of the day instead of another complicated system to maintain.",
    },
    {
      path: "homepage.faq.items[0].question",
      value: "Is Orbit free to try?",
    },
  ];

  for (const testCase of cases) {
    const content = parse(source);
    const segments = testCase.path.match(/[^.[\]]+/gu) ?? [];
    let target = content;

    for (const segment of segments.slice(0, -1)) {
      target = target[segment];
    }
    target[segments.at(-1)!] = testCase.value;

    const result = validateSiteContent(stringify(content));
    assert(
      result.findings.some(
        (finding) =>
          finding.rule === "starter-placeholder" &&
          finding.path === testCase.path,
      ),
      `expected starter residual at ${testCase.path}`,
    );
  }
});

test("testimonial quotes must contain 15 to 45 words", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const validQuote =
    "I can finally see appointments and tasks together without maintaining a complicated planning system each day.";
  const invalidQuotes = [
    "Too short to publish.",
    Array.from({ length: 46 }, (_, index) => `word${index}`).join(" "),
  ];

  for (const quote of invalidQuotes) {
    const sourceWithInvalidQuote = source.replace(validQuote, quote);
    assert.notEqual(sourceWithInvalidQuote, source);

    const result = validateSiteContent(sourceWithInvalidQuote);
    assert(
      result.findings.some(
        (finding) =>
          finding.rule === "testimonial-length" &&
          finding.path === "homepage.proof.testimonials.items[0].quote",
      ),
    );
  }
});

test("copy limits count visible characters", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const sourceWithEmojiLabel = source.replace(
    "buttonLabel: Download Daymark",
    `buttonLabel: ${"👨‍👩‍👧‍👦".repeat(36)}`,
  );
  assert.notEqual(sourceWithEmojiLabel, source);

  const result = validateSiteContent(sourceWithEmojiLabel);

  assert.equal(
    result.findings.some(
      (finding) =>
        finding.rule === "copy-length" &&
        finding.path === "homepage.closingCta.buttonLabel",
    ),
    false,
  );
});

test("em dashes in visitor copy produce a warning", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.featureCards.items[0].description =
    "Write equations or sketch by hand—then review the right cards.";

  const result = validateSiteContent(stringify(content));

  assert(
    result.findings.some(
      (finding) =>
        finding.severity === "warning" &&
        finding.rule === "em-dash" &&
        finding.path === "homepage.featureCards.items[0].description",
    ),
  );
});

test("component grids reject unsupported item counts", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const cases = [
    {
      path: "homepage.featureCards.items",
      mutate(content: any) {
        content.homepage.featureCards.items.length = 2;
      },
    },
    {
      path: "homepage.valueCards.items",
      mutate(content: any) {
        content.homepage.valueCards.items.length = 1;
      },
    },
    {
      path: "homepage.capabilities.items",
      mutate(content: any) {
        content.homepage.capabilities.items.push(
          content.homepage.capabilities.items[0],
        );
      },
    },
  ];

  for (const testCase of cases) {
    const content = parse(source);
    testCase.mutate(content);
    const result = validateSiteContent(stringify(content));

    assert(
      result.findings.some(
        (finding) =>
          finding.severity === "error" &&
          finding.rule === "component-count" &&
          finding.path === testCase.path,
      ),
    );
  }
});

test("component grids accept supported item counts", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.valueCards.items.length = 2;
  content.homepage.featureCards.items.push(
    content.homepage.featureCards.items[0],
    content.homepage.featureCards.items[1],
  );
  content.homepage.capabilities.items.push(
    content.homepage.capabilities.items[0],
    content.homepage.capabilities.items[1],
  );

  const result = validateSiteContent(stringify(content));

  assert.equal(
    result.findings.some((finding) => finding.rule === "component-count"),
    false,
  );

  content.homepage.featureCards.items.push(
    content.homepage.featureCards.items[2],
  );
  const resultWithSixFeatures = validateSiteContent(stringify(content));

  assert.equal(
    resultWithSixFeatures.findings.some(
      (finding) => finding.rule === "component-count",
    ),
    false,
  );
});

test("testimonial carousels require eight to twenty items", async () => {
  const source = await readFile(exampleUrl, "utf8");

  for (const count of [7, 21]) {
    const content = parse(source);
    while (content.homepage.proof.testimonials.items.length < count) {
      content.homepage.proof.testimonials.items.push(
        content.homepage.proof.testimonials.items[0],
      );
    }
    content.homepage.proof.testimonials.items.length = count;

    const result = validateSiteContent(stringify(content));
    assert(
      result.findings.some(
        (finding) =>
          finding.severity === "error" &&
          finding.rule === "component-count" &&
          finding.path === "homepage.proof.testimonials.items",
      ),
    );
    assert(result.content, "count policy should not fail schema parsing");
  }
});

test("testimonial carousels accept eight to twenty items", async () => {
  const source = await readFile(exampleUrl, "utf8");

  for (const count of [8, 20]) {
    const content = parse(source);
    while (content.homepage.proof.testimonials.items.length < count) {
      content.homepage.proof.testimonials.items.push(
        content.homepage.proof.testimonials.items[0],
      );
    }
    content.homepage.proof.testimonials.items.length = count;

    const result = validateSiteContent(stringify(content));
    assert.equal(
      result.findings.some(
        (finding) =>
          finding.rule === "component-count" &&
          finding.path === "homepage.proof.testimonials.items",
      ),
      false,
    );
  }
});

test("proof headings must not contain numbers", async () => {
  const source = await readFile(exampleUrl, "utf8");
  for (const heading of ["A 4.8-rated study tool", "Rated by 1,242 learners"]) {
    const content = parse(source);
    content.homepage.proof.heading = heading;
    const result = validateSiteContent(stringify(content));

    assert(
      result.findings.some(
        (finding) =>
          finding.severity === "error" &&
          finding.rule === "numeric-proof-heading" &&
          finding.path === "homepage.proof.heading",
      ),
    );
  }

  const content = parse(source);
  content.homepage.proof.heading = "What learners say";
  const resultWithoutNumber = validateSiteContent(stringify(content));
  assert.equal(
    resultWithoutNumber.findings.some(
      (finding) => finding.rule === "numeric-proof-heading",
    ),
    false,
  );
});

test("section headings must not end with a period", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const cases = [
    {
      path: "homepage.featureCards.heading",
      mutate(content: any) {
        content.homepage.featureCards.heading = "Primary study features.";
      },
    },
    {
      path: "homepage.valueCards.heading",
      mutate(content: any) {
        content.homepage.valueCards.heading = "Why learners choose it.";
      },
    },
    {
      path: "homepage.capabilities.heading",
      mutate(content: any) {
        content.homepage.capabilities.heading = "More ways to study.";
      },
    },
    {
      path: "homepage.proof.heading",
      mutate(content: any) {
        content.homepage.proof.heading = "What learners say.";
      },
    },
    {
      path: "homepage.faq.heading",
      mutate(content: any) {
        content.homepage.faq.heading = "Good to know.";
      },
    },
  ];

  for (const testCase of cases) {
    const content = parse(source);
    testCase.mutate(content);
    const result = validateSiteContent(stringify(content));

    assert(
      result.findings.some(
        (finding) =>
          finding.severity === "error" &&
          finding.rule === "section-heading-punctuation" &&
          finding.path === testCase.path,
      ),
    );
  }
});

test("repeated-card icons must be unique across value cards and capabilities", async () => {
  const source = await readFile(exampleUrl, "utf8");
  const content = parse(source);
  content.homepage.capabilities.items[0].icon =
    content.homepage.valueCards.items[1].icon;

  const result = validateSiteContent(stringify(content));

  assert(
    result.findings.some(
      (finding) =>
        finding.severity === "error" &&
        finding.rule === "duplicate-icon" &&
        finding.path === "homepage.capabilities.items[0].icon" &&
        finding.message.includes("homepage.valueCards.items[1].icon"),
    ),
  );
});

test("FAQ sections require three to seven questions", async () => {
  const source = await readFile(exampleUrl, "utf8");

  for (const count of [2, 8]) {
    const content = parse(source);
    while (content.homepage.faq.items.length < count) {
      content.homepage.faq.items.push(content.homepage.faq.items[0]);
    }
    content.homepage.faq.items.length = count;

    const result = validateSiteContent(stringify(content));
    assert(
      result.findings.some(
        (finding) =>
          finding.severity === "error" &&
          finding.rule === "component-count" &&
          finding.path === "homepage.faq.items",
      ),
    );
  }

  const contentWithSevenQuestions = parse(source);
  while (contentWithSevenQuestions.homepage.faq.items.length < 7) {
    contentWithSevenQuestions.homepage.faq.items.push(
      contentWithSevenQuestions.homepage.faq.items[0],
    );
  }

  const validResult = validateSiteContent(stringify(contentWithSevenQuestions));
  assert.equal(
    validResult.findings.some(
      (finding) =>
        finding.rule === "component-count" &&
        finding.path === "homepage.faq.items",
    ),
    false,
  );
});
