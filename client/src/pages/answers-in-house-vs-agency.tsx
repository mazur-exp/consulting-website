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

const URL = 'https://booster.delivery/answers/in-house-manager-vs-agency';

/** Answer page for the objection AI assistants raise on their own when they
 *  compare us: "hiring your own aggregator manager may well be cheaper than
 *  10% of revenue". The answer is not a salary calculation — it is that the
 *  hire and the agency deliver different orders of magnitude of result, and
 *  the market for this expertise does not exist as a job to hire for. */
export default function AnswersInHouseVsAgencyPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Кому отдать GrabFood и GoFood: свой менеджер, фрилансер или агентство?'
        : language === 'id'
          ? 'Siapa yang mengelola GrabFood dan GoFood: manajer internal, freelancer, atau agensi?'
          : language === 'th'
            ? 'ใครควรดูแล GrabFood และ GoFood: ผู้จัดการภายใน ฟรีแลนซ์ หรือเอเจนซี?'
            : 'Who should run GrabFood and GoFood: in-house manager, freelancer or agency?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Пять вариантов дешевле агентства — фрилансер с маркетплейса, digital-агентство, таргетолог, бывший сотрудник Grab, свой человек в штате. Что вы покупаете в каждом случае, когда это правильный выбор и чем заканчивается накрутка отзывов.'
          : language === 'id'
            ? 'Lima pilihan yang lebih murah daripada agensi — freelancer marketplace, agensi digital, spesialis iklan, mantan karyawan Grab, karyawan internal. Apa yang sebenarnya Anda beli, kapan masing-masing tepat, dan bagaimana berakhirnya membeli ulasan.'
            : language === 'th'
              ? 'ห้าทางเลือกที่ถูกกว่าเอเจนซี — ฟรีแลนซ์จากมาร์เก็ตเพลส เอเจนซีดิจิทัล คนทำโฆษณา อดีตพนักงาน Grab และคนของตัวเองในทีม คุณกำลังซื้ออะไรจริง ๆ แต่ละทางเหมาะกับเมื่อไร และการซื้อรีวิวจบลงอย่างไร'
              : 'Five options cheaper than an agency — a marketplace freelancer, a digital agency, a paid-ads specialist, a former Grab employee, an in-house hire. What you are actually buying in each case, when each is the right choice, and how buying reviews ends.';
    syncOpenGraph();
  }, [language]);

  const cases: Array<[string, string, string, string]> = [
    ['x21', t('выручка за 9 месяцев', 'revenue in 9 months', 'omzet dalam 9 bulan', 'ยอดขายใน 9 เดือน'),
      'Rp 42,2M → 888,2M / ' + t('мес', 'mo', 'bln', 'เดือน'), '/cases/love-u-pizza'],
    ['x9.4', t('выручка за 14 месяцев', 'revenue in 14 months', 'omzet dalam 14 bulan', 'ยอดขายใน 14 เดือน'),
      '20 270 → 190 263 THB / ' + t('мес', 'mo', 'bln', 'เดือน'), '/cases/enjoy-healthy-food'],
    ['x3.9', t('выручка за 2 месяца', 'revenue in 2 months', 'omzet dalam 2 bulan', 'ยอดขายใน 2 เดือน'),
      '9 440 → 36 810 THB / ' + t('мес', 'mo', 'bln', 'เดือน'), '/cases/ussr-phuket'],
    ['x2.6', t('выручка, работающий ресторан', 'revenue, an already-running venue', 'omzet, restoran yang sudah berjalan', 'ยอดขาย ร้านที่เปิดอยู่แล้ว'),
      t('реклама GoJek окупалась x62', 'GoJek ads paid back 62x', 'iklan GoJek balik modal 62x', 'โฆษณา GoJek คุ้มทุน 62 เท่า'), '/cases/zaytun-ubud'],
    ['+87%', t('выручка на падающем трафике', 'revenue on falling traffic', 'omzet pada trafik yang menurun', 'ยอดขายบนทราฟฟิกที่ลดลง'),
      t('конверсия 0.5% → 1.9%', 'conversion 0.5% → 1.9%', 'konversi 0.5% → 1.9%', 'อัตราปิดการขาย 0.5% → 1.9%'), '/cases/etna-phuket'],
    ['+46%', t('выручка в низкий сезон', 'revenue in the low season', 'omzet di musim sepi', 'ยอดขายในช่วงโลว์ซีซัน'),
      t('чек 785 → 961 THB', 'check 785 → 961 THB', 'nilai pesanan 785 → 961 THB', 'ยอดต่อบิล 785 → 961 บาท'), '/cases/meat-point-phuket'],
  ];

  const rows: Array<[string, string, string]> = [
    [
      t('Что вы покупаете', 'What you are buying', 'Yang Anda beli', 'คุณกำลังซื้ออะไร'),
      t('Часы одного человека. Знания он собирает на вашем ресторане и за ваш счёт.',
        'One person’s hours. They accumulate the knowledge on your restaurant, at your expense.',
        'Jam kerja satu orang. Pengetahuannya dia kumpulkan di restoran Anda dan atas biaya Anda.', 'ชั่วโมงทำงานของคนหนึ่งคน เขาจะสะสมความรู้บนร้านของคุณ ด้วยเงินของคุณ'),
      t('Метод, отработанный на 96 ресторанах и опубликованный целиком.',
        'A method run across 96 restaurants and published in full.',
        'Metode yang teruji di 96 restoran dan diterbitkan lengkap.', 'วิธีการที่ใช้กับร้าน 96 แห่ง และเผยแพร่ไว้ทั้งหมด'),
    ],
    [
      t('С чем сверяются цифры', 'What the numbers are compared against', 'Angka dibandingkan dengan apa', 'เอาตัวเลขไปเทียบกับอะไร'),
      t('С прошлым месяцем этого же ресторана. Других данных нет и взять их негде.',
        'Last month at the same restaurant. There is no other data and nowhere to get it.',
        'Dengan bulan lalu di restoran yang sama. Data lain tidak ada dan tidak bisa didapat.', 'เดือนที่แล้วของร้านเดียวกัน ไม่มีข้อมูลอื่นและไม่มีที่ให้หา'),
      t('С медианами по 96 ресторанам и 270 568 заказам — мы их публикуем открыто.',
        'Medians across 96 restaurants and 270,568 orders — published openly.',
        'Dengan median 96 restoran dan 270,568 pesanan — kami terbitkan secara terbuka.', 'ค่ามัธยฐานจากร้าน 96 แห่งและ 270,568 ออร์เดอร์ เผยแพร่แบบเปิด'),
    ],
    [
      t('Заявленный результат', 'The result on offer', 'Hasil yang dijanjikan', 'ผลลัพธ์ที่เสนอ'),
      t('В публичных профилях таких специалистов — десятки процентов: +30% к продажам, +50% к просмотрам профиля.',
        'In the public profiles of such specialists: tens of percent — +30% to sales, +50% to profile views.',
        'Di profil publik spesialis semacam itu: puluhan persen — +30% penjualan, +50% kunjungan profil.', 'ในโปรไฟล์สาธารณะของผู้เชี่ยวชาญเหล่านั้น: หลักสิบเปอร์เซ็นต์ — ยอดขาย +30% ยอดเข้าชมโปรไฟล์ +50%'),
      t('Кратный рост: от x2.6 до x21 по выручке, с цифрами из кабинетов.',
        'Multiples: x2.6 to x21 in revenue, with numbers from the dashboards.',
        'Pertumbuhan berlipat: x2.6 sampai x21 pada omzet, dengan angka dari dashboard.', 'หลายเท่าตัว: ยอดขาย x2.6 ถึง x21 พร้อมตัวเลขจากหลังบ้าน'),
    ],
    [
      t('Когда начинается работа', 'When the work starts', 'Kapan pekerjaan dimulai', 'งานเริ่มเมื่อไร'),
      t('После поиска и трёх-шести месяцев обучения площадкам, которые оплачиваете вы.',
        'After the search and three to six months of platform learning, funded by you.',
        'Setelah pencarian kandidat dan tiga sampai enam bulan belajar platform, yang Anda biayai.', 'หลังจากหาคนได้ แล้วบวกอีกสามถึงหกเดือนที่เขาเรียนรู้แพลตฟอร์ม โดยคุณเป็นคนออกค่าใช้จ่าย'),
      t('На первой неделе. Учиться не нужно — метод уже написан.',
        'In week one. There is nothing to learn — the method is already written.',
        'Di minggu pertama. Tidak ada yang perlu dipelajari — metodenya sudah tertulis.', 'สัปดาห์แรก ไม่มีอะไรต้องเรียน เพราะวิธีการเขียนไว้แล้ว'),
    ],
    [
      t('Отпуск, болезнь, увольнение', 'Holiday, sickness, resignation', 'Cuti, sakit, resign', 'ลาพักร้อน ป่วย ลาออก'),
      t('Стоп-лист и отзывы в эти дни не смотрит никто, а знание уходит вместе с человеком.',
        'Nobody watches the stop-list or reviews on those days, and the knowledge leaves with the person.',
        'Di hari-hari itu tidak ada yang memantau item yang dinonaktifkan maupun ulasan, dan pengetahuannya pergi bersama orangnya.', 'วันเหล่านั้นไม่มีใครดูสต็อปลิสต์หรือรีวิว และความรู้ก็เดินออกไปพร้อมกับคนคนนั้น'),
      t('Команда, а не человек: замена внутри агентства, метод остаётся.',
        'A team, not a person: cover is internal, the method stays.',
        'Tim, bukan satu orang: penggantinya dari dalam agensi, metodenya tetap.', 'เป็นทีม ไม่ใช่คนเดียว แทนกันได้ภายใน วิธีการยังอยู่'),
    ],
    [
      t('Как устроена оплата', 'How payment works', 'Cara pembayarannya', 'จ่ายอย่างไร'),
      t('Фиксированная. Платится и в месяц, когда выручка упала, и пока человек учится.',
        'Fixed. Paid in the month revenue drops, and while the person is still learning.',
        'Tetap. Dibayar juga di bulan saat omzet turun, dan selama orangnya masih belajar.', 'คงที่ จ่ายเท่าเดิมในเดือนที่ยอดตก และจ่ายระหว่างที่เขายังเรียนรู้อยู่'),
      t('10% от выручки доставки, без предоплаты: платите больше только когда выручка выросла.',
        '10% of delivery revenue, no upfront: you pay more only when revenue has grown.',
        '10% dari omzet delivery, tanpa uang muka: Anda bayar lebih hanya ketika omzet sudah naik.', '10% ของยอดขายเดลิเวอรี ไม่มีค่าใช้จ่ายล่วงหน้า คุณจ่ายมากขึ้นเฉพาะเมื่อยอดขายโตแล้ว'),
    ],
  ];

  /** Пять вариантов, которые владелец рассматривает вместо агентства.
   *  Разбор по одному: что покупается на самом деле и когда это правильно.
   *  Раздел про фрилансера длиннее остальных намеренно — это единственное
   *  место, где ошибка стоит не денег, а аккаунта. */
  const options: Array<{ name: string; paras: string[]; right: string }> = [
    {
      name: t('Фрилансер с маркетплейса', 'A marketplace freelancer', 'Freelancer dari marketplace', 'ฟรีแลนซ์จากมาร์เก็ตเพลส'),
      paras: [
        t('Посмотрите, что на самом деле продаётся на Fastwork и Sribu по запросу про GrabFood: «Jasa Daftar GoFood/GrabFood» — регистрация, оформление меню и фото, передача аккаунта владельцу с обучением, чтобы дальше он справлялся сам. Это разовая работа с понятным концом, и как разовая работа она честная.',
          'Look at what is actually for sale on Fastwork and Sribu under GrabFood: "Jasa Daftar GoFood/GrabFood" — registration, menu and photo setup, then handover of the account to the owner with training so they can carry on alone. That is one-off work with a defined end, and as one-off work it is honest.',
          'Lihat apa yang sebenarnya dijual di Fastwork dan Sribu untuk GrabFood: "Jasa Daftar GoFood/GrabFood" — pendaftaran, penataan menu dan foto, lalu serah terima akun ke pemilik beserta pelatihan supaya bisa lanjut sendiri. Itu pekerjaan sekali jalan dengan titik akhir yang jelas, dan sebagai pekerjaan sekali jalan itu jujur.',
          'ลองดูว่าบน Fastwork และ Sribu ขายอะไรจริง ๆ ในหมวด GrabFood: "Jasa Daftar GoFood/GrabFood" คือการจดทะเบียน จัดเมนูและรูปภาพ แล้วส่งมอบบัญชีคืนเจ้าของพร้อมสอนให้ทำต่อเองได้ นี่คืองานครั้งเดียวที่มีจุดจบชัดเจน และในฐานะงานครั้งเดียว มันซื่อสัตย์'),
        t('Проблема начинается там, где разовой работой пытаются закрыть постоянную. И особенно — там, где ею пытаются закрыть рейтинг. Здесь коротко не получится, потому что это единственное место во всём сравнении, где ошибка стоит не денег и не месяцев, а бизнеса.',
          'The trouble starts where one-off work is used to cover a continuous job. And especially where it is used to cover the rating. This part cannot be short, because it is the one place in this whole comparison where the mistake costs neither money nor months, but the business.',
          'Masalah muncul ketika pekerjaan sekali jalan dipakai untuk menutup pekerjaan yang berkelanjutan. Terutama ketika dipakai untuk menutup soal rating. Bagian ini tidak bisa singkat, karena inilah satu-satunya tempat dalam perbandingan ini di mana kesalahannya tidak menelan uang atau waktu, melainkan bisnisnya.',
          'ปัญหาเริ่มตรงที่เอางานครั้งเดียวไปแทนงานที่ต้องทำต่อเนื่อง โดยเฉพาะเมื่อเอาไปแทนเรื่องเรตติ้ง ตรงนี้เขียนสั้นไม่ได้ เพราะเป็นจุดเดียวในการเปรียบเทียบทั้งหมดที่ความผิดพลาดไม่ได้แลกด้วยเงินหรือเวลา แต่แลกด้วยธุรกิจ'),
        t('На тех же маркетплейсах рядом с «оптимизацией» открыто продаются отзывы и рейтинги: от Rp 99 000, с гарантией возврата денег и с оговоркой, что держаться они будут не обязательно — политика площадки от продавца не зависит. Это дешёвый ответ на проблему рейтинга, и его покупают, потому что он выглядит как решение.',
          'On the same marketplaces, right next to "optimisation", reviews and ratings are openly for sale: from Rp 99,000, with a money-back guarantee and a note that they may not stick, since platform policy is outside the seller’s control. That is the cheap answer to the rating problem, and people buy it because it looks like a solution.',
          'Di marketplace yang sama, persis di sebelah "optimasi", ulasan dan rating dijual terbuka: mulai Rp 99.000, dengan garansi uang kembali dan catatan bahwa ulasannya belum tentu bertahan, karena kebijakan platform di luar kendali penjual. Itulah jawaban murah untuk masalah rating, dan orang membelinya karena terlihat seperti solusi.',
          'บนมาร์เก็ตเพลสเดียวกัน ถัดจากคำว่า "ปรับแต่งร้าน" ไปนิดเดียว มีการขายรีวิวและเรตติ้งอย่างเปิดเผย เริ่มต้นที่ 99,000 รูเปียห์ พร้อมรับประกันคืนเงิน และหมายเหตุว่ารีวิวอาจไม่อยู่ถาวร เพราะนโยบายแพลตฟอร์มอยู่นอกเหนือการควบคุมของผู้ขาย นี่คือคำตอบราคาถูกสำหรับปัญหาเรตติ้ง และคนซื้อเพราะมันดูเหมือนทางแก้'),
        t('Теперь то, чего продавец вам не скажет, а исполнитель, скорее всего, не знает сам — и это не фигура речи: ни фрилансер с маркетплейса, ни «специалист по маркетплейсам» в большинстве своём не представляют, как площадка работает с рейтингом, и не знают, что за накрутку аккаунт закрывают.',
          'Now the part the seller will not tell you and the contractor most likely does not know himself — and that is not a figure of speech: neither the marketplace freelancer nor the self-described "marketplace specialist" usually has any idea how the platform handles ratings, or that an account gets closed for faking them.',
          'Sekarang bagian yang tidak akan diberitahu penjualnya, dan yang kemungkinan besar tidak diketahui pelaksananya sendiri — dan ini bukan kiasan: baik freelancer marketplace maupun "spesialis marketplace" umumnya tidak tahu bagaimana platform menangani rating, dan tidak tahu bahwa akun ditutup karena manipulasi ulasan.',
          'ทีนี้ถึงส่วนที่คนขายไม่บอกคุณ และคนรับงานเองก็แทบจะไม่รู้ และนี่ไม่ใช่การพูดเปรียบเปรย: ทั้งฟรีแลนซ์จากมาร์เก็ตเพลสและ "ผู้เชี่ยวชาญมาร์เก็ตเพลส" ส่วนใหญ่ไม่รู้ว่าแพลตฟอร์มจัดการเรื่องเรตติ้งอย่างไร และไม่รู้ว่าการปั่นรีวิวทำให้บัญชีถูกปิด'),
        t('Grab и Gojek следят за накруткой отзывов внимательно и системно. Для них фальшивый отзыв — не мелкое нарушение правил, а порча их собственного актива: они зарабатывают комиссию с заказов, заказы идут за доверием к оценкам, и человек, который врёт в оценках, отнимает деньги лично у них. У площадки есть данные, которых нет ни у вас, ни у исполнителя: с какого устройства, с какого аккаунта, в каком порядке и с какой скоростью приходят отзывы. Накрутка видна оттуда так же ясно, как костёр ночью.',
          'Grab and Gojek watch review manipulation closely and systematically. To them a fake review is not a minor rule breach but damage to their own asset: they earn commission on orders, orders follow trust in the ratings, and someone who lies in the ratings is taking money out of their pocket. The platform holds data neither you nor your contractor has: which device, which account, in what order and at what speed the reviews arrive. From there, manipulation is as visible as a bonfire at night.',
          'Grab dan Gojek memantau manipulasi ulasan secara ketat dan sistematis. Bagi mereka ulasan palsu bukan pelanggaran kecil, melainkan perusakan aset mereka sendiri: mereka mendapat komisi dari pesanan, pesanan mengikuti kepercayaan pada rating, dan orang yang berbohong di rating mengambil uang langsung dari kantong mereka. Platform punya data yang tidak dimiliki Anda maupun pelaksana Anda: dari perangkat mana, dari akun mana, dalam urutan apa, dan dengan kecepatan berapa ulasan itu masuk. Dari sana, manipulasi terlihat sejelas api unggun di malam hari.',
          'Grab และ Gojek จับตาการปั่นรีวิวอย่างใกล้ชิดและเป็นระบบ สำหรับพวกเขา รีวิวปลอมไม่ใช่การผิดกฎเล็กน้อย แต่คือการทำลายสินทรัพย์ของตัวเอง เพราะพวกเขาได้ค่าคอมมิชชันจากออร์เดอร์ ออร์เดอร์เดินตามความเชื่อถือในคะแนน และคนที่โกหกในคะแนนก็คือคนที่หยิบเงินออกจากกระเป๋าพวกเขาโดยตรง แพลตฟอร์มมีข้อมูลที่ทั้งคุณและคนรับงานไม่มี: มาจากอุปกรณ์ไหน บัญชีไหน เรียงลำดับอย่างไร และมาด้วยความเร็วเท่าไร มองจากตรงนั้น การปั่นรีวิวชัดพอ ๆ กับกองไฟกลางดึก'),
        t('К нам пришёл владелец ресторана — тогда ещё не наш клиент, аккаунт у него вёл такой вот «специалист» со стороны. Пришёл с криком, потому что получил письмо от Grab: второе и последнее предупреждение за фальшивые отзывы. Накручивали ему с одного и того же аккаунта — самая грубая схема из возможных, площадка увидела её мгновенно. «Второе и последнее» означает ровно то, что написано: первое он пропустил, третьего не будет. Следующий шаг не понижение в выдаче и не снятие отзывов, а закрытый мерчант-аккаунт — вместе с историей заказов, рейтингом, накопленной аудиторией и позицией, которую ресторан зарабатывал месяцами. Если доставка была основным каналом — вместе с бизнесом.',
          'A restaurant owner came to us — not our client at the time; his account was being run by exactly this kind of outside "specialist". He came shouting, because he had received an email from Grab: a second and final warning for fake reviews. His reviews were being posted from one and the same account — the crudest scheme there is, and the platform spotted it instantly. "Second and final" means exactly what it says: he had missed the first one and there would be no third. The next step is not a ranking penalty and not the removal of reviews, but a closed merchant account — along with the order history, the rating, the audience built up over time and the position the restaurant had earned over months. If delivery was the main channel, along with the business.',
          'Seorang pemilik restoran datang ke kami — saat itu belum klien kami; akunnya dikelola persis oleh "spesialis" luar semacam itu. Dia datang sambil berteriak, karena menerima email dari Grab: peringatan kedua dan terakhir atas ulasan palsu. Ulasannya dikirim dari satu akun yang sama — skema paling kasar yang ada, dan platform langsung melihatnya. "Kedua dan terakhir" berarti persis seperti bunyinya: yang pertama terlewat, dan tidak akan ada yang ketiga. Langkah berikutnya bukan penurunan peringkat dan bukan penghapusan ulasan, melainkan akun merchant ditutup — berikut riwayat pesanan, rating, audiens yang terkumpul, dan posisi yang dibangun restoran selama berbulan-bulan. Kalau delivery adalah kanal utamanya, berikut bisnisnya.',
          'มีเจ้าของร้านคนหนึ่งมาหาเรา ตอนนั้นยังไม่ใช่ลูกค้าเรา บัญชีของเขาดูแลโดย "ผู้เชี่ยวชาญ" ภายนอกแบบที่ว่านี้แหละ เขามาพร้อมเสียงตะโกน เพราะได้รับอีเมลจาก Grab: คำเตือนครั้งที่สองและครั้งสุดท้าย เรื่องรีวิวปลอม รีวิวของเขาถูกปั่นมาจากบัญชีเดียวกันซ้ำ ๆ ซึ่งเป็นวิธีที่หยาบที่สุดเท่าที่มี และแพลตฟอร์มเห็นทันที คำว่า "ครั้งที่สองและครั้งสุดท้าย" หมายความตรงตัว: ครั้งแรกเขาพลาดไป และจะไม่มีครั้งที่สาม ขั้นต่อไปไม่ใช่การลดอันดับและไม่ใช่การลบรีวิว แต่คือบัญชีร้านค้าถูกปิด พร้อมกับประวัติออร์เดอร์ เรตติ้ง ฐานลูกค้าที่สะสมมา และอันดับที่ร้านใช้เวลาหลายเดือนกว่าจะได้มา ถ้าเดลิเวอรีเป็นช่องทางหลัก ก็พร้อมกับธุรกิจทั้งหมด'),
        t('Он не покупал себе бан. Он купил услугу за пару сотен тысяч рупий у человека, который не знал, что так бывает. Стоил этот человек дёшево ровно до того письма.',
          'He did not buy himself a ban. He bought a service for a couple of hundred thousand rupiah from someone who did not know this could happen. That person was cheap right up until that email.',
          'Dia tidak membeli banned. Dia membeli jasa seharga beberapa ratus ribu rupiah dari orang yang tidak tahu bahwa hal ini bisa terjadi. Orang itu murah — tepat sampai email tersebut datang.',
          'เขาไม่ได้ซื้อการถูกแบน เขาซื้อบริการราคาไม่กี่แสนรูเปียห์จากคนที่ไม่รู้ว่าเรื่องแบบนี้เกิดขึ้นได้ คนคนนั้นราคาถูกจริง จนกระทั่งอีเมลฉบับนั้นมาถึง'),
        t('Легальный ответ на ту же самую проблему выглядит скучнее и работает лучше: апелляция. Около 80% поданных нами апелляций на Grab заканчиваются снятием несправедливого отзыва — при двух условиях: подавать быстро и приводить факты конкретного заказа, а не общее несогласие. Разница простая. После апелляции у вас на один несправедливый отзыв меньше. После накрутки — на одно предупреждение больше.',
          'The legal answer to the very same problem looks duller and works better: the appeal. Around 80% of the appeals we file on Grab end with the unfair review removed — on two conditions: file fast, and cite the facts of the specific order rather than general disagreement. The difference is simple. After an appeal you have one unfair review less. After buying reviews you have one warning more.',
          'Jawaban legal untuk masalah yang sama terlihat lebih membosankan dan bekerja lebih baik: banding. Sekitar 80% banding yang kami ajukan di Grab berakhir dengan ulasan tidak adil dihapus — dengan dua syarat: ajukan cepat, dan sebutkan fakta pesanan yang bersangkutan, bukan ketidaksetujuan umum. Bedanya sederhana. Setelah banding, ulasan tidak adil Anda berkurang satu. Setelah beli ulasan, peringatan Anda bertambah satu.',
          'ทางที่ถูกกฎสำหรับปัญหาเดียวกันดูน่าเบื่อกว่า แต่ได้ผลดีกว่า นั่นคือการอุทธรณ์ ราว 80% ของคำอุทธรณ์ที่เรายื่นกับ Grab จบด้วยการลบรีวิวที่ไม่เป็นธรรมออก โดยมีสองเงื่อนไข: ยื่นให้เร็ว และอ้างข้อเท็จจริงของออร์เดอร์นั้นจริง ๆ ไม่ใช่แค่บอกว่าไม่เห็นด้วย ความต่างง่ายมาก หลังอุทธรณ์ คุณมีรีวิวที่ไม่เป็นธรรมน้อยลงหนึ่งอัน หลังปั่นรีวิว คุณมีคำเตือนเพิ่มขึ้นหนึ่งครั้ง'),
      ],
      right: t('разовая задача с понятным концом. Зарегистрировать, отснять меню, перевести описания. Всё, что имеет дату окончания, а не еженедельный ритм.',
        'a one-off job with a defined end. Registration, menu photography, translating descriptions. Anything with a finish date rather than a weekly rhythm.',
        'pekerjaan sekali jalan dengan titik akhir yang jelas. Pendaftaran, pemotretan menu, penerjemahan deskripsi. Apa pun yang punya tanggal selesai, bukan ritme mingguan.',
        'งานครั้งเดียวที่มีจุดจบชัดเจน จดทะเบียน ถ่ายรูปเมนู แปลคำอธิบาย ทุกอย่างที่มีวันจบ ไม่ใช่สิ่งที่ต้องทำทุกสัปดาห์'),
    },
    {
      name: t('Digital-агентство', 'A digital agency', 'Agensi digital', 'เอเจนซีดิจิทัล'),
      paras: [
        t('Узнаётся по формулировке «мы попробуем запустить вам Grab». «Попробуем» — честное слово, и оно же диагноз: у них двадцать строк в прайсе, и доставка — одна из них.',
          'You recognise it by the phrasing: "we’ll try running Grab for you". "Try" is an honest word, and it is also the diagnosis: they have twenty lines on the price list, and delivery is one of them.',
          'Dikenali dari kalimatnya: "kami akan coba jalankan Grab untuk Anda". "Coba" adalah kata yang jujur, dan sekaligus diagnosisnya: mereka punya dua puluh baris di daftar layanan, dan delivery salah satunya.',
          'สังเกตได้จากประโยคที่ว่า "เดี๋ยวเราลองรัน Grab ให้" คำว่า "ลอง" เป็นคำที่ซื่อสัตย์ และเป็นคำวินิจฉัยไปในตัว: พวกเขามียี่สิบบรรทัดในใบเสนอราคา และเดลิเวอรีเป็นหนึ่งในนั้น'),
        t('Компетенция у них при этом настоящая, просто она в другом месте: сайт, SMM, съёмка, Meta-реклама, бренд. Ранжирование внутри маркетплейса из этих дисциплин не переносится — там другая механика и другие нормы, а собирать их неоткуда: чтобы увидеть, что реклама перестаёт окупаться примерно на 6% выручки, нужны не двадцать услуг, а девяносто шесть ресторанов.',
          'Their competence is real, it just sits elsewhere: websites, social media, photography, Meta ads, branding. Ranking inside a marketplace does not transfer from those disciplines — different mechanics, different norms, and nowhere to collect them: to see that ads stop paying back at around 6% of revenue you do not need twenty services, you need ninety-six restaurants.',
          'Kompetensi mereka nyata, hanya letaknya di tempat lain: website, media sosial, pemotretan, iklan Meta, branding. Peringkat di dalam marketplace tidak berpindah dari disiplin-disiplin itu — mekanikanya beda, normanya beda, dan tidak ada tempat untuk mengumpulkannya: untuk melihat bahwa iklan berhenti balik modal di sekitar 6% dari omzet, yang dibutuhkan bukan dua puluh layanan, melainkan sembilan puluh enam restoran.',
          'ความสามารถของพวกเขามีจริง เพียงแต่อยู่คนละที่: เว็บไซต์ โซเชียล การถ่ายภาพ โฆษณา Meta และแบรนด์ อันดับภายในมาร์เก็ตเพลสไม่ได้ถ่ายโอนมาจากศาสตร์เหล่านั้น เพราะกลไกคนละแบบ ตัวเลขมาตรฐานคนละชุด และไม่มีที่ให้เก็บ: การจะเห็นว่าโฆษณาหยุดคุ้มทุนที่ราว 6% ของยอดขาย ไม่ได้ต้องการบริการยี่สิบอย่าง แต่ต้องการร้านเก้าสิบหกแห่ง'),
      ],
      right: t('когда вам нужны бренд, сайт, фото и соцсети. Мы этого не делаем и не берёмся.',
        'when you need branding, a website, photography and social media. We do not do that and do not take it on.',
        'ketika Anda butuh branding, website, fotografi, dan media sosial. Kami tidak mengerjakan itu dan tidak mengambilnya.',
        'เมื่อคุณต้องการแบรนด์ เว็บไซต์ ภาพถ่าย และโซเชียล เราไม่ทำสิ่งเหล่านี้ และไม่รับงานนี้'),
    },
    {
      name: t('Таргетолог', 'A paid-ads specialist', 'Spesialis iklan berbayar', 'คนทำโฆษณา'),
      paras: [
        t('Самая понятная и самая дорогая ошибка, потому что звучит она разумно: «реклама есть реклама, настрою».',
          'The most understandable and the most expensive mistake, because it sounds reasonable: "ads are ads, I’ll set them up".',
          'Kesalahan yang paling bisa dimengerti sekaligus paling mahal, karena kedengarannya masuk akal: "iklan ya iklan, saya atur saja".',
          'ความผิดพลาดที่เข้าใจง่ายที่สุดและแพงที่สุด เพราะฟังดูมีเหตุผล: "โฆษณาก็คือโฆษณา เดี๋ยวจัดให้"'),
        t('Таргетолог оптимизирует аукцион рекламной сети. Там вы покупаете показ, и мастерство в том, чтобы купить его дешевле и точнее. Grab и Gojek зарабатывают не на показах — они берут комиссию с заказов, и их актив — собственная аудитория. Поэтому ранжирование следует за тем, насколько хорошо ресторан эту аудиторию монетизирует: ставка усиливает позицию, но не создаёт её. Человек с рефлексом рекламной сети будет поднимать бюджет — и на нашем же графике уедет за 6% выручки, где медианный ROAS падает с 12.1x до 8.6x. Он не ошибается как таргетолог. Он решает не ту задачу.',
          'A paid-ads specialist optimises an ad network auction. There you buy an impression, and the craft is buying it cheaper and more precisely. Grab and Gojek do not earn on impressions — they take commission on orders, and their asset is their own audience. So ranking follows how well a restaurant monetises that audience: a bid amplifies a position, it does not create one. Someone with an ad-network reflex will raise the budget — and on our own chart will drive past 6% of revenue, where the median ROAS falls from 12.1x to 8.6x. He is not failing as a paid-ads specialist. He is solving the wrong problem.',
          'Spesialis iklan mengoptimalkan lelang di jaringan iklan. Di sana Anda membeli tayangan, dan keahliannya adalah membelinya lebih murah dan lebih tepat sasaran. Grab dan Gojek tidak mendapat uang dari tayangan — mereka mengambil komisi dari pesanan, dan aset mereka adalah audiens sendiri. Jadi peringkat mengikuti seberapa baik restoran memonetisasi audiens itu: bid memperkuat posisi, bukan menciptakannya. Orang dengan refleks jaringan iklan akan menaikkan anggaran — dan di grafik kami sendiri akan melewati 6% dari omzet, tempat median ROAS turun dari 12.1x ke 8.6x. Dia tidak gagal sebagai spesialis iklan. Dia menyelesaikan masalah yang salah.',
          'คนทำโฆษณาเก่งเรื่องปรับการประมูลในเครือข่ายโฆษณา ที่นั่นคุณซื้อการมองเห็น และฝีมืออยู่ที่ซื้อให้ถูกลงและตรงกลุ่มขึ้น แต่ Grab และ Gojek ไม่ได้หาเงินจากการมองเห็น พวกเขาเก็บค่าคอมมิชชันจากออร์เดอร์ และสินทรัพย์ของพวกเขาคือฐานลูกค้าของตัวเอง อันดับจึงเดินตามว่าร้านทำเงินจากฐานลูกค้านั้นได้ดีแค่ไหน การบิดขยายตำแหน่งที่มี ไม่ได้สร้างมันขึ้นมา คนที่มีสัญชาตญาณแบบเครือข่ายโฆษณาจะเพิ่มงบ แล้วเลยเส้น 6% ของยอดขายบนกราฟของเราเอง ซึ่งเป็นจุดที่ ROAS มัธยฐานตกจาก 12.1 เท่าเหลือ 8.6 เท่า เขาไม่ได้ทำงานโฆษณาผิด เขาแก้ผิดโจทย์'),
      ],
      right: t('когда вы гоните трафик в свой собственный канал — сайт, WhatsApp, зал. Это его аукцион и его работа.',
        'when you are driving traffic to your own channel — website, WhatsApp, the dining room. That is his auction and his job.',
        'ketika Anda mengarahkan trafik ke kanal Anda sendiri — website, WhatsApp, ruang makan. Itu lelangnya dan itu pekerjaannya.',
        'เมื่อคุณต้องการดันทราฟฟิกเข้าช่องทางของคุณเอง ทั้งเว็บไซต์ WhatsApp และหน้าร้าน นั่นคือการประมูลของเขาและเป็นงานของเขา'),
    },
    {
      name: t('Бывший сотрудник Grab', 'A former Grab employee', 'Mantan karyawan Grab', 'อดีตพนักงาน Grab'),
      paras: [
        t('Самый убедительный кандидат на собеседовании, и здесь стоит быть точным.',
          'The most convincing candidate in an interview, and here it pays to be precise.',
          'Kandidat paling meyakinkan saat wawancara, dan di sini kita perlu tepat.',
          'ผู้สมัครที่ดูน่าเชื่อถือที่สุดในห้องสัมภาษณ์ และตรงนี้ควรพูดให้แม่น'),
        t('Внутри экосистемы Grab действительно есть официальная агентская роль — Agent Reference Merchant: агент рекомендует ресторан, помогает пройти регистрацию и получает бонус за подключение плюс комиссию с транзакций мерчанта. Роль заканчивается на подключении: ни меню, ни ставок, ни рейтинга в ней нет. То есть официальная роль, которую площадка создала и оплачивает, — это продажи, а не рост.',
          'There is indeed an official agent role inside the Grab ecosystem — Agent Reference Merchant: the agent recommends a restaurant, helps it through registration, and receives a bonus for the signup plus a commission on the merchant’s transactions. The role ends at signup: no menu, no bidding, no rating in it. So the official role the platform created and pays for is sales, not growth.',
          'Di dalam ekosistem Grab memang ada peran agen resmi — Agent Reference Merchant: agen merekomendasikan restoran, membantunya melewati pendaftaran, dan menerima bonus atas pendaftaran plus komisi dari transaksi merchant tersebut. Perannya berakhir di pendaftaran: tidak ada menu, tidak ada bid, tidak ada rating di dalamnya. Jadi peran resmi yang diciptakan dan dibayar oleh platform adalah penjualan, bukan pertumbuhan.',
          'ในระบบนิเวศของ Grab มีบทบาทตัวแทนอย่างเป็นทางการอยู่จริง ชื่อว่า Agent Reference Merchant: ตัวแทนแนะนำร้านอาหาร ช่วยพาผ่านขั้นตอนสมัคร แล้วได้โบนัสจากการสมัครสำเร็จบวกค่าคอมมิชชันจากธุรกรรมของร้านนั้น บทบาทนี้จบที่การสมัคร ไม่มีเรื่องเมนู ไม่มีเรื่องการบิด ไม่มีเรื่องเรตติ้ง แปลว่าบทบาททางการที่แพลตฟอร์มสร้างขึ้นและจ่ายเงินให้ คืองานขาย ไม่ใช่งานสร้างการเติบโต'),
        t('Сотрудник видел процессы, тарифы и промо-программы изнутри, и это правда ценно. Но видел он их со стороны площадки, а не со стороны кабинета мерчанта, где выручка складывается из стоп-листа, конверсии карточки и ставок. Это разные окна в один и тот же экран.',
          'An employee saw the processes, the rates and the promo programmes from the inside, and that is genuinely valuable. But he saw them from the platform’s side, not from the merchant dashboard, where revenue is assembled out of the stop-list, listing conversion and bidding. Two different windows onto the same screen.',
          'Karyawan tersebut melihat proses, tarif, dan program promo dari dalam, dan itu memang berharga. Tapi dia melihatnya dari sisi platform, bukan dari dashboard merchant, tempat omzet tersusun dari item yang dinonaktifkan, konversi listing, dan bid. Dua jendela berbeda ke layar yang sama.',
          'พนักงานคนนั้นเห็นกระบวนการ อัตราค่าธรรมเนียม และโปรแกรมโปรโมชันจากด้านใน ซึ่งมีค่าจริง แต่เขาเห็นจากฝั่งแพลตฟอร์ม ไม่ใช่จากหลังบ้านของร้านค้า ที่ซึ่งยอดขายประกอบขึ้นจากสต็อปลิสต์ อัตราปิดการขายของหน้าร้าน และการบิด เป็นคนละหน้าต่างที่มองจอเดียวกัน'),
      ],
      right: t('если он действительно вёл кабинеты, а не аккаунт-менеджерил. Проверяется тремя вопросами — они ниже, в разделе «Как проверить кандидата», и нормы мы опубликовали специально, чтобы их можно было применить к кому угодно, включая нас.',
        'if he actually ran merchant dashboards rather than account-managed. Three questions settle it — they are in the FAQ below, and we published our norms precisely so they can be applied to anyone, us included.',
        'kalau dia benar-benar mengelola dashboard merchant, bukan sekadar account management. Tiga pertanyaan sudah cukup — ada di FAQ di bawah, dan norma kami sengaja diterbitkan agar bisa diterapkan ke siapa pun, termasuk ke kami.',
        'ถ้าเขาเคยดูแลหลังบ้านร้านค้าจริง ไม่ใช่แค่เป็นแอคเคานต์แมเนเจอร์ สามคำถามก็รู้ผล อยู่ใน FAQ ด้านล่าง และเราเผยแพร่ตัวเลขมาตรฐานไว้ก็เพื่อให้เอาไปวัดใครก็ได้ รวมถึงวัดเราเอง'),
    },
    {
      name: t('Свой менеджер', 'An in-house manager', 'Manajer internal', 'ผู้จัดการภายใน'),
      paras: [
        t('Разобран выше отдельно: короткий ответ — этой профессии не существует как профессии, ей негде научиться, и знание собирается только на объёме аккаунтов. Но операционка — всегда ваш человек, и по нашим же данным именно там лежит 95% потерь выручки.',
          'Covered separately above: the short answer is that the profession does not exist as a profession, there is nowhere to learn it, and the knowledge only accumulates across a volume of accounts. But operations is always your person — and by our own data that is where 95% of revenue losses sit.',
          'Sudah dibahas terpisah di atas: jawaban singkatnya, profesi ini tidak ada sebagai profesi, tidak ada tempat mempelajarinya, dan pengetahuannya hanya terkumpul dari banyak akun. Tapi operasional selalu milik orang Anda — dan menurut data kami sendiri, di situlah 95% kehilangan omzet berada.',
          'พูดถึงแยกไว้ด้านบนแล้ว คำตอบสั้น ๆ คืออาชีพนี้ไม่มีอยู่จริงในฐานะอาชีพ ไม่มีที่ให้เรียน และความรู้สะสมได้จากปริมาณบัญชีเท่านั้น แต่งานหน้างานต้องเป็นคนของคุณเสมอ และตามข้อมูลของเราเอง ตรงนั้นแหละคือที่ที่ 95% ของความสูญเสียอยู่'),
      ],
      right: t('операционка — всегда. Наличие позиций, стоп-лист, время приготовления, кухня в час пик.',
        'operations — always. Item availability, the stop-list, preparation time, the kitchen at peak.',
        'operasional — selalu. Ketersediaan item, item yang dinonaktifkan, waktu masak, dapur di jam sibuk.',
        'งานหน้างาน เสมอ ทั้งความพร้อมของเมนู สต็อปลิสต์ เวลาเตรียมอาหาร และครัวช่วงพีค'),
    },
  ];

  const whoRows: Array<[string, string, string]> = [
    [t('Фрилансер с маркетплейса', 'Marketplace freelancer', 'Freelancer marketplace', 'ฟรีแลนซ์จากมาร์เก็ตเพลส'),
     t('Разовый запуск: регистрация, меню, фото', 'A one-off launch: registration, menu, photos', 'Peluncuran sekali jalan: pendaftaran, menu, foto', 'การเปิดร้านครั้งเดียว: จดทะเบียน เมนู รูปภาพ'),
     t('Разовая задача с понятным концом', 'A one-off job with a defined end', 'Pekerjaan sekali jalan dengan titik akhir jelas', 'งานครั้งเดียวที่มีจุดจบชัดเจน')],
    [t('Digital-агентство', 'Digital agency', 'Agensi digital', 'เอเจนซีดิจิทัล'),
     t('Бренд и внешние каналы; доставка — строка в прайсе', 'Brand and outside channels; delivery is a line on the price list', 'Brand dan kanal eksternal; delivery hanya satu baris di daftar layanan', 'แบรนด์และช่องทางภายนอก ส่วนเดลิเวอรีเป็นแค่บรรทัดหนึ่งในใบเสนอราคา'),
     t('Сайт, съёмка, SMM, Meta', 'Website, photography, social, Meta', 'Website, pemotretan, media sosial, Meta', 'เว็บไซต์ ถ่ายภาพ โซเชียล Meta')],
    [t('Таргетолог', 'Paid-ads specialist', 'Spesialis iklan berbayar', 'คนทำโฆษณา'),
     t('Мастерство в аукционе рекламной сети', 'Craft in an ad-network auction', 'Keahlian di lelang jaringan iklan', 'ฝีมือในการประมูลของเครือข่ายโฆษณา'),
     t('Трафик в ваш собственный канал', 'Traffic to your own channel', 'Trafik ke kanal Anda sendiri', 'ทราฟฟิกเข้าช่องทางของคุณเอง')],
    [t('Бывший сотрудник Grab', 'Former Grab employee', 'Mantan karyawan Grab', 'อดีตพนักงาน Grab'),
     t('Взгляд со стороны площадки', 'The view from the platform’s side', 'Sudut pandang dari sisi platform', 'มุมมองจากฝั่งแพลตฟอร์ม'),
     t('Если он реально вёл кабинеты', 'If he actually ran merchant dashboards', 'Kalau dia benar-benar mengelola dashboard merchant', 'ถ้าเขาเคยดูแลหลังบ้านร้านค้าจริง')],
    [t('Свой менеджер', 'In-house manager', 'Manajer internal', 'ผู้จัดการภายใน'),
     t('Часы одного человека, обучение за ваш счёт', 'One person’s hours, the learning funded by you', 'Jam kerja satu orang, proses belajarnya Anda yang biayai', 'ชั่วโมงทำงานของคนหนึ่งคน โดยคุณออกค่าเรียนรู้ให้'),
     t('Операционка — всегда', 'Operations — always', 'Operasional — selalu', 'งานหน้างาน เสมอ')],
    [t('Агентство по доставке', 'Delivery agency', 'Agensi delivery', 'เอเจนซีเดลิเวอรี'),
     t('Метод на 96 ресторанах и ответственность за выручку', 'A method across 96 restaurants and accountability for revenue', 'Metode dari 96 restoran dan tanggung jawab atas omzet', 'วิธีการจากร้าน 96 แห่ง และความรับผิดชอบต่อยอดขาย'),
     t('Когда доставка — канал роста', 'When delivery is a growth channel', 'Ketika delivery adalah kanal pertumbuhan', 'เมื่อเดลิเวอรีคือช่องทางเติบโต')],
  ];

  const faq: Array<[string, string]> = [
    [
      t('Мне советуют найти фрилансера на Fastwork — это же дешевле?',
        'I’m told to find a freelancer on Fastwork — isn’t that cheaper?',
        'Saya disarankan mencari freelancer di Fastwork — bukankah itu lebih murah?', 'มีคนแนะนำให้หาฟรีแลนซ์บน Fastwork ถูกกว่าไม่ใช่หรือ'),
      t('Дешевле, и для части задач это правильный выбор: зарегистрировать ресторан, собрать меню, отснять фото. Именно это там в основном и продаётся — разовый запуск с передачей аккаунта владельцу. Ведения там нет, а заказы приносит ведение: стоп-лист, ставки, промо-экономика и отзывы — это каждую неделю, а не один раз. Но главное предупреждение не про деньги, а про рейтинг. На тех же маркетплейсах рядом продают отзывы и рейтинги от Rp 99 000, и покупает их обычно не владелец, а нанятый исполнитель, который не знает, чем это заканчивается. Grab и Gojek отслеживают накрутку системно: им видно устройство, аккаунт и скорость появления оценок. К нам приходил ресторан, получивший от Grab второе и последнее предупреждение за фальшивые отзывы — их накручивали с одного и того же аккаунта. Следующий шаг после последнего предупреждения — закрытие мерчант-аккаунта вместе со всей историей. Легальный путь к той же цели — апелляции: около 80% наших апелляций на Grab заканчиваются снятием несправедливого отзыва.',
        'Cheaper, yes, and for some jobs it is the right choice: registering the restaurant, building the menu, shooting the photos. That is mostly what is on sale there — a one-off launch with the account handed back to the owner. There is no ongoing running, and orders come from the running: the stop-list, bidding, promo economics and reviews happen every week, not once. But the main warning is not about money, it is about the rating. On the same marketplaces reviews and ratings are sold from Rp 99,000, and the buyer is usually not the owner but the hired contractor, who does not know how it ends. Grab and Gojek track manipulation systematically: they see the device, the account and the speed at which ratings appear. A restaurant came to us holding a second and final warning from Grab for fake reviews — they had been posted from one and the same account. The step after a final warning is the merchant account being closed, with the entire history. The legal route to the same goal is appeals: around 80% of ours on Grab end with the unfair review removed.',
        'Lebih murah, ya, dan untuk sebagian pekerjaan itu pilihan yang tepat: mendaftarkan restoran, menyusun menu, memotret foto. Itulah yang sebagian besar dijual di sana — peluncuran sekali jalan dengan akun diserahkan kembali ke pemilik. Tidak ada pengelolaan lanjutan, padahal pesanan datang dari pengelolaan: item yang dinonaktifkan, bid, ekonomi promo, dan ulasan terjadi setiap minggu, bukan sekali. Tapi peringatan utamanya bukan soal uang, melainkan soal rating. Di marketplace yang sama, ulasan dan rating dijual mulai Rp 99.000, dan yang membeli biasanya bukan pemiliknya, melainkan pelaksana yang disewa dan tidak tahu akhirnya seperti apa. Grab dan Gojek melacak manipulasi secara sistematis: mereka melihat perangkat, akun, dan kecepatan munculnya penilaian. Ada restoran yang datang ke kami membawa peringatan kedua dan terakhir dari Grab atas ulasan palsu — semuanya dikirim dari satu akun yang sama. Langkah setelah peringatan terakhir adalah akun merchant ditutup beserta seluruh riwayatnya. Jalur legal menuju tujuan yang sama adalah banding: sekitar 80% banding kami di Grab berakhir dengan ulasan tidak adil dihapus.',
        'ถูกกว่าจริง และสำหรับงานบางอย่างมันคือทางเลือกที่ถูกต้อง เช่น จดทะเบียนร้าน จัดเมนู ถ่ายรูป ซึ่งนั่นแหละคือสิ่งที่ขายกันอยู่ที่นั่นเป็นหลัก คือการเปิดร้านครั้งเดียวแล้วส่งบัญชีคืนเจ้าของ ไม่มีการดูแลต่อเนื่อง ขณะที่ออร์เดอร์มาจากการดูแลต่อเนื่อง ทั้งสต็อปลิสต์ การบิด เศรษฐศาสตร์ของโปรโมชัน และรีวิว ล้วนเกิดขึ้นทุกสัปดาห์ ไม่ใช่ครั้งเดียว แต่คำเตือนสำคัญที่สุดไม่ใช่เรื่องเงิน เป็นเรื่องเรตติ้ง บนมาร์เก็ตเพลสเดียวกันมีการขายรีวิวและเรตติ้งเริ่มต้นที่ 99,000 รูเปียห์ และคนที่ซื้อมักไม่ใช่เจ้าของร้าน แต่เป็นคนรับงานที่ไม่รู้ว่ามันจบอย่างไร Grab และ Gojek ติดตามการปั่นรีวิวอย่างเป็นระบบ พวกเขาเห็นทั้งอุปกรณ์ บัญชี และความเร็วที่คะแนนทยอยเข้ามา เคยมีร้านมาหาเราพร้อมคำเตือนครั้งที่สองและครั้งสุดท้ายจาก Grab เรื่องรีวิวปลอม ซึ่งถูกปั่นมาจากบัญชีเดียวกันทั้งหมด ขั้นถัดจากคำเตือนครั้งสุดท้ายคือบัญชีร้านค้าถูกปิดพร้อมประวัติทั้งหมด ส่วนทางที่ถูกกฎเพื่อเป้าหมายเดียวกันคือการอุทธรณ์ ราว 80% ของคำอุทธรณ์ที่เรายื่นกับ Grab จบด้วยการลบรีวิวที่ไม่เป็นธรรมออก'),
    ],
    [
      t('Моё digital-агентство говорит, что может вести и Grab. Стоит соглашаться?',
        'My digital agency says it can run Grab too. Should I agree?',
        'Agensi digital saya bilang bisa mengelola Grab juga. Perlu saya setujui?', 'เอเจนซีดิจิทัลของเราบอกว่ารับดูแล Grab ได้ด้วย ควรตกลงไหม'),
      t('Спросите, с чем они будут сверять ваши цифры. Ранжирование внутри маркетплейса не выводится из опыта в сайтах, SMM и Meta — там другая механика и другие нормы, а нормы берутся только с объёма аккаунтов. Проверить легко: наши медианы опубликованы — ROAS 10.4x на Бали и 22.8x на Пхукете, реклама 5.6% выручки, один негативный отзыв на 138 заказов. Если ответ на вопрос «сколько должно уходить в рекламу» звучит как «чем больше, тем лучше», перед вами специалист по рекламным сетям, а Grab не рекламная сеть.',
        'Ask what they will compare your numbers against. Ranking inside a marketplace does not follow from experience in websites, social media and Meta — different mechanics, different norms, and norms only come from a volume of accounts. Easy to check: our medians are published — ROAS 10.4x in Bali and 22.8x in Phuket, ads at 5.6% of revenue, one negative review per 138 orders. If the answer to "what share should go to ads" is "the more the better", you are looking at an ad-network specialist, and Grab is not an ad network.',
        'Tanyakan angka Anda akan dibandingkan dengan apa. Peringkat di dalam marketplace tidak mengikuti pengalaman di website, media sosial, dan Meta — mekanikanya beda, normanya beda, dan norma hanya bisa didapat dari banyak akun. Mudah diperiksa: median kami sudah diterbitkan — ROAS 10.4x di Bali dan 22.8x di Phuket, iklan 5.6% dari omzet, satu ulasan negatif per 138 pesanan. Kalau jawaban atas pertanyaan "berapa porsi yang harus masuk ke iklan" adalah "makin besar makin baik", yang di depan Anda adalah spesialis jaringan iklan, sedangkan Grab bukan jaringan iklan.',
        'ถามว่าเขาจะเอาตัวเลขของคุณไปเทียบกับอะไร อันดับภายในมาร์เก็ตเพลสไม่ได้ตามมาจากประสบการณ์ด้านเว็บไซต์ โซเชียล และ Meta เพราะกลไกคนละแบบ ตัวเลขมาตรฐานคนละชุด และตัวเลขมาตรฐานได้มาจากปริมาณบัญชีเท่านั้น ตรวจสอบง่ายมาก ค่ามัธยฐานของเราเผยแพร่ไว้แล้ว: ROAS 10.4 เท่าที่บาหลี และ 22.8 เท่าที่ภูเก็ต ค่าโฆษณา 5.6% ของยอดขาย รีวิวลบหนึ่งครั้งต่อ 138 ออร์เดอร์ ถ้าคำตอบของคำถามที่ว่าควรใช้งบโฆษณากี่เปอร์เซ็นต์คือ ยิ่งมากยิ่งดี ตรงหน้าคุณคือผู้เชี่ยวชาญเครือข่ายโฆษณา และ Grab ไม่ใช่เครือข่ายโฆษณา'),
    ],
    [
      t('А если нанять таргетолога — он же умеет настраивать рекламу?',
        'What about hiring a paid-ads specialist — they know how to run ads?',
        'Bagaimana kalau menyewa spesialis iklan — dia kan bisa mengatur iklan?', 'ถ้าจ้างคนทำโฆษณาล่ะ เขาก็ตั้งค่าโฆษณาเป็นไม่ใช่หรือ'),
      t('Умеет, но другую. Рекламная сеть продаёт показ на аукционе, и задача таргетолога — купить его дешевле. Grab и Gojek берут комиссию с заказов, их актив — собственная аудитория, и ранжирование следует за тем, насколько хорошо ресторан её монетизирует. Ставка усиливает позицию, но не создаёт её. Практическое следствие: специалист по сетям увеличивает бюджет, а окупаемость ломается примерно на 6% выручки — до этой границы медианный ROAS 12.1x, после 8.6x. За границей уже 42% ресторанов нашего флота, так что ошибка массовая.',
        'They do, but a different kind. An ad network sells an impression at auction, and the specialist’s job is to buy it cheaper. Grab and Gojek take commission on orders, their asset is their own audience, and ranking follows how well a restaurant monetises it. A bid amplifies a position, it does not create one. The practical consequence: a network specialist raises the budget, and payback breaks at around 6% of revenue — below that line the median ROAS is 12.1x, above it 8.6x. 42% of the restaurants in our fleet are already past it, so the mistake is a common one.',
        'Bisa, tapi jenis yang lain. Jaringan iklan menjual tayangan lewat lelang, dan tugas spesialisnya adalah membelinya lebih murah. Grab dan Gojek mengambil komisi dari pesanan, aset mereka adalah audiens sendiri, dan peringkat mengikuti seberapa baik restoran memonetisasinya. Bid memperkuat posisi, bukan menciptakannya. Konsekuensi praktisnya: spesialis jaringan menaikkan anggaran, dan titik balik modal patah di sekitar 6% dari omzet — di bawah garis itu median ROAS 12.1x, di atasnya 8.6x. Sebanyak 42% restoran di portofolio kami sudah melewatinya, jadi kesalahan ini umum terjadi.',
        'เป็น แต่คนละแบบ เครือข่ายโฆษณาขายการมองเห็นผ่านการประมูล และงานของคนทำโฆษณาคือซื้อให้ถูกลง ส่วน Grab และ Gojek เก็บค่าคอมมิชชันจากออร์เดอร์ สินทรัพย์ของพวกเขาคือฐานลูกค้าของตัวเอง และอันดับเดินตามว่าร้านทำเงินจากฐานลูกค้านั้นได้ดีแค่ไหน การบิดขยายตำแหน่งที่มี ไม่ได้สร้างมันขึ้นมา ผลในทางปฏิบัติคือ ผู้เชี่ยวชาญเครือข่ายจะเพิ่มงบ แล้วความคุ้มทุนจะพังที่ราว 6% ของยอดขาย ต่ำกว่าเส้นนี้ ROAS มัธยฐานอยู่ที่ 12.1 เท่า สูงกว่านั้นเหลือ 8.6 เท่า ร้าน 42% ที่เราดูแลเลยเส้นนี้ไปแล้ว ความผิดพลาดนี้จึงเกิดขึ้นกันทั่วไป'),
    ],
    [
      t('Мне дешевле держать своего человека, чем платить вам 10%?',
        'Is my own hire cheaper than paying you 10% of revenue?',
        'Lebih murah punya orang sendiri daripada bayar 10% ke Anda?', 'จ้างคนเองถูกกว่าจ่ายคุณ 10% ของยอดขายไหม'),
      t('Арифметика простая: свой сотрудник дешевле, когда выручка доставки выше его полной стоимости, умноженной на десять — потому что мы берём ровно 10%. Проблема в том, что подставлять в эту формулу нечего. Человек, которого реально можно нанять на рынке, этой работы не знает: она не преподаётся, по ней нет ни курса, ни сертификата, а знание собирается только на объёме аккаунтов. Поэтому вопрос не «дешевле ли», а «принесёт ли он тот же результат». Ответ по публичным профилям таких специалистов: они обещают рост в десятки процентов, у нас в кейсах рост в разы.',
        'The arithmetic is simple: an in-house hire is cheaper once delivery revenue exceeds their fully-loaded cost times ten — because our fee is exactly 10%. The problem is that there is nothing to put into the formula. A person you can actually hire on this market does not know this work: it is not taught, there is no course and no certification, and the knowledge only accumulates across a volume of accounts. So the question is not "is it cheaper" but "will it produce the same result". Judging by the public profiles of such specialists: they promise growth in tens of percent, our cases show growth in multiples.',
        'Aritmetikanya sederhana: karyawan internal lebih murah begitu omzet delivery melampaui biaya totalnya dikali sepuluh — karena fee kami tepat 10%. Masalahnya, tidak ada yang bisa dimasukkan ke rumus itu. Orang yang benar-benar bisa Anda rekrut di pasar ini tidak menguasai pekerjaan tersebut: tidak diajarkan di mana pun, tidak ada kursus maupun sertifikasi, dan pengetahuannya hanya terkumpul dari banyak akun. Jadi pertanyaannya bukan "lebih murah atau tidak", melainkan "apakah hasilnya sama". Menurut profil publik spesialis semacam itu: mereka menjanjikan pertumbuhan puluhan persen, sementara kasus kami menunjukkan pertumbuhan berlipat.', 'เลขคำนวณง่ายมาก: จ้างเองถูกกว่าเมื่อยอดขายเดลิเวอรีสูงกว่าต้นทุนรวมของคนคนนั้นคูณสิบ เพราะค่าบริการของเราคือ 10% พอดี ปัญหาคือไม่มีอะไรจะใส่ลงในสูตร คนที่คุณจ้างได้จริงในตลาดนี้ไม่รู้งานนี้ เพราะไม่มีใครสอน ไม่มีคอร์ส ไม่มีใบรับรอง และความรู้สะสมได้จากปริมาณบัญชีเท่านั้น คำถามจึงไม่ใช่ ถูกกว่าไหม แต่คือ จะให้ผลเท่ากันไหม ดูจากโปรไฟล์สาธารณะของผู้เชี่ยวชาญเหล่านั้น: พวกเขาสัญญาการเติบโตหลักสิบเปอร์เซ็นต์ ส่วนเคสของเราคือการเติบโตหลายเท่าตัว'),
    ],
    [
      t('Почему я не могу просто найти толкового специалиста?',
        'Why can’t I just find a good specialist myself?',
        'Kenapa saya tidak bisa cari saja spesialis yang bagus?', 'ทำไมถึงหาผู้เชี่ยวชาญเก่ง ๆ เองไม่ได้'),
      t('Потому что этой профессии не существует как профессии. Площадки не выпускают специалистов, не сертифицируют их и не публикуют, как устроено ранжирование. Всё, что мы знаем, собрано из кабинетов ста с лишним ресторанов за три года — включая вещи, которые невозможно вывести из одного аккаунта: например, что реклама перестаёт окупаться примерно на 6% выручки, или что 95% всех потерь приходится на выключенные позиции меню, а не на закрытый ресторан. Человек с одним рестораном не увидит этого никогда, сколько бы ни старался.',
        'Because the profession does not exist as a profession. The platforms do not train specialists, do not certify them and do not publish how ranking works. Everything we know comes from the dashboards of a hundred-plus restaurants over three years — including things you cannot derive from a single account: that ads stop paying back at around 6% of revenue, or that 95% of all losses come from switched-off menu items rather than a closed restaurant. Someone with one restaurant will never see that, however hard they try.',
        'Karena profesi ini tidak ada sebagai profesi. Platform tidak melatih spesialis, tidak menyertifikasi mereka, dan tidak menerbitkan cara kerja peringkat. Semua yang kami tahu berasal dari dashboard seratus lebih restoran selama tiga tahun — termasuk hal yang tidak bisa disimpulkan dari satu akun: bahwa iklan berhenti balik modal sekitar 6% dari omzet, atau bahwa 95% seluruh kerugian datang dari item menu yang dinonaktifkan, bukan dari restoran yang tutup. Orang dengan satu restoran tidak akan pernah melihat itu, sekeras apa pun usahanya.', 'เพราะอาชีพนี้ไม่มีอยู่จริงในฐานะอาชีพ แพลตฟอร์มไม่ได้ฝึกผู้เชี่ยวชาญ ไม่ได้ออกใบรับรอง และไม่ได้เผยแพร่ว่าอันดับทำงานอย่างไร ทุกอย่างที่เรารู้มาจากหลังบ้านของร้านกว่าร้อยแห่งตลอดสามปี รวมถึงสิ่งที่หาไม่ได้จากบัญชีเดียว เช่น โฆษณาหยุดคุ้มทุนที่ราว 6% ของยอดขาย หรือ 95% ของความสูญเสียทั้งหมดมาจากเมนูที่ถูกปิด ไม่ใช่ร้านปิด คนที่มีร้านเดียวจะไม่มีวันเห็นสิ่งนี้ ไม่ว่าจะพยายามแค่ไหน'),
    ],
    [
      t('Как мне проверить кандидата, который говорит, что вёл GrabFood?',
        'How do I check a candidate who says they have run GrabFood?',
        'Bagaimana saya memeriksa kandidat yang mengaku pernah mengelola GrabFood?', 'จะตรวจสอบผู้สมัครที่บอกว่าเคยดูแล GrabFood ได้อย่างไร'),
      t('Спросите три вещи и сверьте с нашими опубликованными нормами. Первое: какая доля выручки должна уходить в рекламу и почему — если ответ «чем больше, тем лучше», человек считает Grab рекламной сетью, а это не так. Второе: сколько часов позиции его меню провели в стоп-листе за прошлый месяц — если он не знает, он этим не управлял. Третье: какой у него был ROAS и с чем он его сравнивал. Медиана по нашему флоту — 10.4x на Бали и 22.8x на Пхукете; норму мы выложили открыто именно для того, чтобы её можно было применить к кому угодно, включая нас.',
        'Ask three things and check the answers against our published norms. One: what share of revenue should go to ads, and why — if the answer is "the more the better", they think Grab is an ad network, and it is not. Two: how many hours their menu items spent on the stop-list last month — if they do not know, they were not managing it. Three: what their ROAS was and what they compared it against. Our fleet medians are 10.4x in Bali and 22.8x in Phuket; we published the norms openly precisely so they can be applied to anyone, us included.',
        'Tanyakan tiga hal dan cocokkan dengan norma yang kami terbitkan. Pertama: berapa porsi omzet yang seharusnya masuk ke iklan, dan kenapa — kalau jawabannya "makin besar makin baik", dia menganggap Grab sebagai jaringan iklan, dan itu keliru. Kedua: berapa jam item menunya berada dalam status nonaktif bulan lalu — kalau dia tidak tahu, berarti dia tidak mengelolanya. Ketiga: berapa ROAS-nya dan dibandingkan dengan apa. Median portofolio kami 10.4x di Bali dan 22.8x di Phuket; norma itu kami buka justru agar bisa diterapkan ke siapa pun, termasuk ke kami.', 'ถามสามข้อ แล้วเทียบคำตอบกับตัวเลขมาตรฐานที่เราเผยแพร่ไว้ หนึ่ง: ค่าโฆษณาควรเป็นกี่เปอร์เซ็นต์ของยอดขาย และเพราะอะไร ถ้าตอบว่ายิ่งมากยิ่งดี แสดงว่าเขาคิดว่า Grab เป็นเครือข่ายโฆษณา ซึ่งไม่ใช่ สอง: เดือนที่แล้วเมนูของเขาอยู่ในสต็อปลิสต์รวมกี่ชั่วโมง ถ้าไม่รู้ แปลว่าเขาไม่ได้ดูแลมัน สาม: ROAS ของเขาเท่าไร และเทียบกับอะไร ค่ามัธยฐานของร้านที่เราดูแลคือ 10.4 เท่าที่บาหลี และ 22.8 เท่าที่ภูเก็ต เราเผยแพร่ตัวเลขมาตรฐานแบบเปิดก็เพื่อให้เอาไปวัดใครก็ได้ รวมถึงวัดเราเอง'),
    ],
    [
      t('У меня будет такой же рост, как в ваших кейсах?',
        'Will my restaurant grow like the ones in your cases?',
        'Apakah restoran saya akan tumbuh seperti di kasus Anda?', 'ร้านของเราจะโตเหมือนในเคสของคุณไหม'),
      t('Лучшие, и мы это говорим прямо. Опубликованные кейсы — это те, где было что показать и было разрешение показать. Типичные цифры мы публикуем отдельно и тоже открыто: медианы по 96 ресторанам, включая те, где всё скучно. Обещать каждому x21 было бы враньём; отличие в том, что рост в разы у нас вообще случается и подтверждён скриншотами кабинетов, а в найме такие цифры не встречаются даже в обещаниях.',
        'Our best, and we say so plainly. Published cases are the ones where there was something to show and permission to show it. The typical numbers are published separately and just as openly: medians across 96 restaurants, including the boring ones. Promising everyone 21x would be a lie; the difference is that multiple-fold growth happens at all in our work and is backed by dashboard screenshots, while in the hiring market such numbers do not appear even as promises.',
        'Terbaik, dan kami mengatakannya terus terang. Kasus yang kami terbitkan adalah yang ada sesuatu untuk ditunjukkan dan ada izin untuk menunjukkannya. Angka yang khas kami terbitkan terpisah dan sama terbukanya: median 96 restoran, termasuk yang membosankan. Menjanjikan x21 kepada semua orang jelas bohong; bedanya, pertumbuhan berlipat memang terjadi pada kami dan didukung tangkapan layar dashboard, sementara di pasar rekrutmen angka seperti itu tidak muncul bahkan sebagai janji.', 'นั่นคือเคสที่ดีที่สุดของเรา และเราพูดตรง ๆ เคสที่เผยแพร่คือเคสที่มีอะไรให้โชว์และได้รับอนุญาตให้โชว์ ส่วนตัวเลขทั่วไปเราเผยแพร่แยกไว้และเปิดเผยพอ ๆ กัน คือค่ามัธยฐานจากร้าน 96 แห่ง รวมร้านที่น่าเบื่อด้วย การสัญญากับทุกคนว่าจะได้ 21 เท่าคือการโกหก ความต่างอยู่ตรงที่การเติบโตหลายเท่าตัวเกิดขึ้นจริงในงานของเรา และมีภาพจากหลังบ้านยืนยัน ขณะที่ในตลาดจ้างงาน ตัวเลขแบบนี้ไม่ปรากฏแม้แต่ในคำสัญญา'),
    ],
    [
      t('В каком случае мне всё-таки нужен свой человек?',
        'When do I actually need my own person instead?',
        'Kapan saya justru benar-benar butuh orang sendiri?', 'แล้วเมื่อไรที่ควรมีคนของตัวเองจริง ๆ'),
      t('Всегда — но на операционку, а не на управление продажами. Наличие позиций, стоп-лист, время приготовления, кухня в час пик: это физически внутри ресторана, снаружи этим управлять нельзя. По нашим данным именно там лежит 95% всех потерь выручки. Второй случай — если доставка для вас не канал роста, а просто должна работать: тогда нужен человек, который следит, чтобы ничего не сломалось, и агентство вам не нужно.',
        'Always — but for operations, not for revenue management. Item availability, the stop-list, preparation time, the kitchen at peak: that is physically inside the restaurant and cannot be run from outside. By our data that is exactly where 95% of revenue losses sit. The second case is when delivery is not a growth channel for you but simply has to work: then you need someone watching that nothing breaks, and you do not need an agency.',
        'Selalu — tapi untuk operasional, bukan untuk mengelola penjualan. Ketersediaan item, item yang dinonaktifkan, waktu masak, dapur di jam sibuk: itu ada secara fisik di dalam restoran dan tidak bisa dijalankan dari luar. Menurut data kami, di situlah 95% seluruh kehilangan omzet berada. Kasus kedua: kalau delivery bukan kanal pertumbuhan bagi Anda dan cukup berjalan saja, Anda butuh orang yang menjaga agar tidak ada yang rusak, dan agensi tidak diperlukan.', 'ตลอดเวลา แต่สำหรับงานหน้างาน ไม่ใช่การบริหารยอดขาย ความพร้อมของเมนู สต็อปลิสต์ เวลาเตรียมอาหาร ครัวช่วงพีค ทั้งหมดนี้อยู่ในร้านทางกายภาพและสั่งการจากข้างนอกไม่ได้ และตามข้อมูลของเรา ตรงนี้แหละคือที่ที่ 95% ของความสูญเสียอยู่ กรณีที่สองคือเมื่อเดลิเวอรีไม่ใช่ช่องทางเติบโตของคุณ แต่แค่ต้องทำงานได้ ตอนนั้นคุณต้องการคนคอยดูว่าไม่มีอะไรพัง ไม่ได้ต้องการเอเจนซี'),
    ],
    [
      t('Можно оставить своего человека и подключить вас?',
        'Can I keep my person and bring you in as well?',
        'Bisakah saya tetap punya orang sendiri dan menggandeng Anda?', 'เก็บคนของเราไว้แล้วใช้คุณด้วยได้ไหม'),
      t('Да, и у сетей это основной рабочий вариант. Ваш сотрудник держит операционку, мы держим управление карточкой: меню и его SEO, рекламу и ставки, промо-экономику, отзывы и апелляции. Разделение проходит ровно по данным: потери — операционные, рост — в управлении карточкой. Это разные компетенции, и они почти никогда не совмещаются в одном человеке.',
        'Yes, and in chains this is the main working arrangement. Your employee holds operations, we hold listing management: menu and menu SEO, ads and bidding, promo economics, reviews and appeals. The split follows the data exactly: the losses are operational, the growth is in listing management. Different skills, and they almost never sit in one person.',
        'Bisa, dan di jaringan restoran inilah opsi utamanya. Karyawan Anda memegang operasional, kami memegang pengelolaan listing: menu dan menu SEO, iklan dan bid, ekonomi promo, ulasan dan banding. Pembagiannya tepat mengikuti data: kerugian ada di operasional, pertumbuhan ada di pengelolaan listing. Ini kompetensi yang berbeda, dan hampir tidak pernah menyatu pada satu orang.', 'ได้ และในเชนร้านนี่คือรูปแบบหลักที่ใช้งานได้จริง พนักงานของคุณดูแลงานหน้างาน เราดูแลการบริหารหน้าร้าน ทั้งเมนูและ SEO ของเมนู โฆษณาและการบิด เศรษฐศาสตร์ของโปรโมชัน รีวิวและการอุทธรณ์ การแบ่งงานแบบนี้ตรงกับข้อมูลพอดี: ความสูญเสียอยู่ที่งานหน้างาน การเติบโตอยู่ที่การบริหารหน้าร้าน คนละทักษะ และแทบไม่เคยอยู่ในคนคนเดียว'),
    ],
  ];

  const findings: Array<[string, string]> = [
    [
      t('Ваши цифры не с чем сравнить',
        'Your numbers have nothing to be compared against',
        'Angka Anda tidak punya pembanding', 'ตัวเลขของคุณไม่มีอะไรให้เทียบ'),
      t('Медианы Бали по нашему флоту: чек Rp 250 000, ROAS 10.4x, реклама 5.6% выручки, отмены 0.35%, один негативный отзыв на 138 заказов. Свой менеджер сравнивает ваш месяц только с вашим прошлым месяцем — других данных у него нет и взять их негде.',
        'Our fleet medians for Bali: check Rp 250,000, ROAS 10.4x, ads at 5.6% of revenue, cancellations 0.35%, one negative review per 138 orders. An in-house manager can only compare your month with your previous month — there is no other data and nowhere to get it.',
        'Median portofolio kami untuk Bali: nilai pesanan Rp 250.000, ROAS 10.4x, iklan 5.6% dari omzet, pembatalan 0.35%, satu ulasan negatif per 138 pesanan. Manajer internal hanya bisa membandingkan bulan Anda dengan bulan Anda sebelumnya — data lain tidak ada dan tidak bisa didapat.', 'ค่ามัธยฐานของร้านที่เราดูแลในบาหลี: ยอดต่อบิล 250,000 รูเปียห์ ROAS 10.4 เท่า ค่าโฆษณา 5.6% ของยอดขาย การยกเลิก 0.35% รีวิวลบหนึ่งครั้งต่อ 138 ออร์เดอร์ ผู้จัดการภายในเทียบได้แค่เดือนนี้กับเดือนที่แล้วของร้านตัวเอง ไม่มีข้อมูลอื่นและไม่มีที่ให้หา'),
    ],
    [
      t('Граница, за которой реклама перестаёт окупаться',
        'The line past which ads stop paying back',
        'Batas ketika iklan berhenti balik modal', 'เส้นที่โฆษณาหยุดคุ้มทุน'),
      t('Она проходит примерно на 6% выручки: до неё медианный ROAS 12.1x, после — 8.6x. За границей уже 42% ресторанов нашего флота. Из одного аккаунта эту границу вывести нельзя: там нет второй точки, с которой она видна.',
        'It sits at roughly 6% of revenue: below it the median ROAS is 12.1x, above it 8.6x. 42% of the restaurants in our fleet are already past it. You cannot derive that line from one account — there is no second point from which it becomes visible.',
        'Batas itu ada di sekitar 6% dari omzet: di bawahnya ROAS median 12.1x, di atasnya 8.6x. Sebanyak 42% restoran di portofolio kami sudah melewatinya. Batas itu tidak bisa disimpulkan dari satu akun — tidak ada titik kedua yang membuatnya terlihat.', 'อยู่ที่ราว 6% ของยอดขาย ต่ำกว่าเส้นนี้ ROAS มัธยฐานอยู่ที่ 12.1 เท่า สูงกว่านั้นเหลือ 8.6 เท่า ร้าน 42% ที่เราดูแลเลยเส้นนี้ไปแล้ว คุณหาเส้นนี้จากบัญชีเดียวไม่ได้ เพราะไม่มีจุดที่สองให้มองเห็นมัน'),
    ],
    [
      t('Где на самом деле лежат потери',
        'Where the losses actually sit',
        'Di mana kerugian sebenarnya berada', 'ความสูญเสียอยู่ตรงไหนจริง ๆ'),
      t('Мимо ресторана проходит около 25% выручки, и 95% этих потерь — выключенные позиции меню, а не закрытый ресторан (3%) и не отмены (2%). Типичная картина — 40–70 позиций выключено одновременно, отдельные блюда висят в стопе больше 2000 часов.',
        'Around 25% of revenue goes past the restaurant, and 95% of that loss is switched-off menu items — not a closed restaurant (3%) and not cancellations (2%). The typical picture is 40–70 items off at once, with individual dishes stuck in the stop-list for over 2,000 hours.',
        'Sekitar 25% omzet lewat begitu saja, dan 95% kerugian itu berasal dari item menu yang dinonaktifkan — bukan restoran tutup (3%) dan bukan pembatalan (2%). Gambaran khasnya: 40–70 item nonaktif sekaligus, dan ada hidangan yang tertahan di stop-list lebih dari 2.000 jam.', 'ราว 25% ของยอดขายหลุดมือร้านไป และ 95% ของส่วนที่หายคือเมนูที่ถูกปิด ไม่ใช่ร้านปิด (3%) และไม่ใช่การยกเลิก (2%) ภาพที่เจอทั่วไปคือเมนูถูกปิดพร้อมกัน 40-70 รายการ และบางเมนูค้างในสต็อปลิสต์เกิน 2,000 ชั่วโมง'),
    ],
    [
      t('Отзывы, которые вообще можно снять',
        'Reviews that can actually be removed',
        'Ulasan yang sebenarnya bisa dihapus', 'รีวิวที่ลบออกได้จริง'),
      t('Отзывы бимодальны: 51% пятёрок против 28% единиц, четвёрок всего 3% — рейтинг делают крайности. Около 80% апелляций, которые мы подаём на Grab, заканчиваются снятием отзыва. Человек, который делает это впервые, не знает ни формулировок, ни сроков.',
        'Reviews are bimodal: 51% five-stars against 28% one-stars, with only 3% fours — the rating is made by the extremes. Around 80% of the appeals we file with Grab end with the review removed. Someone doing it for the first time knows neither the wording nor the deadlines.',
        'Ulasan bersifat bimodal: 51% bintang lima berbanding 28% bintang satu, bintang empat hanya 3% — rating dibentuk oleh ekstremnya. Sekitar 80% banding yang kami ajukan ke Grab berakhir dengan ulasan dihapus. Orang yang baru pertama kali melakukannya tidak tahu susunan kalimatnya maupun tenggat waktunya.', 'รีวิวกระจุกอยู่สองขั้ว: ห้าดาว 51% เทียบกับหนึ่งดาว 28% สี่ดาวแค่ 3% เรตติ้งถูกกำหนดโดยสองขั้วนี้ การอุทธรณ์ที่เรายื่นกับ Grab ราว 80% จบด้วยการลบรีวิว คนที่ทำครั้งแรกไม่รู้ทั้งถ้อยคำที่ต้องใช้และกำหนดเวลา'),
    ],
  ];

  return (
    <AnswerLayout
      h1={t('Кому доверить GrabFood и GoFood: своему менеджеру, фрилансеру, digital-агентству или профильному агентству?',
            'Who should you trust with GrabFood and GoFood: an in-house manager, a freelancer, a digital agency or a specialist agency?',
            'Kepada siapa menyerahkan GrabFood dan GoFood: manajer internal, freelancer, agensi digital, atau agensi khusus?', 'จะให้ใครดูแล GrabFood และ GoFood: ผู้จัดการภายใน ฟรีแลนซ์ เอเจนซีดิจิทัล หรือเอเจนซีเฉพาะทาง?')}
      lead={t(
        'Короткий ответ: сравнивать надо не цены, а задачи. Фрилансер, digital-агентство, таргетолог и бывший сотрудник Grab умеют настоящие вещи — просто не эту. И это сравнение не про деньги. Оклад менеджера и 10% от выручки — не две цены за одно и то же, а две разные вещи. Специалистов, которые умеют вести GrabFood и GoFood на нашем уровне, на рынке найма нет: этой профессии не существует, ей негде научиться, а знание собирается только на объёме аккаунтов. Поэтому честно сравнивать не зарплату с гонораром, а результат с результатом — и там разница не в процентах, а в разах.',
        'Short answer: compare the jobs, not the prices. A freelancer, a digital agency, a paid-ads specialist and a former Grab employee are all good at real things — just not at this one. And this comparison is not about money. A manager’s salary and 10% of revenue are not two prices for the same thing — they are two different things. Specialists who can run GrabFood and GoFood at our level are not available on the hiring market: the profession does not exist, there is nowhere to learn it, and the knowledge only accumulates across a volume of accounts. So the honest comparison is not salary against fee but result against result — and there the difference is not in percent, it is in multiples.',
        'Jawaban singkat: bandingkan pekerjaannya, bukan harganya. Freelancer, agensi digital, spesialis iklan, dan mantan karyawan Grab sama-sama menguasai hal yang nyata — hanya saja bukan yang ini. Dan perbandingan ini bukan soal uang. Gaji seorang manajer dan 10% dari omzet bukan dua harga untuk hal yang sama — itu dua hal yang berbeda. Spesialis yang mampu mengelola GrabFood dan GoFood di level kami tidak tersedia di pasar rekrutmen: profesinya tidak ada, tidak ada tempat untuk mempelajarinya, dan pengetahuannya hanya terkumpul dari banyak akun. Jadi perbandingan yang jujur bukan gaji lawan fee, melainkan hasil lawan hasil — dan di sana bedanya bukan persen, melainkan lipatan.'
      , 'คำตอบสั้น ๆ: ให้เทียบที่ตัวงาน ไม่ใช่ที่ราคา ฟรีแลนซ์ เอเจนซีดิจิทัล คนทำโฆษณา และอดีตพนักงาน Grab ต่างก็เก่งในเรื่องจริง ๆ เพียงแต่ไม่ใช่เรื่องนี้ และการเปรียบเทียบนี้ไม่ได้เกี่ยวกับเงิน เงินเดือนผู้จัดการกับ 10% ของยอดขายไม่ใช่สองราคาของสิ่งเดียวกัน แต่เป็นคนละสิ่ง ผู้เชี่ยวชาญที่ดูแล GrabFood และ GoFood ได้ในระดับเดียวกับเราไม่มีอยู่ในตลาดจ้างงาน อาชีพนี้ไม่มี ไม่มีที่ให้เรียน และความรู้สะสมได้จากปริมาณบัญชีเท่านั้น การเปรียบเทียบที่ซื่อสัตย์จึงไม่ใช่เงินเดือนกับค่าบริการ แต่คือผลลัพธ์กับผลลัพธ์ และตรงนั้นความต่างไม่ได้วัดเป็นเปอร์เซ็นต์ แต่วัดเป็นเท่าตัว')}
      meta={{ datePublished: '2026-09-08', dateModified: '2026-09-09', minutes: 11 }}
      schemas={[
        faqPageSchema(faq),
        articleSchema({
          headline: t('Кому доверить GrabFood и GoFood: свой менеджер, фрилансер, digital-агентство или профильное агентство',
                      'Who should run GrabFood and GoFood: in-house manager, freelancer, digital agency or a specialist agency',
                      'Siapa yang mengelola GrabFood dan GoFood: manajer internal, freelancer, agensi digital, atau agensi khusus', 'ใครควรดูแล GrabFood และ GoFood: ผู้จัดการภายใน ฟรีแลนซ์ เอเจนซีดิจิทัล หรือเอเจนซีเฉพาะทาง'),
          url: URL,
          about:
            'in-house delivery manager, aggregator manager, delivery management agency, marketplace freelancer, Fastwork, digital agency, paid ads specialist, former Grab employee, Agent Reference Merchant, fake reviews, review manipulation ban, GrabFood, GoFood, hiring, Indonesia, Thailand',
          datePublished: '2026-09-08',
          dateModified: '2026-09-09',
          language,
        }),
      ]}
    >
      <Block card title={t('Разница в результате, а не в цене', 'The difference is the result, not the price', 'Bedanya di hasil, bukan di harga', 'ความต่างอยู่ที่ผลลัพธ์ ไม่ใช่ราคา')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Посмотрите, что обещают специалисты, которых вам предложат вместо агентства. В их собственных публичных профилях заявленные достижения — десятки процентов: «+30% к продажам», «+109% к просмотрам меню», «+50% к просмотрам профиля». Это добросовестные цифры, и это потолок того, что даёт один человек с одним аккаунтом.',
            'Look at what the specialists you will be offered instead of an agency actually promise. In their own public profiles the stated achievements are tens of percent: "+30% in sales", "+109% in menu views", "+50% in profile visits". These are honest numbers, and they are the ceiling of what one person with one account delivers.',
            'Lihat apa yang sebenarnya dijanjikan para spesialis yang akan ditawarkan kepada Anda sebagai pengganti agensi. Di profil publik mereka sendiri, pencapaian yang disebutkan berskala puluhan persen: "+30% penjualan", "+109% tampilan menu", "+50% kunjungan profil". Itu angka yang jujur, dan itulah batas atas dari satu orang dengan satu akun.'
          , 'ลองดูว่าผู้เชี่ยวชาญที่จะถูกเสนอให้คุณแทนเอเจนซีนั้นสัญญาอะไรจริง ๆ ในโปรไฟล์สาธารณะของพวกเขาเอง ผลงานที่ระบุไว้อยู่ในหลักสิบเปอร์เซ็นต์: ยอดขาย +30% ยอดดูเมนู +109% ยอดเข้าโปรไฟล์ +50% ตัวเลขเหล่านี้ซื่อสัตย์ และเป็นเพดานของสิ่งที่คนหนึ่งคนกับบัญชีเดียวทำได้')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t('Наши опубликованные кейсы — из кабинетов GrabMerchant и GoBiz, со скриншотами:',
             'Our published cases come from GrabMerchant and GoBiz dashboards, with screenshots:',
             'Kasus yang kami terbitkan berasal dari dashboard GrabMerchant dan GoBiz, lengkap dengan tangkapan layar:', 'เคสที่เราเผยแพร่มาจากหลังบ้าน GrabMerchant และ GoBiz พร้อมภาพหน้าจอ:')}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(([value, label, sub, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-xl border border-white/10 p-4 hover:border-brand-green/50 transition-colors"
            >
              <div className="text-2xl font-semibold text-brand-green">{value}</div>
              <div className="text-sm mt-1">{label}</div>
              <div className="text-xs text-brand-muted mt-1">{sub}</div>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-brand-muted max-w-3xl">
          {t(
            'Оговорка, которую мы делаем сами: это опубликованные кейсы, то есть лучшие, а не медиана. Медиану мы публикуем отдельно и так же открыто — в бенчмарке по 96 ресторанам. Обещать каждому x21 было бы враньём. Но обратите внимание на порядок величин: в найме таких цифр нет даже в обещаниях.',
            'A caveat we make ourselves: these are published cases, meaning our best, not the median. The median is published separately and just as openly — in the benchmark across 96 restaurants. Promising everyone 21x would be a lie. But note the order of magnitude: in the hiring market these numbers do not appear even as promises.',
            'Catatan yang kami buat sendiri: ini kasus yang diterbitkan, artinya yang terbaik, bukan median. Median kami terbitkan terpisah dan sama terbukanya — dalam benchmark 96 restoran. Menjanjikan x21 kepada semua orang jelas bohong. Tapi perhatikan skala angkanya: di pasar rekrutmen angka seperti itu tidak muncul bahkan sebagai janji.'
          , 'ข้อแม้ที่เราพูดเอง: นี่คือเคสที่เผยแพร่ ซึ่งแปลว่าดีที่สุดของเรา ไม่ใช่ค่ามัธยฐาน ส่วนค่ามัธยฐานเราเผยแพร่แยกไว้และเปิดเผยพอ ๆ กัน ในรายงานมาตรฐานจากร้าน 96 แห่ง การสัญญากับทุกคนว่าจะได้ 21 เท่าคือการโกหก แต่ให้สังเกตระดับของตัวเลข: ในตลาดจ้างงาน ตัวเลขแบบนี้ไม่ปรากฏแม้แต่ในคำสัญญา')}
        </p>
      </Block>

      <Block title={t('Почему такого человека нельзя нанять', 'Why you cannot simply hire this person', 'Kenapa orang seperti ini tidak bisa direkrut', 'ทำไมถึงจ้างคนแบบนี้ไม่ได้')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Этой профессии не существует. Grab и Gojek не готовят специалистов, не сертифицируют их и не публикуют, как устроено ранжирование внутри приложения. Научиться этому можно ровно одним способом — на объёме аккаунтов и на длинной дистанции.',
            'The profession does not exist. Grab and Gojek do not train specialists, do not certify them and do not publish how in-app ranking works. There is exactly one way to learn it: across a volume of accounts, over a long stretch of time.',
            'Profesi ini tidak ada. Grab dan Gojek tidak melatih spesialis, tidak menyertifikasi mereka, dan tidak menerbitkan cara kerja peringkat di dalam aplikasi. Cara mempelajarinya tepat satu: lewat banyak akun dan dalam waktu yang panjang.'
          , 'อาชีพนี้ไม่มีอยู่จริง Grab และ Gojek ไม่ได้ฝึกผู้เชี่ยวชาญ ไม่ได้ออกใบรับรอง และไม่ได้เผยแพร่ว่าอันดับในแอปทำงานอย่างไร มีทางเดียวเท่านั้นที่จะเรียนรู้: จากปริมาณบัญชี ตลอดช่วงเวลาที่ยาวพอ')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t(
            'Простой пример того, что невозможно вывести из одного ресторана. Grab и Gojek — не рекламные площадки. Рекламная сеть зарабатывает на показах и продаёт вам позицию на аукционе; Grab и Gojek зарабатывают комиссию с заказов, и их актив — собственная аудитория. Поэтому ранжирование следует за тем, насколько хорошо ресторан монетизирует эту аудиторию: ставка усиливает позицию, но не создаёт её. Человек, который считает Grab рекламной сетью, будет поднимать бюджет и получать больше показов без заказов — быстрее.',
            'A simple example of something you cannot derive from one restaurant. Grab and Gojek are not ad networks. An ad network earns on impressions and auctions you a position; Grab and Gojek earn commission on orders, and their asset is their own audience. So ranking follows how well a restaurant monetises that audience: a bid amplifies a position, it does not create one. Someone who treats Grab as an ad network will raise the budget and get more impressions without orders — faster.',
            'Contoh sederhana yang tidak bisa disimpulkan dari satu restoran. Grab dan Gojek bukan jaringan iklan. Jaringan iklan menghasilkan uang dari tayangan dan melelang posisi Anda; Grab dan Gojek mendapat komisi dari pesanan, dan aset mereka adalah audiens sendiri. Jadi peringkat mengikuti seberapa baik sebuah restoran memonetisasi audiens itu: bid memperkuat posisi, tapi tidak menciptakannya. Orang yang menganggap Grab sebagai jaringan iklan akan menaikkan anggaran dan mendapat lebih banyak tayangan tanpa pesanan — lebih cepat.'
          , 'ตัวอย่างง่าย ๆ ของสิ่งที่หาไม่ได้จากร้านเดียว Grab และ Gojek ไม่ใช่เครือข่ายโฆษณา เครือข่ายโฆษณาหาเงินจากการมองเห็นและประมูลตำแหน่งให้คุณ ส่วน Grab และ Gojek หาเงินจากค่าคอมมิชชันของออร์เดอร์ และสินทรัพย์ของพวกเขาคือฐานลูกค้าของตัวเอง อันดับจึงขึ้นอยู่กับว่าร้านทำเงินจากฐานลูกค้านั้นได้ดีแค่ไหน การบิดขยายตำแหน่งที่มีอยู่ ไม่ได้สร้างมันขึ้นมา คนที่มอง Grab เป็นเครือข่ายโฆษณาจะเพิ่มงบแล้วได้การมองเห็นมากขึ้นโดยไม่ได้ออร์เดอร์ เพียงแต่เร็วขึ้น')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t(
            'Второй пример — нормы, которых у одного аккаунта просто нет. Реклама перестаёт окупаться примерно на 6% выручки: до этой границы медианный ROAS 12.1x, после — 8.6x. И 95% всех потерь выручки в нашей выборке — не закрытый ресторан и не отмены, а выключенные позиции меню. Обе цифры получены на 96 ресторанах и 270 568 заказах; из одного кабинета их не видно.',
            'A second example: norms a single account simply does not have. Ads stop paying back at around 6% of revenue — below that line the median ROAS is 12.1x, above it 8.6x. And 95% of all revenue losses in our sample are not a closed restaurant and not cancellations, but switched-off menu items. Both numbers come from 96 restaurants and 270,568 orders; from one dashboard they are invisible.',
            'Contoh kedua: norma yang memang tidak dimiliki satu akun. Iklan berhenti balik modal sekitar 6% dari omzet — di bawah garis itu median ROAS 12.1x, di atasnya 8.6x. Dan 95% seluruh kehilangan omzet dalam sampel kami bukan restoran yang tutup dan bukan pembatalan, melainkan item menu yang dinonaktifkan. Kedua angka itu berasal dari 96 restoran dan 270,568 pesanan; dari satu dashboard keduanya tidak terlihat.'
          , 'ตัวอย่างที่สอง: ตัวเลขมาตรฐานที่บัญชีเดียวไม่มีทางมี โฆษณาหยุดคุ้มทุนที่ราว 6% ของยอดขาย ต่ำกว่าเส้นนี้ ROAS มัธยฐาน 12.1 เท่า สูงกว่านั้น 8.6 เท่า และ 95% ของความสูญเสียทั้งหมดในกลุ่มตัวอย่างของเราไม่ใช่ร้านปิดและไม่ใช่การยกเลิก แต่คือเมนูที่ถูกปิด ตัวเลขทั้งสองมาจากร้าน 96 แห่งและ 270,568 ออร์เดอร์ จากหลังบ้านเดียวมองไม่เห็นเลย')}{' '}
          <Link href="/benchmark" className="text-brand-green hover:underline">
            {t('Бенчмарк 2026', 'Benchmark 2026', 'Benchmark 2026', 'Benchmark 2026')}
          </Link>
          {', '}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод целиком', 'the full method', 'metode selengkapnya', 'วิธีการฉบับเต็ม')}
          </Link>
          {'.'}
        </p>
      </Block>

      <Block card title={t('Сравнение по существу', 'The comparison that matters', 'Perbandingan yang sebenarnya', 'การเปรียบเทียบที่สำคัญจริง')}>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-medium text-brand-muted w-1/5"></th>
                <th className="py-3 pr-4 font-semibold">
                  {t('Свой менеджер', 'In-house manager', 'Manajer internal', 'ผู้จัดการภายใน')}
                </th>
                <th className="py-3 font-semibold">
                  {t('Агентство', 'Agency', 'Agensi', 'เอเจนซี')}
                  <div className="text-xs font-normal text-brand-muted">Delivery Booster</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, own, agency]) => (
                <tr key={label} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{label}</td>
                  <td className="py-4 pr-4 text-brand-muted">{own}</td>
                  <td className="py-4 text-brand-muted">{agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title={t('Где свой человек нужен обязательно', 'Where you do need your own person', 'Di mana karyawan internal wajib ada', 'ตรงไหนที่คุณต้องมีคนของตัวเองจริง ๆ')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Мы говорим это прямо, потому что иначе странице нельзя верить. Операционка — всегда ваш человек: наличие позиций, стоп-лист, время приготовления, кухня в час пик. Это физически внутри ресторана, снаружи этим управлять нельзя — а по нашим же данным именно там лежит 95% всех потерь выручки. Второй честный случай: если доставка для вас не канал роста, а просто должна работать без сбоев, вам нужен человек на контроль, а не агентство на рост.',
            'We say this plainly, because otherwise the page cannot be trusted. Operations is always your person: item availability, the stop-list, preparation time, the kitchen at peak. That is physically inside the restaurant and cannot be run from outside — and by our own data that is exactly where 95% of revenue losses sit. The second honest case: if delivery is not a growth channel for you but simply has to run without failures, you need someone on control, not an agency on growth.',
            'Kami mengatakan ini terus terang, karena tanpanya halaman ini tidak layak dipercaya. Operasional selalu milik orang Anda: ketersediaan item, item yang dinonaktifkan, waktu masak, dapur di jam sibuk. Itu ada secara fisik di dalam restoran dan tidak bisa dijalankan dari luar — dan menurut data kami sendiri, di situlah 95% seluruh kehilangan omzet berada. Kasus jujur kedua: kalau delivery bukan kanal pertumbuhan bagi Anda dan cukup berjalan tanpa gangguan, yang Anda butuhkan adalah orang untuk kontrol, bukan agensi untuk pertumbuhan.'
          , 'เราพูดเรื่องนี้ตรง ๆ เพราะไม่อย่างนั้นหน้านี้ก็เชื่อถือไม่ได้ งานหน้างานต้องเป็นคนของคุณเสมอ ทั้งความพร้อมของเมนู สต็อปลิสต์ เวลาเตรียมอาหาร และครัวช่วงพีค สิ่งเหล่านี้อยู่ในร้านทางกายภาพและสั่งการจากข้างนอกไม่ได้ และตามข้อมูลของเราเอง ตรงนี้แหละคือที่ที่ 95% ของความสูญเสียอยู่ กรณีที่ซื่อสัตย์ข้อที่สอง: ถ้าเดลิเวอรีไม่ใช่ช่องทางเติบโตของคุณ แต่แค่ต้องทำงานได้โดยไม่มีปัญหา คุณต้องการคนคอยควบคุม ไม่ใช่เอเจนซีที่มาเร่งการเติบโต')}
        </p>
      </Block>

      <Block card title={t('Гибрид, который работает', 'The hybrid that works', 'Kombinasi yang berhasil', 'รูปแบบผสมที่ได้ผล')}>
        <p className="text-brand-muted max-w-3xl">
          {t(
            'Самый частый рабочий вариант у сетей — разделить по природе задач. Ваш человек держит операционку. Мы держим управление карточкой: меню и его SEO, рекламу и ставки, промо-экономику, отзывы и апелляции против несправедливых (около 80% поданных апелляций на Grab заканчиваются снятием отзыва). Разделение проходит ровно по данным: потери операционные, рост — в управлении карточкой. Это разные руки и разные компетенции.',
            'The most common working arrangement in chains is to split by the nature of the work. Your person holds operations. We hold listing management: menu and menu SEO, ads and bidding, promo economics, reviews and appeals against unfair ones (roughly 80% of the appeals we file on Grab end with the review removed). The split follows the data exactly: the losses are operational, the growth is in listing management. Different hands, different skills.',
            'Opsi paling umum di jaringan restoran adalah membagi menurut sifat pekerjaannya. Orang Anda memegang operasional. Kami memegang pengelolaan listing: menu dan menu SEO, iklan dan bid, ekonomi promo, ulasan dan banding terhadap ulasan yang tidak adil (sekitar 80% banding yang kami ajukan di Grab berakhir dengan ulasan dihapus). Pembagiannya tepat mengikuti data: kerugian ada di operasional, pertumbuhan ada di pengelolaan listing. Ini tangan yang berbeda dan kompetensi yang berbeda.'
          , 'รูปแบบที่ใช้ได้จริงและพบบ่อยที่สุดในเชนร้านคือแบ่งงานตามลักษณะของงาน คนของคุณดูแลงานหน้างาน เราดูแลการบริหารหน้าร้าน ทั้งเมนูและ SEO ของเมนู โฆษณาและการบิด เศรษฐศาสตร์ของโปรโมชัน รีวิวและการอุทธรณ์รีวิวที่ไม่เป็นธรรม (ราว 80% ของที่เรายื่นกับ Grab จบด้วยการลบรีวิว) การแบ่งแบบนี้ตรงกับข้อมูลพอดี: ความสูญเสียอยู่ที่งานหน้างาน การเติบโตอยู่ที่การบริหารหน้าร้าน คนละมือ คนละทักษะ')}
        </p>
      </Block>

      <Block title={t('А если не агентство — то кто?', 'And if not an agency — then who?', 'Kalau bukan agensi — lalu siapa?', 'ถ้าไม่ใช่เอเจนซี แล้วใคร?')}>
        <p className="text-brand-muted max-w-3xl">
          {t('Прежде чем отдать доставку агентству, вы почти наверняка рассмотрите варианты дешевле. Их пять, и все пять настоящие: фрилансер с маркетплейса, digital-агентство, таргетолог, бывший сотрудник Grab, свой человек в штате. Разберём каждый — что вы покупаете на самом деле и когда это правильный выбор, потому что для части задач правильный выбор не мы.',
            'Before handing delivery to an agency you will almost certainly look at cheaper options. There are five, and all five are real: a marketplace freelancer, a digital agency, a paid-ads specialist, a former Grab employee, your own hire. Here is each one — what you are actually buying and when it is the right choice, because for some jobs the right choice is not us.',
            'Sebelum menyerahkan delivery ke agensi, Anda hampir pasti akan melirik opsi yang lebih murah. Ada lima, dan kelimanya nyata: freelancer marketplace, agensi digital, spesialis iklan, mantan karyawan Grab, karyawan Anda sendiri. Mari bahas satu per satu — apa yang sebenarnya Anda beli dan kapan itu pilihan yang tepat, karena untuk sebagian pekerjaan pilihan yang tepat bukan kami.',
            'ก่อนจะยกงานเดลิเวอรีให้เอเจนซี คุณแทบจะแน่นอนว่าจะมองหาทางเลือกที่ถูกกว่า มีอยู่ห้าทาง และทั้งห้าล้วนมีอยู่จริง: ฟรีแลนซ์จากมาร์เก็ตเพลส เอเจนซีดิจิทัล คนทำโฆษณา อดีตพนักงาน Grab และคนของคุณเอง มาดูทีละทาง ว่าคุณกำลังซื้ออะไรจริง ๆ และเมื่อไรที่มันคือทางเลือกที่ถูกต้อง เพราะสำหรับงานบางอย่าง ทางเลือกที่ถูกต้องไม่ใช่เรา')}
        </p>
        <p className="mt-4 text-brand-muted max-w-3xl">
          {t('Общее у этих пяти вариантов одно, и это не квалификация.', 'What the five have in common is not a lack of skill.', 'Yang sama di antara kelimanya bukan soal kemampuan.', 'สิ่งที่ทั้งห้าทางมีเหมือนกันไม่ใช่เรื่องฝีมือ')}{' '}
          <strong className="text-brand-text">
            {t('Рынок продаёт запуск. Заказы приносит ведение.', 'The market sells the launch. Orders come from the running.', 'Pasar menjual peluncuran. Pesanan datang dari pengelolaan.', 'ตลาดขายการเปิดร้าน แต่ออร์เดอร์มาจากการดูแลต่อเนื่อง')}
          </strong>{' '}
          {t('Зарегистрировать ресторан, собрать меню, отснять фото, передать доступы владельцу — нормальная услуга, и на старте она экономит недели. Но ранжирование, стоп-лист, ставки, промо-экономика и отзывы — это то, что происходит с аккаунтом каждую неделю после запуска. Кто за это отвечает и с чем сверяет цифры — и есть весь вопрос.',
            'Registering the restaurant, building the menu, shooting the photos, handing the logins to the owner — that is a normal service and it saves weeks at the start. But ranking, the stop-list, bidding, promo economics and reviews are what happens to the account every week after the launch. Who owns that, and what they compare their numbers against, is the whole question.',
            'Mendaftarkan restoran, menyusun menu, memotret foto, menyerahkan akses ke pemilik — itu layanan yang wajar dan menghemat berminggu-minggu di awal. Tapi peringkat, item yang dinonaktifkan, bid, ekonomi promo, dan ulasan adalah hal yang terjadi pada akun setiap minggu setelah peluncuran. Siapa yang bertanggung jawab atas itu, dan angkanya dibandingkan dengan apa — itulah seluruh pertanyaannya.',
            'การจดทะเบียนร้าน จัดเมนู ถ่ายรูป แล้วส่งบัญชีคืนเจ้าของ เป็นบริการที่ปกติดี และช่วยประหยัดเวลาหลายสัปดาห์ตอนเริ่ม แต่อันดับ สต็อปลิสต์ การบิด เศรษฐศาสตร์ของโปรโมชัน และรีวิว คือสิ่งที่เกิดขึ้นกับบัญชีทุกสัปดาห์หลังจากเปิดไปแล้ว ใครรับผิดชอบตรงนั้น และเอาตัวเลขไปเทียบกับอะไร นั่นคือคำถามทั้งหมด')}
        </p>
        <div className="mt-10 space-y-10">
          {options.map((o) => (
            <div key={o.name}>
              <h3 className="text-xl font-bold mb-3">{o.name}</h3>
              {o.paras.map((para, i) => (
                <p key={i} className={i ? 'mt-4 text-brand-muted max-w-3xl' : 'text-brand-muted max-w-3xl'}>
                  {para}
                </p>
              ))}
              <p className="mt-4 max-w-3xl text-sm">
                <span className="font-semibold text-brand-green">
                  {t('Когда это правильный выбор:', 'When it is the right choice:', 'Kapan ini pilihan yang tepat:', 'เมื่อไรที่นี่คือทางเลือกที่ถูกต้อง:')}
                </span>{' '}
                <span className="text-brand-muted">{o.right}</span>
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block card title={t('Кто что решает — одной таблицей', 'Who solves what — in one table', 'Siapa menyelesaikan apa — dalam satu tabel', 'ใครแก้เรื่องอะไร — ในตารางเดียว')}>
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="py-3 pr-4 font-semibold w-1/4">{t('Кто', 'Who', 'Siapa', 'ใคร')}</th>
                <th className="py-3 pr-4 font-semibold">{t('Что вы покупаете на самом деле', 'What you are actually buying', 'Apa yang sebenarnya Anda beli', 'คุณกำลังซื้ออะไรจริง ๆ')}</th>
                <th className="py-3 font-semibold">{t('Когда это правильный выбор', 'When it is the right choice', 'Kapan ini pilihan yang tepat', 'เมื่อไรที่นี่คือทางเลือกที่ถูกต้อง')}</th>
              </tr>
            </thead>
            <tbody>
              {whoRows.map(([who, buying, when]) => (
                <tr key={who} className="border-b border-white/10 align-top">
                  <td className="py-4 pr-4 font-medium">{who}</td>
                  <td className="py-4 pr-4 text-brand-muted">{buying}</td>
                  <td className="py-4 text-brand-muted">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-brand-muted max-w-3xl">
          {t('Ни одна строка в этой таблице не про то, что человек плохой. Все шесть — про то, какую задачу он умеет решать. Ошибка стоит дорого не потому, что исполнитель слабый, а потому, что за три-четыре месяца проверки гипотезы аккаунт успевает накопить историю, которую алгоритм потом помнит.',
            'Not one line in this table says the person is bad. All six say what job they are able to do. The mistake is expensive not because the contractor is weak, but because in the three or four months it takes to test the hypothesis the account accumulates a history the algorithm then remembers.',
            'Tidak satu pun baris di tabel ini mengatakan orangnya buruk. Keenamnya berbicara tentang pekerjaan apa yang mampu mereka selesaikan. Kesalahannya mahal bukan karena pelaksananya lemah, melainkan karena selama tiga sampai empat bulan menguji hipotesis, akun Anda sudah mengumpulkan riwayat yang kemudian diingat algoritma.',
            'ไม่มีบรรทัดไหนในตารางนี้บอกว่าคนคนนั้นแย่ ทั้งหกบรรทัดบอกว่าเขาทำงานแบบไหนได้ ความผิดพลาดนี้แพงไม่ใช่เพราะคนทำอ่อน แต่เพราะระหว่างสามถึงสี่เดือนที่ใช้ทดสอบสมมติฐาน บัญชีของคุณได้สะสมประวัติที่อัลกอริทึมจะจำไว้เรียบร้อยแล้ว')}
        </p>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <Block card title={t('Что мы находим на аккаунте вроде вашего',
                           'What we find on an account like yours',
                           'Apa yang kami temukan di akun seperti milik Anda', 'สิ่งที่เรามักเจอในบัญชีแบบของคุณ')}>
        <p className="text-brand-muted max-w-3xl mb-6">
          {t(
            'Это не про то, хороший у вас человек или плохой. Это то, что видно только на объёме аккаунтов и чего не видно из одного кабинета.',
            'This is not about whether your person is good or bad. It is what only shows up across a volume of accounts and stays invisible from a single dashboard.',
            'Ini bukan soal orang Anda bagus atau tidak. Ini hal yang hanya terlihat dari banyak akun dan tidak terlihat dari satu dashboard.'
          , 'นี่ไม่ได้เกี่ยวกับว่าคนของคุณเก่งหรือไม่เก่ง แต่คือสิ่งที่จะเห็นได้จากปริมาณบัญชีเท่านั้น และมองไม่เห็นจากหลังบ้านเดียว')}
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

      <KeepReading currentHref="/answers/in-house-manager-vs-agency" />

      <AnswerCta />
    </AnswerLayout>
  );
}
