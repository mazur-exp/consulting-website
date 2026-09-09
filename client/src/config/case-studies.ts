/**
 * Full case study pages — /cases/<slug>.
 * Data comes from the client-approved case decks (real GrabFood numbers).
 */

export interface CaseStat {
  value: string;
  labelRu: string;
  labelEn: string;
  labelId?: string;
  labelTh?: string;
  subRu?: string;
  subEn?: string;
  subId?: string;
  subTh?: string;
}

export interface BeforeAfterRow {
  metricRu: string;
  metricEn: string;
  metricId?: string;
  metricTh?: string;
  before: string;
  after: string;
}

export interface WorkBlock {
  titleRu: string;
  titleEn: string;
  titleId?: string;
  titleTh?: string;
  itemsRu: string[];
  itemsEn: string[];
  itemsId?: string[];
  itemsTh?: string[];
}

export interface CaseStudy {
  slug: string;
  nameRu: string;
  nameEn: string;
  nameId?: string;
  nameTh?: string;
  locationRu: string;
  locationEn: string;
  locationId?: string;
  locationTh?: string;
  periodRu: string;
  periodEn: string;
  periodId?: string;
  periodTh?: string;
  headlineRu: string;
  headlineEn: string;
  headlineId?: string;
  headlineTh?: string;
  heroStats: CaseStat[];
  situationRu: string;
  situationEn: string;
  situationId?: string;
  situationTh?: string;
  problemsRu: string[];
  problemsEn: string[];
  problemsId?: string[];
  problemsTh?: string[];
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
    nameId: 'Enjoy Healthy Food',
    locationRu: 'Пхукет, Таиланд',
    locationEn: 'Phuket, Thailand',
    locationId: 'Phuket, Thailand',
    locationTh: 'ภูเก็ต ประเทศไทย',
    periodRu: 'Январь 2025 — март 2026 (14 месяцев)',
    periodEn: 'January 2025 — March 2026 (14 months)',
    periodId: 'Januari 2025 — Maret 2026 (14 bulan)',
    periodTh: 'มกราคม 2025 — มีนาคม 2026 (14 เดือน)',
    headlineRu: 'Выручка на GrabFood выросла в 9.4 раза',
    headlineEn: 'GrabFood revenue grew 9.4x',
    headlineId: 'Omzet GrabFood tumbuh 9.4x',
    headlineTh: 'รายได้บน GrabFood โต 9.4 เท่า',
    heroStats: [
      { value: 'x9.4', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: 'x4.6', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์' },
      { value: '27.5x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', labelId: 'ROAS iklan', labelTh: 'ROAS ของโฆษณา' },
    ],
    situationRu:
      'Ресторан здорового питания на Пхукете. На старте — 34 заказа и 16 873 THB в месяц: ресторан был практически невидим в GrabFood.',
    situationEn:
      'A healthy food restaurant in Phuket. At the start — 34 orders and 16,873 THB a month: the restaurant was nearly invisible on GrabFood.',
    situationId:
      'Restoran makanan sehat di Phuket. Saat kami mulai — 34 pesanan dan 16,873 THB per bulan: restoran nyaris tidak terlihat di GrabFood.',
    situationTh: 'ร้านอาหารเพื่อสุขภาพในภูเก็ต ตอนเริ่มต้น — 34 ออร์เดอร์ และ 16,873 THB ต่อเดือน: ร้านแทบไม่ปรากฏบน GrabFood เลย',
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
    problemsId: [
      'Waktu offline sampai 109% — restoran lama tidak tersedia bagi pelanggan',
      'Iklan tidak pernah dijalankan — nol trafik berbayar, hanya jangkauan organik',
      'Kata kunci tidak digarap — restoran tidak muncul di pencarian yang relevan',
      'Struktur menu dan deskripsi tidak dioptimasi untuk konversi',
      'Waktu tunggu driver 293–437 detik — menurunkan rating operasional',
    ],
    problemsTh: [
      'Offline rate สูงถึง 109% — ร้านไม่พร้อมให้บริการลูกค้าเป็นเวลานาน',
      'ไม่มีการยิงโฆษณาเลย — ทราฟฟิกแบบจ่ายเงินเป็นศูนย์ มีแต่ออร์แกนิก',
      'ไม่มีการทำคำค้น — ร้านไม่ปรากฏในผลค้นหาที่เกี่ยวข้อง',
      'โครงสร้างเมนูและคำอธิบายไม่ได้ปรับให้เกิดคอนเวอร์ชั่น',
      'เวลารอของคนขับ 293–437 วินาที ฉุดเรตติ้งด้านปฏิบัติการ',
    ],
    work: [
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
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
        itemsId: [
          'Mengoptimasi nama dan deskripsi restoran',
          'Menyusun peta kata kunci untuk Phuket',
          'Memasukkan kata kunci berfrekuensi tinggi ke menu',
          'Menyusun ulang kategori untuk pencarian',
        ],
        itemsTh: [
          'ปรับชื่อร้านและคำอธิบายให้เหมาะสม',
          'ทำแผนคำค้นสำหรับภูเก็ต',
          'ใส่คำค้นที่มีปริมาณค้นหาสูงเข้าไปในเมนู',
          'จัดโครงสร้างหมวดหมู่ใหม่เพื่อการค้นหา',
        ],
      },
      {
        titleRu: 'Платная реклама',
        titleEn: 'Paid ads',
        titleId: 'Iklan berbayar',
        titleTh: 'โฆษณาแบบเสียเงิน',
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
        itemsId: [
          'Meluncurkan GrabAds dari nol',
          'Membangun struktur kampanye per segmen',
          'Menaikkan anggaran: 62 → 5,635 THB/bulan',
          'Mencapai ROAS puncak 27.5x',
        ],
        itemsTh: [
          'เริ่ม GrabAds จากศูนย์',
          'วางโครงสร้างแคมเปญแยกตามเซกเมนต์',
          'ขยายงบ: 62 → 5,635 THB/เดือน',
          'ทำ ROAS สูงสุดได้ 27.5 เท่า',
        ],
      },
      {
        titleRu: 'Меню и операционка',
        titleEn: 'Menu & operations',
        titleId: 'Menu dan operasional',
        titleTh: 'เมนูและงานปฏิบัติการ',
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
        itemsId: [
          'Audit menu menyeluruh dan optimasi foto',
          'Menurunkan waktu offline: 73% → 0%',
          'Memangkas waktu tunggu: 437 → 135 detik',
          'Menghilangkan pembatalan pesanan sepenuhnya',
        ],
        itemsTh: [
          'ตรวจเมนูทั้งหมดและปรับรูปภาพ',
          'ลด offline rate: 73% → 0%',
          'ลดเวลารอ: 437 → 135 วินาที',
          'กำจัดการยกเลิกออร์เดอร์ได้หมด',
        ],
      },
      {
        titleRu: 'Аналитика и контроль',
        titleEn: 'Analytics & control',
        titleId: 'Analitik dan kontrol',
        titleTh: 'การวิเคราะห์ข้อมูลและการควบคุม',
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
        itemsId: [
          'Laporan mingguan dan pemantauan KPI',
          'Uji A/B item dan harga',
          'Mekanik untuk pesanan berulang',
          'Tinjauan bulanan dan realokasi anggaran',
        ],
        itemsTh: [
          'รายงานรายสัปดาห์และการติดตาม KPI',
          'ทดสอบ A/B ทั้งรายการอาหารและราคา',
          'กลไกกระตุ้นการสั่งซ้ำ',
          'รีวิวรายเดือนและโยกงบใหม่',
        ],
      },
    ],
    results: [
      { value: 'x9.4', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '20 270 → 190 263 THB/мес', subEn: '20,270 → 190,263 THB/mo', subId: '20,270 → 190,263 THB/bulan', subTh: '20,270 → 190,263 THB/เดือน' },
      { value: 'x4.6', labelRu: 'объём заказов', labelEn: 'order volume', labelId: 'volume pesanan', labelTh: 'ปริมาณออร์เดอร์', subRu: '34 → 167 заказов/мес', subEn: '34 → 167 orders/mo', subId: '34 → 167 pesanan/bulan', subTh: '34 → 167 ออร์เดอร์/เดือน' },
      { value: '27.5x', labelRu: 'пиковый ROAS', labelEn: 'peak ROAS', labelId: 'ROAS tertinggi', labelTh: 'ROAS สูงสุด', subRu: 'лучший месяц — февраль 2026', subEn: 'best month — February 2026', subId: 'bulan terbaik — Februari 2026', subTh: 'เดือนที่ดีที่สุด — กุมภาพันธ์ 2026' },
      { value: 'x3.6', labelRu: 'показы в поиске', labelEn: 'search impressions', labelId: 'impresi pencarian', labelTh: 'อิมเพรสชันในการค้นหา', subRu: '7 038 → 25 543 в месяц', subEn: '7,038 → 25,543 a month', subId: '7,038 → 25,543 per bulan', subTh: '7,038 → 25,543 ต่อเดือน' },
      { value: '566', labelRu: 'новых клиентов', labelEn: 'new customers', labelId: 'pelanggan baru', labelTh: 'ลูกค้าใหม่', subRu: 'привлечено за 14 месяцев', subEn: 'acquired in 14 months', subId: 'didapat dalam 14 bulan', subTh: 'ได้มาใน 14 เดือน' },
      { value: '0%', labelRu: 'offline и отмены', labelEn: 'offline & cancellations', labelId: 'waktu offline dan pembatalan', labelTh: 'ออฟไลน์และการยกเลิก', subRu: 'было 73% и 7.5%', subEn: 'was 73% and 7.5%', subId: 'sebelumnya 73% dan 7.5%', subTh: 'เดิม 73% และ 7.5%' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: '20 270 THB', after: '190 263 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '34', after: '167' },
      { metricRu: 'Offline Rate', metricEn: 'Offline rate', metricId: 'Waktu offline', metricTh: 'อัตราออฟไลน์', before: '73–109%', after: '0%' },
      { metricRu: 'Отмены заказов', metricEn: 'Order cancellations', metricId: 'Pembatalan pesanan', metricTh: 'การยกเลิกออร์เดอร์', before: '3–7.5%', after: '0%' },
      { metricRu: 'Время ожидания водителя', metricEn: 'Driver waiting time', metricId: 'Waktu tunggu driver', metricTh: 'เวลารอของคนขับ', before: '437 s', after: '135 s' },
      { metricRu: 'Показы в поиске (месяц)', metricEn: 'Search impressions (month)', metricId: 'Impresi pencarian (bulan)', metricTh: 'อิมเพรสชันในการค้นหา (ต่อเดือน)', before: '7 038', after: '25 543' },
      { metricRu: 'Рекламный ROAS', metricEn: 'Ads ROAS', metricId: 'ROAS iklan', metricTh: 'ROAS ของโฆษณา', before: '—', after: '27.5x' },
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
    nameId: 'USSR Phuket',
    locationRu: 'Патонг, Пхукет, Таиланд',
    locationEn: 'Patong, Phuket, Thailand',
    locationId: 'Patong, Phuket, Thailand',
    locationTh: 'ป่าตอง ภูเก็ต ประเทศไทย',
    periodRu: 'Апрель — май 2026 (2 месяца работы)',
    periodEn: 'April — May 2026 (2 months of work)',
    periodId: 'April — Mei 2026 (2 bulan kerja)',
    periodTh: 'เมษายน — พฤษภาคม 2026 (ทำงาน 2 เดือน)',
    headlineRu: 'Реанимация ресторана: выручка x3.9 за 2 месяца',
    headlineEn: 'Restaurant revival: revenue x3.9 in 2 months',
    headlineId: 'Reanimasi restoran: omzet x3.9 dalam 2 bulan',
    headlineTh: 'ชุบชีวิตร้าน: รายได้ x3.9 ใน 2 เดือน',
    heroStats: [
      { value: 'x3.9', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: 'x7.4', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์' },
      { value: '24x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', labelId: 'ROAS iklan', labelTh: 'ROAS ของโฆษณา' },
    ],
    situationRu:
      'Ресторан в Патонге, до нашего прихода — 8 заказов и 9 440 THB в месяц. Из-за Offline Rate в 3 977 минут в месяц ресторан целыми днями был закрыт для алгоритма и клиентов.',
    situationEn:
      'A restaurant in Patong doing 8 orders and 9,440 THB a month before we came in. With a 3,977 min/month offline rate, the restaurant was closed to the algorithm and customers for days at a time.',
    situationId:
      'Restoran di Patong dengan 8 pesanan dan 9,440 THB per bulan sebelum kami masuk. Dengan waktu offline 3,977 menit per bulan, restoran tertutup bagi algoritma dan pelanggan selama berhari-hari.',
    situationTh: 'ร้านอาหารในป่าตองที่ทำได้ 8 ออร์เดอร์ และ 9,440 THB ต่อเดือนก่อนเราเข้าไป ด้วย offline rate 3,977 นาทีต่อเดือน ร้านจึงปิดตัวจากทั้งอัลกอริทึมและลูกค้าครั้งละหลายวัน',
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
    problemsId: [
      'Waktu offline sampai 3,977 menit per bulan — restoran tidak terlihat sama sekali selama berhari-hari',
      'Iklan tidak berjalan — akun tidak diindeks oleh algoritma',
      'Rating 4.5 dengan sedikit ulasan — algoritma tidak memberi impresi',
      'Kata kunci tidak digarap — nol impresi pencarian',
      'Indikator operasional nol — tidak ada data waktu memasak',
    ],
    problemsTh: [
      'Offline rate สูงถึง 3,977 นาที/เดือน — หายไปจากสายตาหลายวันติด',
      'ไม่มีโฆษณา — อัลกอริทึมไม่จัดทำดัชนีบัญชีนี้',
      'เรตติ้ง 4.5 พร้อมรีวิวน้อย — อัลกอริทึมไม่ให้อิมเพรสชัน',
      'ไม่มีการทำคำค้น — อิมเพรสชันจากการค้นหาเป็นศูนย์',
      'ตัวชี้วัดด้านปฏิบัติการเป็นศูนย์ — ไม่มีข้อมูลเวลาเตรียมอาหารเลย',
    ],
    work: [
      {
        titleRu: 'Операционная реанимация',
        titleEn: 'Operational revival',
        titleId: 'Reanimasi operasional',
        titleTh: 'ชุบชีวิตงานปฏิบัติการ',
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
        itemsId: [
          'Menghilangkan waktu offline: 990 → 0 menit/hari',
          'Menata jam operasional akun',
          'Memantau penutupan dan item yang dinonaktifkan',
          'Melatih staf menangani pesanan',
        ],
        itemsTh: [
          'กำจัด offline rate: 990 → 0 นาที/วัน',
          'แก้เวลาทำการของบัญชีให้ถูกต้อง',
          'เฝ้าดูการปิดร้านและเมนูที่ถูกปิดขาย',
          'อบรมพนักงานเรื่องการจัดการออร์เดอร์',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
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
        itemsId: [
          'Audit dan optimasi nama serta deskripsi',
          'Peta kata kunci: Phuket + Patong',
          'Memasukkan kata kunci ke menu',
          'Menguatkan kata kunci lewat konversi',
        ],
        itemsTh: [
          'ตรวจและปรับชื่อร้านกับคำอธิบาย',
          'แผนคำค้น: ภูเก็ต + ป่าตอง',
          'ใส่คำค้นเข้าไปในเมนู',
          'เสริมความแข็งของคำค้นผ่านคอนเวอร์ชั่น',
        ],
      },
      {
        titleRu: 'Запуск рекламы',
        titleEn: 'Ads launch',
        titleId: 'Peluncuran iklan',
        titleTh: 'เริ่มยิงโฆษณา',
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
        itemsId: [
          'GrabAds dari nol — pesanan pertama di hari ke-3',
          'Kontrol CPO manual: impresi 5–10x lebih banyak',
          'Penskalaan: 0 → 1,316 THB/bulan',
          'ROAS puncak 24x',
        ],
        itemsTh: [
          'GrabAds จากศูนย์ — ออร์เดอร์แรกในวันที่ 3',
          'คุม CPO เอง: อิมเพรสชันเพิ่ม 5–10 เท่า',
          'ขยายงบ: 0 → 1,316 THB/เดือน',
          'ROAS สูงสุด 24 เท่า',
        ],
      },
      {
        titleRu: 'Аналитика и рейтинг',
        titleEn: 'Analytics & rating',
        titleId: 'Analitik dan rating',
        titleTh: 'การวิเคราะห์ข้อมูลและเรตติ้ง',
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
        itemsId: [
          'Laporan mingguan dan KPI',
          'Menaikkan rating: 4.5 → 4.8',
          'Uji A/B item dan harga',
          'Kontrol funnel konversi',
        ],
        itemsTh: [
          'รายงานรายสัปดาห์และ KPI',
          'ดันเรตติ้ง: 4.5 → 4.8',
          'ทดสอบ A/B รายการอาหารและราคา',
          'ควบคุมกรวยคอนเวอร์ชั่น',
        ],
      },
    ],
    results: [
      { value: 'x3.9', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '9 440 → 36 810 THB/мес', subEn: '9,440 → 36,810 THB/mo', subId: '9,440 → 36,810 THB/bulan', subTh: '9,440 → 36,810 THB/เดือน' },
      { value: 'x7.4', labelRu: 'объём заказов', labelEn: 'order volume', labelId: 'volume pesanan', labelTh: 'ปริมาณออร์เดอร์', subRu: '8 → 59 заказов/мес', subEn: '8 → 59 orders/mo', subId: '8 → 59 pesanan/bulan', subTh: '8 → 59 ออร์เดอร์/เดือน' },
      { value: '24x', labelRu: 'пиковый ROAS', labelEn: 'peak ROAS', labelId: 'ROAS tertinggi', labelTh: 'ROAS สูงสุด', subRu: 'май 2026', subEn: 'May 2026', subId: 'Mei 2026', subTh: 'พฤษภาคม 2026' },
      { value: '∞', labelRu: 'рост показов', labelEn: 'impressions growth', labelId: 'pertumbuhan impresi', labelTh: 'การเติบโตของอิมเพรสชัน', subRu: '0 → 7 481 в месяц', subEn: '0 → 7,481 a month', subId: '0 → 7,481 per bulan', subTh: '0 → 7,481 ต่อเดือน' },
      { value: '4.8', labelRu: 'рейтинг сейчас', labelEn: 'rating now', labelId: 'rating sekarang', labelTh: 'เรตติ้งตอนนี้', subRu: 'был 4.5', subEn: 'was 4.5', subId: 'sebelumnya 4.5', subTh: 'เดิม 4.5' },
      { value: '0', labelRu: 'offline мин/день', labelEn: 'offline min/day', labelId: 'menit offline/hari', labelTh: 'นาทีออฟไลน์/วัน', subRu: 'было 990 мин/день', subEn: 'was 990 min/day', subId: 'sebelumnya 990 menit/hari', subTh: 'เดิม 990 นาที/วัน' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: '9 440 THB', after: '36 810 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '8', after: '59' },
      { metricRu: 'Offline Rate', metricEn: 'Offline rate', metricId: 'Waktu offline', metricTh: 'อัตราออฟไลน์', before: '3 977 мин/мес · min/mo', after: '~0' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', metricId: 'Rating', metricTh: 'เรตติ้ง', before: '4.5', after: '4.8' },
      { metricRu: 'Показы в поиске (месяц)', metricEn: 'Search impressions (month)', metricId: 'Impresi pencarian (bulan)', metricTh: 'อิมเพรสชันในการค้นหา (ต่อเดือน)', before: '0', after: '7 481' },
      { metricRu: 'Новые клиенты (месяц)', metricEn: 'New customers (month)', metricId: 'Pelanggan baru (bulan)', metricTh: 'ลูกค้าใหม่ (ต่อเดือน)', before: '—', after: '32' },
      { metricRu: 'Рекламный ROAS', metricEn: 'Ads ROAS', metricId: 'ROAS iklan', metricTh: 'ROAS ของโฆษณา', before: '0', after: '24x' },
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
    nameId: 'Meat Point Phuket',
    locationRu: 'Раваи, Пхукет, Таиланд',
    locationEn: 'Rawai, Phuket, Thailand',
    locationId: 'Rawai, Phuket, Thailand',
    locationTh: 'ราไวย์ ภูเก็ต ประเทศไทย',
    periodRu: 'Апрель — июль 2026 (4 месяца)',
    periodEn: 'April — July 2026 (4 months)',
    periodId: 'April — Juli 2026 (4 bulan)',
    periodTh: 'เมษายน — กรกฎาคม 2026 (4 เดือน)',
    headlineRu: 'Выручка +46% на Grab — в низкий сезон',
    headlineEn: 'Grab revenue +46% — in the low season',
    headlineId: 'Omzet Grab +46% — di musim sepi',
    headlineTh: 'รายได้บน Grab +46% — ในช่วงโลว์ซีซัน',
    heroStats: [
      { value: '+46%', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: '+22%', labelRu: 'средний чек', labelEn: 'average order', labelId: 'rata-rata nilai pesanan', labelTh: 'ยอดต่อบิลเฉลี่ย' },
      { value: '30x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', labelId: 'ROAS iklan', labelTh: 'ROAS ของโฆษณา' },
    ],
    situationRu:
      'Работающий ресторан в Раваи: 275 заказов и 215 880 THB в месяц, реклама уже окупалась в 30 раз — но её недоливали (бюджет всего 3.2% от выручки), автоставка резала показы, а рейтинг 4.6 не дотягивал до порога 4.8, с которого Grab удешевляет рекламное место. Впереди — низкий сезон, когда рестораны Пхукета теряют 20–40% выручки.',
    situationEn:
      'A working restaurant in Rawai: 275 orders and 215,880 THB a month. Ads already paid back 30x — but were underfunded (budget just 3.2% of revenue), auto-bidding was cutting impressions, and the 4.6 rating fell short of the 4.8 threshold where Grab makes ad placements cheaper. Ahead — the low season, when Phuket restaurants lose 20–40% of revenue.',
    situationId:
      'Restoran yang sudah berjalan di Rawai: 275 pesanan dan 215,880 THB per bulan. Iklan sudah menghasilkan 30x, tetapi anggarannya kurang (hanya 3.2% dari omzet), bid otomatis memangkas impresi, dan rating 4.6 belum mencapai ambang 4.8 yang membuat Grab memberi tempat iklan lebih murah. Di depan — musim sepi, saat restoran di Phuket kehilangan 20–40% omzet.',
    situationTh: 'ร้านที่เปิดวิ่งอยู่แล้วในราไวย์: 275 ออร์เดอร์ และ 215,880 THB ต่อเดือน โฆษณาคืนทุนอยู่แล้ว 30 เท่า — แต่ได้งบน้อยเกินไป (งบแค่ 3.2% ของรายได้) ระบบบิดอัตโนมัติกดอิมเพรสชันลง และเรตติ้ง 4.6 ยังไม่ถึงเกณฑ์ 4.8 ที่ Grab ทำให้ค่าโฆษณาถูกลง ข้างหน้าคือโลว์ซีซัน ช่วงที่ร้านอาหารในภูเก็ตรายได้หายไป 20–40%',
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
    problemsId: [
      'Iklan menghasilkan 30x tetapi anggarannya kurang — setiap baht yang tidak terpakai berarti pesanan yang hilang',
      'Bid otomatis memangkas impresi: algoritma menghemat anggaran alih-alih mengambil trafik',
      'Rating 4.6 — di bawah ambang 4.8 yang membuat Grab memberi impresi lebih banyak dan iklan lebih murah',
      'Konversi dari jangkauan ke menu 13.9% — halaman restoran tidak menahan trafik yang sudah dibayar',
      'Musim sepi di depan: penurunan omzet khas di Phuket menjelang Juli adalah 20–40%',
    ],
    problemsTh: [
      'โฆษณาคืนทุน 30 เท่าแต่ได้งบน้อยเกินไป — ทุกบาทที่ไม่ได้ใช้คือออร์เดอร์ที่หายไป',
      'ระบบบิดอัตโนมัติกดอิมเพรสชัน: อัลกอริทึมประหยัดงบแทนที่จะไปเอาทราฟฟิก',
      'เรตติ้ง 4.6 — ต่ำกว่าเกณฑ์ 4.8 ที่ Grab ให้อิมเพรสชันใจกว้างและค่าโฆษณาถูกลง',
      'คอนเวอร์ชั่นจากการเข้าถึงสู่เมนู 13.9% — หน้าร้านรั้งทราฟฟิกที่จ่ายเงินซื้อมาแล้วไว้ไม่อยู่',
      'โลว์ซีซันรออยู่: รายได้ร้านในภูเก็ตช่วงเข้าเดือนกรกฎาคมมักตก 20–40%',
    ],
    work: [
      {
        titleRu: 'Оптимизация рекламы',
        titleEn: 'Ads optimization',
        titleId: 'Optimasi iklan',
        titleTh: 'ปรับโฆษณาให้เหมาะสม',
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
        itemsId: [
          'CPO manual alih-alih bid otomatis — mengambil trafik yang tadinya lari ke kompetitor',
          'Pengaturan diarahkan ke pesanan, bukan ke impresi',
          'Kontrol dan penyesuaian harian',
          'Membuka anggaran: dengan pengembalian 30x, membatasi belanja tidak masuk akal',
        ],
        itemsTh: [
          'คุม CPO เองแทนบิดอัตโนมัติ — ไปเอาทราฟฟิกที่ไหลไปหาคู่แข่งกลับมา',
          'ตั้งค่าเพื่อออร์เดอร์ ไม่ใช่เพื่ออิมเพรสชัน',
          'ควบคุมและปรับทุกวัน',
          'ปลดล็อกงบ: เมื่อคืนทุน 30 เท่า การจำกัดงบไม่มีเหตุผล',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
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
        itemsId: [
          'Peta kata kunci Phuket + Rawai',
          'Kata kunci di nama dan deskripsi hidangan',
          'Membangun ulang struktur kategori',
          'Menguatkan kata kunci lewat konversi — iklan jadi lebih murah',
        ],
        itemsTh: [
          'แผนคำค้น ภูเก็ต + ราไวย์',
          'คำค้นในชื่อเมนูและคำอธิบาย',
          'จัดโครงสร้างหมวดหมู่ใหม่',
          'เสริมคำค้นผ่านคอนเวอร์ชั่น — โฆษณาถูกลง',
        ],
      },
      {
        titleRu: 'Рейтинг и отзывы',
        titleEn: 'Rating & reviews',
        titleId: 'Rating dan ulasan',
        titleTh: 'เรตติ้งและรีวิว',
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
        itemsId: [
          'Pemantauan rating harian',
          'Menelaah setiap ulasan negatif',
          'Kontrol insiden — dijaga di 0',
          'Hasil: 4.6 → 4.8',
        ],
        itemsTh: [
          'เฝ้าดูเรตติ้งทุกวัน',
          'ตรวจสอบรีวิวเชิงลบทุกอัน',
          'ควบคุมเหตุร้องเรียน — คงไว้ที่ 0',
          'ผลลัพธ์: 4.6 → 4.8',
        ],
      },
      {
        titleRu: 'Персонал и аналитика',
        titleEn: 'Staff & analytics',
        titleId: 'Tim dan analitik',
        titleTh: 'ทีมงานและการวิเคราะห์ข้อมูล',
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
        itemsId: [
          'Melatih tim membaca indikator operasional',
          'Kontrol waktu offline dan item yang dinonaktifkan',
          'Laporan mingguan dan KPI',
          'Peringatan saat metrik turun',
        ],
        itemsTh: [
          'อบรมทีมเรื่องตัวชี้วัดด้านปฏิบัติการ',
          'ควบคุม offline rate และเมนูที่ถูกปิดขาย',
          'รายงานรายสัปดาห์และ KPI',
          'แจ้งเตือนเมื่อตัวชี้วัดตก',
        ],
      },
    ],
    results: [
      { value: '+46%', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '215 880 → 315 250 THB/мес', subEn: '215,880 → 315,250 THB/mo', subId: '215,880 → 315,250 THB/bulan', subTh: '215,880 → 315,250 THB/เดือน' },
      { value: '+22.4%', labelRu: 'средний чек', labelEn: 'average order value', labelId: 'rata-rata nilai pesanan', labelTh: 'ยอดต่อบิลเฉลี่ย', subRu: '785 → 961 THB', subEn: '785 → 961 THB', subId: '785 → 961 THB', subTh: '785 → 961 THB' },
      { value: '+19.3%', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์', subRu: '275 → 328 в месяц', subEn: '275 → 328 a month', subId: '275 → 328 per bulan', subTh: '275 → 328 ต่อเดือน' },
      { value: 'x2.4', labelRu: 'охват аудитории', labelEn: 'customer reach', labelId: 'jangkauan pelanggan', labelTh: 'การเข้าถึงลูกค้า', subRu: '7 760 → 18 473 клиентов', subEn: '7,760 → 18,473 customers', subId: '7,760 → 18,473 pelanggan', subTh: '7,760 → 18,473 ลูกค้า' },
      { value: '4.8', labelRu: 'рейтинг', labelEn: 'rating', labelId: 'rating', labelTh: 'เรตติ้ง', subRu: 'был 4.6, инцидентов 0', subEn: 'was 4.6, zero incidents', subId: 'sebelumnya 4.6, insiden 0', subTh: 'เดิม 4.6 ไม่มีเหตุร้องเรียน' },
      { value: '≈2x', labelRu: 'разрыв с рынком', labelEn: 'gap vs market', labelId: 'selisih dengan pasar', labelTh: 'ห่างจากตลาด', subRu: 'рынок в низкий сезон: −20…−40%', subEn: 'low-season market: −20…−40%', subId: 'pasar di musim sepi: −20…−40%', subTh: 'ตลาดช่วงโลว์ซีซัน: −20…−40%' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: '215 880 THB', after: '315 250 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '275', after: '328' },
      { metricRu: 'Средний чек', metricEn: 'Average order value', metricId: 'Rata-rata nilai pesanan', metricTh: 'ยอดต่อบิลเฉลี่ย', before: '785 THB', after: '961 THB' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', metricId: 'Rating', metricTh: 'เรตติ้ง', before: '4.6', after: '4.8' },
      { metricRu: 'Охват (уникальные клиенты)', metricEn: 'Reach (unique customers)', metricId: 'Jangkauan (pelanggan unik)', metricTh: 'การเข้าถึง (ลูกค้าไม่ซ้ำ)', before: '7 760', after: '18 473' },
      { metricRu: 'Выручка с рекламы', metricEn: 'Ads-attributed revenue', metricId: 'Omzet dari iklan', metricTh: 'รายได้ที่มาจากโฆษณา', before: '205 140 THB', after: '274 070 THB' },
      { metricRu: 'Динамика по месяцам', metricEn: 'Month by month', metricId: 'Dinamika per bulan', metricTh: 'รายเดือน', before: '215 880 → 233 010', after: '244 020 → 315 250' },
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
    nameId: 'Etna Phuket',
    locationRu: 'Банг Тао, Пхукет, Таиланд',
    locationEn: 'Bang Tao, Phuket, Thailand',
    locationId: 'Bang Tao, Phuket, Thailand',
    locationTh: 'บางเทา ภูเก็ต ประเทศไทย',
    periodRu: 'Май — июль 2026 (2 месяца)',
    periodEn: 'May — July 2026 (2 months)',
    periodId: 'Mei — Juli 2026 (2 bulan)',
    periodTh: 'พฤษภาคม — กรกฎาคม 2026 (2 เดือน)',
    headlineRu: 'Заказы выросли вдвое — на падающем трафике',
    headlineEn: 'Orders doubled — on falling traffic',
    headlineId: 'Pesanan naik dua kali lipat — saat trafik turun',
    headlineTh: 'ออร์เดอร์เพิ่มเท่าตัว — ทั้งที่ทราฟฟิกกำลังตก',
    heroStats: [
      { value: '+87%', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: 'x2.2', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์' },
      { value: '34.6x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', labelId: 'ROAS iklan', labelTh: 'ROAS ของโฆษณา' },
    ],
    situationRu:
      'Ресторан в Банг Тао падал: выручка −21.7%, заказы −17.7% к предыдущему периоду. Карточку видели 39 211 человек в месяц, а заказ делали 182 — сквозная конверсия 0.5% при средней по нашему флоту 0.9%. Трафик был — денег с него не было.',
    situationEn:
      'A Bang Tao restaurant in decline: revenue −21.7%, orders −17.7% versus the previous period. 39,211 people saw the listing monthly but only 182 ordered — a 0.5% through-conversion versus our fleet average of 0.9%. The traffic was there; the money wasn\'t.',
    situationId:
      'Restoran di Bang Tao sedang turun: omzet −21.7%, pesanan −17.7% dibanding periode sebelumnya. Halaman restoran dilihat 39,211 orang per bulan, tetapi hanya 182 yang memesan — konversi menyeluruh 0.5% dibanding rata-rata 0.9% di portofolio kami. Trafiknya ada, uangnya tidak.',
    situationTh: 'ร้านในบางเทาที่กำลังถดถอย: รายได้ −21.7% ออร์เดอร์ −17.7% เทียบกับช่วงก่อนหน้า มีคน 39,211 คนเห็นหน้าร้านต่อเดือน แต่สั่งจริงแค่ 182 คน — คอนเวอร์ชั่นตลอดเส้นทาง 0.5% เทียบกับค่าเฉลี่ยของกลุ่มร้านเราที่ 0.9% ทราฟฟิกมี แต่เงินไม่มา',
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
    problemsId: [
      'Tren menurun: omzet −21.7%, pesanan −17.7% dibanding periode sebelumnya',
      'Konversi menyeluruh 0.5% — setengah dari rata-rata portofolio kami (0.9%)',
      'Hanya 5.2% yang membuka menu setelah melihat — halaman restoran tidak menarik perhatian',
      'CTR iklan 2.8% — membayar impresi yang tidak diklik',
      'ROAS 14.75x — iklan sudah untung, tetapi belum bekerja maksimal setelah impresi',
    ],
    problemsTh: [
      'แนวโน้มขาลง: รายได้ −21.7% ออร์เดอร์ −17.7% เทียบกับช่วงก่อนหน้า',
      'คอนเวอร์ชั่นตลอดเส้นทาง 0.5% — ครึ่งเดียวของค่าเฉลี่ยกลุ่มร้านเรา (0.9%)',
      'มีเพียง 5.2% ของคนที่เห็นแล้วเปิดเมนู — หน้าร้านไม่สะดุดตา',
      'CTR โฆษณา 2.8% — จ่ายค่าอิมเพรสชันที่ไม่มีใครคลิก',
      'ROAS 14.75 เท่า — โฆษณามีกำไร แต่ทำได้ไม่ดีหลังจากคนเห็นแล้ว',
    ],
    work: [
      {
        titleRu: 'Оптимизация рекламы',
        titleEn: 'Ads optimization',
        titleId: 'Optimasi iklan',
        titleTh: 'ปรับโฆษณาให้เหมาะสม',
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
        itemsId: [
          'CPO manual alih-alih bid otomatis — algoritma mengumpulkan impresi murah yang tidak relevan',
          'Pengelolaan harian dengan koreksi sesuai hasil nyata',
          'Anggaran hanya naik 50% — omzet dari iklan tumbuh 3.4x',
          'Hasil: ROAS 14.75x → 34.57x',
        ],
        itemsTh: [
          'คุม CPO เองแทนบิดอัตโนมัติ — อัลกอริทึมไล่ซื้ออิมเพรสชันราคาถูกที่ไม่ตรงกลุ่ม',
          'บริหารทุกวันและปรับตามผลจริง',
          'เพิ่มงบแค่ 50% — รายได้จากโฆษณาโต 3.4 เท่า',
          'ผลลัพธ์: ROAS 14.75x → 34.57x',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
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
        itemsId: [
          'Peta kata kunci Phuket + Bang Tao',
          'Kata kunci di nama dan deskripsi hidangan',
          'Membangun ulang struktur kategori',
          'Halaman restoran jadi layak diklik: CTR 2.8% → 5.59%',
        ],
        itemsTh: [
          'แผนคำค้น ภูเก็ต + บางเทา',
          'คำค้นในชื่อเมนูและคำอธิบาย',
          'จัดโครงสร้างหมวดหมู่ใหม่',
          'หน้าร้านกลายเป็นสิ่งที่คนอยากคลิก: CTR 2.8% → 5.59%',
        ],
      },
      {
        titleRu: 'Конверсия воронки',
        titleEn: 'Funnel conversion',
        titleId: 'Konversi funnel',
        titleTh: 'คอนเวอร์ชั่นในกรวยการขาย',
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
        itemsId: [
          'Membangun ulang apa yang dilihat pelanggan: sampul, layar pertama, penyajian menu',
          'Jangkauan → menu: 5.2% → 8.6%',
          'Menu → pesanan: 9.0% → 19.7%',
          'Konversi menyeluruh x3.8: dari 0.5% ke 1.9% — dua kali rata-rata portofolio',
        ],
        itemsTh: [
          'รื้อสิ่งที่ลูกค้าเห็นใหม่ทั้งหมด: ภาพปก หน้าจอแรก การจัดวางเมนู',
          'เข้าถึง → เมนู: 5.2% → 8.6%',
          'เมนู → ออร์เดอร์: 9.0% → 19.7%',
          'คอนเวอร์ชั่นตลอดเส้นทาง x3.8: จาก 0.5% เป็น 1.9% — สองเท่าของค่าเฉลี่ยกลุ่มร้าน',
        ],
      },
      {
        titleRu: 'Рейтинг и операционка',
        titleEn: 'Rating & operations',
        titleId: 'Rating dan operasional',
        titleTh: 'เรตติ้งและงานปฏิบัติการ',
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
        itemsId: [
          'Pemantauan rating dan ulasan harian',
          'Melatih tim membaca indikator operasional',
          'Kontrol waktu offline dan item yang dinonaktifkan',
          'Rating 4.6 → 4.8',
        ],
        itemsTh: [
          'เฝ้าดูเรตติ้งและรีวิวทุกวัน',
          'อบรมทีมเรื่องตัวชี้วัดด้านปฏิบัติการ',
          'ควบคุม offline rate และเมนูที่ถูกปิดขาย',
          'เรตติ้ง 4.6 → 4.8',
        ],
      },
    ],
    results: [
      { value: '+87%', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '236 975 → 443 861 THB/мес', subEn: '236,975 → 443,861 THB/mo', subId: '236,975 → 443,861 THB/bulan', subTh: '236,975 → 443,861 THB/เดือน' },
      { value: 'x2.2', labelRu: 'объём заказов', labelEn: 'order volume', labelId: 'volume pesanan', labelTh: 'ปริมาณออร์เดอร์', subRu: '190 → 411 в месяц', subEn: '190 → 411 a month', subId: '190 → 411 per bulan', subTh: '190 → 411 ต่อเดือน' },
      { value: '34.6x', labelRu: 'ROAS рекламы', labelEn: 'ads ROAS', labelId: 'ROAS iklan', labelTh: 'ROAS ของโฆษณา', subRu: 'было 14.75x', subEn: 'was 14.75x', subId: 'sebelumnya 14.75x', subTh: 'เดิม 14.75x' },
      { value: 'x3.8', labelRu: 'сквозная конверсия', labelEn: 'through-conversion', labelId: 'konversi menyeluruh', labelTh: 'คอนเวอร์ชั่นตลอดเส้นทาง', subRu: '0.5% → 1.9%', subEn: '0.5% → 1.9%', subId: '0.5% → 1.9%', subTh: '0.5% → 1.9%' },
      { value: 'x2.0', labelRu: 'CTR рекламы', labelEn: 'ads CTR', labelId: 'CTR iklan', labelTh: 'CTR ของโฆษณา', subRu: '2.8% → 5.59%', subEn: '2.8% → 5.59%', subId: '2.8% → 5.59%', subTh: '2.8% → 5.59%' },
      { value: '−31%', labelRu: 'стоимость заказа', labelEn: 'cost per order', labelId: 'biaya per pesanan', labelTh: 'ต้นทุนต่อออร์เดอร์', subRu: '42 → 29 THB', subEn: '42 → 29 THB', subId: '42 → 29 THB', subTh: '42 → 29 THB' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: '236 975 THB', after: '443 861 THB' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '190', after: '411' },
      { metricRu: 'Сквозная конверсия «охват → заказ»', metricEn: 'Through-conversion (reach → order)', metricId: 'Konversi menyeluruh (jangkauan → pesanan)', metricTh: 'คอนเวอร์ชั่นตลอดเส้นทาง (เข้าถึง → ออร์เดอร์)', before: '0.5%', after: '1.9%' },
      { metricRu: 'Конверсия «меню → заказ»', metricEn: 'Menu → order conversion', metricId: 'Konversi menu → pesanan', metricTh: 'คอนเวอร์ชั่น เมนู → ออร์เดอร์', before: '9.0%', after: '19.7%' },
      { metricRu: 'ROAS рекламы', metricEn: 'Ads ROAS', metricId: 'ROAS iklan', metricTh: 'ROAS ของโฆษณา', before: '14.75x', after: '34.57x' },
      { metricRu: 'Выручка с рекламы', metricEn: 'Ads-attributed revenue', metricId: 'Omzet dari iklan', metricTh: 'รายได้ที่มาจากโฆษณา', before: '124 000 THB', after: '421 000 THB' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', metricId: 'Rating', metricTh: 'เรตติ้ง', before: '4.6', after: '4.8' },
      { metricRu: 'Охват (сезон падал)', metricEn: 'Reach (seasonal decline)', metricId: 'Jangkauan (musim menurun)', metricTh: 'การเข้าถึง (ช่วงตกตามฤดูกาล)', before: '39 211', after: '21 330 (−46%)' },
    ],
    images: [
      { src: '/th-assets/etna-grab-dashboard.jpg', alt: 'Etna Phuket — GrabFood sales and orders chart, May–July 2026' },
      { src: '/th-assets/etna-funnel.jpg', alt: 'Etna Phuket — conversion funnel: through-conversion x3.8 on falling reach' },
    ],
  },
  {
    slug: 'love-u-pizza',
    nameRu: 'Love U Pizza',
    nameEn: 'Love U Pizza',
    nameId: 'Love U Pizza',
    locationRu: 'Бали, Индонезия',
    locationEn: 'Bali, Indonesia',
    locationId: 'Bali, Indonesia',
    locationTh: 'บาหลี อินโดนีเซีย',
    periodRu: 'Ноябрь 2025 — июль 2026 (9 месяцев)',
    periodEn: 'November 2025 — July 2026 (9 months)',
    periodId: 'November 2025 — Juli 2026 (9 bulan)',
    periodTh: 'พฤศจิกายน 2025 — กรกฎาคม 2026 (9 เดือน)',
    headlineRu: 'Выручка выросла в 21 раз за 9 месяцев',
    headlineEn: 'Revenue grew 21x in 9 months',
    headlineId: 'Omzet tumbuh 21x dalam 9 bulan',
    headlineTh: 'รายได้โต 21 เท่าใน 9 เดือน',
    heroStats: [
      { value: 'x21', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: 'x14', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์' },
      { value: '+50%', labelRu: 'средний чек', labelEn: 'average check', labelId: 'rata-rata nilai pesanan', labelTh: 'ยอดต่อบิลเฉลี่ย' },
    ],
    situationRu:
      'Пиццерия на Бали, работаем с 2 ноября 2025 на обеих платформах — GrabFood и GoFood. Стартовая точка: 42,2 млн рупий и 194 заказа в месяц — меньше семи заказов в день на две платформы, уровень «нас не находят». GoJek фактически простаивал: 44 заказа и 16% выручки. За 9 месяцев ресторан дошёл до 888,2 млн рупий в месяц; суммарно за период — 4,51 млрд рупий и 15 586 заказов.',
    situationEn:
      'A pizzeria in Bali, managed by us since November 2, 2025 on both platforms — GrabFood and GoFood. Starting point: Rp 42.2M and 194 orders a month — fewer than seven orders a day across two platforms, the "nobody finds us" level. GoJek was effectively idle: 44 orders and 16% of revenue. In 9 months the restaurant reached Rp 888.2M a month; Rp 4.51bn and 15,586 orders over the period.',
    situationId:
      'Pizzeria di Bali, kami kelola sejak 2 November 2025 di kedua platform — GrabFood dan GoFood. Titik awal: Rp 42.2M dan 194 pesanan per bulan — kurang dari tujuh pesanan sehari untuk dua platform, level "tidak ada yang menemukan kami". GoJek praktis menganggur: 44 pesanan dan 16% omzet. Dalam 9 bulan restoran mencapai Rp 888.2M per bulan; total periode — Rp 4.51 miliar dan 15,586 pesanan.',
    situationTh: 'ร้านพิซซ่าในบาหลี เราดูแลตั้งแต่ 2 พฤศจิกายน 2025 บนสองแพลตฟอร์ม — GrabFood และ GoFood จุดเริ่มต้น: Rp 42.2 ล้าน และ 194 ออร์เดอร์ต่อเดือน — ไม่ถึงเจ็ดออร์เดอร์ต่อวันจากสองแพลตฟอร์มรวมกัน ระดับ "ไม่มีใครหาเราเจอ" GoJek แทบไม่ขยับ: 44 ออร์เดอร์ และ 16% ของรายได้ ภายใน 9 เดือน ร้านขึ้นมาถึง Rp 888.2 ล้านต่อเดือน รวมทั้งช่วงเป็น Rp 4.51 พันล้าน และ 15,586 ออร์เดอร์',
    problemsRu: [
      'Ресторан почти не существовал в доставке: 194 заказа в месяц на две платформы',
      'Средний чек 217 тыс. рупий — ниже потенциала категории: меню без логики допов, комбо и семейных позиций',
      'GoJek почти не работал — 44 заказа и 16% выручки, вторая платформа простаивала',
      'Аккаунты не оптимизированы: карточка, ключевые слова, структура меню и реклама требовали пересборки с нуля',
      'Рейтинг 4.8 на малых объёмах — главный вызов был сохранить его при кратном росте заказов',
    ],
    problemsEn: [
      'The restaurant barely existed in delivery: 194 orders a month across two platforms',
      'Average check of Rp 217K — below category potential: no add-on, combo or family-size logic in the menu',
      'GoJek barely worked — 44 orders and 16% of revenue; the second platform sat idle',
      'Accounts were unoptimized: listing, keywords, menu structure and ads needed a rebuild from scratch',
      'A 4.8 rating on low volume — the real challenge was keeping it through explosive order growth',
    ],
    problemsId: [
      'Restoran hampir tidak ada di layanan pesan antar: 194 pesanan per bulan untuk dua platform',
      'Rata-rata nilai pesanan Rp 217K — di bawah potensi kategori: menu tanpa logika item tambahan, combo dan porsi keluarga',
      'GoJek hampir tidak bekerja — 44 pesanan dan 16% omzet, platform kedua menganggur',
      'Akun tidak dioptimasi: halaman restoran, kata kunci, struktur menu dan iklan perlu dibangun ulang dari nol',
      'Rating 4.8 di volume kecil — tantangan utamanya adalah mempertahankannya saat pesanan tumbuh berlipat',
    ],
    problemsTh: [
      'ร้านแทบไม่มีตัวตนในเดลิเวอรี่: 194 ออร์เดอร์ต่อเดือนจากสองแพลตฟอร์มรวมกัน',
      'ยอดต่อบิลเฉลี่ย Rp 217K — ต่ำกว่าศักยภาพของหมวด: เมนูไม่มีตรรกะของ add-on คอมโบ หรือขนาดครอบครัว',
      'GoJek แทบไม่ทำงาน — 44 ออร์เดอร์ และ 16% ของรายได้ แพลตฟอร์มที่สองนิ่งสนิท',
      'บัญชีไม่ได้ปรับแต่ง: หน้าร้าน คำค้น โครงสร้างเมนู และโฆษณา ต้องรื้อใหม่ทั้งหมด',
      'เรตติ้ง 4.8 บนปริมาณน้อย — โจทย์จริงคือรักษาไว้ให้ได้ตอนออร์เดอร์โตพรวด',
    ],
    work: [
      {
        titleRu: 'Оптимизация аккаунтов и рекламы',
        titleEn: 'Accounts & ads optimization',
        titleId: 'Optimasi akun dan iklan',
        titleTh: 'ปรับบัญชีและโฆษณา',
        itemsRu: [
          'Полная пересборка карточек на Grab и GoJek',
          'Правильный запуск рекламы: ручной CPO вместо автоставки, настройки под заказы, а не под показы',
          'Постоянный контроль и корректировки — реклама не «включил и забыл»',
          'GoJek из простоя в рост: выручка платформы x24, чек +91.8%',
        ],
        itemsEn: [
          'Full listing rebuild on both Grab and GoJek',
          'Ads launched right: manual CPO instead of auto-bidding, tuned for orders, not impressions',
          'Continuous monitoring and adjustments — ads are not "set and forget"',
          'GoJek from idle to growth: platform revenue x24, check +91.8%',
        ],
        itemsId: [
          'Membangun ulang halaman restoran di Grab dan GoJek',
          'Meluncurkan iklan dengan benar: CPO manual alih-alih bid otomatis, diarahkan ke pesanan, bukan ke impresi',
          'Pemantauan dan koreksi terus-menerus — iklan bukan "nyalakan lalu lupakan"',
          'GoJek dari menganggur ke tumbuh: omzet platform x24, nilai pesanan +91.8%',
        ],
        itemsTh: [
          'รื้อหน้าร้านใหม่ทั้งบน Grab และ GoJek',
          'เริ่มโฆษณาให้ถูกวิธี: คุม CPO เองแทนบิดอัตโนมัติ ตั้งค่าเพื่อออร์เดอร์ ไม่ใช่อิมเพรสชัน',
          'เฝ้าดูและปรับต่อเนื่อง — โฆษณาไม่ใช่ของที่ "ตั้งแล้วลืม"',
          'GoJek จากนิ่งสนิทสู่การเติบโต: รายได้แพลตฟอร์ม x24 ยอดต่อบิล +91.8%',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
        itemsRu: [
          'Карта ключевых запросов по району и категории',
          'Ключи в названия и описания блюд',
          'Пересборка структуры категорий меню',
          'Прокачка ключей через конверсии — дешевле рекламы',
        ],
        itemsEn: [
          'Keyword map for the area and category',
          'Keywords in dish names and descriptions',
          'Menu category structure rebuild',
          'Ranking keywords through conversions — cheaper than ads',
        ],
        itemsId: [
          'Peta kata kunci untuk area dan kategori',
          'Kata kunci di nama dan deskripsi hidangan',
          'Membangun ulang struktur kategori menu',
          'Menguatkan kata kunci lewat konversi — lebih murah daripada iklan',
        ],
        itemsTh: [
          'แผนคำค้นสำหรับพื้นที่และหมวดอาหาร',
          'คำค้นในชื่อเมนูและคำอธิบาย',
          'จัดโครงสร้างหมวดเมนูใหม่',
          'ดันคำค้นขึ้นอันดับด้วยคอนเวอร์ชั่น — ถูกกว่าซื้อโฆษณา',
        ],
      },
      {
        titleRu: 'Расширение меню и цены',
        titleEn: 'Menu expansion & pricing',
        titleId: 'Perluasan menu dan harga',
        titleTh: 'ขยายเมนูและตั้งราคา',
        itemsRu: [
          'Новые позиции под спрос района',
          'Комбо и допы, поднимающие средний чек',
          'Цены и фото по нашей технологии',
          'Результат: чек +49.5% — без него рост был бы x14, а не x21',
        ],
        itemsEn: [
          'New items matched to local demand',
          'Combos and add-ons that lift the average check',
          'Pricing and photos by our playbook',
          'Result: check +49.5% — without it growth would be 14x, not 21x',
        ],
        itemsId: [
          'Item baru sesuai permintaan area',
          'Combo dan item tambahan yang menaikkan rata-rata nilai pesanan',
          'Harga dan foto sesuai metodologi kami',
          'Hasil: nilai pesanan +49.5% — tanpa itu pertumbuhan hanya x14, bukan x21',
        ],
        itemsTh: [
          'เมนูใหม่ที่ตรงกับความต้องการในพื้นที่',
          'คอมโบและ add-on ที่ดันยอดต่อบิล',
          'ตั้งราคาและถ่ายภาพตามคู่มือของเรา',
          'ผลลัพธ์: ยอดต่อบิล +49.5% — ถ้าไม่มีส่วนนี้ การเติบโตจะเป็น 14 เท่า ไม่ใช่ 21 เท่า',
        ],
      },
      {
        titleRu: 'Рейтинг, операционка и аналитика',
        titleEn: 'Rating, operations & analytics',
        titleId: 'Rating, operasional dan analitik',
        titleTh: 'เรตติ้ง งานปฏิบัติการ และการวิเคราะห์ข้อมูล',
        itemsRu: [
          'Ежедневный мониторинг рейтинга и разбор каждого негативного отзыва на обеих платформах',
          'Обучение команды: приём заказов вовремя, контроль offline-rate и стоп-листов',
          'Ежемесячный разбор всех метрик, контроль воронки, алертинг по падениям',
          'Рейтинг 4.8 удержан при росте заказов в 14 раз',
        ],
        itemsEn: [
          'Daily rating monitoring and a review-by-review response process on both platforms',
          'Team training: on-time order acceptance, offline-rate and stock-out control',
          'Monthly full-metric reviews, funnel control, alerts on drops',
          'Rating 4.8 held while orders grew 14x',
        ],
        itemsId: [
          'Pemantauan rating harian dan penanganan setiap ulasan negatif di kedua platform',
          'Melatih tim: menerima pesanan tepat waktu, kontrol waktu offline dan item yang dinonaktifkan',
          'Tinjauan bulanan seluruh metrik, kontrol funnel, peringatan saat ada penurunan',
          'Rating 4.8 dipertahankan saat pesanan tumbuh 14x',
        ],
        itemsTh: [
          'เฝ้าดูเรตติ้งทุกวันและมีกระบวนการตอบรีวิวทีละอันบนทั้งสองแพลตฟอร์ม',
          'อบรมทีม: รับออร์เดอร์ให้ตรงเวลา ควบคุม offline rate และเมนูที่ถูกปิดขาย',
          'รีวิวตัวชี้วัดครบทุกตัวรายเดือน ควบคุมกรวยการขาย แจ้งเตือนเมื่อตก',
          'รักษาเรตติ้ง 4.8 ไว้ได้ขณะออร์เดอร์โต 14 เท่า',
        ],
      },
    ],
    results: [
      { value: 'x21', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '42,2 → 888,2 млн Rp/мес', subEn: 'Rp 42.2M → 888.2M/mo', subId: 'Rp 42.2M → 888.2M/bulan', subTh: 'Rp 42.2 ล้าน → 888.2 ล้าน/เดือน' },
      { value: 'x14.1', labelRu: 'объём заказов', labelEn: 'order volume', labelId: 'volume pesanan', labelTh: 'ปริมาณออร์เดอร์', subRu: '194 → 2 733 в месяц', subEn: '194 → 2,733 a month', subId: '194 → 2,733 per bulan', subTh: '194 → 2,733 ต่อเดือน' },
      { value: '+49.5%', labelRu: 'средний чек', labelEn: 'average check', labelId: 'rata-rata nilai pesanan', labelTh: 'ยอดต่อบิลเฉลี่ย', subRu: 'Rp 217 397 → 324 999', subEn: 'Rp 217,397 → 324,999', subId: 'Rp 217,397 → 324,999', subTh: 'Rp 217,397 → 324,999' },
      { value: 'x24', labelRu: 'выручка GoJek', labelEn: 'GoJek revenue', labelId: 'omzet GoJek', labelTh: 'รายได้จาก GoJek', subRu: 'платформа простаивала', subEn: 'the platform sat idle', subId: 'platform sebelumnya menganggur', subTh: 'แพลตฟอร์มเคยนิ่งสนิท' },
      { value: '1.3%', labelRu: 'сквозная конверсия', labelEn: 'through-conversion', labelId: 'konversi menyeluruh', labelTh: 'คอนเวอร์ชั่นตลอดเส้นทาง', subRu: 'средняя по флоту 0.9%', subEn: 'fleet average 0.9%', subId: 'rata-rata portofolio 0.9%', subTh: 'ค่าเฉลี่ยของกลุ่มร้าน 0.9%' },
      { value: '4.8', labelRu: 'рейтинг удержан', labelEn: 'rating held', labelId: 'rating dipertahankan', labelTh: 'รักษาเรตติ้งไว้', subRu: 'при заказах x14', subEn: 'through 14x order growth', subId: 'saat pesanan tumbuh 14x', subTh: 'ขณะออร์เดอร์โต 14 เท่า' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: 'Rp 42 175 000', after: 'Rp 888 223 193' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '194', after: '2 733' },
      { metricRu: 'Средний чек', metricEn: 'Average check', metricId: 'Rata-rata nilai pesanan', metricTh: 'ยอดต่อบิลเฉลี่ย', before: 'Rp 217 397', after: 'Rp 324 999' },
      { metricRu: 'Выручка GrabFood', metricEn: 'GrabFood revenue', metricId: 'Omzet GrabFood', metricTh: 'รายได้จาก GrabFood', before: 'Rp 35,2 млн', after: 'Rp 721,0 млн (x20.5)' },
      { metricRu: 'Выручка GoFood (GoJek)', metricEn: 'GoFood (GoJek) revenue', metricId: 'Omzet GoFood (GoJek)', metricTh: 'รายได้จาก GoFood (GoJek)', before: 'Rp 6,9 млн', after: 'Rp 167,3 млн (x24.1)' },
      { metricRu: 'Заказов в день', metricEn: 'Orders a day', metricId: 'Pesanan per hari', metricTh: 'ออร์เดอร์ต่อวัน', before: '6.7', after: '88.2' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', metricId: 'Rating', metricTh: 'เรตติ้ง', before: '4.8', after: '4.8 — удержан при x14' },
    ],
    images: [
      { src: '/id-assets/loveu-growth.jpg', alt: 'Love U Pizza — 9-month sales and orders growth chart, GrabFood + GoFood' },
      { src: '/id-assets/loveu-funnel.jpg', alt: 'Love U Pizza — Grab funnel: through-conversion 1.3% vs 0.9% fleet average' },
    ],
  },

  {
    slug: 'zaytun-ubud',
    nameRu: 'Zaytun Ubud',
    nameEn: 'Zaytun Ubud',
    nameId: 'Zaytun Ubud',
    locationRu: 'Убуд, Бали, Индонезия',
    locationEn: 'Ubud, Bali, Indonesia',
    locationId: 'Ubud, Bali, Indonesia',
    locationTh: 'อูบุด บาหลี อินโดนีเซีย',
    periodRu: 'Февраль — июль 2026 (январь — точка «до нас»)',
    periodEn: 'February — July 2026 (January = the "before" baseline)',
    periodId: 'Februari — Juli 2026 (Januari = titik awal "sebelum kami")',
    periodTh: 'กุมภาพันธ์ — กรกฎาคม 2026 (มกราคมคือฐานเปรียบเทียบ "ก่อนเริ่ม")',
    headlineRu: 'Выручка x2.6 — на уже работающем ресторане',
    headlineEn: 'Revenue x2.6 — on an already-running restaurant',
    headlineId: 'Omzet x2.6 — di restoran yang sudah berjalan',
    headlineTh: 'รายได้ x2.6 — กับร้านที่เปิดวิ่งอยู่แล้ว',
    heroStats: [
      { value: 'x2.6', labelRu: 'выручка', labelEn: 'revenue', labelId: 'omzet', labelTh: 'รายได้' },
      { value: 'x2.1', labelRu: 'заказы', labelEn: 'orders', labelId: 'pesanan', labelTh: 'ออร์เดอร์' },
      { value: 'x62', labelRu: 'окупаемость GoJek-рекламы', labelEn: 'GoJek ads payback', labelId: 'pengembalian iklan GoJek', labelTh: 'ผลตอบแทนโฆษณา GoJek' },
    ],
    situationRu:
      'Здесь не было нулевой базы: до нас ресторан уже зарабатывал 166,6 млн рупий в месяц, реклама была включена, меню частично оптимизировали — но неправильно. Главная находка первого месяца: реклама на GoJek работала в убыток — ROAS 0.25x, потратили 3,1 млн рупий, вернули 763 тысячи, минус 2,3 млн за месяц. Никто этого не отслеживал. Мы не запускали — мы перестраивали: за 5 месяцев выручка x2.6.',
    situationEn:
      'No zero base here: before us the restaurant already made Rp 166.6M a month, ads were running, the menu had been partially optimized — incorrectly. The first month\'s key find: GoJek ads were losing money — ROAS 0.25x; Rp 3.1M spent, Rp 763K returned, minus Rp 2.3M in one month. Nobody was tracking it. We didn\'t launch — we rebuilt: revenue x2.6 in 5 months.',
    situationId:
      'Di sini tidak ada titik nol: sebelum kami restoran sudah menghasilkan Rp 166.6M per bulan, iklan sudah berjalan, menu sudah sebagian dioptimasi — tetapi keliru. Temuan utama bulan pertama: iklan GoJek merugi — ROAS 0.25x, keluar Rp 3.1M, kembali Rp 763K, minus Rp 2.3M dalam sebulan. Tidak ada yang memantaunya. Kami tidak memulai dari nol — kami membangun ulang: dalam 5 bulan omzet x2.6.',
    situationTh: 'ที่นี่ไม่ได้เริ่มจากศูนย์: ก่อนเรา ร้านทำได้ Rp 166.6 ล้านต่อเดือนอยู่แล้ว โฆษณาก็ยิงอยู่ เมนูก็ปรับมาบ้างแล้ว — แต่ปรับผิด สิ่งที่เจอในเดือนแรก: โฆษณา GoJek ขาดทุน — ROAS 0.25x จ่ายไป Rp 3.1 ล้าน กลับมา Rp 763K ติดลบ Rp 2.3 ล้านในเดือนเดียว และไม่มีใครตามดู เราไม่ได้เริ่มใหม่ — เรารื้อใหม่: รายได้ x2.6 ใน 5 เดือน',
    problemsRu: [
      'Реклама на GoJek в убыток: ROAS 0.25x — каждая вложенная рупия возвращала 25 копеек, и этого никто не замечал',
      'Меню оптимизировали до нас — но без ключевых слов, структура категорий не отражала спрос, допы не работали на чек',
      'Рейтинг 4.67 — ниже порога 4.8, с которого алгоритм щедрее отдаёт показы; GoJek просел до 4.6',
      'Сквозная конверсия 1.1% — выше средней по флоту, но вдвое ниже лучшего результата: потолок не был выбран',
      'Лёгкие точки роста израсходованы — каждый следующий процент надо доставать из конверсии, меню и качества трафика',
    ],
    problemsEn: [
      'GoJek ads losing money: ROAS 0.25x — every rupiah spent returned 25 cents, and nobody noticed',
      'The menu had been "optimized" before us — no keywords, category structure ignored demand, add-ons didn\'t lift the check',
      'Rating 4.67 — below the 4.8 threshold where the algorithm serves impressions more generously; GoJek down at 4.6',
      'Through-conversion 1.1% — above fleet average but half the best result: far from its ceiling',
      'Easy growth levers already spent — every next percent had to come from conversion, menu and traffic quality',
    ],
    problemsId: [
      'Iklan GoJek merugi: ROAS 0.25x — setiap rupiah yang keluar kembali 25 sen, dan tidak ada yang menyadarinya',
      'Menu sudah "dioptimasi" sebelum kami — tanpa kata kunci, struktur kategori tidak mencerminkan permintaan, item tambahan tidak menaikkan nilai pesanan',
      'Rating 4.67 — di bawah ambang 4.8 yang membuat algoritma memberi impresi lebih banyak; di GoJek turun ke 4.6',
      'Konversi menyeluruh 1.1% — di atas rata-rata portofolio, tetapi setengah dari hasil terbaik: potensinya belum diambil',
      'Titik pertumbuhan yang mudah sudah habis — setiap persen berikutnya harus diambil dari konversi, menu dan kualitas trafik',
    ],
    problemsTh: [
      'โฆษณา GoJek ขาดทุน: ROAS 0.25x — ทุกรูเปียห์ที่จ่ายกลับมา 25 เซ็นต์ และไม่มีใครสังเกต',
      'เมนูเคยถูก "ปรับให้เหมาะสม" มาก่อนหน้าเรา — ไม่มีคำค้น โครงสร้างหมวดไม่สนใจความต้องการจริง add-on ไม่ได้ดันยอดต่อบิล',
      'เรตติ้ง 4.67 — ต่ำกว่าเกณฑ์ 4.8 ที่อัลกอริทึมปล่อยอิมเพรสชันใจกว้างกว่า ส่วน GoJek ต่ำถึง 4.6',
      'คอนเวอร์ชั่นตลอดเส้นทาง 1.1% — สูงกว่าค่าเฉลี่ยกลุ่มร้าน แต่เป็นครึ่งเดียวของผลงานที่ดีที่สุด ยังห่างเพดานมาก',
      'ตัวเร่งการเติบโตแบบง่าย ๆ ถูกใช้ไปหมดแล้ว — ทุกเปอร์เซ็นต์ถัดไปต้องมาจากคอนเวอร์ชั่น เมนู และคุณภาพทราฟฟิก',
    ],
    work: [
      {
        titleRu: 'Пересборка рекламы',
        titleEn: 'Ads rebuild',
        titleId: 'Perombakan iklan',
        titleTh: 'รื้อโฆษณาใหม่',
        itemsRu: [
          'Реклама велась и до нас — мы взяли её под управление: ручной CPO вместо автоставки',
          'GoFood-кампании пересобраны с нуля: ROAS 0.25x → 15.52x — окупаемость x62 при почти том же бюджете',
          'GrabAds: ROAS 14.02x → 21.19x — бюджет удвоили, выручка с рекламы выросла втрое',
          'Сводный ROAS 10.2x → 20.1x; в июле CTR GrabAds 7.2%',
        ],
        itemsEn: [
          'Ads were already running — we took them under management: manual CPO instead of auto-bidding',
          'GoFood campaigns rebuilt from scratch: ROAS 0.25x → 15.52x — payback x62 on nearly the same budget',
          'GrabAds: ROAS 14.02x → 21.19x — budget doubled, ads revenue tripled',
          'Blended ROAS 10.2x → 20.1x; July GrabAds CTR 7.2%',
        ],
        itemsId: [
          'Iklan sudah berjalan sebelum kami — kami ambil alih pengelolaannya: CPO manual alih-alih bid otomatis',
          'Kampanye GoFood dibangun ulang dari nol: ROAS 0.25x → 15.52x — pengembalian x62 dengan anggaran hampir sama',
          'GrabAds: ROAS 14.02x → 21.19x — anggaran digandakan, omzet dari iklan naik tiga kali',
          'ROAS gabungan 10.2x → 20.1x; pada Juli CTR GrabAds 7.2%',
        ],
        itemsTh: [
          'โฆษณายิงอยู่แล้ว — เรารับมาดูแล: คุม CPO เองแทนบิดอัตโนมัติ',
          'รื้อแคมเปญ GoFood ใหม่ทั้งหมด: ROAS 0.25x → 15.52x — คืนทุนเพิ่ม 62 เท่าบนงบเกือบเท่าเดิม',
          'GrabAds: ROAS 14.02x → 21.19x — งบเพิ่มเท่าตัว รายได้จากโฆษณาโตสามเท่า',
          'ROAS รวม 10.2x → 20.1x; CTR ของ GrabAds เดือนกรกฎาคม 7.2%',
        ],
      },
      {
        titleRu: 'SEO и ключевые слова',
        titleEn: 'SEO & keywords',
        titleId: 'SEO dan kata kunci',
        titleTh: 'SEO และคำค้น',
        itemsRu: [
          'Карта ключевых запросов по Убуду и категории',
          'Ключи в названия и описания блюд',
          'Пересборка структуры категорий меню',
          'Охват x1.84, конверсия «охват → меню» 8.5% → 10.0%',
        ],
        itemsEn: [
          'Ubud + category keyword map',
          'Keywords in dish names and descriptions',
          'Menu category structure rebuild',
          'Reach x1.84, reach → menu conversion 8.5% → 10.0%',
        ],
        itemsId: [
          'Peta kata kunci Ubud dan kategori',
          'Kata kunci di nama dan deskripsi hidangan',
          'Membangun ulang struktur kategori menu',
          'Jangkauan x1.84, konversi jangkauan → menu 8.5% → 10.0%',
        ],
        itemsTh: [
          'แผนคำค้น อูบุด + หมวดอาหาร',
          'คำค้นในชื่อเมนูและคำอธิบาย',
          'จัดโครงสร้างหมวดเมนูใหม่',
          'การเข้าถึง x1.84 คอนเวอร์ชั่น เข้าถึง → เมนู 8.5% → 10.0%',
        ],
      },
      {
        titleRu: 'Исправление меню и цен',
        titleEn: 'Menu & pricing fix',
        titleId: 'Perbaikan menu dan harga',
        titleTh: 'แก้เมนูและราคา',
        itemsRu: [
          'Разбор того, что было сделано до нас, и пересборка под реальный спрос Убуда',
          'Новые позиции, комбо и допы, поднимающие средний чек',
          'Цены и фото по нашей технологии',
          'Результат: средний чек +24.5% без потери объёма заказов',
        ],
        itemsEn: [
          'Audit of the previous "optimization", rebuilt around real Ubud demand',
          'New items, combos and add-ons that lift the average check',
          'Pricing and photos by our playbook',
          'Result: average check +24.5% with no loss of order volume',
        ],
        itemsId: [
          'Menelaah apa yang dikerjakan sebelum kami dan membangun ulang sesuai permintaan nyata di Ubud',
          'Item baru, combo dan tambahan yang menaikkan rata-rata nilai pesanan',
          'Harga dan foto sesuai metodologi kami',
          'Hasil: rata-rata nilai pesanan +24.5% tanpa kehilangan volume pesanan',
        ],
        itemsTh: [
          'ตรวจสอบ "การปรับให้เหมาะสม" ครั้งก่อน แล้วรื้อใหม่รอบความต้องการจริงของอูบุด',
          'เมนูใหม่ คอมโบ และ add-on ที่ดันยอดต่อบิล',
          'ตั้งราคาและถ่ายภาพตามคู่มือของเรา',
          'ผลลัพธ์: ยอดต่อบิลเฉลี่ย +24.5% โดยจำนวนออร์เดอร์ไม่ลด',
        ],
      },
      {
        titleRu: 'Рейтинг и операционка',
        titleEn: 'Rating & operations',
        titleId: 'Rating dan operasional',
        titleTh: 'เรตติ้งและงานปฏิบัติการ',
        itemsRu: [
          'Ежедневный мониторинг на обеих платформах, разбор каждого негативного отзыва',
          'Обучение команды операционным показателям, контроль offline-rate и стоп-листов',
          'Меньше отмен и опозданий — выше рейтинг и дешевле реклама',
          'Рейтинг 4.67 → 4.8 при росте заказов вдвое',
        ],
        itemsEn: [
          'Daily monitoring on both platforms, a response process for every negative review',
          'Team training on operational metrics, offline-rate and stock-out control',
          'Fewer cancellations and delays — higher rating and cheaper ads',
          'Rating 4.67 → 4.8 while orders doubled',
        ],
        itemsId: [
          'Pemantauan harian di kedua platform, penanganan setiap ulasan negatif',
          'Melatih tim membaca indikator operasional, kontrol waktu offline dan item yang dinonaktifkan',
          'Lebih sedikit pembatalan dan keterlambatan — rating naik dan iklan lebih murah',
          'Rating 4.67 → 4.8 saat pesanan naik dua kali lipat',
        ],
        itemsTh: [
          'เฝ้าดูทุกวันบนทั้งสองแพลตฟอร์ม มีกระบวนการตอบรีวิวเชิงลบทุกอัน',
          'อบรมทีมเรื่องตัวชี้วัดด้านปฏิบัติการ ควบคุม offline rate และเมนูที่ถูกปิดขาย',
          'การยกเลิกและความล่าช้าน้อยลง — เรตติ้งสูงขึ้นและโฆษณาถูกลง',
          'เรตติ้ง 4.67 → 4.8 ขณะที่ออร์เดอร์เพิ่มเท่าตัว',
        ],
      },
    ],
    results: [
      { value: 'x2.6', labelRu: 'рост выручки', labelEn: 'revenue growth', labelId: 'pertumbuhan omzet', labelTh: 'การเติบโตของรายได้', subRu: '166,6 → 440,1 млн Rp/мес', subEn: 'Rp 166.6M → 440.1M/mo', subId: 'Rp 166.6M → 440.1M/bulan', subTh: 'Rp 166.6 ล้าน → 440.1 ล้าน/เดือน' },
      { value: 'x2.1', labelRu: 'объём заказов', labelEn: 'order volume', labelId: 'volume pesanan', labelTh: 'ปริมาณออร์เดอร์', subRu: '603 → 1 279 в месяц', subEn: '603 → 1,279 a month', subId: '603 → 1,279 per bulan', subTh: '603 → 1,279 ต่อเดือน' },
      { value: '+24.5%', labelRu: 'средний чек', labelEn: 'average check', labelId: 'rata-rata nilai pesanan', labelTh: 'ยอดต่อบิลเฉลี่ย', subRu: 'Rp 276 311 → 344 124', subEn: 'Rp 276,311 → 344,124', subId: 'Rp 276,311 → 344,124', subTh: 'Rp 276,311 → 344,124' },
      { value: 'x62', labelRu: 'окупаемость GoJek-рекламы', labelEn: 'GoJek ads payback', labelId: 'pengembalian iklan GoJek', labelTh: 'ผลตอบแทนโฆษณา GoJek', subRu: 'ROAS 0.25x → 15.52x', subEn: 'ROAS 0.25x → 15.52x', subId: 'ROAS 0.25x → 15.52x', subTh: 'ROAS 0.25x → 15.52x' },
      { value: '21.2x', labelRu: 'ROAS GrabAds', labelEn: 'GrabAds ROAS', labelId: 'ROAS GrabAds', labelTh: 'ROAS ของ GrabAds', subRu: 'было 14.02x', subEn: 'was 14.02x', subId: 'sebelumnya 14.02x', subTh: 'เดิม 14.02x' },
      { value: '4.8', labelRu: 'рейтинг', labelEn: 'rating', labelId: 'rating', labelTh: 'เรตติ้ง', subRu: 'было 4.67', subEn: 'was 4.67', subId: 'sebelumnya 4.67', subTh: 'เดิม 4.67' },
    ],
    beforeAfter: [
      { metricRu: 'Выручка в месяц', metricEn: 'Monthly revenue', metricId: 'Omzet per bulan', metricTh: 'รายได้ต่อเดือน', before: 'Rp 166 615 600', after: 'Rp 440 134 400' },
      { metricRu: 'Заказы в месяц', metricEn: 'Monthly orders', metricId: 'Pesanan per bulan', metricTh: 'ออร์เดอร์ต่อเดือน', before: '603', after: '1 279' },
      { metricRu: 'Средний чек', metricEn: 'Average check', metricId: 'Rata-rata nilai pesanan', metricTh: 'ยอดต่อบิลเฉลี่ย', before: 'Rp 276 311', after: 'Rp 344 124' },
      { metricRu: 'ROAS рекламы GoFood', metricEn: 'GoFood ads ROAS', metricId: 'ROAS iklan GoFood', metricTh: 'ROAS โฆษณา GoFood', before: '0.25x (в убыток)', after: '15.52x' },
      { metricRu: 'ROAS GrabAds', metricEn: 'GrabAds ROAS', metricId: 'ROAS GrabAds', metricTh: 'ROAS ของ GrabAds', before: '14.02x', after: '21.19x' },
      { metricRu: 'Выручка с рекламы (обе платформы)', metricEn: 'Ads-attributed revenue (both platforms)', metricId: 'Omzet dari iklan (kedua platform)', metricTh: 'รายได้ที่มาจากโฆษณา (ทั้งสองแพลตฟอร์ม)', before: 'Rp 116,8 млн', after: 'Rp 395,2 млн' },
      { metricRu: 'Сквозная конверсия «охват → заказ»', metricEn: 'Through-conversion (reach → order)', metricId: 'Konversi menyeluruh (jangkauan → pesanan)', metricTh: 'คอนเวอร์ชั่นตลอดเส้นทาง (เข้าถึง → ออร์เดอร์)', before: '1.1%', after: '1.4%' },
      { metricRu: 'Рейтинг', metricEn: 'Rating', metricId: 'Rating', metricTh: 'เรตติ้ง', before: '4.67', after: '4.8' },
    ],
    images: [
      { src: '/id-assets/zaytun-growth.jpg', alt: 'Zaytun Ubud — sales and orders growth chart January–July 2026, GrabFood + GoFood' },
      { src: '/id-assets/zaytun-ads.jpg', alt: 'Zaytun Ubud — ads table: GoFood ROAS 0.25x to 15.52x, GrabAds 14.02x to 21.19x' },
    ],
  },
];

export const getCaseBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
