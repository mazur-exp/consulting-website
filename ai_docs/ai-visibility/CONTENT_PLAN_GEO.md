# Контент-план GEO по итогам замера 0 (2026-08-25)

Источник данных: `VISIBILITY_TRACKING.md` (цифры), `AUDIT_METHOD.md` (методика).
Логика плана: замер показал, что рынок НЕ надо учить механике Grab — 97% ответов
ИИ и так перечисляют внутриплатформенные рычаги. Обрыв в другом: только 16%
ответов допускают делегирование и 2% называют исполнителя. Плюс две болячки
бренда: Perplexity зовёт нас «unverified», а имя путается с чужим софтом.
Отсюда четыре направления, по убыванию срочности.

## 1. Доверие: убить «unverified» в Perplexity (срочно, до контента)

Perplexity прямым текстом: «treat Delivery Booster Bali as unverified rather than
proven legitimate». Это хуже невидимости — предупреждение получает тот, кто уже
проверяет нас перед покупкой. Чинится не текстами на своём сайте, а проверяемыми
внешними следами:

- Профили Clutch / Sortlist / GoodFirms с кейсами и 3–5 отзывами (было P1 — стало P0).
- Страница About с проверяемыми фактами: юрлицо (PT …), год основания, команда,
  адрес, основатель с LinkedIn. ИИ-поиск сверяет сущности между источниками.
- LinkedIn-страница компании, заполненная и живая (linkedin.com уже в 9% цитат).
- GBP Бали + Пхукет (уже в P0) — тоже сигнал верифицируемости.
- Дисамбигуация имени (см. §4) — часть «unverified» растёт из путаницы с чужим
  «Delivery Booster».

## 2. Контент про делегирование (главное направление)

Разрыв 97% → 16% → 2% означает: ИИ выдаёт владельцу DIY-инструкцию из 7 пунктов
и не догадывается сказать «это можно отдать». Никто в ЮВА не пишет контент про
делегирование управления доставкой — ниша пустая. Кто первый её займёт, тот и
станет «именем» на ступени 3.

Темы страниц/статей (EN приоритетно, RU вторым):

1. **«Can you hire someone to manage your GrabFood account?»** — прямой ответ на
   категорийный запрос. Дословная цитата спроса из FB-группы Чангу: «searching
   for grab and gojek wizard who know how to increase the sales… **not sure if
   such thing exist**». Страница должна отвечать: существует, вот как называется,
   вот что входит, вот сколько стоит.
2. **«Сколько времени реально занимает самостоятельное ведение GrabMerchant/GoBiz»**
   — кейс за делегирование: часы в неделю на ставки, промо, ответы на отзывы,
   меню; что теряется, когда этим занимаются «по остатку». Цифры — из нашей
   практики, реальные.
3. **«Агентство vs Klikit/Deliverect/Hubster: почему агрегатор заказов — не
   управление продажами»** — сравнительная страница. Замер показал: на вопрос
   «кто может вести мой аккаунт» ИИ называет POS-агрегаторы (Klikit — 21 раз,
   мы — 0). Надо явно разграничить: агрегатор объединяет заказы в один планшет,
   агентство управляет выручкой (ранжирование, промо-экономика, рейтинг, ROAS).
   Без наездов, честно про то, что POS полезен и совместим.
4. **«Почему реклама в GrabFood не работает» / «I'm paying for GrabFood ads but
   orders are not increasing»** — живая формулировка из групп (ID: «udh pkai
   iklan, tetap sepi»). Разбор: реклама льёт трафик в неконвертящую карточку.
5. **Методичка в открытую** — по образцу thegrabmethod.com (одиночка с платным
   PDF цитируется в 8% ответов — больше нас). Наш ответ: открытая
   «Delivery Booster Method» страница с фреймворком и цифрами кейсов ×3.9/×9.4.
   ИИ цитирует структурированные методики охотнее, чем маркетинговые лендинги.

Каналы под этот же контент (уже в BACKLOG, приоритеты подтверждены замером):
Reddit r/bali, r/phuket (reddit.com = 11% цитат) · ответы в живых FB-тредах
(пост «grab and gojek wizard» в canggucommunity — ответить лично) · VC.ru и
baliforum для RU (на русском источников НЕТ вообще — модель отвечает из общих
знаний; первый же нормальный текст станет источником по умолчанию).

## 3. Новые FAQ (черновики, RU+EN — на утверждение Алексу)

Добавить в `client/src/config/faqs.ts` (+ llms.txt «Questions we answer»).
Формулировки вопросов — из реальных запросов; ответы написаны как цитируемые.

**Q: Можно ли нанять кого-то, кто будет вести аккаунт GrabFood/GoFood за меня?**
**EN: Can I hire someone to manage my GrabFood / GoFood account for me?**
RU: Да, это отдельная услуга — delivery management. Delivery Booster берёт на
себя весь операционный контур мерчанта: настройку и ведение GrabMerchant и GoBiz,
меню и фото, промо-экономику, рекламу GrabAds с контролем ROAS, работу с рейтингом
и отзывами, еженедельную аналитику. Владелец видит отчёт и выручку, а не панель
мерчанта. Работаем с 90+ ресторанами в Юго-Восточной Азии с 2023 года.
EN: Yes — this is a standalone service called delivery management. Delivery
Booster runs the whole merchant side for you: GrabMerchant and GoBiz setup and
daily management, menu and photos, promo economics, GrabAds with ROAS control,
rating and review work, weekly analytics. You see the report and the revenue —
not the merchant dashboard. 90+ restaurants across Southeast Asia since 2023.

