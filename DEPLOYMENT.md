# Deployment plan — replacing svelte.willcolton.com with the Astro museum

This document is the rollout plan for promoting the Astro implementation to
be the canonical museum, and soft-deprecating the four older implementations
(CRA / Fresh / Solid / SvelteKit) by relegating them to "old side projects"
that are linked from the new museum section.

## Goals

1. **One canonical museum URL.** The Astro version becomes the URL you give
   people. The old subdomains stay live as historical artifacts and are
   linked from the new museum section.
2. **Zero downtime for the old versions.** Nothing about the existing
   `cra.willcolton.com`, `fresh.willcolton.com`, `solid.willcolton.com`,
   `svelte.willcolton.com` deployments needs to change to make this work.
3. **Auto-deploy on push to `main`.** The platform should rebuild and ship
   on every merge to `main`, with a CI quality gate that fails the deploy
   if checks/tests/build fail.
4. **As little DNS surgery as possible.** Use the path that doesn't require
   moving the whole `willcolton.com` zone off Route 53.

## Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| Hosting platform | **Cloudflare Pages** | Site is pure static (`output: 'static'` in `astro.config.mjs`); `public/_headers` already targets CF Pages; you're already in the Cloudflare ecosystem (Star Judge uses Workers + D1 + Access); CF Pages has native GitHub auto-deploy so no Actions are required for shipping. |
| Canonical URL | **`astro.willcolton.com`** (and later `willcolton.com`) | Matches the existing naming pattern (cra., fresh., solid., svelte.) and lets us deploy without touching the apex DNS at all. Promoting to the apex is a follow-up. |
| CI | **GitHub Actions, quality gate only** | Cloudflare Pages handles the deploy. The Actions workflow just runs check + unit + e2e + build on push/PR so bad code can't get merged. See `.github/workflows/ci.yml`. |
| Old subdomains | **Leave them running** | Each becomes a museum exhibit in its own right, accessible by its subdomain and linked from the new museum section. No takedowns. |

## What's been done in-repo

- ✅ `astro.config.mjs` already has `output: 'static'` — site builds to plain
  HTML / JS / CSS in `dist/`, which is exactly what CF Pages wants.
