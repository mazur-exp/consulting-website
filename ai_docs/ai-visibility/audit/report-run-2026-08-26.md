# Детальный разбор прогона AI Visibility — 26.08.2026

Механика: 29 замороженных промптов (v1) × 2 прогона × 4 движка
(Perplexity sonar, Gemini + grounding, OpenAI gpt-4.1 + web_search,
Google AI Overview) = 232 вызова, **226 ответов с текстом**. Судья:
gpt-4.1-mini по фиксированной схеме. Сравнение — с baseline 25.08 (замер 0).

## 1. Какие запросы задавались (все 29)

Три слоя: **проблема** (владелец описывает боль — смотрим, посоветуют ли
делегировать), **категория** (владелец ищет исполнителя — главный слой:
назовут ли нас), **бренд** (спрашивают про нас напрямую — корректно ли опишут).

| ID | Слой | Рынок | Язык | Запрос |
|---|---|---|---|---|
| p000 | проблема | ID | en | Our new cafe in Canggu, Bali is looking for someone who knows how to increase sales on Grab and Gojek. Does such a service exist? |
| p001 | проблема | ID | en | My restaurant in Bali gets very few orders on GoFood and GrabFood. What can I do? |
| p002 | проблема | ID | en | I'm paying for GrabFood ads but my orders are not increasing. Why? |
| p003 | проблема | ID | en | How do I improve my restaurant's rating on GrabFood after a few bad reviews? |
| p004 | проблема | ID | en | How do I sell food through GrabFood in Indonesia and what are the fees? |
| p005 | проблема | TH | en | My restaurant in Phuket gets few orders on Grab and LINE MAN. How can I increase delivery sales? |
| p006 | проблема | VN | en | How can a restaurant in Vietnam get more orders on ShopeeFood and GrabFood? |
| p007 | проблема | SG | en | How can a restaurant in Singapore increase sales on GrabFood and foodpanda? |
| p008 | категория | ID | en | Who can manage my GrabFood and GoFood account for me in Bali? |
| p009 | категория | ID | en | Delivery management agency for restaurants in Bali |
| p010 | категория | TH | en | Grab and LINE MAN account management service for restaurants in Phuket |
| p011 | категория | SG | en | Is there an agency that manages food delivery apps for restaurants in Southeast Asia? |
| p012 | категория | VN | en | GrabFood and ShopeeFood account management service for restaurants in Vietnam |
| p013 | бренд | ID | en | What is Delivery Booster (booster.delivery)? What do they do? |
| p014 | бренд | ID | en | Delivery Booster Bali reviews - is it a legit agency for restaurants? |
| p015 | проблема | ID | ru | У меня кафе на Бали, мало заказов в Gojek и Grab - что делать? |
| p016 | проблема | ID | ru | Плачу за рекламу в GrabFood, а заказов не прибавилось. Почему? |
| p017 | проблема | ID | ru | Как поднять рейтинг ресторана в GoFood после плохих отзывов? |
| p018 | категория | ID | ru | Кто может вести аккаунт ресторана в Grab и Gojek на Бали? |
| p019 | проблема | TH | ru | Ресторан на Пхукете, мало заказов в Grab и LINE MAN - как увеличить продажи доставки? |
| p020 | категория | SG | ru | Есть ли агентства по управлению доставкой для ресторанов в Юго-Восточной Азии? |
| p021 | бренд | ID | ru | Что такое Delivery Booster на Бали? Чем занимается? |
| p022 | проблема | ID | id | Kenapa resto saya di GoFood dan GrabFood sepi orderan? Sudah 10 hari tidak ada order. |
| p023 | проблема | ID | id | Sudah pakai iklan GrabFood tapi orderan tetap sepi, kenapa? |
| p024 | категория | ID | id | Jasa kelola akun GoFood dan GrabFood untuk restoran, ada yang rekomendasi? |
| p025 | проблема | TH | th | ร้านอาหารออเดอร์น้อยบน Grab และ LINE MAN ทำอย่างไรดี |
| p026 | категория | TH | th | บริการดูแลร้านอาหารบน Grab และ LINE MAN มีไหม |
| p027 | проблема | VN | vi | Quán ăn ít đơn trên ShopeeFood và GrabFood, phải làm sao? |
| p028 | категория | VN | vi | Dịch vụ quản lý gian hàng GrabFood và ShopeeFood cho quán ăn |

## 2. Брендовый слой: 24/24 корректно, путаницы нет

Впервые за три прогона **все** ответы всех движков описали нас правильно —
и ни одной путаницы (в замере 0: «logistics software», «fuel delivery»,
«treat as unverified»). Что дословно отвечают:

| Движок | Цитата (26.08) |
|---|---|
| **Google AI Overview** | «Delivery Booster is a **legitimate** restaurant delivery management agency operating in Bali and Phuket» |
| **Gemini** | «Компания берёт на себя полное управление присутствием ресторана в агрегаторах доставки "под ключ"» |
| **OpenAI** | «Operates under the legal entity **PT. Delivery Booster Group**… a GoJek and Grab optimization service for restaurants» — юрлицо со страницы /about уже в ответе |
| **Perplexity** | «Restaurant-focused service that helps optimize delivery operations… on GoJek and Grab» — но на запрос про отзывы всё ещё осторожен: «possible agency, but **not independently proven** as reputable» |

