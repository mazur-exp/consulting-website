/**
 * Single source of truth for every country page.
 * Add a market here and it gets a page, a gate option and a header switcher entry.
 */

export type CountryCode = 'id' | 'sg' | 'my' | 'th' | 'vn' | 'ph' | 'kh' | 'mm';

export interface CaseCard {
  value: string;
  labelRu: string;
  labelEn: string;
  labelId?: string;
  nameRu: string;
  nameEn: string;
  nameId?: string;
  detailRu: string;
  detailEn: string;
  detailId?: string;
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
  nameId?: string;
  /** "на Бали", "в Таиланде" — used inside sentences */
  inCountryRu: string;
  inCountryEn: string;
  inCountryId?: string;
  /** Main city / hub shown in SEO + schema */
  cityRu: string;
  cityEn: string;
  cityId?: string;
  /** Delivery platforms served in this market */
  platformsRu: string;
  platformsEn: string;
  platformsId?: string;
  /** Short platform token for FAQ/pricing, e.g. "GoJek/Grab" */
  platformsShort: string;
  socialProofRu: string;
  socialProofEn: string;
  socialProofId?: string;
  cases: CaseCard[];
  caseImages: { src: string; alt: string }[];
  /** Named clients shown as chips; null hides the section */
  clients: string[] | null;
  clientsTitleRu: string;
  clientsTitleEn: string;
  clientsTitleId?: string;
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
    labelId: 'omzet di Grab',
    nameRu: 'USSR Phuket (Патонг)',
    nameEn: 'USSR Phuket (Patong)',
    nameId: 'USSR Phuket (Patong)',
    detailRu: 'заказы x7.4 · ROAS 24x · за 2 месяца',
    detailEn: 'orders x7.4 · ROAS 24x · in 2 months',
    detailId: 'pesanan x7.4 · ROAS 24x · dalam 2 bulan',
    caseSlug: 'ussr-phuket',
  },
  {
    value: 'x9.4',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    labelId: 'omzet di Grab',
    nameRu: 'Enjoy Healthy Food (Пхукет)',
    nameEn: 'Enjoy Healthy Food (Phuket)',
    nameId: 'Enjoy Healthy Food (Phuket)',
    detailRu: 'заказы x4.6 · ROAS 27.5x · за 14 месяцев',
    detailEn: 'orders x4.6 · ROAS 27.5x · in 14 months',
    detailId: 'pesanan x4.6 · ROAS 27.5x · dalam 14 bulan',
    caseSlug: 'enjoy-healthy-food',
  },
  {
    value: '+87%',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    labelId: 'omzet di Grab',
    nameRu: 'Etna Phuket (Банг Тао)',
    nameEn: 'Etna Phuket (Bang Tao)',
    nameId: 'Etna Phuket (Bang Tao)',
    detailRu: 'заказы x2.2 · ROAS 34.6x · за 2 месяца в низкий сезон',
    detailEn: 'orders x2.2 · ROAS 34.6x · in 2 months, low season',
    detailId: 'pesanan x2.2 · ROAS 34.6x · dalam 2 bulan saat low season',
    caseSlug: 'etna-phuket',
  },
  {
    value: '+46%',
    labelRu: 'выручки на Grab',
    labelEn: 'Grab revenue',
    labelId: 'omzet di Grab',
    nameRu: 'Meat Point Phuket (Раваи)',
    nameEn: 'Meat Point Phuket (Rawai)',
    nameId: 'Meat Point Phuket (Rawai)',
    detailRu: 'чек +22% · ROAS 30x · рост в низкий сезон',
    detailEn: 'AOV +22% · ROAS 30x · growth in the low season',
    detailId: 'rata-rata nilai pesanan +22% · ROAS 30x · tumbuh saat low season',
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
  detailId: `${c.detailId ?? c.detailEn} · Thailand, GrabFood`,
}));

