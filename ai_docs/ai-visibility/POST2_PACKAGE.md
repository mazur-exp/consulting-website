# Пакет каналов: «Grab и GoFood не рекламные площадки» (пост 2 основателя)

Актив: `https://booster.delivery/answers/grabfood-ads-not-working` (24.09 добавлен блок
«Что такое нормальная воронка» и FAQ «Какая конверсия считается нормальной»).
Данные: воронка 90 ресторанов GrabFood Бали + 13 Пхукет, 26.06-23.09.2026
(`FUNNEL_DATA_2026-09-24.md`); окупаемость и потери из бенчмарка январь-август 2026.
Файлы: `attached_assets/linkedin-post2/` (PDF 8 стр., слайды IG 1-6, картинки RU, тексты).

## Статус (24.09.2026, опубликовано Claude через Chrome по слову Алекса «пости все сам»)

| Канал | Что вышло | Ссылка / файлы |
|---|---|---|
| Сайт | /answers/grabfood-ads-not-working: блок воронки + FAQ, деплой 04:44 UTC, бот видит текст, индексация запрошена в GSC | https://booster.delivery/answers/grabfood-ads-not-working |
| LinkedIn (EN) | документ 8 стр. «GrabFood & GoFood Ads: Fix Conversion First (Bali, 2026)» + текст 2 933 зн., первый комментарий со ссылкой | https://www.linkedin.com/feed/update/urn:li:activity:7508750272257519616/ |
| Telegram (RU) | альбом из 2 картинок (funnel-ru, chart2-ad-payback-ru) с коротким кэпшном-крючком, следом полный текст со ссылкой (превью страницы) | канал `@deliverybooster_asia`, 24.09 12:55-12:56 |
| Instagram (EN) | карусель 6 слайдов 4:5 (страницы 1, 3, 4, 5, 6, 8 документа) + кэпшн, 10 хэштегов | @delivery.booster, 24.09. Ссылка в bio на страницу: с телефона (Алекс) |
| Короткий RU | текст + short-post-2-ru.png, по случаю | раздел 4 |
| Reddit | не раньше 29.09, только ответом в тред | раздел 5 |

Как публиковали технически (пригодится в следующий раз): LinkedIn/Telegram/Instagram
не держат `input[type=file]` в DOM, а создают его по клику и открывают системный диалог.
Обход: патч `HTMLInputElement.prototype.click` через javascript_tool (для type=file не
открывать диалог, а вставить input в DOM с id), потом `file_upload` в этот input.
Текст в LinkedIn: `execCommand('insertText')` построчно + `insertParagraph` (paste-событие
теряет пустые строки). В Instagram наоборот: только paste-событие (insertText не работает),
и один раз, иначе дублируется. В Telegram WebA: `#editable-message-text` + insertText.
Telegram: кэпшн к альбому до 1 024 знаков, поэтому длинный текст идёт вторым сообщением.

---|---|---|---|---|
| после «публикуй» | LinkedIn, личная страница (EN), утро WIB | PDF-документ 8 стр. + текст, ссылка первым комментарием | post2-ads-not-ad-networks.pdf | текст утверждён, ждёт слова |
| тот же день | Telegram `@deliverybooster_asia` (RU) | длинный пост + 2 картинки | funnel-ru.png, chart2-ad-payback-ru.png (из пакета колонки) | на утверждение |
| тот же день или +1 | Instagram `@delivery.booster` (EN) | карусель 6 слайдов 4:5 + кэпшн | slide-1 … slide-6 | на утверждение |
| по случаю | короткий вариант RU для чатов | 4 предложения + картинка | short-post-2-ru.png | на утверждение |
| не раньше 29.09 | Reddit r/bali, r/canggu | только ответом в чужой тред | - | текст готов |

---

## 1. Telegram, RU

🧠 Grab и Gojek не рекламные площадки. Ставка усиливает позицию, но не создаёт её.

Большинство владельцев ресторанов на Бали крутят рекламу в доставке с неверной моделью в голове: заплатил больше, поднялся выше. Так работает рекламная сеть, которая зарабатывает на показах.

Grab и Gojek зарабатывают комиссию с заказов, а их главный актив это собственная аудитория. Поэтому ранжирование отвечает на один вопрос: сколько эта карточка приносит нам с каждого клиента, которого мы ей отправили. Карточка, которая конвертит, продвигается бесплатно, площадке это выгодно. А больший бюджет на карточке, которая не конвертит, покупает тот же провал, только быстрее.

📊 Как выглядит норма на GrabFood на Бали. 90 ресторанов, 26 июня - 23 сентября 2026, 5,8 млн охвата:

• 7,4% увидевших ресторан открывают меню
• 11,5% открывших меню делают заказ
• сквозная конверсия 0,82%: меньше одного заказа на 100 увидевших
• лучший ресторан выборки: 1,85%, больше чем вдвое на том же трафике

Пхукет, 13 ресторанов: 8,5% открывают, 11,7% заказывают, сквозная 0,98%, лучший 2,8%.

Реклама двигает только первую цифру, охват. Две остальные решает карточка. Меню открывают меньше 7%: проблема в том, что видно в ленте (обложка, название, рейтинг, время доставки). Заказывают меньше 11% открывших: проблема внутри меню (выключенные позиции, фото на хитах, цены, промо). Каждый пункт ниже медианы это доля рекламного бюджета, оплаченная впустую.

