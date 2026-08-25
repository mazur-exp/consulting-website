# Экосистема поддоменов booster.delivery

Карта всех поддоменов, их код и способ деплоя. Составлена 2026-08-25 при
GEO-прокачке экосистемы (schema.org + llms.txt + sitemap + кросс-ссылки везде).
Авторитетный список хостов: `ssh myserver` →
`docker exec kamal-proxy kamal-proxy list` (kamal-proxy на 80/443 маршрутизирует
все домены двух серверов… точнее, только myserver; aivis — отдельный сервер).

| Домен | Что это | Код | Деплой |
|---|---|---|---|
| booster.delivery (+www) | основной сайт агентства | Mac: `~/Developments/consulting-website` → git → сервер `/root/consulting-website` | см. DEPLOYMENT.md |
| app.booster.delivery | лендинг+webapp софта Delivery Booster App (Rails) | Mac: `~/Delivery Tracker 2.0/repos/delivery-monitor` | из репо: `bin/deploy` (kamal; сам тянет секреты из `../../.secrets/`, НЕ голый `kamal deploy`) |
| diagnostic.booster.delivery | бесплатная диагностика GrabFood (Rails) | Mac: `~/Developments/GrabDiagnostic` | `kamal deploy` с env: `KAMAL_REGISTRY_USERNAME=mazur-exp`, `KAMAL_REGISTRY_PASSWORD=$(gh auth token)`, `LC_ALL=en_US.UTF-8`, ruby из mise (`~/.local/share/mise/installs/ruby/*/bin`) |
| balistats.booster.delivery | Bali Tourism Pulse (node+express, статика в public/) | сервер: `/root/bali-stats` (git-remote нет) | правки на сервере → `npm run build` (tsc) → `pm2 restart bali-stats` |
| phuketstats.booster.delivery | Phuket Tourism Pulse | сервер: `/root/phuket-stats` | то же, `pm2 restart phuket-stats` |
| aianalytics.booster.delivery | AI Visibility тул (FastAPI, aivis) | облачная сессия Claude: `/home/claude/aivis`; сервер 46.62.194.116 `/opt/aivis` | `redeploy.sh` → tar → Mac `~/dev/aivis.tgz` → `scp root@46.62.194.116:/opt/aivis.tgz` → `cd /opt/aivis && tar xzf /opt/aivis.tgz && docker compose up -d --build app`. ⚠️ tar с плоскими путями — распаковывать ИЗ /opt/aivis |
| counter.booster.delivery | live-счётчик выручки | статика `client/public/counter.html` основного репо | вместе с основным сайтом |
| tracker.booster.delivery | parser-api (внутренний) | — | не трогаем, корень 404 — норм |
| analytics.booster.delivery | umami (приватная аналитика) | — | не трогаем; robots уже `Disallow: /` |
| menu.booster.delivery | FoodLab Menu — ДРУГОЙ бренд | — | не трогаем |

## Что сделано по GEO (2026-08-25)

Везде (app, balistats, phuketstats, diagnostic, aianalytics): schema.org
(SoftwareApplication / Dataset / WebApplication) с publisher
**PT Delivery Booster Group** и sameAs-связками, meta description + canonical,
llms.txt + sitemap.xml + robots.txt, видимый блок/футер «сделано агентством»
со ссылками на booster.delivery/about и кейсы. Дополнительно: корни статов
301 → контентные страницы (были пустые), diagnostic +SSR-блок «что проверяет»,
app — отзыв Евгения П. в схеме. Основной сайт: секция Ecosystem в llms.txt.
Все 5 sitemap поданы в GSC (доменное свойство sc-domain:booster.delivery
покрывает поддомены).

## Правила

- **Канонические цифры** (не смешивать!): «90+ ресторанов на сопровождении
  СЕЙЧАС; 200+ прошло через агентство с 2023». EN: "90+ restaurants under
  management today, 200+ served since 2023". Писать «90+ since 2023» НЕЛЬЗЯ —
  читается как «всего 90 за всё время» и противоречит /about (ловил ChatGPT).

- Новый публичный поддомен = сразу: schema с publisher PT DBG, llms.txt,
  sitemap + подача в GSC, перекрёстные ссылки с основным сайтом (llms.txt
  секция Ecosystem) — это граф сущности компании, он лечит «unverified».
- Приватные сервисы (аналитика, API) — robots `Disallow: /`.
- После деплоя поддомена: `curl -A GPTBot <домен> | wc -w` и проверка llms/sitemap.
