import { useEffect } from 'react';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import {
  AnswerLayout,
  AnswerCta,
  Block,
  FaqList,
  KeepReading,
  faqPageSchema,
  articleSchema,
  syncOpenGraph,
} from '../components/AnswerLayout';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/method';

/** The Delivery Booster Method — the framework we run on every account, published
 *  openly. Structured, source-cited method pages get quoted by AI engines far more
 *  readily than marketing pages; every number here comes from client dashboards. */
export default function MethodPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster Method — как мы растим продажи на GrabFood и GoFood'
        : language === 'id'
        ? 'Delivery Booster Method — cara kami menumbuhkan penjualan di GrabFood dan GoFood'
        : language === 'th'
        ? 'Delivery Booster Method — เราเพิ่มยอดขายบน GrabFood และ GoFood อย่างไร'
        : 'The Delivery Booster Method — how we grow GrabFood and GoFood sales';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Открытый метод Delivery Booster: пять этапов работы с аккаунтом ресторана на GrabFood и GoFood — доступность, карточка, меню и цены, рейтинг, реклама — с реальными цифрами кабинетов клиентов.'
          : language === 'id'
          ? 'Delivery Booster Method, dipublikasikan utuh: lima tahap pengelolaan akun restoran di GrabFood dan GoFood — ketersediaan, halaman toko, menu dan harga, rating, iklan — dengan angka nyata dari dashboard klien.'
          : language === 'th'
          ? 'เมธอดของ Delivery Booster แบบเปิดทั้งหมด: ห้าขั้นตอนของการดูแลบัญชีร้านอาหารบน GrabFood และ GoFood — ความพร้อมขาย หน้าร้าน เมนูและราคา เรตติ้ง โฆษณา พร้อมตัวเลขจริงจากแดชบอร์ดของลูกค้า'
          : 'The Delivery Booster Method, published in full: five stages of working a restaurant account on GrabFood and GoFood — availability, listing, menu and pricing, rating, ads — with real numbers from client dashboards.';
    syncOpenGraph();
  }, [language]);

  const stages: Array<{ n: string; title: string; why: string; work: string[]; proof: string }> = [
    {
      n: '01',
      title: t('Доступность', 'Availability', 'Ketersediaan', 'ความพร้อมขาย'),
      why: t(
        'Алгоритмы GrabFood и GoFood прежде всего проверяют, можно ли на вас положиться. Офлайн-часы, отмены и долгое приготовление роняют ранжирование сильнее, чем что-либо ещё, и восстанавливается оно медленно — площадке нужна новая история.',
        'GrabFood and GoFood algorithms first check whether you can be relied on. Offline hours, cancellations and slow preparation hurt ranking more than anything else, and recovery is slow — the platform needs a new history.', 'Algoritma GrabFood dan GoFood pertama-tama menilai apakah Anda bisa diandalkan. Jam offline, pembatalan, dan waktu masak yang lama menurunkan peringkat lebih dari faktor mana pun, dan pemulihannya lambat — platform butuh riwayat baru.'
      , 'อัลกอริทึมของ GrabFood และ GoFood ตรวจก่อนเลยว่าคุณพึ่งพาได้หรือไม่ ชั่วโมงที่ร้านปิดในระบบ การยกเลิก และการทำอาหารช้า ทำลายอันดับมากกว่าอะไรทั้งหมด และการฟื้นตัวก็ช้า เพราะแพลตฟอร์มต้องสะสมประวัติใหม่'),
      work: [
        t('Мониторинг статуса открыт/закрыт на обеих площадках в реальном времени',
          'Real-time open/closed monitoring on both platforms', 'Pemantauan status buka/tutup di kedua platform secara real time', 'เฝ้าดูสถานะเปิดปิดแบบเรียลไทม์บนทั้งสองแพลตฟอร์ม'),
        t('Контроль стоп-листа: позиции, выключенные случайно и незаметно',
          'Stop-list control: items switched off by accident and unnoticed', 'Kontrol item yang dinonaktifkan: posisi yang mati tanpa disadari', 'ควบคุมสต็อปลิสต์: เมนูที่ถูกปิดโดยไม่ตั้งใจและไม่มีใครสังเกต'),
        t('Работа с отменами и временем приготовления',
          'Cancellation and preparation-time work', 'Penanganan pembatalan dan waktu persiapan pesanan', 'จัดการเรื่องการยกเลิกและเวลาเตรียมอาหาร'),
      ],
      proof: t(
        'USSR Phuket: 3 977 минут офлайна в месяц → 0, показы в поиске 0 → 7 481/мес. Enjoy Healthy Food: доля офлайна 73% → 0%, показы 7 038 → 25 543/мес, время ожидания курьера 437 → 135 секунд.',
        'USSR Phuket: 3,977 offline minutes a month → 0, search impressions 0 → 7,481/month. Enjoy Healthy Food: offline rate 73% → 0%, impressions 7,038 → 25,543/month, driver waiting time 437 → 135 seconds.', 'USSR Phuket: 3,977 menit offline per bulan → 0, tayangan pencarian 0 → 7,481/bulan. Enjoy Healthy Food: porsi offline 73% → 0%, tayangan 7,038 → 25,543/bulan, waktu tunggu driver 437 → 135 detik.'
      , 'USSR Phuket: ปิดในระบบ 3,977 นาทีต่อเดือน → 0 การมองเห็นในการค้นหา 0 → 7,481 ครั้งต่อเดือน Enjoy Healthy Food: อัตราปิดในระบบ 73% → 0% การมองเห็น 7,038 → 25,543 ครั้งต่อเดือน เวลารอของคนขับ 437 → 135 วินาที'),
    },
    {
      n: '02',
      title: t('Карточка и меню-SEO', 'Listing and menu SEO', 'Halaman toko dan menu SEO', 'หน้าร้านและ SEO ของเมนู'),
      why: t(
        'Внутри приложения работает поиск, и он ищет по словам, которые вы написали. Названия блюд, категории, описания и фото решают, сколько из увидевших карточку откроют меню, а сколько — закажут. Это и есть сквозная конверсия, главная цифра всей воронки.',
        'There is a search engine inside the app, and it searches the words you wrote. Dish names, categories, descriptions and photos decide how many viewers open the menu and how many order. That is through-conversion — the number the whole funnel turns on.', 'Di dalam aplikasi ada mesin pencari, dan ia mencari kata-kata yang Anda tulis. Nama hidangan, kategori, deskripsi, dan foto menentukan berapa banyak orang yang membuka menu dan berapa yang memesan. Itulah konversi menyeluruh — angka utama dari seluruh funnel.'
      , 'ในแอปมีระบบค้นหา และมันค้นจากคำที่คุณเขียนไว้ ชื่อเมนู หมวดหมู่ คำอธิบาย และรูปภาพ เป็นตัวตัดสินว่าคนที่เห็นจะกดเข้าดูเมนูกี่คนและสั่งกี่คน นั่นคืออัตราการเปลี่ยนคนดูเป็นออร์เดอร์ ตัวเลขที่ทั้งกรวยการขายหมุนรอบมัน'),
      work: [
        t('Карта ключевых запросов по городу и категории',
          'Keyword map by city and category', 'Peta kata kunci berdasarkan kota dan kategori', 'แผนที่คำค้นแยกตามเมืองและหมวดหมู่'),
        t('Ключи в названия и описания позиций, пересборка структуры категорий',
          'Keywords in item names and descriptions, category structure rebuild', 'Kata kunci di nama dan deskripsi item, penyusunan ulang struktur kategori', 'ใส่คำค้นในชื่อเมนูและคำอธิบาย ปรับโครงสร้างหมวดหมู่ใหม่'),
        t('Фото и порядок позиций под первый экран',
          'Photos and item order tuned for the first screen', 'Foto dan urutan item yang disesuaikan untuk layar pertama', 'รูปภาพและลำดับเมนูที่ปรับให้เหมาะกับหน้าจอแรก'),
      ],
      proof: t(
        'Etna Phuket: сквозная конверсия 0.5% → 1.9% (x3.8) при средней по нашему флоту 0.9%; меню стали открывать заметно чаще. Zaytun Ubud: охват x1.84, конверсия «охват → меню» 8.5% → 10.0%.',
        'Etna Phuket: through-conversion 0.5% → 1.9% (x3.8) against a 0.9% fleet average; menu opens rose sharply. Zaytun Ubud: reach x1.84, reach → menu conversion 8.5% → 10.0%.', 'Etna Phuket: konversi menyeluruh 0.5% → 1.9% (x3.8) dibanding rata-rata 0.9% di portofolio kami; menu jauh lebih sering dibuka. Zaytun Ubud: jangkauan x1.84, konversi jangkauan → menu 8.5% → 10.0%.'
      , 'Etna Phuket: อัตราการเปลี่ยนคนดูเป็นออร์เดอร์ 0.5% → 1.9% (x3.8) เทียบกับค่าเฉลี่ย 0.9% ของร้านที่เราดูแล และยอดกดเข้าดูเมนูพุ่งขึ้นชัดเจน Zaytun Ubud: การเข้าถึง x1.84 อัตราจากการเข้าถึงสู่การเปิดเมนู 8.5% → 10.0%'),
    },
    {
      n: '03',
      title: t('Цены, промо и средний чек', 'Pricing, promos and average check', 'Harga, promo, dan rata-rata nilai pesanan', 'ราคา โปรโมชัน และยอดต่อบิล'),
      why: t(
        'Промо поднимает позицию в выдаче и режет маржу одновременно, поэтому считать надо не заказы, а то, что осталось после скидки и комиссии площадки. Средний чек — второй множитель выручки, о котором обычно забывают: он растёт от структуры меню, комбо и допов, а не от повышения цен.',
        'A promo lifts your position and cuts your margin at once, so what counts is not orders but what is left after the discount and the platform commission. Average check is the second revenue multiplier and the forgotten one: it grows from menu structure, combos and add-ons — not from raising prices.', 'Promo menaikkan posisi Anda sekaligus memotong margin, jadi yang dihitung bukan jumlah pesanan melainkan sisa setelah diskon dan komisi platform. Rata-rata nilai pesanan adalah pengali omzet kedua yang sering terlupakan: ia tumbuh dari struktur menu, combo, dan add-on — bukan dari menaikkan harga.'
      , 'โปรโมชันดันอันดับขึ้นและกินมาร์จิ้นไปพร้อมกัน สิ่งที่นับจึงไม่ใช่จำนวนออร์เดอร์ แต่คือสิ่งที่เหลือหลังหักส่วนลดและค่าคอมมิชชันแพลตฟอร์ม ส่วนยอดต่อบิลคือตัวคูณยอดขายตัวที่สองที่มักถูกลืม มันโตจากโครงสร้างเมนู ชุดคอมโบ และของแถม ไม่ใช่จากการขึ้นราคา'),
      work: [
        t('Экономика каждой акции: что остаётся после скидки, комиссии и рекламы',
          'Per-promo economics: what is left after discount, commission and ad spend', 'Ekonomi tiap promo: sisa setelah diskon, komisi, dan biaya iklan', 'เศรษฐศาสตร์รายโปร: เหลืออะไรหลังหักส่วนลด ค่าคอมมิชชัน และค่าโฆษณา'),
        t('Комбо и допы, поднимающие чек без повышения цен',
          'Combos and add-ons that lift the check without price rises', 'Combo dan add-on yang menaikkan nilai pesanan tanpa menaikkan harga', 'ชุดคอมโบและเมนูเสริมที่ดันยอดต่อบิลโดยไม่ต้องขึ้นราคา'),
        t('A/B-тесты позиций и цен',
          'A/B tests of items and prices', 'Uji A/B untuk item dan harga', 'ทดสอบ A/B ทั้งตัวเมนูและราคา'),
      ],
      proof: t(
        'Love U Pizza: средний чек +49.5% (Rp 217 397 → 324 999) при росте заказов x14.1. Meat Point Phuket: средний чек +22.4% (785 → 961 бат) — в низкий сезон, когда рестораны Пхукета теряют 20–40% выручки.',
        'Love U Pizza: average check +49.5% (Rp 217,397 → 324,999) alongside 14.1x order growth. Meat Point Phuket: average check +22.4% (785 → 961 THB) — in the low season, when Phuket restaurants typically lose 20–40% of revenue.', 'Love U Pizza: rata-rata nilai pesanan +49.5% (Rp 217,397 → 324,999) bersama pertumbuhan pesanan 14.1x. Meat Point Phuket: rata-rata nilai pesanan +22.4% (785 → 961 THB) — di low season, saat restoran Phuket biasanya kehilangan 20–40% omzet.'
      , 'Love U Pizza: ยอดต่อบิล +49.5% (217,397 → 324,999 รูเปียห์) พร้อมออร์เดอร์โต 14.1 เท่า Meat Point Phuket: ยอดต่อบิล +22.4% (785 → 961 บาท) ในช่วงโลว์ซีซัน ซึ่งปกติร้านที่ภูเก็ตเสียยอดขายไป 20-40%'),
    },
    {
      n: '04',
      title: t('Рейтинг и отзывы', 'Rating and reviews', 'Rating dan ulasan', 'เรตติ้งและรีวิว'),
      why: t(
        'С 4.8 алгоритм отдаёт показы щедрее, а человек, выбирающий между двумя карточками, смотрит на цифру рядом с названием. Один несправедливый отзыв на молодом аккаунте стоит дороже, чем кажется, — и его часто можно снять, если ответить правильно и вовремя.',
        'From 4.8 the algorithm serves impressions more generously, and a customer choosing between two listings looks at the number next to the name. One unfair review on a young account costs more than it seems — and can often be removed if you answer correctly and quickly.', 'Mulai dari 4.8 algoritma memberi tayangan jauh lebih murah hati, dan pelanggan yang memilih di antara dua toko melihat angka di sebelah nama. Satu ulasan tidak adil pada akun yang masih muda lebih mahal daripada yang terlihat — dan sering bisa dihapus bila dijawab dengan tepat dan cepat.'
      , 'ตั้งแต่ 4.8 ขึ้นไป อัลกอริทึมปล่อยการมองเห็นให้ใจกว้างขึ้น และลูกค้าที่เลือกระหว่างสองร้านก็ดูตัวเลขข้างชื่อร้าน รีวิวที่ไม่เป็นธรรมหนึ่งครั้งบนบัญชีที่ยังใหม่แพงกว่าที่คิด และหลายครั้งลบออกได้ถ้าตอบให้ถูกและเร็ว'),
      work: [
        t('Ежедневный разбор новых отзывов и быстрые ответы',
          'Daily review triage and fast replies', 'Peninjauan ulasan baru setiap hari dan balasan cepat', 'คัดกรองรีวิวทุกวันและตอบอย่างรวดเร็ว'),
        t('Оспаривание несправедливых отзывов вплоть до удаления',
          'Escalating unfair reviews up to removal', 'Menyanggah ulasan tidak adil hingga dihapus', 'ยกระดับรีวิวที่ไม่เป็นธรรมจนถึงขั้นลบออก'),
        t('Разбор причин: что именно в блюде, упаковке или скорости даёт минус',
          'Root causes: what in the dish, packaging or speed is producing the minus', 'Akar masalah: apa pada hidangan, kemasan, atau kecepatan yang menurunkan nilai', 'หาต้นตอ: อะไรในตัวอาหาร บรรจุภัณฑ์ หรือความเร็ว ที่ทำให้เกิดคะแนนลบ'),
      ],
      proof: t(
        'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 при нулевых инцидентах. Love U Pizza удержал 4.8 при росте заказов в 14 раз — это сложнее, чем поднять.',
        'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 with zero incidents. Love U Pizza held 4.8 through 14x order growth — harder than lifting it.', 'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 tanpa satu pun insiden. Love U Pizza mempertahankan 4.8 melalui pertumbuhan pesanan 14x — itu lebih sulit daripada menaikkannya.'
      , 'USSR Phuket 4.5 → 4.8, Etna 4.6 → 4.8, Zaytun Ubud 4.67 → 4.8, Meat Point 4.6 → 4.8 โดยไม่มีเหตุขัดข้องเลย ส่วน Love U Pizza รักษา 4.8 ไว้ได้ตลอดช่วงที่ออร์เดอร์โต 14 เท่า ซึ่งยากกว่าการดันขึ้นเสียอีก'),
    },
    {
      n: '05',
      title: t('Реклама', 'Ads', 'Iklan', 'โฆษณา'),
      why: t(
        'Реклама идёт последней осознанно: она покупает показы, а превращает их в заказы всё, что сделано на этапах 1–4. Автоставка набирает дешёвые нерелевантные показы, поэтому мы ведём кампании вручную и правим их еженедельно, а не запускаем один раз.',
        'Ads come last by design: they buy impressions, and everything from stages 1–4 is what turns those into orders. Auto-bidding collects cheap irrelevant impressions, so we run campaigns manually and adjust weekly instead of launching once.', 'Iklan sengaja ditempatkan terakhir: iklan membeli tayangan, dan yang mengubahnya menjadi pesanan adalah seluruh pekerjaan tahap 1–4. Bid otomatis mengumpulkan tayangan murah yang tidak relevan, jadi kami menjalankan kampanye secara manual dan menyesuaikannya tiap minggu, bukan sekali jalan.'
      , 'โฆษณามาเป็นอันดับสุดท้ายโดยตั้งใจ เพราะมันซื้อการมองเห็น ส่วนทุกอย่างจากขั้นที่ 1-4 คือสิ่งที่เปลี่ยนการมองเห็นนั้นเป็นออร์เดอร์ การบิดอัตโนมัติเก็บการมองเห็นราคาถูกที่ไม่ตรงกลุ่ม เราจึงคุมแคมเปญเองและปรับทุกสัปดาห์ แทนที่จะตั้งค่าครั้งเดียวจบ'),
      work: [
        t('Ручной CPO вместо автоставки, ежедневное ведение',
          'Manual CPO instead of auto-bidding, daily management', 'CPO manual alih-alih bid otomatis, pengelolaan harian', 'คุม CPO เองแทนการบิดอัตโนมัติ พร้อมดูแลทุกวัน'),
        t('Контроль ROAS по каждой кампании, а не в среднем',
          'ROAS control per campaign, not on average', 'Kontrol ROAS per kampanye, bukan rata-rata', 'คุม ROAS รายแคมเปญ ไม่ใช่ดูค่าเฉลี่ยรวม'),
        t('Бюджет растёт только после того, как растёт конверсия',
          'Budget grows only after conversion does', 'Budget naik hanya setelah konversi naik', 'งบเพิ่มได้ก็ต่อเมื่ออัตราการปิดการขายเพิ่มแล้วเท่านั้น'),
      ],
      proof: t(
        'Etna Phuket: ROAS 14.75x → 34.57x, CTR 2.8% → 5.59%, стоимость заказа 42 → 29 бат; бюджет +50%, выручка с рекламы x3.4. Zaytun Ubud: GoFood из убытка ROAS 0.25x → 15.52x (окупаемость x62), GrabAds 14.02x → 21.19x. Enjoy Healthy Food: ROAS 27.5x, 566 новых клиентов.',
        'Etna Phuket: ROAS 14.75x → 34.57x, CTR 2.8% → 5.59%, cost per order 42 → 29 THB; budget +50%, ads revenue x3.4. Zaytun Ubud: GoFood from a loss-making 0.25x to 15.52x (x62 payback), GrabAds 14.02x → 21.19x. Enjoy Healthy Food: ROAS 27.5x, 566 new customers acquired.', 'Etna Phuket: ROAS 14.75x → 34.57x, CTR 2.8% → 5.59%, biaya per pesanan 42 → 29 THB; budget +50%, omzet dari iklan x3.4. Zaytun Ubud: GoFood dari rugi 0.25x menjadi 15.52x (balik modal x62), GrabAds 14.02x → 21.19x. Enjoy Healthy Food: ROAS 27.5x, 566 pelanggan baru.'
      , 'Etna Phuket: ROAS 14.75 → 34.57 เท่า, CTR 2.8% → 5.59%, ต้นทุนต่อออร์เดอร์ 42 → 29 บาท งบ +50% ยอดขายจากโฆษณา x3.4 Zaytun Ubud: GoFood จากขาดทุนที่ 0.25 เท่า เป็น 15.52 เท่า (คุ้มทุน 62 เท่า) GrabAds 14.02 → 21.19 เท่า Enjoy Healthy Food: ROAS 27.5 เท่า ได้ลูกค้าใหม่ 566 ราย'),
    },
  ];

  const faq: Array<[string, string]> = [
    [
      t('Почему вы не включаете мне рекламу сразу?',
        'Why don’t you just switch my ads on first?', 'Kenapa iklan saya tidak langsung dinyalakan dari awal?', 'ทำไมไม่เปิดโฆษณาให้เราก่อนเลย'),
      t('Потому что реклама умножает конверсию карточки, а не заменяет её. На карточке со сквозной конверсией 0.5% каждый вложенный доллар покупает просмотр без заказа. Сначала поднимаем то, что умножается, потом умножаем.',
        'Because ads multiply listing conversion rather than replace it. On a listing converting at 0.5%, every dollar buys a view without an order. First raise what gets multiplied, then multiply it.', 'Karena iklan mengalikan konversi halaman toko, bukan menggantikannya. Pada toko dengan konversi 0.5%, setiap dolar hanya membeli kunjungan tanpa pesanan. Naikkan dulu yang akan dikalikan, baru kalikan.', 'เพราะโฆษณาทวีอัตราการปิดการขายของหน้าร้าน ไม่ได้มาแทนที่มัน บนหน้าร้านที่ปิดการขายได้ 0.5% ทุกบาทที่จ่ายก็แค่ซื้อคนดูโดยไม่ได้ออร์เดอร์ ต้องยกสิ่งที่จะถูกทวีขึ้นก่อน แล้วค่อยทวีมัน'),
    ],
    [
      t('Это для новых ресторанов или для таких, как мой?',
        'Is this for new restaurants or for one like mine?', 'Ini untuk restoran baru atau untuk yang seperti punya saya?', 'วิธีนี้ใช้กับร้านเปิดใหม่ หรือร้านแบบของเรา'),
      t('Для обоих, но по-разному. На запуске главные рычаги — доступность и карточка: Love U Pizza вырос x21 за 9 месяцев с почти нулевой базы. На работающем ресторане лёгкие точки роста уже израсходованы, и каждый следующий процент достаётся из конверсии и меню: Zaytun Ubud делал 166,6 млн рупий в месяц до нас и вырос x2.6 за 5 месяцев.',
        'Both, differently. At launch the big levers are availability and listing: Love U Pizza grew x21 in 9 months from a near-zero base. On an established restaurant the easy gains are already spent, and every next percent comes out of conversion and menu: Zaytun Ubud was already making Rp 166.6M a month before us and grew x2.6 in 5 months.', 'Keduanya, dengan cara berbeda. Saat peluncuran, pengungkit terbesar adalah ketersediaan dan halaman toko: Love U Pizza tumbuh x21 dalam 9 bulan dari basis hampir nol. Pada restoran yang sudah berjalan, perbaikan mudah sudah habis, dan setiap persen berikutnya datang dari konversi dan menu: Zaytun Ubud sudah membukukan Rp 166.6 juta per bulan sebelum kami dan tumbuh x2.6 dalam 5 bulan.', 'ใช้ได้ทั้งคู่ แต่คนละแบบ ตอนเปิดใหม่ คันโยกใหญ่คือความพร้อมขายและหน้าร้าน Love U Pizza โต 21 เท่าใน 9 เดือนจากฐานที่เกือบเป็นศูนย์ ส่วนร้านที่ตั้งตัวแล้ว ของง่าย ๆ ถูกใช้ไปหมดแล้ว ทุกเปอร์เซ็นต์ถัดไปต้องมาจากอัตราการปิดการขายและเมนู Zaytun Ubud ทำได้ 166.6 ล้านรูเปียห์ต่อเดือนก่อนเราเข้าไป และโตอีก 2.6 เท่าใน 5 เดือน'),
    ],
    [
      t('Могу я сделать всё это сам, без вас?',
        'Can I do all of this myself, without you?', 'Bisakah saya melakukan semua ini sendiri, tanpa Anda?', 'เราทำเองทั้งหมดโดยไม่ใช้คุณได้ไหม'),
      t('Да — он поэтому и опубликован целиком. Ограничение не в знании, а в том, что это ежедневная работа с двумя кабинетами: ставки, стоп-лист, отзывы, промо, еженедельный разбор цифр. Обычно владелец делает это «по остатку», и метод разваливается не на понимании, а на регулярности.',
        'Yes — that is why it is published in full. The constraint is not knowledge but that this is daily work across two dashboards: bids, stop-list, reviews, promos, weekly number reviews. Owners usually do it with whatever time is left, and the method breaks on consistency, not on understanding.', 'Bisa — karena itulah metode ini dipublikasikan utuh. Kendalanya bukan pengetahuan, melainkan bahwa ini pekerjaan harian di dua dashboard: bid, item yang dinonaktifkan, ulasan, promo, telaah angka mingguan. Pemilik biasanya mengerjakannya dengan sisa waktu, dan metode ini patah pada keteraturan, bukan pada pemahaman.', 'ได้ นั่นคือเหตุผลที่เราเผยแพร่ทั้งหมด ข้อจำกัดไม่ใช่ความรู้ แต่คือมันเป็นงานประจำวันบนหลังบ้านสองระบบ ทั้งการบิด สต็อปลิสต์ รีวิว โปรโมชัน และการทบทวนตัวเลขรายสัปดาห์ เจ้าของร้านมักทำด้วยเวลาที่เหลือ และวิธีการนี้พังที่ความสม่ำเสมอ ไม่ใช่ที่ความเข้าใจ'),
    ],
    [
      t('Когда я увижу изменения после начала работы?',
        'When will I see changes after we start?', 'Kapan saya melihat perubahan setelah kita mulai?', 'เริ่มงานแล้วจะเห็นการเปลี่ยนแปลงเมื่อไร'),
      t('Первые изменения — 2–4 недели, полная раскачка — 3–6 месяцев. Быстрее всего отзываются доступность и ставки, медленнее всего — ранжирование и рейтинг, потому что алгоритму нужна история.',
        'First movement in 2–4 weeks, full ramp-up in 3–6 months. Availability and bidding respond fastest; ranking and rating are slowest, because the algorithm needs history.', 'Perubahan pertama dalam 2–4 minggu, akselerasi penuh dalam 3–6 bulan. Ketersediaan dan bid merespons paling cepat; peringkat dan rating paling lambat, karena algoritma butuh riwayat.', 'เห็นความเคลื่อนไหวแรกใน 2-4 สัปดาห์ เต็มกำลังใน 3-6 เดือน ความพร้อมขายและการบิดตอบสนองเร็วที่สุด ส่วนอันดับและเรตติ้งช้าที่สุด เพราะอัลกอริทึมต้องสะสมประวัติ'),
    ],
  ];

  const findings: Array<[string, string]> = [
    [
      t('Этап 1 начинается со стоп-листа, а не со стратегии',
        'Stage 1 starts with the stop-list, not with strategy',
        'Tahap 1 dimulai dari stop-list, bukan dari strategi', 'ขั้นที่ 1 เริ่มที่สต็อปลิสต์ ไม่ใช่ที่กลยุทธ์'),
      t('Типичная картина в первый день — 40–70 позиций выключено одновременно, отдельные блюда висят в стопе больше 2000 часов. Здесь же и деньги: около 25% выручки проходит мимо ресторана, и 95% этих потерь — именно выключенные позиции, а не закрытый ресторан (3%) и не отмены (2%).',
        'The typical day-one picture is 40–70 items switched off at once, with individual dishes stuck in the stop-list for over 2,000 hours. The money is here too: around 25% of revenue goes past the restaurant, and 95% of that loss is switched-off items — not a closed restaurant (3%) and not cancellations (2%).',
        'Gambaran khas di hari pertama: 40–70 item nonaktif sekaligus, dan ada hidangan yang tertahan di stop-list lebih dari 2.000 jam. Uangnya juga ada di sini: sekitar 25% omzet lewat begitu saja, dan 95% kerugian itu berasal dari item yang dinonaktifkan — bukan restoran tutup (3%) dan bukan pembatalan (2%).', 'ภาพในวันแรกที่เจอทั่วไปคือเมนูถูกปิดพร้อมกัน 40-70 รายการ และบางเมนูค้างในสต็อปลิสต์เกิน 2,000 ชั่วโมง เงินก็อยู่ตรงนี้ด้วย: ราว 25% ของยอดขายหลุดมือร้านไป และ 95% ของส่วนที่หายคือเมนูที่ถูกปิด ไม่ใช่ร้านปิด (3%) และไม่ใช่การยกเลิก (2%)'),
    ],
    [
      t('Долю рекламы считаем до того, как трогать ставки',
        'We check the ad share before touching a single bid',
        'Porsi iklan kami hitung sebelum menyentuh bid', 'เราตรวจสัดส่วนค่าโฆษณาก่อนจะแตะบิดสักตัว'),
      t('Реклама перестаёт окупаться примерно на 6% выручки: до этой границы медианный ROAS 12.1x, после — 8.6x. За границей уже 42% ресторанов нашего флота — и почти всегда это повод сначала чинить этапы 1–4, а не поднимать бюджет.',
        'Ads stop paying back at roughly 6% of revenue: below that line the median ROAS is 12.1x, above it 8.6x. 42% of the restaurants in our fleet are already past it — and that is almost always a reason to fix stages 1–4 first rather than raise the budget.',
        'Iklan berhenti balik modal di sekitar 6% dari omzet: di bawah batas itu ROAS median 12.1x, di atasnya 8.6x. Sebanyak 42% restoran di portofolio kami sudah melewatinya — dan itu hampir selalu alasan untuk membereskan tahap 1–4 dulu, bukan menaikkan anggaran.', 'โฆษณาหยุดคุ้มทุนที่ราว 6% ของยอดขาย ต่ำกว่าเส้นนี้ ROAS มัธยฐานอยู่ที่ 12.1 เท่า สูงกว่านั้นเหลือ 8.6 เท่า ร้าน 42% ที่เราดูแลเลยเส้นนี้ไปแล้ว และนั่นแทบจะเสมอคือเหตุผลให้กลับไปแก้ขั้นที่ 1-4 ก่อน แทนที่จะเพิ่มงบ'),
    ],
    [
      t('Ваши цифры сверяем с медианой, а не с прошлым месяцем',
        'Your numbers go against the median, not against last month',
        'Angka Anda kami bandingkan dengan median, bukan bulan lalu', 'ตัวเลขของคุณต้องวัดกับค่ามัธยฐาน ไม่ใช่กับเดือนที่แล้ว'),
      t('Медианы Бали по нашему флоту: чек Rp 250 000, ROAS 10.4x, реклама 5.6% выручки, отмены 0.35%, один негативный отзыв на 138 заказов. Пока цифру не с чем сравнить, непонятно, что чинить первым, — поэтому нормы опубликованы открыто.',
        'Our fleet medians for Bali: check Rp 250,000, ROAS 10.4x, ads at 5.6% of revenue, cancellations 0.35%, one negative review per 138 orders. Until a number has something to be compared against, you cannot tell what to fix first — which is why the norms are published openly.',
        'Median portofolio kami untuk Bali: nilai pesanan Rp 250.000, ROAS 10.4x, iklan 5.6% dari omzet, pembatalan 0.35%, satu ulasan negatif per 138 pesanan. Selama sebuah angka tidak punya pembanding, tidak jelas apa yang harus dibereskan lebih dulu — karena itu normanya kami terbitkan terbuka.', 'ค่ามัธยฐานของร้านที่เราดูแลในบาหลี: ยอดต่อบิล 250,000 รูเปียห์ ROAS 10.4 เท่า ค่าโฆษณา 5.6% ของยอดขาย การยกเลิก 0.35% รีวิวลบหนึ่งครั้งต่อ 138 ออร์เดอร์ ตราบใดที่ตัวเลขยังไม่มีอะไรให้เทียบ คุณก็บอกไม่ได้ว่าควรแก้อะไรก่อน นี่คือเหตุผลที่เราเผยแพร่ตัวเลขมาตรฐานแบบเปิด'),
    ],
    [
      t('На этапе 4 сначала разбираем, что вообще можно снять',
        'At stage 4 we first sort out what can be removed at all',
        'Di tahap 4 kami pilah dulu ulasan mana yang bisa dihapus', 'ที่ขั้นที่ 4 เราแยกก่อนว่าอะไรลบออกได้บ้าง'),
      t('Отзывы бимодальны: 51% пятёрок против 28% единиц, четвёрок всего 3% — рейтинг делают крайности. Около 80% апелляций, которые мы подаём на Grab, заканчиваются снятием отзыва, и это самая быстрая часть работы с рейтингом.',
        'Reviews are bimodal: 51% five-stars against 28% one-stars, with only 3% fours — the rating is made by the extremes. Around 80% of the appeals we file with Grab end with the review removed, and that is the fastest part of rating work.',
        'Ulasan bersifat bimodal: 51% bintang lima berbanding 28% bintang satu, bintang empat hanya 3% — rating dibentuk oleh ekstremnya. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus, dan itu bagian tercepat dari pekerjaan rating.', 'รีวิวกระจุกอยู่สองขั้ว: ห้าดาว 51% เทียบกับหนึ่งดาว 28% สี่ดาวแค่ 3% เรตติ้งถูกกำหนดโดยสองขั้วนี้ การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว และนั่นคือส่วนที่เร็วที่สุดของงานเรตติ้ง'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Delivery Booster Method', 'The Delivery Booster Method', 'Delivery Booster Method', 'วิธีการของ Delivery Booster')}
      lead={t(
        'Это метод, по которому мы ведём аккаунты ресторанов на GrabFood и GoFood в Юго-Восточной Азии с 2023 года: 110+ на сопровождении сегодня, 200+ прошло через агентство. Пять этапов в строгом порядке: доступность → карточка и меню-SEO → цены и промо → рейтинг → реклама. Порядок здесь важнее содержания: почти все рестораны начинают с пятого пункта и потому платят за показы, которые не превращаются в заказы. Каждая цифра ниже — из кабинетов GrabMerchant и GoBiz наших клиентов, а не из презентации.',
        'This is the method we run on restaurant accounts on GrabFood and GoFood in Southeast Asia since 2023: 110+ under management today, 200+ served in total. Five stages in a strict order: availability → listing and menu SEO → pricing and promos → rating → ads. The order matters more than the content: almost every restaurant starts at stage five, and so pays for impressions that never become orders. Every number below comes from our clients’ GrabMerchant and GoBiz dashboards, not from a pitch deck.', 'Ini metode yang kami jalankan pada akun restoran di GrabFood dan GoFood di Asia Tenggara sejak 2023: 110+ dalam pengelolaan hari ini, 200+ total sejauh ini. Lima tahap dengan urutan tegas: ketersediaan → halaman toko dan menu SEO → harga dan promo → rating → iklan. Urutannya lebih penting daripada isinya: hampir semua restoran mulai dari tahap kelima, sehingga membayar tayangan yang tidak pernah menjadi pesanan. Setiap angka di bawah berasal dari dashboard GrabMerchant dan GoBiz klien kami, bukan dari materi presentasi.'
      , 'นี่คือวิธีการที่เราใช้กับบัญชีร้านอาหารบน GrabFood และ GoFood ในเอเชียตะวันออกเฉียงใต้ตั้งแต่ปี 2023 ปัจจุบันดูแลอยู่กว่า 110 ร้าน และให้บริการมาแล้วกว่า 200 ร้าน ห้าขั้นตอนเรียงลำดับอย่างเคร่งครัด: ความพร้อมขาย → หน้าร้านและ SEO ของเมนู → ราคาและโปรโมชัน → เรตติ้ง → โฆษณา ลำดับสำคัญกว่าตัวเนื้อหา เพราะร้านเกือบทุกร้านเริ่มที่ขั้นห้า จึงต้องจ่ายค่าการมองเห็นที่ไม่เคยกลายเป็นออร์เดอร์ ทุกตัวเลขด้านล่างมาจากหลังบ้าน GrabMerchant และ GoBiz ของลูกค้าเรา ไม่ใช่จากสไลด์ขายงาน')}
      meta={{ datePublished: '2026-09-08', dateModified: '2026-09-09', minutes: 9 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Delivery Booster Method: пять этапов роста продаж на GrabFood и GoFood',
                      'The Delivery Booster Method: five stages of GrabFood and GoFood sales growth', 'Delivery Booster Method: lima tahap pertumbuhan penjualan di GrabFood dan GoFood', 'วิธีการของ Delivery Booster: ห้าขั้นตอนเพิ่มยอดขายบน GrabFood และ GoFood'),
          url: URL,
          about:
            'GrabFood ranking, GoFood ranking, delivery management method, menu SEO, GrabAds ROAS, restaurant delivery growth',
          datePublished: '2026-09-08',
          dateModified: '2026-09-08',
          language,
        }),
      ]}
    >
      {stages.map((s) => (
        <Block key={s.n} card>
          <div className="flex gap-4 sm:gap-6">
            <div className="text-brand-green font-bold text-2xl sm:text-3xl shrink-0 pt-1">{s.n}</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
              <p className="text-brand-muted mb-4">{s.why}</p>
              <ul className="space-y-2 mb-4">
                {s.work.map((w) => (
                  <li key={w} className="text-sm flex gap-2">
                    <span className="text-brand-green">—</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brand-muted border-l-2 border-brand-green/40 pl-4">
                <span className="font-medium text-brand-text">
                  {t('Из кабинетов: ', 'From the dashboards: ', 'Dari dashboard: ', 'จากหลังบ้าน: ')}
                </span>
                {s.proof}
              </p>
            </div>
          </div>
        </Block>
      ))}

      <Block title={t('Что метод не обещает', 'What the method does not promise', 'Yang tidak dijanjikan metode ini', 'สิ่งที่วิธีการนี้ไม่ได้สัญญา')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Он не делает ресторан прибыльным, если экономика блюда не сходится до доставки, и не спасает кухню, которая не тянет объём: рост заказов в 14 раз ломает плохой процесс быстрее, чем приносит деньги. Метод работает с тем, что находится внутри GrabMerchant и GoBiz, — и честно останавливается там, где начинается сама кухня.',
            'It will not make a restaurant profitable if the unit economics do not work before delivery, and it will not save a kitchen that cannot handle volume: 14x order growth breaks a bad process faster than it earns. The method works on what lives inside GrabMerchant and GoBiz — and stops honestly where the kitchen itself begins.', 'Metode ini tidak membuat restoran untung bila ekonomi per hidangan sudah tidak masuk sebelum pengiriman, dan tidak menyelamatkan dapur yang tidak sanggup menangani volume: pertumbuhan pesanan 14x mematahkan proses yang buruk lebih cepat daripada menghasilkan uang. Metode ini bekerja pada apa yang ada di dalam GrabMerchant dan GoBiz — dan berhenti dengan jujur di titik tempat dapur itu sendiri dimulai.'
          , 'มันไม่ได้ทำให้ร้านมีกำไรถ้าเศรษฐศาสตร์ต่อหน่วยไม่ผ่านตั้งแต่ก่อนทำเดลิเวอรี และมันไม่ช่วยครัวที่รับปริมาณไม่ไหว ออร์เดอร์โต 14 เท่าทำลายกระบวนการที่ไม่ดีเร็วกว่าที่จะทำเงินได้ วิธีการนี้ทำงานกับสิ่งที่อยู่ใน GrabMerchant และ GoBiz และหยุดอย่างซื่อสัตย์ตรงที่ครัวเริ่มต้น')}
        </p>
      </Block>

      <Block card title={t('Полные кейсы', 'Full case studies', 'Studi kasus lengkap', 'เคสฉบับเต็ม')}>
        <p className="text-brand-muted">
          <Link href="/cases/love-u-pizza" className="text-brand-green hover:underline">Love U Pizza — x21</Link>
          {' · '}
          <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">Enjoy Healthy Food — x9.4</Link>
          {' · '}
          <Link href="/cases/ussr-phuket" className="text-brand-green hover:underline">USSR Phuket — x3.9</Link>
          {' · '}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">Zaytun Ubud — x2.6</Link>
          {' · '}
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">Etna Phuket — +87%</Link>
          {' · '}
          <Link href="/cases/meat-point-phuket" className="text-brand-green hover:underline">Meat Point — +46%</Link>
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <Block card title={t('Что мы находим на аккаунте вроде вашего',
                           'What we find on an account like yours',
                           'Apa yang kami temukan di akun seperti milik Anda', 'สิ่งที่เรามักเจอในบัญชีแบบของคุณ')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Метод начинается не с презентации, а с того, что мы находим в кабинете в первую неделю. Порядок этапов взялся именно отсюда.',
            'The method does not start with a deck — it starts with what we find in the dashboard in the first week. The order of the stages comes from exactly this.',
            'Metode ini tidak dimulai dari presentasi, melainkan dari apa yang kami temukan di dashboard pada minggu pertama. Urutan tahapnya lahir dari sini.'
          , 'วิธีการนี้ไม่ได้เริ่มจากสไลด์ แต่เริ่มจากสิ่งที่เราเจอในหลังบ้านในสัปดาห์แรก ลำดับของขั้นตอนมาจากตรงนี้พอดี')}
        </p>
        <div className="space-y-5">
          {findings.map(([title, body]) => (
            <div key={title} className="flex gap-3">
              <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">{title}</div>
                <p className="text-brand-muted text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <KeepReading currentHref="/method" />

      <AnswerCta />
    </AnswerLayout>
  );
}
