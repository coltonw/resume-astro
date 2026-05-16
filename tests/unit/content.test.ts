import { describe, it, expect } from 'vitest';
import { SECTIONS } from '../../src/content/sections';
import { ICON_META, type TextIcon } from '../../src/content/iconsData';

const isText = (ref: unknown): ref is TextIcon =>
  typeof ref === 'object' && ref !== null && 'label' in ref;

describe('sections', () => {
  it('every section has a non-empty id and at least one paragraph', () => {
    for (const s of SECTIONS) {
      expect(s.id).toMatch(/^[a-z0-9-]+$/);
      const total = (s.preIcon?.length ?? 0) + s.intro.length + (s.outro?.length ?? 0);
      expect(total, `${s.id} has at least one paragraph`).toBeGreaterThan(0);
    }
  });

  it('ids are unique', () => {
    const ids = SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every icon-key reference resolves in the icon registry', () => {
    for (const s of SECTIONS) {
      for (const ref of s.iconLine.icons) {
        if (isText(ref)) {
          expect(ref.href).toMatch(/^https?:\/\//);
          expect(ref.label.length).toBeGreaterThan(0);
        } else {
          expect(ICON_META[ref], `icon "${ref}" used in section "${s.id}" exists`).toBeDefined();
        }
      }
    }
  });

  it('every link URL in a paragraph parses as an absolute URL', () => {
    const LINK_RE = /\[[^\]]+\]\(([^)]+)\)/g;
    for (const s of SECTIONS) {
      const paragraphs = [...(s.preIcon ?? []), ...s.intro, ...(s.outro ?? [])];
      for (const p of paragraphs) {
        for (const m of p.matchAll(LINK_RE)) {
          const url = m[1]!;
          expect(() => new URL(url), `${s.id}: ${url}`).not.toThrow();
        }
      }
    }
  });

  it('media references point under /', () => {
    for (const s of SECTIONS) {
      if (!s.media) continue;
      if (s.media.kind === 'video') {
        expect(s.media.webm).toMatch(/^\//);
        expect(s.media.mp4).toMatch(/^\//);
        expect(s.media.width).toBeGreaterThan(0);
        expect(s.media.height).toBeGreaterThan(0);
      } else if (s.media.kind === 'image') {
        expect(s.media.src).toMatch(/^\//);
        expect(s.media.fallback).toMatch(/^\//);
      } else if (s.media.kind === 'audio') {
        expect(s.media.src).toMatch(/^\//);
      }
    }
  });
});

describe('icons registry', () => {
  it('every entry has a usable URL and SVG name', () => {
    for (const [key, icon] of Object.entries(ICON_META)) {
      expect(icon.title.length, key).toBeGreaterThan(0);
      expect(() => new URL(icon.href), `${key}: ${icon.href}`).not.toThrow();
      expect(icon.svg.length, key).toBeGreaterThan(0);
    }
  });

  it('every referenced SVG file exists in components/svgs', async () => {
    const { readdir } = await import('node:fs/promises');
    const files = new Set(
      (await readdir(new URL('../../src/components/svgs', import.meta.url))).map((f) =>
        f.replace(/\.astro$/, ''),
      ),
    );
    for (const [key, icon] of Object.entries(ICON_META)) {
      expect(files.has(icon.svg), `${key} -> ${icon.svg}.astro exists`).toBe(true);
    }
  });
});
