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
];

export const getCaseBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