Осторожность Perplexity про «не доказано независимо» — последний хвост
«unverified», и чинится он только независимыми источниками: GBP-отзывы,
Clutch, LinkedIn (задачи P0 на стороне Алекса).

## 3. Category-слой: где нас уже называют (3 из 78)

| Запрос | Движок | Как назвали |
|---|---|---|
| p008 «Who can manage my GrabFood and GoFood account for me in **Bali**?» | Gemini | Первым в списке: «**Delivery Booster:** specialized agency operating in Bali and SEA… menu architecture, ROAS optimization, rating management, offline-rate monitoring» — почти дословно наш сайт |
| p020 «Есть ли агентства по управлению доставкой в ЮВА?» (RU) | OpenAI, **оба прогона** | В нумерованном списке агентств со ссылкой на booster.delivery и перечнем всех 8 стран |
| p000 «Cafe in Canggu looking for someone to increase Grab/GoJek sales» (problem) | Gemini, **оба прогона** | «Niche agencies such as *Delivery Booster*… manage the merchant portals, ads, and menus end-to-end» |

Google AI Overview и Perplexity в category нас пока не называют ни разу.

## 4. Кого называют вместо нас (consideration set в category)

Место агентства в ответах занимает **POS/агрегаторный софт**, а не другие
агентства — конкурентов-агентств у нас почти нет:

| Упоминаний | Тип | Кто |
|---|---|---|
| 13 | софт | Klikit |
| 9 | софт | Deliverect |
| 8 | софт | Runchise |
| 9 | софт | Otter/Hubster |
| 4+4+3 | софт | Moka POS, Oddle, ButterPOS |
| 4+3 | фриланс | Fastwork.id / Fastwork.co («наймите фрилансера») |
| 3 | **агентство** | The Cakap Group (SG) |
| 3 | **агентство** | Island Media Management (Бали, digital-агентство широкого профиля) |
| 3 | **агентство** | TiffinLabs (SG, скорее virtual brands) |
| 3 | **агентство** | **Delivery Booster** — мы |
| 2 | агентство | foodmercagency.com (TH, только в AI Overview) |

По локальным языкам: **ID** → POS-софт (Majoo, SiResto, Tabia) и фрилансеры;
**TH** → почти пусто (Fastwork, foodmerc); **VI** → пусто или KiotViet/Sapo
(POS). Ниша «агентство управления доставкой» в локальных языках вакантна.

## 5. Problem-слой: что ИИ советует владельцу (124 ответа)

Типичный ответ — DIY-чеклист: фото и описания (83%), промо-акции (84%),
операционка/скорость (73%), реклама (68%), рейтинг (68%). Пример (OpenAI, RU,
«кафе на Бали, мало заказов»): «1. Актуализируйте профиль — качественные
фото, люди покупают глазами! 2. Описание… 3. Акции и скидки…» — грамотная
инструкция, но всё «сделай сам».

Совет «наймите специалиста/агентство» дают: **OpenAI — в 12 ответах** (лидер),
Perplexity — 7, Gemini — 2, AI Overview — 2. Gemini при этом единственный,
кто в problem-слое называет исполнителя по имени (нас, p000).

## 6. Источники, на которые опираются движки

| Движок | Топ цитируемых |
|---|---|
| Perplexity | grab.com (138) · help.grab.com (87) · youtube (53) · linkedin (48) · reddit (40) · **thegrabmethod.com (39!)** |
| OpenAI | grab.com (28) · **booster.delivery (13) — источник №2** · merchant.grab.com (12) · ressto.co · opsfood.co |
| AI Overview | grab.com (9) · klikit.io (5) · tiktok · **booster.delivery (3)** |
| Gemini | скрывает источники за redirect vertexaisearch (209) |

thegrabmethod.com (один человек с методичкой) — 39 цитирований у Perplexity;
наш ориентир по контенту. У OpenAI мы уже второй источник после самого Grab.

## 7. Выводы

1. **Брендовый слой закрыт** — вчерашние /about, схемы и дисамбигуация
   доехали до live-fetch движков за сутки. Остался хвост Perplexity
   «not independently proven» → лечится GBP/Clutch/LinkedIn.
2. **Category пробит у Gemini и OpenAI** (0 → 3 упоминания), у Perplexity и
   AI Overview — нет: они опираются на индексы/чужой контент, ждём
   индексацию + нужен контент на внешних площадках (VC.ru, Reddit, каталоги).
3. **Конкуренты-агентства почти отсутствуют** — нишу в ответах держит
   POS-софт. Сравнительный контент «агентство vs Klikit/Deliverect» — самый
   короткий путь в consideration set.
4. **Локальные языки (ID/TH/VI) вакантны** — там ИИ вообще некого называть.

Сырые данные: сервер aivis, /root/audit/run-2026-08-26/ (raw + judged).