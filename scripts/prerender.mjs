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
const CASES = ['ussr-phuket', 'enjoy-healthy-food'];

const routes = [
  { url: '/', out: 'index.html', pickCountry: null }, // gate with the 8-country picker
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

  for (const route of routes) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    // Deterministic snapshots: no geo redirects, no saved prefs
    await page.route('https://api.country.is/**', (r) => r.abort());
    await page.addInitScript(() => {
      try {
        localStorage.clear();
        localStorage.setItem('preferredLanguage', 'en');
      } catch {}
    });

    await page.goto(BASE + route.url, { waitUntil: 'networkidle', timeout: 30000 });
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
    const outPath = path.join(DIST, route.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    if (route.out === 'index.html') {
      // Keep the pristine SPA shell as the fallback for unknown routes
      cpSync(outPath, path.join(DIST, 'spa-shell.html'), { force: true });
    }
    writeFileSync(outPath, '<!DOCTYPE html>\n' + html.replace(/^<!DOCTYPE html>\s*/i, ''));
    const bytes = Buffer.byteLength(html);
    console.log(`prerendered ${route.url} -> ${route.out} (${(bytes / 1024).toFixed(0)} KB)`);
    await ctx.close();
  }

  await browser.close();
  console.log(`prerender: ${routes.length} routes done`);
} finally {
  server.kill();
}
