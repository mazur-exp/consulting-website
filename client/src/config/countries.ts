/**
 * Single source of truth for every country page.
 * Add a market here and it gets a page, a gate option and a header switcher entry.
 */

export type CountryCode = 'id' | 'sg' | 'my' | 'th' | 'vn' | 'ph' | 'kh' | 'mm';

export interface CaseCard {
  value: string;
  labelRu: string;
  labelEn: string;
  nameRu: string;
  nameEn: string;
  detailRu: string;
  detailEn: string;
  /** Slug of a full case study page under /cases/<slug> */
  caseSlug?: string;
}

export interface CountryConfig {
  code: CountryCode;
  /** ISO country codes that resolve to this page via geo-IP */
  geo: string[];
  flag: string;
  nameRu: string;
  nameEn: string;
  /** "на Бали", "в Таиланде" — used inside sentences */
  inCountryRu: string;
  inCountryEn: string;
  /** Main city / hub shown in SEO + schema */
  cityRu: string;
  cityEn: string;
  /** Delivery platforms served in this market */
  platformsRu: string;
  platformsEn: string;
  /** Short platform token for FAQ/pricing, e.g. "GoJek/Grab" */
  platformsShort: string;
  socialProofRu: string;
  socialProofEn: string;
  cases: CaseCard[];
  caseImages: { src: string; alt: string }[];
  /** Named clients shown as chips; null hides the section */
  clients: string[] | null;
  clientsTitleRu: string;
  clientsTitleEn: string;
  /** Bali-specific blocks — testimonials and the Bali market video */
  showTestimonials: boolean;
  showVideo: boolean;
  /** Second hero image; Bali uses the Gojek courier photo */
  heroImage: string;
  heroImageAlt: string;
}

const THAI_CASES: CaseCard[] = [
  {
    value: 'x3.9',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    nameRu: 'USSR Phuket (Патонг)',
    nameEn: 'USSR Phuket (Patong)',
    detailRu: 'заказы x7.4 · ROAS 24x · за 2 месяца',
    detailEn: 'orders x7.4 · ROAS 24x · in 2 months',
    caseSlug: 'ussr-phuket',
  },
  {
    value: 'x9.4',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    nameRu: 'Enjoy Healthy Food (Пхукет)',
    nameEn: 'Enjoy Healthy Food (Phuket)',
    detailRu: 'заказы x4.6 · ROAS 27.5x · за 14 месяцев',
    detailEn: 'orders x4.6 · ROAS 27.5x · in 14 months',
    caseSlug: 'enjoy-healthy-food',
  },
  {
    value: '+87%',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    nameRu: 'Etna Phuket (Банг Тао)',
    nameEn: 'Etna Phuket (Bang Tao)',
    detailRu: 'заказы x2.2 · ROAS 34.6x · за 2 месяца в низкий сезон',
    detailEn: 'orders x2.2 · ROAS 34.6x · in 2 months, low season',
    caseSlug: 'etna-phuket',
  },
  {
    value: '+46%',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    nameRu: 'Meat Point Phuket (Раваи)',
    nameEn: 'Meat Point Phuket (Rawai)',
    detailRu: 'чек +22% · ROAS 30x · рост в низкий сезон',
    detailEn: 'AOV +22% · ROAS 30x · growth in the low season',
    caseSlug: 'meat-point-phuket',
  },
];

const THAI_CASE_IMAGES = [
  { src: '/th-assets/ussr-grab-dashboard.jpg', alt: 'USSR Phuket — GrabFood analytics dashboard' },
  { src: '/th-assets/ehf-revenue-chart.jpg', alt: 'Enjoy Healthy Food — revenue growth chart' },
  { src: '/th-assets/grab-insights-ehf-sales.jpg', alt: 'Enjoy Healthy Food — GrabFood sales insights' },
  { src: '/th-assets/grab-insights-ussr-sales.jpg', alt: 'USSR Phuket — GrabFood sales insights' },
  { src: '/th-assets/grab-insights-ehf-customers.jpg', alt: 'Enjoy Healthy Food — GrabFood customer growth' },
  { src: '/th-assets/etna-grab-dashboard.jpg', alt: 'Etna Phuket — GrabFood sales chart, orders x2.2' },
  { src: '/th-assets/meatpoint-grab-dashboard.jpg', alt: 'Meat Point Phuket — GrabFood revenue +46% chart' },
];

