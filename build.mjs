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

// Emit buy-stage.html from src/buy.html with a noindex meta added — the page
// runtime-detects pathname and uses sandbox Paddle on /buy-stage. Linked from
// Debug builds of Odak so dev/QA testing never hits live Paddle.
async function buildBuyStage() {
  const src = await readFile(join(SRC, 'buy.html'), 'utf8');
  const withNoindex = src.replace(
    '<meta charset="utf-8"/>',
    '<meta charset="utf-8"/>\n<meta name="robots" content="noindex"/>'
  );
  const out = await minify(withNoindex, opts);
  await writeFile(join(OUT, 'buy-stage.html'), out);
  const pct = ((1 - out.length / withNoindex.length) * 100).toFixed(1);
  console.log(`${'buy-stage.html'.padEnd(20)} ${(withNoindex.length / 1024).toFixed(1).padStart(7)}KB → ${(out.length / 1024).toFixed(1).padStart(6)}KB  (-${pct}%)`);
}

async function buildAll() {
  const files = (await readdir(SRC)).filter(f => f.endsWith('.html'));
  const t = Date.now();
  for (const f of files) {
    try { await buildOne(f); }
    catch (e) { console.error(`✖ ${f}:`, e.message); process.exitCode = 1; }
  }
  try { await buildBuyStage(); }
  catch (e) { console.error(`✖ buy-stage.html:`, e.message); process.exitCode = 1; }
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
    pending = setTimeout(async () => {
      try {
        await buildOne(evt.filename);
        if (evt.filename === 'buy.html') await buildBuyStage();
      } catch (e) { console.error(e.message); }
    }, 80);
  }
}
