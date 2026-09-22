import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: npm run check:text -- src/common/widgets/landings/<Name>LandingWidget');
  process.exit(2);
}

const letters = /[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]{3,}/;
const jsxText = />([^<>{}]*?)</gs;
const braceText = /\{\s*(['"`])([^'"`{}]*?)\1\s*\}/g;
const attrText = /\b(alt|aria-label|title|placeholder)=(?:["']([^"']*)["']|\{`([^`]*)`\})/g;

const lineOf = (src, index) => src.slice(0, index).split('\n').length;

const hits = [];
const walk = (d) => {
  for (const name of fs.readdirSync(d)) {
    const p = path.join(d, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.tsx')) {
      const src = fs.readFileSync(p, 'utf8');
      for (const m of src.matchAll(jsxText)) {
        const text = m[1].trim();
        // A real JSX text node never contains JS punctuation; this filters out
        // plain code the naive multi-line `>...<` scan otherwise picks up
        // (comparisons, calls, comments) between unrelated tags.
        if (letters.test(text) && !/[;(){}=]|\/\//.test(text)) hits.push(`${p}:${lineOf(src, m.index)}: ${text}`);
      }
      for (const m of src.matchAll(braceText)) {
        if (letters.test(m[2])) hits.push(`${p}:${lineOf(src, m.index)}: {${m[2]}}`);
      }
      for (const m of src.matchAll(attrText)) {
        const value = m[2] ?? m[3];
        if (letters.test(value)) hits.push(`${p}:${lineOf(src, m.index)}: ${m[1]}="${value}"`);
      }
    }
  }
};
walk(dir);

if (!hits.length) {
  console.log('OK: no hardcoded text found in JSX (heuristic — also review each .tsx by eye)');
} else {
  console.log(`Possible hardcoded text (check each; brand names are allowed):\n  ${hits.join('\n  ')}`);
}