- ✅ `public/_headers` is already a CF Pages config file (carried over from
  the SvelteKit version's `static/_headers`).
- ✅ `public/robots.txt` is in place.
- ✅ The museum section in `src/content/sections.ts` now enumerates and links
  to all five implementations and frames them as side projects in their own
  right.
- ✅ `.github/workflows/ci.yml` runs `astro check`, vitest, the Astro build,
  and Playwright (Chromium only, with browser-binary cache) on every push and
  PR to `main`. Uploads screenshots on failure. **Does not deploy** — that's
  CF Pages's job.

## What still needs to happen (manual, outside the repo)

These are the steps you need to do once. None of them touch the running
old subdomains.

### 1. Push the repo to GitHub

The repo is currently a local git repo with one commit and no remote. Create
a GitHub repo (suggested name: `coltonw/resume-astro`) and push:

```bash
cd ~/resume-astro
gh repo create coltonw/resume-astro --public --source=. --remote=origin --description "Astro implementation of my side-project museum"
git push -u origin main
```

(Or create the repo through the GitHub UI and `git remote add` + `git push`
manually.)

Once pushed, the CI workflow will start running on its own.

### 2. Connect Cloudflare Pages to the repo

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
**Connect to Git** → pick `coltonw/resume-astro`.

Build settings:

| Field | Value |
|---|---|
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (empty / project root) |
| Production branch | `main` |
| Node version | `22` (set via env var `NODE_VERSION=22` if CF defaults to something older) |

CF Pages will do its first build immediately and give you a URL like
`resume-astro-abc.pages.dev`. Verify the site loads there before going on.

### 3. Add the custom domain in Cloudflare Pages

CF Pages project → **Custom domains** → **Set up a custom domain** →
`astro.willcolton.com`.

Cloudflare will tell you exactly what DNS record to add (it will be a
**CNAME** with target `resume-astro-<your-project>.pages.dev` or similar).
**Copy that target string** — you need it for step 4.

### 4. Add the CNAME in Route 53

AWS console → **Route 53** → Hosted zone for `willcolton.com` → **Create
record**.

| Field | Value |
|---|---|
| Record name | `astro` |
| Record type | `CNAME` |
| Value | the CF target from step 3 (e.g. `resume-astro-abc.pages.dev`) |
| TTL | 300 (5 minutes; fine for a personal site) |
| Routing policy | Simple |

After DNS propagates (usually under a minute), the CF Pages custom-domain
page will switch to "Active" and HTTPS will be auto-provisioned. Site is now
live at `https://astro.willcolton.com`.

### 5. (Optional, follow-up) Promote to the apex `willcolton.com`

This is the next step but worth doing as a separate ticket once you're
happy with the subdomain. There are two paths:

**Path A — keep DNS in Route 53 (smaller change, slight wart).** Route 53
does not support a CNAME at the zone apex, so you can't directly CNAME
`willcolton.com` to `pages.dev`. Workarounds:

- Put the site at `www.willcolton.com` (CNAME, same as step 4) and have the
  apex redirect to `www.` using an S3 bucket + Route 53 ALIAS, or via your
  existing `redirect-lambda`. The redirect already exists today for the apex;
  point it at `https://astro.willcolton.com` (or `https://www.willcolton.com`)
  instead of wherever it currently goes.

**Path B — move DNS to Cloudflare (cleaner, bigger change).** Change the
nameservers for `willcolton.com` from Route 53 to Cloudflare's. Cloudflare
supports CNAME flattening at the apex, so you can then point
`willcolton.com` directly at CF Pages. You also get free CDN/SSL and you
stop paying AWS for the hosted zone.

My recommendation: do **Path A** with `www.willcolton.com` as the canonical
URL and the apex redirecting. It's a tiny change with no risk to your
existing DNS records.

### 6. What's left in Route 53 once you're done

If you stop after step 4 (subdomain only):

- **One new CNAME**: `astro.willcolton.com → resume-astro-*.pages.dev`.
- Nothing else changes. CRA / Fresh / Solid / SvelteKit subdomain records
  keep pointing where they always have.

If you also do step 5 path A (www + apex redirect):

- New CNAME: `www.willcolton.com → resume-astro-*.pages.dev`.
- Apex `willcolton.com` continues to be handled by `redirect-lambda` (or
  whatever you have there now), but pointed at `https://www.willcolton.com`.

If you do step 5 path B (move DNS to Cloudflare):

- Delete the Route 53 hosted zone for `willcolton.com` (or just leave it
  unused — costs $0.50/month).
- Re-create the records in Cloudflare DNS for any subdomains not served by
  CF Pages (the older `cra.`, `fresh.`, etc. wherever they're currently
  hosted).
- Change the nameservers at the domain registrar.

### 7. (Optional, follow-up) Add "Astro" to the old implementations' header strip

The SvelteKit version's header has an "Implementations: CRA / Deno Fresh /
Sveltekit" strip. The CRA and Fresh versions presumably have similar
strips. To keep the cross-links consistent across the museum:

- In each of `resume-cra`, `resume-fresh`, `resume-solid`, `resume-sveltekit`:
  add an `Astro` link pointing at `https://astro.willcolton.com` (or wherever
  the canonical URL ends up).
- This is purely a UX nicety; the new Astro version already links back to
  all four older implementations from its museum section.

## Verification checklist

After step 4:

- [ ] `https://astro.willcolton.com` loads the new Astro museum.
- [ ] HTTPS is green and the cert is from Cloudflare.
- [ ] TL;DR page loads with no JS in DevTools network tab (only the tiny
      Astro prefetch script).
- [ ] All twelve project icon lines render with their icons.
- [ ] Videos lazy-load on scroll on the home page.
- [ ] GitHub Actions `ci` workflow is green on `main`.
- [ ] The four old subdomains still load.

## Rollback

There is no destructive action in this plan. To roll back at any point:

- Delete the `astro` CNAME in Route 53 → the new URL stops resolving; the
  old subdomains are unaffected.
- Disconnect or delete the CF Pages project → no further auto-deploys.

The local git repo and the GitHub repo are both perfectly safe to keep
around even if you decide to host elsewhere later.
