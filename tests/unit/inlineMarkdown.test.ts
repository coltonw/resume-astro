import { describe, it, expect } from 'vitest';

// Mirror of the tokenizer inside InlineMarkdown.astro. Kept here so we can
// unit-test the parsing without rendering Astro.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
type Token = { kind: 'text'; value: string } | { kind: 'link'; text: string; href: string };
function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of input.matchAll(LINK)) {
    if (m.index! > last) tokens.push({ kind: 'text', value: input.slice(last, m.index) });
    tokens.push({ kind: 'link', text: m[1]!, href: m[2]! });
    last = m.index! + m[0].length;
  }
  if (last < input.length) tokens.push({ kind: 'text', value: input.slice(last) });
  return tokens;
}

describe('inline markdown tokenize', () => {
  it('returns one text token for plain input', () => {
    expect(tokenize('hello world')).toEqual([{ kind: 'text', value: 'hello world' }]);
  });

  it('parses a single link', () => {
    expect(tokenize('see [docs](https://example.com)')).toEqual([
      { kind: 'text', value: 'see ' },
      { kind: 'link', text: 'docs', href: 'https://example.com' },
    ]);
  });

  it('parses multiple links interleaved with text', () => {
    const out = tokenize('a [b](https://b) c [d](https://d) e');
    expect(out).toEqual([
      { kind: 'text', value: 'a ' },
      { kind: 'link', text: 'b', href: 'https://b' },
      { kind: 'text', value: ' c ' },
      { kind: 'link', text: 'd', href: 'https://d' },
      { kind: 'text', value: ' e' },
    ]);
  });

  it('empty input returns no tokens', () => {
    expect(tokenize('')).toEqual([]);
  });
});
