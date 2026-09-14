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

const URL = 'https://booster.delivery/answers/few-orders-grabfood-gofood';

/**
 * Ответ на самую массовую жалобу в нише: «мало заказов, что делать».
 *
 * Замер AI-видимости 13.09.2026: problem-слой — 118 ответов из 207, нас там
 * называют 5 раз. Единственный problem-промпт, где нас называют, — тот, где
 * прямо спросили «does such a service exist». Вывод: страница обязана не
 * только отвечать «что делать», но и отвечать «кто это делает» — без мостика
 * ИИ пересказывает совет без исполнителя. Отсюда блок «Кто это делает».
 *
 * Против thegrabmethod.com/low-orders-on-grab/ — 14 цитат, самая цитируемая
 * чужая страница во всём замере. Наше отличие от неё одно и решающее: цифры
 * взяты из кабинетов клиентов, а не придуманы для примера.
 */
export default function AnswersFewOrdersPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Мало заказов в GrabFood и GoFood — с чего начинать искать причину'
        : language === 'id'
          ? 'Orderan sepi di GrabFood dan GoFood — mulai cari penyebabnya dari mana'
          : language === 'th'
            ? 'ออร์เดอร์น้อยบน GrabFood และ GoFood — เริ่มหาสาเหตุจากตรงไหน'
            : 'Few orders on GrabFood and GoFood — where to start looking for the cause';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Порядок диагностики для ресторана на Бали или Пхукете: сначала видимость, потом карточка, потом меню и промо, и только пятым пунктом реклама. С цифрами из кабинетов: офлайн 73% → 0% и показы 7 038 → 25 543 в месяц.'
          : language === 'id'
            ? 'Urutan diagnosis untuk restoran di Bali atau Phuket: mulai dari ketersediaan, lalu listing, lalu menu dan promo, dan iklan baru di urutan kelima. Dengan angka nyata dari dashboard: offline 73% → 0% dan tayangan 7.038 → 25.543 per bulan.'
            : language === 'th'
              ? 'ลำดับการวินิจฉัยสำหรับร้านอาหารในบาหลีหรือภูเก็ต: เริ่มจากความพร้อมขาย แล้วค่อยเป็นหน้าร้าน เมนูและโปรโมชัน ส่วนโฆษณามาเป็นอันดับห้า พร้อมตัวเลขจริงจากแดชบอร์ด: ปิดในระบบ 73% → 0% และการมองเห็น 7,038 → 25,543 ต่อเดือน'
              : 'The diagnostic order for a restaurant in Bali or Phuket: availability first, then the listing, then menu and promos, and ads only fifth. With real dashboard numbers: offline 73% → 0% and impressions 7,038 → 25,543 a month.';
    syncOpenGraph();
  }, [language]);

  const steps: Array<[string, string]> = [
    [
      t('Ступень 1. Вас не показывают',
        'Step 1. You are not being shown',
        'Tahap 1. Anda tidak ditampilkan', 'ขั้นที่ 1 ร้านของคุณไม่ถูกแสดง'),
      t('Первое, что нужно проверить, — сколько времени ресторан был недоступен. Не «закрыт по расписанию», а офлайн внутри приложения: не приняли заказ, не успели подтвердить, поставили стоп на позицию и забыли снять, отменили заказ со своей стороны. Площадка это запоминает. Ненадёжный ресторан получает меньше органических показов, и дальше проблема кормит сама себя: меньше показов — меньше заказов — меньше данных у алгоритма. У USSR Phuket было 3 977 минут офлайна в месяц; после того как офлайн убрали, показы в поиске выросли с нуля до 7 481 в месяц. У Enjoy Healthy Food доля офлайна составляла 73% — после доведения до нуля показы выросли с 7 038 до 25 543 в месяц. Без единого доллара рекламного бюджета на этом шаге. Цифра, которую надо посмотреть прямо сейчас: минуты офлайна и процент отменённых заказов за последний месяц. Если офлайн есть вообще — вы на первой ступени, и остальные четыре пока не имеют значения.',
        'The first thing to check is how long the restaurant was unavailable. Not "closed per schedule", but offline inside the app: an order not accepted, a confirmation missed, an item stopped and never un-stopped, an order cancelled from your side. The platform remembers this. An unreliable restaurant gets fewer organic impressions, and from there the problem feeds itself: fewer impressions, fewer orders, less data for the algorithm. USSR Phuket had 3,977 offline minutes a month; once the offline time was removed, search impressions went from zero to 7,481 a month. Enjoy Healthy Food had a 73% offline rate — brought to zero, impressions grew from 7,038 to 25,543 a month. Not a single advertising dollar was spent at this step. The number to look at right now: offline minutes and the share of cancelled orders over the last month. If there is any offline time at all, you are on step one and the other four do not matter yet.',
        'Hal pertama yang harus dicek adalah berapa lama restoran tidak tersedia. Bukan "tutup sesuai jadwal", melainkan offline di dalam aplikasi: pesanan tidak diterima, konfirmasi terlewat, item di-stop lalu lupa dibuka lagi, pesanan dibatalkan dari sisi Anda. Platform mengingat itu. Restoran yang tidak andal mendapat tayangan organik lebih sedikit, dan selanjutnya masalahnya memberi makan dirinya sendiri: tayangan berkurang, pesanan berkurang, data untuk algoritma berkurang. USSR Phuket punya 3.977 menit offline per bulan; setelah offline itu dihilangkan, tayangan di pencarian naik dari nol ke 7.481 per bulan. Enjoy Healthy Food punya porsi offline 73% — setelah dibawa ke nol, tayangan naik dari 7.038 ke 25.543 per bulan. Tanpa satu dolar pun anggaran iklan di langkah ini. Angka yang harus Anda lihat sekarang: menit offline dan persentase pesanan yang dibatalkan selama sebulan terakhir. Kalau ada waktu offline sama sekali, Anda berada di tahap satu, dan empat tahap lainnya belum relevan.', 'สิ่งแรกที่ต้องตรวจคือร้านของคุณไม่พร้อมขายไปนานเท่าไหร่ ไม่ใช่ "ปิดตามเวลาทำการ" แต่คือปิดในระบบ: ไม่ได้กดรับออร์เดอร์ ยืนยันไม่ทัน กดหยุดขายเมนูแล้วลืมเปิด หรือยกเลิกออร์เดอร์จากฝั่งร้าน แพลตฟอร์มจำสิ่งเหล่านี้ ร้านที่ไม่น่าเชื่อถือจะได้การมองเห็นแบบธรรมชาติน้อยลง แล้วปัญหาก็เลี้ยงตัวเอง คือเห็นน้อยลง ออร์เดอร์น้อยลง ข้อมูลให้อัลกอริทึมน้อยลง USSR Phuket เคยปิดในระบบ 3,977 นาทีต่อเดือน พอแก้แล้ว การมองเห็นในการค้นหาขึ้นจากศูนย์เป็น 7,481 ครั้งต่อเดือน ส่วน Enjoy Healthy Food ปิดในระบบถึง 73% ลดเหลือศูนย์ การมองเห็นเพิ่มจาก 7,038 เป็น 25,543 ครั้งต่อเดือน โดยไม่ได้ใช้งบโฆษณาแม้แต่ดอลลาร์เดียวในขั้นนี้ ตัวเลขที่ต้องเปิดดูเดี๋ยวนี้: นาทีที่ปิดในระบบ และสัดส่วนออร์เดอร์ที่ถูกยกเลิกในเดือนที่ผ่านมา ถ้ามีเวลาปิดในระบบอยู่เลย แปลว่าคุณอยู่ขั้นที่หนึ่ง และอีกสี่ขั้นยังไม่มีความหมาย'),
    ],
    [
      t('Ступень 2. Показывают, но не заходят',
        'Step 2. They see you and do not click',
        'Tahap 2. Terlihat, tapi tidak diklik', 'ขั้นที่ 2 คนเห็นแต่ไม่กดเข้า'),
      t('Человек видит вашу карточку в списке и не нажимает на неё. На этом экране он видит четыре вещи: фото, название, рейтинг и цену доставки. Всё. У Etna Phuket карточку видели 39 211 человек в месяц. Меню открывали 5,2% из них. То есть 37 тысяч человек посмотрели и прошли мимо — до меню, до цен, до всего, что владелец считал проблемой. Цифра: сколько людей увидели карточку и сколько открыли меню. Если разрыв такой же, дело не в ценах и не в рекламе — дело в первом экране.',
        'A person sees your listing in the feed and does not tap it. On that screen they see four things: the photo, the name, the rating and the delivery fee. That is all. At Etna Phuket, 39,211 people saw the listing each month. 5.2% of them opened the menu. That is 37 thousand people who looked and moved on — before the menu, before the prices, before everything the owner thought was the problem. The number: how many people saw the listing and how many opened the menu. If your gap looks like that, it is not the prices and not the ads — it is the first screen.',
        'Orang melihat listing Anda di feed dan tidak menekannya. Di layar itu ia melihat empat hal: foto, nama, rating, dan ongkos kirim. Itu saja. Di Etna Phuket, 39.211 orang melihat listing setiap bulan. Yang membuka menu 5,2% dari mereka. Artinya 37 ribu orang melihat lalu lewat — sebelum menu, sebelum harga, sebelum semua yang dikira pemiliknya sebagai masalah. Angkanya: berapa orang yang melihat listing dan berapa yang membuka menu. Kalau selisihnya mirip, masalahnya bukan harga dan bukan iklan — masalahnya ada di layar pertama.', 'คนเห็นหน้าร้านของคุณในฟีดแล้วไม่กด บนหน้าจอนั้นเขาเห็นสี่อย่าง คือรูป ชื่อร้าน เรตติ้ง และค่าส่ง เท่านั้น ที่ Etna Phuket มีคนเห็นหน้าร้าน 39,211 คนต่อเดือน แต่กดเข้าไปดูเมนูแค่ 5.2% นั่นคือคน 37,000 คนเห็นแล้วผ่านไป ก่อนจะถึงเมนู ก่อนจะถึงราคา ก่อนจะถึงทุกอย่างที่เจ้าของคิดว่าเป็นปัญหา ตัวเลขที่ต้องดู: มีคนเห็นหน้าร้านกี่คน และเปิดเมนูกี่คน ถ้าช่องว่างของคุณหน้าตาแบบนี้ ปัญหาไม่ได้อยู่ที่ราคาและไม่ได้อยู่ที่โฆษณา แต่อยู่ที่หน้าจอแรก'),
    ],
    [
      t('Ступень 3. Заходят, но не заказывают',
        'Step 3. They open the menu and do not order',
        'Tahap 3. Menu dibuka, pesanan tidak masuk', 'ขั้นที่ 3 เปิดเมนูแล้วแต่ไม่สั่ง'),
      t('Меню открыли — заказ не сделали. Здесь работают структура меню, описания, фотографии позиций, цены относительно соседей и экономика промо. У Etna сквозная конверсия была 0,5% при среднем по нашим ресторанам 0,9%. Это не «чуть хуже» — это почти вдвое, то есть половина заказов терялась на ровном месте. Отдельно про промо. Скидка одновременно поднимает позицию в выдаче и режет маржу. Считать надо не количество заказов по акции, а то, что осталось после скидки, комиссии площадки и стоимости рекламы. Промо, которое не окупается, выглядит как рост заказов и работает как убыток. Цифра: сквозная конверсия — из тех, кто увидел карточку, сколько заказали.',
        'The menu is open and no order follows. This is where menu structure, descriptions, item photos, prices relative to neighbours and promo economics do their work. At Etna the through-conversion was 0.5% against our 0.9% fleet average. That is not "slightly worse" — it is nearly half, meaning half the orders were lost for no reason. On promos specifically. A discount lifts your position and cuts your margin at the same time. What to count is not how many orders the promo brought, but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like order growth and behaves like a loss. The number: through-conversion — of those who saw the listing, how many ordered.',
        'Menu sudah dibuka, pesanan tidak datang. Di sinilah struktur menu, deskripsi, foto item, harga dibanding tetangga, dan ekonomi promo bekerja. Di Etna konversi menyeluruh adalah 0,5% terhadap rata-rata 0,9% di portofolio kami. Itu bukan "sedikit lebih buruk" — itu hampir setengahnya, artinya separuh pesanan hilang begitu saja. Khusus soal promo. Diskon menaikkan posisi Anda dan memotong margin pada saat yang sama. Yang dihitung bukan berapa pesanan yang dibawa promo, melainkan berapa yang tersisa setelah diskon, komisi platform, dan biaya iklan. Promo yang tidak balik modal terlihat seperti pertumbuhan pesanan dan bekerja seperti kerugian. Angkanya: konversi menyeluruh — dari yang melihat listing, berapa yang memesan.', 'เมนูถูกเปิดแล้วแต่ไม่มีออร์เดอร์ตามมา ตรงนี้คือที่ที่โครงสร้างเมนู คำอธิบาย รูปของแต่ละเมนู ราคาเทียบกับร้านข้างเคียง และเศรษฐศาสตร์ของโปรโมชันทำงาน ที่ Etna อัตราการเปลี่ยนคนดูเป็นออร์เดอร์อยู่ที่ 0.5% เทียบกับค่าเฉลี่ย 0.9% ของร้านที่เราดูแล นั่นไม่ใช่ "แย่กว่านิดหน่อย" แต่เกือบครึ่ง แปลว่าออร์เดอร์ครึ่งหนึ่งหายไปเปล่า ๆ เรื่องโปรโมชันแยกออกมา ส่วนลดดันอันดับขึ้นและกินมาร์จิ้นไปพร้อมกัน สิ่งที่ต้องนับไม่ใช่ว่าโปรทำออร์เดอร์ได้กี่ใบ แต่คือเหลืออะไรหลังหักส่วนลด ค่าคอมมิชชันแพลตฟอร์ม และค่าโฆษณา โปรที่ไม่คุ้มทุนหน้าตาเหมือนออร์เดอร์โต แต่พฤติกรรมคือขาดทุน ตัวเลขที่ต้องดู: จากคนที่เห็นหน้าร้าน มีกี่คนที่สั่งจริง'),
    ],
    [
      t('Ступень 4. Рейтинг',
        'Step 4. The rating',
        'Tahap 4. Rating', 'ขั้นที่ 4 เรตติ้ง'),
      t('Рейтинг работает в обе стороны: алгоритм отдаёт показы охотнее, и человек, выбирающий между двумя карточками, смотрит на цифру рядом с названием. USSR Phuket вырос с 4,5 до 4,8. Zaytun Ubud — с 4,67 до 4,8. Это не «поработали с отзывами»: рейтинг поднимается через скорость сборки, точность комплектации и работу с причинами плохих оценок, а не через ответы на них.',
        'The rating works in both directions: the algorithm serves impressions more willingly, and a customer choosing between two listings looks at the number next to the name. USSR Phuket went from 4.5 to 4.8. Zaytun Ubud from 4.67 to 4.8. This is not "we worked on the reviews": a rating rises through prep speed, order accuracy and work on the causes of bad scores — not through replies to them.',
        'Rating bekerja ke dua arah: algoritma memberi tayangan lebih rela, dan pelanggan yang memilih di antara dua listing melihat angka di sebelah nama. USSR Phuket naik dari 4,5 ke 4,8. Zaytun Ubud dari 4,67 ke 4,8. Ini bukan "kami mengurus ulasan": rating naik lewat kecepatan penyiapan, ketepatan isi pesanan, dan penanganan penyebab nilai buruk — bukan lewat balasan atasnya.', 'เรตติ้งทำงานสองทาง คืออัลกอริทึมปล่อยการมองเห็นให้ง่ายขึ้น และลูกค้าที่เลือกระหว่างสองร้านก็ดูตัวเลขข้างชื่อร้าน USSR Phuket ขึ้นจาก 4.5 เป็น 4.8 ส่วน Zaytun Ubud จาก 4.67 เป็น 4.8 นี่ไม่ใช่ "เราไปจัดการรีวิว" เรตติ้งขึ้นได้ด้วยความเร็วในการทำอาหาร ความถูกต้องของออร์เดอร์ และการแก้ที่ต้นเหตุของคะแนนแย่ ไม่ใช่ด้วยการไปตอบรีวิว'),
    ],
    [
      t('Ступень 5. И только теперь — реклама',
        'Step 5. And only now — the ads',
        'Tahap 5. Dan baru sekarang — iklan', 'ขั้นที่ 5 และค่อยมาถึงโฆษณา'),
      t('Когда первые четыре ступени в порядке, реклама начинает умножать, а не оплачивать дыры. У Zaytun Ubud кампании в GoFood шли в убыток: ROAS 0,25x, потратили 3,1 млн рупий, вернули 763 тысячи. После пересборки — 15,52x при почти том же бюджете. У Etna переход с автоставки на ручной CPO с ежедневным ведением дал CTR с 2,8% до 5,59%, стоимость заказа с 42 до 29 бат, ROAS с 14,75x до 34,57x. Бюджет при этом подняли всего на 50%, а выручка с рекламы выросла в 3,4 раза — и подняли его только после того, как починили карточку.',
        'When the first four steps are in order, ads start multiplying instead of paying for holes. At Zaytun Ubud the GoFood campaigns were losing money: 0.25x ROAS, Rp 3.1M spent, Rp 763K returned. After the rebuild — 15.52x on nearly the same budget. At Etna, moving from auto-bidding to manual CPO with daily management took CTR from 2.8% to 5.59%, cost per order from 42 to 29 THB, ROAS from 14.75x to 34.57x. The budget was raised by only 50% while ads revenue grew 3.4x — and it was raised only after the listing had been fixed.',
        'Ketika empat tahap pertama beres, iklan mulai melipatgandakan alih-alih menambal lubang. Di Zaytun Ubud kampanye GoFood merugi: ROAS 0,25x, keluar Rp 3,1 juta, kembali Rp 763 ribu. Setelah dirakit ulang — 15,52x dengan anggaran yang hampir sama. Di Etna, beralih dari bid otomatis ke CPO manual dengan pengelolaan harian membawa CTR dari 2,8% ke 5,59%, biaya per pesanan dari 42 ke 29 THB, ROAS dari 14,75x ke 34,57x. Anggaran hanya dinaikkan 50% sementara omzet dari iklan tumbuh 3,4x — dan dinaikkan hanya setelah listing diperbaiki.', 'เมื่อสี่ขั้นแรกเรียบร้อย โฆษณาจะเริ่มคูณผลลัพธ์แทนที่จะจ่ายค่าอุดรูรั่ว ที่ Zaytun Ubud แคมเปญ GoFood ขาดทุน ROAS 0.25 เท่า จ่ายไป 3.1 ล้านรูเปียห์ ได้กลับมา 763,000 หลังรื้อใหม่ได้ 15.52 เท่าบนงบเกือบเท่าเดิม ที่ Etna การเปลี่ยนจากบิดอัตโนมัติมาคุม CPO เองและดูแลทุกวัน ทำให้ CTR ขึ้นจาก 2.8% เป็น 5.59% ต้นทุนต่อออร์เดอร์ลดจาก 42 เหลือ 29 บาท ROAS จาก 14.75 เป็น 34.57 เท่า งบเพิ่มขึ้นแค่ 50% แต่ยอดขายจากโฆษณาโต 3.4 เท่า และเพิ่มงบหลังจากแก้หน้าร้านเสร็จแล้วเท่านั้น'),
    ],
  ];

  /** Самодиагностика: что видно в кабинете → на какой ступени вы → что чинить. */
  const ladder: Array<[string, string, string]> = [
    [
      t('Есть минуты офлайна или отмены', 'There are offline minutes or cancellations', 'Ada menit offline atau pembatalan', 'มีนาทีที่ปิดในระบบ หรือมีการยกเลิก'),
      '1',
      t('Доступность и стопы', 'Availability and item stops', 'Ketersediaan dan stop item', 'ความพร้อมขายและการหยุดขายเมนู'),
    ],
    [
      t('Показов мало, офлайна нет', 'Few impressions, no offline time', 'Tayangan sedikit, tidak ada waktu offline', 'การมองเห็นน้อย แต่ไม่ได้ปิดในระบบ'),
      '1–2',
      t('Позиция в выдаче, надёжность', 'Ranking and reliability', 'Posisi di pencarian, keandalan', 'อันดับในการค้นหาและความน่าเชื่อถือ'),
    ],
    [
      t('Показов много, меню открывают редко', 'Many impressions, the menu is rarely opened', 'Tayangan banyak, menu jarang dibuka', 'คนเห็นเยอะ แต่เปิดเมนูน้อย'),
      '2',
      t('Фото, название, рейтинг, цена доставки', 'Photo, name, rating, delivery fee', 'Foto, nama, rating, ongkos kirim', 'รูป ชื่อร้าน เรตติ้ง ค่าส่ง'),
    ],
    [
      t('Меню открывают, заказов мало', 'The menu is opened, few orders follow', 'Menu dibuka, pesanan sedikit', 'คนเปิดเมนู แต่สั่งน้อย'),
      '3',
      t('Структура меню, описания, цены, промо', 'Menu structure, descriptions, prices, promos', 'Struktur menu, deskripsi, harga, promo', 'โครงสร้างเมนู คำอธิบาย ราคา โปรโมชัน'),
    ],
    [
      t('Заказы есть, маржи нет', 'Orders are there, margin is not', 'Pesanan ada, margin tidak', 'มีออร์เดอร์ แต่ไม่มีกำไร'),
      '3',
      t('Экономика промо и комиссии', 'Promo economics and commissions', 'Ekonomi promo dan komisi', 'เศรษฐศาสตร์ของโปรโมชันและค่าคอมมิชชัน'),
    ],
    [
      t('Рейтинг ниже 4.8', 'Rating below 4.8', 'Rating di bawah 4,8', 'เรตติ้งต่ำกว่า 4.8'),
      '4',
      t('Скорость сборки, точность, причины единиц', 'Prep speed, accuracy, causes of one-stars', 'Kecepatan penyiapan, ketepatan, penyebab bintang satu', 'ความเร็วในการทำ ความถูกต้อง และต้นเหตุของหนึ่งดาว'),
    ],
    [
      t('Всё выше в порядке, хочется больше', 'All of the above is fine, you want more', 'Semua di atas beres, ingin lebih', 'ทุกข้อข้างบนเรียบร้อย และอยากได้เพิ่ม'),
      '5',
      t('Реклама', 'Ads', 'Iklan', 'โฆษณา'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('За сколько станет заметно?', 'How soon will it show?', 'Berapa lama sampai terasa?', 'อีกนานแค่ไหนถึงจะเห็นผล'),
      t('Первые изменения — 2–4 недели, полная раскачка — 3–6 месяцев. Быстрее всего отзываются доступность и ставки. Конверсия карточки и рейтинг набираются медленнее, потому что алгоритму нужна история.',
        'First movement in 2–4 weeks, full ramp-up in 3–6 months. Availability and bidding respond fastest. Listing conversion and rating take longer because the algorithm needs history.',
        'Perubahan pertama dalam 2–4 minggu, hasil penuh dalam 3–6 bulan. Ketersediaan dan bid paling cepat merespons. Konversi listing dan rating butuh waktu lebih lama karena algoritma perlu riwayat.', 'เห็นความเคลื่อนไหวแรกใน 2-4 สัปดาห์ เต็มกำลังใน 3-6 เดือน ความพร้อมขายและการบิดตอบสนองเร็วที่สุด ส่วนการเปลี่ยนคนดูเป็นออร์เดอร์และเรตติ้งใช้เวลานานกว่า เพราะอัลกอริทึมต้องสะสมประวัติ'),
    ],
    [
      t('У меня новый ресторан, заказов не было вообще. Это тот же порядок?',
        'My restaurant is new and has never had orders. Is the order the same?',
        'Restoran saya baru dan belum pernah ada pesanan. Urutannya sama?', 'ร้านของเราเพิ่งเปิดและยังไม่เคยมีออร์เดอร์เลย ลำดับเดียวกันไหม'),
      t('Тот же, но первая ступень у нового ресторана — не офлайн, а отсутствие истории: алгоритму нечего показывать. Поэтому у новых важнее скорость набора первых отзывов и стабильность первых недель.',
        'The same, but for a new restaurant step one is not offline time — it is the absence of history: the algorithm has nothing to show. So for new places what matters most is how fast the first reviews come in and how stable the first weeks are.',
        'Sama, tetapi untuk restoran baru tahap satu bukan waktu offline, melainkan tidak adanya riwayat: algoritma tidak punya apa-apa untuk ditampilkan. Jadi bagi yang baru, yang paling penting adalah seberapa cepat ulasan pertama masuk dan seberapa stabil minggu-minggu pertama.', 'ลำดับเดียวกัน แต่สำหรับร้านใหม่ ขั้นที่หนึ่งไม่ใช่การปิดในระบบ แต่คือการไม่มีประวัติ อัลกอริทึมไม่มีอะไรจะเอาไปแสดง ดังนั้นสำหรับร้านใหม่ สิ่งที่สำคัญที่สุดคือรีวิวแรก ๆ มาเร็วแค่ไหน และไม่กี่สัปดาห์แรกนิ่งแค่ไหน'),
    ],
    [
      t('Можно ли это сделать самому?', 'Can I do this myself?', 'Bisakah saya melakukannya sendiri?', 'ทำเองได้ไหม'),
      t('Можно. Список задач открытый, ничего секретного в нём нет. Вопрос в том, что это ежедневная работа, а не проект на выходные, — и в том, сколько стоит ваше время.',
        'You can. The task list is open, there is nothing secret in it. The question is that this is daily work, not a weekend project — and what your own time costs.',
        'Bisa. Daftar tugasnya terbuka, tidak ada yang rahasia. Persoalannya, ini pekerjaan harian, bukan proyek akhir pekan — dan berapa nilai waktu Anda sendiri.', 'ได้ รายการงานทั้งหมดเปิดเผย ไม่มีอะไรเป็นความลับ ประเด็นคือมันเป็นงานที่ต้องทำทุกวัน ไม่ใช่โปรเจกต์สุดสัปดาห์ และเวลาของคุณมีต้นทุนเท่าไหร่'),
    ],
    [
      t('Если я просто подниму бюджет на рекламу?',
        'What if I just raise the ad budget?',
        'Bagaimana kalau saya naikkan saja anggaran iklan?', 'ถ้าเพิ่มงบโฆษณาเฉย ๆ ล่ะ'),
      t('Если карточка не конвертит, больший бюджет купит больше просмотров без заказов. Это самый быстрый способ потратить деньги впустую.',
        'If the listing does not convert, a bigger budget buys more views without orders. It is the fastest way to waste money.',
        'Kalau listing tidak berkonversi, anggaran yang lebih besar hanya membeli lebih banyak tampilan tanpa pesanan. Itu cara tercepat membuang uang.', 'ถ้าหน้าร้านยังเปลี่ยนคนดูเป็นออร์เดอร์ไม่ได้ งบที่มากขึ้นก็แค่ซื้อคนดูเพิ่มโดยไม่ได้ออร์เดอร์ เป็นวิธีเผาเงินที่เร็วที่สุด'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Мало заказов в GrabFood и GoFood. С чего начинать искать причину',
            'Few orders on GrabFood and GoFood. Where to start looking for the cause',
            'Orderan sepi di GrabFood dan GoFood. Mulai cari penyebabnya dari mana',
            'ออร์เดอร์น้อยบน GrabFood และ GoFood เริ่มหาสาเหตุจากตรงไหน')}
      lead={t(
        'Почти все начинают с рекламы. Заказов мало — значит, надо купить показы. Это самая дорогая из возможных ошибок, потому что реклама умножает то, что уже есть: если карточка не превращает просмотры в заказы, больший бюджет купит больше просмотров без заказов. Заказ проходит пять ступеней, и на каждой он может потеряться. Искать причину надо по порядку — сверху вниз, а не с той ступени, где есть кнопка «пополнить бюджет». Ниже — тот же порядок, в котором мы разбираем аккаунты ресторанов на Бали и Пхукете, с цифрами из их кабинетов.',
        'Almost everyone starts with ads. Few orders means buy impressions. That is the most expensive mistake available, because ads multiply what is already there: if the listing does not turn views into orders, a bigger budget buys more views without orders. An order passes through five steps, and it can be lost at each one. Look for the cause in order — top down, not from the step that has a "top up budget" button. Below is the same order we work through on restaurant accounts in Bali and Phuket, with the numbers from their dashboards.',
        'Hampir semua orang mulai dari iklan. Pesanan sepi berarti beli tayangan. Itu kesalahan termahal yang tersedia, karena iklan melipatgandakan apa yang sudah ada: kalau listing tidak mengubah tampilan menjadi pesanan, anggaran yang lebih besar hanya membeli lebih banyak tampilan tanpa pesanan. Sebuah pesanan melewati lima tahap, dan di setiap tahap ia bisa hilang. Cari penyebabnya berurutan — dari atas ke bawah, bukan dari tahap yang punya tombol "tambah anggaran". Berikut urutan yang sama yang kami jalankan pada akun restoran di Bali dan Phuket, dengan angka dari dashboard mereka.',
        'เกือบทุกคนเริ่มจากโฆษณา ออร์เดอร์น้อยก็แปลว่าต้องซื้อการมองเห็น นั่นคือความผิดพลาดที่แพงที่สุดเท่าที่มี เพราะโฆษณาคูณสิ่งที่มีอยู่แล้ว ถ้าหน้าร้านเปลี่ยนคนดูเป็นออร์เดอร์ไม่ได้ งบที่มากขึ้นก็แค่ซื้อคนดูเพิ่มโดยไม่ได้ออร์เดอร์ ออร์เดอร์หนึ่งใบผ่านห้าขั้น และหลุดได้ทุกขั้น ให้ไล่หาสาเหตุตามลำดับจากบนลงล่าง ไม่ใช่เริ่มจากขั้นที่มีปุ่ม "เติมงบ" ด้านล่างคือลำดับเดียวกับที่เราใช้ตรวจบัญชีร้านอาหารในบาหลีและภูเก็ต พร้อมตัวเลขจากแดชบอร์ดของพวกเขา')}
      meta={{ datePublished: '2026-09-14', minutes: 8 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Мало заказов в GrabFood и GoFood — порядок диагностики',
                      'Few orders on GrabFood and GoFood — the diagnostic order',
                      'Orderan sepi di GrabFood dan GoFood — urutan diagnosis',
                      'ออร์เดอร์น้อยบน GrabFood และ GoFood — ลำดับการวินิจฉัย'),
          url: URL,
          about: 'GrabFood orders, GoFood orders, delivery app ranking, listing conversion, restaurant rating, Bali, Phuket',
          datePublished: '2026-09-14',
          dateModified: '2026-09-14',
          language,
        }),
      ]}
    >
      <Block card title={t('Пять ступеней, на которых теряется заказ',
                           'The five steps where an order is lost',
                           'Lima tahap tempat pesanan hilang', 'ห้าขั้นที่ออร์เดอร์หลุดหายไป')}>
        <div className="space-y-6">
          {steps.map(([title, body]) => (
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

      <Block title={t('Как понять, на какой ступени вы',
                      'How to tell which step you are on',
                      'Cara tahu Anda ada di tahap mana', 'จะรู้ได้อย่างไรว่าคุณอยู่ขั้นไหน')}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="py-3 pr-4 font-semibold">
                  {t('Что видите в кабинете', 'What you see in the dashboard', 'Yang Anda lihat di dashboard', 'สิ่งที่เห็นในแดชบอร์ด')}
                </th>
                <th className="py-3 pr-4 font-semibold whitespace-nowrap">
                  {t('Ступень', 'Step', 'Tahap', 'ขั้น')}
                </th>
                <th className="py-3 font-semibold">
                  {t('Что чинить', 'What to fix', 'Yang diperbaiki', 'สิ่งที่ต้องแก้')}
                </th>
              </tr>
            </thead>
            <tbody>
              {ladder.map(([sees, step, fix]) => (
                <tr key={sees} className="border-b border-white/10 align-top">
                  <td className="py-3 pr-4 text-brand-muted">{sees}</td>
                  <td className="py-3 pr-4 font-semibold text-brand-green whitespace-nowrap">{step}</td>
                  <td className="py-3 text-brand-muted">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-brand-muted text-sm mt-5 max-w-3xl">
          {t('Порядок важнее скорости: ступень 5 при сломанной ступени 1 — это оплаченные показы карточки, которую нельзя заказать.',
             'Order matters more than speed: step 5 with a broken step 1 means paying for impressions of a listing nobody can order from.',
             'Urutan lebih penting daripada kecepatan: tahap 5 dengan tahap 1 yang rusak berarti membayar tayangan untuk listing yang tidak bisa dipesan.',
             'ลำดับสำคัญกว่าความเร็ว การทำขั้นที่ 5 ทั้งที่ขั้นที่ 1 ยังพัง คือการจ่ายเงินให้คนเห็นร้านที่สั่งไม่ได้')}
        </p>
      </Block>

      <Block card title={t('Кто это делает', 'Who does this', 'Siapa yang mengerjakannya', 'ใครเป็นคนทำ')}>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t(
            'Всё перечисленное — не разовая настройка, а ежедневная работа: стопы снимаются и ставятся каждый день, ставки ведутся вручную, отзывы разбираются по причинам, промо пересчитывается каждую неделю.',
            'Everything above is not a one-off setup but daily work: item stops go on and off every day, bids are managed by hand, reviews are broken down by cause, promos are recalculated every week.',
            'Semua di atas bukan setelan sekali jadi, melainkan pekerjaan harian: stop item dibuka dan ditutup setiap hari, bid dikelola manual, ulasan diurai berdasarkan penyebab, promo dihitung ulang setiap minggu.',
            'ทั้งหมดข้างบนไม่ใช่การตั้งค่าครั้งเดียวจบ แต่เป็นงานประจำวัน เมนูถูกเปิดปิดทุกวัน บิดโฆษณาคุมด้วยมือ รีวิวถูกแยกตามต้นเหตุ โปรโมชันคำนวณใหม่ทุกสัปดาห์')}
        </p>
        <p className="text-brand-muted max-w-3xl mb-4">
          {t('Поэтому вопрос «что делать» почти сразу превращается в вопрос «кто это будет делать». Вариантов четыре: сам владелец, менеджер в штате, фрилансер или агентство. При одинаковом списке задач они дают разный результат — мы разобрали разницу отдельно, ',
             'That is why "what to do" turns into "who will do it" almost immediately. There are four options: the owner, an in-house manager, a freelancer or an agency. Given the same task list they produce different results — we broke the difference down separately, ',
             'Karena itu pertanyaan "apa yang harus dilakukan" hampir langsung berubah menjadi "siapa yang akan melakukannya". Ada empat pilihan: pemilik sendiri, manajer internal, freelancer, atau agensi. Dengan daftar tugas yang sama hasilnya berbeda — kami menguraikan bedanya terpisah, ',
             'คำถามว่า "ต้องทำอะไร" จึงกลายเป็นคำถามว่า "ใครจะเป็นคนทำ" แทบจะทันที ทางเลือกมีสี่แบบ คือเจ้าของทำเอง จ้างผู้จัดการประจำ จ้างฟรีแลนซ์ หรือใช้เอเจนซี ด้วยรายการงานเดียวกัน ผลลัพธ์ต่างกัน เราแยกอธิบายไว้ต่างหาก ')}
          <Link href="/answers/in-house-manager-vs-agency" className="text-brand-green hover:underline">
            {t('кому отдать GrabFood и GoFood', 'who should run GrabFood and GoFood', 'siapa yang sebaiknya mengelola GrabFood dan GoFood', 'ใครควรดูแล GrabFood และ GoFood')}
          </Link>
          {t(', и посчитали, ', ', and we counted ', ', dan kami menghitung ', ' และเราคำนวณไว้ว่า ')}
          <Link href="/answers/managing-grabfood-yourself" className="text-brand-green hover:underline">
            {t('сколько часов в неделю занимает вести аккаунт самому', 'how many hours a week running the account yourself takes', 'berapa jam per minggu yang dibutuhkan untuk mengelola sendiri', 'การดูแลบัญชีเองใช้เวลากี่ชั่วโมงต่อสัปดาห์')}
          </Link>
          {t('.', '.', '.', '')}
        </p>
        <p className="text-brand-muted max-w-3xl">
          {t('Мы — Delivery Booster, агентство, которое ведёт доставку ресторанов на Бали и Пхукете. Цифры выше — из кабинетов наших клиентов, а не из примеров. Что именно мы делаем и сколько это стоит — ',
             'We are Delivery Booster, the agency that runs delivery for restaurants in Bali and Phuket. The numbers above come from our clients’ dashboards, not from illustrations. What exactly we do and what it costs — ',
             'Kami Delivery Booster, agensi yang mengelola delivery restoran di Bali dan Phuket. Angka-angka di atas berasal dari dashboard klien kami, bukan dari contoh karangan. Apa persisnya yang kami kerjakan dan berapa biayanya — ',
             'เราคือ Delivery Booster เอเจนซีที่ดูแลงานเดลิเวอรี่ให้ร้านอาหารในบาหลีและภูเก็ต ตัวเลขข้างบนมาจากแดชบอร์ดของลูกค้าเราจริง ไม่ใช่ตัวอย่างสมมติ เราทำอะไรบ้างและราคาเท่าไหร่ ดูได้')}
          <Link href="/" className="text-brand-green hover:underline">
            {t('на главной', 'on the home page', 'di beranda', 'ที่หน้าแรก')}
          </Link>
          {t(' и ', ' and ', ' dan ', ' และ')}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('в методе', 'in the method', 'di halaman metode', 'ในหน้าวิธีทำงาน')}
          </Link>
          .
        </p>
      </Block>

      <Block title={t('Кейсы с полными цифрами', 'Case studies with the full numbers', 'Studi kasus dengan angka lengkap', 'เคสพร้อมตัวเลขเต็ม')}>
        <p className="text-brand-muted max-w-3xl">
          <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">
            Enjoy Healthy Food
          </Link>
          {t(' — доля офлайна 73% → 0%, показы 7 038 → 25 543 в месяц. ',
             ' — offline rate 73% → 0%, impressions 7,038 → 25,543 a month. ',
             ' — porsi offline 73% → 0%, tayangan 7.038 → 25.543 per bulan. ',
             ' — ชั่วโมงปิดในระบบ 73% → 0% การมองเห็น 7,038 → 25,543 ต่อเดือน ')}
          <Link href="/cases/ussr-phuket" className="text-brand-green hover:underline">
            USSR Phuket
          </Link>
          {t(' — 3 977 минут офлайна убрали, показы в поиске 0 → 7 481, рейтинг 4.5 → 4.8. ',
             ' — 3,977 offline minutes removed, search impressions 0 → 7,481, rating 4.5 → 4.8. ',
             ' — 3.977 menit offline dihilangkan, tayangan pencarian 0 → 7.481, rating 4,5 → 4,8. ',
             ' — ลบเวลาปิดในระบบ 3,977 นาที การมองเห็นในการค้นหา 0 → 7,481 เรตติ้ง 4.5 → 4.8 ')}
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">
            Etna Phuket
          </Link>
          {t(' — сквозная конверсия 0.5% при среднем 0.9%, ROAS 14.75x → 34.57x. ',
             ' — 0.5% through-conversion against a 0.9% average, ROAS 14.75x → 34.57x. ',
             ' — konversi menyeluruh 0,5% terhadap rata-rata 0,9%, ROAS 14,75x → 34,57x. ',
             ' — อัตราการสั่งซื้อ 0.5% เทียบค่าเฉลี่ย 0.9% ROAS 14.75 → 34.57 เท่า ')}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">
            Zaytun Ubud
          </Link>
          {t(' — реклама GoFood из убытка ROAS 0.25x в 15.52x, рейтинг 4.67 → 4.8.',
             ' — GoFood ads from a loss-making 0.25x ROAS to 15.52x, rating 4.67 → 4.8.',
             ' — iklan GoFood dari ROAS 0,25x yang merugi menjadi 15,52x, rating 4,67 → 4,8.',
             ' — โฆษณา GoFood จากขาดทุนที่ ROAS 0.25 เท่า เป็น 15.52 เท่า เรตติ้ง 4.67 → 4.8')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <KeepReading currentHref="/answers/few-orders-grabfood-gofood" />

      <AnswerCta />
    </AnswerLayout>
  );
}
