import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("renders core museum content", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    await page.goto("/");
    await expect(page).toHaveTitle(/Side Project Museum/);
    await expect(
      page.getByRole("heading", { name: "Voting", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Making a Real Game" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /TL;DR/ })).toBeVisible();

    // Smoke: no console / page errors during initial render.
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("full-page screenshot @ desktop and mobile", async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    // Wait for all SVGs to render; the page is static so loaded === ready.
    await page.waitForLoadState("networkidle");
    const buf = await page.screenshot({
      fullPage: true,
      animations: "disabled",
      path: `tests/screenshots/home-${testInfo.project.name}.png`,
    });
    expect(buf.byteLength).toBeGreaterThan(10_000);
  });
});

test.describe("tldr page", () => {
  test("renders all icon lines", async ({ page }) => {
    await page.goto("/tldr");
    await expect(page).toHaveTitle(/TL;DR/);
    // Each icon line has a title heading; count them.
    const { SECTIONS } = await import("../../src/content/sections");
    const headings = page.getByRole("heading", { level: 2 });
    await expect(headings).toHaveCount(SECTIONS.length);
  });

  test("ships no hydration JS (only the prefetch runtime)", async ({
    page,
  }) => {
    const scriptSrcs: string[] = [];
    page.on("response", async (r) => {
      const url = r.url();
      if (url.endsWith(".js")) scriptSrcs.push(url);
    });
    await page.goto("/tldr");
    await page.waitForLoadState("networkidle");
    // The Astro client-side runtime / svelte hydration must NOT be loaded for tldr.
    const hydrationOrFramework = scriptSrcs.filter((u) =>
      /client\.svelte|EmbeddedVideo|template/.test(u),
    );
    expect(hydrationOrFramework, hydrationOrFramework.join("\n")).toEqual([]);
  });

  test("full-page screenshot @ desktop and mobile", async ({
    page,
  }, testInfo) => {
    await page.goto("/tldr");
    await page.waitForLoadState("networkidle");
    const buf = await page.screenshot({
      fullPage: true,
      animations: "disabled",
      path: `tests/screenshots/tldr-${testInfo.project.name}.png`,
    });
    expect(buf.byteLength).toBeGreaterThan(10_000);
  });
});