/** Cases for markets we have not launched in yet — same Grab cases, credited to Thailand. */
const REGIONAL_CASES: CaseCard[] = THAI_CASES.map((c) => ({
  ...c,
  detailRu: `${c.detailRu} · Таиланд, GrabFood`,
  detailEn: `${c.detailEn} · Thailand, GrabFood`,
}));

const GRAB_ONLY = {
  platformsRu: 'Grab',
  platformsEn: 'Grab',
  platformsShort: 'Grab',
  cases: REGIONAL_CASES,
  caseImages: THAI_CASE_IMAGES,
  clients: null,
  clientsTitleRu: '',
  clientsTitleEn: '',
  showTestimonials: false,
  showVideo: false,
  heroImage: '/th-assets/grab-insights-ehf-sales.jpg',
  heroImageAlt: 'GrabFood sales growth analytics',
  socialProofRu: '90+ ресторанов в Юго-Восточной Азии растут с нами',
  socialProofEn: '90+ restaurants across Southeast Asia grow with us',
} as const;

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  id: {
    code: 'id',
    geo: ['ID'],
    flag: '🇮🇩',
    nameRu: 'Индонезия',
    nameEn: 'Indonesia',
    inCountryRu: 'на Бали',
    inCountryEn: 'in Bali',
    cityRu: 'Бали',
    cityEn: 'Bali',
    platformsRu: 'Gojek и Grab',
    platformsEn: 'Gojek and Grab',
    platformsShort: 'GoJek/Grab',
    socialProofRu: '90+ ресторанов на Бали и в Таиланде растут с нами',
    socialProofEn: '90+ restaurants in Bali & Thailand grow with us',
    cases: [
      {
        value: 'x21',
        labelRu: 'выручки за 9 месяцев',
        labelEn: 'revenue in 9 months',
        nameRu: 'Love U Pizza (Бали)',
        nameEn: 'Love U Pizza (Bali)',
        detailRu: 'заказы x14 · чек +50% · Grab + GoJek',
        detailEn: 'orders x14 · check +50% · Grab + GoJek',
        caseSlug: 'love-u-pizza',
      },
      {
        value: 'x2.6',
        labelRu: 'выручки',
        labelEn: 'revenue',
        nameRu: 'Zaytun (Убуд)',
        nameEn: 'Zaytun (Ubud)',
        detailRu: 'заказы x2.1 · GoJek-реклама из убытка в ROAS 15.5x',
        detailEn: 'orders x2.1 · GoJek ads from loss to 15.5x ROAS',
        caseSlug: 'zaytun-ubud',
      },
      {
        value: 'x6',
        labelRu: 'продаж',
        labelEn: 'sales',
        nameRu: 'To The Moon',
        nameEn: 'To The Moon',
        detailRu: '',
        detailEn: '',
      },
      {
        value: '300 млн IDR',
        labelRu: 'в месяц',
        labelEn: 'per month',
        nameRu: 'Only Eggs',
        nameEn: 'Only Eggs',
        detailRu: '',
        detailEn: '',
      },
      {
        value: 'x3',
        labelRu: 'продаж',
        labelEn: 'sales',
        nameRu: 'Lit Pizza',
        nameEn: 'Lit Pizza',
        detailRu: '',
        detailEn: '',
      },
    ],
    caseImages: [
      { src: '/id-assets/loveu-growth.jpg', alt: 'Love U Pizza — x21 revenue growth over 9 months' },
      { src: '/id-assets/zaytun-growth.jpg', alt: 'Zaytun Ubud — x2.6 revenue growth chart' },
      { src: '/case-1.jpg', alt: 'Grab merchant dashboard analytics' },
      { src: '/case-2.jpg', alt: 'Gojek merchant performance metrics' },
      { src: '/case-3.jpg', alt: 'Delivery platform insights' },
      { src: '/case-4.jpg', alt: 'Merchant analytics overview' },
      { src: '/case-5.jpg', alt: 'Soul restaurant growth metrics' },
    ],
    clients: null,
    clientsTitleRu: '',
    clientsTitleEn: '',
    showTestimonials: true,
    showVideo: true,
    heroImage: '/2025-08-18 21.17.17_1755717966951.jpg',
    heroImageAlt: 'Grab delivery driver with mobile app',
  },

  th: {
    code: 'th',
    geo: ['TH'],
    flag: '🇹🇭',
    nameRu: 'Таиланд',
    nameEn: 'Thailand',
    inCountryRu: 'в Таиланде',
    inCountryEn: 'in Thailand',
    cityRu: 'Пхукет',
    cityEn: 'Phuket',
    platformsRu: 'Grab',
    platformsEn: 'Grab',
    platformsShort: 'Grab',
    socialProofRu: '15+ ресторанов в Таиланде растут с нами',
    socialProofEn: '15+ restaurants in Thailand grow with us',
    cases: THAI_CASES,
    caseImages: THAI_CASE_IMAGES,
    clients: [
      'Enjoy Healthy Food',
      'Enjoy Healthy Food (Boat Avenue)',
      'USSR Phuket',
      'Meat Point',
      'Alma-Ata',
      'Etna',
      'Island KIDS',
      'Island (Bang Tao)',
      'Lavash & Grill (Karon)',
      'Ab House',
      'Swag Food',
      'Sensorica',
      'Yuuhi',
      'LeGourmet',
      'Surf Point',
    ],
    clientsTitleRu: 'Нам доверяют 15+ ресторанов в Таиланде',
    clientsTitleEn: 'Trusted by 15+ restaurants in Thailand',
    showTestimonials: false,
    showVideo: false,
    heroImage: '/th-assets/grab-insights-ehf-sales.jpg',
    heroImageAlt: 'GrabFood sales growth analytics',
  },

  sg: {
    ...GRAB_ONLY,
    code: 'sg',
    geo: ['SG'],
    flag: '🇸🇬',
    nameRu: 'Сингапур',
    nameEn: 'Singapore',
    inCountryRu: 'в Сингапуре',
    inCountryEn: 'in Singapore',
    cityRu: 'Сингапур',
    cityEn: 'Singapore',
  },

  my: {
    ...GRAB_ONLY,
    code: 'my',
    geo: ['MY'],
    flag: '🇲🇾',
    nameRu: 'Малайзия',
    nameEn: 'Malaysia',
    inCountryRu: 'в Малайзии',
    inCountryEn: 'in Malaysia',
    cityRu: 'Куала-Лумпур',
    cityEn: 'Kuala Lumpur',
  },

  vn: {
    ...GRAB_ONLY,
    code: 'vn',
    geo: ['VN'],
    flag: '🇻🇳',
    nameRu: 'Вьетнам',
    nameEn: 'Vietnam',
    inCountryRu: 'во Вьетнаме',
    inCountryEn: 'in Vietnam',
    cityRu: 'Хошимин',
    cityEn: 'Ho Chi Minh City',
  },

  ph: {
    ...GRAB_ONLY,
    code: 'ph',
    geo: ['PH'],
    flag: '🇵🇭',
    nameRu: 'Филиппины',
    nameEn: 'Philippines',
    inCountryRu: 'на Филиппинах',
    inCountryEn: 'in the Philippines',
    cityRu: 'Манила',
    cityEn: 'Manila',
  },

  kh: {
    ...GRAB_ONLY,
    code: 'kh',
    geo: ['KH'],
    flag: '🇰🇭',
    nameRu: 'Камбоджа',
    nameEn: 'Cambodia',
    inCountryRu: 'в Камбодже',
    inCountryEn: 'in Cambodia',
    cityRu: 'Пномпень',
    cityEn: 'Phnom Penh',
  },

  mm: {
    ...GRAB_ONLY,
    code: 'mm',
    geo: ['MM'],
    flag: '🇲🇲',
    nameRu: 'Мьянма',
    nameEn: 'Myanmar',
    inCountryRu: 'в Мьянме',
    inCountryEn: 'in Myanmar',
    cityRu: 'Янгон',
    cityEn: 'Yangon',
  },
};

/** Display order in the gate and the header switcher. */
export const COUNTRY_ORDER: CountryCode[] = ['id', 'th', 'sg', 'my', 'vn', 'ph', 'kh', 'mm'];

export const COUNTRY_LIST = COUNTRY_ORDER.map((code) => COUNTRIES[code]);

export const isCountryCode = (value: unknown): value is CountryCode =>
  typeof value === 'string' && value in COUNTRIES;

/** Map an ISO country code from geo-IP to one of our pages. */
export const countryFromGeo = (iso: string): CountryCode | null => {
  const upper = iso.toUpperCase();
  const match = COUNTRY_LIST.find((c) => c.geo.includes(upper));
  return match ? match.code : null;
};

export const pathForCountry = (code: CountryCode) => `/${code}`;
