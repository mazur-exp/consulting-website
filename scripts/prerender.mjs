/**
 * Prerender: static HTML snapshots of every route after `vite build`.
 *
 * Why: the site is a client-rendered React SPA. AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot) and many search bots do NOT execute JavaScript, so without
 * this step they see an empty <div id="root">. This script starts the built
 * server, renders each route in headless Chromium and writes the resulting
 * HTML to dist/public/<route>.html. express.static({extensions:['html']})
 * then serves /th from th.html — bots get full content, users get the SPA.
 *
 * Run automatically via `npm run build` (see package.json).
 */
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, cpSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const PORT = process.env.PRERENDER_PORT || 4999;
const BASE = `http://localhost:${PORT}`;
const DIST = path.resolve('dist/public');

const COUNTRIES = ['id', 'th', 'sg', 'my', 'vn', 'ph', 'kh', 'mm'];
const ANSWERS = [
  'grabfood-gofood-account-management',
  'delivery-agency-vs-klikit-deliverect',
  'grabfood-ads-not-working',
  'managing-grabfood-yourself',
  'in-house-manager-vs-agency',
];
const CASES = ['ussr-phuket', 'enjoy-healthy-food', 'meat-point-phuket', 'etna-phuket', 'love-u-pizza', 'zaytun-ubud'];

const routes = [
  { url: '/', out: 'index.html', pickCountry: null }, // gate with the 8-country picker
  { url: '/about', out: 'about.html', pickCountry: 'id' },
  { url: '/method', out: 'method.html', pickCountry: 'id' },
  { url: '/benchmark', out: 'benchmark.html', pickCountry: 'id' },
  // Answer pages for the "delegation" query cluster (AI-visibility gap, see ai_docs/ai-visibility)
  { url: '/answers', out: 'answers.html', pickCountry: 'id' },
  ...ANSWERS.map((a) => ({ url: `/answers/${a}`, out: `answers/${a}.html`, pickCountry: 'id' })),
  ...COUNTRIES.map((c) => ({ url: `/${c}`, out: `${c}.html`, pickCountry: c })),
  ...CASES.map((s) => ({ url: `/cases/${s}`, out: `cases/${s}.html`, pickCountry: 'th' })),
];

const server = spawn('node', ['dist/index.js'], {
  env: { ...process.env, NODE_ENV: 'production', PORT: String(PORT) },
  stdio: 'ignore',
});

const waitForServer = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE + '/');
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('prerender: server did not start');
};

const findChromium = () => {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return process.env.PLAYWRIGHT_CHROMIUM_PATH;
  try {
    // Container convenience path
    execSync('test -x /opt/pw-browsers/chromium');
    return '/opt/pw-browsers/chromium';
  } catch {}
  return undefined; // let playwright resolve its own installed browser
};

try {
  await waitForServer();
  const executablePath = findChromium();
  const browser = await chromium.launch(executablePath ? { executablePath } : {});

  // 'en' writes the default snapshots bots get on the bare URL; every other
  // language writes a parallel tree under lang-<code>/ that the server hands
  // out for ?lang=<code>. Without this, a Bahasa page exists only after JS runs
  // — i.e. never, for the crawlers we care about.
  const LANGS = ['en', 'id'];
  let count = 0;

  for (const lang of LANGS)
  for (const route of routes) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    // Deterministic snapshots: no geo redirects, no saved prefs
    await page.route('https://api.country.is/**', (r) => r.abort());
    // Счётчики в пререндере глушим. Иначе каждая сборка — это 48 снимков в двух
    // языках, то есть 96 фальшивых визитов с IP сервера в Umami и GA4, плюс
    // networkidle начинает ждать чужие домены и снимки становятся хрупкими.
    await page.route('https://www.googletagmanager.com/**', (r) => r.abort());
    await page.route('https://analytics.booster.delivery/**', (r) => r.abort());
    await page.addInitScript((l) => {
      try {
        localStorage.clear();
        localStorage.setItem('preferredLanguage', l);
      } catch {}
    }, lang);

    await page.goto(BASE + route.url + (lang === 'en' ? '' : `?lang=${lang}`), { waitUntil: 'networkidle', timeout: 30000 });
    // Gate shows the picker after geo fails (2.5s fallback timer)
    if (route.url === '/') await page.waitForTimeout(3200);
    else await page.waitForTimeout(800);

    // Trigger whileInView animations so the snapshot has final styles
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    // Expand all FAQ accordion items so answers are in the static HTML for bots
    await page.evaluate(() => {
      document
        .querySelectorAll('button[data-state="closed"][aria-expanded="false"]')
        .forEach((b) => b.click());
    });
    await page.waitForTimeout(600);

    const html = await page.content();
    const outPath = lang === 'en'
      ? path.join(DIST, route.out)
      : path.join(DIST, `lang-${lang}`, route.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    if (lang === 'en' && route.out === 'index.html') {
      // Keep the pristine SPA shell as the fallback for unknown routes
      cpSync(outPath, path.join(DIST, 'spa-shell.html'), { force: true });
    }
    writeFileSync(outPath, '<!DOCTYPE html>\n' + html.replace(/^<!DOCTYPE html>\s*/i, ''));
    const bytes = Buffer.byteLength(html);
    count++;
    console.log(`prerendered [${lang}] ${route.url} -> ${path.relative(DIST, outPath)} (${(bytes / 1024).toFixed(0)} KB)`);
    await ctx.close();
  }

  await browser.close();
  console.log(`prerender: ${count} snapshots done (${routes.length} routes x ${LANGS.length} languages)`);
} finally {
  server.kill();
}