const GRAB_ONLY = {
  platformsRu: 'Grab',
  platformsEn: 'Grab',
  platformsId: 'Grab',
  platformsShort: 'Grab',
  cases: REGIONAL_CASES,
  caseImages: THAI_CASE_IMAGES,
  clients: null,
  clientsTitleRu: '',
  clientsTitleEn: '',
  clientsTitleId: '',
  showTestimonials: false,
  showVideo: false,
  heroImage: '/th-assets/grab-insights-ehf-sales.jpg',
  heroImageAlt: 'GrabFood sales growth analytics',
  socialProofRu: '110+ ресторанов в ЮВА на сопровождении, 200+ прошло через нас с 2023',
  socialProofEn: '110+ restaurants under management in SE Asia, 200+ served since 2023',
  socialProofId: '110+ restoran di Asia Tenggara dalam pengelolaan kami, 200+ sudah bekerja sama sejak 2023',
} as const;

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  id: {
    code: 'id',
    geo: ['ID'],
    flag: '🇮🇩',
    nameRu: 'Индонезия',
    nameEn: 'Indonesia',
    nameId: 'Indonesia',
    inCountryRu: 'на Бали',
    inCountryEn: 'in Bali',
    inCountryId: 'di Bali',
    cityRu: 'Бали',
    cityEn: 'Bali',
    cityId: 'Bali',
    platformsRu: 'Gojek и Grab',
    platformsEn: 'Gojek and Grab',
    platformsId: 'Gojek dan Grab',
    platformsShort: 'GoJek/Grab',
    socialProofRu: '110+ ресторанов на сопровождении, 200+ прошло через нас с 2023',
    socialProofEn: '110+ restaurants under management, 200+ served since 2023',
    socialProofId: '110+ restoran dalam pengelolaan kami, 200+ sudah bekerja sama sejak 2023',
    cases: [
      {
        value: 'x21',
        labelRu: 'выручки за 9 месяцев',
        labelEn: 'revenue in 9 months',
        labelId: 'omzet dalam 9 bulan',
        nameRu: 'Love U Pizza (Бали)',
        nameEn: 'Love U Pizza (Bali)',
        nameId: 'Love U Pizza (Bali)',
        detailRu: 'заказы x14 · чек +50% · Grab + GoJek',
        detailEn: 'orders x14 · check +50% · Grab + GoJek',
        detailId: 'pesanan x14 · rata-rata nilai pesanan +50% · Grab + GoJek',
        caseSlug: 'love-u-pizza',
      },
      {
        value: 'x2.6',
        labelRu: 'выручки',
        labelEn: 'revenue',
        labelId: 'omzet',
        nameRu: 'Zaytun (Убуд)',
        nameEn: 'Zaytun (Ubud)',
        nameId: 'Zaytun (Ubud)',
        detailRu: 'заказы x2.1 · GoJek-реклама из убытка в ROAS 15.5x',
        detailEn: 'orders x2.1 · GoJek ads from loss to 15.5x ROAS',
        detailId: 'pesanan x2.1 · iklan GoJek dari rugi jadi ROAS 15.5x',
        caseSlug: 'zaytun-ubud',
      },
      {
        value: 'x6',
        labelRu: 'продаж',
        labelEn: 'sales',
        labelId: 'penjualan',
        nameRu: 'To The Moon',
        nameEn: 'To The Moon',
        nameId: 'To The Moon',
        detailRu: '',
        detailEn: '',
      },
      {
        value: '300 млн IDR',
        labelRu: 'в месяц',
        labelEn: 'per month',
        labelId: 'per bulan',
        nameRu: 'Only Eggs',
        nameEn: 'Only Eggs',
        nameId: 'Only Eggs',
        detailRu: '',
        detailEn: '',
      },
      {
        value: 'x3',
        labelRu: 'продаж',
        labelEn: 'sales',
        labelId: 'penjualan',
        nameRu: 'Lit Pizza',
        nameEn: 'Lit Pizza',
        nameId: 'Lit Pizza',
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
    nameId: 'Thailand',
    inCountryRu: 'в Таиланде',
    inCountryEn: 'in Thailand',
    inCountryId: 'di Thailand',
    cityRu: 'Пхукет',
    cityEn: 'Phuket',
    cityId: 'Phuket',
    platformsRu: 'Grab',
    platformsEn: 'Grab',
    platformsId: 'Grab',
    platformsShort: 'Grab',
    socialProofRu: '15+ ресторанов в Таиланде растут с нами',
    socialProofEn: '15+ restaurants in Thailand grow with us',
    socialProofId: '15+ restoran di Thailand tumbuh bersama kami',
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
    clientsTitleId: 'Dipercaya 15+ restoran di Thailand',
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
    nameId: 'Singapura',
    inCountryRu: 'в Сингапуре',
    inCountryEn: 'in Singapore',
    inCountryId: 'di Singapura',
    cityRu: 'Сингапур',
    cityEn: 'Singapore',
    cityId: 'Singapura',
  },

  my: {
    ...GRAB_ONLY,
    code: 'my',
    geo: ['MY'],
    flag: '🇲🇾',
    nameRu: 'Малайзия',
    nameEn: 'Malaysia',
    nameId: 'Malaysia',
    inCountryRu: 'в Малайзии',
    inCountryEn: 'in Malaysia',
    inCountryId: 'di Malaysia',
    cityRu: 'Куала-Лумпур',
    cityEn: 'Kuala Lumpur',
    cityId: 'Kuala Lumpur',
  },

  vn: {
    ...GRAB_ONLY,
    code: 'vn',
    geo: ['VN'],
    flag: '🇻🇳',
    nameRu: 'Вьетнам',
    nameEn: 'Vietnam',
    nameId: 'Vietnam',
    inCountryRu: 'во Вьетнаме',
    inCountryEn: 'in Vietnam',
    inCountryId: 'di Vietnam',
    cityRu: 'Хошимин',
    cityEn: 'Ho Chi Minh City',
    cityId: 'Ho Chi Minh City',
  },

  ph: {
    ...GRAB_ONLY,
    code: 'ph',
    geo: ['PH'],
    flag: '🇵🇭',
    nameRu: 'Филиппины',
    nameEn: 'Philippines',
    nameId: 'Filipina',
    inCountryRu: 'на Филиппинах',
    inCountryEn: 'in the Philippines',
    inCountryId: 'di Filipina',
    cityRu: 'Манила',
    cityEn: 'Manila',
    cityId: 'Manila',
  },

  kh: {
    ...GRAB_ONLY,
    code: 'kh',
    geo: ['KH'],
    flag: '🇰🇭',
    nameRu: 'Камбоджа',
    nameEn: 'Cambodia',
    nameId: 'Kamboja',
    inCountryRu: 'в Камбодже',
    inCountryEn: 'in Cambodia',
    inCountryId: 'di Kamboja',
    cityRu: 'Пномпень',
    cityEn: 'Phnom Penh',
    cityId: 'Phnom Penh',
  },

  mm: {
    ...GRAB_ONLY,
    code: 'mm',
    geo: ['MM'],
    flag: '🇲🇲',
    nameRu: 'Мьянма',
    nameEn: 'Myanmar',
    nameId: 'Myanmar',
    inCountryRu: 'в Мьянме',
    inCountryEn: 'in Myanmar',
    inCountryId: 'di Myanmar',
    cityRu: 'Янгон',
    cityEn: 'Yangon',
    cityId: 'Yangon',
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
