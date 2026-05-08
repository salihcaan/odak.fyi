import { minify } from 'html-minifier-terser';
import { readdir, readFile, writeFile, watch, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';

const SRC = 'src';
const OUT = '.';
const WATCH = process.argv.includes('--watch');

const opts = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  collapseBooleanAttributes: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  // Keep <pre>/<textarea> content untouched if it ever appears.
  ignoreCustomFragments: [/<pre[\s\S]*?<\/pre>/i, /<textarea[\s\S]*?<\/textarea>/i],
};

async function buildOne(name) {
  const src = await readFile(join(SRC, name), 'utf8');
  const out = await minify(src, opts);
  await writeFile(join(OUT, name), out);
  const pct = ((1 - out.length / src.length) * 100).toFixed(1);
  console.log(`${name.padEnd(20)} ${(src.length / 1024).toFixed(1).padStart(7)}KB → ${(out.length / 1024).toFixed(1).padStart(6)}KB  (-${pct}%)`);
}

async function buildAll() {
  const files = (await readdir(SRC)).filter(f => f.endsWith('.html'));
  const t = Date.now();
  for (const f of files) {
    try { await buildOne(f); }
    catch (e) { console.error(`✖ ${f}:`, e.message); process.exitCode = 1; }
  }
  console.log(`done in ${Date.now() - t}ms`);
}

await buildAll();

if (WATCH) {
  console.log(`\nwatching ${SRC}/…`);
  const watcher = watch(SRC, { recursive: false });
  let pending;
  for await (const evt of watcher) {
    if (!evt.filename?.endsWith('.html')) continue;
    clearTimeout(pending);
    pending = setTimeout(() => buildOne(evt.filename).catch(e => console.error(e.message)), 80);
  }
}