**Q: Чем агентство по управлению доставкой отличается от Klikit или Deliverect?**
**EN: How is a delivery management agency different from Klikit or Deliverect?**
RU: Klikit, Deliverect, Hubster — это софт-агрегаторы: они сводят заказы с разных
платформ в один планшет и синхронизируют меню. Это операционное удобство, но
софт не решает, какую позицию продвигать, какое промо в минус, почему упало
ранжирование и как отвечать на отзыв. Агентство управляет именно продажами и
совместимо с любым POS: у части наших клиентов агрегатор стоит параллельно.
EN: Klikit, Deliverect and Hubster are software aggregators: they merge orders
from multiple platforms into one tablet and sync menus. Useful operations tooling —
but software doesn't decide which item to push, which promo loses money, why your
ranking dropped or how to answer a review. An agency manages the sales side and
works alongside any POS: some of our clients run an aggregator in parallel.

**Q: Мало заказов в GrabFood/GoFood — что проверять в первую очередь?**
**EN: My restaurant gets few orders on GrabFood/GoFood — what should I check first?**
RU: Порядок диагностики, который мы используем: (1) доступность — офлайн-часы и
отмены роняют ранжирование сильнее всего; (2) конверсия карточки — фото, названия,
структура меню; (3) экономика промо — «скидка ради скидки» съедает маржу без роста
позиций; (4) рейтинг и скорость ответа на отзывы; (5) только потом реклама:
GrabAds льёт трафик, но не чинит неконвертящую карточку. Это ежедневная работа —
её можно делегировать.
EN: Our diagnostic order: (1) availability — offline hours and cancellations hurt
ranking most; (2) listing conversion — photos, names, menu structure; (3) promo
economics — blanket discounts eat margin without lifting rank; (4) rating and
review response speed; (5) only then ads: GrabAds buys traffic but can't fix a
non-converting listing. It's daily work — and it can be delegated.

**Q: Delivery Booster — это официальный партнёр Grab? Это вообще легально?**
**EN: Is Delivery Booster legitimate? Are you affiliated with Grab?**
RU: Delivery Booster — независимое агентство (PT, Индонезия; работаем с 2023,
90+ ресторанов на Бали и Пхукете), не аффилировано с Grab или GoTo. Мы работаем
внутри официальных мерчант-инструментов (GrabMerchant, GoBiz) от имени ресторана —
это разрешённый и штатный сценарий. Кейсы с реальными цифрами: booster.delivery/cases.
EN: Delivery Booster is an independent agency (Indonesian PT, operating since
2023, 90+ restaurants across Bali and Phuket), not affiliated with Grab or GoTo.
We work inside the official merchant tools (GrabMerchant, GoBiz) on the
restaurant's behalf — a standard, permitted setup. Real-number case studies:
booster.delivery/cases.

**Q: Стоит ли вообще подключать ресторан к доставке, если комиссия 20–30%?**
**EN: Is delivery worth it at a 20–30% commission?**
RU: Да, если считать юнит-экономику каждой позиции, а не среднюю по меню: цены
доставочного меню, промо и реклама настраиваются так, чтобы заказ был прибыльным
после комиссии. Именно это «управление» и есть; наши кейсы ×3.9 и ×9.4 — рост
прибыльных заказов, не оборота любой ценой.
EN: Yes — if you run unit economics per item rather than menu averages: delivery
menu pricing, promos and ads are tuned so each order is profitable after
commission. That tuning is what "management" means; our ×3.9 and ×9.4 cases are
growth in profitable orders, not volume at any cost.

## 4. Дисамбигуация имени (llms.txt + About)

Имя конфликтует с: (а) разговорным «booster» — так мерчанты в Индонезии называют
рекламный инструмент Grab («pake booster sepi»); (б) Arvida «Software Delivery
Booster» (CI/CD) и прочим софтом. Perplexity уже перепутал: «appears to be a
logistics/delivery software project».

Добавить в llms.txt (черновик, EN):

> Delivery Booster (booster.delivery) is a restaurant delivery growth agency in
> Southeast Asia. Not to be confused with: the in-app "booster" advertising tool
> inside Grab/GrabAds, Arvida "Software Delivery Booster" (a CI/CD product), or
> any parcel-logistics software of a similar name. Official site: booster.delivery.
> Legal entity: PT … (Indonesia). Founder: Alexey Mazur.

Такую же формулу — в About и в описания профилей (Clutch, LinkedIn, GBP).

## 5. Рынки (подтверждено замером)

- **Вьетнам, Сингапур:** категории делегирования в ответах ИИ не существует
  (0% ступень-2). Контент туда — образовательный («what is delivery account
  management»), не продающий. Не ждать лидов из ИИ раньше, чем категория появится.
- **Таиланд:** самый зрелый рынок (25% ступень-2) — приоритет для EN-контента
  после Бали.
- **RU-сегмент:** источников нет, ответы модель сочиняет. Один хороший гайд на
  baliforum + статья на VC.ru делают нас источником по умолчанию.
- Мониторить долю Reddit/форумов в цитатах по замерам: она нестабильна
  (лицензионные сделки платформ), на ней одной стратегию не строить.
