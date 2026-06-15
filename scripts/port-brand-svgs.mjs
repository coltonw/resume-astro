#!/usr/bin/env node
// Convert simple-icons SVGs to Astro components matching our existing pattern.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC = "/tmp/logos";
const DEST = "/home/willcolton/resume-astro/src/components/svgs";

// Map slug → output filename (PascalCase, no collisions with existing).
const RENAME = {
  bevy: "Bevy",
  biome: "Biome",
  cloudflareworkers: "CloudflareWorkers",
  googlesheets: "GoogleSheets",
  hono: "Hono",
  playwright: "Playwright",
  sharp: "Sharp",
  vite: "Vite",
  webassembly: "WebAssembly",
};

for (const [slug, name] of Object.entries(RENAME)) {
  const raw = await readFile(join(SRC, `${slug}.svg`), "utf8");
  // Strip the <title>, add `class:list={[className]}`.
  const svg = raw
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/role="img"\s*/, "")
    .replace(/<svg /, "<svg class:list={[className]} ");
  const out = `---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---

${svg}
`;
  await writeFile(join(DEST, `${name}.astro`), out);
  console.log(`Wrote ${name}.astro`);
}
