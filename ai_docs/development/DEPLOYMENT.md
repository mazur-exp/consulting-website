# Deployment Guide — Delivery Booster

**Last Updated:** 2026-08-25 (актуализировано: старый путь /var/www + pm2 больше не используется)

---

## Production: как оно устроено на самом деле

- **Server:** Hetzner Cloud, `46.62.195.19`, SSH порт **2222**, user root, Ubuntu 24.04 ARM64.
- **Рабочая копия прода:** `/root/consulting-website` ← ЕДИНСТВЕННОЕ правильное место.
- **Процесс:** systemd-юнит **`consulting-website`** (`systemctl restart consulting-website`),
  Node слушает порт **5000**.
- **Маршрутизация:** kamal-proxy (Docker) на 80/443 → `172.18.0.1:5000` для
  booster.delivery и www. TLS — через kamal-proxy.
- ⚠️ **НЕ ИСПОЛЬЗУЕТСЯ:** `/var/www/booster.delivery` (старая копия), pm2, nginx
  (inactive). Не деплоить туда — сайт этого не заметит.
- **SSH с Mac Алекса:** хост-алиас `myserver` (~/.ssh/config). В неинтерактивной
  сессии сначала: `export SSH_AUTH_SOCK=$(ls /private/tmp/com.apple.launchd.*/Listeners | head -1)`

## Build = vite + esbuild + ПРЕРЕНДЕР

`npm run build` делает три шага:
1. `vite build` → `dist/public/` (клиент)
2. `esbuild server/index.ts` → `dist/index.js`
3. `node scripts/prerender.mjs` → статические HTML-снапшоты **всех 11 роутов**
   в `dist/public/*.html` (для ИИ-краулеров, которые не исполняют JS).

Пререндеру нужен **playwright chromium** — на сервере уже установлен
(`/root/.cache/ms-playwright/`). Если билд падает на prerender:
`npx playwright install chromium`.

Express отдаёт снапшоты через `express.static({extensions:['html']})`:
`/th` → `th.html` и т.д. Фолбэк на index.html для остальных путей сохранён.

## Стандартный деплой

```bash
# С Mac (или попросить Claude — он делает это через desktop-commander):
export SSH_AUTH_SOCK=$(ls /private/tmp/com.apple.launchd.*/Listeners | head -1)
ssh myserver "cd /root/consulting-website \
  && git pull origin main \
  && npm install --no-audit --no-fund \
  && npm run build \
  && systemctl restart consulting-website \
  && sleep 2 && systemctl is-active consulting-website"
```

**Урок 15.09.2026 — сборка должна жить на сервере, а не в ssh-сессии.** Деплой
выше запущен через `nohup ssh ... &` с Mac; ssh-сессия оборвалась на середине
пререндера (после 6 из 9 ru-страниц), вместе с ней умерла сборка, и
`systemctl restart` не выполнился — сервис остался на версии предыдущего дня,
хотя `git log` на сервере показывал свежий коммит. Симптом: ru-снимки новых
страниц отсутствуют, `systemctl show consulting-website -p ActiveEnterTimestamp`
старее коммита. Правильно — отвязать сборку от ssh:

```bash
ssh myserver "cd /root/consulting-website && git pull origin main && npm install --no-audit --no-fund \
  && nohup sh -c 'npm run build && systemctl restart consulting-website' > /root/deploy.log 2>&1 < /dev/null & disown"
# потом опрашивать: ssh myserver "tail -2 /root/deploy.log; systemctl show consulting-website -p ActiveEnterTimestamp"
```

После деплоя всегда сверять `ActiveEnterTimestamp` с временем коммита и считать
снимки: `ls dist/public/lang-ru/answers | wc -l` должно равняться
`ls dist/public/answers | wc -l`.

## Sitemap в Search Console: «Не получено». Разобрано 14.09.2026 — НЕ ПЕРЕСОЗДАВАТЬ

Полтора месяца карта сайта пересоздавалась около десяти раз, и каждый раз
запись сразу вставала в статус «Не получено». Разбор 14.09.2026 закрывает
вопрос: **дело не в файле, и новый файл помочь не может.**

### Что показывает Консоль

Все семь карт ресурса (`booster.delivery` и пять поддоменов) — статус
«Не получено», **тип «Неизвестно», дата последней обработки ПУСТАЯ, найдено
0 страниц**. Пустая дата обработки при неизвестном типе означает не «пробовал
и не смог», а «ни разу не читал».

### Что показывает наш сервер

В `logs/traffic-*.jsonl` (см. `server/crawler-log.ts`) видно каждый запрос:

- настоящий Googlebot (IP 66.249.x) сделал 148 запросов, все 200, из них
  **к `/sitemap.xml` — ни одного**; `/robots.txt` он берёт постоянно (59 раз),
  а карта в robots.txt объявлена;
- при этом карту регулярно и успешно забирают другие: ClaudeBot 115 раз,
  GPTBot 10, Bingbot 7 — все 200;
- два захода на карту с UA Googlebot пришли с IP Cloudflare (162.158.x,
  104.28.x), то есть это не Googlebot, а подделка UA или чей-то прокси.

