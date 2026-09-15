import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

// These tests read the static export that `pnpm run build:netlify` writes to
// the "out" directory, which is also the directory netlify.toml publishes.
const outDir = new URL("../out/", import.meta.url);
const repoRoot = new URL("../", import.meta.url);

const servicePages = [
  "asphalt-paving/index.html",
  "sealcoating/index.html",
  "striping-thermoplastic/index.html",
  "driveways/index.html",
  "parking-lots/index.html",
  "patching-repair/index.html",
];

const pages = [
  "index.html",
  "about/index.html",
  "services/index.html",
  "gallery/index.html",
  "contact/index.html",
  "privacy-policy/index.html",
  ...servicePages,
];

const realPhotos = [
  "work-asphalt-paving",
  "work-sealcoating",
  "work-striping",
  "work-driveways",
  "work-parking-lots",
  "work-patching",
];

async function readPage(page) {
  return readFile(new URL(page, outDir), "utf8");
}

function jsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return blocks.map((match) => JSON.parse(match[1]));
}

function typesOf(records) {
  return records.flatMap((record) => [record["@type"]].flat());
}

test("build writes every page into the directory netlify.toml publishes", async () => {
  const netlify = await readFile(new URL("netlify.toml", repoRoot), "utf8");
  assert.match(netlify, /publish = "out"/);
  for (const page of pages) {
    const info = await stat(new URL(page, outDir));
    assert.ok(info.isFile(), `${page} should exist`);
  }
});

test("export includes a sitemap and robots file that agree with the page list", async () => {
  const sitemap = await readFile(new URL("sitemap.xml", outDir), "utf8");
  const robots = await readFile(new URL("robots.txt", outDir), "utf8");
  for (const page of pages) {
    const route = page === "index.html" ? "/" : `/${page.replace("index.html", "")}`;
    assert.ok(sitemap.includes(`<loc>https://fordpaving.com${route}</loc>`), `sitemap is missing ${route}`);
  }
  assert.doesNotMatch(sitemap, /thank-you/);
  assert.match(robots, /Sitemap: https:\/\/fordpaving\.com\/sitemap\.xml/);
  assert.match(robots, /Disallow: \/thank-you\//);
});

test("every page has one canonical URL and a single-brand title", async () => {
  for (const page of pages) {
    const html = await readPage(page);
    const route = page === "index.html" ? "/" : `/${page.replace("index.html", "")}`;
    const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(canonical, [`https://fordpaving.com${route}`], `${page} canonical`);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    assert.equal((title.match(/Ford Paving/g) ?? []).length, 1, `${page} title repeats the brand: ${title}`);
  }
});

test("every page carries LocalBusiness schema plus a WebSite or BreadcrumbList record", async () => {
  for (const page of pages) {
    const types = typesOf(jsonLd(await readPage(page)));
    assert.ok(types.includes("LocalBusiness"), `${page} is missing LocalBusiness schema`);
    if (page === "index.html") {
      assert.ok(types.includes("WebSite"), "home page is missing WebSite schema");
    } else {
      assert.ok(types.includes("BreadcrumbList"), `${page} is missing BreadcrumbList schema`);
    }
  }
});

test("service pages carry a Service record that points back at the business", async () => {
  for (const page of servicePages) {
    const records = jsonLd(await readPage(page));
    const service = records.find((record) => record["@type"] === "Service");
    const business = records.find((record) => [record["@type"]].flat().includes("LocalBusiness"));
    assert.ok(service, `${page} is missing Service schema`);
    assert.equal(service.provider["@id"], business["@id"]);
    assert.match(service.image, /\/assets\/work-/);
  }
});

test("service cards use real job photos, not the stock service set", async () => {
  const home = await readPage("index.html");
  const stock = [...new Set(home.match(/\/assets\/service-[a-z-]+\.jpg/g) ?? [])];
  assert.deepEqual(stock, [], "no stock service images should remain on the home page");
  const assets = await readdir(new URL("public/assets/", repoRoot));
  for (const name of realPhotos) {
    assert.ok(home.includes(`/assets/${name}.jpg`), `${name}.jpg should appear on the home page`);
    assert.ok(assets.includes(`${name}.jpg`), `${name}.jpg should be committed`);
  }
});

test("reviews band and AggregateRating schema appear together or not at all", async () => {
  const home = await readPage("index.html");
  const bandShown = home.includes('class="section reviews-section"');
  const business = jsonLd(home).find((record) => [record["@type"]].flat().includes("LocalBusiness"));
  assert.equal(Boolean(business.aggregateRating), bandShown);
  if (bandShown) {
    assert.ok(business.aggregateRating.reviewCount > 0);
    assert.ok(Array.isArray(business.review) && business.review.length > 0);
    assert.ok((home.match(/class="review-card"/g) ?? []).length === business.review.length);
  }
});

test("rendered copy contains no em dashes or en dashes", async () => {
  for (const page of pages) {
    const html = await readPage(page);
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "");
    const hit = text.match(/[–—]/);
    assert.equal(hit, null, `${page} contains a dash near: ${text.slice(hit?.index - 40, hit?.index + 40)}`);
  }
});

test("app source files contain no em dashes or en dashes", async () => {
  const stack = [new URL("app/", repoRoot)];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const entryUrl = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
      if (entry.isDirectory()) {
        stack.push(entryUrl);
        continue;
      }
      const source = await readFile(entryUrl, "utf8");
      assert.doesNotMatch(source, /[–—]/, `${entry.name} contains a dash`);
    }
  }
});
