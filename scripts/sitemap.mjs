/**
 * Генератор sitemap.xml. Запускается перед `vite build` (см. package.json).
 *
 * Зачем: sitemap лежал в репозитории руками, и даты в нём разъехались с
 * реальностью. Замер 13.09.2026 показал `lastmod` = 2026-09-08 у двух статей,
 * переписанных 9 и 10 сентября, и 2026-07-31 у `/` и `/th` — при том что
 * тайская версия выкатилась в те же дни. Краулеры решают по `lastmod`, стоит
 * ли перечитывать страницу; выставлять им дату старее правки — значит просить
 * их не приходить.
 *
 * Как: дата страницы = самый свежий коммит, тронувший её исходники (компонент
 * плюс конфиги, из которых страница берёт содержимое). Считается из git, а не
 * из mtime файлов: mtime сбрасывается при клоне и на CI будет датой сборки.
 *
 * hreflang: языковые версии живут на ?lang=, каждая каноникализирует себя —
 * см. client/src/hooks/useLanguage.tsx. Альтернаты в sitemap должны это
 * повторять, иначе Google склеит версии в одну и переводы не проиндексируются.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const ORIGIN = 'https://booster.delivery';
const LANGS = ['en', 'ru', 'id', 'th'];

const COUNTRIES = ['id', 'th', 'sg', 'my', 'vn', 'ph', 'kh', 'mm'];
const ANSWERS = [
  'grabfood-gofood-account-management',
  'delivery-agency-vs-klikit-deliverect',
  'grabfood-ads-not-working',
  'managing-grabfood-yourself',
  'in-house-manager-vs-agency',
  'few-orders-grabfood-gofood',
  'grabfood-gofood-rating-after-bad-reviews',
];
const CASES = ['ussr-phuket', 'enjoy-healthy-food', 'meat-point-phuket', 'etna-phuket', 'love-u-pizza', 'zaytun-ubud'];

const P = 'client/src/pages';
const C = 'client/src/config';
// Общее для всех страниц: SEOSchema печатает JSON-LD в каждую из них, то есть
// его правка реально меняет то, что читает бот. Механику языка (useLanguage)
// сюда НЕ добавляем: сами переводы лежат inline в компонентах страниц, их дата
// уже учтена, а от правки хука дата поехала бы у всего сайта разом — краулеру
// это сказало бы «перечитай всё», что неправда.
const SHARED = ['client/src/components/SEOSchema.tsx'];

const ANSWER_SRC = {
  'grabfood-gofood-account-management': `${P}/answers-hire.tsx`,
  'delivery-agency-vs-klikit-deliverect': `${P}/answers-vs-aggregators.tsx`,
  'grabfood-ads-not-working': `${P}/answers-ads-not-working.tsx`,
  'managing-grabfood-yourself': `${P}/answers-doing-it-yourself.tsx`,
  'in-house-manager-vs-agency': `${P}/answers-in-house-vs-agency.tsx`,
  'few-orders-grabfood-gofood': `${P}/answers-few-orders.tsx`,
  'grabfood-gofood-rating-after-bad-reviews': `${P}/answers-rating-after-bad-reviews.tsx`,
};

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly', src: [`${P}/gate.tsx`, `${P}/country.tsx`, `${C}/faqs.ts`] },
  ...COUNTRIES.map((c) => ({
    path: `/${c}`, priority: '0.9', changefreq: 'weekly',
    src: [`${P}/country.tsx`, `${C}/faqs.ts`],
  })),
  { path: '/about', priority: '0.8', changefreq: 'monthly', src: [`${P}/about.tsx`] },
  { path: '/method', priority: '0.8', changefreq: 'monthly', src: [`${P}/method.tsx`] },
  { path: '/benchmark', priority: '0.8', changefreq: 'monthly', src: [`${P}/benchmark.tsx`] },
  { path: '/answers', priority: '0.8', changefreq: 'weekly', src: [`${P}/answers-hub.tsx`] },
  ...ANSWERS.map((a) => ({
    path: `/answers/${a}`, priority: '0.8', changefreq: 'monthly', src: [ANSWER_SRC[a]],
  })),
  ...CASES.map((s) => ({
    path: `/cases/${s}`, priority: '0.7', changefreq: 'monthly', src: [`${P}/case.tsx`, `${C}/case-studies.ts`],
  })),
];

/** Дата последнего коммита, тронувшего файл. Пустая строка, если файла нет в
 *  истории — тогда он просто не участвует в максимуме. */
const lastCommit = (file) => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%ad', '--date=short', '--', file], {
      encoding: 'utf8',
    }).trim();
  } catch {
    return '';
  }
};

const cache = new Map();
const dateOf = (file) => {
  if (!cache.has(file)) cache.set(file, lastCommit(file));
  return cache.get(file);
};

const today = new Date().toISOString().slice(0, 10);

const lastmodFor = (page) => {
  const own = page.src.map(dateOf).filter(Boolean);
  // Страница, которой ещё нет в истории (новый файл, не закоммичен), — сегодняшняя.
  // Иначе она унаследовала бы дату общих файлов и заявила бы краулеру, что новая
  // страница старше, чем есть.
  if (!own.length) return today;
  const dates = [...own, ...SHARED.map(dateOf).filter(Boolean)];
  // Даты в формате YYYY-MM-DD сравниваются как строки.
  return dates.sort().at(-1);
};

const alternates = (path) => {
  const base = ORIGIN + path;
  const rows = LANGS.map((l) =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${l === 'en' ? base : `${base}?lang=${l}`}" />`
  );
  rows.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${base}" />`);
  return rows.join('\n');
};

const body = pages
  .map((p) => `  <url>
    <loc>${ORIGIN}${p.path}</loc>
${alternates(p.path)}
    <lastmod>${lastmodFor(p)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

writeFileSync('client/public/sitemap.xml', xml);
console.log(`sitemap: ${pages.length} страниц, даты из git`);
