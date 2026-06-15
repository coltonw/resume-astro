# resume-astro — Plan & Decision Log

Reimplementation of Will Colton's side-project museum. The goal is the fastest,
smoothest version yet, replacing the SvelteKit incarnation while keeping the
content identical.

## Stack decision

**Framework: Astro 5 + Svelte 5 islands.**

Why not just stay on SvelteKit?

- The site is 99% static content. SvelteKit ships a runtime (and a router) for
  pages that have zero interactivity. Astro ships **zero JS by default** and
  only hydrates the components that actually need it. This is the single
  biggest lever for "faster and smoother."
- The only interactive component on the entire site is `EmbeddedVideo` (lazy
  load + autoplay on scroll). That becomes a hydrated island; everything else
  is static HTML.

Why Astro over alternatives:

- **Astro vs Next/SolidStart/Qwik**: those all assume the page needs a JS
  framework runtime. Astro doesn't.
- **Astro vs pure 11ty**: Astro gives us TS, components, image optimization,
  and a clean island story for the one interactive piece, without giving up
  static-first.
- **Astro vs SvelteKit (current)**: SvelteKit hydrates pages by default. Astro
  lets us keep using Svelte for the one island while shipping ~0 KB of JS on
  the TL;DR page and a tiny island bundle on the home page.

Supporting choices:

- **Svelte 5** for the video island (matches the SvelteKit version's runes
  syntax; lightest interactive framework available).
- **Tailwind 4** via the official `@tailwindcss/vite` plugin (matches current).
- **TypeScript** strict everywhere.
- **Vitest** for unit tests (content shape, util fns).
- **Playwright** for screenshot + render tests (the user explicitly asked for
  "actual screenshot rendering tests").
- **Static output** — no SSR adapter needed; the original deploys to
  Cloudflare Pages which serves static files perfectly.

## Architectural improvements over `resume-sveltekit`

1. **Content as data, not as code.** The SvelteKit version has one
   hand-written `.svelte` file per section, each importing 5–10 things. Most of
   them follow an identical shape (heading + icon line + paragraphs + media).
   New version: one typed `content.ts` data module, one `<Section />`
   component that renders any section. Adding a new project becomes a data
   edit, not a new file.
2. **Smoother lazy video.** The current `EmbeddedVideo` uses a throttled
   scroll/resize handler (`lodash-es throttle`, runs on every scroll tick). New
   version: `IntersectionObserver`. Removes the lodash dependency, removes the
   scroll listener, eliminates layout-thrash from `getBoundingClientRect` on
   every scroll, and is what every modern site uses for this.
3. **Zero JS on the TL;DR page.** It's pure text/SVG — should ship literally
   no JavaScript. Astro makes that the default.
4. **Inline SVGs as Astro components**, not Svelte components — they don't
   need to be hydrated.
5. **Image optimization** via Astro's `<Image />` for the screenshot (the BGV
   PNG/AVIF dance becomes automatic).
6. **Real link components removed for plain `<a>`** — the `Link.svelte` shim
   was a styling wrapper, but Astro's CSS-in-component story means a class
   string is enough; one fewer indirection.

## Step-by-step plan

- [x] 1. Survey current SvelteKit implementation; identify content vs.
     behavior; pick stack. _(done)_
- [x] 2. Write this `PLAN.md`. _(done)_
- [x] 3. Scaffold `resume-astro` (package.json, configs, tsconfig, Tailwind,
     Svelte integration, Playwright + Vitest).
- [x] 4. Copy static assets (videos, audio, favicon, BGV image).
- [x] 5. Port all 43 SVG icons from `.svelte` to Astro components. _(scripted —
     see `scripts/port-svgs.mjs`)_
- [x] 6. Extract all section content into a typed `src/content/sections.ts`
     module with a tiny `[text](url)` link microformat for inline links.
