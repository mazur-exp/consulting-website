/**
 * Full case study pages — /cases/<slug>.
 * Data comes from the client-approved case decks (real GrabFood numbers).
 */

export interface CaseStat {
  value: string;
  labelRu: string;
  labelEn: string;
  subRu?: string;
  subEn?: string;
}

export interface BeforeAfterRow {
  metricRu: string;
  metricEn: string;
  before: string;
  after: string;
}

export interface WorkBlock {
  titleRu: string;
  titleEn: string;
  itemsRu: string[];
  itemsEn: string[];
}

export interface CaseStudy {
  slug: string;
  nameRu: string;
  nameEn: string;
  locationRu: string;
  locationEn: string;
  periodRu: string;
  periodEn: string;
  headlineRu: string;
  headlineEn: string;
  heroStats: CaseStat[];
  situationRu: string;
  situationEn: string;
  problemsRu: string[];
  problemsEn: string[];
  work: WorkBlock[];
  results: CaseStat[];
  beforeAfter: BeforeAfterRow[];
  images: { src: string; alt: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'enjoy-healthy-food',
    nameRu: 'Enjoy Healthy Food',
    nameEn: 'Enjoy Healthy Food',
    locationRu: 'Пхукет, Таиланд',
    locationEn: 'Phuket, Thailand',
    periodRu: 'Январь 2025 — март 2026 (14 месяцев)',
    periodEn: 'January 2025 — March 2026 (14 months)',
    headlineRu: 'Выручка на GrabFood выросла в 9.4 раза',
    headlineEn: 'GrabFood revenue grew 9.4x',
    heroStats: [
      { value: 'x9.4', labelRu: 'выручка', labelEn: 'revenue' },
      { value: 'x4.6', labelRu: 'заказы', labelEn: 'orders' },
      { value: '27.5x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS' },
    ],
    situationRu:
      'Ресторан здорового питания на Пхукете. На старте — 34 заказа и 16 873 THB в месяц: ресторан был практически невидим в GrabFood.',
    situationEn:
      'A healthy food restaurant in Phuket. At the start — 34 orders and 16,873 THB a month: the restaurant was nearly invisible on GrabFood.',
    problemsRu: [
      'Offline Rate до 109% — ресторан был недоступен для клиентов длительное время',
      'Реклама не запускалась — ноль платного трафика, только органическая выдача',
      'Ключевые слова не проработаны — ресторан не появлялся в релевантных поисках',
      'Структура меню и описания не оптимизированы под конверсию',
      'Время ожидания водителя 293–437 секунд — минус к операционному рейтингу',
    ],
    problemsEn: [
      'Offline rate up to 109% — the restaurant was unavailable to customers for long stretches',
      'No ads running — zero paid traffic, organic reach only',
      'No keyword work — the restaurant didn\'t appear in relevant searches',
      'Menu structure and descriptions not optimized for conversion',
      'Driver waiting time of 293–437 seconds hurting the operational rating',
    ],
    work: [
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        itemsRu: [
          'Оптимизировали название и описание ресторана',
          'Составили карту ключевых слов для Пхукета',
          'Внедрили высокочастотные запросы в меню',
          'Реструктурировали категории под поиск',
        ],
        itemsEn: [
          'Optimized restaurant name and description',
          'Built a Phuket keyword map',
          'Injected high-volume queries into the menu',
          'Restructured categories for search',
        ],
      },
      {
        titleRu: 'Платная реклама',
        titleEn: 'Paid ads',
        itemsRu: [
          'Запустили GrabAds с нуля',
          'Выстроили структуру кампаний по сегментам',
          'Масштабировали бюджет: 62 → 5 635 THB/мес',
          'Достигли пикового ROAS 27.5x',
        ],
        itemsEn: [
          'Launched GrabAds from zero',
          'Built segmented campaign structure',
          'Scaled budget: 62 → 5,635 THB/month',
          'Reached peak ROAS of 27.5x',
        ],
      },
      {
        titleRu: 'Меню и операционка',
        titleEn: 'Menu & operations',
        itemsRu: [
          'Полный аудит меню и оптимизация фото',
          'Снизили Offline Rate: 73% → 0%',
          'Сократили время ожидания: 437 → 135 сек',
          'Полностью устранили отмены заказов',
        ],
        itemsEn: [
          'Full menu audit and photo optimization',
          'Cut offline rate: 73% → 0%',
          'Reduced waiting time: 437 → 135 sec',
          'Eliminated order cancellations entirely',
        ],
      },
      {
        titleRu: 'Аналитика и контроль',
        titleEn: 'Analytics & control',
        itemsRu: [
          'Еженедельные отчёты и KPI-мониторинг',
          'A/B-тестирование позиций и цен',
          'Механики для повторных заказов',
          'Ежемесячный ревью и перераспределение бюджета',
        ],
        itemsEn: [
          'Weekly reports and KPI monitoring',
          'A/B testing of items and prices',
          'Repeat-order mechanics',
          'Monthly review and budget reallocation',
        ],
      },
    ],
    results: [
      { value: 'x9.4', labelRu: 'рост выручки', labelEn: 'revenue growth', subRu: '20 270 → 190 263 THB/мес', subEn: '20,270 → 190,263 THB/mo' },
      { value: 'x4.6', labelRu: 'объём заказов', labelEn: 'order volume', subRu: '34 → 167 заказов/мес', subEn: '34 → 167 orders/mo' },
      { value: '27.5x', labelRu: 'пиковый ROAS', labelEn: 'peak ROAS', subRu: 'лучший месяц — февраль 2026', subEn: 'best month — February 2026' },
      { value: 'x3.6', labelRu: 'показы в поиске', labelEn: 'search impressions', subRu: '7 038 → 25 543 в месяц', subEn: '7,038 → 25,543 a month' },
      { value: '566', labelRu: 'новых клиентов', labelEn: 'new customers', subRu: 'привлечено за 14 месяцев', subEn: 'acquired in 14 months' },
      { value: '0%', labelRu: 'offline и отмены', labelEn: 'offline & cancellations', subRu: 'было 73% и 7.5%', subEn: 'was 73% and 7.5%' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', before: '20 270 THB', after: '190 263 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', before: '34', after: '167' },
      { metricRu: 'Offline Rate', metricEn: 'Offline rate', before: '73–109%', after: '0%' },
      { metricRu: 'Отмены заказов', metricEn: 'Order cancellations', before: '3–7.5%', after: '0%' },
      { metricRu: 'Время ожидания водителя', metricEn: 'Driver waiting time', before: '437 сек / sec', after: '135 сек / sec' },
      { metricRu: 'Показы в поиске (месяц)', metricEn: 'Search impressions (month)', before: '7 038', after: '25 543' },
      { metricRu: 'Рекламный ROAS', metricEn: 'Ads ROAS', before: '—', after: '27.5x' },
    ],
    images: [
      { src: '/th-assets/ehf-revenue-chart.jpg', alt: 'Enjoy Healthy Food — revenue growth chart on GrabFood' },
      { src: '/th-assets/grab-insights-ehf-sales.jpg', alt: 'Enjoy Healthy Food — GrabFood sales insights, +83% in 90 days' },
      { src: '/th-assets/grab-insights-ehf-customers.jpg', alt: 'Enjoy Healthy Food — GrabFood customer growth, 459 customers in 90 days' },
    ],
  },

