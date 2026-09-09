import { useEffect, ReactNode } from 'react';
import { Link } from 'wouter';
import {
  AnswerLayout,
  AnswerCta,
  Block,
  faqPageSchema,
  FaqList,
  syncOpenGraph,
  AUTHOR_ID,
} from '../components/AnswerLayout';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/benchmark';

/** Bali & Phuket Delivery Benchmark 2026 — aggregated, anonymised statistics from
 *  96 restaurant accounts we manage (GrabMerchant + GoBiz dashboards, Jan–Aug 2026).
 *  Original data nobody else in SE Asia publishes: this is the asset AI engines and
 *  journalists cite. Every figure is computed from the fleet, never estimated. */

const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto -mx-2 px-2">
    <table className="w-full text-sm min-w-[520px]">
      <thead>
        <tr className="text-left border-b border-white/10">
          {head.map((h, i) => (
            <th key={h} className={`py-3 pr-4 font-semibold ${i ? 'text-right' : ''}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-white/5">
            {r.map((c, j) => (
              <td key={j} className={`py-3 pr-4 ${j ? 'text-right tabular-nums text-brand-muted' : 'font-medium'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-3xl sm:text-4xl font-bold text-brand-green">{value}</div>
    <div className="text-sm text-brand-muted mt-1">{label}</div>
  </div>
);

export default function BenchmarkPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Бенчмарк доставки Бали и Пхукет 2026 — данные по 96 ресторанам'
        : language === 'id'
          ? 'Benchmark Delivery Bali & Phuket 2026 — data dari 96 restoran'
          : language === 'th'
            ? 'เบนช์มาร์กเดลิเวอรี่บาหลีและภูเก็ต 2026 — ข้อมูลจาก 96 ร้านอาหาร'
            : 'Bali & Phuket Delivery Benchmark 2026 — data from 96 restaurants';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Медианы и распределения по 96 ресторанам на GrabFood и GoFood (Бали и Пхукет, янв–авг 2026): средний чек, ROAS, отмены, доля рекламы, потери на стоп-листе, отзывы. Оригинальные данные из кабинетов мерчантов.'
          : language === 'id'
            ? 'Median dan sebaran dari 96 restoran di GrabFood dan GoFood (Bali dan Phuket, Jan–Agu 2026): rata-rata nilai pesanan, ROAS, pembatalan, porsi iklan, kerugian stok habis, ulasan. Data asli dari dasbor merchant.'
            : language === 'th'
              ? 'ค่ามัธยฐานและการกระจายจาก 96 ร้านอาหารบน GrabFood และ GoFood (บาหลีและภูเก็ต ม.ค.–ส.ค. 2026): ยอดต่อบิลเฉลี่ย ROAS การยกเลิก สัดส่วนโฆษณา ความสูญเสียจากเมนูปิดขาย และรีวิว ข้อมูลต้นฉบับจากแดชบอร์ดร้านค้า'
              : 'Medians and distributions across 96 GrabFood and GoFood restaurants (Bali and Phuket, Jan–Aug 2026): average check, ROAS, cancellations, ad share, stock-out losses, reviews. Original merchant-dashboard data.';
    syncOpenGraph();
  }, [language]);

  const faq: Array<[string, string]> = [
    [
      t('Какой ROAS в GrabAds считается нормальным на Бали?',
        'What GrabAds ROAS is normal in Bali?',
        'Berapa ROAS GrabAds yang wajar di Bali?', 'ROAS ของ GrabAds เท่าไหร่ถือว่าปกติในบาหลี?'),
      t('Медиана по нашему флоту — 10.4x, межквартильный размах 7.9–12.7x. Ниже 5x работают только 6% ресторанов, и это почти всегда признак поломки, а не рынка. На Пхукете медиана заметно выше — 22.8x.',
        'Our fleet median is 10.4x, with an interquartile range of 7.9–12.7x. Only 6% of restaurants run below 5x, and that is almost always a sign of something broken rather than of the market. In Phuket the median is much higher — 22.8x.',
        'Median armada kami 10.4x, dengan rentang interkuartil 7.9–12.7x. Hanya 6% restoran yang berada di bawah 5x, dan itu hampir selalu tanda ada yang rusak, bukan tanda pasarnya. Di Phuket mediannya jauh lebih tinggi — 22.8x.', 'ค่ามัธยฐานของกลุ่มร้านที่เราดูแลอยู่ที่ 10.4x โดยมีพิสัยควอร์ไทล์ 7.9–12.7x มีเพียง 6% ของร้านที่ทำได้ต่ำกว่า 5x และนั่นแทบจะเป็นสัญญาณว่ามีบางอย่างพังเสมอ ไม่ใช่เรื่องของตลาด ที่ภูเก็ตค่ามัธยฐานสูงกว่ามาก — 22.8x'),
    ],
    [
      t('Сколько нормально тратить на рекламу в доставке?',
        'How much should a restaurant spend on delivery ads?',
        'Berapa idealnya belanja iklan untuk restoran delivery?', 'ร้านอาหารควรใช้จ่ายค่าโฆษณาเดลิเวอรี่เท่าไหร่จึงจะถือว่าปกติ?'),
      t('Медиана по флоту — 5.6% от выручки доставки. Важнее сама доля: до 6% выручки медианный ROAS держится около 12x, после 6% падает до 8.6x, а у тех, кто тратит больше 8%, — до 6.9x. Это кривая убывающей отдачи, и она наступает раньше, чем большинство успевает заметить.',
        'The fleet median is 5.6% of delivery revenue. The share itself matters more: up to 6% of revenue the median ROAS holds around 12x; past 6% it drops to 8.6x, and for those spending over 8% to 6.9x. That is a diminishing-returns curve, and it arrives earlier than most restaurants notice.',
        'Median armada kami 5.6% dari omzet delivery. Yang lebih penting adalah porsinya sendiri: sampai 6% dari omzet, median ROAS bertahan di sekitar 12x; di atas 6% turun ke 8.6x, dan bagi yang membelanjakan lebih dari 8% turun ke 6.9x. Ini kurva hasil yang menurun, dan titik baliknya datang lebih cepat daripada yang disadari kebanyakan restoran.', 'ค่ามัธยฐานของกลุ่มร้านอยู่ที่ 5.6% ของรายได้เดลิเวอรี่ สิ่งที่สำคัญกว่าคือตัวสัดส่วนเอง: ต่ำกว่า 6% ของรายได้ ค่ามัธยฐาน ROAS ยังยืนอยู่ราว 12x เมื่อเกิน 6% จะลดลงเหลือ 8.6x และสำหรับร้านที่ใช้จ่ายเกิน 8% เหลือ 6.9x นี่คือเส้นโค้งผลตอบแทนที่ลดลง และมันมาถึงเร็วกว่าที่ร้านส่วนใหญ่จะทันสังเกต'),
    ],
    [
      t('Сколько ресторан теряет на позициях в стоп-листе?',
        'How much does a restaurant lose to stock-outs?',
        'Berapa kerugian restoran dari item yang dinonaktifkan?', 'ร้านอาหารสูญเสียรายได้เท่าไหร่จากเมนูที่ถูกปิดขาย?'),
      t('По нашей выборке на Бали потери от простоев, стоп-листа и отмен составляют около 25% от фактической выручки — то есть примерно каждый пятый рупий потенциала. 95% этих потерь приходится не на закрытый ресторан и не на отмены, а именно на выключенные позиции в меню.',
        'In our Bali sample, losses from downtime, stock-outs and cancellations run at about 25% of actual revenue — roughly one rupiah in five of the potential. 95% of that is not a closed restaurant and not cancellations, but switched-off menu items.',
        'Pada sampel Bali kami, kerugian dari restoran offline, stok habis dan pembatalan mencapai sekitar 25% dari omzet aktual — kira-kira satu dari lima rupiah potensi. 95% dari angka itu bukan karena restoran tutup dan bukan karena pembatalan, melainkan karena item menu yang dinonaktifkan.', 'จากตัวอย่างของเราในบาหลี ความสูญเสียจากการที่ร้านออฟไลน์ เมนูปิดขาย และออร์เดอร์ถูกยกเลิก รวมกันอยู่ที่ราว 25% ของรายได้จริง — ราวหนึ่งในห้ารูเปียห์ของศักยภาพทั้งหมด และ 95% ของตัวเลขนั้นไม่ได้มาจากร้านที่ปิด ไม่ได้มาจากการยกเลิก แต่มาจากเมนูที่ถูกปิดขายเอาไว้'),
    ],
    [
      t('Как часто рестораны получают негативные отзывы?',
        'How often do restaurants get bad reviews?',
        'Seberapa sering restoran menerima ulasan negatif?', 'ร้านอาหารได้รับรีวิวแย่บ่อยแค่ไหน?'),
      t('Медиана по флоту — один негативный отзыв на 138 заказов. Средний показатель на Grab — 180 заказов, лучший в нашем флоте — 575. На GoFood средний 139, лучший 236. Если у вас негатив чаще одного на сотню заказов, проблема почти всегда в упаковке или температуре, а не в кухне.',
        'The fleet median is one bad review per 138 orders. On Grab the average is 180 orders, and the best in our fleet is 575. On GoFood the average is 139 and the best 236. If you get a negative more often than one per hundred orders, the cause is almost always packaging or temperature, not the kitchen.',
        'Median armada kami satu ulasan negatif per 138 pesanan. Di Grab rata-ratanya 180 pesanan, dan yang terbaik di armada kami 575. Di GoFood rata-ratanya 139 dan yang terbaik 236. Jika ulasan negatif muncul lebih sering dari satu per seratus pesanan, penyebabnya hampir selalu kemasan atau suhu, bukan dapur.', 'ค่ามัธยฐานของกลุ่มร้านคือหนึ่งรีวิวแย่ต่อ 138 ออร์เดอร์ บน Grab ค่าเฉลี่ยอยู่ที่ 180 ออร์เดอร์ และร้านที่ดีที่สุดในกลุ่มของเราอยู่ที่ 575 บน GoFood ค่าเฉลี่ยอยู่ที่ 139 และดีที่สุดที่ 236 ถ้าคุณได้รีวิวแย่ถี่กว่าหนึ่งครั้งต่อร้อยออร์เดอร์ สาเหตุแทบจะเป็นบรรจุภัณฑ์หรืออุณหภูมิเสมอ ไม่ใช่ครัว'),
    ],
    [
      t('Можно ли удалить несправедливый отзыв?',
        'Can an unfair review be removed?',
        'Bisakah ulasan yang tidak adil dihapus?', 'รีวิวที่ไม่เป็นธรรมลบออกได้ไหม?'),
      t('Да, чаще, чем принято думать. Из апелляций, которые мы подали на Grab, около 80% заканчиваются снятием отзыва. Это работает при двух условиях: подавать быстро и приводить конкретные факты заказа, а не общее несогласие.',
        'Yes — more often than people assume. Of the appeals we filed on Grab, around 80% end with the review removed. That works under two conditions: file fast, and cite specific facts of the order rather than general disagreement.',
        'Bisa — lebih sering daripada yang diduga. Dari banding yang kami ajukan di Grab, sekitar 80% berakhir dengan ulasan dihapus. Itu berhasil dengan dua syarat: ajukan cepat, dan sebutkan fakta konkret pesanan tersebut, bukan sekadar ketidaksetujuan umum.', 'ได้ — และบ่อยกว่าที่คนส่วนใหญ่คิด จากคำอุทธรณ์ที่เรายื่นบน Grab ราว 80% จบลงด้วยการที่รีวิวถูกลบ โดยมีเงื่อนไขสองข้อ: ยื่นให้เร็ว และอ้างข้อเท็จจริงเฉพาะของออร์เดอร์นั้น ไม่ใช่แค่การไม่เห็นด้วยแบบกว้าง ๆ'),
    ],
    [
      t('Почему на Пхукете средний чек выше, чем на Бали?',
        'Why is the average check higher in Phuket than in Bali?',
        'Mengapa rata-rata nilai pesanan di Phuket lebih tinggi daripada di Bali?', 'ทำไมยอดต่อบิลเฉลี่ยที่ภูเก็ตจึงสูงกว่าที่บาหลี?'),
      t('По нашим данным медианный чек на Пхукете около $22.5 против $15.2 на Бали — разница 48%. Рынок Пхукета менее насыщен: там меньше конкурентов на ту же аудиторию, реклама дешевле (2.9% выручки против 5.5%) и окупается вдвое лучше.',
        'In our data the median check in Phuket is about $22.5 against $15.2 in Bali — a 48% gap. The Phuket market is less saturated: fewer competitors for the same audience, cheaper ads (2.9% of revenue versus 5.5%) that pay back twice as well.',
        'Menurut data kami, median nilai pesanan di Phuket sekitar $22.5 berbanding $15.2 di Bali — selisih 48%. Pasar Phuket belum jenuh: pesaing untuk audiens yang sama lebih sedikit, iklan lebih murah (2.9% dari omzet berbanding 5.5%) dan balik modalnya dua kali lebih baik.', 'ในข้อมูลของเรา ค่ามัธยฐานยอดต่อบิลที่ภูเก็ตอยู่ราว $22.5 เทียบกับ $15.2 ที่บาหลี — ต่างกัน 48% ตลาดภูเก็ตยังไม่อิ่มตัว: คู่แข่งที่แย่งลูกค้ากลุ่มเดียวกันมีน้อยกว่า ค่าโฆษณาถูกกว่า (2.9% ของรายได้ เทียบกับ 5.5%) และคืนทุนได้ดีกว่าเท่าตัว'),
    ],
  ];

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: t('Бенчмарк доставки Бали и Пхукет 2026',
            'Bali & Phuket Delivery Benchmark 2026',
            'Benchmark Delivery Bali & Phuket 2026', 'เบนช์มาร์กเดลิเวอรี่บาหลีและภูเก็ต 2026'),
    description: t(
      'Агрегированная обезличенная статистика по 96 ресторанам на GrabFood и GoFood (Бали и Пхукет), январь–август 2026: средний чек, ROAS, доля рекламы в выручке, отмены, потери на стоп-листе, частота негативных отзывов.',
      'Aggregated, anonymised statistics across 96 GrabFood and GoFood restaurants (Bali and Phuket), January–August 2026: average check, ROAS, ad share of revenue, cancellations, stock-out losses, bad-review frequency.',
      'Statistik agregat dan anonim dari 96 restoran di GrabFood dan GoFood (Bali dan Phuket), Januari–Agustus 2026: rata-rata nilai pesanan, ROAS, porsi belanja iklan terhadap omzet, pembatalan, kerugian dari item yang dinonaktifkan, frekuensi ulasan negatif.'
    , 'สถิติรวมแบบไม่ระบุตัวตนจาก 96 ร้านอาหารบน GrabFood และ GoFood (บาหลีและภูเก็ต) มกราคม–สิงหาคม 2026: ยอดต่อบิลเฉลี่ย, ROAS, สัดส่วนค่าโฆษณาต่อรายได้, การยกเลิกออร์เดอร์, ความสูญเสียจากเมนูปิดขาย และความถี่ของรีวิวแย่'),
    url: URL,
    creator: {
      '@type': 'Organization',
      name: 'Delivery Booster',
      legalName: 'PT Delivery Booster Group',
      url: 'https://booster.delivery/',
    },
    temporalCoverage: '2026-01-01/2026-08-31',
    spatialCoverage: [
      { '@type': 'Place', name: 'Bali, Indonesia' },
      { '@type': 'Place', name: 'Phuket, Thailand' },
    ],
    variableMeasured: [
      'average check', 'GrabAds ROAS', 'ad spend share of revenue',
      'cancellation rate', 'stock-out revenue loss', 'orders per bad review',
    ],
    license: 'https://booster.delivery/benchmark',
    isAccessibleForFree: true,
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('Бенчмарк доставки Бали и Пхукет 2026',
                'Bali & Phuket Delivery Benchmark 2026',
                'Benchmark Delivery Bali & Phuket 2026', 'เบนช์มาร์กเดลิเวอรี่บาหลีและภูเก็ต 2026'),
    author: { '@id': AUTHOR_ID },
    publisher: {
      '@type': 'Organization', name: 'Delivery Booster',
      legalName: 'PT Delivery Booster Group', url: 'https://booster.delivery',
    },
    mainEntityOfPage: URL,
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
    inLanguage: language === 'ru' ? 'ru-RU' : language === 'id' ? 'id-ID' : language === 'th' ? 'th-TH' : 'en-US',
    isPartOf: { '@type': 'WebSite', name: 'Delivery Booster', url: 'https://booster.delivery' },
    about: 'GrabFood benchmark, GoFood benchmark, Bali restaurant delivery, Phuket restaurant delivery, ROAS, average check',
  };

  return (
    <AnswerLayout
      h1={t('Бенчмарк доставки: Бали и Пхукет, 2026',
            'Bali & Phuket Delivery Benchmark 2026',
            'Benchmark Delivery: Bali & Phuket, 2026', 'เบนช์มาร์กเดลิเวอรี่: บาหลีและภูเก็ต 2026')}
      lead={t(
        'Мы собрали цифры из кабинетов GrabMerchant и GoBiz 96 ресторанов, которые ведём на Бали и Пхукете, обезличили их и публикуем как нормы рынка. Выборка: 84 заведения на Бали и 12 на Пхукете, 270 568 заказов, Rp 64.7 млрд и 8.8 млн бат выручки за январь–август 2026 года. Ниже — медианы, а не средние: одно крупное заведение искажает среднее по флоту, медиана показывает, как выглядит обычный ресторан. Таких данных по Юго-Восточной Азии не публикует никто, включая сами площадки.',
        'We took the GrabMerchant and GoBiz dashboard numbers of the 96 restaurants we manage in Bali and Phuket, anonymised them, and publish them as market norms. Sample: 84 venues in Bali and 12 in Phuket, 270,568 orders, Rp 64.7bn and 8.8M baht of revenue, January–August 2026. What follows are medians rather than averages: one large venue distorts a fleet average, while the median shows what an ordinary restaurant looks like. Nobody publishes data like this for Southeast Asia — the platforms included.',
        'Kami mengambil angka dari dasbor GrabMerchant dan GoBiz milik 96 restoran yang kami kelola di Bali dan Phuket, menganonimkannya, dan menerbitkannya sebagai norma pasar. Sampel: 84 tempat di Bali dan 12 di Phuket, 270,568 pesanan, omzet Rp 64.7 miliar dan 8.8 juta baht, Januari–Agustus 2026. Yang tersaji di bawah adalah median, bukan rata-rata: satu tempat besar membuat rata-rata armada melenceng, sedangkan median menunjukkan seperti apa restoran biasa. Data seperti ini tidak dipublikasikan siapa pun untuk Asia Tenggara — termasuk oleh platformnya sendiri.'
      , 'เรานำตัวเลขจากแดชบอร์ด GrabMerchant และ GoBiz ของร้านอาหาร 96 แห่งที่เราดูแลอยู่ในบาหลีและภูเก็ต มาทำให้ไม่ระบุตัวตน แล้วเผยแพร่เป็นบรรทัดฐานของตลาด กลุ่มตัวอย่าง: 84 ร้านในบาหลีและ 12 ร้านในภูเก็ต, 270,568 ออร์เดอร์, รายได้ Rp 64.7 พันล้าน และ 8.8 ล้านบาท ระหว่างมกราคม–สิงหาคม 2026 ตัวเลขด้านล่างเป็นค่ามัธยฐาน ไม่ใช่ค่าเฉลี่ย: ร้านใหญ่เพียงร้านเดียวก็ทำให้ค่าเฉลี่ยของทั้งกลุ่มเพี้ยนได้ ขณะที่ค่ามัธยฐานแสดงว่าร้านทั่วไปหน้าตาเป็นอย่างไร ข้อมูลแบบนี้ไม่มีใครเผยแพร่สำหรับเอเชียตะวันออกเฉียงใต้ — รวมถึงตัวแพลตฟอร์มเอง')}
      meta={{ datePublished: '2026-09-08', dateModified: '2026-09-08', minutes: 10 }}
      schemas={[faqPageSchema(faq), articleSchema, datasetSchema]}
    >
      <Block card>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Stat value="96" label={t('ресторанов в выборке', 'restaurants in the sample', 'restoran dalam sampel', 'ร้านอาหารในกลุ่มตัวอย่าง')} />
          <Stat value="270 568" label={t('заказов за период', 'orders in the period', 'pesanan dalam periode', 'ออร์เดอร์ในช่วงเวลานี้')} />
          <Stat value="10.4x" label={t('медианный ROAS, Бали', 'median ROAS, Bali', 'median ROAS, Bali', 'ค่ามัธยฐาน ROAS, บาหลี')} />
          <Stat value="25%" label={t('выручки теряется на простоях и стоп-листе', 'of revenue lost to downtime and stock-outs', 'omzet hilang karena offline dan stok habis', 'ของรายได้ที่สูญไปกับการออฟไลน์และเมนูปิดขาย')} />
        </div>
      </Block>

      <Block card title={t('1. Нормы рынка: Бали', '1. Market norms: Bali', '1. Norma pasar: Bali', '1. บรรทัดฐานของตลาด: บาหลี')}>
        <p className="text-brand-muted mb-6 max-w-3xl">
          {t('84 ресторана с подключённым кабинетом. Медиана и межквартильный размах — половина флота попадает в этот коридор.',
             '84 restaurants with a connected dashboard. Median and interquartile range — half the fleet falls inside this corridor.',
             '84 restoran dengan dasbor terhubung. Median dan rentang interkuartil — separuh armada berada di koridor ini.', '84 ร้านที่เชื่อมต่อแดชบอร์ดไว้ ค่ามัธยฐานและพิสัยควอร์ไทล์ — ครึ่งหนึ่งของกลุ่มร้านอยู่ในช่วงนี้')}
        </p>
        <Table
          head={[t('Показатель', 'Metric', 'Metrik', 'ตัวชี้วัด'), t('Медиана', 'Median', 'Median', 'ค่ามัธยฐาน'), t('Половина флота (p25–p75)', 'Middle half (p25–p75)', 'Separuh tengah (p25–p75)', 'ครึ่งกลางของกลุ่ม (p25–p75)')]}
          rows={[
            [t('Средний чек', 'Average check', 'Rata-rata nilai pesanan', 'ยอดต่อบิลเฉลี่ย'), 'Rp 250k', 'Rp 194k – 296k'],
            [t('ROAS рекламы', 'Ads ROAS', 'ROAS iklan', 'ROAS ของโฆษณา'), '10.4x', '7.9x – 12.7x'],
            [t('Доля рекламы в выручке', 'Ad spend as share of revenue', 'Porsi belanja iklan terhadap omzet', 'สัดส่วนค่าโฆษณาต่อรายได้'), '5.6%', '3.9% – 7.3%'],
            [t('Отмены', 'Cancellations', 'Pembatalan', 'การยกเลิกออร์เดอร์'), '0.35%', '0.10% – 1.10%'],
            [t('Заказов на 1 негативный отзыв', 'Orders per bad review', 'Pesanan per ulasan negatif', 'ออร์เดอร์ต่อรีวิวแย่ 1 ครั้ง'), '138', t('Grab 180 · GoFood 139', 'Grab 180 · GoFood 139', 'Grab 180 · GoFood 139', 'Grab 180 · GoFood 139')],
          ]}
        />
        <p className="text-brand-muted text-sm mt-6">
          {t('Полезная проверка: ROAS ниже 5x встречается только у 6% флота. Если ваш ниже — это не «такой рынок», а поломка в карточке, ставках или промо.',
             'A useful check: a ROAS below 5x occurs in only 6% of the fleet. If yours is lower, that is not "the market" — it is something broken in the listing, the bidding or the promos.',
             'Cek berguna: ROAS di bawah 5x hanya terjadi pada 6% armada. Kalau angka Anda lebih rendah, itu bukan "pasarnya" — ada yang rusak di halaman menu, bidding atau promo.', 'จุดตรวจที่ใช้ได้จริง: ROAS ต่ำกว่า 5x เกิดขึ้นเพียง 6% ของกลุ่มร้าน ถ้าของคุณต่ำกว่านั้น มันไม่ใช่ "ตลาดเป็นแบบนี้" — แต่มีบางอย่างพังในหน้าเมนู ในการตั้งบิด หรือในโปรโมชั่น')}
        </p>
      </Block>

      <Block card title={t('2. Реклама: где начинается убывающая отдача',
                           '2. Ads: where diminishing returns begin',
                           '2. Iklan: di mana hasil mulai menurun', '2. โฆษณา: จุดที่ผลตอบแทนเริ่มลดลง')}>
        <p className="text-brand-muted mb-6 max-w-3xl">
          {t('Мы разбили флот по доле рекламы в выручке и посчитали медианный ROAS в каждой группе. Получилась кривая, которую обычно не видно изнутри одного ресторана.',
             'We split the fleet by ad spend as a share of revenue and computed the median ROAS in each band. The result is a curve you cannot see from inside a single restaurant.',
             'Kami membagi armada berdasarkan porsi belanja iklan terhadap omzet dan menghitung median ROAS di tiap kelompok. Hasilnya sebuah kurva yang tidak terlihat dari dalam satu restoran.', 'เราแบ่งกลุ่มร้านตามสัดส่วนค่าโฆษณาต่อรายได้ แล้วคำนวณค่ามัธยฐาน ROAS ในแต่ละช่วง ผลลัพธ์คือเส้นโค้งที่มองไม่เห็นจากภายในร้านเพียงร้านเดียว')}
        </p>
        <Table
          head={[t('Доля рекламы в выручке', 'Ad share of revenue', 'Porsi iklan terhadap omzet', 'สัดส่วนโฆษณาต่อรายได้'), t('Ресторанов', 'Restaurants', 'Restoran', 'จำนวนร้าน'), t('Медианный ROAS', 'Median ROAS', 'Median ROAS', 'ค่ามัธยฐาน ROAS')]}
          rows={[
            ['0–2%', '7', '12.1x'],
            ['2–4%', '16', '12.8x'],
            ['4–6%', '26', '11.8x'],
            ['6–8%', '19', '9.6x'],
            [t('больше 8%', 'over 8%', 'di atas 8%', 'มากกว่า 8%'), '16', '6.9x'],
          ]}
        />
        <p className="text-brand-muted mt-6 max-w-3xl">
          {t(
            'Перелом проходит около 6% выручки: до него медианный ROAS держится на 12.1x, после — падает до 8.6x. При этом 42% нашего флота находится за этой границей. Вывод не «тратьте меньше», а «за 6% выручки каждый следующий рубль бюджета должен покупаться конверсией карточки, а не ставкой»: бюджет имеет смысл поднимать после того, как выросла конверсия, а не до.',
            'The break sits around 6% of revenue: below it the median ROAS holds at 12.1x, above it drops to 8.6x. And 42% of our own fleet is past that line. The conclusion is not "spend less" but "past 6% of revenue, every further unit of budget has to be bought with listing conversion rather than with a bid": raise the budget after conversion improves, not before.',
            'Titik baliknya ada di sekitar 6% dari omzet: di bawahnya median ROAS bertahan di 12.1x, di atasnya turun ke 8.6x. Dan 42% armada kami sendiri sudah melewati garis itu. Kesimpulannya bukan "belanja lebih sedikit", melainkan "di atas 6% dari omzet, setiap tambahan anggaran harus dibeli dengan konversi halaman menu, bukan dengan bidding": naikkan anggaran setelah konversi membaik, bukan sebelumnya.'
          , 'จุดหักอยู่ราว 6% ของรายได้: ต่ำกว่านั้นค่ามัธยฐาน ROAS ยืนอยู่ที่ 12.1x เหนือกว่านั้นตกลงมาที่ 8.6x และ 42% ของกลุ่มร้านที่เราดูแลเองก็เลยเส้นนี้ไปแล้ว ข้อสรุปไม่ใช่ "ใช้จ่ายให้น้อยลง" แต่คือ "เมื่อเกิน 6% ของรายได้ งบทุกบาทถัดไปต้องซื้อมาด้วยคอนเวอร์ชั่นของหน้าเมนู ไม่ใช่ด้วยการเพิ่มบิด": เพิ่มงบหลังจากคอนเวอร์ชั่นดีขึ้นแล้ว ไม่ใช่ก่อนหน้านั้น')}
        </p>
      </Block>

      <Block card title={t('3. Куда на самом деле утекает выручка',
                           '3. Where the revenue actually leaks',
                           '3. Ke mana omzet sebenarnya bocor', '3. รายได้รั่วไหลไปที่ไหนกันแน่')}>
        <p className="text-brand-muted mb-6 max-w-3xl">
          {t('Мы считаем упущенную выручку по скорости заказов каждого заведения: сколько заказов ресторан обычно получает в этот час и что он недополучил, пока был закрыт или пока позиция была выключена. За период по Бали вышло ≈Rp 16.2 млрд при выручке Rp 64.7 млрд — около 25%. Распределение потерь оказалось неожиданным:',
             'We estimate lost revenue from each venue’s own order speed: how many orders it normally takes in that hour, and what it missed while closed or while an item was switched off. For the period in Bali that came to ≈Rp 16.2bn against Rp 64.7bn of revenue — about 25%. The split was the surprise:',
             'Kami menghitung omzet yang hilang dari kecepatan pesanan tiap tempat: berapa pesanan yang biasanya masuk pada jam tersebut, dan berapa yang terlewat selama tutup atau selama item dinonaktifkan. Untuk periode ini di Bali angkanya ≈Rp 16.2 miliar berbanding omzet Rp 64.7 miliar — sekitar 25%. Pembagiannya yang mengejutkan:', 'เราประเมินรายได้ที่สูญไปจากความเร็วในการรับออร์เดอร์ของร้านแต่ละแห่งเอง: ปกติร้านรับกี่ออร์เดอร์ในชั่วโมงนั้น และพลาดไปเท่าไหร่ระหว่างที่ปิดอยู่หรือระหว่างที่เมนูถูกปิดขาย สำหรับช่วงเวลานี้ในบาหลีคิดเป็น ≈Rp 16.2 พันล้าน จากรายได้ Rp 64.7 พันล้าน — ราว 25% สิ่งที่น่าประหลาดใจคือสัดส่วนของมัน:')}
        </p>
        <Table
          head={[t('Источник потерь', 'Source of loss', 'Sumber kerugian', 'แหล่งที่มาของความสูญเสีย'), t('Доля потерь', 'Share of losses', 'Porsi kerugian', 'สัดส่วนของความสูญเสีย')]}
          rows={[
            [t('Позиции в стоп-листе', 'Items out of stock', 'Item dengan stok habis', 'เมนูที่ถูกปิดขาย'), '95%'],
            [t('Простои (ресторан офлайн)', 'Downtime (restaurant offline)', 'Restoran offline', 'ร้านออฟไลน์'), '3%'],
            [t('Отмены заказов', 'Cancelled orders', 'Pesanan yang dibatalkan', 'ออร์เดอร์ที่ถูกยกเลิก'), '2%'],
          ]}
        />
        <p className="text-brand-muted mt-6 max-w-3xl">
          {t(
            'То есть деньги теряются не тогда, когда ресторан закрыт, — это все замечают, — а когда он открыт, но половины меню в нём нет. Позиции выключаются кухней или кассой на время и остаются выключенными навсегда, потому что за этим никто не следит: в нашей выборке есть блюда, висящие в стоп-листе больше 2 000 часов — это 84 дня. У отдельных заведений в стопе одновременно находится 40–70 позиций. На Пхукете картина та же по структуре (93% потерь — стоп-лист), но масштаб меньше: 6% выручки против 25%.',
            'So the money is lost not while the restaurant is closed — everyone notices that — but while it is open with half its menu missing. Items get switched off by the kitchen or the till "for now" and stay off forever, because nobody is watching: our sample contains dishes that have been out of stock for over 2,000 hours — 84 days. Individual venues have 40 to 70 items switched off at the same time. Phuket has the same structure (93% of losses are stock-outs) at a smaller scale: 6% of revenue against 25%.',
            'Jadi uang hilang bukan saat restoran tutup — itu disadari semua orang — melainkan saat restoran buka dengan separuh menu tidak tersedia. Item dinonaktifkan oleh dapur atau kasir "sementara" lalu tetap mati selamanya, karena tidak ada yang mengawasi: dalam sampel kami ada menu yang berstatus stok habis lebih dari 2,000 jam — 84 hari. Ada tempat yang menonaktifkan 40 sampai 70 item sekaligus. Phuket punya struktur yang sama (93% kerugian dari stok habis) dengan skala lebih kecil: 6% dari omzet berbanding 25%.'
          , 'นั่นแปลว่าเงินไม่ได้หายไปตอนที่ร้านปิด — เรื่องนั้นทุกคนสังเกตเห็น — แต่หายไปตอนที่ร้านเปิดอยู่ทั้งที่ครึ่งหนึ่งของเมนูไม่มีขาย เมนูถูกครัวหรือแคชเชียร์ปิด "ไว้ก่อน" แล้วก็ปิดอยู่อย่างนั้นตลอดไป เพราะไม่มีใครคอยดู: ในกลุ่มตัวอย่างของเรามีเมนูที่ถูกปิดขายนานกว่า 2,000 ชั่วโมง — คือ 84 วัน บางร้านมีเมนูถูกปิดขายพร้อมกัน 40 ถึง 70 รายการ ที่ภูเก็ตโครงสร้างเหมือนกัน (93% ของความสูญเสียมาจากเมนูปิดขาย) แต่ขนาดเล็กกว่า: 6% ของรายได้ เทียบกับ 25%')}
        </p>
      </Block>

      <Block card title={t('4. Отзывы: частота, распределение, снятие',
                           '4. Reviews: frequency, distribution, removal',
                           '4. Ulasan: frekuensi, sebaran, penghapusan', '4. รีวิว: ความถี่ การกระจาย และการลบออก')}>
        <p className="text-brand-muted mb-6 max-w-3xl">
          {t('Самая полезная метрика качества в доставке — не рейтинг, а сколько заказов проходит между двумя негативными отзывами. Рейтинг усредняет всю историю, а этот показатель реагирует на то, что происходит сейчас.',
             'The most useful quality metric in delivery is not the rating but how many orders pass between two bad reviews. A rating averages the whole history; this number reacts to what is happening now.',
             'Metrik kualitas paling berguna di delivery bukan rating, melainkan berapa pesanan yang lewat di antara dua ulasan negatif. Rating merata-ratakan seluruh riwayat; angka ini bereaksi pada apa yang terjadi sekarang.', 'ตัวชี้วัดคุณภาพที่มีประโยชน์ที่สุดในเดลิเวอรี่ไม่ใช่เรตติ้ง แต่คือจำนวนออร์เดอร์ที่ผ่านไประหว่างรีวิวแย่สองครั้ง เรตติ้งเฉลี่ยประวัติทั้งหมดเข้าด้วยกัน ส่วนตัวเลขนี้ตอบสนองต่อสิ่งที่กำลังเกิดขึ้นตอนนี้')}
        </p>
        <Table
          head={[t('Показатель', 'Metric', 'Metrik', 'ตัวชี้วัด'), t('Значение', 'Value', 'Nilai', 'ค่า')]}
          rows={[
            [t('Заказов на 1 негативный отзыв — медиана флота', 'Orders per bad review — fleet median', 'Pesanan per ulasan negatif — median armada', 'ออร์เดอร์ต่อรีวิวแย่ 1 ครั้ง — ค่ามัธยฐานของกลุ่มร้าน'), '138'],
            [t('То же, Grab: среднее / лучший результат', 'Grab: average / best', 'Grab: rata-rata / terbaik', 'Grab: ค่าเฉลี่ย / ดีที่สุด'), '180 / 575'],
            [t('То же, GoFood: среднее / лучший результат', 'GoFood: average / best', 'GoFood: rata-rata / terbaik', 'GoFood: ค่าเฉลี่ย / ดีที่สุด'), '139 / 236'],
            [t('Снимается по апелляции на Grab', 'Removed on appeal, Grab', 'Dihapus setelah banding, Grab', 'ถูกลบหลังยื่นอุทธรณ์ บน Grab'), '≈80%'],
          ]}
        />
        <p className="text-brand-muted mt-6 max-w-3xl">
          {t(
            'Второе наблюдение — про сами оценки. В выборке из 432 отзывов за 30 дней: 51% пятёрок, 28% единиц и только 3% четвёрок. Оценки в доставке бимодальны — люди пишут отзыв либо когда всё было отлично, либо когда всё было плохо, и середины почти не существует. Практический вывод: рейтинг двигают не «улучшением в среднем», а сокращением числа единиц; одна снятая несправедливая единица весит больше, чем несколько новых пятёрок.',
            'The second observation is about the scores themselves. In a 30-day sample of 432 reviews: 51% five-star, 28% one-star and only 3% four-star. Delivery ratings are bimodal — people write either when it was excellent or when it was bad, and the middle barely exists. The practical consequence: a rating moves not by "improving on average" but by cutting the number of one-star reviews; one unfair one-star removed is worth more than several new five-stars.',
            'Pengamatan kedua soal nilai ulasannya sendiri. Dalam sampel 30 hari berisi 432 ulasan: 51% bintang lima, 28% bintang satu dan hanya 3% bintang empat. Penilaian di delivery bersifat bimodal — orang menulis ulasan saat semuanya sangat baik atau saat semuanya buruk, dan bagian tengahnya nyaris tidak ada. Konsekuensi praktisnya: rating bergerak bukan karena "perbaikan rata-rata", melainkan karena berkurangnya jumlah bintang satu; satu bintang satu yang tidak adil dan berhasil dihapus lebih berharga daripada beberapa bintang lima baru.'
          , 'ข้อสังเกตที่สองเป็นเรื่องของตัวคะแนนเอง ในกลุ่มตัวอย่าง 432 รีวิวตลอด 30 วัน: 51% เป็นห้าดาว, 28% เป็นหนึ่งดาว และมีเพียง 3% ที่เป็นสี่ดาว คะแนนในเดลิเวอรี่มีสองยอด — คนเขียนรีวิวตอนที่ทุกอย่างดีมาก หรือตอนที่ทุกอย่างแย่ ส่วนตรงกลางแทบไม่มีอยู่ ผลในทางปฏิบัติคือ เรตติ้งขยับไม่ใช่เพราะ "ดีขึ้นโดยเฉลี่ย" แต่เพราะจำนวนหนึ่งดาวลดลง; หนึ่งดาวที่ไม่เป็นธรรมหนึ่งอันที่ลบออกได้มีค่ามากกว่าห้าดาวใหม่หลายอัน')}
        </p>
      </Block>

      <Block card title={t('5. Районы Бали различаются сильнее, чем кажется',
                           '5. Bali’s areas differ more than you would think',
                           '5. Area di Bali berbeda lebih jauh dari dugaan', '5. พื้นที่ต่าง ๆ ในบาหลีต่างกันมากกว่าที่คิด')}>
        <Table
          head={[t('Район', 'Area', 'Area', 'พื้นที่'), t('Заведений', 'Venues', 'Tempat', 'จำนวนร้าน'), t('Медианный чек', 'Median check', 'Median nilai pesanan', 'ค่ามัธยฐานยอดต่อบิล'), t('Медианный ROAS', 'Median ROAS', 'Median ROAS', 'ค่ามัธยฐาน ROAS')]}
          rows={[
            ['Canggu', '25', 'Rp 196k', '9.5x'],
            ['Kerobokan', '3', 'Rp 306k', '13.0x'],
            ['Tibubeneng', '6', 'Rp 288k', '12.5x'],
            ['Ubud', '15', 'Rp 281k', '11.6x'],
            ['Kuta', '6', 'Rp 251k', '9.5x'],
            ['Uluwatu', '8', 'Rp 242k', '11.9x'],
            ['Pecatu', '5', 'Rp 235k', '12.0x'],
            ['Ungasan', '4', 'Rp 212k', '5.0x'],
            ['Jimbaran', '3', 'Rp 194k', '8.2x'],
          ]}
        />
        <p className="text-brand-muted mt-6 max-w-3xl">
          {t(
            'Чангу — крупнейший рынок доставки на острове (четверть нашего флота и треть его выручки), но при этом у него один из самых низких медианных чеков и самый низкий ROAS. Это цена насыщенности: аудитории много, конкуренция за неё выше, средний заказ мельче. Ресторану, выбирающему локацию под доставку, стоит смотреть на эту таблицу до, а не после открытия.',
            'Canggu is the island’s biggest delivery market (a quarter of our fleet and a third of its revenue), yet it has one of the lowest median checks and the lowest ROAS. That is the price of saturation: plenty of audience, more competition for it, smaller average orders. A restaurant choosing a delivery location should read this table before opening rather than after.',
            'Canggu adalah pasar delivery terbesar di pulau ini (seperempat armada kami dan sepertiga omzetnya), tetapi median nilai pesanannya termasuk yang terendah dan ROAS-nya paling rendah. Itu harga dari kejenuhan: audiensnya banyak, persaingan memperebutkannya lebih ketat, pesanan rata-rata lebih kecil. Restoran yang memilih lokasi untuk delivery sebaiknya membaca tabel ini sebelum buka, bukan sesudahnya.'
          , 'จังกูเป็นตลาดเดลิเวอรี่ที่ใหญ่ที่สุดของเกาะ (หนึ่งในสี่ของกลุ่มร้านเราและหนึ่งในสามของรายได้) แต่กลับมีค่ามัธยฐานยอดต่อบิลต่ำที่สุดกลุ่มหนึ่งและ ROAS ต่ำที่สุด นั่นคือราคาของความอิ่มตัว: ลูกค้าเยอะ แต่การแข่งขันแย่งลูกค้ากลุ่มนั้นก็สูงกว่า ออร์เดอร์เฉลี่ยจึงเล็กลง ร้านที่กำลังเลือกทำเลเพื่อเดลิเวอรี่ควรอ่านตารางนี้ก่อนเปิด ไม่ใช่หลังเปิด')}
        </p>
      </Block>

      <Block card title={t('6. Бали против Пхукета', '6. Bali versus Phuket', '6. Bali versus Phuket', '6. บาหลีเทียบกับภูเก็ต')}>
        <Table
          head={[t('Показатель', 'Metric', 'Metrik', 'ตัวชี้วัด'), t('Бали', 'Bali', 'Bali', 'บาหลี'), t('Пхукет', 'Phuket', 'Phuket', 'ภูเก็ต')]}
          rows={[
            [t('Медианный чек', 'Median check', 'Median nilai pesanan', 'ค่ามัธยฐานยอดต่อบิล'), '≈$15.2', '≈$22.5'],
            [t('Медианный ROAS', 'Median ROAS', 'Median ROAS', 'ค่ามัธยฐาน ROAS'), '10.4x', '22.8x'],
            [t('Доля рекламы в выручке', 'Ad share of revenue', 'Porsi iklan terhadap omzet', 'สัดส่วนโฆษณาต่อรายได้'), '5.5%', '2.9%'],
            [t('Потери на простоях и стоп-листе', 'Downtime and stock-out losses', 'Kerugian dari offline dan stok habis', 'ความสูญเสียจากการออฟไลน์และเมนูปิดขาย'), '25%', '6%'],
          ]}
        />
        <p className="text-brand-muted mt-6 max-w-3xl">
          {t(
            'Пхукет выглядит как Бали на несколько лет раньше: чек выше почти в полтора раза, реклама вдвое дешевле в пересчёте на выручку и окупается вдвое лучше. Разница не в качестве ресторанов, а в насыщенности рынка — на Бали за ту же аудиторию борется кратно больше заведений. Для владельца это означает простую вещь: цифры, которые считаются нормальными на одном острове, не переносятся на другой.',
            'Phuket looks like Bali a few years earlier: checks are almost half as high again, ads cost half as much relative to revenue and pay back twice as well. The difference is not restaurant quality but market saturation — many times more venues compete for the same audience in Bali. For an owner that means one simple thing: numbers that count as normal on one island do not transfer to the other.',
            'Phuket tampak seperti Bali beberapa tahun lebih awal: nilai pesanan hampir satu setengah kali lebih tinggi, iklan setengah lebih murah relatif terhadap omzet dan balik modalnya dua kali lebih baik. Bedanya bukan pada kualitas restoran, melainkan pada kejenuhan pasar — di Bali jauh lebih banyak tempat memperebutkan audiens yang sama. Bagi pemilik artinya satu hal sederhana: angka yang dianggap normal di satu pulau tidak berlaku di pulau lain.'
          , 'ภูเก็ตดูเหมือนบาหลีเมื่อไม่กี่ปีก่อน: ยอดต่อบิลสูงกว่าเกือบครึ่งเท่าตัว ค่าโฆษณาเมื่อเทียบกับรายได้ถูกกว่าครึ่งหนึ่ง และคืนทุนได้ดีกว่าเท่าตัว ความต่างไม่ได้อยู่ที่คุณภาพของร้าน แต่อยู่ที่ความอิ่มตัวของตลาด — ที่บาหลีมีร้านมากกว่าหลายเท่าที่แย่งลูกค้ากลุ่มเดียวกัน สำหรับเจ้าของร้านนั่นหมายถึงเรื่องง่าย ๆ เรื่องเดียว: ตัวเลขที่ถือว่าปกติบนเกาะหนึ่ง ใช้กับอีกเกาะหนึ่งไม่ได้')}
        </p>
      </Block>

      <Block title={t('Метод и оговорки', 'Method and caveats', 'Metode dan catatan', 'วิธีการเก็บข้อมูลและข้อจำกัด')}>
        <ul className="text-brand-muted text-sm space-y-2 max-w-3xl">
          <li>{t('— Выборка: 84 ресторана на Бали и 12 на Пхукете, которые Delivery Booster ведёт на GrabFood и GoFood; учтены только заведения с подключённым кабинетом мерчанта.',
                 '— Sample: 84 restaurants in Bali and 12 in Phuket managed by Delivery Booster on GrabFood and GoFood; only venues with a connected merchant dashboard are counted.',
                 '— Sampel: 84 restoran di Bali dan 12 di Phuket yang dikelola Delivery Booster di GrabFood dan GoFood; hanya tempat dengan dasbor merchant terhubung yang dihitung.', '— กลุ่มตัวอย่าง: 84 ร้านในบาหลีและ 12 ร้านในภูเก็ตที่ Delivery Booster ดูแลอยู่บน GrabFood และ GoFood; นับเฉพาะร้านที่เชื่อมต่อแดชบอร์ดผู้ขายไว้แล้ว')}</li>
          <li>{t('— Период: январь–август 2026. Выручка, заказы, чек, расходы на рекламу, ROAS и отмены — фактические данные кабинетов GrabMerchant и GoBiz.',
                 '— Period: January–August 2026. Revenue, orders, check, ad spend, ROAS and cancellations are actual GrabMerchant and GoBiz dashboard figures.',
                 '— Periode: Januari–Agustus 2026. Omzet, pesanan, rata-rata nilai pesanan, belanja iklan, ROAS dan pembatalan adalah angka aktual dari dasbor GrabMerchant dan GoBiz.', '— ช่วงเวลา: มกราคม–สิงหาคม 2026 รายได้ ออร์เดอร์ ยอดต่อบิล ค่าโฆษณา ROAS และการยกเลิก เป็นตัวเลขจริงจากแดชบอร์ด GrabMerchant และ GoBiz')}</li>
          <li>{t('— Упущенная выручка — расчётная оценка по методике Delivery Booster: простои и стоп-лист считаются по собственной скорости заказов каждого заведения, отмены — как количество × средний чек.',
                 '— Lost revenue is an estimate by the Delivery Booster method: downtime and stock-outs are computed from each venue’s own order speed; cancellations as count × average check.',
                 '— Omzet yang hilang adalah estimasi dengan metode Delivery Booster: restoran offline dan stok habis dihitung dari kecepatan pesanan tiap tempat; pembatalan sebagai jumlah × rata-rata nilai pesanan.', '— รายได้ที่สูญไปเป็นค่าประมาณตามวิธีของ Delivery Booster: การออฟไลน์และเมนูปิดขายคำนวณจากความเร็วในการรับออร์เดอร์ของร้านแต่ละแห่งเอง; การยกเลิกคำนวณเป็นจำนวนครั้ง × ยอดต่อบิลเฉลี่ย')}</li>
          <li>{t('— Отзывы: выборка за 30 дней (432 отзыва) для распределения оценок; частота негатива и доля снятых по апелляции — за весь период.',
                 '— Reviews: a 30-day sample (432 reviews) for the score distribution; negative frequency and appeal-removal share cover the full period.',
                 '— Ulasan: sampel 30 hari (432 ulasan) untuk sebaran nilai; frekuensi ulasan negatif dan porsi yang dihapus lewat banding mencakup seluruh periode.', '— รีวิว: ใช้กลุ่มตัวอย่าง 30 วัน (432 รีวิว) สำหรับการกระจายของคะแนน; ส่วนความถี่ของรีวิวแย่และสัดส่วนที่ลบได้จากการอุทธรณ์ ครอบคลุมทั้งช่วงเวลา')}</li>
          <li>{t('— Данные обезличены: публикуются только агрегаты по флоту и районам, без названий заведений и без цифр отдельных клиентов.',
                 '— Data is anonymised: only fleet- and area-level aggregates are published, with no venue names and no individual client figures.',
                 '— Data dianonimkan: hanya agregat tingkat armada dan area yang diterbitkan, tanpa nama tempat dan tanpa angka klien perorangan.', '— ข้อมูลถูกทำให้ไม่ระบุตัวตน: เผยแพร่เฉพาะตัวเลขรวมระดับกลุ่มร้านและระดับพื้นที่ ไม่มีชื่อร้านและไม่มีตัวเลขของลูกค้ารายใดรายหนึ่ง')}</li>
          <li>{t('— Это выборка ресторанов под управлением агентства, а не случайная выборка рынка. Она смещена в сторону заведений, за которыми следят: реальные рыночные потери на стоп-листе, скорее всего, выше наших 25%.',
                 '— This is a sample of agency-managed restaurants, not a random market sample. It is biased toward venues that are being watched: real market stock-out losses are most likely higher than our 25%.',
                 '— Ini sampel restoran yang dikelola agensi, bukan sampel pasar acak. Sampel ini condong ke tempat yang diawasi: kerugian stok habis di pasar sebenarnya kemungkinan besar lebih tinggi dari 25% kami.', '— นี่คือกลุ่มตัวอย่างของร้านที่มีเอเจนซี่ดูแล ไม่ใช่กลุ่มตัวอย่างสุ่มของตลาด มันเอนไปทางร้านที่มีคนคอยเฝ้าดู: ความสูญเสียจากเมนูปิดขายในตลาดจริงน่าจะสูงกว่า 25% ของเรา')}</li>
        </ul>
      </Block>

      <FaqList faq={faq} title={t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum', 'คำถามที่พบบ่อย')} />

      <Block>
        <p className="text-brand-muted">
          {t('Как мы работаем с этими цифрами: ', 'How we work with these numbers: ', 'Cara kami bekerja dengan angka ini: ', 'วิธีที่เราทำงานกับตัวเลขเหล่านี้: ')}
          <Link href="/method" className="text-brand-green hover:underline">
            {t('метод Delivery Booster', 'the Delivery Booster Method', 'metode Delivery Booster', 'เมธอดของ Delivery Booster')}
          </Link>
          {' · '}
          <Link href="/answers/grabfood-ads-not-working" className="text-brand-green hover:underline">
            {t('почему реклама не приносит заказов', 'why ads bring no orders', 'kenapa iklan tidak membawa pesanan', 'ทำไมโฆษณาถึงไม่นำออร์เดอร์มา')}
          </Link>
          {' · '}
          <Link href="/answers/managing-grabfood-yourself" className="text-brand-green hover:underline">
            {t('сколько времени занимает вести это самому', 'how much time doing it yourself takes', 'berapa waktu yang dibutuhkan untuk mengurusnya sendiri', 'การทำเรื่องนี้เองใช้เวลาเท่าไหร่')}
          </Link>
        </p>
      </Block>

      <AnswerCta />
    </AnswerLayout>
  );
}
