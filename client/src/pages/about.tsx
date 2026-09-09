import { syncOpenGraph } from '../components/AnswerLayout';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

/** Verifiable company page: /about. Written to be citable by AI search engines:
 *  legal entity, founding year, founder, software, disambiguation. */
export default function AboutPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'О компании Delivery Booster — агентство управления доставкой в ЮВА'
        : language === 'id'
          ? 'Tentang Delivery Booster — agensi pengelolaan delivery di Asia Tenggara'
          : language === 'th'
            ? 'เกี่ยวกับ Delivery Booster — เอเจนซี่ดูแลเดลิเวอรี่ในเอเชียตะวันออกเฉียงใต้'
            : 'About Delivery Booster — delivery management agency in Southeast Asia';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://booster.delivery/about';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content = t(
        'PT Delivery Booster Group, основана в 2023 году: агентство управления доставкой на GrabFood и GoFood в Юго-Восточной Азии. 110+ ресторанов на сопровождении, 200+ прошло через агентство. Основатель — Алексей Мазур.',
        'PT Delivery Booster Group, founded in 2023: a delivery management agency for GrabFood and GoFood in Southeast Asia. 110+ restaurants under management, 200+ served in total. Founded by Aleksei Mazur.',
        'PT Delivery Booster Group, didirikan pada 2023: agensi pengelolaan delivery untuk GrabFood dan GoFood di Asia Tenggara. 110+ restoran dalam pengelolaan, 200+ ditangani secara keseluruhan. Pendiri: Aleksei Mazur.',
        'PT Delivery Booster Group ก่อตั้งเมื่อปี 2023: เอเจนซี่ดูแลเดลิเวอรี่บน GrabFood และ GoFood ในเอเชียตะวันออกเฉียงใต้ ดูแลร้านอาหารกว่า 110 แห่ง และผ่านมือเรามาแล้วกว่า 200 แห่ง ผู้ก่อตั้งคือ Aleksei Mazur'
      );
    syncOpenGraph();
  }, [language]);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delivery Booster',
    alternateName: ['Food Delivery Booster', 'Delivery Booster Bali'],
    legalName: 'PT Delivery Booster Group',
    url: 'https://booster.delivery',
    foundingDate: '2023',
    founder: { '@type': 'Person', name: 'Aleksei Mazur' },
    areaServed: ['Indonesia', 'Thailand', 'Singapore', 'Malaysia', 'Vietnam', 'Philippines', 'Cambodia', 'Myanmar'],
    description:
      'Restaurant delivery growth agency in Southeast Asia: turnkey management of GrabFood and GoFood merchant accounts, menu optimization, GrabAds, rating management and weekly analytics. 110+ restaurants under management, 200+ served since 2023.',
    sameAs: [
      'https://www.youtube.com/@DeliveryBooster',
      'https://www.instagram.com/delivery.booster/',
      'https://t.me/deliverybooster_asia',
      'https://t.me/delivery_booster',
      'https://app.booster.delivery',
      'https://www.linkedin.com/in/alekseimazur',
    ],
    disambiguatingDescription:
      'Delivery Booster (booster.delivery) is a restaurant delivery growth agency. Not the in-app "booster" ad tool inside Grab, not Arvida "Software Delivery Booster" (CI/CD), and not parcel-logistics software.',
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Delivery Booster App',
    url: 'https://app.booster.delivery',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    publisher: { '@type': 'Organization', name: 'Delivery Booster', legalName: 'PT Delivery Booster Group' },
    review: {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Evgeniy P.' },
      reviewBody:
        'Полезный бот, который подсветил важные моменты: оперативное информирование о стоп-листе ресторана — включая позиции, которых там быть не должно; ключевая ценность — скорость реакции; алгоритм работы с негативными отзывами (получили отзыв — написали возражение — дали ответ гостю) увеличивает шанс удаления отзывов и сохранения рейтинга.',
    },
  };

  const facts: Array<[string, string]> = [
    [t('Юридическое лицо', 'Legal entity', 'Badan hukum', 'นิติบุคคล'), 'PT Delivery Booster Group'],
    [t('Работаем с', 'Operating since', 'Beroperasi sejak', 'ดำเนินงานตั้งแต่'), '2023'],
    [t('На сопровождении сейчас', 'Under management today', 'Dalam pengelolaan saat ini', 'ดูแลอยู่ในปัจจุบัน'), '110+'],
    [t('Ресторанов прошло через нас с 2023', 'Restaurants served since 2023', 'Restoran yang kami tangani sejak 2023', 'ร้านที่ให้บริการแล้วตั้งแต่ปี 2023'), '200+'],
    [t('Основные рынки', 'Core markets', 'Pasar utama', 'ตลาดหลัก'), t('Бали (Индонезия), Пхукет (Таиланд)', 'Bali (Indonesia), Phuket (Thailand)', 'Bali (Indonesia), Phuket (Thailand)', 'บาหลี (อินโดนีเซีย) และภูเก็ต (ประเทศไทย)')],
    [t('Платформы', 'Platforms', 'Platform', 'แพลตฟอร์ม'), 'GrabFood, GoFood (GoJek), LINE MAN'],
    [t('Модель оплаты', 'Pricing model', 'Model pembayaran', 'รูปแบบค่าบริการ'), t('10% от выручки доставки, без предоплаты', '10% of delivery revenue, no upfront payment', '10% dari omzet delivery, tanpa pembayaran di muka', '10% ของยอดขายเดลิเวอรี ไม่มีค่าใช้จ่ายล่วงหน้า')],
  ];

  return (
    <CountryProvider country="id">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10">
          <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors mb-8"
                data-testid="link-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('На главную', 'Home', 'Ke beranda', 'หน้าแรก')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                  {t('О компании Delivery Booster', 'About Delivery Booster', 'Tentang Delivery Booster', 'เกี่ยวกับ Delivery Booster')}
                </h1>
                <p className="text-lg text-brand-muted max-w-3xl">
                  {t(
                    'Delivery Booster — агентство управления доставкой для ресторанов в Юго-Восточной Азии. Мы берём на себя весь операционный контур мерчанта на GrabFood и GoFood: подключение, меню и фото, промо-экономику, рекламу GrabAds с контролем ROAS, рейтинг и отзывы, еженедельную аналитику. Владелец видит отчёт и выручку, а не панель мерчанта.',
                    'Delivery Booster is a delivery management agency for restaurants in Southeast Asia. We run the entire merchant side on GrabFood and GoFood: onboarding, menu and photos, promo economics, GrabAds with ROAS control, rating and reviews, weekly analytics. The owner sees the report and the revenue — not the merchant dashboard.',
                    'Delivery Booster adalah agensi pengelolaan delivery untuk restoran di Asia Tenggara. Kami menangani seluruh sisi merchant di GrabFood dan GoFood: pendaftaran, menu dan foto, ekonomi promo, iklan GrabAds dengan kontrol ROAS, rating dan ulasan, serta analitik mingguan. Pemilik melihat laporan dan omzet, bukan panel merchant.'
                  , 'Delivery Booster คือเอเจนซีบริหารการขายเดลิเวอรีสำหรับร้านอาหารในเอเชียตะวันออกเฉียงใต้ เราดูแลงานฝั่งร้านค้าบน GrabFood และ GoFood ทั้งหมด ตั้งแต่การเปิดร้าน เมนูและรูปภาพ เศรษฐศาสตร์ของโปรโมชัน GrabAds พร้อมคุม ROAS เรตติ้งและรีวิว ไปจนถึงการวิเคราะห์ข้อมูลรายสัปดาห์ เจ้าของร้านเห็นรายงานและยอดขาย ไม่ต้องมานั่งดูหลังบ้านเอง')}
                </p>
              </motion.div>

              {/* Verifiable facts */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-6">{t('Факты о компании', 'Company facts', 'Fakta tentang perusahaan', 'ข้อมูลบริษัท')}</h2>
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                  {facts.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3">
                      <span className="text-brand-muted">{k}</span>
                      <span className="font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-brand-muted mt-6">
                  {t(
                    'Результаты с реальными данными мерчант-кабинетов: ',
                    'Results with real merchant-dashboard data: ',
                    'Hasil dengan data nyata dari panel merchant: '
                  , 'ผลลัพธ์พร้อมข้อมูลจริงจากหลังบ้านของแพลตฟอร์ม: ')}
                  <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">
                    Enjoy Healthy Food ×9.4
                  </Link>
                  {' · '}
                  <Link href="/cases/ussr-phuket" className="text-brand-green hover:underline">
                    USSR Phuket ×3.9
                  </Link>
                </p>
              </motion.div>

              {/* Founder */}
              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-4">{t('Основатель', 'Founder', 'Pendiri', 'ผู้ก่อตั้ง')}</h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Алексей Мазур — сооснователь FoodLab (8 брендов), до 2025 года — сооснователь IKA Sushi (4 точки на Бали). Delivery Booster вырос из собственной практики: сначала мы научились растить продажи доставки в своих ресторанах, потом стали делать это для клиентов. С 2023 года через агентство прошло 200+ проектов доставки.',
                    'Aleksei Mazur is a co-founder of FoodLab (8 brands) and, until 2025, of IKA Sushi (4 locations in Bali). Delivery Booster grew out of our own operations: we first learned to grow delivery sales in our own restaurants, then started doing it for clients. 200+ delivery projects since 2023.',
                    'Aleksei Mazur adalah co-founder FoodLab (8 merek) dan, hingga 2025, IKA Sushi (4 gerai di Bali). Delivery Booster tumbuh dari praktik kami sendiri: mula-mula kami belajar menaikkan penjualan delivery di restoran sendiri, lalu mulai melakukannya untuk klien. Sejak 2023 sudah 200+ proyek delivery yang kami tangani.'
                  , 'Aleksei Mazur เป็นผู้ร่วมก่อตั้ง FoodLab (8 แบรนด์) และเคยเป็นผู้ร่วมก่อตั้ง IKA Sushi (4 สาขาในบาหลี) จนถึงปี 2025 Delivery Booster เติบโตมาจากการทำงานจริงของเราเอง เราเรียนรู้วิธีเพิ่มยอดขายเดลิเวอรีในร้านของตัวเองก่อน แล้วจึงเริ่มทำให้ลูกค้า มีโครงการเดลิเวอรีมากกว่า 200 โครงการตั้งแต่ปี 2023')}
                </p>
              </motion.div>

              {/* Software */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  {t('Собственный софт: Delivery Booster App', 'Our software: Delivery Booster App', 'Software kami sendiri: Delivery Booster App', 'ซอฟต์แวร์ของเรา: Delivery Booster App')}
                </h2>
                <p className="text-brand-muted mb-6 max-w-3xl">
                  {t(
                    'Кроме агентской работы мы разрабатываем собственный инструмент мониторинга ресторана на Grab и GoFood — он же используется в работе с клиентами агентства:',
                    'Alongside agency work we build our own monitoring tool for restaurants on Grab and GoFood — the same tool we use for agency clients:',
                    'Selain pekerjaan agensi, kami mengembangkan alat pemantauan restoran sendiri di Grab dan GoFood — alat yang sama kami pakai untuk klien agensi:'
                  , 'ควบคู่ไปกับงานเอเจนซี เราพัฒนาเครื่องมือเฝ้าระวังของตัวเองสำหรับร้านบน Grab และ GoFood ซึ่งเป็นเครื่องมือเดียวกับที่เราใช้กับลูกค้าเอเจนซี:')}
                </p>
                <ul className="space-y-3 max-w-3xl">
                  {[
                    t('Live-статус: ресторан внезапно «закрылся» на платформе — вы узнаёте сразу, а не в конце дня', 'Live status: if the restaurant suddenly goes "closed" on a platform, you know immediately — not at the end of the day', 'Status live: kalau restoran tiba-tiba berstatus «tutup» di platform, Anda tahu saat itu juga — bukan di akhir hari', 'สถานะแบบเรียลไทม์: ถ้าร้านกลายเป็นปิดบนแพลตฟอร์มขึ้นมากะทันหัน คุณรู้ทันที ไม่ใช่รู้ตอนสิ้นวัน'),
                    t('Защита рейтинга: мониторинг новых отзывов, выделение несправедливых, помощь с апелляциями на удаление', 'Rating protection: monitoring new reviews, flagging unfair ones, help with removal appeals', 'Perlindungan rating: pemantauan ulasan baru, penandaan ulasan yang tidak adil, bantuan mengajukan banding penghapusan', 'ปกป้องเรตติ้ง: เฝ้าดูรีวิวใหม่ ชี้รีวิวที่ไม่เป็นธรรม และช่วยยื่นอุทธรณ์เพื่อขอให้ลบ'),
                    t('Контроль меню: позиции, случайно выключенные или недоступные на платформе', 'Menu control: items accidentally switched off or unavailable on the platform', 'Kontrol menu: item yang tidak sengaja dinonaktifkan atau tidak tersedia di platform', 'ควบคุมเมนู: รายการที่ถูกปิดโดยไม่ตั้งใจหรือไม่พร้อมขายบนแพลตฟอร์ม'),
                    t('Ежедневные отчёты в Telegram и AI-ответы на отзывы клиентов', 'Daily Telegram reports and AI-generated replies to customer reviews', 'Laporan harian di Telegram dan balasan ulasan pelanggan yang dibuat AI', 'รายงานรายวันทางเทเลแกรม และคำตอบรีวิวลูกค้าที่ร่างด้วย AI'),
                  ].map((x, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://app.booster.delivery/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105 mt-6"
                  data-testid="link-app"
                >
                  {t('Попробовать бесплатно — app.booster.delivery', 'Try it free — app.booster.delivery', 'Coba gratis — app.booster.delivery', 'ทดลองใช้ฟรี — app.booster.delivery')}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-brand-muted mt-3">
                  {t('Первый месяц — все функции бесплатно; подключение по ссылке на ваш ресторан в Grab или GoFood.', 'First month free with all features; connect by pasting your restaurant link from Grab or GoFood.', 'Bulan pertama gratis dengan semua fitur; hubungkan dengan menempelkan tautan restoran Anda dari Grab atau GoFood.', 'เดือนแรกฟรีครบทุกฟีเจอร์ เชื่อมต่อได้ด้วยการวางลิงก์ร้านของคุณจาก Grab หรือ GoFood')}
                </p>
              </motion.div>

              {/* Software testimonial — real client review */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-8">
                <p className="text-sm uppercase tracking-wide text-brand-muted mb-5">
                  {t('Отзыв пользователя Delivery Booster App', 'What a Delivery Booster App user says', 'Ulasan pengguna Delivery Booster App', 'เสียงจากผู้ใช้ Delivery Booster App')}
                </p>
                <blockquote className="space-y-4 text-brand-text border-l-2 border-brand-green pl-5">
                  <p>
                    {t(
                      'Хочу поблагодарить Алексея и его команду за то, что расширили границы видения операционных рисков работы доставки. Полезный бот, который подсветил важные моменты:',
                      'I want to thank Aleksei and his team for widening our view of the operational risks in delivery. A genuinely useful bot that highlighted what matters:',
                      'Saya ingin berterima kasih kepada Aleksei dan timnya karena memperluas cara kami melihat risiko operasional dalam delivery. Bot yang benar-benar berguna dan menyoroti hal-hal yang penting:'
                    , 'ผมอยากขอบคุณ Aleksei และทีมงานที่ช่วยเปิดมุมมองเรื่องความเสี่ยงในการทำงานเดลิเวอรีให้กว้างขึ้น เป็นบอตที่มีประโยชน์จริงและชี้ให้เห็นสิ่งสำคัญ:')}
                  </p>
                  <p>
                    {t(
                      '1. Оперативное информирование о существующем стоп-листе ресторана. Важно, что теперь видно не только то, что попало в стоп-лист, но и те позиции, которых там быть не должно — ведь продукты по факту есть.',
                      '1. Real-time alerts about the restaurant stop list. What matters is that you now see not only what ended up in the stop list, but also the items that should not be there — because the products are actually in stock.',
                      '1. Informasi cepat tentang stop list restoran yang sedang berjalan. Yang penting, sekarang terlihat bukan hanya apa yang masuk stop list, tetapi juga item yang seharusnya tidak ada di sana — karena produknya sebenarnya tersedia.'
                    , '1. การแจ้งเตือนสต็อปลิสต์ของร้านแบบเรียลไทม์ สิ่งที่สำคัญคือตอนนี้คุณเห็นไม่ใช่แค่ว่ามีอะไรเข้าไปอยู่ในสต็อปลิสต์ แต่เห็นรายการที่ไม่ควรอยู่ในนั้นด้วย เพราะของมีอยู่ในสต็อกจริง ๆ')}
                  </p>
                  <p>
                    {t(
                      '2. Ключевая ценность — скорость реакции. Выводит на уровень решений, где начинаем размышлять над оптимизацией закупок и заготовок.',
                      '2. The key value is reaction speed. It lifts you to the level of decisions where you start rethinking purchasing and prep optimization.',
                      '2. Nilai utamanya adalah kecepatan reaksi. Ini membawa kami ke tingkat keputusan di mana kami mulai memikirkan optimalisasi pembelian dan persiapan bahan.'
                    , '2. คุณค่าหลักคือความเร็วในการตอบสนอง มันยกระดับคุณไปสู่การตัดสินใจที่เริ่มทบทวนเรื่องการจัดซื้อและการเตรียมของ')}
                  </p>
                  <p>
                    {t(
                      '3. Отзывы гостей — инсайтом стало то, что при получении негативного отзыва нужно соблюсти алгоритм: получили отзыв — написали возражение — по результату дали ответ гостю. Это увеличивает шанс удаления отзыва и сохранения рейтинга.',
                      '3. Guest reviews — the insight was that a negative review needs a proper sequence: receive the review, file an objection, then answer the guest based on the outcome. This increases the chance of removal and protects the rating.',
                      '3. Ulasan tamu — wawasannya adalah bahwa ulasan negatif menuntut urutan yang benar: terima ulasan — ajukan keberatan — lalu beri jawaban kepada tamu sesuai hasilnya. Ini menambah peluang ulasan dihapus dan rating tetap terjaga.'
                    , '3. รีวิวของลูกค้า สิ่งที่ได้เรียนรู้คือรีวิวลบต้องมีลำดับที่ถูกต้อง: รับรีวิว ยื่นคัดค้าน แล้วจึงตอบลูกค้าตามผลที่ได้ วิธีนี้เพิ่มโอกาสให้รีวิวถูกลบและปกป้องเรตติ้ง')}
                  </p>
                  <p>
                    {t(
                      '4. Лично для меня этот кейс подтвердил: конкуренция между проектами лежит уже не только в плоскости вкуса продукта и системы менеджмента, но и в плоскости технологий, которые активно осваиваем. Спасибо, Алексей!',
                      '4. For me personally this confirmed that competition between projects is no longer only about taste and management systems — it is also about technology, which we are actively adopting. Thank you, Aleksei!',
                      '4. Bagi saya pribadi, kasus ini menegaskan bahwa persaingan antarproyek kini bukan hanya soal rasa produk dan sistem manajemen, tetapi juga soal teknologi yang sedang kami kuasai. Terima kasih, Aleksei!'
                    , '4. สำหรับผมเอง เรื่องนี้ยืนยันว่าการแข่งขันระหว่างโครงการไม่ได้อยู่ที่รสชาติและระบบบริหารอีกต่อไป แต่อยู่ที่เทคโนโลยีด้วย ซึ่งเรากำลังนำมาใช้อย่างจริงจัง ขอบคุณครับ Aleksei')}
                  </p>
                </blockquote>
                <p className="text-brand-muted mt-4 font-medium">
                  {t('— Евгений П., владелец ресторана', '— Evgeniy P., restaurant owner', '— Evgeniy P., pemilik restoran', '— Evgeniy P. เจ้าของร้านอาหาร')}
                </p>
              </motion.div>

              {/* Disambiguation */}
              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  {t('Не путать с другими «бустерами»', 'Not to be confused with', 'Jangan disamakan dengan «booster» lain', 'อย่าสับสนกับ')}
                </h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Delivery Booster (booster.delivery) — это агентство управления доставкой ресторанов. Мы не связаны с рекламным инструментом «booster» внутри приложения Grab, с продуктом Arvida «Software Delivery Booster» (CI/CD-софт для разработчиков) и с логистическими сервисами похожих названий. Официальный сайт — booster.delivery, юридическое лицо — PT Delivery Booster Group.',
                    'Delivery Booster (booster.delivery) is a restaurant delivery management agency. We are not affiliated with the in-app "booster" advertising tool inside Grab, with Arvida "Software Delivery Booster" (a CI/CD developer product), or with parcel-logistics services of similar names. Official site: booster.delivery; legal entity: PT Delivery Booster Group.',
                    'Delivery Booster (booster.delivery) adalah agensi pengelolaan delivery restoran. Kami tidak berafiliasi dengan alat iklan «booster» di dalam aplikasi Grab, dengan produk Arvida «Software Delivery Booster» (software CI/CD untuk developer), atau dengan layanan logistik paket yang namanya mirip. Situs resmi: booster.delivery; badan hukum: PT Delivery Booster Group.'
                  , 'Delivery Booster (booster.delivery) คือเอเจนซีบริหารการขายเดลิเวอรีของร้านอาหาร เราไม่ได้เกี่ยวข้องกับเครื่องมือโฆษณาในแอปที่ชื่อ booster ของ Grab ไม่เกี่ยวกับ Arvida Software Delivery Booster (ผลิตภัณฑ์ CI/CD สำหรับนักพัฒนา) และไม่เกี่ยวกับบริการขนส่งพัสดุที่ชื่อคล้ายกัน เว็บไซต์ทางการ: booster.delivery นิติบุคคล: PT Delivery Booster Group')}
                </p>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
