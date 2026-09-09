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

const URL = 'https://booster.delivery/answers/grabfood-ads-not-working';

/** Answer page for the live complaint "I pay for GrabFood ads but orders are
 *  not increasing" (ID: "udh pkai iklan, tetap sepi"). Diagnostic order first,
 *  then the real dashboard numbers behind each step. */
export default function AnswersAdsNotWorkingPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Плачу за рекламу в GrabFood, а заказов больше нет — почему'
        : language === 'id'
          ? 'Saya bayar iklan GrabFood, tapi pesanan tidak bertambah — kenapa?'
          : language === 'th'
            ? 'จ่ายค่าโฆษณา GrabFood แล้วแต่ออร์เดอร์ไม่เพิ่ม — เพราะอะไร?'
            : 'I’m paying for GrabFood ads but orders are not increasing — why?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Реклама покупает показы, а не заказы. Порядок диагностики: доступность, конверсия карточки, экономика промо, рейтинг — и только потом ставки. С реальными цифрами кабинетов: конверсия 0.5% → 1.9%, ROAS 0.25x → 15.52x.'
          : language === 'id'
            ? 'Iklan membeli tayangan, bukan pesanan. Urutan diagnosisnya: ketersediaan, konversi listing, ekonomi promo, rating — dan baru setelah itu bid. Dengan angka nyata dari dashboard: konversi 0.5% → 1.9%, ROAS 0.25x → 15.52x.'
            : language === 'th'
              ? 'โฆษณาซื้ออิมเพรสชัน ไม่ได้ซื้อออร์เดอร์ ลำดับการตรวจ: ความพร้อมขาย คอนเวอร์ชั่นของหน้าร้าน เศรษฐศาสตร์ของโปรโมชั่น เรตติ้ง — แล้วจึงค่อยถึงการตั้งบิด พร้อมตัวเลขจริงจากแดชบอร์ด: คอนเวอร์ชั่น 0.5% → 1.9%, ROAS 0.25x → 15.52x'
              : 'Ads buy impressions, not orders. The diagnostic order: availability, listing conversion, promo economics, rating — and only then bids. With real dashboard numbers: conversion 0.5% → 1.9%, ROAS 0.25x → 15.52x.';
    syncOpenGraph();
  }, [language]);

  const steps: Array<[string, string]> = [
    [
      t('1. Доступность: офлайн-часы и отмены',
        '1. Availability: offline hours and cancellations',
        '1. Ketersediaan: jam offline dan pembatalan', '1. ความพร้อมขาย: ชั่วโมงที่ร้านปิดในระบบ และการยกเลิก'),
      t('Самая частая и самая дорогая причина. Пока ресторан офлайн, реклама либо не крутится, либо ведёт в закрытую карточку, а алгоритм запоминает ненадёжность и режет органические показы. У USSR Phuket было 3 977 минут офлайна в месяц; после того как их убрали, показы в поиске выросли с нуля до 7 481 в месяц. У Enjoy Healthy Food доля офлайна была 73% — после доведения до 0% показы выросли с 7 038 до 25 543 в месяц.',
        'The most common and most expensive cause. While the restaurant is offline, ads either do not run or lead to a closed listing — and the algorithm remembers the unreliability and cuts organic impressions. USSR Phuket had 3,977 offline minutes a month; once removed, search impressions went from zero to 7,481 a month. Enjoy Healthy Food had a 73% offline rate — brought to 0%, impressions grew from 7,038 to 25,543 a month.',
        'Penyebab paling sering dan paling mahal. Selama restoran offline, iklan tidak berjalan atau justru mengarah ke listing yang tutup — dan algoritma mengingat ketidakandalan itu lalu memotong tayangan organik. USSR Phuket punya 3,977 menit offline per bulan; setelah itu dihilangkan, tayangan di pencarian naik dari nol ke 7,481 per bulan. Enjoy Healthy Food punya porsi offline 73% — setelah dibawa ke 0%, tayangan naik dari 7,038 ke 25,543 per bulan.', 'สาเหตุที่พบบ่อยที่สุดและแพงที่สุด ระหว่างที่ร้านปิดในระบบ โฆษณาจะไม่ทำงานหรือไม่ก็พาลูกค้าไปเจอร้านที่ปิดอยู่ และอัลกอริทึมจะจำความไม่น่าเชื่อถือนั้นแล้วลดการมองเห็นแบบธรรมชาติลง USSR Phuket เคยปิดในระบบ 3,977 นาทีต่อเดือน พอแก้แล้ว การมองเห็นในการค้นหาขึ้นจากศูนย์เป็น 7,481 ครั้งต่อเดือน ส่วน Enjoy Healthy Food ปิดในระบบถึง 73% ลดเหลือ 0% การมองเห็นเพิ่มจาก 7,038 เป็น 25,543 ครั้งต่อเดือน'),
    ],
    [
      t('2. Конверсия карточки: смотрят, но не заказывают',
        '2. Listing conversion: they look but do not order',
        '2. Konversi listing: dilihat, tapi tidak dipesan', '2. การเปลี่ยนคนดูเป็นออร์เดอร์: คนเห็นแต่ไม่สั่ง'),
      t('Если показы есть, а заказов нет, реклама ни при чём — не работает карточка. У Etna Phuket карточку видели 39 211 человек в месяц, заказ делали 182: сквозная конверсия 0.5% при средней по нашему флоту 0.9%. Меню открывали только 5.2% увидевших. Пока это не починено, каждый вложенный в рекламу доллар покупает ещё один просмотр без заказа.',
        'If impressions are there and orders are not, ads are not the problem — the listing is. At Etna Phuket, 39,211 people saw the listing monthly and 182 ordered: 0.5% through-conversion against our 0.9% fleet average. Only 5.2% of viewers even opened the menu. Until that is fixed, every ad dollar buys one more look without an order.',
        'Kalau tayangan ada tetapi pesanan tidak, masalahnya bukan iklan — melainkan listing. Di Etna Phuket, 39,211 orang melihat listing per bulan dan 182 memesan: konversi menyeluruh 0.5% terhadap rata-rata 0.9% di portofolio kami. Hanya 5.2% dari yang melihat sampai membuka menu. Selama itu belum diperbaiki, setiap dolar iklan hanya membeli satu tampilan lagi tanpa pesanan.', 'ถ้ามีคนเห็นแต่ไม่มีออร์เดอร์ ปัญหาไม่ได้อยู่ที่โฆษณา แต่อยู่ที่หน้าร้าน ที่ Etna Phuket มีคนเห็นหน้าร้าน 39,211 คนต่อเดือน แต่สั่งจริง 182 คน คิดเป็น 0.5% เทียบกับค่าเฉลี่ย 0.9% ของร้านที่เราดูแล และมีเพียง 5.2% ของคนที่เห็นเท่านั้นที่กดเข้าไปดูเมนู ตราบใดที่ยังไม่แก้ตรงนี้ ทุกบาทที่จ่ายค่าโฆษณาก็แค่ซื้อสายตาเพิ่มอีกหนึ่งคู่โดยไม่ได้ออร์เดอร์'),
    ],
    [
      t('3. Экономика промо: скидка ради скидки',
        '3. Promo economics: discounting for its own sake',
        '3. Ekonomi promo: diskon demi diskon', '3. เศรษฐศาสตร์ของโปรโมชัน: ลดราคาเพราะต้องลด'),
      t('Промо поднимает позицию в выдаче и режет маржу одновременно. Считать надо не «сколько заказов пришло по акции», а сколько осталось после скидки, комиссии площадки и стоимости рекламы. Промо, которое не окупается, выглядит как рост заказов и работает как убыток.',
        'A promo lifts your position and cuts your margin at the same time. What matters is not "how many orders the promo brought" but what is left after the discount, the platform commission and the ad spend. A promo that does not pay back looks like order growth and behaves like a loss.',
        'Promo menaikkan posisi Anda dan memotong margin pada saat yang sama. Yang penting bukan "berapa pesanan yang datang dari promo", melainkan berapa yang tersisa setelah diskon, komisi platform, dan biaya iklan. Promo yang tidak balik modal terlihat seperti pertumbuhan pesanan dan bekerja seperti kerugian.', 'โปรโมชันดันอันดับขึ้นและกินมาร์จิ้นไปพร้อมกัน สิ่งที่ต้องดูไม่ใช่ว่าโปรทำออร์เดอร์ได้กี่ใบ แต่คือเหลืออะไรหลังหักส่วนลด ค่าคอมมิชชันแพลตฟอร์ม และค่าโฆษณา โปรที่ไม่คุ้มทุนหน้าตาเหมือนออร์เดอร์โต แต่พฤติกรรมคือขาดทุน'),
    ],
    [
      t('4. Рейтинг и отзывы',
        '4. Rating and reviews',
        '4. Rating dan ulasan', '4. เรตติ้งและรีวิว'),
      t('С 4.8 алгоритм отдаёт показы щедрее, и человек, выбирающий между двумя карточками, смотрит на цифру рядом с названием. Реклама приводит его к карточке — рейтинг решает, закажет ли он. У USSR Phuket рейтинг вырос с 4.5 до 4.8, у Zaytun Ubud — с 4.67 до 4.8.',
        'From 4.8 the algorithm serves impressions more generously, and a customer choosing between two listings looks at the number next to the name. Ads bring them to the listing; the rating decides whether they order. USSR Phuket went from 4.5 to 4.8, Zaytun Ubud from 4.67 to 4.8.',
        'Mulai dari 4.8 algoritma memberi tayangan lebih murah hati, dan pelanggan yang memilih di antara dua listing melihat angka di sebelah nama. Iklan membawa mereka ke listing; rating yang menentukan apakah mereka memesan. USSR Phuket naik dari 4.5 ke 4.8, Zaytun Ubud dari 4.67 ke 4.8.', 'ตั้งแต่ 4.8 ขึ้นไป อัลกอริทึมปล่อยการมองเห็นให้ใจกว้างขึ้น และลูกค้าที่เลือกระหว่างสองร้านก็ดูตัวเลขข้างชื่อร้าน โฆษณาพาคนมาถึงหน้าร้าน แต่เรตติ้งเป็นตัวตัดสินว่าเขาจะสั่งไหม USSR Phuket ขึ้นจาก 4.5 เป็น 4.8 ส่วน Zaytun Ubud จาก 4.67 เป็น 4.8'),
    ],
    [
      t('5. И только теперь — сама реклама',
        '5. And only now — the ads themselves',
        '5. Dan baru sekarang — iklannya sendiri', '5. และค่อยมาถึงตัวโฆษณาเอง'),
      t('Автоставка набирает дешёвые нерелевантные показы: платите за тех, кто не кликает. У Etna мы перешли на ручной CPO с ежедневным ведением — CTR вырос с 2.8% до 5.59%, стоимость заказа упала с 42 до 29 бат, ROAS с 14.75x до 34.57x. Бюджет при этом подняли всего на 50%, а выручка с рекламы выросла в 3.4 раза. У Zaytun Ubud кампании GoFood шли в убыток с ROAS 0.25x — потратили 3,1 млн рупий, вернули 763 тысячи; после пересборки ROAS 15.52x при почти том же бюджете.',
        'Auto-bidding buys cheap, irrelevant impressions: you pay for people who do not click. At Etna we switched to manual CPO with daily management — CTR went from 2.8% to 5.59%, cost per order from 42 to 29 THB, ROAS from 14.75x to 34.57x. The budget rose only 50% while ads revenue grew 3.4x. At Zaytun Ubud, GoFood campaigns were losing money at 0.25x ROAS — Rp 3.1M spent, Rp 763K returned; after the rebuild, 15.52x on nearly the same budget.',
        'Bid otomatis mengumpulkan tayangan murah yang tidak relevan: Anda membayar orang yang tidak mengklik. Di Etna kami beralih ke CPO manual dengan pengelolaan harian — CTR naik dari 2.8% ke 5.59%, biaya per pesanan turun dari 42 ke 29 THB, ROAS dari 14.75x ke 34.57x. Anggaran hanya naik 50%, sementara omzet dari iklan tumbuh 3.4x. Di Zaytun Ubud kampanye GoFood merugi dengan ROAS 0.25x — Rp 3.1M keluar, Rp 763K kembali; setelah dirakit ulang, 15.52x dengan anggaran yang hampir sama.', 'การบิดอัตโนมัติซื้อการมองเห็นราคาถูกที่ไม่ตรงกลุ่ม คุณจ่ายให้คนที่ไม่กด ที่ Etna เราเปลี่ยนมาคุม CPO เองและดูแลทุกวัน CTR ขึ้นจาก 2.8% เป็น 5.59% ต้นทุนต่อออร์เดอร์ลดจาก 42 เหลือ 29 บาท ROAS จาก 14.75 เป็น 34.57 เท่า งบเพิ่มแค่ 50% แต่ยอดขายจากโฆษณาโต 3.4 เท่า ส่วนที่ Zaytun Ubud แคมเปญ GoFood ขาดทุนที่ ROAS 0.25 เท่า จ่ายไป 3.1 ล้านรูเปียห์ ได้กลับมา 763 พัน หลังรื้อใหม่ได้ 15.52 เท่าบนงบเกือบเท่าเดิม'),
    ],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Как понять, что моя реклама окупается нормально?',
        'How do I know if my ads are actually paying off?',
        'Bagaimana saya tahu iklan saya benar-benar balik modal?', 'จะรู้ได้อย่างไรว่าโฆษณาของเราคุ้มจริงหรือเปล่า'),
      t('Наши клиенты держат 20–27x, в отдельных кампаниях выше. Но ROAS без контекста обманчив: он считается по выручке с рекламы и не учитывает скидку, комиссию площадки и то, что часть этих заказов пришла бы и без рекламы. Смотреть надо на связку ROAS + сквозная конверсия + маржа после промо.',
        'Our clients hold 20–27x, higher in individual campaigns. But ROAS in isolation is misleading: it counts ads revenue and ignores your discount, the platform commission, and the share of those orders you would have received anyway. Read ROAS together with through-conversion and post-promo margin.',
        'Klien kami bertahan di 20–27x, pada kampanye tertentu lebih tinggi. Tapi ROAS tanpa konteks menyesatkan: angka itu menghitung omzet dari iklan dan mengabaikan diskon Anda, komisi platform, serta bagian pesanan yang tetap datang tanpa iklan. Baca ROAS bersama konversi menyeluruh dan margin setelah promo.', 'ลูกค้าของเราอยู่ที่ 20-27 เท่า บางแคมเปญสูงกว่านั้น แต่ดู ROAS อย่างเดียวจะหลงทาง เพราะมันนับเฉพาะยอดขายจากโฆษณา และไม่นับส่วนลดของคุณ ค่าคอมมิชชันแพลตฟอร์ม และสัดส่วนออร์เดอร์ที่คุณจะได้อยู่แล้วโดยไม่ต้องยิงโฆษณา ต้องอ่าน ROAS คู่กับอัตราการเปลี่ยนคนดูเป็นออร์เดอร์และมาร์จิ้นหลังโปร'),
    ],
    [
      t('Если я подниму бюджет на рекламу, заказов станет больше?',
        'If I raise my ad budget, will I get more orders?',
        'Kalau anggaran iklan saya naikkan, pesanan saya bertambah?', 'ถ้าเพิ่มงบโฆษณา จะได้ออร์เดอร์เพิ่มไหม'),
      t('Если карточка не конвертит, больший бюджет купит больше просмотров без заказов — это самый быстрый способ потратить деньги впустую. У Etna мы подняли бюджет на 50% уже ПОСЛЕ того, как починили карточку и ставки, и получили втрое больше выручки с рекламы.',
        'If the listing does not convert, a bigger budget buys more views without orders — the fastest way to waste money. At Etna we raised the budget 50% only AFTER fixing the listing and the bidding, and got 3.4x the ads revenue.',
        'Kalau listing tidak berkonversi, anggaran yang lebih besar hanya membeli lebih banyak tampilan tanpa pesanan — cara tercepat membuang uang. Di Etna kami menaikkan anggaran 50% justru SETELAH listing dan bid diperbaiki, dan mendapat 3.4x omzet dari iklan.', 'ถ้าหน้าร้านยังเปลี่ยนคนดูเป็นออร์เดอร์ไม่ได้ งบที่มากขึ้นก็แค่ซื้อคนดูเพิ่มโดยไม่ได้ออร์เดอร์ ซึ่งเป็นวิธีเผาเงินที่เร็วที่สุด ที่ Etna เราเพิ่มงบ 50% หลังจากแก้หน้าร้านและระบบบิดเสร็จแล้วเท่านั้น แล้วได้ยอดขายจากโฆษณาโต 3.4 เท่า'),
    ],
    [
      t('Через сколько я увижу рост заказов?',
        'How soon will I see my orders start growing?',
        'Berapa lama sampai saya lihat pesanan mulai naik?', 'อีกนานแค่ไหนกว่าออร์เดอร์จะเริ่มโต'),
      t('Первые изменения — 2–4 недели, полная раскачка — 3–6 месяцев. Быстрее всего отзываются доступность и ставки; конверсия карточки и рейтинг набираются медленнее, потому что алгоритму нужна история.',
        'First movement in 2–4 weeks, full ramp-up in 3–6 months. Availability and bidding respond fastest; listing conversion and rating take longer because the algorithm needs history.',
        'Perubahan pertama dalam 2–4 minggu, hasil penuh dalam 3–6 bulan. Ketersediaan dan bid paling cepat merespons; konversi listing dan rating butuh waktu lebih lama karena algoritma perlu riwayat.', 'เห็นความเคลื่อนไหวแรกใน 2-4 สัปดาห์ เต็มกำลังใน 3-6 เดือน ความพร้อมขายและการบิดตอบสนองเร็วที่สุด ส่วนการเปลี่ยนคนดูเป็นออร์เดอร์และเรตติ้งใช้เวลานานกว่า เพราะอัลกอริทึมต้องสะสมประวัติ'),
    ],
    [
      t('У меня хорошая карточка — мне вообще нужна реклама?',
        'My listing is good — do I still need ads at all?',
        'Halaman toko saya sudah bagus — apa saya masih perlu iklan?', 'หน้าร้านของเราดีอยู่แล้ว ยังต้องยิงโฆษณาอีกไหม'),
      t('Нужна — но как усилитель, а не как замена. Реклама покупает показы; заказ делает карточка. В правильном порядке реклама умножает то, что уже работает; в неправильном — оплачивает то, что не работает.',
        'Yes — but as an amplifier, not a substitute. Ads buy impressions; the listing earns the order. In the right order, ads multiply what already works; in the wrong one, they pay for what does not.',
        'Perlu — tapi sebagai penguat, bukan pengganti. Iklan membeli tayangan; listing yang menghasilkan pesanan. Dalam urutan yang benar, iklan melipatgandakan yang sudah bekerja; dalam urutan yang salah, iklan membayari yang tidak bekerja.', 'ต้อง แต่ในฐานะตัวขยาย ไม่ใช่ตัวแทน โฆษณาซื้อการมองเห็น หน้าร้านเป็นตัวทำให้เกิดออร์เดอร์ ถ้าเรียงลำดับถูก โฆษณาจะทวีสิ่งที่ได้ผลอยู่แล้ว ถ้าเรียงผิด มันก็จ่ายเงินให้กับสิ่งที่ไม่ได้ผล'),
    ],
  ];

  /** Что видно в кабинете в первые дни — мост от статьи к услуге через факты,
   *  а не через обещания. Цифры — из нашего флота и из медиан по Бали. */
  const findings: Array<[string, string]> = [
    [
      t('Реклама ведёт на карточку с выключенными позициями',
        'Ads point at a listing with items switched off',
        'Iklan mengarah ke listing yang itemnya dimatikan', 'โฆษณาชี้ไปที่หน้าร้านที่มีเมนูถูกปิดอยู่'),
      t('Мимо ресторана в среднем проходит 25% выручки, и 95% этих потерь — именно выключенные позиции: не закрытый ресторан (3%) и не отмены (2%). Мы регулярно видим 40–70 позиций, выключенных одновременно, а отдельные блюда висят в стопе больше 2000 часов. Каждый оплаченный клик в это время ведёт человека в меню, где половины хитов нет.',
        'On average 25% of revenue leaks past the restaurant, and 95% of that loss is switched-off items — not a closed restaurant (3%), not cancellations (2%). We routinely see 40–70 items off at once, and individual dishes stuck in the stop-list for over 2,000 hours. Every paid click in that window sends someone to a menu where half the bestsellers are missing.',
        'Rata-rata 25% omzet lolos begitu saja, dan 95% kerugian itu berasal dari item yang dimatikan — bukan restoran yang tutup (3%), bukan pembatalan (2%). Kami rutin menemukan 40–70 item mati sekaligus, dan ada hidangan yang tertahan di stop-list lebih dari 2.000 jam. Setiap klik berbayar pada saat itu membawa orang ke menu yang kehilangan separuh menu terlarisnya.', 'โดยเฉลี่ย 25% ของยอดขายรั่วไหลออกไปจากร้าน และ 95% ของส่วนที่หายคือเมนูที่ถูกปิด ไม่ใช่ร้านปิด (3%) ไม่ใช่การยกเลิก (2%) เราเจอเมนูถูกปิดพร้อมกัน 40-70 รายการเป็นเรื่องปกติ และบางเมนูค้างในสต็อปลิสต์เกิน 2,000 ชั่วโมง ทุกคลิกที่คุณจ่ายเงินในช่วงนั้น คือการส่งคนไปเจอเมนูที่ของขายดีหายไปครึ่งหนึ่ง'),
    ],
    [
      t('Расход на рекламу перевалил за 6% выручки',
        'Ad spend has crossed 6% of revenue',
        'Belanja iklan sudah melewati 6% dari omzet', 'ค่าโฆษณาเกิน 6% ของยอดขายแล้ว'),
      t('Это граница, за которой реклама перестаёт окупаться: до неё медианный ROAS 12.1x, после — 8.6x. За этой границей сейчас 42% ресторанов нашего флота. Симптом ровно тот, с которым к нам приходят: бюджет растёт, заказы — нет.',
        'That is the line where ads stop paying back: below it the median ROAS is 12.1x, above it 8.6x. 42% of the restaurants in our fleet are already past that line. The symptom is exactly the one owners arrive with: the budget grows, the orders do not.',
        'Itulah batas ketika iklan berhenti balik modal: di bawahnya ROAS median 12.1x, di atasnya 8.6x. Saat ini 42% restoran di portofolio kami sudah melewati batas itu. Gejalanya persis seperti yang dibawa pemilik saat datang ke kami: anggaran naik, pesanan tidak.', 'นั่นคือเส้นที่โฆษณาหยุดคุ้มทุน ต่ำกว่าเส้นนี้ ROAS มัธยฐานอยู่ที่ 12.1 เท่า สูงกว่านั้นเหลือ 8.6 เท่า ร้าน 42% ที่เราดูแลเลยเส้นนี้ไปแล้ว อาการตรงกับที่เจ้าของร้านมาหาเราพอดี: งบโต ออร์เดอร์ไม่โต'),
    ],
    [
      t('Ваши две цифры не сходятся с медианой рынка',
        'Your two numbers do not line up with the market median',
        'Dua angka Anda tidak sejalan dengan median pasar', 'ตัวเลขสองตัวของคุณไม่ตรงกับค่ามัธยฐานของตลาด'),
      t('Медианы Бали, с которыми мы сверяем каждый аккаунт: средний чек Rp 250k, ROAS 10.4x, реклама 5.6% выручки, отмены 0.35%. Поставьте рядом свою долю рекламы в выручке и свой ROAS — из этой пары сразу видно, покупаете вы заказы или показы.',
        'The Bali medians we check every account against: Rp 250k average check, 10.4x ROAS, ads at 5.6% of revenue, 0.35% cancellations. Put your own ad share of revenue and your own ROAS next to them — that pair shows immediately whether you are buying orders or impressions.',
        'Median Bali yang kami pakai membandingkan setiap akun: rata-rata nilai pesanan Rp 250k, ROAS 10.4x, iklan 5.6% dari omzet, pembatalan 0.35%. Sandingkan porsi iklan terhadap omzet dan ROAS Anda sendiri — dari pasangan itu langsung terlihat apakah Anda membeli pesanan atau tayangan.', 'ค่ามัธยฐานบาหลีที่เราใช้ตรวจทุกบัญชี: ยอดต่อบิล 250,000 รูเปียห์ ROAS 10.4 เท่า ค่าโฆษณา 5.6% ของยอดขาย การยกเลิก 0.35% ลองวางสัดส่วนค่าโฆษณาต่อยอดขายและ ROAS ของคุณเทียบดู คู่นี้บอกทันทีว่าคุณกำลังซื้อออร์เดอร์หรือซื้อแค่การมองเห็น'),
    ],
    [
      t('Рейтинг сбит единицами, которые никто не оспаривал',
        'The rating is dragged down by one-stars nobody contested',
        'Rating jatuh oleh bintang satu yang tak pernah dibantah', 'เรตติ้งถูกดึงลงด้วยรีวิวหนึ่งดาวที่ไม่มีใครโต้แย้ง'),
      t('Отзывы бимодальны: 51% пятёрок, 28% единиц и всего 3% четвёрок — рейтинг делают крайности. Медиана Бали — один негативный отзыв на 138 заказов. Около 80% апелляций, которые мы подаём на Grab, заканчиваются снятием отзыва, но подавать их обычно некому. Рекламный трафик тем временем приходит на карточку с уже сбитой цифрой.',
        'Reviews are bimodal: 51% five-stars, 28% one-stars and only 3% fours — the extremes make the rating. The Bali median is one negative review per 138 orders. Around 80% of the appeals we file with Grab end with the review removed, but usually nobody is filing them. Meanwhile the ad traffic lands on a listing whose number is already down.',
        'Ulasan bersifat bimodal: 51% bintang lima, 28% bintang satu, dan hanya 3% bintang empat — yang membentuk rating adalah ekstremnya. Median Bali adalah satu ulasan negatif per 138 pesanan. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus, tapi biasanya tidak ada yang mengajukannya. Sementara itu trafik iklan mendarat di listing yang angkanya sudah jatuh.', 'รีวิวกระจุกอยู่สองขั้ว: ห้าดาว 51% หนึ่งดาว 28% ส่วนสี่ดาวมีแค่ 3% ขั้วสองข้างเป็นตัวกำหนดเรตติ้ง ค่ามัธยฐานบาหลีคือรีวิวลบหนึ่งครั้งต่อ 138 ออร์เดอร์ การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว แต่ส่วนใหญ่ไม่มีใครยื่นเลย ระหว่างนั้นทราฟฟิกจากโฆษณาก็ลงมาที่หน้าร้านที่ตัวเลขตกไปแล้ว'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Плачу за рекламу в GrabFood, а заказов больше не стало. Почему?',
            'I’m paying for GrabFood ads but orders are not increasing. Why?',
            'Saya bayar iklan GrabFood, tapi pesanan tidak bertambah. Kenapa?', 'จ่ายค่าโฆษณา GrabFood แล้ว แต่ออร์เดอร์ไม่เพิ่ม เพราะอะไร')}
      lead={t(
        'Потому что реклама покупает показы, а не заказы. Если карточка не конвертит, ресторан часто офлайн или рейтинг ниже 4.8 — реклама просто быстрее приводит людей туда, где они не заказывают. Ниже — порядок, в котором мы разбираем это у клиентов: сначала доступность, потом конверсия карточки, промо и рейтинг, и только пятым пунктом ставки. В такой последовательности реклама начинает работать почти всегда; в обратной — почти никогда.',
        'Because ads buy impressions, not orders. If your listing does not convert, your restaurant is often offline, or your rating is below 4.8, ads simply bring people faster to a place where they do not order. Below is the order we work through with clients: availability first, then listing conversion, promos and rating — and bidding only fifth. In that sequence ads almost always start working; in the reverse one, almost never.',
        'Karena iklan membeli tayangan, bukan pesanan. Kalau listing Anda tidak berkonversi, restoran sering offline, atau rating di bawah 4.8, iklan hanya membawa orang lebih cepat ke tempat yang tidak membuat mereka memesan. Berikut urutan yang kami jalankan bersama klien: ketersediaan dulu, lalu konversi listing, promo dan rating — dan bid baru di urutan kelima. Dengan urutan itu iklan hampir selalu mulai bekerja; dengan urutan sebaliknya, hampir tidak pernah.'
      , 'เพราะโฆษณาซื้อการมองเห็น ไม่ได้ซื้อออร์เดอร์ ถ้าหน้าร้านของคุณเปลี่ยนคนดูเป็นออร์เดอร์ไม่ได้ ร้านปิดในระบบบ่อย หรือเรตติ้งต่ำกว่า 4.8 โฆษณาก็แค่พาคนไปถึงที่ที่เขาไม่สั่งได้เร็วขึ้น ด้านล่างคือลำดับที่เราทำงานกับลูกค้า: ความพร้อมขายก่อน แล้วค่อยเป็นการเปลี่ยนคนดูเป็นออร์เดอร์ โปรโมชัน และเรตติ้ง ส่วนการบิดโฆษณามาเป็นอันดับห้า เรียงแบบนี้โฆษณามักเริ่มได้ผล เรียงกลับด้านมักไม่ได้ผล')}
      meta={{ datePublished: '2026-09-08', dateModified: '2026-09-09', minutes: 7 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Почему реклама в GrabFood не приносит заказов',
                      'Why GrabFood ads are not bringing orders',
                      'Kenapa iklan GrabFood tidak menghasilkan pesanan', 'ทำไมโฆษณา GrabFood ถึงไม่สร้างออร์เดอร์'),
          url: URL,
          about: 'GrabAds, GrabFood advertising, ROAS, delivery app ranking, listing conversion',
          datePublished: '2026-09-08',
          dateModified: '2026-09-08',
          language,
        }),
      ]}
    >
      <Block card title={t('Порядок диагностики', 'The diagnostic order', 'Urutan diagnosis', 'ลำดับการวินิจฉัย')}>
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

      <Block title={t('Главная ошибка', 'The one mistake', 'Kesalahan utama', 'ความผิดพลาดข้อเดียว')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Реклама — единственный рычаг, который работает мгновенно и виден в отчёте, поэтому за него хватаются первым. Остальные четыре пункта требуют ежедневной работы и не дают красивого графика на второй день. Но именно они определяют, во что превратится купленный показ. Реклама на неготовой карточке — это плата за скорость, с которой вы теряете клиента.',
            'Ads are the only lever that works instantly and shows up in a report, so they get pulled first. The other four steps require daily work and produce no pretty chart by day two. Yet they decide what a purchased impression turns into. Ads on an unprepared listing are payment for the speed at which you lose the customer.',
            'Iklan adalah satu-satunya tuas yang bekerja seketika dan terlihat di laporan, jadi itu yang pertama ditarik. Empat langkah lainnya menuntut kerja harian dan tidak memberi grafik cantik di hari kedua. Padahal justru merekalah yang menentukan jadi apa tayangan yang Anda beli. Iklan pada listing yang belum siap adalah biaya atas kecepatan Anda kehilangan pelanggan.'
          , 'โฆษณาเป็นคันโยกเดียวที่เห็นผลทันทีและขึ้นในรายงาน คนเลยดึงมันก่อน ส่วนอีกสี่ข้อต้องทำงานทุกวันและไม่มีกราฟสวย ๆ ให้ดูภายในวันที่สอง แต่มันคือสิ่งที่ตัดสินว่าการมองเห็นที่คุณซื้อมาจะกลายเป็นอะไร โฆษณาบนหน้าร้านที่ยังไม่พร้อม คือการจ่ายเงินซื้อความเร็วในการเสียลูกค้า')}
        </p>
      </Block>

      <Block card title={t('Кейсы с полными цифрами', 'Case studies with the full numbers', 'Studi kasus dengan angka lengkap', 'เคสพร้อมตัวเลขเต็ม')}>
        <p className="text-brand-muted max-w-3xl">
          <Link href="/cases/etna-phuket" className="text-brand-green hover:underline">
            Etna Phuket
          </Link>
          {t(' — заказы x2.2 на падающем трафике, ROAS 14.75x → 34.57x. ',
             ' — orders x2.2 on falling traffic, ROAS 14.75x → 34.57x. ',
             ' — pesanan x2.2 pada trafik yang menurun, ROAS 14.75x → 34.57x. ', ' — ออร์เดอร์ x2.2 บนทราฟฟิกที่ลดลง ROAS 14.75 → 34.57 เท่า ')}
          <Link href="/cases/zaytun-ubud" className="text-brand-green hover:underline">
            Zaytun Ubud
          </Link>
          {t(' — реклама GoFood из убытка ROAS 0.25x в 15.52x. ',
             ' — GoFood ads from a loss-making 0.25x ROAS to 15.52x. ',
             ' — iklan GoFood dari ROAS 0.25x yang merugi menjadi 15.52x. ', ' — โฆษณา GoFood จากขาดทุนที่ ROAS 0.25 เท่า เป็น 15.52 เท่า ')}
          <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">
            Enjoy Healthy Food
          </Link>
          {t(' — выручка x9.4 за 14 месяцев, доля офлайна 73% → 0%.',
             ' — revenue x9.4 in 14 months, offline rate 73% → 0%.',
             ' — omzet x9.4 dalam 14 bulan, porsi offline 73% → 0%.', ' — ยอดขาย x9.4 ใน 14 เดือน ชั่วโมงปิดในระบบ 73% → 0%')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <Block card title={t('Что мы находим на аккаунте вроде вашего',
                           'What we find on an account like yours',
                           'Apa yang kami temukan di akun seperti milik Anda', 'สิ่งที่เรามักเจอในบัญชีแบบของคุณ')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Не гипотезы, а то, что видно в первые дни, когда открываем кабинет ресторана с этой жалобой.',
            'Not hypotheses — what shows up in the first days when we open the dashboard of a restaurant with this complaint.',
            'Bukan hipotesis — inilah yang terlihat pada hari-hari pertama saat kami membuka dashboard restoran dengan keluhan ini.'
          , 'ไม่ใช่การเดา แต่คือสิ่งที่โผล่ขึ้นมาในไม่กี่วันแรกที่เราเปิดหลังบ้านของร้านที่มาด้วยอาการนี้')}
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

      <KeepReading currentHref="/answers/grabfood-ads-not-working" />

      <AnswerCta />
    </AnswerLayout>
  );
}
