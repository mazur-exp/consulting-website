/**
 * Кейсы в новом шаблоне (финальное ТЗ маркетолога, 24.11.2026, раздел 5).
 * Источник цифр: attached_assets/th-cases-2026-11/final/Delivery_Booster_ТЗ_финал.pdf.
 * Правила: главная цифра, график и таблица считаются по продажам (sales из Grab);
 * помесячные продажи клиентов не публикуем, у столбиков только пропорции (% от
 * лучшего месяца) и две подписанные точки. Старые длинные тексты кейсов живут в
 * case-studies.ts и показываются на странице в свёрнутом блоке «Подробнее о работе».
 */
export type Lang = 'ru' | 'en' | 'id' | 'th';
export type L = Record<Lang, string>;
export const l = (ru: string, en: string, id: string, th: string): L => ({ ru, en, id, th });
/** Число без перевода: одинаково на всех языках. */
export type V = string | L;

export type MonthKey = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec';
export const MONTH_SHORT: Record<MonthKey, L> = {
  jan: l('Янв', 'Jan', 'Jan', 'ม.ค.'), feb: l('Фев', 'Feb', 'Feb', 'ก.พ.'), mar: l('Мар', 'Mar', 'Mar', 'มี.ค.'),
  apr: l('Апр', 'Apr', 'Apr', 'เม.ย.'), may: l('Май', 'May', 'Mei', 'พ.ค.'), jun: l('Июн', 'Jun', 'Jun', 'มิ.ย.'),
  jul: l('Июл', 'Jul', 'Jul', 'ก.ค.'), aug: l('Авг', 'Aug', 'Agu', 'ส.ค.'), sep: l('Сен', 'Sep', 'Sep', 'ก.ย.'),
  oct: l('Окт', 'Oct', 'Okt', 'ต.ค.'), nov: l('Ноя', 'Nov', 'Nov', 'พ.ย.'), dec: l('Дек', 'Dec', 'Des', 'ธ.ค.'),
};
export const MONTH_FULL: Record<MonthKey, L> = {
  jan: l('Январь', 'January', 'Januari', 'มกราคม'), feb: l('Февраль', 'February', 'Februari', 'กุมภาพันธ์'),
  mar: l('Март', 'March', 'Maret', 'มีนาคม'), apr: l('Апрель', 'April', 'April', 'เมษายน'),
  may: l('Май', 'May', 'Mei', 'พฤษภาคม'), jun: l('Июнь', 'June', 'Juni', 'มิถุนายน'),
  jul: l('Июль', 'July', 'Juli', 'กรกฎาคม'), aug: l('Август', 'August', 'Agustus', 'สิงหาคม'),
  sep: l('Сентябрь', 'September', 'September', 'กันยายน'), oct: l('Октябрь', 'October', 'Oktober', 'ตุลาคม'),
  nov: l('Ноябрь', 'November', 'November', 'พฤศจิกายน'), dec: l('Декабрь', 'December', 'Desember', 'ธันวาคม'),
};

export type BarKind = 'pre' | 'a' | 'start' | 'us';
export interface Bar { m: MonthKey; h: number; c: BarKind; label?: V }
export interface Stat { v: V; l: L; note?: L; warn?: boolean }
export interface WorkCard { t: L; items: L[]; v: V; l: V }
export interface Row { m: L; a: V; b: V }
export interface Pt { m: MonthKey; y: number }

export interface CaseV2 {
  slug: string;
  country: 'th' | 'id';
  kind: 'growth' | 'launch';
  name: string;
  logo: string;
  place: L;
  /** Короткая приписка после района: «завтраки и боулы». */
  tag?: L;
  headline: L;
  lead: L;
  kpis: Stat[];
  /** Точка А и точка Б: из них собираются подписи, заголовок таблицы и её колонки. */
  a: Pt;
  b: Pt;
  pointA: { stats: Stat[]; bullets: L[] };
  work: { sub?: L; cards: WorkCard[] };
  bars: Bar[];
  /** Пунктир «лучший месяц без нас»: высота в % и подпись. */
  bestLine?: { h: number; label: L };
  chartNote?: L;
  rows: Row[];
  tableNote?: L;
  season?: { title: L; tiles: Stat[]; text?: L };
  cta?: L;
  card: { value: V; label: L; chips: L[] };
  /** Плашка у телефона на первом экране страны. */
  badge: { pre?: L; value: V; line: L; bars?: boolean };
  /** Дополнительные данные для свёрнутого блока (у новых кейсов нет старого текста). */
  details?: { text: L; rows: Row[]; queries?: { q: string; v: string }[]; queriesNote?: L };
  /** Пояснение к старому тексту кейса в свёрнутом блоке, если он считался по другой базе. */
  oldNote?: L;
}

/* ---------- общий словарь */
const D = {
  revenue: l('выручка', 'revenue', 'omzet', 'รายได้'),
  orders: l('заказы', 'orders', 'pesanan', 'ออร์เดอร์'),
  adsRoas: l('ROAS рекламы', 'ads ROAS', 'ROAS iklan', 'ROAS โฆษณา'),
  peakRoas: l('пиковый ROAS', 'peak ROAS', 'ROAS tertinggi', 'ROAS สูงสุด'),
  rating: l('рейтинг', 'rating', 'rating', 'เรตติ้ง'),
  ratingKept: l('рейтинг удержан', 'rating held', 'rating terjaga', 'รักษาเรตติ้งไว้ได้'),
  aov: l('средний чек', 'average order', 'rata-rata pesanan', 'ยอดเฉลี่ยต่อออร์เดอร์'),
  salesMo: l('продаж в месяц', 'monthly sales', 'penjualan per bulan', 'ยอดขายต่อเดือน'),
  ordersMo: l('заказов в месяц', 'orders a month', 'pesanan per bulan', 'ออร์เดอร์ต่อเดือน'),
  onAds: l('на рекламу', 'spent on ads', 'untuk iklan', 'งบโฆษณา'),
  reach: l('охват', 'reach', 'jangkauan', 'การเข้าถึง'),
  conv: l('сквозная конверсия', 'through-conversion', 'konversi menyeluruh', 'คอนเวอร์ชั่นตลอดเส้นทาง'),
  none: l('нет', 'none', 'tidak ada', 'ไม่มี'),
  seo: l('SEO и ключевые слова', 'SEO and keywords', 'SEO dan kata kunci', 'SEO และคำค้น'),
  ads: l('Реклама', 'Ads', 'Iklan', 'โฆษณา'),
  ratingOps: l('Рейтинг и операционка', 'Rating and operations', 'Rating dan operasional', 'เรตติ้งและงานปฏิบัติการ'),
  menuPrices: l('Меню и цены', 'Menu and prices', 'Menu dan harga', 'เมนูและราคา'),
  keysNames: l('Ключи в названиях и описаниях', 'Keywords in names and descriptions', 'Kata kunci di nama dan deskripsi', 'คำค้นในชื่อและคำอธิบาย'),
  newCats: l('Новая структура категорий', 'New category structure', 'Struktur kategori baru', 'โครงสร้างหมวดหมู่ใหม่'),
  manualCpo: l('Ручной CPO вместо автоставок', 'Manual CPO instead of auto-bidding', 'CPO manual, bukan bid otomatis', 'คุม CPO เองแทนบิดอัตโนมัติ'),
  staff: l('Обучение персонала', 'Staff training', 'Pelatihan staf', 'อบรมพนักงาน'),
  offStop: l('Контроль офлайна и стоп-листов', 'Offline and stock-out control', 'Kontrol offline dan stok habis', 'ควบคุมช่วงออฟไลน์และเมนูหมด'),
  weekly: l('Еженедельные отчёты и KPI', 'Weekly reports and KPIs', 'Laporan mingguan dan KPI', 'รายงานรายสัปดาห์และ KPI'),
  abTests: l('A/B-тесты позиций и цен', 'A/B tests of items and prices', 'Uji A/B menu dan harga', 'ทดสอบ A/B เมนูและราคา'),
  forOrders: l('Ставки под заказы, а не под показы', 'Bids set for orders, not impressions', 'Bid untuk pesanan, bukan impresi', 'ตั้งบิดเพื่อออร์เดอร์ ไม่ใช่ยอดแสดงผล'),
  ourTech: l('Цены и фото по нашей технологии', 'Prices and photos by our method', 'Harga dan foto dengan metode kami', 'ราคาและรูปตามวิธีของเรา'),
  bothPlatforms: l('Мониторинг на обеих платформах', 'Monitoring on both platforms', 'Pemantauan di kedua platform', 'ติดตามทั้งสองแพลตฟอร์ม'),
  onGrab: l('выручки на Grab', 'revenue on Grab', 'omzet di Grab', 'รายได้บน Grab'),
  onBoth: l('выручки на Grab и GoFood', 'revenue on Grab and GoFood', 'omzet di Grab dan GoFood', 'รายได้บน Grab และ GoFood'),
  lowSeason: l('И всё это - в низкий сезон', 'And all of it in low season', 'Dan semuanya di musim sepi', 'และทั้งหมดนี้เกิดขึ้นในโลว์ซีซัน'),
};
const was = (x: string): L => l(`рейтинг (был ${x})`, `rating (was ${x})`, `rating (sebelumnya ${x})`, `เรตติ้ง (เดิม ${x})`);
const rowRev = (cur: string): L => l(`Выручка в месяц, ${cur}`, `Monthly revenue, ${cur}`, `Omzet per bulan, ${cur}`, `รายได้ต่อเดือน (${cur})`);
const rowPayout = (cur: string): L => l(`Выплаты ресторану, ${cur}`, `Payout to the restaurant, ${cur}`, `Pencairan ke restoran, ${cur}`, `ยอดเงินโอนให้ร้าน (${cur})`);
const rowAov = (cur: string): L => l(`Средний чек, ${cur}`, `Average order, ${cur}`, `Rata-rata pesanan, ${cur}`, `ยอดเฉลี่ยต่อออร์เดอร์ (${cur})`);
const rowAdsRev = (cur: string): L => l(`Выручка с рекламы, ${cur}`, `Ads revenue, ${cur}`, `Omzet dari iklan, ${cur}`, `รายได้จากโฆษณา (${cur})`);
const R = {
  orders: l('Заказов в месяц', 'Orders a month', 'Pesanan per bulan', 'ออร์เดอร์ต่อเดือน'),
  rating: l('Рейтинг', 'Rating', 'Rating', 'เรตติ้ง'),
  roas: l('Реклама, ROAS', 'Ads ROAS', 'ROAS iklan', 'ROAS โฆษณา'),
  saw: l('Увидели ресторан', 'Saw the restaurant', 'Melihat restoran', 'คนที่เห็นร้าน'),
  menu: l('Открыли меню', 'Opened the menu', 'Membuka menu', 'คนที่เปิดเมนู'),
  offline: l('Офлайн', 'Offline', 'Offline', 'ออฟไลน์'),
  search: l('Показы в поиске в месяц', 'Search impressions a month', 'Impresi pencarian per bulan', 'การแสดงผลในการค้นหาต่อเดือน'),
  conv: l('Сквозная конверсия', 'Through-conversion', 'Konversi menyeluruh', 'คอนเวอร์ชั่นตลอดเส้นทาง'),
  menuOrder: l('Конверсия меню → заказ', 'Menu → order conversion', 'Konversi menu → pesanan', 'คอนเวอร์ชั่น เมนู → ออร์เดอร์'),
  reach: l('Охват', 'Reach', 'Jangkauan', 'การเข้าถึง'),
  cancels: l('Отмены', 'Cancellations', 'Pembatalan', 'การยกเลิก'),
  wait: l('Ожидание курьера', 'Driver wait time', 'Waktu tunggu kurir', 'เวลารอของไรเดอร์'),
  customers: l('Клиентов с заказом', 'Customers who ordered', 'Pelanggan yang memesan', 'ลูกค้าที่สั่ง'),
  adBudget: l('Бюджет на рекламу', 'Ad budget', 'Anggaran iklan', 'งบโฆษณา'),
  delayed: l('Доля задержанных заказов', 'Delayed orders', 'Pesanan terlambat', 'ออร์เดอร์ล่าช้า'),
  offShare: l('Доля офлайна', 'Offline share', 'Porsi offline', 'สัดส่วนออฟไลน์'),
  cancelShare: l('Доля отмен', 'Cancellation rate', 'Tingkat pembatalan', 'อัตราการยกเลิก'),
  items: l('Позиций в меню', 'Menu items', 'Jumlah menu', 'จำนวนเมนู'),
};

