#!/usr/bin/env node
// Second pass of brand-SVG porting (astro, deno, fresh, ollama, etc.).
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SRC = "/tmp/logos";
const DEST = "/home/willcolton/resume-astro/src/components/svgs";

const RENAME = {
  astro: "Astro",
  deno: "Deno",
  denodeploy: "DenoDeploy",
  fresh: "Fresh",
  ollama: "Ollama",
  claude: "Claude",
  lancedb: "LanceDB",
  jimp: "Jimp",
};

for (const [slug, name] of Object.entries(RENAME)) {
  const raw = await readFile(join(SRC, `${slug}.svg`), "utf8");
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
