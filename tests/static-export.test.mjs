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
  assert.deepEqual(stock, ["/assets/service-asphalt.jpg"], "only the hero may use a stock image");
  const assets = await readdir(new URL("public/assets/", repoRoot));
  for (const name of realPhotos) {
    assert.ok(home.includes(`/assets/${name}.jpg`), `${name}.jpg should appear on the home page`);
    assert.ok(assets.includes(`${name}.jpg`), `${name}.jpg should be committed`);
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