  {
    slug: 'ussr-phuket',
    nameRu: 'USSR Phuket',
    nameEn: 'USSR Phuket',
    locationRu: 'Патонг, Пхукет, Таиланд',
    locationEn: 'Patong, Phuket, Thailand',
    periodRu: 'Апрель — май 2026 (2 месяца работы)',
    periodEn: 'April — May 2026 (2 months of work)',
    headlineRu: 'Реанимация ресторана: выручка x3.9 за 2 месяца',
    headlineEn: 'Restaurant revival: revenue x3.9 in 2 months',
    heroStats: [
      { value: 'x3.9', labelRu: 'выручка', labelEn: 'revenue' },
      { value: 'x7.4', labelRu: 'заказы', labelEn: 'orders' },
      { value: '24x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS' },
    ],
    situationRu:
      'Ресторан в Патонге, до нашего прихода — 8 заказов и 9 440 THB в месяц. Из-за Offline Rate в 3 977 минут в месяц ресторан целыми днями был закрыт для алгоритма и клиентов.',
    situationEn:
      'A restaurant in Patong doing 8 orders and 9,440 THB a month before we came in. With a 3,977 min/month offline rate, the restaurant was closed to the algorithm and customers for days at a time.',
    problemsRu: [
      'Offline Rate до 3 977 мин/месяц — ресторан был полностью невидим днями',
      'Реклама не запускалась — аккаунт не индексировался алгоритмом',
      'Рейтинг 4.5 при малом числе отзывов — алгоритм не давал показов',
      'Ключевые слова не проработаны — ноль показов в поиске',
      'Операционные показатели в нуле — нет данных о временах готовки',
    ],
    problemsEn: [
      'Offline rate up to 3,977 min/month — completely invisible for days',
      'No ads — the account wasn\'t being indexed by the algorithm',
      'Rating 4.5 with few reviews — the algorithm gave no impressions',
      'No keyword work — zero search impressions',
      'Operational metrics at zero — no prep-time data at all',
    ],
    work: [
      {
        titleRu: 'Операционная реанимация',
        titleEn: 'Operational revival',
        itemsRu: [
          'Устранили Offline Rate: 990 → 0 мин/день',
          'Настроили режим работы аккаунта',
          'Мониторинг закрытий и стоп-листов',
          'Инструктаж персонала по работе с заказами',
        ],
        itemsEn: [
          'Eliminated offline rate: 990 → 0 min/day',
          'Fixed account operating hours',
          'Monitoring of closures and stock-outs',
          'Staff training on order handling',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        itemsRu: [
          'Аудит и оптимизация названия и описания',
          'Карта ключевых слов: Пхукет + Патонг',
          'Внедрение запросов в меню',
          'Прокачка ключей через конверсии',
        ],
        itemsEn: [
          'Audit and optimization of name and description',
          'Keyword map: Phuket + Patong',
          'Queries injected into the menu',
          'Keyword strengthening through conversions',
        ],
      },
      {
        titleRu: 'Запуск рекламы',
        titleEn: 'Ads launch',
        itemsRu: [
          'GrabAds с нуля — первый заказ на 3-й день',
          'Ручное управление CPO: 5–10x больше показов',
          'Масштабирование: 0 → 1 316 THB/мес',
          'Пиковый ROAS 24x',
        ],
        itemsEn: [
          'GrabAds from zero — first order on day 3',
          'Manual CPO control: 5–10x more impressions',
          'Scaling: 0 → 1,316 THB/month',
          'Peak ROAS of 24x',
        ],
      },
      {
        titleRu: 'Аналитика и рейтинг',
        titleEn: 'Analytics & rating',
        itemsRu: [
          'Еженедельные отчёты и KPI',
          'Подняли рейтинг: 4.5 → 4.8',
          'A/B-тесты позиций и цен',
          'Контроль воронки конверсии',
        ],
        itemsEn: [
          'Weekly reports and KPIs',
          'Rating lifted: 4.5 → 4.8',
          'A/B tests of items and prices',
          'Conversion funnel control',
        ],
      },
    ],
    results: [
      { value: 'x3.9', labelRu: 'рост выручки', labelEn: 'revenue growth', subRu: '9 440 → 36 810 THB/мес', subEn: '9,440 → 36,810 THB/mo' },
      { value: 'x7.4', labelRu: 'объём заказов', labelEn: 'order volume', subRu: '8 → 59 заказов/мес', subEn: '8 → 59 orders/mo' },
      { value: '24x', labelRu: 'пиковый ROAS', labelEn: 'peak ROAS', subRu: 'май 2026', subEn: 'May 2026' },
      { value: '∞', labelRu: 'рост показов', labelEn: 'impressions growth', subRu: '0 → 7 481 в месяц', subEn: '0 → 7,481 a month' },
      { value: '4.8', labelRu: 'рейтинг сейчас', labelEn: 'rating now', subRu: 'был 4.5', subEn: 'was 4.5' },
      { value: '0', labelRu: 'offline мин/день', labelEn: 'offline min/day', subRu: 'было 990 мин/день', subEn: 'was 990 min/day' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', before: '9 440 THB', after: '36 810 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', before: '8', after: '59' },
      { metricRu: 'Offline Rate', metricEn: 'Offline rate', before: '3 977 мин/мес · min/mo', after: '~0' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', before: '4.5', after: '4.8' },
      { metricRu: 'Показы в поиске (месяц)', metricEn: 'Search impressions (month)', before: '0', after: '7 481' },
      { metricRu: 'Новые клиенты (месяц)', metricEn: 'New customers (month)', before: '—', after: '32' },
      { metricRu: 'Рекламный ROAS', metricEn: 'Ads ROAS', before: '0', after: '24x' },
    ],
    images: [
      { src: '/th-assets/ussr-grab-dashboard.jpg', alt: 'USSR Phuket — GrabFood analytics dashboard: sales, ads, rating, ROAS' },
      { src: '/th-assets/grab-insights-ussr-sales.jpg', alt: 'USSR Phuket — GrabFood sales insights, +583% in 90 days' },
    ],
  },
  {
    slug: 'meat-point-phuket',
    nameRu: 'Meat Point Phuket',
    nameEn: 'Meat Point Phuket',
    locationRu: 'Раваи, Пхукет, Таиланд',
    locationEn: 'Rawai, Phuket, Thailand',
    periodRu: 'Апрель — июль 2026 (4 месяца)',
    periodEn: 'April — July 2026 (4 months)',
    headlineRu: 'Выручка +46% на Grab — в низкий сезон',
    headlineEn: 'Grab revenue +46% — in the low season',
    heroStats: [
      { value: '+46%', labelRu: 'выручка', labelEn: 'revenue' },
      { value: '+22%', labelRu: 'средний чек', labelEn: 'average order' },
      { value: '30x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS' },
    ],
    situationRu:
      'Работающий ресторан в Раваи: 275 заказов и 215 880 THB в месяц, реклама уже окупалась в 30 раз — но её недоливали (бюджет всего 3.2% от выручки), автоставка резала показы, а рейтинг 4.6 не дотягивал до порога 4.8, с которого Grab удешевляет рекламное место. Впереди — низкий сезон, когда рестораны Пхукета теряют 20–40% выручки.',
    situationEn:
      'A working restaurant in Rawai: 275 orders and 215,880 THB a month. Ads already paid back 30x — but were underfunded (budget just 3.2% of revenue), auto-bidding was cutting impressions, and the 4.6 rating fell short of the 4.8 threshold where Grab makes ad placements cheaper. Ahead — the low season, when Phuket restaurants lose 20–40% of revenue.',
    problemsRu: [
      'Реклама окупалась 30x, но её недоливали — каждый непотраченный бат означал упущенные заказы',
      'Автоматическая ставка резала показы: алгоритм экономил бюджет вместо того, чтобы забирать трафик',
      'Рейтинг 4.6 — ниже порога 4.8, с которого Grab щедро отдаёт показы и удешевляет рекламу',
      'Конверсия «охват → меню» 13.9% — карточка не удерживала трафик, за который уже заплатили',
      'Впереди низкий сезон: типичное падение выручки на Пхукете к июлю — 20–40%',
    ],
    problemsEn: [
      'Ads paid back 30x but were underfunded — every unspent baht meant missed orders',
      'Auto-bidding was cutting impressions: the algorithm saved budget instead of taking traffic',
      'Rating 4.6 — below the 4.8 threshold where Grab gives generous impressions and cheaper ads',
      'Reach-to-menu conversion of 13.9% — the listing wasn\'t holding traffic that was already paid for',
      'Low season ahead: the typical Phuket revenue drop into July is 20–40%',
    ],
    work: [
      {
        titleRu: 'Оптимизация рекламы',
        titleEn: 'Ads optimization',
        itemsRu: [
          'Ручной CPO вместо автоставки — забираем трафик, который уходил конкурентам',
          'Настройки под заказы, а не под показы',
          'Ежедневный контроль и корректировки',
          'Развязали бюджет: при окупаемости 30x ограничивать расход бессмысленно',
        ],
        itemsEn: [
          'Manual CPO instead of auto-bidding — taking traffic that was going to competitors',
          'Settings tuned for orders, not impressions',
          'Daily control and adjustments',
          'Unlocked the budget: at 30x payback, capping spend makes no sense',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        itemsRu: [
          'Карта ключей Пхукет + Раваи',
          'Ключи в названия и описания блюд',
          'Пересборка структуры категорий',
          'Прокачка ключей через конверсии — дешевле реклама',
        ],
        itemsEn: [
          'Phuket + Rawai keyword map',
          'Keywords in dish names and descriptions',
          'Category structure rebuild',
          'Keyword strengthening through conversions — cheaper ads',
        ],
      },
      {
        titleRu: 'Рейтинг и отзывы',
        titleEn: 'Rating & reviews',
        itemsRu: [
          'Ежедневный мониторинг рейтинга',
          'Разбор каждого негативного отзыва',
          'Контроль инцидентов — держим 0',
          'Результат: 4.6 → 4.8',
        ],
        itemsEn: [
          'Daily rating monitoring',
          'Every negative review investigated',
          'Incident control — held at 0',
          'Result: 4.6 → 4.8',
        ],
      },
      {
        titleRu: 'Персонал и аналитика',
        titleEn: 'Staff & analytics',
        itemsRu: [
          'Обучение команды работе с операционными показателями',
          'Контроль offline-rate и стоп-листов',
          'Еженедельные отчёты и KPI',
          'Алертинг по падениям метрик',
        ],
        itemsEn: [
          'Team training on operational metrics',
          'Offline-rate and stock-out control',
          'Weekly reports and KPIs',
          'Alerting on metric drops',
        ],
      },
    ],
    results: [
      { value: '+46%', labelRu: 'рост выручки', labelEn: 'revenue growth', subRu: '215 880 → 315 250 THB/мес', subEn: '215,880 → 315,250 THB/mo' },
      { value: '+22.4%', labelRu: 'средний чек', labelEn: 'average order value', subRu: '785 → 961 THB', subEn: '785 → 961 THB' },
      { value: '+19.3%', labelRu: 'заказы', labelEn: 'orders', subRu: '275 → 328 в месяц', subEn: '275 → 328 a month' },
      { value: 'x2.4', labelRu: 'охват аудитории', labelEn: 'customer reach', subRu: '7 760 → 18 473 клиентов', subEn: '7,760 → 18,473 customers' },
      { value: '4.8', labelRu: 'рейтинг', labelEn: 'rating', subRu: 'был 4.6, инцидентов 0', subEn: 'was 4.6, zero incidents' },
      { value: '≈2x', labelRu: 'разрыв с рынком', labelEn: 'gap vs market', subRu: 'рынок в низкий сезон: −20…−40%', subEn: 'low-season market: −20…−40%' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', before: '215 880 THB', after: '315 250 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', before: '275', after: '328' },
      { metricRu: 'Средний чек', metricEn: 'Average order value', before: '785 THB', after: '961 THB' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', before: '4.6', after: '4.8' },
      { metricRu: 'Охват (уникальные клиенты)', metricEn: 'Reach (unique customers)', before: '7 760', after: '18 473' },
      { metricRu: 'Выручка с рекламы', metricEn: 'Ads-attributed revenue', before: '205 140 THB', after: '274 070 THB' },
      { metricRu: 'Динамика по месяцам', metricEn: 'Month by month', before: '215 880 → 233 010', after: '244 020 → 315 250' },
    ],
    images: [
      { src: '/th-assets/meatpoint-grab-dashboard.jpg', alt: 'Meat Point Phuket — GrabFood sales and ads revenue chart, April–July 2026' },
      { src: '/th-assets/meatpoint-reach-funnel.jpg', alt: 'Meat Point Phuket — Grab Merchant customer reach x2.4 funnel' },
    ],
  },

  {
    slug: 'etna-phuket',
    nameRu: 'Etna Phuket',
    nameEn: 'Etna Phuket',
    locationRu: 'Банг Тао, Пхукет, Таиланд',
    locationEn: 'Bang Tao, Phuket, Thailand',
    periodRu: 'Май — июль 2026 (2 месяца)',
    periodEn: 'May — July 2026 (2 months)',
    headlineRu: 'Заказы выросли вдвое — на падающем трафике',
    headlineEn: 'Orders doubled — on falling traffic',
    heroStats: [
      { value: '+87%', labelRu: 'выручка', labelEn: 'revenue' },
      { value: 'x2.2', labelRu: 'заказы', labelEn: 'orders' },
      { value: '34.6x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS' },
    ],
    situationRu:
      'Ресторан в Банг Тао падал: выручка −21.7%, заказы −17.7% к предыдущему периоду. Карточку видели 39 211 человек в месяц, а заказ делали 182 — сквозная конверсия 0.5% при средней по нашему флоту 0.9%. Трафик был — денег с него не было.',
    situationEn:
      'A Bang Tao restaurant in decline: revenue −21.7%, orders −17.7% versus the previous period. 39,211 people saw the listing monthly but only 182 ordered — a 0.5% through-conversion versus our fleet average of 0.9%. The traffic was there; the money wasn\'t.',
    problemsRu: [
      'Нисходящий тренд: выручка −21.7%, заказы −17.7% к предыдущему периоду',
      'Сквозная конверсия 0.5% — вдвое ниже средней по нашему флоту (0.9%)',
      'Меню открывали только 5.2% увидевших — карточка не цепляла',
      'CTR рекламы 2.8% — платили за показы, по которым не кликали',
      'ROAS 14.75x — реклама в плюсе, но недорабатывала после показа',
    ],
    problemsEn: [
      'Downward trend: revenue −21.7%, orders −17.7% versus the previous period',
      'Through-conversion of 0.5% — half our fleet average (0.9%)',
      'Only 5.2% of viewers opened the menu — the listing didn\'t hook',
      'Ads CTR of 2.8% — paying for impressions nobody clicked',
      'ROAS 14.75x — ads profitable but underperforming after the impression',
    ],
    work: [
      {
        titleRu: 'Оптимизация рекламы',
        titleEn: 'Ads optimization',
        itemsRu: [
          'Ручной CPO вместо автоставки — алгоритм набирал дешёвые нерелевантные показы',
          'Ежедневное ведение и правки под фактический результат',
          'Бюджет подняли всего на 50% — выручка с рекламы выросла в 3.4 раза',
          'Результат: ROAS 14.75x → 34.57x',
        ],
        itemsEn: [
          'Manual CPO instead of auto-bidding — the algorithm was buying cheap irrelevant impressions',
          'Daily management with adjustments to actual results',
          'Budget raised only 50% — ads revenue grew 3.4x',
          'Result: ROAS 14.75x → 34.57x',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        itemsRu: [
          'Карта ключей Пхукет + Банг Тао',
          'Ключи в названия и описания блюд',
          'Пересборка структуры категорий',
          'Карточка стала кликабельной: CTR 2.8% → 5.59%',
        ],
        itemsEn: [
          'Phuket + Bang Tao keyword map',
          'Keywords in dish names and descriptions',
          'Category structure rebuild',
          'The listing became clickable: CTR 2.8% → 5.59%',
        ],
      },
      {
        titleRu: 'Конверсия воронки',
        titleEn: 'Funnel conversion',
        itemsRu: [
          'Переделали то, что видит клиент: обложка, первый экран, подача меню',
          '«Охват → меню»: 5.2% → 8.6%',
          '«Меню → заказ»: 9.0% → 19.7%',
          'Сквозная конверсия x3.8: с 0.5% до 1.9% — вдвое выше средней по флоту',
        ],
        itemsEn: [
          'Rebuilt what the customer sees: cover, first screen, menu presentation',
          'Reach → menu: 5.2% → 8.6%',
          'Menu → order: 9.0% → 19.7%',
          'Through-conversion x3.8: from 0.5% to 1.9% — double the fleet average',
        ],
      },
      {
        titleRu: 'Рейтинг и операционка',
        titleEn: 'Rating & operations',
        itemsRu: [
          'Ежедневный мониторинг рейтинга и отзывов',
          'Обучение команды операционным показателям',
          'Контроль offline-rate и стоп-листов',
          'Рейтинг 4.6 → 4.8',
        ],
        itemsEn: [
          'Daily rating and review monitoring',
          'Team training on operational metrics',
          'Offline-rate and stock-out control',
          'Rating 4.6 → 4.8',
        ],
      },
    ],
    results: [
      { value: '+87%', labelRu: 'рост выручки', labelEn: 'revenue growth', subRu: '236 975 → 443 861 THB/мес', subEn: '236,975 → 443,861 THB/mo' },
      { value: 'x2.2', labelRu: 'объём заказов', labelEn: 'order volume', subRu: '190 → 411 в месяц', subEn: '190 → 411 a month' },
      { value: '34.6x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', subRu: 'было 14.75x', subEn: 'was 14.75x' },
      { value: 'x3.8', labelRu: 'сквозная конверсия', labelEn: 'through-conversion', subRu: '0.5% → 1.9%', subEn: '0.5% → 1.9%' },
      { value: 'x2.0', labelRu: 'CTR рекламы', labelEn: 'ads CTR', subRu: '2.8% → 5.59%', subEn: '2.8% → 5.59%' },
      { value: '−31%', labelRu: 'стоимость заказа', labelEn: 'cost per order', subRu: '42 → 29 THB', subEn: '42 → 29 THB' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', before: '236 975 THB', after: '443 861 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', before: '190', after: '411' },
      { metricRu: 'Сквозная конверсия «охват → заказ»', metricEn: 'Through-conversion (reach → order)', before: '0.5%', after: '1.9%' },
      { metricRu: 'Конверсия «меню → заказ»', metricEn: 'Menu → order conversion', before: '9.0%', after: '19.7%' },
      { metricRu: 'ROAS рекламы', metricEn: 'Ads ROAS', before: '14.75x', after: '34.57x' },
      { metricRu: 'Выручка с рекламы', metricEn: 'Ads-attributed revenue', before: '124 000 THB', after: '421 000 THB' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', before: '4.6', after: '4.8' },
      { metricRu: 'Охват (сезон падал)', metricEn: 'Reach (seasonal decline)', before: '39 211', after: '21 330 (−46%)' },
    ],
    images: [
      { src: '/th-assets/etna-grab-dashboard.jpg', alt: 'Etna Phuket — GrabFood sales and orders chart, May–July 2026' },
      { src: '/th-assets/etna-funnel.jpg', alt: 'Etna Phuket — conversion funnel: through-conversion x3.8 on falling reach' },
    ],
  },
];

export const getCaseBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
