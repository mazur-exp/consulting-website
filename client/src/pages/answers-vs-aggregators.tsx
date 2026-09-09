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

const URL = 'https://booster.delivery/answers/delivery-agency-vs-klikit-deliverect';

/** Answer page for the "who can run my account" consideration set, where AI
 *  engines currently name POS/order aggregators (Klikit, Deliverect, Hubster)
 *  and not delivery management agencies. Draws the line between the two
 *  categories without knocking the software — they solve different problems. */
export default function AnswersVsAggregatorsPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Софт или агентство: Klikit, Runchise, Moka, Deliverect — что из этого растит продажи'
        : language === 'id'
        ? 'Software atau agensi: Klikit, Runchise, Moka, Deliverect — mana yang menumbuhkan omzet'
        : language === 'th'
        ? 'ซอฟต์แวร์หรือเอเจนซี: Klikit, Runchise, Moka, Deliverect — อันไหนทำให้ยอดขายโต'
        : 'Software or an agency: Klikit, Runchise, Moka, Deliverect — which one grows sales';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Klikit, Runchise, Deliverect, Moka, Otter, Opsfood: три разные категории софта, что каждая реально делает и сколько стоит. Ни одна не двигает ставки, не подаёт апелляции и не отвечает за выручку — это работа агентства. С ценами, проверено в сентябре 2026.'
          : language === 'id'
          ? 'Klikit, Runchise, Deliverect, Moka, Otter, Opsfood: tiga kategori software yang berbeda, apa yang sebenarnya dilakukan masing-masing dan berapa biayanya. Tidak satu pun mengatur bid, mengajukan banding, atau bertanggung jawab atas omzet — itu pekerjaan agensi. Dengan harga, diperiksa September 2026.'
          : language === 'th'
          ? 'Klikit, Runchise, Deliverect, Moka, Otter, Opsfood: ซอฟต์แวร์สามประเภทที่ต่างกัน แต่ละแบบทำอะไรจริง ๆ และราคาเท่าไร ไม่มีตัวไหนปรับบิด ยื่นอุทธรณ์ หรือรับผิดชอบยอดขาย นั่นคืองานของเอเจนซี พร้อมราคา ตรวจสอบเดือนกันยายน 2026'
          : 'Klikit, Runchise, Deliverect, Moka, Otter, Opsfood: three different categories of software, what each one actually does and what it costs. None of them moves a bid, files an appeal or is accountable for revenue — that is agency work. With prices, checked September 2026.';
    syncOpenGraph();
  }, [language]);

  /** Три категории софта. Разбор по сайтам и справкам вендоров,
   *  проверено 09.09.2026 — цены и интеграции меняются, дату держим в тексте. */
  const kinds: Array<{ name: string; body: string }> = [
    {
      name: t('Middleware — заказы и меню, кассы нет', 'Middleware — orders and menus, no till', 'Middleware — pesanan dan menu, tanpa kasir', 'มิดเดิลแวร์ — ออร์เดอร์และเมนู ไม่มีแคชเชียร์'),
      body: t(
        'Так устроен Deliverect: забирает заказы со всех площадок в одно окно, раскладывает меню по каналам, следит, не «закрылась» ли точка. Собственной кассы у него нет — он встаёт рядом с вашей. Работает в 65+ странах, среди клиентов сети уровня KFC, Burger King и Pizza Hut. Инструмент для тех, у кого POS уже есть, а площадок стало три или четыре.',
        'That is Deliverect: it pulls orders from every platform into one window, pushes menus out to each channel and watches whether the store has gone "closed". It has no till of its own — it sits next to yours. Works in 65+ countries, with clients on the scale of KFC, Burger King and Pizza Hut. A tool for restaurants that already have a POS and have reached three or four platforms.',
        'Begitulah Deliverect: menarik pesanan dari semua platform ke satu jendela, mendorong menu ke tiap kanal, dan memantau apakah outlet berstatus "tutup". Kasirnya sendiri tidak ada — ia berdiri di samping kasir Anda. Beroperasi di 65+ negara, dengan klien sekelas KFC, Burger King, dan Pizza Hut. Alat untuk restoran yang sudah punya POS dan sudah sampai di tiga atau empat platform.',
        'Deliverect เป็นแบบนี้: ดึงออร์เดอร์จากทุกแพลตฟอร์มมาไว้ในหน้าจอเดียว ส่งเมนูออกไปยังแต่ละช่องทาง และคอยดูว่าร้านกลายเป็น "ปิด" หรือยัง ตัวมันเองไม่มีระบบแคชเชียร์ แต่ไปยืนข้างแคชเชียร์ของคุณ ให้บริการใน 65 ประเทศขึ้นไป ลูกค้าระดับ KFC, Burger King และ Pizza Hut เป็นเครื่องมือสำหรับร้านที่มี POS อยู่แล้วและมีแพลตฟอร์มถึงสามสี่เจ้า'),
    },
    {
      name: t('POS — касса, склад, отчёты; доставка тут одна из функций', 'A POS — till, stock, reports; delivery is one feature among many', 'POS — kasir, stok, laporan; delivery hanya salah satu fitur', 'POS — แคชเชียร์ สต๊อก รายงาน ส่วนเดลิเวอรีเป็นแค่ฟีเจอร์หนึ่ง'),
      body: t(
        'Moka, Olsera, majoo, ESB, Runchise, StoreHub, в Таиланде FoodStory. Такой софт решает задачу внутри ресторана: пробить чек, списать ингредиенты, закрыть смену, свести отчёт. Интеграция с площадкой полезна, но она не главная и часто ровно одна: Moka подключает GoFood, Olsera — GrabFood. Runchise и ESB подключают все три и целятся в сети.',
        'Moka, Olsera, majoo, ESB, Runchise, StoreHub, and FoodStory in Thailand. This software solves the job inside the restaurant: ring up a bill, deduct ingredients, close the shift, produce the report. Platform integration is useful but it is not the point, and often there is exactly one: Moka connects GoFood, Olsera connects GrabFood. Runchise and ESB connect all three and aim at chains.',
        'Moka, Olsera, majoo, ESB, Runchise, StoreHub, dan FoodStory di Thailand. Software ini menyelesaikan pekerjaan di dalam restoran: mencetak bon, memotong bahan, menutup shift, menyusun laporan. Integrasi platform berguna tetapi bukan intinya, dan sering hanya satu: Moka menghubungkan GoFood, Olsera menghubungkan GrabFood. Runchise dan ESB menghubungkan ketiganya dan membidik jaringan.',
        'Moka, Olsera, majoo, ESB, Runchise, StoreHub และ FoodStory ในไทย ซอฟต์แวร์แบบนี้แก้งานภายในร้าน: ออกบิล ตัดวัตถุดิบ ปิดกะ สรุปรายงาน การเชื่อมกับแพลตฟอร์มมีประโยชน์ แต่ไม่ใช่หัวใจ และบ่อยครั้งมีแค่เจ้าเดียว: Moka เชื่อม GoFood ส่วน Olsera เชื่อม GrabFood ขณะที่ Runchise และ ESB เชื่อมครบสามเจ้าและเล็งไปที่เชนร้าน'),
    },
    {
      name: t('Гибриды — и касса, и агрегация', 'Hybrids — a till and aggregation in one', 'Hibrida — kasir dan agregasi sekaligus', 'ลูกผสม — มีทั้งแคชเชียร์และการรวมออร์เดอร์'),
      body: t(
        'Klikit и Otter. Klikit сделан в Сингапуре, работает в семи странах Азии, обслуживает больше 12 000 точек и проводит свыше 3 млн заказов в месяц; у него полсотни интеграций, свой вебшоп, CRM и AI-агенты. Otter — это бывший Hubster: компания официально объединила бренды, и Hubster теперь называется Otter. Состав похож на Klikit, но тарифы и кейсы у Otter американские, а про Юго-Восточную Азию он на сайте не пишет.',
        'Klikit and Otter. Klikit is built in Singapore, runs in seven Asian countries, serves over 12,000 stores and processes more than 3 million orders a month; it has fifty-odd integrations, its own webshop, a CRM and AI agents. Otter is the former Hubster: the company officially merged the brands, and Hubster is now called Otter. The feature set resembles Klikit, but Otter’s pricing and case studies are American and it says nothing about Southeast Asia on its site.',
        'Klikit dan Otter. Klikit dibuat di Singapura, beroperasi di tujuh negara Asia, melayani lebih dari 12.000 gerai dan memproses lebih dari 3 juta pesanan per bulan; ia punya sekitar lima puluh integrasi, webshop sendiri, CRM, dan agen AI. Otter adalah Hubster yang dulu: perusahaannya resmi menyatukan merek, dan Hubster kini bernama Otter. Fiturnya mirip Klikit, tetapi harga dan studi kasus Otter berbasis Amerika, dan situsnya tidak menyebut Asia Tenggara.',
        'Klikit และ Otter — Klikit สร้างที่สิงคโปร์ ให้บริการในเจ็ดประเทศในเอเชีย ดูแลร้านกว่า 12,000 แห่ง และประมวลผลออร์เดอร์เกิน 3 ล้านรายการต่อเดือน มีการเชื่อมต่อราวห้าสิบเจ้า มีเว็บช็อปของตัวเอง CRM และเอเจนต์ AI ส่วน Otter คือ Hubster เดิม บริษัทรวมแบรนด์อย่างเป็นทางการแล้ว และ Hubster ตอนนี้ชื่อ Otter ฟีเจอร์คล้าย Klikit แต่ราคาและเคสของ Otter เป็นของอเมริกา และเว็บไซต์ไม่พูดถึงเอเชียตะวันออกเฉียงใต้เลย'),
    },
  ];

  /** Справочник: что это на самом деле, что с вашими площадками, сколько стоит. */
  const products: Array<[string, string, string, string]> = [
    ['Deliverect',
     t('Middleware, кассы нет', 'Middleware, no till', 'Middleware, tanpa kasir', 'มิดเดิลแวร์ ไม่มีแคชเชียร์'),
     t('1000+ интеграций, 65+ стран', '1000+ integrations, 65+ countries', '1000+ integrasi, 65+ negara', 'เชื่อมต่อ 1000+ ราย ใน 65+ ประเทศ'),
     t('Цену не публикует', 'Price not published', 'Harga tidak dipublikasikan', 'ไม่เปิดเผยราคา')],
    ['Klikit',
     t('Касса + агрегация + CRM', 'Till + aggregation + CRM', 'Kasir + agregasi + CRM', 'แคชเชียร์ + รวมออร์เดอร์ + CRM'),
     t('GrabFood, GoFood, ShopeeFood и ещё 50+', 'GrabFood, GoFood, ShopeeFood and 50+ more', 'GrabFood, GoFood, ShopeeFood dan 50+ lainnya', 'GrabFood, GoFood, ShopeeFood และอีกกว่า 50 เจ้า'),
     t('от Rp 390 000 за точку в месяц + 0,5–3% с платежей', 'from Rp 390,000 per outlet per month + 0.5–3% of payments', 'mulai Rp 390.000 per outlet per bulan + 0,5–3% dari pembayaran', 'เริ่ม 390,000 รูเปียห์ต่อสาขาต่อเดือน + 0.5–3% ของยอดชำระ')],
    [t('Otter (бывший Hubster)', 'Otter (formerly Hubster)', 'Otter (dahulu Hubster)', 'Otter (เดิมชื่อ Hubster)'),
     t('Касса + агрегация', 'Till + aggregation', 'Kasir + agregasi', 'แคชเชียร์ + รวมออร์เดอร์'),
     t('Uber Eats, DoorDash; GrabFood и GoFood не заявлены', 'Uber Eats, DoorDash; GrabFood and GoFood not listed', 'Uber Eats, DoorDash; GrabFood dan GoFood tidak dicantumkan', 'Uber Eats, DoorDash; ไม่ได้ระบุ GrabFood และ GoFood'),
     t('$79–278 в месяц + комиссии', '$79–278 a month + fees', '$79–278 per bulan + komisi', '$79–278 ต่อเดือน + ค่าธรรมเนียม')],
    ['Runchise',
     t('Касса и управление сетью', 'Till and chain management', 'Kasir dan manajemen jaringan', 'แคชเชียร์และการบริหารเชนร้าน'),
     t('GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood'),
     t('Цену не публикует', 'Price not published', 'Harga tidak dipublikasikan', 'ไม่เปิดเผยราคา')],
    ['Opsfood',
     t('Только мониторинг заказов, в бете', 'Order monitoring only, in beta', 'Hanya pemantauan pesanan, masih beta', 'เฝ้าดูออร์เดอร์อย่างเดียว ยังเป็นเบต้า'),
     t('GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood', 'GrabFood, GoFood, ShopeeFood'),
     t('Индонезия, ранняя стадия', 'Indonesia, early stage', 'Indonesia, tahap awal', 'อินโดนีเซีย ระยะเริ่มต้น')],
    ['Moka POS',
     t('Касса и склад', 'Till and stock', 'Kasir dan stok', 'แคชเชียร์และสต๊อก'),
     t('Только GoFood', 'GoFood only', 'Hanya GoFood', 'เฉพาะ GoFood'),
     t('Rp 299 000 в месяц за точку', 'Rp 299,000 a month per outlet', 'Rp 299.000 per bulan per outlet', '299,000 รูเปียห์ต่อเดือนต่อสาขา')],
    ['Olsera',
     t('Касса и склад', 'Till and stock', 'Kasir dan stok', 'แคชเชียร์และสต๊อก'),
     t('GrabFood в базовых тарифах', 'GrabFood in the base tiers', 'GrabFood di paket dasar', 'GrabFood ในแพ็กเกจพื้นฐาน'),
     t('Rp 1,29–2,69 млн в год', 'Rp 1.29–2.69M a year', 'Rp 1,29–2,69 juta per tahun', '1.29–2.69 ล้านรูเปียห์ต่อปี')],
    ['ESB',
     t('Касса и ERP для сетей', 'Till and ERP for chains', 'Kasir dan ERP untuk jaringan', 'แคชเชียร์และ ERP สำหรับเชนร้าน'),
     t('GoFood, GrabFood, ShopeeFood', 'GoFood, GrabFood, ShopeeFood', 'GoFood, GrabFood, ShopeeFood', 'GoFood, GrabFood, ShopeeFood'),
     t('Цену не публикует', 'Price not published', 'Harga tidak dipublikasikan', 'ไม่เปิดเผยราคา')],
    ['majoo',
     t('Касса, склад, бухгалтерия', 'Till, stock, accounting', 'Kasir, stok, akuntansi', 'แคชเชียร์ สต๊อก บัญชี'),
     t('«Омниканальность», площадки не названы', '"Omnichannel", platforms not named', '"Omnichannel", platform tidak disebut', '"ออมนิแชนเนล" ไม่ได้ระบุแพลตฟอร์ม'),
     t('Цену не публикует', 'Price not published', 'Harga tidak dipublikasikan', 'ไม่เปิดเผยราคา')],
    ['FoodStory',
     t('Касса для iPad', 'iPad till', 'Kasir untuk iPad', 'แคชเชียร์บน iPad'),
     t('LINE MAN; принадлежит LINE MAN Wongnai', 'LINE MAN; owned by LINE MAN Wongnai', 'LINE MAN; dimiliki LINE MAN Wongnai', 'LINE MAN; เป็นของ LINE MAN Wongnai'),
     t('Зависит от типа заведения', 'Depends on venue type', 'Tergantung jenis usaha', 'ขึ้นกับประเภทร้าน')],
    ['Butter POS',
     t('Касса, компания из США', 'Till, a US company', 'Kasir, perusahaan asal AS', 'แคชเชียร์ บริษัทจากสหรัฐฯ'),
     t('Американские площадки', 'US platforms', 'Platform Amerika', 'แพลตฟอร์มอเมริกัน'),
     t('Не для этого рынка', 'Not built for this market', 'Bukan untuk pasar ini', 'ไม่ได้ทำมาเพื่อตลาดนี้')],
  ];

  /** Пары «гигиена / решение» — ровно та граница, которую софт не переходит. */
  const pairs: Array<[string, string]> = [
    [t('Причесать описания у всех позиций разом', 'Tidy up every item description at once', 'Merapikan semua deskripsi item sekaligus', 'จัดคำอธิบายเมนูทั้งหมดให้เรียบร้อยในทีเดียว'),
     t('Понять, что позицию не находят в поиске приложения, и переписать название под запрос', 'Realising an item is invisible in in-app search and rewriting its name around the query', 'Menyadari sebuah item tidak muncul di pencarian aplikasi dan menulis ulang namanya sesuai kata kunci', 'รู้ว่าเมนูไม่ถูกค้นเจอในแอป แล้วเขียนชื่อใหม่ให้ตรงคำค้น')],
    [t('Показать ROAS в дашборде', 'Show ROAS on a dashboard', 'Menampilkan ROAS di dashboard', 'แสดง ROAS บนแดชบอร์ด'),
     t('Увидеть, что вы прошли границу окупаемости на 6% выручки, и снизить ставку', 'Seeing that you are past the payback line at 6% of revenue and cutting the bid', 'Melihat bahwa Anda sudah melewati batas balik modal di 6% omzet dan menurunkan bid', 'เห็นว่าคุณเลยเส้นคุ้มทุนที่ 6% ของยอดขายแล้ว และลดบิดลง')],
    [t('Показать, что позиция выключена', 'Show that an item is switched off', 'Menampilkan bahwa item dinonaktifkan', 'แสดงว่าเมนูถูกปิดอยู่'),
     t('Включить её обратно и разобраться, почему кухня выключает её каждую пятницу', 'Switching it back on and finding out why the kitchen turns it off every Friday', 'Menyalakannya kembali dan mencari tahu kenapa dapur mematikannya setiap Jumat', 'เปิดกลับมาและหาสาเหตุว่าทำไมครัวปิดมันทุกวันศุกร์')],
    [t('Прислать уведомление о новом отзыве на единицу', 'Send a notification about a new one-star review', 'Mengirim notifikasi ulasan bintang satu baru', 'ส่งการแจ้งเตือนรีวิวหนึ่งดาวอันใหม่'),
     t('Подать апелляцию с фактами конкретного заказа — около 80% таких апелляций на Grab заканчиваются снятием отзыва', 'Filing an appeal with the facts of that specific order — around 80% of ours on Grab end with the review removed', 'Mengajukan banding dengan fakta pesanan tersebut — sekitar 80% banding kami di Grab berakhir dengan ulasan dihapus', 'ยื่นอุทธรณ์พร้อมข้อเท็จจริงของออร์เดอร์นั้น ราว 80% ของเราที่ยื่นกับ Grab จบด้วยการลบรีวิว')],
  ];

  /** Сравнение по задачам недели — дополняет таблицу категорий. */
  const taskRows: Array<[string, string, string]> = [
    [t('Меню', 'Menu', 'Menu', 'เมนู'),
     t('Синхронизирует между площадками, может причесать описания', 'Syncs it across platforms, can tidy descriptions', 'Menyinkronkan antar platform, bisa merapikan deskripsi', 'ซิงก์ระหว่างแพลตฟอร์ม และจัดคำอธิบายให้เรียบร้อยได้'),
     t('Решаем, как позиция называется под поиск, в какой категории лежит, какое фото и цена', 'We decide how an item is named for search, which category it sits in, which photo and which price', 'Kami memutuskan nama item untuk pencarian, kategorinya, fotonya, dan harganya', 'เราตัดสินว่าเมนูควรชื่ออะไรเพื่อการค้นหา อยู่หมวดไหน ใช้รูปใด และราคาเท่าไร')],
    [t('Реклама', 'Ads', 'Iklan', 'โฆษณา'),
     t('Показывает ROAS в отчёте', 'Shows ROAS in a report', 'Menampilkan ROAS di laporan', 'แสดง ROAS ในรายงาน'),
     t('Ведём ставки и бюджет каждую неделю. Медиана флота — 10.4x на Бали и 22.8x на Пхукете', 'We run bids and budget weekly. Fleet medians: 10.4x in Bali, 22.8x in Phuket', 'Kami mengatur bid dan anggaran tiap minggu. Median portofolio: 10.4x di Bali, 22.8x di Phuket', 'เราดูแลบิดและงบทุกสัปดาห์ ค่ามัธยฐานของร้านที่เราดูแล 10.4 เท่าที่บาหลี และ 22.8 เท่าที่ภูเก็ต')],
    [t('Промо', 'Promos', 'Promo', 'โปรโมชัน'),
     t('Ничего: после интеграции промо остаются в кабинете площадки', 'Nothing: after integration promos stay in the platform dashboard', 'Tidak ada: setelah integrasi, promo tetap di dashboard platform', 'ไม่มี: หลังเชื่อมต่อแล้ว โปรโมชันยังอยู่ในหลังบ้านของแพลตฟอร์ม'),
     t('Считаем экономику каждого промо и выключаем убыточные', 'We work out the economics of each promo and switch off the loss-makers', 'Kami menghitung ekonomi tiap promo dan mematikan yang merugi', 'เราคำนวณเศรษฐศาสตร์ของแต่ละโปรโมชันและปิดตัวที่ขาดทุน')],
    [t('Стоп-лист', 'Stop-list', 'Item nonaktif', 'สต็อปลิสต์'),
     t('Показывает, что позиция выключена', 'Shows that an item is off', 'Menampilkan item yang mati', 'แสดงว่าเมนูถูกปิด'),
     t('Включаем обратно и убираем причину — это 95% всех потерь выручки', 'We switch it back on and remove the cause — that is 95% of all revenue losses', 'Kami menyalakannya kembali dan menghapus penyebabnya — itu 95% dari seluruh kehilangan omzet', 'เราเปิดกลับและกำจัดต้นเหตุ ซึ่งคิดเป็น 95% ของความสูญเสียทั้งหมด')],
    [t('Отзывы', 'Reviews', 'Ulasan', 'รีวิว'),
     t('Присылает уведомление', 'Sends a notification', 'Mengirim notifikasi', 'ส่งการแจ้งเตือน'),
     t('Подаём апелляции; около 80% заканчиваются снятием отзыва', 'We file appeals; around 80% end with the review removed', 'Kami mengajukan banding; sekitar 80% berakhir dengan ulasan dihapus', 'เรายื่นอุทธรณ์ ราว 80% จบด้วยการลบรีวิว')],
    [t('Нормы', 'Benchmarks', 'Tolok ukur', 'ค่ามาตรฐาน'),
     t('Сравнивает вас с вами же в прошлом месяце', 'Compares you with yourself last month', 'Membandingkan Anda dengan diri Anda bulan lalu', 'เทียบคุณกับตัวคุณเองเมื่อเดือนที่แล้ว'),
     t('Сравниваем с медианами по 96 ресторанам и 270 568 заказам — они опубликованы', 'We compare against medians from 96 restaurants and 270,568 orders — published openly', 'Kami membandingkan dengan median 96 restoran dan 270.568 pesanan — diterbitkan terbuka', 'เราเทียบกับค่ามัธยฐานจากร้าน 96 แห่งและ 270,568 ออร์เดอร์ ซึ่งเผยแพร่ไว้แล้ว')],
    [t('Ответственность', 'Accountability', 'Tanggung jawab', 'ความรับผิดชอบ'),
     t('Аптайм интеграции', 'Integration uptime', 'Uptime integrasi', 'ความเสถียรของการเชื่อมต่อ'),
     t('Выручка. 10% от неё, без предоплаты', 'Revenue. 10% of it, no upfront payment', 'Omzet. 10% darinya, tanpa uang muka', 'ยอดขาย คิด 10% ของมัน ไม่มีค่าใช้จ่ายล่วงหน้า')],
  ];

  /** Чек-лист покупателя. Не аргумент против софта — им пользуемся сами. */
  const checklist: Array<[string, string]> = [
    [t('Какие площадки он поддерживает — не «50+», а ваши две?', 'Which platforms does it support — not "50+", but your two?', 'Platform mana yang didukung — bukan "50+", tapi dua milik Anda?', 'รองรับแพลตฟอร์มไหน ไม่ใช่ "50+" แต่สองเจ้าของคุณ'),
     t('У Moka это GoFood, у Olsera — GrabFood. Цифра на главной не означает, что в вашей стране включены обе ваши.', 'For Moka it is GoFood, for Olsera GrabFood. The number on the homepage does not mean both of yours are live in your country.', 'Untuk Moka itu GoFood, untuk Olsera GrabFood. Angka di beranda tidak berarti kedua platform Anda aktif di negara Anda.', 'Moka คือ GoFood ส่วน Olsera คือ GrabFood ตัวเลขบนหน้าแรกไม่ได้แปลว่าสองเจ้าของคุณเปิดใช้ในประเทศคุณ')],
    [t('Где после интеграции живут меню и промо?', 'Where do the menu and the promos live after integration?', 'Setelah integrasi, menu dan promo tinggal di mana?', 'หลังเชื่อมต่อแล้ว เมนูและโปรโมชันอยู่ที่ไหน'),
     t('Обычно меню переезжает в софт, а промо и реклама остаются в кабинете площадки. Значит, кабинет всё равно кто-то должен открывать каждую неделю.', 'Usually the menu moves into the software while promos and ads stay in the platform dashboard. Which means someone still has to open that dashboard every week.', 'Biasanya menu pindah ke software, sementara promo dan iklan tetap di dashboard platform. Artinya dashboard itu tetap harus dibuka seseorang setiap minggu.', 'ปกติเมนูจะย้ายเข้าไปในซอฟต์แวร์ ส่วนโปรโมชันและโฆษณายังอยู่ในหลังบ้านของแพลตฟอร์ม แปลว่ายังต้องมีคนเปิดหลังบ้านนั้นทุกสัปดาห์อยู่ดี')],
    [t('Сколько это стоит целиком?', 'What does it cost in full?', 'Berapa biayanya secara keseluruhan?', 'ราคารวมทั้งหมดเท่าไร'),
     t('Подписка за точку — не вся цена. Процент с платежей, плата за каждую интеграцию, железо, минимальный платёж.', 'The per-outlet subscription is not the whole price. A percentage of payments, a fee per integration, hardware, a monthly minimum.', 'Langganan per outlet bukan seluruh harganya. Ada persentase dari pembayaran, biaya per integrasi, perangkat keras, dan minimum bulanan.', 'ค่าสมาชิกต่อสาขาไม่ใช่ราคาทั้งหมด ยังมีเปอร์เซ็นต์จากยอดชำระ ค่าเชื่อมต่อแต่ละเจ้า ค่าอุปกรณ์ และยอดขั้นต่ำรายเดือน')],
    [t('Что будет, если отключить?', 'What happens if you switch it off?', 'Apa yang terjadi kalau dimatikan?', 'ถ้าปิดการเชื่อมต่อจะเกิดอะไรขึ้น'),
     t('У Moka меню на GoFood замирает на последней синхронизации, и собирать его придётся руками. Это стоит узнать до, а не после.', 'With Moka your GoFood menu freezes at the last sync and you rebuild it by hand. Worth knowing before, not after.', 'Dengan Moka, menu GoFood Anda membeku pada sinkronisasi terakhir dan harus disusun ulang manual. Lebih baik tahu sebelumnya.', 'กับ Moka เมนูบน GoFood จะค้างอยู่ที่การซิงก์ครั้งสุดท้าย และต้องมาจัดใหม่เอง ควรรู้ก่อน ไม่ใช่หลัง')],
    [t('Кто чинит в восемь вечера в субботу?', 'Who fixes it at eight on a Saturday evening?', 'Siapa yang memperbaiki jam delapan malam di hari Sabtu?', 'ใครแก้ให้ตอนสองทุ่มวันเสาร์'),
     t('Есть ли местная команда и на каком языке отвечает поддержка. Вендоры уходят с рынка тихо и меняют имена: Hubster теперь Otter, а его старый индонезийский сайт уже не открывается.', 'Is there a local team and what language does support answer in. Vendors leave markets quietly and change names: Hubster is now Otter, and its old Indonesian site no longer opens.', 'Apakah ada tim lokal dan dalam bahasa apa dukungan menjawab. Vendor meninggalkan pasar diam-diam dan berganti nama: Hubster kini Otter, dan situs Indonesia lamanya sudah tidak terbuka.', 'มีทีมในพื้นที่ไหม และซัพพอร์ตตอบภาษาอะไร ผู้ให้บริการถอนตัวจากตลาดอย่างเงียบ ๆ และเปลี่ยนชื่อได้: Hubster ตอนนี้คือ Otter และเว็บไซต์อินโดนีเซียเดิมก็เปิดไม่ได้แล้ว')],
  ];

  const rows