💸 Куда уходят деньги (бенчмарк 2026, 96 ресторанов, 270 568 заказов): четверть выручки доставки теряется до того, как заработана, и 95% этого выключенные «на сейчас» позиции меню. Медианная окупаемость рекламы 10,4x на Бали и 22,8x на Пхукете. Ниже 5x только 6% ресторанов, и почти ни у кого из них нет проблемы с рекламой. У них проблема с карточкой, которую реклама оплачивает и выставляет напоказ.

Потолок: 6% выручки на рекламу. До этой линии медианная окупаемость 12,1x, после 8,6x. 42% ресторанов выборки уже за ней.

✅ Что проверить на этой неделе, в этом порядке, до того как трогать бюджет:

1. Insights в GrabMerchant и GoBiz: охват, просмотры меню, заказы за 30 дней. Сравнить с 7,4% и 11,5%. Охват растёт, заказы нет: проблема конверсии, а не охвата.
2. Отчёт по выключенным позициям. Каждое выключенное блюдо это дыра в меню, которое вы рекламируете за деньги.
3. Фото и названия на хитах. Именно туда приземляется реклама.
4. Динамика рейтинга и время принятия заказа за 30 дней. Оба напрямую в ранжировании.
5. Только теперь поднимать бюджет, и остановиться на 6% выручки.

Оговорка: это выборка ресторанов под управлением агентства, а не рынок. Воронка за июнь-сентябрь из кабинетов GrabMerchant, окупаемость и потери за январь-август из опубликованного бенчмарка. По рынку в целом потери наверняка хуже.

Полный разбор с цифрами: https://booster.delivery/answers/grabfood-ads-not-working

Какая доля выручки доставки у вас уходит на рекламу? Если больше 6%, следующая рупия покупает показы, а не заказы.

**Картинки:** funnel-ru.png, chart2-ad-payback-ru.png (график окупаемости по доле рекламы, RU, из пакета колонки).

---

## 2. LinkedIn, EN

Текст в `attached_assets/linkedin-post2/post2-linkedin-text.md` (2 933 знака). Документ
`post2-ads-not-ad-networks.pdf`, Document title: «GrabFood & GoFood Ads: Fix Conversion First.
Bali & Phuket Funnel Data 2026». Первый комментарий сразу после публикации:

`The full write-up with every number, free: https://booster.delivery/answers/grabfood-ads-not-working`

---

## 3. Instagram, карусель 6 слайдов (EN), файлы slide-1 … slide-6

Слайды это страницы 1, 3, 4, 5, 6, 8 документа (1080x1350, футер с логотипом и ссылкой).

**Кэпшн:**

GrabFood and GoFood are not ad networks. Your bid amplifies a position. It does not create one.

What normal looks like on GrabFood in Bali, 90 restaurants, June to September 2026: 7.4% of the people who see a restaurant open the menu, 11.5% of those order. End to end, 0.8 orders per 100 people reached. The best restaurant in the sample: 1.85%.

Ads move only the first number. If under 7% open the menu, fix what people see in the feed. If under 11% of menu visitors order, fix the menu: switched-off items, photos on best sellers, prices, promos. Every point below the median is ad budget paid for nothing.

The ceiling is 6% of revenue on ads: below it the median payback is 12.1x, above it 8.6x.

Full write-up with every number: link in bio.

#GrabFood #GoFood #Bali #Phuket #RestaurantMarketing #FoodDelivery #GrabMerchant #RestaurantOwner #BaliBusiness #DeliveryBooster

Ссылка в bio: `https://booster.delivery/answers/grabfood-ads-not-working` (с телефона, как и в прошлый раз).

---

## 4. Короткий вариант, RU, для чатов и комментариев (картинка short-post-2-ru.png обязательна)

Grab и Gojek зарабатывают на комиссии с заказов, а не на показах, поэтому ставка усиливает позицию карточки, но не создаёт её. По 90 ресторанам GrabFood на Бали медиана такая: 7,4% увидевших открывают меню, 11,5% открывших заказывают, сквозная конверсия 0,82%, у лучшего 1,85%. Реклама двигает только первую цифру, остальные две решает карточка. Полный разбор и что проверить до того, как поднимать бюджет: https://booster.delivery/answers/grabfood-ads-not-working

---

## 5. Reddit, r/bali, r/canggu (EN), только ответом в тред, где владелец жалуется на рекламу

Not an ads problem in most cases we open. Grab and Gojek earn a commission on orders, not on impressions, so their ranking follows how well a listing converts the people they send it. A bid amplifies a position, it does not create one.

Numbers from 90 GrabFood restaurants in Bali, June to September this year: the median restaurant gets 7.4% of the people who see it to open the menu and 11.5% of those to order, so about 0.8 orders per 100 people reached. The best one does 1.85% on the same kind of traffic. Ads only move the first number. If fewer than 7% open the menu, it is the feed (cover photo, name, rating, delivery time). If fewer than 11% of menu visitors order, it is the menu itself (switched-off items, photos on best sellers, prices).

Before raising the budget: check reach, menu visits and orders in GrabMerchant Insights for the last 30 days, then the switched-off items report, then photos on your top sellers. And stop at 6% of revenue on ads, past that line the median payback in our data drops from 12.1x to 8.6x.

I run an agency that manages these accounts, so the sample is biased toward restaurants that are watched daily; the full breakdown is here if useful: https://booster.delivery/answers/grabfood-ads-not-working
