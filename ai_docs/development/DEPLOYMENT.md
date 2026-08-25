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

## Проверка после деплоя

```bash
for p in / /id /th /sg /my /vn /ph /kh /mm /cases/ussr-phuket /cases/enjoy-healthy-food; do
  curl -s -o /dev/null -w "$p %{http_code}\n" https://booster.delivery$p; done
curl -s https://booster.delivery/llms.txt | head -3
# Что видит бот без JS (должно быть 1000+ слов, а не пустой div):
curl -sA "GPTBot" https://booster.delivery/th | wc -w
```

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