: Array<[string, string, string]> = [
    [
      t('Что это', 'What it is', 'Apa ini', 'มันคืออะไร'),
      t('Софт по подписке. Middleware между площадками и вашей кухней.',
        'Subscription software. Middleware between the apps and your kitchen.', 'Software berlangganan. Middleware antara aplikasi dan dapur Anda.', 'ซอฟต์แวร์แบบสมาชิกรายเดือน ทำหน้าที่เป็นตัวกลางระหว่างแอปกับครัวของคุณ'),
      t('Люди. Команда, которая ведёт ваши аккаунты вместо вас.',
        'People. A team that runs your accounts for you.', 'Orang. Tim yang menjalankan akun Anda untuk Anda.', 'คน ทีมงานที่เข้าไปดูแลบัญชีให้คุณ'),
    ],
    [
      t('Главная задача', 'Core job', 'Tugas utama', 'งานหลัก'),
      t('Убрать 3 планшета со стойки: заказы и меню — в одном окне, синхрон с POS.',
        'Get three tablets off the counter: orders and menus in one window, synced to your POS.', 'Menyingkirkan tiga tablet dari meja kasir: pesanan dan menu dalam satu jendela, tersinkron dengan POS Anda.', 'เอาแท็บเล็ตสามเครื่องออกจากเคาน์เตอร์ รวมออร์เดอร์และเมนูไว้ในหน้าจอเดียว ซิงก์กับ POS ของคุณ'),
      t('Поднять выручку доставки: ранжирование, конверсия карточки, экономика промо, реклама.',
        'Grow delivery revenue: ranking, listing conversion, promo economics, ads.', 'Menumbuhkan omzet delivery: peringkat, konversi halaman toko, ekonomi promo, iklan.', 'เพิ่มยอดขายเดลิเวอรี ทั้งอันดับ การเปลี่ยนคนดูเป็นออร์เดอร์ เศรษฐศาสตร์ของโปรโมชัน และโฆษณา'),
    ],
    [
      t('Кто принимает решения', 'Who decides', 'Siapa yang memutuskan', 'ใครเป็นคนตัดสินใจ'),
      t('Вы. Софт исполняет то, что вы в него завели.',
        'You. The software executes what you configure.', 'Anda. Software menjalankan apa yang Anda atur.', 'คุณ ซอฟต์แวร์ทำตามที่คุณตั้งค่าไว้'),
      t('Агентство. Решения по ставкам, промо, меню и ответам на отзывы — на нашей стороне.',
        'The agency. Bids, promos, menu and review replies are our call.', 'Agensi. Bid, promo, menu, dan balasan ulasan ada di tangan kami.', 'เอเจนซี ทั้งการบิด โปรโมชัน เมนู และการตอบรีวิว เป็นการตัดสินใจของเรา'),
    ],
    [
      t('Отвечает за результат', 'Owns the outcome', 'Bertanggung jawab atas hasil', 'ใครรับผิดชอบผลลัพธ์'),
      t('За аптайм интеграции. Выручка — вне зоны ответственности.',
        'Integration uptime. Revenue is out of scope.', 'Uptime integrasi. Omzet di luar tanggung jawabnya.', 'ความเสถียรของการเชื่อมต่อ ยอดขายไม่อยู่ในขอบเขต'),
      t('За выручку. У нас оплата 10% от выручки доставки — растёт она, растём мы.',
        'Revenue. We are paid 10% of delivery revenue — it grows, we grow.', 'Omzet. Kami dibayar 10% dari omzet delivery — omzet naik, kami ikut naik.', 'ยอดขาย เราได้ค่าตอบแทน 10% ของยอดขายเดลิเวอรี ยอดโต เราก็โตด้วย'),
    ],
    [
      t('Стоимость', 'Pricing', 'Biaya', 'ค่าบริการ'),
      t('Фиксированная подписка, платится независимо от результата.',
        'A fixed subscription, paid regardless of results.', 'Langganan tetap, dibayar terlepas dari hasilnya.', 'ค่าสมาชิกคงที่ จ่ายเท่ากันไม่ว่าผลจะเป็นอย่างไร'),
      t('10% от выручки доставки, без предоплаты.',
        '10% of delivery revenue, no upfront fee.', '10% dari omzet delivery, tanpa biaya di muka.', '10% ของยอดขายเดลิเวอรี ไม่มีค่าใช้จ่ายล่วงหน้า'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Чем Klikit отличается от Moka или Deliverect — это же всё софт?',
        'How is Klikit different from Moka or Deliverect — isn’t it all just software?',
        'Apa bedanya Klikit dengan Moka atau Deliverect — bukankah semuanya software?', 'Klikit ต่างจาก Moka หรือ Deliverect อย่างไร ก็ซอฟต์แวร์เหมือนกันไม่ใช่หรือ'),
      t('Разные категории. Deliverect — middleware: сводит заказы и меню с площадок, своей кассы у него нет, он встаёт рядом с вашей. Moka, Olsera, majoo, ESB, Runchise — это POS: касса, склад, отчёты, а интеграция с доставкой одна из функций и часто ровно одна платформа (Moka — GoFood, Olsera — GrabFood). Klikit и Otter — гибриды: и касса, и агрегация полусотни платформ, и CRM с маркетинговыми модулями. Выбирать надо от того, что у вас болит: три планшета на стойке, касса и склад — или всё сразу. Ни одна из трёх категорий не занимается ставками, промо-экономикой и апелляциями: это работа человека в кабинете площадки.',
        'Different categories. Deliverect is middleware: it merges orders and menus from the platforms, has no till of its own and sits beside yours. Moka, Olsera, majoo, ESB and Runchise are POS systems: till, stock, reports, with delivery integration as one feature and often exactly one platform (Moka — GoFood, Olsera — GrabFood). Klikit and Otter are hybrids: a till, aggregation across fifty-odd platforms, and CRM with marketing modules. Choose by what actually hurts: three tablets on the counter, the till and stock, or all of it. None of the three categories handles bids, promo economics or appeals — that is a person working inside the platform dashboard.',
        'Kategori yang berbeda. Deliverect adalah middleware: menyatukan pesanan dan menu dari platform, tidak punya kasir sendiri, dan berdiri di samping kasir Anda. Moka, Olsera, majoo, ESB, dan Runchise adalah POS: kasir, stok, laporan, dengan integrasi delivery sebagai salah satu fitur dan sering hanya satu platform (Moka — GoFood, Olsera — GrabFood). Klikit dan Otter adalah hibrida: kasir, agregasi lima puluhan platform, plus CRM dengan modul pemasaran. Pilih berdasarkan apa yang benar-benar sakit: tiga tablet di meja kasir, kasir dan stok, atau semuanya. Tidak satu pun dari ketiga kategori itu mengurus bid, ekonomi promo, atau banding — itu pekerjaan manusia di dalam dashboard platform.',
        'คนละประเภทกัน Deliverect คือมิดเดิลแวร์: รวมออร์เดอร์และเมนูจากแพลตฟอร์ม ไม่มีระบบแคชเชียร์ของตัวเอง และไปยืนข้างแคชเชียร์ของคุณ ส่วน Moka, Olsera, majoo, ESB และ Runchise คือ POS: แคชเชียร์ สต๊อก รายงาน โดยการเชื่อมเดลิเวอรีเป็นเพียงฟีเจอร์หนึ่ง และมักมีแค่แพลตฟอร์มเดียว (Moka คือ GoFood, Olsera คือ GrabFood) ขณะที่ Klikit และ Otter เป็นลูกผสม: มีทั้งแคชเชียร์ การรวมออร์เดอร์กว่าห้าสิบแพลตฟอร์ม และ CRM พร้อมโมดูลการตลาด เลือกจากสิ่งที่เจ็บจริง: แท็บเล็ตสามเครื่องบนเคาน์เตอร์ แคชเชียร์กับสต๊อก หรือทั้งหมด แต่ไม่มีประเภทไหนในสามอย่างนี้ที่ดูแลบิด เศรษฐศาสตร์โปรโมชัน หรือการอุทธรณ์ นั่นคืองานของคนในหลังบ้านแพลตฟอร์ม'),
    ],
    [
      t('Сколько на самом деле стоит такой софт?',
        'What does this software actually cost?',
        'Berapa sebenarnya biaya software seperti ini?', 'ซอฟต์แวร์แบบนี้ราคาจริง ๆ เท่าไร'),
      t('Смотрите не на строчку «от», а на всю конструкцию. Moka — Rp 299 000 в месяц за точку. Olsera — Rp 1,29–2,69 млн в год. Klikit — от Rp 390 000 за точку в месяц плюс 0,5–3% с проведённых платежей, то есть частично это процент, а не подписка. Otter — $79–278 в месяц плюс комиссии и минимальный платёж $100 в месяц при обороте ниже $25 000. Deliverect, ESB, majoo, StoreHub и Runchise цену не публикуют вообще. Отдельно спрашивайте про плату за каждую интеграцию и за железо. Проверено в сентябре 2026 года.',
        'Look past the "from" line at the whole structure. Moka is Rp 299,000 a month per outlet. Olsera is Rp 1.29–2.69M a year. Klikit starts at Rp 390,000 per outlet per month plus 0.5–3% of processed payments — so part of it is a percentage, not a subscription. Otter is $79–278 a month plus fees and a $100 monthly minimum if volume is under $25,000. Deliverect, ESB, majoo, StoreHub and Runchise do not publish prices at all. Ask separately about a fee per integration and about hardware. Checked September 2026.',
        'Jangan lihat baris "mulai dari", lihat seluruh strukturnya. Moka Rp 299.000 per bulan per outlet. Olsera Rp 1,29–2,69 juta per tahun. Klikit mulai Rp 390.000 per outlet per bulan plus 0,5–3% dari pembayaran yang diproses — jadi sebagian adalah persentase, bukan langganan. Otter $79–278 per bulan plus komisi dan minimum $100 per bulan jika volume di bawah $25.000. Deliverect, ESB, majoo, StoreHub, dan Runchise sama sekali tidak mempublikasikan harga. Tanyakan terpisah soal biaya per integrasi dan perangkat keras. Diperiksa September 2026.',
        'อย่าดูแค่บรรทัด "เริ่มต้นที่" ให้ดูโครงสร้างทั้งหมด Moka อยู่ที่ 299,000 รูเปียห์ต่อเดือนต่อสาขา Olsera อยู่ที่ 1.29–2.69 ล้านรูเปียห์ต่อปี Klikit เริ่มที่ 390,000 รูเปียห์ต่อสาขาต่อเดือน บวก 0.5–3% ของยอดชำระที่ประมวลผล แปลว่าบางส่วนเป็นเปอร์เซ็นต์ ไม่ใช่ค่าสมาชิก ส่วน Otter อยู่ที่ $79–278 ต่อเดือน บวกค่าธรรมเนียม และขั้นต่ำ $100 ต่อเดือนหากยอดต่ำกว่า $25,000 ขณะที่ Deliverect, ESB, majoo, StoreHub และ Runchise ไม่เปิดเผยราคาเลย ให้ถามแยกเรื่องค่าเชื่อมต่อแต่ละเจ้าและค่าอุปกรณ์ ตรวจสอบเมื่อกันยายน 2026'),
    ],
    [
      t('Если поставить POS от самой площадки — этого хватит?',
        'If I install the platform’s own POS, is that enough?',
        'Kalau saya pasang POS dari platformnya sendiri, apakah cukup?', 'ถ้าลง POS ของแพลตฟอร์มเอง พอไหม'),
      t('Для кассы хватит, но учитывайте, чей он. Gojek купил Moka примерно за $130 млн в 2020 году, и Moka подключает GoFood; в Таиланде FoodStory принадлежит LINE MAN Wongnai и подключает LINE MAN. Такая касса отлично соединена со своей площадкой и никак — с соседней, а на Бали большинство ресторанов живёт на двух сразу. И в любом случае реклама и промо останутся в кабинете площадки: это написано прямым текстом в справке самой Moka.',
        'For a till, yes, but be aware whose it is. Gojek bought Moka for around $130M in 2020, and Moka connects GoFood; in Thailand FoodStory belongs to LINE MAN Wongnai and connects LINE MAN. Such a till is beautifully connected to its own platform and not at all to the one next door — and in Bali most restaurants live on both at once. Either way ads and promos stay in the platform dashboard: Moka’s own help centre says so in plain words.',
        'Untuk kasir, cukup, tetapi perhatikan itu milik siapa. Gojek membeli Moka sekitar $130 juta pada 2020, dan Moka menghubungkan GoFood; di Thailand FoodStory milik LINE MAN Wongnai dan menghubungkan LINE MAN. Kasir seperti itu terhubung sempurna ke platformnya sendiri dan sama sekali tidak ke tetangganya — padahal di Bali sebagian besar restoran hidup di keduanya sekaligus. Bagaimanapun juga, iklan dan promo tetap di dashboard platform: pusat bantuan Moka sendiri menyatakannya dengan jelas.',
        'สำหรับงานแคชเชียร์ก็พอ แต่ต้องรู้ว่ามันเป็นของใคร Gojek ซื้อ Moka ด้วยเงินราว 130 ล้านดอลลาร์ในปี 2020 และ Moka เชื่อมกับ GoFood ส่วนที่ไทย FoodStory เป็นของ LINE MAN Wongnai และเชื่อมกับ LINE MAN แคชเชียร์แบบนี้เชื่อมกับแพลตฟอร์มของตัวเองได้ดีเยี่ยม แต่ไม่เชื่อมกับเจ้าข้าง ๆ เลย ขณะที่ในบาหลี ร้านส่วนใหญ่อยู่บนทั้งสองเจ้าพร้อมกัน และไม่ว่าจะอย่างไร โฆษณากับโปรโมชันก็ยังอยู่ในหลังบ้านของแพลตฟอร์ม ซึ่งศูนย์ช่วยเหลือของ Moka เองเขียนไว้ตรง ๆ'),
    ],
    [
      t('Мне нужен Klikit или всё-таки нужно агентство?',
        'Do I need Klikit, or do I actually need an agency?', 'Saya butuh Klikit, atau sebenarnya butuh agensi?', 'ร้านต้องการ Klikit หรือจริง ๆ แล้วต้องการเอเจนซี'),
      t('Это разные категории, а не альтернативы. Агрегатор нужен, когда у вас несколько площадок и хаос с планшетами и меню. Агентство нужно, когда заказов мало или выручка не растёт. Если проблема в операционке — берите софт. Если в продажах — софт её не решит.',
        'They are different categories, not alternatives. You need an aggregator when several platforms create tablet and menu chaos. You need an agency when orders are low or revenue is flat. If the problem is operations, buy software. If it is sales, software will not fix it.', 'Keduanya kategori yang berbeda, bukan alternatif satu sama lain. Agregator dibutuhkan ketika beberapa platform membuat kekacauan tablet dan menu. Agensi dibutuhkan ketika pesanan sedikit atau omzet tidak tumbuh. Kalau masalahnya operasional, beli software. Kalau masalahnya penjualan, software tidak akan menyelesaikannya.', 'สองอย่างนี้เป็นคนละประเภท ไม่ใช่ทางเลือกแทนกัน คุณต้องการซอฟต์แวร์รวมออร์เดอร์เมื่อหลายแพลตฟอร์มทำให้แท็บเล็ตและเมนูวุ่นวาย คุณต้องการเอเจนซีเมื่อออร์เดอร์น้อยหรือยอดขายนิ่ง ถ้าปัญหาอยู่ที่งานหน้างาน ให้ซื้อซอฟต์แวร์ ถ้าปัญหาอยู่ที่การขาย ซอฟต์แวร์แก้ไม่ได้'),
    ],
    [
      t('Могу я пользоваться и софтом, и агентством сразу?',
        'Can I use the software and an agency at the same time?', 'Bisakah saya pakai software dan agensi sekaligus?', 'ใช้ซอฟต์แวร์และเอเจนซีพร้อมกันได้ไหม'),
      t('Да, и у части наших клиентов агрегатор стоит параллельно. Мы работаем внутри GrabMerchant и GoBiz, поэтому совместимы с любым POS и любым агрегатором заказов.',
        'Yes — some of our clients run an aggregator in parallel. We work inside GrabMerchant and GoBiz, so we are compatible with any POS and any order aggregator.', 'Bisa — sebagian klien kami memakai agregator secara paralel. Kami bekerja di dalam GrabMerchant dan GoBiz, jadi kami kompatibel dengan POS apa pun dan agregator pesanan apa pun.', 'ได้ ลูกค้าบางรายของเราใช้ซอฟต์แวร์รวมออร์เดอร์ควบคู่ไปด้วย เราทำงานอยู่ใน GrabMerchant และ GoBiz จึงเข้ากันได้กับ POS ทุกตัวและซอฟต์แวร์รวมออร์เดอร์ทุกเจ้า'),
    ],
    [
      t('У меня меню уже синхронизируется — этого разве мало?',
        'My menu already syncs everywhere — isn’t that enough?', 'Menu saya sudah tersinkron di mana-mana — apa belum cukup?', 'เมนูของเราซิงก์ทุกที่อยู่แล้ว แค่นี้ยังไม่พอหรือ'),
      t('Нет. Синхронизация переносит ваше меню на площадки как есть. Оптимизация — это решение, как позиция называется, в какой категории лежит, какое фото стоит и какая цена. Синхрон копирует; оптимизация меняет то, что копируется.',
        'No. Syncing copies your menu to the apps as-is. Optimization decides what an item is called, which category it sits in, which photo it uses and what it costs. Sync copies; optimization changes what gets copied.', 'Bukan. Sinkronisasi menyalin menu Anda ke aplikasi apa adanya. Optimasi memutuskan sebuah item diberi nama apa, masuk kategori mana, memakai foto yang mana, dan dihargai berapa. Sinkronisasi menyalin; optimasi mengubah apa yang disalin.', 'ไม่พอ การซิงก์คือการคัดลอกเมนูของคุณไปยังแอปตามที่เป็นอยู่ ส่วนการปรับแต่งคือการตัดสินใจว่าเมนูควรชื่ออะไร อยู่หมวดไหน ใช้รูปไหน และราคาเท่าไร การซิงก์คัดลอก การปรับแต่งเปลี่ยนสิ่งที่ถูกคัดลอก'),
    ],
    [
      t('Что вы сделаете с моим аккаунтом, чего не сделает софт?',
        'What will you do with my account that software will not?', 'Apa yang kalian lakukan di akun saya yang tidak dilakukan software?', 'คุณจะทำอะไรกับบัญชีของเรา ที่ซอฟต์แวร์ทำไม่ได้'),
      t('Решения на основании суждения: какое промо уходит в минус, а какое окупается; почему упало ранжирование на этой неделе; какую позицию поднять в выдаче приложения; как ответить на несправедливый отзыв, чтобы его сняли. Это не настройки, это работа с данными кабинета каждую неделю.',
        'Judgement calls: which promo loses money and which pays back; why ranking dropped this week; which item to push in in-app search; how to answer an unfair review so it gets removed. These are not settings — it is weekly work with the dashboard data.', 'Keputusan yang butuh penilaian: promo mana yang merugi dan mana yang balik modal; kenapa peringkat turun minggu ini; item mana yang perlu didorong di pencarian aplikasi; bagaimana menjawab ulasan tidak adil agar dihapus. Ini bukan pengaturan — ini pekerjaan mingguan dengan data dashboard.', 'การตัดสินใจ: โปรไหนขาดทุนและโปรไหนคุ้ม ทำไมอันดับตกในสัปดาห์นี้ ควรดันเมนูไหนในการค้นหาบนแอป และควรตอบรีวิวที่ไม่เป็นธรรมอย่างไรให้ถูกลบออก สิ่งเหล่านี้ไม่ใช่การตั้งค่า แต่คืองานรายสัปดาห์กับข้อมูลในหลังบ้าน'),
    ],
  ];

  /** Что видно в кабинете ресторана, у которого интеграция настроена идеально:
   *  все эти цифры софт показывает — и ни одну из них не чинит. */
  const findings: Array<[string, string]> = [
    [
      t('Позиции выключены — и интеграция честно это показывает',
        'Items are switched off — and the integration honestly shows it',
        'Item dimatikan — dan integrasi menampilkannya dengan jujur', 'เมนูถูกปิดอยู่ และระบบเชื่อมต่อก็แสดงผลอย่างซื่อสัตย์'),
      t('Мы регулярно открываем кабинет и видим 40–70 выключенных позиций одновременно, а отдельные блюда висят в стопе больше 2000 часов. Синхронизация меню при этом работает исправно: она аккуратно переносит на площадки меню, в котором этих позиций нет.',
        'We routinely open a dashboard and find 40–70 items switched off at once, with individual dishes stuck in the stop-list for over 2,000 hours. The menu sync is working perfectly all the while: it faithfully pushes to the apps a menu those items are missing from.',
        'Kami rutin membuka dashboard dan menemukan 40–70 item nonaktif sekaligus, dengan beberapa hidangan tertahan di stop-list lebih dari 2.000 jam. Sementara itu sinkronisasi menu bekerja sempurna: ia dengan setia mengirim ke aplikasi sebuah menu yang justru kehilangan item-item itu.', 'เราเปิดหลังบ้านแล้วเจอเมนูถูกปิดพร้อมกัน 40-70 รายการเป็นเรื่องปกติ และบางเมนูค้างในสต็อปลิสต์เกิน 2,000 ชั่วโมง ระหว่างนั้นการซิงก์เมนูทำงานได้สมบูรณ์แบบ: มันส่งเมนูที่ไม่มีรายการเหล่านั้นไปยังแอปอย่างซื่อตรง'),
    ],
    [
      t('25% выручки утекает, и цифра эта в дашборде есть',
        '25% of revenue leaks, and that number is right there in the dashboard',
        '25% omzet bocor, dan angka itu ada di dashboard', 'ยอดขาย 25% รั่วไหล และตัวเลขนั้นอยู่ในหลังบ้านให้เห็นอยู่แล้ว'),
      t('95% этих потерь — выключенные позиции, 3% — закрытый ресторан, 2% — отмены. Ни одно из этих чисел не спрятано. Граница между софтом и агентством проходит ровно здесь: показать цифру умеет отчёт, включить позиции обратно — только человек.',
        '95% of that loss is switched-off items, 3% a closed restaurant, 2% cancellations. None of these numbers is hidden. The line between software and an agency runs exactly here: a report can show the number, only a person switches the items back on.',
        '95% kerugian itu adalah item yang dimatikan, 3% restoran tutup, 2% pembatalan. Tidak satu pun angka ini disembunyikan. Batas antara software dan agensi ada persis di sini: laporan bisa menampilkan angkanya, hanya manusia yang menghidupkan kembali itemnya.', '95% ของส่วนที่หายคือเมนูที่ถูกปิด อีก 3% คือร้านปิด และ 2% คือการยกเลิก ไม่มีตัวเลขไหนถูกซ่อน เส้นแบ่งระหว่างซอฟต์แวร์กับเอเจนซีอยู่ตรงนี้พอดี: รายงานแสดงตัวเลขได้ แต่คนเท่านั้นที่เปิดเมนูกลับ'),
    ],
    [
      t('Реклама за границей окупаемости, а ROAS виден всем',
        'Ads are past the payback line, and the ROAS is visible to everyone',
        'Iklan sudah melewati batas balik modal, dan ROAS-nya terlihat semua orang', 'โฆษณาเลยจุดคุ้มทุนไปแล้ว และ ROAS ก็เห็นกันทุกคน'),
      t('Реклама перестаёт окупаться примерно на 6% выручки: до этой границы медианный ROAS 12.1x, после — 8.6x, и за ней уже 42% ресторанов нашего флота. Любой дашборд покажет вам оба числа; снизить ставку и пересобрать кампанию — это решение, а не отчёт.',
        'Ads stop paying back at roughly 6% of revenue: below that line the median ROAS is 12.1x, above it 8.6x, and 42% of the restaurants in our fleet are already past it. Any dashboard will show you both numbers; lowering the bid and rebuilding the campaign is a decision, not a report.',
        'Iklan berhenti balik modal di sekitar 6% dari omzet: di bawah batas itu ROAS median 12.1x, di atasnya 8.6x, dan 42% restoran di portofolio kami sudah melewatinya. Dashboard mana pun akan menunjukkan kedua angka itu; menurunkan bid dan merombak kampanye adalah keputusan, bukan laporan.', 'โฆษณาหยุดคุ้มทุนที่ราว 6% ของยอดขาย ต่ำกว่าเส้นนี้ ROAS มัธยฐานอยู่ที่ 12.1 เท่า สูงกว่านั้นเหลือ 8.6 เท่า และร้าน 42% ที่เราดูแลเลยเส้นนี้ไปแล้ว หลังบ้านไหนก็แสดงตัวเลขทั้งสองให้คุณดูได้ แต่การลดบิดและรื้อแคมเปญใหม่คือการตัดสินใจ ไม่ใช่รายงาน'),
    ],
    [
      t('Единицы в отзывах, которые можно было снять',
        'One-star reviews that could have been removed',
        'Ulasan bintang satu yang sebenarnya bisa dihapus', 'รีวิวหนึ่งดาวที่จริง ๆ แล้วลบออกได้'),
      t('Отзывы бимодальны: 51% пятёрок, 28% единиц, четвёрок всего 3% — рейтинг делают крайности. Медиана Бали — один негативный отзыв на 138 заказов. Около 80% апелляций, которые мы подаём на Grab, заканчиваются снятием отзыва; эту кнопку не нажимает ни один агрегатор, потому что это не интеграция, а аргумент.',
        'Reviews are bimodal: 51% five-stars, 28% one-stars, only 3% fours — the extremes make the rating. The Bali median is one negative review per 138 orders. Around 80% of the appeals we file with Grab end with the review removed; no aggregator presses that button, because it is not an integration, it is an argument.',
        'Ulasan bersifat bimodal: 51% bintang lima, 28% bintang satu, bintang empat hanya 3% — yang membentuk rating adalah ekstremnya. Median Bali adalah satu ulasan negatif per 138 pesanan. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus; tidak ada agregator yang menekan tombol itu, karena ini bukan integrasi, melainkan argumentasi.', 'รีวิวกระจุกอยู่สองขั้ว: ห้าดาว 51% หนึ่งดาว 28% สี่ดาวแค่ 3% ขั้วสองข้างเป็นตัวกำหนดเรตติ้ง ค่ามัธยฐานบาหลีคือรีวิวลบหนึ่งครั้งต่อ 138 ออร์เดอร์ การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว แต่ไม่มีซอฟต์แวร์รวมออร์เดอร์เจ้าไหนกดปุ่มนั้น เพราะมันไม่ใช่การเชื่อมต่อระบบ มันคือการโต้แย้ง'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Софт или агентство: что из Klikit, Runchise, Moka и Deliverect растит продажи на GrabFood и GoFood?',
            'Software or an agency: which of Klikit, Runchise, Moka and Deliverect actually grows GrabFood and GoFood sales?',
            'Software atau agensi: dari Klikit, Runchise, Moka, dan Deliverect, mana yang benar-benar menumbuhkan omzet GrabFood dan GoFood?',
            'ซอฟต์แวร์หรือเอเจนซี: ระหว่าง Klikit, Runchise, Moka และ Deliverect อันไหนทำให้ยอดขายบน GrabFood และ GoFood โตจริง')}
      lead={t(
        'Короткий ответ: ни один из них не растит продажи, и это не упрёк софту — это описание того, что он делает. Под словом «софт» скрываются три разные вещи: middleware вроде Deliverect, которое сводит заказы и меню и не имеет кассы; POS вроде Moka, Olsera, ESB или Runchise, где касса главная, а доставка — одна из интеграций; и гибриды вроде Klikit и Otter, где есть и то и другое. Все они убирают хаос в операциях. Ни один из них не двигает ставки в GrabAds, не считает экономику промо, не подаёт апелляции на несправедливые отзывы и не отвечает за выручку — потому что это не настройки, а решения, и принимает их человек в кабинете площадки. Софт и агентство не конкурируют: одно про операции, другое про продажи.',
        'Short answer: none of them grows sales, and that is not a criticism of software — it is a description of what it does. The word "software" hides three different things: middleware like Deliverect, which merges orders and menus and has no till; a POS like Moka, Olsera, ESB or Runchise, where the till is the point and delivery is one integration; and hybrids like Klikit and Otter, which are both. All of them remove operational chaos. None of them moves a GrabAds bid, works out promo economics, files an appeal against an unfair review or is accountable for revenue — because those are not settings, they are decisions, and a person makes them inside the platform dashboard. Software and an agency do not compete: one is operations, the other is sales.', 'Jawaban singkatnya: tidak satu pun dari mereka menumbuhkan penjualan, dan itu bukan celaan terhadap software — itu deskripsi apa yang memang dikerjakannya. Kata "software" menyembunyikan tiga hal berbeda: middleware seperti Deliverect, yang menyatukan pesanan dan menu tetapi tidak punya kasir; POS seperti Moka, Olsera, ESB, atau Runchise, di mana kasir adalah intinya dan delivery hanya satu integrasi; dan hibrida seperti Klikit dan Otter, yang punya keduanya. Semuanya menghapus kekacauan operasional. Tidak satu pun mengatur bid GrabAds, menghitung ekonomi promo, mengajukan banding atas ulasan yang tidak adil, atau bertanggung jawab atas omzet — karena itu bukan pengaturan, melainkan keputusan, dan yang mengambilnya adalah manusia di dalam dashboard platform. Software dan agensi tidak bersaing: yang satu soal operasional, yang lain soal penjualan.'
      , 'คำตอบสั้น ๆ: ไม่มีตัวไหนทำให้ยอดขายโต และนี่ไม่ใช่การตำหนิซอฟต์แวร์ แต่เป็นการอธิบายว่ามันทำอะไร คำว่า "ซอฟต์แวร์" ซ่อนของสามอย่างที่ต่างกัน: มิดเดิลแวร์อย่าง Deliverect ที่รวมออร์เดอร์และเมนูแต่ไม่มีระบบแคชเชียร์ POS อย่าง Moka, Olsera, ESB หรือ Runchise ที่แคชเชียร์คือหัวใจ ส่วนเดลิเวอรีเป็นแค่หนึ่งการเชื่อมต่อ และลูกผสมอย่าง Klikit กับ Otter ที่มีทั้งสองอย่าง ทั้งหมดนี้ช่วยขจัดความวุ่นวายหน้างาน แต่ไม่มีตัวไหนปรับบิดใน GrabAds ไม่คำนวณเศรษฐศาสตร์ของโปรโมชัน ไม่ยื่นอุทธรณ์รีวิวที่ไม่เป็นธรรม และไม่รับผิดชอบยอดขาย เพราะสิ่งเหล่านี้ไม่ใช่การตั้งค่า แต่เป็นการตัดสินใจ และคนคือผู้ตัดสินใจในหลังบ้านของแพลตฟอร์ม ซอฟต์แวร์กับเอเจนซีไม่ได้แข่งกัน อย่างหนึ่งคือหน้างาน อีกอย่างคือยอดขาย')}
      meta={{ datePublished: '2026-09-08', dateModified: '2026-09-09', minutes: 10 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Софт или агентство: Klikit, Runchise, Moka, Deliverect и что из них растит продажи',
                      'Software or an agency: Klikit, Runchise, Moka, Deliverect and which of them grows sales',
                      'Software atau agensi: Klikit, Runchise, Moka, Deliverect, dan mana yang menumbuhkan omzet',
                      'ซอฟต์แวร์หรือเอเจนซี: Klikit, Runchise, Moka, Deliverect และอันไหนทำให้ยอดขายโต'),
          url: URL,
          about:
            'delivery management agency, Klikit, Runchise, Deliverect, Moka POS, Olsera, ESB, majoo, StoreHub, Otter, Hubster, Opsfood, Butter POS, FoodStory, order aggregator, restaurant POS, middleware, GrabFood, GoFood, ShopeeFood, GrabAds, Indonesia, Thailand',
          datePublished: '2026-09-08',
          dateModified: '2026-09-09',
          language,
        }),
      ]}
    >
      <Block card title={t('Сравнение по существу', 'The comparison that matters', 'Perbandingan yang benar-benar penting', 'การเปรียบเทียบที่สำคัญจริง')}>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-brand-muted w-1/5"></th>
                <th className="py-3 pr-4 font-semibold">
                  {t('Софт-агрегатор', 'Aggregator software', 'Software agregator', 'ซอฟต์แวร์รวมออร์เดอร์')}
                  <div className="text-xs font-normal text-brand-muted">Klikit, Deliverect, Hubster</div>
                </th>
                <th className="py-3 font-semibold">
                  {t('Агентство', 'Agency', 'Agensi', 'เอเจนซี')}
                  <div className="text-xs font-normal text-brand-muted">Delivery Booster</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, soft, agency]) => (
                <tr key={label} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{label}</td>
                  <td className="py-4 pr-4 text-brand-muted">{soft}</td>
                  <td className="py-4 text-brand-muted">{agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={t('Где проходит граница', 'Where the line runs', 'Di mana batasnya', 'เส้นแบ่งอยู่ตรงไหน')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Полезная проверка: спросите, кто в вашей схеме принимает решение «поднять ставку на этой позиции» или «выключить это промо, оно в минусе». У софта такого решения нет — он показывает цифры и ждёт, что вы их прочитаете. Именно поэтому рестораны с идеально настроенной интеграцией всё равно жалуются, что заказов мало: планшеты в порядке, а карточкой в приложении никто не занимается.',
            'A useful test: ask who, in your setup, makes the call to "raise the bid on this item" or "kill this promo, it is losing money". Software does not make that call — it shows numbers and waits for you to read them. This is why restaurants with a perfectly configured integration still complain about low order counts: the tablets are fine, but nobody is working the listing inside the app.', 'Uji sederhana: tanyakan siapa dalam skema Anda yang memutuskan untuk "menaikkan bid pada item ini" atau "mematikan promo ini, karena merugi". Software tidak membuat keputusan itu — ia menampilkan angka dan menunggu Anda membacanya. Karena itulah restoran dengan integrasi yang tersetel sempurna tetap mengeluh pesanannya sedikit: tabletnya rapi, tetapi tidak ada yang mengurus halaman toko di dalam aplikasi.'
          , 'วิธีทดสอบที่ใช้ได้จริง: ลองถามว่าในระบบของคุณ ใครเป็นคนตัดสินใจว่าจะเพิ่มบิดให้เมนูนี้ หรือหยุดโปรนี้เพราะมันขาดทุน ซอฟต์แวร์ไม่ได้ตัดสินใจแบบนั้น มันแสดงตัวเลขแล้วรอให้คุณอ่านเอง นี่คือเหตุผลที่ร้านซึ่งเชื่อมต่อระบบไว้อย่างสมบูรณ์แบบยังบ่นว่าออร์เดอร์น้อย: แท็บเล็ตเรียบร้อยดี แต่ไม่มีใครทำงานกับหน้าร้านในแอป')}
        </p>
      </Block>

      <Block card title={t('Что меняется на практике', 'What it changes in practice', 'Apa yang berubah dalam praktik', 'มันเปลี่ยนอะไรในทางปฏิบัติ')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Цифры из кабинетов клиентов, где менялось именно управление, а не софт: у Zaytun Ubud реклама на GoFood шла в убыток с ROAS 0.25x — потратили 3,1 млн рупий, вернули 763 тысячи; никакой софт этого не показал, потому что никто не смотрел. После пересборки — ROAS 15.52x. У Etna Phuket сквозная конверсия была 0.5% при 39 211 показах в месяц: трафик был, денег с него не было; после работы с карточкой и рекламой — конверсия 1.9%, ROAS 14.75x → 34.57x.',
            'Numbers from client dashboards where the management changed, not the software: at Zaytun Ubud, GoFood ads were running at a 0.25x ROAS — Rp 3.1M spent, Rp 763K returned; no software surfaced this, because nobody was looking. After the rebuild: 15.52x. At Etna Phuket, through-conversion was 0.5% on 39,211 monthly impressions: the traffic was there, the money was not; after listing and ads work, conversion reached 1.9% and ROAS went 14.75x → 34.57x.', 'Angka dari dashboard klien di mana yang berubah adalah pengelolaannya, bukan softwarenya: di Zaytun Ubud iklan GoFood berjalan dengan ROAS 0.25x — Rp 3,1 juta keluar, Rp 763 ribu kembali; tidak ada software yang menunjukkannya, karena tidak ada yang melihat. Setelah dirombak: 15.52x. Di Etna Phuket konversi menyeluruh hanya 0.5% pada 39,211 tayangan per bulan: trafiknya ada, uangnya tidak; setelah halaman toko dan iklan dibenahi, konversi mencapai 1.9% dan ROAS bergerak 14.75x → 34.57x.'
          , 'ตัวเลขจากหลังบ้านของลูกค้าที่เปลี่ยนวิธีบริหาร ไม่ใช่เปลี่ยนซอฟต์แวร์: ที่ Zaytun Ubud โฆษณา GoFood วิ่งอยู่ที่ ROAS 0.25 เท่า จ่ายไป 3.1 ล้านรูเปียห์ ได้กลับมา 763 พัน ไม่มีซอฟต์แวร์ตัวไหนเอาเรื่องนี้ขึ้นมาให้เห็น เพราะไม่มีใครดู หลังรื้อใหม่ได้ 15.52 เท่า ส่วนที่ Etna Phuket อัตราการเปลี่ยนคนดูเป็นออร์เดอร์อยู่ที่ 0.5% จากการมองเห็น 39,211 ครั้งต่อเดือน ทราฟฟิกมี แต่เงินไม่มา หลังจากทำงานกับหน้าร้านและโฆษณา อัตรานี้ขึ้นเป็น 1.9% และ ROAS จาก 14.75 เป็น 34.57 เท่า')}{' '}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">
            Zaytun Ubud
          </Link>
          {', '}
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">
            Etna Phuket
          </Link>
          {'.'}
        </p>
      </Block>

      <Block title={t('Под словом «софт» скрываются три разных продукта', 'The word "software" hides three different products', 'Kata "software" menyembunyikan tiga produk berbeda', 'คำว่า "ซอฟต์แวร์" ซ่อนของสามอย่างที่ต่างกัน')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Когда вам говорят «поставь софт, и с доставкой станет нормально», речь может идти о трёх совершенно разных вещах. У них разные задачи, разные деньги и разные точки отказа — и путаница здесь стоит дорого, потому что покупают одно, а ждут другого.',
            'When someone tells you "install software and delivery will sort itself out", they could mean three completely different things. Different jobs, different money, different failure points — and the confusion is expensive, because you buy one thing and expect another.',
            'Ketika seseorang berkata "pasang software, delivery pasti beres", yang dimaksud bisa tiga hal yang sama sekali berbeda. Beda pekerjaan, beda biaya, beda titik gagal — dan kebingungan ini mahal, karena Anda membeli satu hal tetapi mengharapkan hal lain.',
            'เวลามีคนบอกว่า "ลงซอฟต์แวร์สิ แล้วเดลิเวอรีจะเข้าที่เอง" สิ่งที่เขาหมายถึงอาจเป็นของสามอย่างที่ต่างกันโดยสิ้นเชิง คนละงาน คนละเงิน คนละจุดที่พัง และความสับสนนี้แพง เพราะคุณซื้ออย่างหนึ่งแต่คาดหวังอีกอย่าง')}
        </p>
        <div className="mt-8 space-y-8">
          {kinds.map((k) => (
            <div key={k.name}>
              <h3 className="text-lg font-bold mb-2">{k.name}</h3>
              <p className="text-brand-muted max-w-3xl">{k.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-semibold">{t('Продукт', 'Product', 'Produk', 'ผลิตภัณฑ์')}</th>
                <th className="py-3 pr-4 font-semibold">{t('Что это на самом деле', 'What it actually is', 'Apa sebenarnya', 'จริง ๆ แล้วมันคืออะไร')}</th>
                <th className="py-3 pr-4 font-semibold">{t('Что с вашими площадками', 'Your platforms', 'Platform Anda', 'แพลตฟอร์มของคุณ')}</th>
                <th className="py-3 font-semibold">{t('Сколько стоит', 'What it costs', 'Berapa biayanya', 'ราคาเท่าไร')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map(([name, what, plat, price]) => (
                <tr key={name} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium whitespace-nowrap">{name}</td>
                  <td className="py-4 pr-4 text-brand-muted">{what}</td>
                  <td className="py-4 pr-4 text-brand-muted">{plat}</td>
                  <td className="py-4 text-brand-muted">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs text-brand-muted">
          {t('Проверено 09.09.2026 по сайтам и справкам вендоров. Цены и список интеграций меняются — сверяйтесь перед покупкой.',
            'Checked 09.09.2026 against vendor sites and help centres. Prices and integration lists change — verify before buying.',
            'Diperiksa 09.09.2026 pada situs dan pusat bantuan vendor. Harga dan daftar integrasi berubah — periksa lagi sebelum membeli.',
            'ตรวจสอบเมื่อ 09.09.2026 จากเว็บไซต์และศูนย์ช่วยเหลือของผู้ให้บริการ ราคาและรายการเชื่อมต่อเปลี่ยนได้ ควรตรวจซ้ำก่อนซื้อ')}
        </p>
      </Block>

      <Block card title={t('«Система вместо человека» — так это не работает', '"A system instead of a person" — that is not how it works', '"Sistem menggantikan orang" — bukan begitu cara kerjanya', '"ใช้ระบบแทนคน" — มันไม่ได้ทำงานแบบนั้น')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Самая частая формулировка, которую слышит владелец: «если вам нужен не человек, а система — возьмите софт». Звучит логично и почти всегда заканчивается одинаково: интеграция настроена, планшет один, а заказов столько же.',
            'The most common line an owner hears is: "if you want a system rather than a person, get software". It sounds logical and almost always ends the same way: the integration works, there is one tablet, and the number of orders has not moved.',
            'Kalimat yang paling sering didengar pemilik restoran: "kalau Anda butuh sistem, bukan orang, pakai software saja". Terdengar masuk akal dan hampir selalu berakhir sama: integrasinya jalan, tabletnya tinggal satu, dan jumlah pesanan tidak berubah.',
            'ประโยคที่เจ้าของร้านได้ยินบ่อยที่สุดคือ "ถ้าอยากได้ระบบ ไม่ใช่คน ก็ใช้ซอฟต์แวร์สิ" ฟังดูมีเหตุผล และมักจบเหมือนกันเสมอ: การเชื่อมต่อทำงานได้ แท็บเล็ตเหลือเครื่องเดียว แต่จำนวนออร์เดอร์เท่าเดิม')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t('Причина простая: система исполняет то, что в неё завели, а выручку двигают решения. Какую ставку поставить сегодня и снять завтра. Какое промо уходит в минус на третьей неделе. Почему ранжирование упало именно на этой позиции. Как ответить на несправедливый отзыв, чтобы его сняли. Ни одно из этих решений не является настройкой, и ни один софт их не принимает.',
            'The reason is simple: a system executes what you put into it, while revenue moves on decisions. Which bid to raise today and cut tomorrow. Which promo goes negative in week three. Why ranking dropped on that particular item. How to answer an unfair review so it gets removed. None of these is a setting, and no software makes them.',
            'Alasannya sederhana: sistem menjalankan apa yang Anda masukkan, sedangkan omzet bergerak karena keputusan. Bid mana yang dinaikkan hari ini dan diturunkan besok. Promo mana yang minus di minggu ketiga. Kenapa peringkat item tertentu turun. Bagaimana menjawab ulasan tidak adil agar dihapus. Tidak satu pun dari ini adalah pengaturan, dan tidak ada software yang mengambilnya.',
            'เหตุผลง่ายมาก: ระบบทำตามสิ่งที่คุณใส่เข้าไป แต่ยอดขายขยับด้วยการตัดสินใจ วันนี้ควรขึ้นบิดตัวไหน พรุ่งนี้ควรลดตัวไหน โปรโมชันไหนจะติดลบในสัปดาห์ที่สาม ทำไมอันดับของเมนูนั้นตก จะตอบรีวิวที่ไม่เป็นธรรมอย่างไรให้ถูกลบ ไม่มีข้อไหนเป็นการตั้งค่า และไม่มีซอฟต์แวร์ตัวไหนตัดสินใจแทน')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t('Второе, о чём стоит знать: в подборках «кто поможет с доставкой» рядом с рабочими продуктами регулярно оказываются те, кому там не место. Opsfood на момент проверки был в стадии беты и умеет только смотреть за заказами. Butter POS — американская компания из штата Делавэр, к GrabFood и GoFood отношения не имеющая. Hubster переименован в Otter, и старый индонезийский сайт по этому имени уже не открывается. Прежде чем звонить по такому списку, проверьте каждое название.',
            'The second thing worth knowing: in those "who can help with delivery" lists, working products sit next to ones that do not belong there. Opsfood, at the time of checking, was in beta and only watches orders. Butter POS is an American company from Delaware with no relation to GrabFood or GoFood. Hubster was renamed Otter, and the old Indonesian site under that name no longer opens. Before calling anyone off such a list, check each name.',
            'Hal kedua yang perlu diketahui: dalam daftar "siapa yang bisa membantu delivery", produk yang benar-benar bekerja berdampingan dengan yang sebenarnya tidak pantas ada di sana. Opsfood, saat diperiksa, masih beta dan hanya memantau pesanan. Butter POS adalah perusahaan Amerika dari Delaware yang tidak berhubungan dengan GrabFood maupun GoFood. Hubster berganti nama menjadi Otter, dan situs Indonesia lama dengan nama itu sudah tidak terbuka. Sebelum menelepon siapa pun dari daftar semacam itu, periksa tiap namanya.',
            'เรื่องที่สองที่ควรรู้: ในรายชื่อ "ใครช่วยเรื่องเดลิเวอรีได้บ้าง" ผลิตภัณฑ์ที่ใช้ได้จริงมักอยู่ปนกับตัวที่ไม่ควรอยู่ตรงนั้น Opsfood ณ เวลาที่ตรวจสอบยังเป็นเบต้าและทำได้แค่เฝ้าดูออร์เดอร์ Butter POS เป็นบริษัทอเมริกันจากรัฐเดลาแวร์ ไม่เกี่ยวกับ GrabFood หรือ GoFood เลย ส่วน Hubster เปลี่ยนชื่อเป็น Otter และเว็บไซต์อินโดนีเซียเดิมภายใต้ชื่อนั้นก็เปิดไม่ได้แล้ว ก่อนจะโทรหาใครจากรายชื่อแบบนั้น ตรวจสอบทีละชื่อก่อน')}
        </p>
      </Block>

      <Block title={t('Софт сам говорит, где он заканчивается', 'The software itself says where it ends', 'Software itu sendiri menyatakan di mana batasnya', 'ซอฟต์แวร์บอกเองว่ามันจบตรงไหน')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Самое честное описание границы лежит не в нашем маркетинге, а в справке вендора. Откройте инструкцию Moka по интеграции с GoFood. Там написано: после подключения меню редактируется только в Moka, потому что правки в GoBiz разъедут отчёты. А дальше ключевое: все активные промо придётся настроить заново в приложении GoFood, и управление промо после интеграции не меняется. То есть вендор сам говорит, что интеграция забирает меню, а промо-экономика остаётся в кабинете площадки. Реклама и ставки GrabAds — там же.',
            'The most honest description of the boundary is not in our marketing but in the vendor documentation. Open Moka’s guide to the GoFood integration. It says: after connecting, the menu is edited only in Moka, because edits in GoBiz will skew the reports. And then the key line: all active promos have to be set up again in the GoFood app, and promo management does not change after the integration. The vendor is saying that the integration takes the menu while promo economics stays in the platform dashboard. Ads and GrabAds bids live there too.',
            'Deskripsi paling jujur soal batas ini bukan ada di materi pemasaran kami, melainkan di dokumentasi vendornya. Buka panduan Moka untuk integrasi GoFood. Di sana tertulis: setelah terhubung, menu hanya diedit di Moka, karena perubahan di GoBiz akan membuat laporan melenceng. Lalu baris kuncinya: semua promo aktif harus diatur ulang di aplikasi GoFood, dan pengelolaan promo tidak berubah setelah integrasi. Artinya vendor sendiri mengatakan bahwa integrasi mengambil menu, sementara ekonomi promo tetap di dashboard platform. Iklan dan bid GrabAds juga ada di sana.',
            'คำอธิบายเส้นแบ่งที่ซื่อสัตย์ที่สุดไม่ได้อยู่ในการตลาดของเรา แต่อยู่ในเอกสารของผู้ให้บริการเอง ลองเปิดคู่มือของ Moka เรื่องการเชื่อมต่อกับ GoFood ในนั้นเขียนว่า หลังเชื่อมต่อแล้ว เมนูจะแก้ไขได้เฉพาะใน Moka เพราะการแก้ใน GoBiz จะทำให้รายงานคลาดเคลื่อน และบรรทัดสำคัญคือ โปรโมชันที่เปิดอยู่ทั้งหมดต้องตั้งค่าใหม่ในแอป GoFood และการจัดการโปรโมชันไม่เปลี่ยนแปลงหลังการเชื่อมต่อ แปลว่าผู้ให้บริการพูดเองว่า การเชื่อมต่อรับเมนูไป แต่เศรษฐศาสตร์ของโปรโมชันยังอยู่ในหลังบ้านของแพลตฟอร์ม โฆษณาและบิดของ GrabAds ก็อยู่ที่นั่นเช่นกัน')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t('Есть закономерность и посерьёзнее. В апреле 2020 года Gojek купил Moka примерно за 130 миллионов долларов — и Moka сегодня подключает GoFood. В Таиланде FoodStory принадлежит LINE MAN Wongnai и подключает LINE MAN. Это не заговор и не повод отказываться от такой кассы. Но, покупая POS у экосистемы площадки, вы покупаете инструмент, который прекрасно соединён с этой площадкой и никак — с соседней. Для ресторана, который живёт на двух площадках сразу, разница принципиальная.',
            'There is a bigger pattern too. In April 2020 Gojek bought Moka for around $130 million — and Moka today connects GoFood. In Thailand FoodStory belongs to LINE MAN Wongnai and connects LINE MAN. This is not a conspiracy and not a reason to reject such a till. But when you buy a POS from a platform’s ecosystem, you buy a tool beautifully connected to that platform and not at all to the one next door. For a restaurant living on two platforms at once, that difference matters.',
            'Ada pola yang lebih besar juga. Pada April 2020 Gojek membeli Moka sekitar $130 juta — dan Moka hari ini menghubungkan GoFood. Di Thailand FoodStory milik LINE MAN Wongnai dan menghubungkan LINE MAN. Ini bukan konspirasi dan bukan alasan menolak kasir semacam itu. Tetapi ketika Anda membeli POS dari ekosistem sebuah platform, Anda membeli alat yang terhubung sempurna ke platform itu dan sama sekali tidak ke tetangganya. Bagi restoran yang hidup di dua platform sekaligus, perbedaan itu penting.',
            'ยังมีรูปแบบที่ใหญ่กว่านั้นอีก เมื่อเดือนเมษายน 2020 Gojek ซื้อ Moka ด้วยเงินราว 130 ล้านดอลลาร์ และ Moka ทุกวันนี้เชื่อมกับ GoFood ส่วนที่ไทย FoodStory เป็นของ LINE MAN Wongnai และเชื่อมกับ LINE MAN นี่ไม่ใช่การสมคบคิด และไม่ใช่เหตุผลที่จะปฏิเสธแคชเชียร์แบบนั้น แต่เมื่อคุณซื้อ POS จากระบบนิเวศของแพลตฟอร์มใด คุณกำลังซื้อเครื่องมือที่เชื่อมกับแพลตฟอร์มนั้นได้อย่างดีเยี่ยม และไม่เชื่อมกับเจ้าข้าง ๆ เลย สำหรับร้านที่อยู่บนสองแพลตฟอร์มพร้อมกัน ความต่างนี้สำคัญมาก')}
        </p>
      </Block>

      <Block card title={t('Софт подрос — и всё равно не туда', 'Software has grown up — and still in another direction', 'Software sudah berkembang — dan tetap ke arah lain', 'ซอฟต์แวร์พัฒนาขึ้นแล้ว — แต่ก็ยังไปคนละทาง')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Здесь важно быть точным, иначе страница устареет за полгода. Софт больше не «просто сводит планшеты». Deliverect запустил AI-агентов, которые сами обновляют картинки, причёсывают описания и проставляют теги аллергенов, и открыто пишет, что скоро «быть читаемым для ИИ станет важнее рекламы». У Klikit есть тариф с AI-агентами, CRM и маркетинговыми инструментами. У majoo — отдельная рекламная услуга и даже собственное финансирование. Всё это настоящее. И всё это гигиена, а не управление.',
            'Precision matters here, or this page will be out of date in six months. Software no longer just merges tablets. Deliverect has launched AI agents that update images, harmonise descriptions and apply allergen tags on their own, and it openly writes that "being readable by AI will soon matter more than advertising". Klikit has a tier with AI agents, a CRM and marketing tools. majoo has a separate advertising service and even its own financing arm. All of it is real. And all of it is hygiene, not management.',
            'Ketepatan penting di sini, kalau tidak halaman ini akan usang dalam enam bulan. Software tidak lagi sekadar menyatukan tablet. Deliverect meluncurkan agen AI yang memperbarui gambar, menyelaraskan deskripsi, dan memasang tag alergen sendiri, dan secara terbuka menulis bahwa "bisa dibaca AI akan segera lebih penting daripada iklan". Klikit punya paket dengan agen AI, CRM, dan alat pemasaran. majoo punya layanan iklan tersendiri bahkan pembiayaan sendiri. Semuanya nyata. Dan semuanya adalah kebersihan dasar, bukan pengelolaan.',
            'ตรงนี้ต้องพูดให้แม่น ไม่อย่างนั้นหน้านี้จะล้าสมัยภายในครึ่งปี ซอฟต์แวร์ไม่ได้แค่รวมแท็บเล็ตอีกต่อไปแล้ว Deliverect เปิดตัวเอเจนต์ AI ที่อัปเดตรูปภาพ จัดคำอธิบายให้สอดคล้อง และติดแท็กสารก่อภูมิแพ้ได้เอง และเขียนอย่างเปิดเผยว่า "การอ่านออกโดย AI จะสำคัญกว่าการโฆษณาในไม่ช้า" Klikit มีแพ็กเกจที่มีเอเจนต์ AI, CRM และเครื่องมือการตลาด ส่วน majoo มีบริการโฆษณาแยกต่างหากและกระทั่งบริการสินเชื่อของตัวเอง ทั้งหมดนี้มีจริง และทั้งหมดนี้คือการดูแลพื้นฐาน ไม่ใช่การบริหาร')}
        </p>
        <div className="mt-6 space-y-4">
          {pairs.map(([soft, human]) => (
            <div key={soft} className="grid gap-2 sm:grid-cols-2 border-b border-white/10 pb-4">
              <div className="text-brand-muted text-sm">
                <span className="text-brand-muted/70 uppercase text-[11px] tracking-wider block mb-1">{t('Умеет софт', 'Software can', 'Software bisa', 'ซอฟต์แวร์ทำได้')}</span>
                {soft}
              </div>
              <div className="text-brand-text text-sm">
                <span className="text-brand-green uppercase text-[11px] tracking-wider block mb-1">{t('Это решение', 'This is a decision', 'Ini keputusan', 'นี่คือการตัดสินใจ')}</span>
                {human}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title={t('Чем мы отличаемся — на тех же задачах', 'How we differ — on the same jobs', 'Apa bedanya kami — pada pekerjaan yang sama', 'เราต่างอย่างไร — บนงานชุดเดียวกัน')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Сравнение выше — про категории. Это — про то, что происходит с вашим рестораном на неделе.',
            'The comparison above is about categories. This one is about what happens to your restaurant during the week.',
            'Perbandingan di atas soal kategori. Yang ini soal apa yang terjadi pada restoran Anda dalam seminggu.',
            'การเปรียบเทียบด้านบนคือเรื่องประเภท ส่วนอันนี้คือสิ่งที่เกิดขึ้นกับร้านของคุณในหนึ่งสัปดาห์')}
        </p>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[620px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-brand-muted w-1/6"></th>
                <th className="py-3 pr-4 font-semibold">{t('Софт', 'Software', 'Software', 'ซอฟต์แวร์')}</th>
                <th className="py-3 font-semibold">
                  {t('Агентство', 'Agency', 'Agensi', 'เอเจนซี')}
                  <div className="text-xs font-normal text-brand-muted">Delivery Booster</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {taskRows.map(([task, soft, us]) => (
                <tr key={task} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{task}</td>
                  <td className="py-4 pr-4 text-brand-muted">{soft}</td>
                  <td className="py-4 text-brand-muted">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-brand-muted max-w-3xl">
          {t('Ни один агрегатор и ни один POS не двигает ставки, не подаёт апелляции и не отвечает за выручку. Не потому что они плохие, а потому что это не их работа и денег они за неё не берут. Обратное тоже верно: мы не пробьём вам чек, не спишем ингредиенты и не сведём смену. Если у вас болит операционка — вам нужен софт, и это не мы.',
            'No aggregator and no POS moves a bid, files an appeal or is accountable for revenue. Not because they are bad, but because it is not their job and they do not charge for it. The reverse is true too: we will not ring up a bill, deduct your ingredients or close your shift. If what hurts is operations, you need software, and that is not us.',
            'Tidak ada agregator maupun POS yang mengatur bid, mengajukan banding, atau bertanggung jawab atas omzet. Bukan karena mereka buruk, tetapi karena itu bukan pekerjaan mereka dan mereka tidak menagih untuk itu. Sebaliknya juga benar: kami tidak akan mencetak bon, memotong bahan, atau menutup shift Anda. Kalau yang sakit adalah operasional, yang Anda butuhkan software, dan itu bukan kami.',
            'ไม่มีตัวรวมออร์เดอร์หรือ POS ตัวไหนปรับบิด ยื่นอุทธรณ์ หรือรับผิดชอบยอดขาย ไม่ใช่เพราะมันแย่ แต่เพราะมันไม่ใช่งานของมัน และมันก็ไม่ได้เก็บเงินค่างานนั้น ในทางกลับกันก็จริงเช่นกัน: เราไม่ออกบิลให้ ไม่ตัดวัตถุดิบให้ และไม่ปิดกะให้คุณ ถ้าสิ่งที่เจ็บคืองานหน้างาน สิ่งที่คุณต้องการคือซอฟต์แวร์ และนั่นไม่ใช่เรา')}
        </p>
      </Block>

      <Block card title={t('Пять вопросов, если софт вам всё-таки нужен', 'Five questions if you do need software', 'Lima pertanyaan kalau Anda memang butuh software', 'ห้าคำถาม ถ้าคุณต้องใช้ซอฟต์แวร์จริง ๆ')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t('Это чек-лист покупателя, а не аргумент против софта. Мы им пользуемся сами, когда клиент спрашивает, что ставить.',
            'This is a buyer’s checklist, not an argument against software. We use it ourselves when a client asks what to install.',
            'Ini checklist pembeli, bukan argumen menentang software. Kami memakainya sendiri ketika klien bertanya harus pasang apa.',
            'นี่คือเช็กลิสต์ของผู้ซื้อ ไม่ใช่ข้อโต้แย้งต่อซอฟต์แวร์ เราเองก็ใช้มันเวลาลูกค้าถามว่าควรลงตัวไหน')}
        </p>
        <ol className="space-y-5 list-none">
          {checklist.map(([q, a], i) => (
            <li key={q} className="flex gap-3">
              <span className="text-brand-green font-bold shrink-0">{i + 1}.</span>
              <div>
                <div className="font-semibold mb-1">{q}</div>
                <p className="text-brand-muted text-sm">{a}</p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <FaqList
 faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <Block card title={t('Что мы находим на аккаунте вроде вашего',
                           'What we find on an account like yours',
                           'Apa yang kami temukan di akun seperti milik Anda', 'สิ่งที่เรามักเจอในบัญชีแบบของคุณ')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Не гипотезы, а то, что видно в первые дни, когда открываем кабинет ресторана с настроенной интеграцией и жалобой на заказы.',
            'Not hypotheses — what shows up in the first days when we open the dashboard of a restaurant with a working integration and a complaint about orders.',
            'Bukan hipotesis — inilah yang terlihat pada hari-hari pertama saat kami membuka dashboard restoran dengan integrasi yang jalan tapi pesanan yang dikeluhkan.'
          , 'ไม่ใช่การเดา แต่คือสิ่งที่โผล่ขึ้นมาในไม่กี่วันแรกที่เราเปิดหลังบ้านของร้านซึ่งเชื่อมต่อระบบไว้ดีแล้ว แต่ยังบ่นเรื่องออร์เดอร์')}
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

      <KeepReading currentHref="/answers/delivery-agency-vs-klikit-deliverect" />

      <AnswerCta />
    </AnswerLayout>
  );
}
