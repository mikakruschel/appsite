// Apple's dataOnly endpoint requires the numeric storefront and language in a
// request header. Keep these values explicit so a regional URL never silently
// returns US pricing or metadata.
const storefrontHeaders: Record<string, string> = {
  au: "143460,29",
  br: "143503-15,29",
  ca: "143455-6,29",
  cn: "143465-19,29",
  de: "143443-4,29",
  dk: "143458-2,29",
  es: "143454-8,29",
  fi: "143447-2,29",
  fr: "143442-3,29",
  gb: "143444,29",
  gr: "143448-2,29",
  hk: "143463-18,29",
  id: "143476-2,29",
  it: "143450-7,29",
  jp: "143462-9,29",
  kr: "143466-13,29",
  mx: "143468-28,29",
  nl: "143452-10,29",
  no: "143457-2,29",
  pt: "143453-24,29",
  ru: "143469-16,29",
  se: "143456-17,29",
  th: "143475-2,29",
  tr: "143480-2,29",
  tw: "143470-18,29",
  us: "143441-1,29",
  vn: "143471-2,29",
};

export const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

export type AppStoreCliOptions = {
  input: string;
  countryOption?: string;
  outPath?: string;
};

export const resolveAppStoreAppID = (input: string) => {
  let appID: string | undefined;
  let countryFromURL: string | undefined;

  try {
    const url = new URL(input);
    if (url.hostname !== "apps.apple.com") {
      fail("App Store URLs must use apps.apple.com");
    }

    appID = url.pathname.match(/\/id(\d+)(?:\/|$)/)?.[1];
    const firstSegment = url.pathname.split("/").filter(Boolean)[0];
    countryFromURL = /^[a-z]{2}$/i.test(firstSegment ?? "")
      ? firstSegment?.toLowerCase()
      : undefined;
  } catch (error) {
    if (error instanceof TypeError) appID = input.match(/^\d+$/)?.[0];
    else throw error;
  }

  const resolvedAppID =
    appID ?? fail(`Could not determine an App Store app ID from: ${input}`);

  return { resolvedAppID, countryFromURL };
};

export const parseAppStoreCli = (
  args: string[],
  help: string,
): AppStoreCliOptions => {
  if (args.length === 1 && (args[0] === "--help" || args[0] === "-h")) {
    process.stdout.write(`${help}\n`);
    process.exit(0);
  }

  const input = args[0];
  if (!input || input.startsWith("--")) fail(help);

  let countryOption: string | undefined;
  let outPath: string | undefined;

  for (let index = 1; index < args.length; index += 1) {
    const name = args[index];
    if (name !== "--country" && name !== "--out") {
      fail(`Unknown argument: ${name}`);
    }

    const value = args[index + 1];
    if (!value || value.startsWith("--")) fail(`Missing value for ${name}`);

    if (name === "--country") {
      if (countryOption) fail("Duplicate --country option");
      countryOption = value;
    } else {
      if (outPath) fail("Duplicate --out option");
      outPath = value;
    }

    index += 1;
  }

  return { input, countryOption, outPath };
};

export const resolveAppStoreTarget = (options: AppStoreCliOptions) => {
  const { resolvedAppID, countryFromURL } = resolveAppStoreAppID(options.input);

  const country = (
    options.countryOption ??
    countryFromURL ??
    "us"
  ).toLowerCase();
  if (!/^[a-z]{2}$/.test(country)) {
    fail(`Invalid App Store country code: ${country}`);
  }

  const storefrontHeader =
    storefrontHeaders[country] ??
    fail(
      `The dataOnly scraper does not have a storefront mapping for: ${country}`,
    );

  return { resolvedAppID, country, storefrontHeader };
};

export type AppStoreDataOnlyResult = {
  data: any;
  product: any;
  dataOnlyURL: URL;
  resolvedAppID: string;
  country: string;
  storefrontHeader: string;
};

export const fetchAppStoreDataOnly = async (
  options: AppStoreCliOptions,
): Promise<AppStoreDataOnlyResult> => {
  const { resolvedAppID, country, storefrontHeader } =
    resolveAppStoreTarget(options);

  const dataOnlyURL = new URL(
    `https://apps.apple.com/${country}/app/id${resolvedAppID}`,
  );
  dataOnlyURL.searchParams.set("dataOnly", "true");
  dataOnlyURL.searchParams.set("displayable-kind", "11");

  const response = await fetch(dataOnlyURL, {
    headers: { "X-Apple-Store-Front": storefrontHeader },
  }).catch((error) =>
    fail(`Failed to reach the App Store dataOnly service: ${String(error)}`),
  );

  if (!response.ok) {
    fail(`App Store dataOnly request failed with HTTP ${response.status}`);
  }

  let data: any;
  try {
    data = JSON.parse(await response.text());
  } catch {
    fail("App Store dataOnly returned an unexpected non-JSON response");
  }

  const results = Object.values(data.storePlatformData ?? {}).flatMap(
    (platform: any) => Object.values(platform?.results ?? {}),
  );
  const product: any =
    results.find((candidate: any) => String(candidate?.id) === resolvedAppID) ??
    results[0];

  if (!product) {
    fail(
      `No App Store product found for app ID ${resolvedAppID} in country ${country}`,
    );
  }

  return {
    data,
    product,
    dataOnlyURL,
    resolvedAppID,
    country,
    storefrontHeader,
  };
};