export const CASES_V2: CaseV2[] = [
  /* ============================== Surf Point */
  {
    slug: 'surf-point-phuket', country: 'th', kind: 'growth', name: 'Surf Point', logo: '/clients/surf-point.webp',
    place: l('Раваи, Пхукет', 'Rawai, Phuket', 'Rawai, Phuket', 'ราไวย์ ภูเก็ต'),
    tag: l('завтраки и боулы', 'breakfasts and bowls', 'sarapan dan bowl', 'อาหารเช้าและโบวล์'),
    headline: l('Выручка ×2.3: из низкого сезона в рекорд года', 'Revenue ×2.3: from low season to the best month of the year', 'Omzet ×2.3: dari musim sepi ke bulan terbaik tahun ini', 'รายได้ ×2.3: จากโลว์ซีซันสู่เดือนที่ดีที่สุดของปี'),
    lead: l(
      'Июнь → октябрь 2026. Зашли на дне низкого сезона, когда ресторан два месяца терял выручку. Через 3 месяца - лучший месяц за год.',
      'June → October 2026. We came in at the bottom of low season, after the restaurant had lost revenue two months in a row. Three months later it had its best month of the year.',
      'Juni → Oktober 2026. Kami masuk di titik terendah musim sepi, saat omzet restoran sudah turun dua bulan berturut-turut. Tiga bulan kemudian: bulan terbaik sepanjang tahun.',
      'มิถุนายน → ตุลาคม 2026 เราเข้ามาตอนจุดต่ำสุดของโลว์ซีซัน หลังร้านรายได้ลดลงสองเดือนติด สามเดือนต่อมาคือเดือนที่ดีที่สุดของปี'),
    kpis: [
      { v: '+129%', l: D.revenue }, { v: '+74%', l: D.orders }, { v: '21.7×', l: D.adsRoas }, { v: '4.8', l: D.ratingKept },
    ],
    a: { m: 'jun', y: 2026 }, b: { m: 'oct', y: 2026 },
    pointA: {
      stats: [
        { v: '175 670', l: l('THB выручки в месяц', 'THB monthly revenue', 'THB omzet per bulan', 'THB รายได้ต่อเดือน'), note: l('-25% к маю', '-25% vs May', '-25% dibanding Mei', '-25% เทียบกับ พ.ค.'), warn: true },
        { v: '355', l: D.ordersMo, note: l('-14% к маю', '-14% vs May', '-14% dibanding Mei', '-14% เทียบกับ พ.ค.'), warn: true },
        { v: '4 467', l: l('человек увидели ресторан', 'people saw the restaurant', 'orang melihat restoran', 'คนที่เห็นร้าน'), note: l('в мае было 6 064', '6 064 in May', 'di bulan Mei 6 064', 'เดือน พ.ค. คือ 6 064') },
        { v: '0 THB', l: D.onAds, note: l('GrabAds не запущена', 'GrabAds not running', 'GrabAds belum berjalan', 'ยังไม่ได้เปิด GrabAds') },
      ],
      bullets: [
        l('Выручка падала вместе с сезоном: без вмешательства летние месяцы шли бы только ниже.', 'Revenue was falling with the season: left alone, the summer months would only go lower.', 'Omzet turun mengikuti musim: tanpa campur tangan, bulan-bulan berikutnya hanya akan lebih rendah.', 'รายได้ลดลงตามฤดูกาล หากไม่ทำอะไร เดือนถัดไปจะยิ่งต่ำลง'),
        l('Рекламы не было: ноль показов, ресторан не участвовал в борьбе за выдачу.', 'No ads at all: zero impressions, the restaurant was not competing for placement.', 'Tanpa iklan sama sekali: nol impresi, restoran tidak ikut bersaing di hasil pencarian.', 'ไม่มีโฆษณาเลย: ยอดแสดงผลเป็นศูนย์ ร้านไม่ได้แข่งขันในหน้าค้นหา'),
        l('Заказывали в основном «свои», те, кто искал Surf Point по названию. Карточка продавала хорошо, но ресторан почти никто не видел.', 'Orders came mostly from regulars who searched for Surf Point by name. The listing converted well, but almost nobody saw it.', 'Pesanan datang terutama dari pelanggan lama yang mencari Surf Point berdasarkan nama. Halaman restoran menjual dengan baik, tetapi hampir tidak ada yang melihatnya.', 'ออร์เดอร์ส่วนใหญ่มาจากลูกค้าเดิมที่ค้นหาชื่อ Surf Point โดยตรง หน้าร้านปิดการขายได้ดี แต่แทบไม่มีใครเห็น'),
      ],
    },
    work: {
      sub: l('Рост дала вся работа целиком, а не одна настройка.', 'Growth came from the whole body of work, not from one setting.', 'Pertumbuhan datang dari seluruh pekerjaan, bukan dari satu pengaturan.', 'การเติบโตมาจากงานทั้งหมดรวมกัน ไม่ใช่การตั้งค่าเพียงจุดเดียว'),
      cards: [
        { t: l('Реклама с нуля', 'Ads from scratch', 'Iklan dari nol', 'โฆษณาเริ่มจากศูนย์'), items: [l('GrabAds по нашей технологии', 'GrabAds run by our method', 'GrabAds dengan metode kami', 'GrabAds ตามวิธีของเรา'), D.forOrders, l('Ежедневный контроль и правки', 'Daily control and adjustments', 'Kontrol dan koreksi harian', 'ดูแลและปรับทุกวัน')], v: '21.7×', l: D.adsRoas },
        { t: D.seo, items: [l('Ключевые слова в названиях блюд', 'Keywords in dish names', 'Kata kunci di nama menu', 'คำค้นในชื่อเมนู'), l('Выход в поиск по категориям, а не только по названию', 'Visibility in category search, not only by name', 'Muncul di pencarian kategori, bukan hanya nama', 'ติดผลค้นหาตามหมวดหมู่ ไม่ใช่แค่ชื่อร้าน')], v: '×4.8', l: D.reach },
        { t: l('Меню, фото и цены', 'Menu, photos and prices', 'Menu, foto dan harga', 'เมนู รูป และราคา'), items: [l('Фото блюд под Grab', 'Dish photos made for Grab', 'Foto menu untuk Grab', 'รูปเมนูสำหรับ Grab'), l('Цены и структура меню по нашей технологии', 'Prices and menu structure by our method', 'Harga dan struktur menu dengan metode kami', 'ราคาและโครงสร้างเมนูตามวิธีของเรา'), l('Хиты на виду', 'Best-sellers up front', 'Menu terlaris di depan', 'เมนูขายดีอยู่ด้านบน')], v: '495 → 652', l: l('средний чек, THB', 'average order, THB', 'rata-rata pesanan, THB', 'ยอดเฉลี่ยต่อออร์เดอร์ (THB)') },
        { t: l('Рейтинг и отзывы', 'Rating and reviews', 'Rating dan ulasan', 'เรตติ้งและรีวิว'), items: [l('Ежедневный мониторинг', 'Daily monitoring', 'Pemantauan harian', 'ติดตามทุกวัน'), l('Ответы на отзывы', 'Replies to reviews', 'Balasan ulasan', 'ตอบรีวิว'), l('Жалобы на несправедливые оценки', 'Appeals against unfair ratings', 'Banding atas penilaian tidak adil', 'ยื่นคำร้องเรื่องคะแนนที่ไม่เป็นธรรม')], v: '24', l: l('негативных оценки удалено', 'negative ratings removed', 'penilaian negatif dihapus', 'คะแนนลบที่ถูกลบออก') },
        { t: l('Операционка и аналитика', 'Operations and analytics', 'Operasional dan analitik', 'งานปฏิบัติการและข้อมูล'), items: [l('Контроль офлайна, отмен и задержек', 'Offline, cancellation and delay control', 'Kontrol offline, pembatalan dan keterlambatan', 'ควบคุมออฟไลน์ การยกเลิก และความล่าช้า'), D.weekly], v: l('5 мин', '5 min', '5 mnt', '5 นาที'), l: l('мониторинг ресторана', 'restaurant monitoring', 'pemantauan restoran', 'รอบการตรวจร้าน') },
      ],
    },
    bars: [
      { m: 'feb', h: 25, c: 'pre' }, { m: 'mar', h: 72, c: 'pre' }, { m: 'apr', h: 69, c: 'pre' }, { m: 'may', h: 59, c: 'pre' },
      { m: 'jun', h: 44, c: 'a', label: '175 670' }, { m: 'jul', h: 46, c: 'start' }, { m: 'aug', h: 46, c: 'us' }, { m: 'sep', h: 64, c: 'us' }, { m: 'oct', h: 100, c: 'us', label: '402 050' },
    ],
    bestLine: { h: 72, label: l('лучший месяц без нас: март', 'best month before us: March', 'bulan terbaik sebelum kami: Maret', 'เดือนที่ดีที่สุดก่อนมีเรา: มีนาคม') },
    chartNote: l(
      'Первые месяцы ушли на настройку рекламы, ключевых слов и меню: обычно рост начинается на 3-4 месяц. Так и вышло: сентябрь +38% к августу, октябрь ещё +57%. Октябрь: 402 050 THB, на 39% выше лучшего месяца высокого сезона.',
      'The first months went into setting up ads, keywords and the menu: growth usually starts in month 3-4. That is what happened: September +38% over August, October another +57%. October: THB 402,050, 39% above the best high-season month.',
      'Bulan-bulan pertama dipakai untuk menyiapkan iklan, kata kunci dan menu: pertumbuhan biasanya mulai di bulan ke-3 atau ke-4. Itulah yang terjadi: September +38% dari Agustus, Oktober +57% lagi. Oktober: THB 402,050, 39% di atas bulan terbaik musim ramai.',
      'เดือนแรก ๆ ใช้ไปกับการตั้งค่าโฆษณา คำค้น และเมนู โดยปกติการเติบโตจะเริ่มในเดือนที่ 3-4 และก็เป็นเช่นนั้น: กันยายน +38% จากสิงหาคม ตุลาคมเพิ่มอีก +57% ตุลาคม: 402,050 THB สูงกว่าเดือนที่ดีที่สุดของไฮซีซัน 39%'),
    rows: [
      { m: rowRev('THB'), a: '175 670', b: '402 050' }, { m: R.orders, a: '355', b: '617' }, { m: rowAov('THB'), a: '495', b: '652' },
      { m: R.saw, a: '4 467', b: '21 247' }, { m: R.menu, a: '843', b: '1 803' }, { m: R.roas, a: D.none, b: '21.7×' },
      { m: R.rating, a: '4.8', b: '4.8' }, { m: rowPayout('THB'), a: '149 542', b: '321 015' },
    ],
    tableNote: l(
      'Заказов на 74% больше, а средний чек не просел, а вырос на 32%: новые гости заказывают больше. Выплаты ресторану выросли в 2.1 раза, это уже после комиссии Grab и расходов на рекламу.',
      'Orders are up 74%, and the average order did not drop but grew 32%: new guests order more. The payout to the restaurant grew 2.1 times, and that is after Grab commission and ad costs.',
      'Pesanan naik 74%, dan rata-rata pesanan tidak turun tetapi naik 32%: tamu baru memesan lebih banyak. Pencairan ke restoran naik 2,1 kali, sudah setelah komisi Grab dan biaya iklan.',
      'ออร์เดอร์เพิ่มขึ้น 74% และยอดเฉลี่ยต่อออร์เดอร์ไม่ลดลงแต่เพิ่มขึ้น 32% ลูกค้าใหม่สั่งมากขึ้น ยอดเงินโอนให้ร้านเพิ่มขึ้น 2.1 เท่า หลังหักค่าคอมมิชชัน Grab และค่าโฆษณาแล้ว'),
    season: {
      title: l('И всё это - из низкого сезона', 'And all of it out of low season', 'Dan semuanya dari musim sepi', 'และทั้งหมดนี้เริ่มจากโลว์ซีซัน'),
      tiles: [
        { v: '-25%', l: l('так ресторан шёл в низкий сезон сам: июнь к маю', 'how the restaurant was doing on its own in low season: June vs May', 'kinerja restoran sendiri di musim sepi: Juni dibanding Mei', 'ผลของร้านเองในโลว์ซีซัน: มิ.ย. เทียบ พ.ค.'), warn: true },
        { v: '+129%', l: l('наш результат: июнь → октябрь', 'our result: June → October', 'hasil kami: Juni → Oktober', 'ผลของเรา: มิ.ย. → ต.ค.') },
        { v: '+39%', l: l('октябрь к лучшему месяцу без нас, марту', 'October vs the best month before us, March', 'Oktober dibanding bulan terbaik sebelum kami, Maret', 'ต.ค. เทียบกับเดือนที่ดีที่สุดก่อนมีเรา (มี.ค.)') },
      ],
      text: l(
        'Туристов на Пхукете в октябре было на треть меньше, чем в марте: 219 тысяч против 320 тысяч. Выручка при этом на 39% выше. Расти в высокий сезон умеет и рынок сам, перекрыть его в низкий сезон помогает работа с рекламой, поиском и меню.',
        'Phuket had a third fewer tourists in October than in March: 219 thousand against 320 thousand. Revenue was 39% higher all the same. The market grows by itself in high season; beating it in low season takes work on ads, search and the menu.',
        'Wisatawan di Phuket pada Oktober sepertiga lebih sedikit daripada Maret: 219 ribu dibanding 320 ribu. Omzet tetap 39% lebih tinggi. Di musim ramai pasar tumbuh sendiri; melampauinya di musim sepi butuh kerja di iklan, pencarian dan menu.',
        'นักท่องเที่ยวในภูเก็ตเดือนตุลาคมน้อยกว่าเดือนมีนาคมหนึ่งในสาม: 219,000 เทียบกับ 320,000 คน แต่รายได้กลับสูงกว่า 39% ในไฮซีซันตลาดโตได้เอง การทำให้ดีกว่านั้นในโลว์ซีซันต้องอาศัยงานด้านโฆษณา การค้นหา และเมนู'),
    },
    card: { value: 'x2.3', label: D.onGrab, chips: [l('заказы +74%', 'orders +74%', 'pesanan +74%', 'ออร์เดอร์ +74%'), l('ROAS 21.7x', 'ROAS 21.7x', 'ROAS 21.7x', 'ROAS 21.7x'), l('за 3 месяца из низкого сезона', 'in 3 months, from low season', 'dalam 3 bulan, dari musim sepi', 'ใน 3 เดือน จากโลว์ซีซัน')] },
    badge: { value: 'x2.3', line: l('выручки за 3 мес.', 'revenue in 3 months', 'omzet dalam 3 bulan', 'รายได้ใน 3 เดือน'), bars: true },
    details: {
      text: l(
        'Завтраки и бранчи в Раваи. К июню ресторан падал вместе с сезоном: выручка -25.4%, заказы -13.8%, средний чек -13.5% к маю. Рекламы не было совсем. В июне заказывали «свои», поэтому конверсия была высокой, а аудитория крошечной. Реклама и ключевые слова привели в 5 раз больше людей, которые раньше ресторан не видели: на таком охвате конверсия закономерно ниже, и 2.9% это в 2.6 раза выше средней по нашему флоту (1.1%). Хиты выросли кратно, заказов в месяц: сэндвич с авокадо и лососем 35 → 93, гречка с курицей 45 → 78, сырники 46 → 71, капучино 78 → 130.',
        'Breakfasts and brunch in Rawai. By June the restaurant was falling with the season: revenue -25.4%, orders -13.8%, average order -13.5% versus May. There were no ads at all. In June the orders came from regulars, so conversion was high and the audience tiny. Ads and keywords brought five times more people who had never seen the restaurant: at that reach conversion is naturally lower, and 2.9% is 2.6 times our portfolio average (1.1%). Best-sellers multiplied, orders a month: avocado and salmon sandwich 35 → 93, buckwheat with chicken 45 → 78, syrniki 46 → 71, cappuccino 78 → 130.',
        'Sarapan dan brunch di Rawai. Menjelang Juni restoran turun mengikuti musim: omzet -25,4%, pesanan -13,8%, rata-rata pesanan -13,5% dibanding Mei. Tidak ada iklan sama sekali. Di bulan Juni pemesan adalah pelanggan lama, sehingga konversi tinggi tetapi audiens sangat kecil. Iklan dan kata kunci mendatangkan lima kali lebih banyak orang yang sebelumnya tidak pernah melihat restoran: pada jangkauan sebesar itu konversi wajar lebih rendah, dan 2,9% adalah 2,6 kali rata-rata portofolio kami (1,1%). Menu terlaris naik berlipat, pesanan per bulan: sandwich alpukat dan salmon 35 → 93, buckwheat dengan ayam 45 → 78, syrniki 46 → 71, cappuccino 78 → 130.',
        'ร้านอาหารเช้าและบรันช์ในราไวย์ ก่อนเดือนมิถุนายนร้านตกลงตามฤดูกาล: รายได้ -25.4% ออร์เดอร์ -13.8% ยอดเฉลี่ยต่อออร์เดอร์ -13.5% เทียบกับพฤษภาคม ไม่มีโฆษณาเลย ในเดือนมิถุนายนคนสั่งคือลูกค้าเดิม คอนเวอร์ชั่นจึงสูงแต่ฐานคนเห็นเล็กมาก โฆษณาและคำค้นพาคนใหม่ที่ไม่เคยเห็นร้านเข้ามามากขึ้น 5 เท่า เมื่อการเข้าถึงกว้างขนาดนี้คอนเวอร์ชั่นย่อมต่ำลง และ 2.9% สูงกว่าค่าเฉลี่ยของร้านที่เราดูแล (1.1%) ถึง 2.6 เท่า เมนูขายดีโตหลายเท่า ออร์เดอร์ต่อเดือน: แซนด์วิชอะโวคาโดแซลมอน 35 → 93 บัควีทกับไก่ 45 → 78 ซีร์นิกี 46 → 71 คาปูชิโน 78 → 130'),
      rows: [
        { m: R.customers, a: '≈338', b: '≈596' },
        { m: R.conv, a: '7.9%', b: l('2.9% (аудитория в 5 раз шире)', '2.9% (audience 5 times wider)', '2,9% (audiens 5 kali lebih luas)', '2.9% (ฐานคนเห็นกว้างขึ้น 5 เท่า)') },
        { m: R.items, a: '86', b: '108' },
        { m: R.adBudget, a: '0', b: l('15 161 THB (3.8% выручки)', 'THB 15,161 (3.8% of revenue)', 'THB 15,161 (3,8% dari omzet)', '15,161 THB (3.8% ของรายได้)') },
        { m: rowAdsRev('THB'), a: '0', b: '329 200' },
        { m: R.delayed, a: '2.21%', b: '2.7%' }, { m: R.offShare, a: '1.73%', b: '0.69%' }, { m: R.cancelShare, a: '0%', b: '0.47%' },
        { m: R.wait, a: l('4 мин 09 с', '4 min 09 s', '4 mnt 09 dtk', '4 นาที 09 วินาที'), b: l('3 мин 49 с', '3 min 49 s', '3 mnt 49 dtk', '3 นาที 49 วินาที') },
      ],
      queries: [{ q: 'breakfast & brunch', v: '34k' }, { q: 'surf point', v: '28k' }, { q: 'breakfast', v: '17k' }, { q: 'โจ๊ก', v: '12k' }, { q: 'syrniki', v: '5k' }],
      queriesNote: l('Продажи идут с 1 236 разных запросов.', 'Sales come from 1,236 different search queries.', 'Penjualan datang dari 1.236 kata pencarian berbeda.', 'ยอดขายมาจากคำค้น 1,236 คำ'),
    },
  },

  /* ============================== .island */
  {
    slug: 'island-phuket', country: 'th', kind: 'launch', name: '.island', logo: '/clients/island-bang-tao.webp',
    place: l('Банг Тао, Пхукет', 'Bang Tao, Phuket', 'Bang Tao, Phuket', 'บางเทา ภูเก็ต'),
    tag: l('новый ресторан', 'a new restaurant', 'restoran baru', 'ร้านเปิดใหม่'),
    headline: l('С нуля до 243 575 THB в месяц за 3 месяца', 'From zero to THB 243,575 a month in 3 months', 'Dari nol ke THB 243,575 per bulan dalam 3 bulan', 'จากศูนย์สู่ 243,575 THB ต่อเดือนใน 3 เดือน'),
    lead: l(
      'Июль → октябрь 2026. Аккаунта в Grab не было: зарегистрировали ресторан, запустили и вывели на результат, в низкий сезон.',
      'July → October 2026. There was no Grab account: we registered the restaurant, launched it and brought it to this result, in low season.',
      'Juli → Oktober 2026. Belum ada akun Grab: kami mendaftarkan restoran, meluncurkannya dan membawanya ke hasil ini, di musim sepi.',
      'กรกฎาคม → ตุลาคม 2026 ร้านยังไม่มีบัญชี Grab เราลงทะเบียน เปิดร้าน และพาไปถึงผลลัพธ์นี้ในช่วงโลว์ซีซัน'),
    kpis: [
      { v: '243k', l: l('THB в октябре', 'THB in October', 'THB di bulan Oktober', 'THB ในเดือนตุลาคม') },
      { v: '337', l: D.ordersMo }, { v: '24×', l: D.adsRoas },
      { v: '4.8', l: l('рейтинг с нуля', 'rating from zero', 'rating dari nol', 'เรตติ้งจากศูนย์') },
    ],
    a: { m: 'jul', y: 2026 }, b: { m: 'oct', y: 2026 },
    pointA: {
      stats: [
        { v: '0 THB', l: l('продаж', 'in sales', 'penjualan', 'ยอดขาย') }, { v: '0', l: l('заказов', 'orders', 'pesanan', 'ออร์เดอร์') },
        { v: '0', l: l('отзывов и оценок', 'reviews and ratings', 'ulasan dan penilaian', 'รีวิวและคะแนน') },
        { v: '0', l: l('людей знали бренд', 'people knew the brand', 'orang mengenal merek ini', 'คนที่รู้จักแบรนด์') },
      ],
      bullets: [
        l('Аккаунта в Grab не было. Документы, регистрацию и настройку магазина взяли на себя, первые продажи пришли 22 июля.', 'There was no Grab account. We handled the documents, registration and store setup; the first sales came on 22 July.', 'Belum ada akun Grab. Dokumen, pendaftaran dan pengaturan toko kami tangani; penjualan pertama masuk pada 22 Juli.', 'ร้านยังไม่มีบัญชี Grab เราดูแลเอกสาร การลงทะเบียน และการตั้งค่าร้านให้ทั้งหมด ยอดขายแรกเข้ามาวันที่ 22 กรกฎาคม'),
        l('Новый бренд, который никто не ищет по названию: ни рейтинга, ни отзывов. Гостей нужно было привести через поиск и рекламу.', 'A new brand nobody searches for by name: no rating, no reviews. Guests had to be brought in through search and ads.', 'Merek baru yang tidak dicari orang berdasarkan nama: tanpa rating, tanpa ulasan. Tamu harus didatangkan lewat pencarian dan iklan.', 'แบรนด์ใหม่ที่ยังไม่มีใครค้นหาด้วยชื่อ ไม่มีเรตติ้ง ไม่มีรีวิว ต้องพาลูกค้าเข้ามาผ่านการค้นหาและโฆษณา'),
        l('Запуск пришёлся на низкий сезон: туристов на острове в 1.6 раза меньше, чем в январе-марте.', 'The launch fell in low season: 1.6 times fewer tourists on the island than in January-March.', 'Peluncuran jatuh di musim sepi: wisatawan di pulau 1,6 kali lebih sedikit dibanding Januari-Maret.', 'เปิดร้านตรงกับโลว์ซีซัน นักท่องเที่ยวบนเกาะน้อยกว่าช่วงมกราคม-มีนาคม 1.6 เท่า'),
      ],
    },
    work: {
      sub: l('Регистрация, карточка, меню, реклама, SEO и рейтинг: вся работа целиком.', 'Registration, listing, menu, ads, SEO and rating: the whole job.', 'Pendaftaran, halaman restoran, menu, iklan, SEO dan rating: seluruh pekerjaan.', 'ลงทะเบียน หน้าร้าน เมนู โฆษณา SEO และเรตติ้ง: งานทั้งหมดครบวงจร'),
      cards: [
        { t: l('Регистрация и запуск', 'Registration and launch', 'Pendaftaran dan peluncuran', 'ลงทะเบียนและเปิดร้าน'), items: [l('Документы и регистрация в Grab', 'Documents and Grab registration', 'Dokumen dan pendaftaran Grab', 'เอกสารและการลงทะเบียน Grab'), l('Настройка магазина и выплат', 'Store and payout setup', 'Pengaturan toko dan pencairan', 'ตั้งค่าร้านและการรับเงิน')], v: l('22 июля', '22 July', '22 Juli', '22 ก.ค.'), l: l('первые продажи', 'first sales', 'penjualan pertama', 'ยอดขายแรก') },
        { t: l('Карточка и меню', 'Listing and menu', 'Halaman restoran dan menu', 'หน้าร้านและเมนู'), items: [l('Фото, описания, категории, допы', 'Photos, descriptions, categories, add-ons', 'Foto, deskripsi, kategori, tambahan', 'รูป คำอธิบาย หมวดหมู่ และตัวเลือกเสริม'), l('Цены по нашей технологии', 'Prices by our method', 'Harga dengan metode kami', 'ราคาตามวิธีของเรา')], v: '83', l: l('позиции в меню', 'menu items', 'menu', 'รายการเมนู') },
        { t: D.seo, items: [l('Ключевые слова в названиях блюд', 'Keywords in dish names', 'Kata kunci di nama menu', 'คำค้นในชื่อเมนู'), l('Выход в поиск по категориям', 'Visibility in category search', 'Muncul di pencarian kategori', 'ติดผลค้นหาตามหมวดหมู่')], v: '×6', l: l('«breakfast & brunch» к поиску по названию', '“breakfast & brunch” vs search by name', '“breakfast & brunch” dibanding pencarian nama', '“breakfast & brunch” เทียบกับการค้นหาชื่อร้าน') },
        { t: l('Реклама с первого месяца', 'Ads from month one', 'Iklan sejak bulan pertama', 'โฆษณาตั้งแต่เดือนแรก'), items: [l('GrabAds по нашей технологии', 'GrabAds run by our method', 'GrabAds dengan metode kami', 'GrabAds ตามวิธีของเรา'), D.forOrders, l('Ежедневный контроль', 'Daily control', 'Kontrol harian', 'ดูแลทุกวัน')], v: '24×', l: D.adsRoas },
        { t: D.ratingOps, items: [l('Жалобы на несправедливые оценки', 'Appeals against unfair ratings', 'Banding atas penilaian tidak adil', 'ยื่นคำร้องเรื่องคะแนนที่ไม่เป็นธรรม'), l('Контроль отмен, задержек, офлайна', 'Cancellation, delay and offline control', 'Kontrol pembatalan, keterlambatan dan offline', 'ควบคุมการยกเลิก ความล่าช้า และออฟไลน์'), l('Мониторинг каждые 5 минут', 'Monitoring every 5 minutes', 'Pemantauan setiap 5 menit', 'ตรวจร้านทุก 5 นาที')], v: '4.8', l: D.rating },
      ],
    },
    bars: [
      { m: 'jun', h: 0, c: 'pre', label: D.none }, { m: 'jul', h: 1.5, c: 'start' }, { m: 'aug', h: 28, c: 'us' }, { m: 'sep', h: 56, c: 'us' }, { m: 'oct', h: 100, c: 'us', label: '243 575' },
    ],
    chartNote: l(
      'В июне ресторана в Grab ещё не было. В середине июля зарегистрировали, 22 июля пришли первые заказы. Август и сентябрь ушли на разгон: реклама, поиск, первые отзывы. Октябрь: 243 575 THB, +80% к сентябрю, и рост продолжается.',
      'In June the restaurant was not on Grab yet. We registered it in mid-July and the first orders came on 22 July. August and September were the ramp-up: ads, search, first reviews. October: THB 243,575, +80% over September, and still growing.',
      'Di bulan Juni restoran belum ada di Grab. Pertengahan Juli kami daftarkan, 22 Juli pesanan pertama masuk. Agustus dan September adalah masa pemanasan: iklan, pencarian, ulasan pertama. Oktober: THB 243,575, +80% dari September, dan masih tumbuh.',
      'เดือนมิถุนายนร้านยังไม่อยู่บน Grab เราลงทะเบียนกลางเดือนกรกฎาคม ออร์เดอร์แรกเข้ามาวันที่ 22 กรกฎาคม สิงหาคมและกันยายนเป็นช่วงเร่งเครื่อง: โฆษณา การค้นหา รีวิวแรก ตุลาคม: 243,575 THB เพิ่มขึ้น 80% จากกันยายน และยังโตต่อ'),
    rows: [
      { m: rowRev('THB'), a: '0', b: '243 575' }, { m: R.orders, a: '0', b: '337' }, { m: rowAov('THB'), a: '-', b: '723' },
      { m: R.saw, a: '0', b: '21 717' }, { m: R.menu, a: '0', b: '1 624' }, { m: R.roas, a: D.none, b: '24×' }, { m: R.rating, a: D.none, b: '4.8' },
      { m: l('Вернувшиеся гости', 'Returning guests', 'Tamu yang kembali', 'ลูกค้าที่กลับมาสั่งซ้ำ'), a: '0', b: '50%' }, { m: rowPayout('THB'), a: '0', b: '160 973' },
    ],
    tableNote: l(
      'Уже на третьем месяце половина гостей вернувшиеся: кухня и сервис держат уровень. С первого заказа ресторан сделал в Grab 450 860 THB и 658 заказов.',
      'By the third month half of the guests are returning ones: the kitchen and service hold their level. Since the first order the restaurant has made THB 450,860 and 658 orders on Grab.',
      'Di bulan ketiga separuh tamu adalah tamu yang kembali: dapur dan layanan menjaga standar. Sejak pesanan pertama restoran mencatat THB 450,860 dan 658 pesanan di Grab.',
      'เพียงเดือนที่สาม ลูกค้าครึ่งหนึ่งคือลูกค้าที่กลับมาสั่งซ้ำ ครัวและบริการรักษามาตรฐานได้ นับจากออร์เดอร์แรกร้านทำยอดบน Grab ได้ 450,860 THB และ 658 ออร์เดอร์'),
    season: {
      title: D.lowSeason,
      tiles: [
        { v: '≈200k', l: l('туристов на острове в июле-октябре против 320-349 тысяч в январе-марте', 'tourists on the island in July-October versus 320-349 thousand in January-March', 'wisatawan di pulau pada Juli-Oktober dibanding 320-349 ribu pada Januari-Maret', 'นักท่องเที่ยวบนเกาะช่วง ก.ค.-ต.ค. เทียบกับ 320,000-349,000 คนช่วง ม.ค.-มี.ค.') },
        { v: '243 575', l: l('THB в октябре на третьем месяце работы', 'THB in October, the third month of work', 'THB di bulan Oktober, bulan ketiga', 'THB ในเดือนตุลาคม ซึ่งเป็นเดือนที่สาม') },
        { v: l('Ноя-Мар', 'Nov-Mar', 'Nov-Mar', 'พ.ย.-มี.ค.'), l: l('впереди высокий сезон: туристов станет в 1.5 раза больше', 'high season ahead: 1.5 times more tourists', 'musim ramai di depan: wisatawan 1,5 kali lebih banyak', 'ไฮซีซันกำลังมา: นักท่องเที่ยวจะมากขึ้น 1.5 เท่า') },
      ],
      text: l(
        'Ресторан стартовал и вырос в самые тихие месяцы года. Результат октября получен без помощи сезона, высокий сезон ещё впереди.',
        'The restaurant launched and grew in the quietest months of the year. The October result came without any help from the season; high season is still ahead.',
        'Restoran diluncurkan dan tumbuh di bulan-bulan paling sepi dalam setahun. Hasil Oktober dicapai tanpa bantuan musim; musim ramai masih di depan.',
        'ร้านเปิดและเติบโตในช่วงเดือนที่เงียบที่สุดของปี ผลของเดือนตุลาคมได้มาโดยไม่มีแรงส่งจากฤดูกาล ไฮซีซันยังรออยู่ข้างหน้า'),
    },
    cta: l(
      'Нет аккаунта в Grab - зарегистрируем и запустим под ключ. Уже есть - бесплатно проверим карточку и покажем, что улучшить.',
      'No Grab account yet? We will register and launch it for you. Already have one? We will check your listing for free and show what to improve.',
      'Belum punya akun Grab? Kami daftarkan dan luncurkan sampai jalan. Sudah punya? Kami cek halaman restoran Anda gratis dan tunjukkan apa yang perlu diperbaiki.',
      'ยังไม่มีบัญชี Grab? เราลงทะเบียนและเปิดร้านให้ครบวงจร มีอยู่แล้ว? เราตรวจหน้าร้านให้ฟรีและบอกว่าควรปรับอะไร'),
    card: { value: '243 575 THB', label: l('в месяц, запуск с нуля', 'a month, launched from zero', 'per bulan, mulai dari nol', 'ต่อเดือน เปิดร้านจากศูนย์'), chips: [l('337 заказов в октябре', '337 orders in October', '337 pesanan di Oktober', '337 ออร์เดอร์ในเดือนตุลาคม'), l('ROAS 24x', 'ROAS 24x', 'ROAS 24x', 'ROAS 24x'), l('за 3 месяца', 'in 3 months', 'dalam 3 bulan', 'ใน 3 เดือน')] },
    badge: { pre: l('с нуля до', 'from zero to', 'dari nol ke', 'จากศูนย์สู่'), value: '243 575 THB', line: l('в месяц за 3 месяца', 'a month in 3 months', 'per bulan dalam 3 bulan', 'ต่อเดือนใน 3 เดือน') },
    details: {
      text: l(
        'Новый ресторан завтраков в Банг Тао. Новый бренд никто не ищет по названию, поэтому мы вывели .island в поиск по категориям: запрос «breakfast & brunch» приносит в 6 раз больше, чем поиск по названию ресторана. Каждый пятый, кто открыл меню, сделал заказ. Рекламу GrabAds запустили сразу после регистрации: у нового ресторана нет органического трафика, его даёт реклама. Заказ из рекламы стоит около 30 THB при среднем чеке 723 THB. За всё время работы: ROAS 22.01×, бюджет 14 836 THB, продажи с рекламы 326 500 THB, 485 заказов. По жалобам удалено 4 негативные оценки.',
        'A new breakfast restaurant in Bang Tao. Nobody searches for a new brand by name, so we got .island into category search: the query “breakfast & brunch” brings in six times more than searches for the restaurant name. One in five people who opened the menu placed an order. GrabAds went live right after registration: a new restaurant has no organic traffic, ads provide it. An order from ads costs about THB 30 against an average order of THB 723. Over the whole period: ROAS 22.01×, budget THB 14,836, ads sales THB 326,500, 485 orders. Four negative ratings were removed on appeal.',
        'Restoran sarapan baru di Bang Tao. Tidak ada yang mencari merek baru berdasarkan nama, jadi kami membawa .island ke pencarian kategori: kata kunci “breakfast & brunch” menghasilkan enam kali lebih banyak daripada pencarian nama restoran. Satu dari lima orang yang membuka menu melakukan pemesanan. GrabAds dijalankan segera setelah pendaftaran: restoran baru tidak punya trafik organik, iklanlah yang memberikannya. Satu pesanan dari iklan berbiaya sekitar THB 30 dengan rata-rata pesanan THB 723. Selama seluruh periode: ROAS 22,01×, anggaran THB 14,836, penjualan dari iklan THB 326,500, 485 pesanan. Empat penilaian negatif dihapus lewat banding.',
        'ร้านอาหารเช้าเปิดใหม่ในบางเทา แบรนด์ใหม่ยังไม่มีใครค้นหาด้วยชื่อ เราจึงพา .island ไปติดผลค้นหาตามหมวดหมู่ คำค้น “breakfast & brunch” ทำยอดได้มากกว่าการค้นหาชื่อร้านถึง 6 เท่า หนึ่งในห้าของคนที่เปิดเมนูสั่งอาหาร เราเปิด GrabAds ทันทีหลังลงทะเบียน เพราะร้านใหม่ยังไม่มีทราฟฟิกธรรมชาติ ต้องอาศัยโฆษณา ออร์เดอร์จากโฆษณามีต้นทุนประมาณ 30 THB ขณะที่ยอดเฉลี่ยต่อออร์เดอร์คือ 723 THB ตลอดช่วงที่ทำงาน: ROAS 22.01× งบ 14,836 THB ยอดขายจากโฆษณา 326,500 THB 485 ออร์เดอร์ คะแนนลบ 4 รายการถูกลบออกหลังยื่นคำร้อง'),
      rows: [
        { m: R.customers, a: '0', b: l('≈334 (20.6% открывших меню)', '≈334 (20.6% of those who opened the menu)', '≈334 (20,6% dari yang membuka menu)', '≈334 (20.6% ของคนที่เปิดเมนู)') },
        { m: R.conv, a: '-', b: l('1.6% (средняя по флоту 1.1%)', '1.6% (portfolio average 1.1%)', '1,6% (rata-rata portofolio 1,1%)', '1.6% (ค่าเฉลี่ยร้านที่เราดูแล 1.1%)') },
        { m: R.adBudget, a: '0', b: l('8 900 THB (3.7% выручки)', 'THB 8,900 (3.7% of revenue)', 'THB 8,900 (3,7% dari omzet)', '8,900 THB (3.7% ของรายได้)') },
        { m: rowAdsRev('THB'), a: '0', b: '213 840' },
        { m: R.delayed, a: '-', b: '0%' }, { m: R.cancelShare, a: '-', b: '0.61%' }, { m: R.offShare, a: '-', b: '6.89%' },
      ],
      queries: [{ q: 'breakfast & brunch', v: '59k' }, { q: 'breakfast', v: '12k' }, { q: 'island', v: '6k' }, { q: '.island', v: '4k' }, { q: 'oatmeal', v: '3k' }],
      queriesNote: l('Продажи идут с 714 разных запросов.', 'Sales come from 714 different search queries.', 'Penjualan datang dari 714 kata pencarian berbeda.', 'ยอดขายมาจากคำค้น 714 คำ'),
    },
  },

  /* ============================== USSR */
  {
    slug: 'ussr-phuket', country: 'th', kind: 'growth', name: 'USSR Phuket', logo: '/clients/ussr-patong.webp',
    place: l('Патонг, Пхукет', 'Patong, Phuket', 'Patong, Phuket', 'ป่าตอง ภูเก็ต'),
    headline: l('Оживили ресторан: выручка ×3.8 за 2 месяца', 'Brought the restaurant back to life: revenue ×3.8 in 2 months', 'Menghidupkan kembali restoran: omzet ×3.8 dalam 2 bulan', 'ปลุกร้านให้กลับมา: รายได้ ×3.8 ใน 2 เดือน'),
    lead: l('Март → май 2026. Работаем с апреля 2026.', 'March → May 2026. Working together since April 2026.', 'Maret → Mei 2026. Bekerja sama sejak April 2026.', 'มีนาคม → พฤษภาคม 2026 ทำงานร่วมกันตั้งแต่เมษายน 2026'),
    kpis: [{ v: 'x3.8', l: D.revenue }, { v: 'x7.4', l: D.orders }, { v: '24×', l: D.adsRoas }, { v: '4.8', l: was('4.5') }],
    a: { m: 'mar', y: 2026 }, b: { m: 'may', y: 2026 },
    pointA: {
      stats: [
        { v: '12 240 THB', l: D.salesMo }, { v: '8', l: D.ordersMo },
        { v: l('66 ч', '66 h', '66 jam', '66 ชม.'), l: l('офлайна в месяц', 'offline a month', 'offline per bulan', 'ออฟไลน์ต่อเดือน'), warn: true },
        { v: '0 THB', l: D.onAds },
      ],
      bullets: [
        l('Ресторан подолгу был закрыт для алгоритма и гостей: 66 часов офлайна в месяц.', 'The restaurant was closed to the algorithm and to guests for long stretches: 66 hours offline a month.', 'Restoran sering tertutup bagi algoritma dan tamu: 66 jam offline per bulan.', 'ร้านปิดต่ออัลกอริทึมและลูกค้าเป็นเวลานาน: ออฟไลน์ 66 ชั่วโมงต่อเดือน'),
        l('Рекламы не было, ключевые слова не прорабатывались.', 'No ads, and no keyword work.', 'Tanpa iklan, kata kunci tidak digarap.', 'ไม่มีโฆษณา และไม่ได้ทำคำค้น'),
        l('Рейтинг 4.5 при малом числе отзывов.', 'Rating 4.5 with few reviews.', 'Rating 4.5 dengan sedikit ulasan.', 'เรตติ้ง 4.5 และรีวิวน้อย'),
      ],
    },
    work: {
      cards: [
        { t: l('Операционное оживление', 'Operational revival', 'Membenahi operasional', 'ฟื้นงานปฏิบัติการ'), items: [l('Сократили офлайн до нуля, наладили часы работы', 'Cut offline time to zero, fixed opening hours', 'Offline ditekan ke nol, jam buka dibenahi', 'ลดออฟไลน์เหลือศูนย์ จัดเวลาเปิดร้านให้เข้าที่'), l('Контроль закрытий и стоп-листов', 'Closure and stock-out control', 'Kontrol penutupan dan stok habis', 'ควบคุมการปิดร้านและเมนูหมด'), D.staff], v: l('0 ч', '0 h', '0 jam', '0 ชม.'), l: l('офлайна', 'offline', 'offline', 'ออฟไลน์') },
        { t: D.seo, items: [l('Аудит названия и описания', 'Name and description audit', 'Audit nama dan deskripsi', 'ตรวจชื่อและคำอธิบายร้าน'), l('Карта ключей Пхукета и Патонга', 'Phuket and Patong keyword map', 'Peta kata kunci Phuket dan Patong', 'แผนคำค้นภูเก็ตและป่าตอง'), l('Ключи в меню', 'Keywords in the menu', 'Kata kunci di menu', 'คำค้นในเมนู')], v: '0 → 7 481', l: l('показов в поиске в месяц', 'search impressions a month', 'impresi pencarian per bulan', 'การแสดงผลในการค้นหาต่อเดือน') },
        { t: l('Запуск рекламы', 'Ads launch', 'Peluncuran iklan', 'เปิดโฆษณา'), items: [l('GrabAds с нуля', 'GrabAds from scratch', 'GrabAds dari nol', 'GrabAds เริ่มจากศูนย์'), l('Ручной контроль стоимости заказа', 'Manual control of cost per order', 'Kontrol manual biaya per pesanan', 'คุมต้นทุนต่อออร์เดอร์เอง'), l('Бюджет 0 → 1 316 THB в месяц', 'Budget 0 → THB 1,316 a month', 'Anggaran 0 → THB 1,316 per bulan', 'งบ 0 → 1,316 THB ต่อเดือน')], v: '24×', l: D.peakRoas },
        { t: l('Аналитика и рейтинг', 'Analytics and rating', 'Analitik dan rating', 'ข้อมูลและเรตติ้ง'), items: [D.weekly, D.abTests, l('Контроль воронки', 'Funnel control', 'Kontrol funnel', 'ติดตามเส้นทางการสั่ง')], v: '4.5 → 4.8', l: D.rating },
      ],
    },
    bars: [{ m: 'mar', h: 26, c: 'a', label: '12 240' }, { m: 'apr', h: 26, c: 'start' }, { m: 'may', h: 100, c: 'us', label: '46 710' }],
    rows: [
      { m: rowRev('THB'), a: '12 240', b: '46 710' }, { m: rowPayout('THB'), a: '9 440', b: '36 810' }, { m: R.orders, a: '8', b: '59' }, { m: R.rating, a: '4.5', b: '4.8' },
      { m: R.offline, a: l('66 ч в месяц', '66 h a month', '66 jam per bulan', '66 ชม. ต่อเดือน'), b: '0' }, { m: R.search, a: '0', b: '7 481' },
      { m: l('Новые клиенты', 'New customers', 'Pelanggan baru', 'ลูกค้าใหม่'), a: '-', b: l('32 в месяц', '32 a month', '32 per bulan', '32 ต่อเดือน') }, { m: R.roas, a: D.none, b: '24×' },
    ],
    card: { value: 'x3.8', label: D.onGrab, chips: [l('заказы x7.4', 'orders x7.4', 'pesanan x7.4', 'ออร์เดอร์ x7.4'), l('ROAS 24x', 'ROAS 24x', 'ROAS 24x', 'ROAS 24x'), l('за 2 месяца', 'in 2 months', 'dalam 2 bulan', 'ใน 2 เดือน')] },
    badge: { value: 'x3.8', line: l('выручки за 2 мес.', 'revenue in 2 months', 'omzet dalam 2 bulan', 'รายได้ใน 2 เดือน'), bars: true },    oldNote: l('В этом разборе суммы даны по выплатам ресторану, после комиссии Grab: 9 440 → 36 810 THB в месяц, рост x3.9.', 'In this write-up the amounts are payouts to the restaurant, after Grab commission: THB 9,440 → 36,810 a month, growth x3.9.', 'Dalam ulasan ini angka adalah pencairan ke restoran, setelah komisi Grab: THB 9,440 → 36,810 per bulan, naik x3.9.', 'ตัวเลขในบทสรุปนี้คือยอดเงินโอนให้ร้านหลังหักค่าคอมมิชชัน Grab: 9,440 → 36,810 THB ต่อเดือน เติบโต x3.9'),
  },

  /* ============================== Enjoy Healthy Food */
  {
    slug: 'enjoy-healthy-food', country: 'th', kind: 'growth', name: 'Enjoy Healthy Food', logo: '/clients/enjoy-healthy-food.webp',
    place: l('Пхукет', 'Phuket', 'Phuket', 'ภูเก็ต'),
    headline: l('Выручка ×9.4: от 20 тысяч до 190 тысяч THB в месяц', 'Revenue ×9.4: from 20 thousand to 190 thousand THB a month', 'Omzet ×9.4: dari 20 ribu ke 190 ribu THB per bulan', 'รายได้ ×9.4: จาก 20,000 สู่ 190,000 THB ต่อเดือน'),
    lead: l('Январь 2025 → январь 2026. Работаем с середины августа 2025.', 'January 2025 → January 2026. Working together since mid-August 2025.', 'Januari 2025 → Januari 2026. Bekerja sama sejak pertengahan Agustus 2025.', 'มกราคม 2025 → มกราคม 2026 ทำงานร่วมกันตั้งแต่กลางเดือนสิงหาคม 2025'),
    kpis: [{ v: 'x9.4', l: D.revenue }, { v: 'x4.6', l: D.orders }, { v: '27.5×', l: D.peakRoas }, { v: '5.0', l: D.rating }],
    a: { m: 'jan', y: 2025 }, b: { m: 'jan', y: 2026 },
    pointA: {
      stats: [
        { v: '20 270 THB', l: l('продаж в январе 2025', 'in sales in January 2025', 'penjualan di Januari 2025', 'ยอดขายเดือนมกราคม 2025') },
        { v: '34', l: l('заказа в месяц', 'orders a month', 'pesanan per bulan', 'ออร์เดอร์ต่อเดือน') },
        { v: '73%', l: l('офлайн', 'offline', 'offline', 'ออฟไลน์'), warn: true }, { v: '0 THB', l: D.onAds },
      ],
      bullets: [
        l('До нас, январь-июль 2025: в среднем около 13 300 THB и 30 заказов в месяц. Январь 2025 не был случайно слабым месяцем.', 'Before us, January-July 2025: about THB 13,300 and 30 orders a month on average. January 2025 was not an unusually weak month.', 'Sebelum kami, Januari-Juli 2025: rata-rata sekitar THB 13,300 dan 30 pesanan per bulan. Januari 2025 bukan bulan yang kebetulan lemah.', 'ก่อนมีเรา มกราคม-กรกฎาคม 2025: เฉลี่ยประมาณ 13,300 THB และ 30 ออร์เดอร์ต่อเดือน มกราคม 2025 ไม่ใช่เดือนที่อ่อนโดยบังเอิญ'),
        l('Ресторан почти не было видно в GrabFood: офлайн до 73%, отмены до 7.5%.', 'The restaurant was barely visible on GrabFood: up to 73% offline, cancellations up to 7.5%.', 'Restoran nyaris tidak terlihat di GrabFood: offline hingga 73%, pembatalan hingga 7,5%.', 'ร้านแทบไม่ปรากฏบน GrabFood: ออฟไลน์สูงถึง 73% การยกเลิกสูงถึง 7.5%'),
        l('Рекламы не было, ключевые слова и структура меню не прорабатывались.', 'No ads; keywords and menu structure were never worked on.', 'Tanpa iklan; kata kunci dan struktur menu tidak digarap.', 'ไม่มีโฆษณา และไม่ได้ทำคำค้นหรือโครงสร้างเมนู'),
        l('Курьер ждал заказ до 437 секунд.', 'Drivers waited up to 437 seconds for an order.', 'Kurir menunggu pesanan hingga 437 detik.', 'ไรเดอร์รอออร์เดอร์นานถึง 437 วินาที'),
      ],
    },
    work: {
      cards: [
        { t: D.seo, items: [l('Название и описание', 'Name and description', 'Nama dan deskripsi', 'ชื่อและคำอธิบายร้าน'), l('Карта ключей Пхукета', 'Phuket keyword map', 'Peta kata kunci Phuket', 'แผนคำค้นภูเก็ต'), l('Популярные запросы в меню, структура категорий', 'Popular queries in the menu, category structure', 'Kata kunci populer di menu, struktur kategori', 'คำค้นยอดนิยมในเมนู และโครงสร้างหมวดหมู่')], v: 'x3.6', l: l('показов в поиске', 'search impressions', 'impresi pencarian', 'การแสดงผลในการค้นหา') },
        { t: D.ads, items: [l('GrabAds с нуля', 'GrabAds from scratch', 'GrabAds dari nol', 'GrabAds เริ่มจากศูนย์'), l('Сегментированная структура кампаний', 'Segmented campaign structure', 'Struktur kampanye tersegmentasi', 'โครงสร้างแคมเปญแบบแบ่งกลุ่ม'), l('Бюджет 62 → 5 635 THB в месяц', 'Budget THB 62 → 5,635 a month', 'Anggaran THB 62 → 5,635 per bulan', 'งบ 62 → 5,635 THB ต่อเดือน')], v: '27.5×', l: D.peakRoas },
        { t: l('Меню и операционка', 'Menu and operations', 'Menu dan operasional', 'เมนูและงานปฏิบัติการ'), items: [l('Аудит меню и фото', 'Menu and photo audit', 'Audit menu dan foto', 'ตรวจเมนูและรูป'), l('Офлайн 73% → 0%', 'Offline 73% → 0%', 'Offline 73% → 0%', 'ออฟไลน์ 73% → 0%'), l('Ожидание курьера 437 → 135 с, отмены 0', 'Driver wait 437 → 135 s, zero cancellations', 'Tunggu kurir 437 → 135 dtk, pembatalan nol', 'เวลารอไรเดอร์ 437 → 135 วินาที ยกเลิกเป็นศูนย์')], v: '0%', l: l('офлайн и отмены', 'offline and cancellations', 'offline dan pembatalan', 'ออฟไลน์และการยกเลิก') },
        { t: l('Аналитика и контроль', 'Analytics and control', 'Analitik dan kontrol', 'ข้อมูลและการควบคุม'), items: [D.weekly, D.abTests, l('Механики повторных заказов', 'Repeat-order mechanics', 'Mekanisme pesanan ulang', 'กลไกกระตุ้นการสั่งซ้ำ')], v: '5.0', l: D.rating },
      ],
    },
    bars: [
      { m: 'jan', h: 10.7, c: 'a', label: '20 270' }, { m: 'feb', h: 8.5, c: 'pre' }, { m: 'mar', h: 7.5, c: 'pre' }, { m: 'apr', h: 3.7, c: 'pre' }, { m: 'may', h: 11.2, c: 'pre' }, { m: 'jun', h: 3.7, c: 'pre' }, { m: 'jul', h: 3.6, c: 'pre' },
      { m: 'aug', h: 7.8, c: 'start' }, { m: 'sep', h: 17.5, c: 'us' }, { m: 'oct', h: 26.4, c: 'us' }, { m: 'nov', h: 27.2, c: 'us' }, { m: 'dec', h: 70.4, c: 'us' }, { m: 'jan', h: 100, c: 'us', label: '190 263' },
    ],
    rows: [
      { m: rowRev('THB'), a: '20 270', b: '190 263' }, { m: R.orders, a: '34', b: '167' }, { m: R.offline, a: '73%', b: '0%' },
      { m: R.cancels, a: l('до 7.5%', 'up to 7.5%', 'hingga 7,5%', 'สูงสุด 7.5%'), b: '0%' }, { m: R.wait, a: l('437 с', '437 s', '437 dtk', '437 วินาที'), b: l('135 с', '135 s', '135 dtk', '135 วินาที') },
      { m: R.search, a: '7 038', b: '25 543' }, { m: R.roas, a: D.none, b: '27.5×' },
    ],
    card: { value: 'x9.4', label: D.onGrab, chips: [l('заказы x4.6', 'orders x4.6', 'pesanan x4.6', 'ออร์เดอร์ x4.6'), l('ROAS 27.5x', 'ROAS 27.5x', 'ROAS 27.5x', 'ROAS 27.5x'), l('за 5 месяцев с нами', 'in 5 months with us', 'dalam 5 bulan bersama kami', 'ใน 5 เดือนกับเรา')] },
    badge: { value: 'x9.4', line: l('выручки за 5 мес.', 'revenue in 5 months', 'omzet dalam 5 bulan', 'รายได้ใน 5 เดือน'), bars: true },
  },

  /* ============================== Etna */
  {
    slug: 'etna-phuket', country: 'th', kind: 'growth', name: 'Etna', logo: '/clients/etna-bang-tao.webp',
    place: l('Банг Тао, Пхукет', 'Bang Tao, Phuket', 'Bang Tao, Phuket', 'บางเทา ภูเก็ต'),
    headline: l('Заказы ×2.2, когда трафик падал', 'Orders ×2.2 while traffic was falling', 'Pesanan ×2.2 saat trafik menurun', 'ออร์เดอร์ ×2.2 ในช่วงที่ทราฟฟิกลดลง'),
    lead: l('Май → июль 2026, 2 месяца работы.', 'May → July 2026, 2 months of work.', 'Mei → Juli 2026, 2 bulan kerja.', 'พฤษภาคม → กรกฎาคม 2026 ทำงาน 2 เดือน'),
    kpis: [{ v: '+87%', l: D.revenue }, { v: 'x2.2', l: D.orders }, { v: '34.6×', l: D.adsRoas }, { v: '4.8', l: was('4.6') }],
    a: { m: 'may', y: 2026 }, b: { m: 'jul', y: 2026 },
    pointA: {
      stats: [
        { v: '236 975 THB', l: D.salesMo }, { v: '190', l: D.ordersMo }, { v: '0.5%', l: D.conv, warn: true },
        { v: '2.8%', l: l('CTR рекламы', 'ads CTR', 'CTR iklan', 'CTR โฆษณา') },
      ],
      bullets: [
        l('Выручка падала на 21.7%, заказы на 17.7%.', 'Revenue was down 21.7%, orders down 17.7%.', 'Omzet turun 21,7%, pesanan turun 17,7%.', 'รายได้ลดลง 21.7% ออร์เดอร์ลดลง 17.7%'),
        l('Ресторан видели 39 211 человек в месяц, а заказали 182: конверсия 0.5% при средней по нашему флоту 0.9%.', '39,211 people a month saw the restaurant and 182 ordered: 0.5% conversion against our portfolio average of 0.9%.', '39.211 orang per bulan melihat restoran dan 182 memesan: konversi 0,5% dibanding rata-rata portofolio kami 0,9%.', 'มีคนเห็นร้าน 39,211 คนต่อเดือน แต่สั่งเพียง 182 คน: คอนเวอร์ชั่น 0.5% ขณะที่ค่าเฉลี่ยของร้านที่เราดูแลคือ 0.9%'),
        l('Меню открывали только 5.2% увидевших.', 'Only 5.2% of those who saw it opened the menu.', 'Hanya 5,2% dari yang melihat membuka menu.', 'มีเพียง 5.2% ของคนที่เห็นแล้วเปิดเมนู'),
      ],
    },
    work: {
      cards: [
        { t: D.ads, items: [D.manualCpo, l('Ежедневное управление', 'Daily management', 'Pengelolaan harian', 'บริหารทุกวัน'), l('Бюджет +50%, выручка с рекламы ×3.4', 'Budget +50%, ads revenue ×3.4', 'Anggaran +50%, omzet dari iklan ×3.4', 'งบ +50% รายได้จากโฆษณา ×3.4')], v: '34.6×', l: 'ROAS' },
        { t: D.seo, items: [l('Карта ключей Пхукета и Банг Тао', 'Phuket and Bang Tao keyword map', 'Peta kata kunci Phuket dan Bang Tao', 'แผนคำค้นภูเก็ตและบางเทา'), D.keysNames, D.newCats], v: '2.8 → 5.6%', l: 'CTR' },
        { t: l('Конверсия воронки', 'Funnel conversion', 'Konversi funnel', 'คอนเวอร์ชั่นตลอดเส้นทาง'), items: [l('Обложка и первый экран', 'Cover and first screen', 'Sampul dan layar pertama', 'ภาพปกและหน้าจอแรก'), l('Подача меню', 'Menu presentation', 'Penyajian menu', 'การจัดวางเมนู'), l('Меню → заказ: 9.0 → 19.7%', 'Menu → order: 9.0 → 19.7%', 'Menu → pesanan: 9,0 → 19,7%', 'เมนู → ออร์เดอร์: 9.0 → 19.7%')], v: '0.5 → 1.9%', l: D.conv },
        { t: D.ratingOps, items: [l('Ежедневный мониторинг отзывов', 'Daily review monitoring', 'Pemantauan ulasan harian', 'ติดตามรีวิวทุกวัน'), D.staff, D.offStop], v: '4.6 → 4.8', l: D.rating },
      ],
    },
    bars: [{ m: 'may', h: 53.4, c: 'a', label: '236 975' }, { m: 'jun', h: 59.5, c: 'us' }, { m: 'jul', h: 100, c: 'us', label: '443 861' }],
    rows: [
      { m: rowRev('THB'), a: '236 975', b: '443 861' }, { m: R.orders, a: '190', b: '411' }, { m: R.conv, a: '0.5%', b: '1.9%' }, { m: R.menuOrder, a: '9.0%', b: '19.7%' },
      { m: R.roas, a: '14.75×', b: '34.57×' }, { m: rowAdsRev('THB'), a: '124 000', b: '421 000' }, { m: R.rating, a: '4.6', b: '4.8' },
      { m: R.reach, a: '39 211', b: l('21 330 (-46%, сезон)', '21 330 (-46%, season)', '21 330 (-46%, musim)', '21 330 (-46% ตามฤดูกาล)') },
    ],
    season: {
      title: D.lowSeason,
      tiles: [
        { v: '-46%', l: l('охват: туристов меньше', 'reach: fewer tourists', 'jangkauan: wisatawan lebih sedikit', 'การเข้าถึง: นักท่องเที่ยวน้อยลง'), warn: true },
        { v: 'x2.2', l: D.orders }, { v: '+87%', l: D.revenue },
      ],
    },
    card: { value: '+87%', label: D.onGrab, chips: [l('заказы x2.2', 'orders x2.2', 'pesanan x2.2', 'ออร์เดอร์ x2.2'), l('ROAS 34.6x', 'ROAS 34.6x', 'ROAS 34.6x', 'ROAS 34.6x'), l('за 2 месяца в низкий сезон', 'in 2 months, in low season', 'dalam 2 bulan di musim sepi', 'ใน 2 เดือนช่วงโลว์ซีซัน')] },
    badge: { value: '+87%', line: l('выручки за 2 мес.', 'revenue in 2 months', 'omzet dalam 2 bulan', 'รายได้ใน 2 เดือน'), bars: true },
  },

  /* ============================== Meat Point */
  {
    slug: 'meat-point-phuket', country: 'th', kind: 'growth', name: 'Meat Point', logo: '/clients/meat-point-rawai.webp',
    place: l('Раваи, Пхукет', 'Rawai, Phuket', 'Rawai, Phuket', 'ราไวย์ ภูเก็ต'),
    headline: l('Выручка +46% в низкий сезон', 'Revenue +46% in low season', 'Omzet +46% di musim sepi', 'รายได้ +46% ในโลว์ซีซัน'),
    lead: l('Апрель → июль 2026, 4 месяца работы.', 'April → July 2026, 4 months of work.', 'April → Juli 2026, 4 bulan kerja.', 'เมษายน → กรกฎาคม 2026 ทำงาน 4 เดือน'),
    kpis: [{ v: '+46%', l: D.revenue }, { v: '+22%', l: D.aov }, { v: '30×', l: D.adsRoas }, { v: '4.8', l: was('4.6') }],
    a: { m: 'apr', y: 2026 }, b: { m: 'jul', y: 2026 },
    pointA: {
      stats: [{ v: '215 880 THB', l: D.salesMo }, { v: '275', l: D.ordersMo }, { v: '785 THB', l: D.aov }, { v: '4.6', l: D.rating, warn: true }],
      bullets: [
        l('Реклама окупалась в 30 раз, но бюджет был всего 3.2% от выручки.', 'Ads were paying back 30 times over, but the budget was only 3.2% of revenue.', 'Iklan balik modal 30 kali, tetapi anggarannya hanya 3,2% dari omzet.', 'โฆษณาคืนทุน 30 เท่า แต่งบมีเพียง 3.2% ของรายได้'),
        l('Автоставки урезали показы.', 'Auto-bidding was cutting impressions.', 'Bid otomatis memangkas impresi.', 'บิดอัตโนมัติทำให้ยอดแสดงผลลดลง'),
        l('Рейтинг 4.6: ниже порога 4.8, после которого Grab даёт больше показов и дешевле рекламу.', 'Rating 4.6: below the 4.8 threshold above which Grab gives more impressions and cheaper ads.', 'Rating 4.6: di bawah ambang 4.8, di mana Grab memberi lebih banyak impresi dan iklan lebih murah.', 'เรตติ้ง 4.6: ต่ำกว่าเกณฑ์ 4.8 ซึ่งเป็นระดับที่ Grab ให้ยอดแสดงผลมากขึ้นและค่าโฆษณาถูกลง'),
        l('К июлю рестораны Пхукета обычно теряют 20-40% выручки.', 'By July, Phuket restaurants usually lose 20-40% of revenue.', 'Menjelang Juli restoran di Phuket biasanya kehilangan 20-40% omzet.', 'ถึงเดือนกรกฎาคม ร้านอาหารในภูเก็ตมักเสียรายได้ 20-40%'),
      ],
    },
    work: {
      cards: [
        { t: D.ads, items: [D.manualCpo, l('Настройки под заказы, а не под показы', 'Settings tuned for orders, not impressions', 'Pengaturan untuk pesanan, bukan impresi', 'ตั้งค่าเพื่อออร์เดอร์ ไม่ใช่ยอดแสดงผล'), l('Бюджет увеличили, окупаемость 30×', 'Budget raised, payback held at 30×', 'Anggaran dinaikkan, balik modal tetap 30×', 'เพิ่มงบ และยังคืนทุน 30 เท่า')], v: '30×', l: 'ROAS' },
        { t: D.seo, items: [l('Карта ключей Пхукета и Раваи', 'Phuket and Rawai keyword map', 'Peta kata kunci Phuket dan Rawai', 'แผนคำค้นภูเก็ตและราไวย์'), D.keysNames, D.newCats], v: 'x2.4', l: D.reach },
        { t: l('Рейтинг и отзывы', 'Rating and reviews', 'Rating dan ulasan', 'เรตติ้งและรีวิว'), items: [l('Ежедневный мониторинг', 'Daily monitoring', 'Pemantauan harian', 'ติดตามทุกวัน'), l('Разбор каждого негативного отзыва', 'Every negative review worked through', 'Setiap ulasan negatif ditangani', 'จัดการรีวิวลบทุกรายการ'), l('Ноль инцидентов', 'Zero incidents', 'Nol insiden', 'ไม่มีเหตุผิดพลาด')], v: '4.6 → 4.8', l: D.rating },
        { t: l('Команда и аналитика', 'Team and analytics', 'Tim dan analitik', 'ทีมและข้อมูล'), items: [D.staff, D.offStop, l('Еженедельные отчёты, алерты на падения', 'Weekly reports, alerts on drops', 'Laporan mingguan, peringatan saat turun', 'รายงานรายสัปดาห์ และแจ้งเตือนเมื่อยอดตก')], v: '+22%', l: D.aov },
      ],
    },
    bars: [{ m: 'apr', h: 68.5, c: 'a', label: '215 880' }, { m: 'may', h: 73.9, c: 'us' }, { m: 'jun', h: 77.4, c: 'us' }, { m: 'jul', h: 100, c: 'us', label: '315 250' }],
    rows: [
      { m: rowRev('THB'), a: '215 880', b: '315 250' }, { m: R.orders, a: '275', b: '328' }, { m: rowAov('THB'), a: '785', b: '961' }, { m: R.rating, a: '4.6', b: '4.8' },
      { m: l('Охват (уникальные клиенты)', 'Reach (unique customers)', 'Jangkauan (pelanggan unik)', 'การเข้าถึง (ลูกค้าไม่ซ้ำ)'), a: '7 760', b: '18 473' }, { m: rowAdsRev('THB'), a: '205 140', b: '274 070' },
    ],
    season: {
      title: D.lowSeason,
      tiles: [
        { v: '-20...-40%', l: l('обычно теряют рестораны Пхукета к июлю', 'what Phuket restaurants usually lose by July', 'yang biasanya hilang dari restoran Phuket menjelang Juli', 'ที่ร้านในภูเก็ตมักเสียไปเมื่อถึงเดือนกรกฎาคม'), warn: true },
        { v: '+46%', l: l('наш результат', 'our result', 'hasil kami', 'ผลของเรา') },
        { v: '≈2×', l: l('разница с рынком', 'the gap to the market', 'selisih dengan pasar', 'ส่วนต่างจากตลาด') },
      ],
    },
    card: { value: '+46%', label: D.onGrab, chips: [l('чек +22%', 'average order +22%', 'rata-rata pesanan +22%', 'ยอดเฉลี่ย +22%'), l('ROAS 30x', 'ROAS 30x', 'ROAS 30x', 'ROAS 30x'), l('рост в низкий сезон', 'growth in low season', 'tumbuh di musim sepi', 'เติบโตในโลว์ซีซัน')] },
    badge: { value: '+46%', line: l('выручки в низкий сезон', 'revenue in low season', 'omzet di musim sepi', 'รายได้ในโลว์ซีซัน'), bars: true },
  },

  /* ============================== Zaytun */
  {
    slug: 'zaytun-ubud', country: 'id', kind: 'growth', name: 'Zaytun', logo: '/clients/zaytun-ubud.webp',
    place: l('Убуд, Бали', 'Ubud, Bali', 'Ubud, Bali', 'อูบุด บาหลี'),
    headline: l('Выручка ×2.6 и реклама Gojek из убытка в прибыль', 'Revenue ×2.6 and Gojek ads turned from loss to profit', 'Omzet ×2.6 dan iklan Gojek dari rugi menjadi untung', 'รายได้ ×2.6 และโฆษณา Gojek จากขาดทุนเป็นกำไร'),
    lead: l('Январь → июль 2026. Работаем с февраля 2026.', 'January → July 2026. Working together since February 2026.', 'Januari → Juli 2026. Bekerja sama sejak Februari 2026.', 'มกราคม → กรกฎาคม 2026 ทำงานร่วมกันตั้งแต่กุมภาพันธ์ 2026'),
    kpis: [
      { v: 'x2.6', l: D.revenue }, { v: 'x2.1', l: D.orders },
      { v: 'x62', l: l('окупаемость рекламы Gojek', 'Gojek ads payback', 'balik modal iklan Gojek', 'ผลตอบแทนโฆษณา Gojek') }, { v: '4.8', l: was('4.67') },
    ],
    a: { m: 'jan', y: 2026 }, b: { m: 'jul', y: 2026 },
    pointA: {
      stats: [
        { v: l('166.6 млн Rp', 'IDR 166.6M', 'Rp166,6 juta', '166.6 ล้านรูเปียห์'), l: D.salesMo },
        { v: '603', l: l('заказа в месяц', 'orders a month', 'pesanan per bulan', 'ออร์เดอร์ต่อเดือน') },
        { v: '0.25×', l: l('ROAS Gojek, в убыток', 'Gojek ROAS, at a loss', 'ROAS Gojek, merugi', 'ROAS ของ Gojek ขาดทุน'), warn: true }, { v: '4.67', l: D.rating },
      ],
      bullets: [
        l('Реклама Gojek работала в убыток: потратили 3.1 млн Rp, вернулось 763 тыс. Минус 2.3 млн в месяц, и этого никто не замечал.', 'Gojek ads ran at a loss: IDR 3.1M spent, IDR 763K returned. Minus IDR 2.3M a month, and nobody noticed.', 'Iklan Gojek merugi: Rp3,1 juta dibelanjakan, Rp763 ribu kembali. Minus Rp2,3 juta per bulan, dan tidak ada yang menyadarinya.', 'โฆษณา Gojek ขาดทุน: ใช้ไป 3.1 ล้านรูเปียห์ ได้กลับมา 763,000 ติดลบ 2.3 ล้านต่อเดือน โดยไม่มีใครสังเกต'),
        l('Меню «оптимизировали» до нас: без ключевых слов, структура не учитывала спрос, допы не поднимали чек.', 'The menu had been “optimized” before us: no keywords, a structure that ignored demand, add-ons that did not lift the average order.', 'Menu sudah “dioptimalkan” sebelum kami: tanpa kata kunci, struktur tidak mengikuti permintaan, tambahan tidak menaikkan nilai pesanan.', 'เมนูเคยถูก “ปรับ” มาก่อนเรา: ไม่มีคำค้น โครงสร้างไม่ตามความต้องการ และตัวเลือกเสริมไม่ช่วยเพิ่มยอดต่อออร์เดอร์'),
        l('Рейтинг 4.67: ниже порога 4.8.', 'Rating 4.67: below the 4.8 threshold.', 'Rating 4.67: di bawah ambang 4.8.', 'เรตติ้ง 4.67: ต่ำกว่าเกณฑ์ 4.8'),
      ],
    },
    work: {
      cards: [
        { t: l('Перестройка рекламы', 'Rebuilding the ads', 'Membangun ulang iklan', 'รื้อระบบโฆษณา'), items: [D.manualCpo, l('Кампании GoFood пересобрали: ROAS 0.25 → 15.52', 'GoFood campaigns rebuilt: ROAS 0.25 → 15.52', 'Kampanye GoFood dibangun ulang: ROAS 0,25 → 15,52', 'จัดแคมเปญ GoFood ใหม่: ROAS 0.25 → 15.52'), l('GrabAds: ROAS 14.02 → 21.19, выручка с рекламы ×3', 'GrabAds: ROAS 14.02 → 21.19, ads revenue ×3', 'GrabAds: ROAS 14,02 → 21,19, omzet dari iklan ×3', 'GrabAds: ROAS 14.02 → 21.19 รายได้จากโฆษณา ×3')], v: '20.1×', l: l('общий ROAS', 'overall ROAS', 'ROAS keseluruhan', 'ROAS รวม') },
        { t: D.seo, items: [l('Карта ключей по Убуду', 'Ubud keyword map', 'Peta kata kunci Ubud', 'แผนคำค้นอูบุด'), D.keysNames, D.newCats], v: 'x1.84', l: D.reach },
        { t: D.menuPrices, items: [l('Аудит прошлой «оптимизации»', 'Audit of the earlier “optimization”', 'Audit “optimasi” sebelumnya', 'ตรวจ “การปรับ” ครั้งก่อน'), l('Новые позиции, комбо и допы', 'New items, combos and add-ons', 'Menu baru, combo dan tambahan', 'เมนูใหม่ คอมโบ และตัวเลือกเสริม'), D.ourTech], v: '+24.5%', l: D.aov },
        { t: D.ratingOps, items: [D.bothPlatforms, l('Ответ на каждый негативный отзыв', 'A reply to every negative review', 'Balasan untuk setiap ulasan negatif', 'ตอบรีวิวลบทุกรายการ'), D.offStop], v: '4.67 → 4.8', l: D.rating },
      ],
    },
    bars: [
      { m: 'jan', h: 37.7, c: 'a', label: l('166.6 млн', '166.6M', '166,6 jt', '166.6 ล้าน') }, { m: 'feb', h: 45.5, c: 'start' }, { m: 'mar', h: 37.3, c: 'us' }, { m: 'apr', h: 70.7, c: 'us' },
      { m: 'may', h: 93, c: 'us' }, { m: 'jun', h: 90.5, c: 'us' }, { m: 'jul', h: 100, c: 'us', label: l('440.1 млн', '440.1M', '440,1 jt', '440.1 ล้าน') },
    ],
    rows: [
      { m: rowRev('Rp'), a: '166 615 600', b: '440 134 400' }, { m: R.orders, a: '603', b: '1 279' }, { m: rowAov('Rp'), a: '276 311', b: '344 124' },
      { m: l('ROAS рекламы GoFood', 'GoFood ads ROAS', 'ROAS iklan GoFood', 'ROAS โฆษณา GoFood'), a: l('0.25× (убыток)', '0.25× (loss)', '0,25× (rugi)', '0.25× (ขาดทุน)'), b: '15.52×' },
      { m: l('ROAS GrabAds', 'GrabAds ROAS', 'ROAS GrabAds', 'ROAS ของ GrabAds'), a: '14.02×', b: '21.19×' },
      { m: rowAdsRev('Rp'), a: l('116.8 млн', '116.8M', '116,8 juta', '116.8 ล้าน'), b: l('395.2 млн', '395.2M', '395,2 juta', '395.2 ล้าน') },
      { m: l('Конверсия охват → заказ', 'Reach → order conversion', 'Konversi jangkauan → pesanan', 'คอนเวอร์ชั่น การเข้าถึง → ออร์เดอร์'), a: '1.1%', b: '1.4%' }, { m: R.rating, a: '4.67', b: '4.8' },
    ],
    card: { value: 'x2.6', label: D.onBoth, chips: [l('заказы x2.1', 'orders x2.1', 'pesanan x2.1', 'ออร์เดอร์ x2.1'), l('ROAS Gojek 0.25 → 15.5', 'Gojek ROAS 0.25 → 15.5', 'ROAS Gojek 0,25 → 15,5', 'ROAS Gojek 0.25 → 15.5'), l('за 6 месяцев', 'in 6 months', 'dalam 6 bulan', 'ใน 6 เดือน')] },
    badge: { value: 'x2.6', line: l('выручки за 6 мес.', 'revenue in 6 months', 'omzet dalam 6 bulan', 'รายได้ใน 6 เดือน') },
  },

  /* ============================== Love U Pizza */
  {
    slug: 'love-u-pizza', country: 'id', kind: 'growth', name: 'Love U Pizza', logo: '/clients/love-u-pizza-canggu.webp',
    place: l('Тибубенег, Бали', 'Tibubeneng, Bali', 'Tibubeneng, Bali', 'ติบูเบอเนง บาหลี'),
    headline: l('Выручка ×21 за 9 месяцев', 'Revenue ×21 in 9 months', 'Omzet ×21 dalam 9 bulan', 'รายได้ ×21 ใน 9 เดือน'),
    lead: l('Ноябрь 2025 → июль 2026, 9 месяцев работы.', 'November 2025 → July 2026, 9 months of work.', 'November 2025 → Juli 2026, 9 bulan kerja.', 'พฤศจิกายน 2025 → กรกฎาคม 2026 ทำงาน 9 เดือน'),
    kpis: [{ v: 'x21', l: D.revenue }, { v: 'x14', l: D.orders }, { v: '+50%', l: D.aov }, { v: '4.8', l: D.ratingKept }],
    a: { m: 'nov', y: 2025 }, b: { m: 'jul', y: 2026 },
    pointA: {
      stats: [
        { v: l('42.2 млн Rp', 'IDR 42.2M', 'Rp42,2 juta', '42.2 ล้านรูเปียห์'), l: D.salesMo },
        { v: '194', l: l('заказа в месяц', 'orders a month', 'pesanan per bulan', 'ออร์เดอร์ต่อเดือน') },
        { v: l('217 тыс. Rp', 'IDR 217K', 'Rp217 ribu', '217,000 รูเปียห์'), l: D.aov },
        { v: '16%', l: l('выручки с Gojek', 'of revenue from Gojek', 'omzet dari Gojek', 'ของรายได้มาจาก Gojek'), warn: true },
      ],
      bullets: [
        l('Ресторан почти не существовал в доставке: 194 заказа в месяц на две платформы.', 'The restaurant barely existed in delivery: 194 orders a month across two platforms.', 'Restoran nyaris tidak ada di delivery: 194 pesanan per bulan di dua platform.', 'ร้านแทบไม่มีตัวตนในเดลิเวอรี: 194 ออร์เดอร์ต่อเดือนรวมสองแพลตฟอร์ม'),
        l('Средний чек ниже потенциала: в меню нет допов, комбо и семейных позиций.', 'Average order below its potential: no add-ons, combos or family items on the menu.', 'Rata-rata pesanan di bawah potensi: tidak ada tambahan, combo atau menu keluarga.', 'ยอดเฉลี่ยต่อออร์เดอร์ต่ำกว่าศักยภาพ: เมนูไม่มีตัวเลือกเสริม คอมโบ หรือเมนูสำหรับครอบครัว'),
        l('Gojek почти не работал: 44 заказа и 16% выручки.', 'Gojek was barely working: 44 orders and 16% of revenue.', 'Gojek nyaris tidak jalan: 44 pesanan dan 16% omzet.', 'Gojek แทบไม่ทำงาน: 44 ออร์เดอร์ และ 16% ของรายได้'),
        l('Аккаунты не оптимизированы: карточка, ключевые слова, меню и реклама, всё с нуля.', 'Accounts not optimized: listing, keywords, menu and ads all from scratch.', 'Akun belum dioptimalkan: halaman restoran, kata kunci, menu dan iklan, semuanya dari nol.', 'บัญชียังไม่ได้ปรับ: หน้าร้าน คำค้น เมนู และโฆษณา ทุกอย่างเริ่มจากศูนย์'),
      ],
    },
    work: {
      cards: [
        { t: l('Аккаунты и реклама', 'Accounts and ads', 'Akun dan iklan', 'บัญชีและโฆษณา'), items: [l('Полная пересборка карточек на Grab и Gojek', 'Listings on Grab and Gojek rebuilt in full', 'Halaman di Grab dan Gojek dibangun ulang sepenuhnya', 'จัดหน้าร้านบน Grab และ Gojek ใหม่ทั้งหมด'), l('Ручной CPO, настройки под заказы', 'Manual CPO, settings tuned for orders', 'CPO manual, pengaturan untuk pesanan', 'คุม CPO เอง ตั้งค่าเพื่อออร์เดอร์'), l('Gojek из простоя в рост: выручка ×24', 'Gojek from idle to growth: revenue ×24', 'Gojek dari diam menjadi tumbuh: omzet ×24', 'Gojek จากนิ่งสู่เติบโต: รายได้ ×24')], v: 'x24', l: l('выручка Gojek', 'Gojek revenue', 'omzet Gojek', 'รายได้ Gojek') },
        { t: D.seo, items: [l('Карта ключей по району и категории', 'Keyword map by area and category', 'Peta kata kunci per area dan kategori', 'แผนคำค้นตามย่านและหมวดหมู่'), D.keysNames, l('Пересборка категорий меню', 'Menu categories rebuilt', 'Kategori menu dibangun ulang', 'จัดหมวดหมู่เมนูใหม่')], v: '1.3%', l: l('сквозная конверсия (флот 0.9%)', 'through-conversion (portfolio 0.9%)', 'konversi menyeluruh (portofolio 0,9%)', 'คอนเวอร์ชั่นตลอดเส้นทาง (ค่าเฉลี่ย 0.9%)') },
        { t: D.menuPrices, items: [l('Новые позиции под спрос района', 'New items for local demand', 'Menu baru sesuai permintaan area', 'เมนูใหม่ตามความต้องการของย่าน'), l('Комбо и допы', 'Combos and add-ons', 'Combo dan tambahan', 'คอมโบและตัวเลือกเสริม'), D.ourTech], v: '+49.5%', l: D.aov },
        { t: D.ratingOps, items: [D.bothPlatforms, l('Обучение команды', 'Team training', 'Pelatihan tim', 'อบรมทีม'), l('Ежемесячный разбор метрик', 'Monthly metrics review', 'Tinjauan metrik bulanan', 'ทบทวนตัวเลขทุกเดือน')], v: '4.8', l: l('при заказах ×14', 'with orders ×14', 'dengan pesanan ×14', 'ขณะออร์เดอร์ ×14') },
      ],
    },
    bars: [
      { m: 'nov', h: 4.8, c: 'a', label: l('42.2 млн', '42.2M', '42,2 jt', '42.2 ล้าน') }, { m: 'dec', h: 16.8, c: 'us' }, { m: 'jan', h: 30.2, c: 'us' }, { m: 'feb', h: 42.4, c: 'us' }, { m: 'mar', h: 59.8, c: 'us' },
      { m: 'apr', h: 75.1, c: 'us' }, { m: 'may', h: 85.5, c: 'us' }, { m: 'jun', h: 89.9, c: 'us' }, { m: 'jul', h: 100, c: 'us', label: l('888.2 млн', '888.2M', '888,2 jt', '888.2 ล้าน') },
    ],
    rows: [
      { m: rowRev('Rp'), a: '42 175 000', b: '888 223 193' }, { m: R.orders, a: '194', b: '2 733' }, { m: rowAov('Rp'), a: '217 397', b: '324 999' },
      { m: l('Выручка GrabFood, Rp', 'GrabFood revenue, Rp', 'Omzet GrabFood, Rp', 'รายได้ GrabFood (Rp)'), a: l('35.2 млн', '35.2M', '35,2 juta', '35.2 ล้าน'), b: l('721.0 млн (×20.5)', '721.0M (×20.5)', '721,0 juta (×20,5)', '721.0 ล้าน (×20.5)') },
      { m: l('Выручка GoFood, Rp', 'GoFood revenue, Rp', 'Omzet GoFood, Rp', 'รายได้ GoFood (Rp)'), a: l('6.9 млн', '6.9M', '6,9 juta', '6.9 ล้าน'), b: l('167.3 млн (×24.1)', '167.3M (×24.1)', '167,3 juta (×24,1)', '167.3 ล้าน (×24.1)') },
      { m: l('Заказов в день', 'Orders a day', 'Pesanan per hari', 'ออร์เดอร์ต่อวัน'), a: '6.7', b: '88.2' },
      { m: R.rating, a: '4.8', b: l('4.8, удержан при ×14', '4.8, held at ×14', '4.8, terjaga saat ×14', '4.8 รักษาไว้ได้แม้ ×14') },
    ],
    card: { value: 'x21', label: D.onBoth, chips: [l('заказы x14', 'orders x14', 'pesanan x14', 'ออร์เดอร์ x14'), l('чек +50%', 'average order +50%', 'rata-rata pesanan +50%', 'ยอดเฉลี่ย +50%'), l('за 9 месяцев', 'in 9 months', 'dalam 9 bulan', 'ใน 9 เดือน')] },
    badge: { value: 'x21', line: l('выручки за 9 мес.', 'revenue in 9 months', 'omzet dalam 9 bulan', 'รายได้ใน 9 เดือน'), bars: true },
  },
];

