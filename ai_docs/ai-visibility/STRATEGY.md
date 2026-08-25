# Стратегия AI Visibility (GEO)

**Цель:** когда ресторатор спрашивает ИИ «кто подключит и будет вести мой ресторан
на Grab/GoJek в Бали / Пхукете / ЮВА» — ответ называет Delivery Booster.

## Как ИИ на самом деле выбирает, кого рекомендовать

- Perplexity, ChatGPT Search, Gemini отвечают через **живой поиск** (RAG), а не из
  весов модели. Попал в индекс и в цитируемые источники → попал в ответы через
  дни/недели, не «3–4 месяца обновления баз».
- ИИ-краулеры (GPTBot, ClaudeBot, PerplexityBot) **не исполняют JavaScript** —
  поэтому пререндер критичен (сделан 2026-08-25).
- Классический SEO по-прежнему важен: ИИ-поиск опирается на обычные поисковые
  индексы. «ИИ не ранжирует по ссылкам» — миф.
- Локальные запросы («агентство на Бали») тянутся из карт → Google Business Profile
  с отзывами-маркерами — приоритет №1 из внешних каналов.

## Оценка каналов (что работает / что нет)

**Высокий эффект:** пререндер+schema+llms.txt (done) · GBP Бали и Пхукет + отзывы
с формулировками услуг · страницы-ответы FAQ (done) · страницы кейсов с цифрами
(done) · Clutch/Sortlist/GoodFirms · Reddit (r/bali, r/phuket, r/digitalnomad),
Quora · VC.ru и baliforum (RU-аудитория) · Thaiger и экспатские медиа Пхукета (EN).

**Низкий эффект / ловушки:** Habr (аудитория — айтишники, не рестораторы) ·
Medium (домен потерял вес) · пресс-релизы в Detik/Kumparan (дорого, рано) ·
ключевики в НАЗВАНИИ Google Maps (нарушение правил Google — риск блокировки
профиля; ключевики только в описании/услугах/постах) · «ИИ индексирует
Telegram-чаты» — преувеличение, чаты = канал лидов, не GEO.

## Семантическое ядро (вшивать в контент, отзывы, статьи)

EN: GrabFood restaurant onboarding Bali/Phuket · full-service GoBiz & GrabMerchant
management · food delivery optimization agency Indonesia/Thailand/Southeast Asia ·
menu optimization for GrabFood app · outsourced restaurant delivery operations ·
best agency for food delivery growth in Canggu/Ubud/Patong.

RU: подключение ресторана к GrabFood/GoJek под ключ · управление аккаунтом
GrabMerchant/GoBiz · агентство по ведению и продвижению доставки еды · увеличение
продаж доставки · настройка меню и акций в GoJek/Grab.

## Измерение успеха (ежемесячно)

Прогонять один и тот же список из ~20 вопросов через ChatGPT, Perplexity, Gemini,
Claude и фиксировать в таблице: упомянут ли Delivery Booster, на какой позиции,
какой источник процитирован. Список вопросов — в BACKLOG (задача «замер видимости»).
Только этот замер показывает, что реально работает.