### Что проверено и исключено

| Гипотеза | Результат |
|---|---|
| robots.txt закрывает карту | нет, открыт, карта объявлена, все боты получают 200 |
| 404 / недоступность / неверный URL | нет, 200 и `application/xml`, XML валиден, 27 url |
| Неснятая ручная санкция (прямо названа в справке Google причиной) | нет, «Меры, принятые вручную» — «Проблем нет» |
| Право собственности слетело | нет, «Провайдер доменных имён — успешно подтверждено» |
| IPv6-ловушка (AAAA есть, отвечает плохо) | AAAA-записи нет вообще |
| DNS отдаёт разное разным резолверам | нет, 8.8.8.8 и 1.1.1.1 дают один IP |
| Googlebot блокируется до Express | нет, он в логе, 148 запросов, все 200 |

Остаётся единственная причина из списка в справке Google, которая не
противоречит данным: **низкий спрос на сканирование карты** (low crawl demand).
Сайт молодой — Googlebot начал ходить 08.09.2026, в Поиске всего 44 клика.

### Что из этого следует практически

1. **Не пересоздавать карту и не пересабмичивать её «на удачу».** Файл ни разу
   не читали; десятый по счёту файл будет одиннадцатым непрочитанным.
2. **Индексация идёт и без карты.** Отчёт «Индексирование страниц» на 14.09:
   10 страниц в индексе, 4 не в индексе (2 «страница с переадресацией»,
   2 «вариант страницы с canonical»). То есть механизм работает, карта
   сейчас не узкое место.
3. **Рабочий путь для новой страницы — «Проверка URL» → «Запросить
   индексирование».** Он не зависит от карты. По справке Google: квота есть,
   повторный запрос по тому же адресу не ускоряет.
4. **Что реально двигает спрос на сканирование** — внешние ссылки и рост
   обращений к страницам, а не файл карты. Это задача контента и PR-бэклога,
   не деплоя.
5. Если статус когда-нибудь сменится на «Успешно» — значит спрос вырос, и это
   следствие, а не причина.

## Проверка после деплоя

```bash
# Все роуты из sitemap должны отдавать 200 (список берём из самого sitemap):
for p in $(curl -s https://booster.delivery/sitemap.xml | grep -o '<loc>[^<]*' | sed 's|<loc>https://booster.delivery||'); do
  curl -s -o /dev/null -w "$p %{http_code}\n" "https://booster.delivery$p"; done
curl -s https://booster.delivery/llms.txt | head -3
# Что видит бот без JS (должно быть 1000+ слов, а не пустой div):
curl -sA "GPTBot" https://booster.delivery/th | wc -w
# ПУТЬ бота с главной (урок 2026-08-25: главная была тупиком — 0 ссылок).
# Внутренних <a href="/..."> на корне должно быть 15+ (8 стран + кейсы + /about):
curl -sA "GPTBot" https://booster.delivery/ | grep -c 'href="/'
```

⚠️ Пререндер каждой страницы — не гарантия связности: боту нужен ПУТЬ между
страницами через настоящие `<a href>`. Кнопки с onClick для краулера не
существуют. Любой новый интерактивный переход (гейт, табы, «показать ещё»)
проверять этим grep'ом.

## Google Search Console — переиндексация

Свойство: sc-domain:booster.delivery (доступ у Алекса; Claude может через Chrome).

**Обязательно** после деплоя, который добавляет НОВЫЕ страницы или существенно
меняет ключевые (/, /id, /th, кейсы):
1. Sitemaps → переотправить `https://booster.delivery/sitemap.xml`.
2. Проверка URL → «Запросить индексирование» для каждой новой/изменённой
   страницы (лимит ~10/день; в первую очередь страницы рынков и кейсы).
   Это сокращает попадание в индекс с недель до 1–3 дней.

**Не обязательно** при мелких правках текста — Google дойдёт сам по sitemap.

Контекст (2026-08-25): до включения пререндера в индексе были ТОЛЬКО 2 страницы
(/ и /?lang=ru) — сайт-SPA был для Google пустым. После пререндера кейсы попали
в индекс за часы через sitemap, но /id и /th пришлось запрашивать вручную —
на них не было ссылок. Отчёт «Страницы» в GSC отстаёт на несколько дней;
реальный статус смотреть через «Проверка URL».

## Деплой только статики (llms.txt, robots, sitemap — без пересборки)

```bash
ssh myserver "cd /root/consulting-website && git pull -q origin main \
  && cp client/public/llms.txt client/public/sitemap.xml client/public/robots.txt dist/public/"
```

## Git

- Прод-ветка: `main`, репозиторий: https://github.com/mazur-exp/consulting-website
- Из облачной сессии Claude пушить нельзя (нет креденшалов) — файлы переносятся
  на Mac (device_commit_files в подключённую папку `/Users/mzr/Developments/consulting-website`),
  коммит и push выполняются на Mac.
- Counter-страница: `client/public/counter.html`, отдаётся как статика
  (домен counter.booster.delivery через kamal-proxy).