- [x] 7. Build reusable components: `BaseLayout.astro`, `Header.astro`,
     `IconLine.astro`, `Section.astro`, `MediaItem.astro`,
     `Paragraph.astro`, `InlineMarkdown.astro`.
- [x] 8. Build `EmbeddedVideo.svelte` island (IntersectionObserver, Svelte 5
     runes).
- [x] 9. Build `src/pages/index.astro` and `src/pages/tldr.astro` rendering
     from the content module.
- [x] 10. Unit tests (Vitest): content data shape (every section has the
      expected fields; icon refs resolve; URLs are valid; SVG files exist).
- [x] 3-10 _(done)_
- [x] 11. Screenshot tests (Playwright). _(done — 10/10 passing, screenshots
      written to `tests/screenshots/`)_
- [x] 12. `astro check`, `astro build`, run all tests. _(done — 0 type errors,
      builds clean, 11 unit + 10 e2e passing)_

## Decision log (filled in as work proceeds)

- **2026-05-16** — Chose Astro + Svelte 5 islands. Static output. See above.
- **2026-05-16** — Will keep the icon-line / section visual layout identical
  to the SvelteKit version. The user said "reimplement everything and make it
  run better and faster" — I'm interpreting that as architectural/performance
  improvements, not a redesign. Content and visual layout stay the same so the
  museum-of-implementations comparison still works.
- **2026-05-16** — Skipping the multi-implementation header strip (CRA / Deno
  Fresh / Sveltekit links). Instead, the header advertises this as the Astro
  implementation. The site is meant to be deployed at its own subdomain.

## Findings (filled in as work proceeds)

- **TL;DR page ships zero rendering JS.** Confirmed by inspecting
  `dist/tldr/index.html`: the one `<script>` tag is `page.DubX8lW0.js` (~2KB)
  which is just Astro's link-prefetch runtime, not a UI framework. For
  comparison, the SvelteKit version of the same page boots the Svelte runtime
  on load.
- **Home page islands.** Home page has the EmbeddedVideo Svelte island plus
  Svelte's tiny client runtime — total ~38KB gzipped over a few chunks. The
  page is interactive immediately because there is no hydration of static
  content, only of the videos.
- **No `lodash-es` dependency.** The original needed `lodash.throttle` for the
  scroll handler. With IntersectionObserver it's gone entirely. Net dep count:
  Astro+Svelte+Tailwind only.
- **TypeScript on `ICONS`.** I tried `as const satisfies Record<string, Icon>`
  but TS then narrows each entry to its literal shape, so
  `ICONS[ref].extraClass` is a property error on entries without it. Switched
  to `Record<string, Icon>` and validated key correctness in the unit tests
  instead. Type safety is preserved where it matters (the data flowing into
  components), and trading it on `ICONS` lookups for a test is fine.
- **Split `iconsData.ts` from `icons.ts`.** Vitest can't parse `.astro` files,
  so I extracted the metadata-only registry into `iconsData.ts` (no `.astro`
  imports) and kept the component-bound `ICONS` map in `icons.ts`. Tests
  import from `iconsData.ts` and validate that every referenced SVG file
  exists in `components/svgs/`.
- **No-WebKit mobile profile.** Playwright's `devices['iPhone 13']` defaults
  to WebKit, which would require installing a second 100MB+ browser. Switched
  the mobile project to Chromium with the iPhone 13 viewport / UA / DPR — same
  layout verification, half the install footprint.
- **Final scorecard** — `astro check`: 0 errors over 64 files. Build: 2 pages
  in 1.5s. Unit tests: 11/11 passing in ~180ms. E2E: 10/10 passing in ~7s
  across desktop + mobile. TL;DR page ships exactly 1 script tag (Astro
  prefetch runtime, ~2KB). Home page ships ~38KB of JS for the Svelte island.
  The current SvelteKit implementation ships the Svelte runtime + router on
  every page; the Astro version's TL;DR is functionally JS-free.
