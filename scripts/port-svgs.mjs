#!/usr/bin/env node
// Convert resume-sveltekit SVG components to Astro components.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = '/home/willcolton/resume-sveltekit/src/lib/svgs';
const DEST = '/home/willcolton/resume-astro/src/components/svgs';

await mkdir(DEST, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith('.svelte'));
for (const file of files) {
  const text = await readFile(join(SRC, file), 'utf8');
  // Strip the <script> block — all SVGs follow `<script lang="ts">…className…</script>` shape.
  const svgMatch = text.match(/<svg[\s\S]*<\/svg\s*>/);
  if (!svgMatch) throw new Error(`No svg in ${file}`);
  let svg = svgMatch[0];
  // Replace `class={className}` with `class={className}` Astro-style.
  svg = svg.replace(/class=\{className\}/, 'class:list={[className]}');
  const out = `---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---

${svg}
`;
  const name = file.replace(/\.svelte$/, '.astro');
  await writeFile(join(DEST, name), out);
}
console.log(`Ported ${files.length} SVGs`);
