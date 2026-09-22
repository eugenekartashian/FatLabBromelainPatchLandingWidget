import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('usage: npm run check:keys -- src/common/widgets/landings/<Name>LandingWidget [PREFIX]');
  process.exit(2);
}

const copySrc = fs.readFileSync('src/copy.ts', 'utf8');
const allKeys = [...copySrc.matchAll(/^\s+([A-Z][A-Z0-9_]+):/gm)].map((m) => m[1]);
const prefix = (process.argv[3] || allKeys[0]?.split('_')[0] || '').toUpperCase();
if (!prefix) {
  console.error('src/copy.ts has no keys');
  process.exit(2);
}
const copyKeys = allKeys.filter((k) => k.startsWith(`${prefix}_`));

const exact = new Set();
const patterns = new Set();
const keyRe = new RegExp(`\\b${prefix}_[A-Z0-9_]*`, 'g');
const walk = (d) => {
  for (const name of fs.readdirSync(d)) {
    const p = path.join(d, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(name)) {
      for (const m of fs.readFileSync(p, 'utf8').matchAll(keyRe)) {
        if (m[0].endsWith('_')) patterns.add(m[0]);
        else exact.add(m[0]);
      }
    }
  }
};
walk(dir);

const isUsed = (k) => exact.has(k) || [...patterns].some((p) => k.startsWith(p));
const missing = [...exact].filter((k) => !copyKeys.includes(k)).sort();
const unused = copyKeys.filter((k) => !isUsed(k)).sort();

console.log(`prefix ${prefix}_: ${exact.size} keys in code, ${copyKeys.length} keys in src/copy.ts`);
if (!exact.size) console.log(`\nNO ${prefix}_ keys found in code — check the folder path and the prefix`);
if (patterns.size) console.log(`\nDYNAMIC or non-uppercase keys (write each key as a full literal, README п. 5):\n  ${[...patterns].join('\n  ')}`);
if (missing.length) console.log(`\nMISSING in src/copy.ts (used in code):\n  ${missing.join('\n  ')}`);
if (unused.length) console.log(`\nUNUSED in code (present in src/copy.ts):\n  ${unused.join('\n  ')}`);
const ok = exact.size && !patterns.size && !missing.length && !unused.length;
if (ok) console.log('OK: keys match');
process.exit(ok ? 0 : 1);