export const getCaseV2 = (slug: string) => CASES_V2.find((c) => c.slug === slug);

/** Порядок в карусели (ТЗ, раздел 5). */
const TH_ORDER = ['surf-point-phuket', 'island-phuket', 'ussr-phuket', 'enjoy-healthy-food', 'etna-phuket', 'meat-point-phuket'];
const ID_ORDER = ['love-u-pizza', 'zaytun-ubud'];
const pickCases = (slugs: string[]) => slugs.map((s) => getCaseV2(s)!).filter(Boolean);
export const casesForCountry = (code: string): CaseV2[] =>
  code === 'th' ? pickCases(TH_ORDER) : code === 'id' ? pickCases([...ID_ORDER, ...TH_ORDER]) : pickCases([...TH_ORDER, ...ID_ORDER]);
/** Два кейса для телефонов на первом экране. */
export const heroCasesForCountry = (code: string): CaseV2[] =>
  code === 'id' ? pickCases(['love-u-pizza', 'zaytun-ubud']) : pickCases(['surf-point-phuket', 'island-phuket']);

/** Числа с пробелом-разделителем остаются в русском; в остальных языках ставим запятую. */
export const tv = (v: V, lang: Lang): string => {
  const s = typeof v === 'string' ? v : v[lang];
  return lang === 'ru' || typeof v !== 'string' ? s : s.replace(/(\d) (?=\d{3}(\D|$))/g, '$1,');
};
