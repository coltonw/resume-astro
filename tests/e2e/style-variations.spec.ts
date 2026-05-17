// Generates one screenshot per candidate style for visual comparison.
// Each variation is injected via Playwright as a CSS overlay — the actual
// global.css is untouched. Output: tests/screenshots/styles/*.png
import { test } from '@playwright/test';

interface Variation {
  name: string;
  css: string;
}

const variations: Variation[] = [
  {
    name: '00-current',
    css: '',
  },
  {
    name: '01-editorial-serif',
    // Long-form magazine feel: serif body, slightly tighter headings, more
    // breathing room around paragraphs.
    css: `
      body, main { font-family: 'Charter','Iowan Old Style','Source Serif Pro','Georgia',serif; }
      h1, h2 { font-family: 'Charter','Georgia',serif; letter-spacing: -0.01em; }
      main { font-size: 18px; line-height: 1.7; }
      p { line-height: 1.7; }
      h1 { font-size: 1.875rem; }
      h2 { font-weight: 800; }
    `,
  },
  {
    name: '02-terminal-mono',
    // Programmer-portfolio aesthetic: monospace everything, tight, monochrome.
    css: `
      *, h1, h2, p, a { font-family: 'JetBrains Mono','Menlo','Consolas',monospace !important; }
      main { font-size: 15px; }
      h1 { text-transform: uppercase; letter-spacing: 0.04em; font-size: 1.25rem; }
      h2 { text-transform: uppercase; letter-spacing: 0.04em; font-size: 0.95rem; }
      a { text-decoration: underline; text-underline-offset: 3px; }
    `,
  },
  {
    name: '03-cards',
    // Each section gets its own subtle card with a bit of padding and a
    // soft shadow. Background goes slightly off-white for contrast.
    css: `
      body { background: #fafaf9; }
      main { background: transparent; }
      main > section {
        background: #fff;
        padding: 1.25rem 1.5rem;
        margin: 1rem 0;
        border-radius: 10px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
        border: 1px solid #e7e5e4;
      }
      main > section h1 { margin-top: 0; }
    `,
  },
  {
    name: '04-dark-amber',
    // Dark warm theme with a single amber accent for links / highlights.
    css: `
      :root, html, body { background: #1c1917; }
      body, main { color: #e7e5e4; }
      .text-stone-800, .text-stone-700, .text-stone-600 { color: #e7e5e4 !important; }
      .font-black, .font-bold { color: #f5f5f4 !important; }
      .bg-stone-100, .bg-stone-200 { background: #292524 !important; }
      .border-stone-200 { border-color: #44403c !important; }
      .border-stone-400 { border-color: #57534e !important; }
      a { color: #fbbf24 !important; text-decoration: none; }
      a:hover { text-decoration: underline; }
      code { background: #292524 !important; color: #fbbf24 !important; }
      h1, h2 { color: #fafaf9 !important; }
    `,
  },
];

for (const v of variations) {
  test(`style: ${v.name}`, async ({ page }) => {
    await page.goto('/');
    if (v.css) {
      await page.addStyleTag({ content: v.css });
    }
    await page.waitForLoadState('networkidle');
    // Pause briefly so any layout from the injected CSS settles.
    await page.waitForTimeout(150);
    await page.screenshot({
      fullPage: true,
      animations: 'disabled',
      path: `tests/screenshots/styles/${v.name}.png`,
    });
  });
}
