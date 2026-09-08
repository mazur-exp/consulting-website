#!/usr/bin/env node
/**
 * Сводка по серверному логу трафика.
 *
 *   node scripts/traffic-digest.mjs            — за последние 7 дней
 *   node scripts/traffic-digest.mjs 30         — за последние 30 дней
 *
 * Читает logs/traffic-*.jsonl (пишет server/crawler-log.ts) и отвечает на
 * четыре вопроса, ради которых лог и заведён:
 *   1. Какие ИИ-краулеры нас обходят и как часто.
 *   2. Какие страницы они забирают — то есть что именно попадёт в ответы.
 *   3. Сколько было ЖИВЫХ обращений (ChatGPT-User и родня): движок тянул
 *      страницу, чтобы прямо сейчас ответить человеку.
 *   4. С каких внешних сайтов приходят люди.
 *
 * Результат вставляется в ai_docs/ai-visibility/VISIBILITY_TRACKING.md.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const days = Number(process.argv[2] || 7);
const dir = path.resolve(process.env.TRAFFIC_LOG_DIR || 'logs');
const since = new Date(Date.now() - days * 864e5);

let files = [];
try {
  files = (await readdir(dir)).filter((f) => f.startsWith('traffic-') && f.endsWith('.jsonl')).sort();
} catch {
  console.error(`Нет каталога ${dir}. Лог появляется после первого захода бота.`);
  process.exit(1);
}

const rows = [];
for (const f of files) {
  const day = f.slice('traffic-'.length, -'.jsonl'.length);
  if (new Date(day + 'T23:59:59Z') < since) continue;
  const text = await readFile(path.join(dir, f), 'utf8');
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try {
      const r = JSON.parse(line);
      if (new Date(r.ts) >= since) rows.push(r);
    } catch {}
  }
}

if (!rows.length) {
  console.log(`За ${days} дн. записей нет.`);
  process.exit(0);
}

const tally = (items, key) => {
  const m = new Map();
  for (const r of items) {
    const k = typeof key === 'function' ? key(r) : r[key];
    if (k == null || k === '') continue;
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const pad = (s, n) => String(s).padEnd(n);
const table = (pairs, limit = 15, width = 44) =>
  pairs.slice(0, limit).map(([k, v]) => `  ${pad(k.slice(0, width), width)} ${v}`).join('\n') || '  —';

const ai = rows.filter((r) => r.kind === 'ai-crawler');
const live = rows.filter((r) => r.kind === 'ai-user');
const search = rows.filter((r) => r.kind === 'search-crawler');
const people = rows.filter((r) => r.kind === 'human');
const uniqueDays = new Set(rows.map((r) => r.ts.slice(0, 10))).size;

console.log(`\n=== Трафик за ${days} дн. (${uniqueDays} дн. с записями, ${rows.length} строк) ===\n`);

console.log(`ИИ-краулеры: ${ai.length} обращений`);
console.log(table(tally(ai, 'bot')));

console.log(`\nЖивые запросы движков (кто-то спросил ИИ и он пошёл читать нас): ${live.length}`);
console.log(table(tally(live, 'bot')));
if (live.length) {
  console.log('\n  Какие страницы тянули живьём:');
  console.log(table(tally(live, 'path'), 10, 60));
}

console.log(`\nСтраницы, которые забирают ИИ-краулеры:`);
console.log(table(tally(ai, 'path'), 20, 60));

console.log(`\nОбычные поисковые краулеры: ${search.length}`);
console.log(table(tally(search, 'bot'), 8));

console.log(`\nЛюди с внешних сайтов: ${people.length}`);
console.log(table(tally(people, 'referrer'), 15));
if (people.length) {
  console.log('\n  На какие страницы они попадали:');
  console.log(table(tally(people, 'path'), 10, 60));
}

const byDay = tally(rows.filter((r) => r.kind === 'ai-crawler' || r.kind === 'ai-user'), (r) => r.ts.slice(0, 10));
console.log(`\nИИ-активность по дням:`);
console.log(byDay.sort((a, b) => a[0].localeCompare(b[0])).map(([d, n]) => `  ${d}  ${'#'.repeat(Math.min(n, 60))} ${n}`).join('\n') || '  —');
console.log('');
