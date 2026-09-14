/**
 * Проверка полноты новой страницы. Первый шаг `npm run build`.
 *
 * Зачем: PROJECT_INSTRUCTION требует при добавлении страницы обновить шесть
 * мест. Правило существовало в документации и трижды подряд не было выполнено —
 * статьи 14.09.2026 уехали на прод без записей в llms.txt, то есть ИИ-краулеры
 * читали файл, описывающий сайт по состоянию до этих статей. Документация,
 * которую надо не забыть прочитать, — не контроль. Контроль — падающая сборка.
 *
 * Что делает: берёт список маршрутов /answers/* из App.tsx (единственное место,
 * где страница физически появляется) и требует, чтобы каждый слаг встречался в
 * prerender.mjs, sitemap.mjs, llms.txt и AnswersIndex.tsx. Если чего-то нет —
 * печатает, чего именно, и роняет сборку с ненулевым кодом.
 */
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(p, 'utf8');

const app = read('client/src/App.tsx');
const slugs = [...app.matchAll(/path="\/answers\/([a-z0-9-]+)"/g)].map((m) => m[1]);

if (!slugs.length) {
  console.error('check-pages: в App.tsx не нашлось ни одного маршрута /answers/* — проверь регулярку');
  process.exit(1);
}

const targets = [
  { file: 'scripts/prerender.mjs', what: 'снапшоты для ботов' },
  { file: 'scripts/sitemap.mjs', what: 'sitemap' },
  { file: 'client/public/llms.txt', what: 'llms.txt (его читают ИИ-краулеры)' },
  { file: 'client/src/components/AnswersIndex.tsx', what: 'реестр кластера и ссылки со страниц' },
];

const contents = targets.map((t) => ({ ...t, text: read(t.file) }));

const missing = [];
for (const slug of slugs) {
  for (const t of contents) {
    if (!t.text.includes(slug)) missing.push({ slug, file: t.file, what: t.what });
  }
}

if (missing.length) {
  console.error('\ncheck-pages: страница добавлена не везде.\n');
  for (const m of missing) {
    console.error(`  ${m.slug}\n    нет в ${m.file} — ${m.what}`);
  }
  console.error('\nСм. «ЖЕЛЕЗНЫЕ ПРАВИЛА» в ai_docs/ai-visibility/PROJECT_INSTRUCTION.md.');
  console.error('Сборка остановлена: выкатывать страницу, которой нет в llms.txt или в пререндере, бессмысленно.\n');
  process.exit(1);
}

console.log(`check-pages: ${slugs.length} страниц кластера, все на месте в ${targets.length} реестрах`);
