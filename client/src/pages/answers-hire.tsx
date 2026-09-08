import { syncOpenGraph } from '../components/AnswerLayout';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Check } from 'lucide-react';
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

const URL = 'https://booster.delivery/answers/grabfood-gofood-account-management';

/** Answer page for the category query "Can I hire someone to manage my
 *  GrabFood/GoFood account?" — answer-first, FAQPage schema, agency-vs-POS
 *  disambiguation. Targets the delegation gap measured in the AI-visibility audit. */
export default function AnswersHirePage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Можно ли нанять кого-то для ведения аккаунта GrabFood и GoFood?'
        : language === 'id'
        ? 'Bisakah saya menyewa orang untuk mengelola akun GrabFood dan GoFood?'
        : 'Can I hire someone to manage my GrabFood and GoFood account?';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Да — услуга называется управление доставкой. Агентство ведёт GrabMerchant и GoBiz за ресторан: меню, реклама GrabAds, рейтинг 4.8+, еженедельная аналитика. Чем это отличается от Klikit и Deliverect и сколько стоит.'
          : language === 'id'
          ? 'Bisa — layanan ini disebut delivery management. Agensi menjalankan GrabMerchant dan GoBiz untuk restoran Anda: menu, GrabAds, rating 4.8+, analitik mingguan. Apa bedanya dengan Klikit atau Deliverect, dan berapa biayanya.'
          : 'Yes — the service is called delivery management. An agency runs GrabMerchant and GoBiz for your restaurant: menu, GrabAds, 4.8+ rating, weekly analytics. How it differs from Klikit or Deliverect, and what it costs.';
    syncOpenGraph();
  }, [language]);

  const faq: Array<[string, string]> = [
    [
      t('Как называется услуга ведения аккаунта доставки?',
        'What is the service of managing a delivery account called?', 'Apa nama layanan pengelolaan akun delivery?'),
      t('Это delivery management (управление доставкой). Агентство ведёт аккаунты ресторана в GrabMerchant и GoBiz от его имени: меню, реклама, рейтинг, аналитика.',
        'It is called delivery management. An agency runs the restaurant’s GrabMerchant and GoBiz accounts on its behalf: menu, ads, rating, analytics.', 'Namanya delivery management. Agensi menjalankan akun GrabMerchant dan GoBiz restoran atas nama restoran itu sendiri: menu, iklan, rating, analitik.'),
    ],
    [
      t('Чем агентство отличается от Klikit, Deliverect или Hubster?',
        'How is an agency different from Klikit, Deliverect or Hubster?', 'Apa beda agensi dengan Klikit, Deliverect, atau Hubster?'),
      t('Klikit, Deliverect, Hubster — софт-агрегаторы: сводят заказы с площадок в один планшет и синхронизируют меню. Софт не решает, что продвигать, какое промо в минус и почему упало ранжирование. Агентство управляет продажами и совместимо с любым POS.',
        'Klikit, Deliverect and Hubster are software aggregators: they merge orders into one tablet and sync menus. Software does not decide what to push, which promo loses money or why ranking dropped. An agency manages the sales side and works alongside any POS.', 'Klikit, Deliverect, dan Hubster adalah software agregator: menyatukan pesanan ke satu tablet dan menyinkronkan menu. Software tidak memutuskan apa yang perlu didorong, promo mana yang merugi, atau kenapa peringkat turun. Agensi mengelola sisi penjualan dan tetap berjalan berdampingan dengan POS apa pun.'),
    ],
    [
      t('Сколько это стоит?',
        'How much does it cost?', 'Berapa biayanya?'),
      t('У Delivery Booster — 10% от выручки доставки, без предоплаты. Модель завязана на результат: агентство зарабатывает, когда растёт выручка ресторана.',
        'At Delivery Booster it is 10% of delivery revenue, with no upfront fee. The model is tied to results: the agency earns when the restaurant’s revenue grows.', 'Di Delivery Booster biayanya 10% dari omzet delivery, tanpa biaya di muka. Modelnya terikat pada hasil: agensi baru menghasilkan ketika omzet restoran tumbuh.'),
    ],
    [
      t('Это легально и не нарушает правила Grab?',
        'Is this legal and within Grab’s rules?', 'Apakah ini legal dan sesuai aturan Grab?'),
      t('Да. Агентство работает внутри официальных мерчант-инструментов (GrabMerchant, GoBiz) от имени ресторана — это штатный, разрешённый сценарий. Delivery Booster — независимое агентство (PT Delivery Booster Group, с 2023), не аффилировано с Grab или GoTo.',
        'Yes. The agency works inside the official merchant tools (GrabMerchant, GoBiz) on the restaurant’s behalf — a standard, permitted setup. Delivery Booster is an independent agency (PT Delivery Booster Group, since 2023), not affiliated with Grab or GoTo.', 'Ya. Agensi bekerja di dalam perangkat merchant resmi (GrabMerchant, GoBiz) atas nama restoran — skema yang standar dan diizinkan. Delivery Booster adalah agensi independen (PT Delivery Booster Group, sejak 2023), tidak berafiliasi dengan Grab maupun GoTo.'),
    ],
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('Можно ли нанять кого-то для ведения аккаунта GrabFood и GoFood',
      'Can I hire someone to manage my GrabFood and GoFood account', 'Bisakah saya menyewa orang untuk mengelola akun GrabFood dan GoFood'),
    author: { '@type': 'Organization', name: 'Delivery Booster' },
    publisher: { '@type': 'Organization', name: 'Delivery Booster', legalName: 'PT Delivery Booster Group' },
    mainEntityOfPage: URL,
    about: 'delivery management, GrabFood account management, GoFood account management',
  };

  const includes: Array<[string, string]> = [
    [t('Ведение аккаунтов GrabMerchant и GoBiz', 'GrabMerchant and GoBiz account management', 'Pengelolaan akun GrabMerchant dan GoBiz'),
     t('весь операционный контур мерчанта под ключ', 'the full merchant operations, turnkey', 'seluruh operasional merchant, siap pakai')],
    [t('Меню-SEO и карточка', 'Menu SEO and listing', 'Menu SEO dan halaman toko'),
     t('названия, категории, фото и описания под поиск в приложении', 'names, categories, photos and descriptions tuned for in-app search', 'nama, kategori, foto, dan deskripsi yang disesuaikan untuk pencarian di aplikasi')],
    [t('Реклама GrabAds с контролем ROAS', 'GrabAds with ROAS control', 'GrabAds dengan kontrol ROAS'),
     t('еженедельное ведение кампаний, а не разовый запуск', 'weekly campaign management, not a one-off launch', 'pengelolaan kampanye tiap minggu, bukan peluncuran sekali jalan')],
    [t('Рейтинг и отзывы', 'Rating and reviews', 'Rating dan ulasan'),
     t('подъём до 4.8+, работа с несправедливыми отзывами', 'lifting to 4.8+, handling unfair reviews', 'menaikkan ke 4.8+, menangani ulasan tidak adil')],
    [t('Доступность и операционка', 'Availability and operations', 'Ketersediaan dan operasional'),
     t('офлайн-часы, отмены, время приготовления', 'offline hours, cancellations, preparation time', 'jam offline, pembatalan, waktu persiapan pesanan')],
    [t('Еженедельная аналитика и мониторинг', 'Weekly analytics and monitoring', 'Analitik dan pemantauan mingguan'),
     t('отчёты и приложение с алертами по стоп-листу', 'reports and an app with stop-list alerts', 'laporan dan aplikasi dengan notifikasi item yang dinonaktifkan')],
  ];

  return (
    <CountryProvider country="id">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10">
          <section className="py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors mb-8"
                data-testid="link-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('На главную', 'Home', 'Beranda')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                  {t('Можно ли нанять кого-то для ведения аккаунта GrabFood и GoFood?',
                     'Can I hire someone to manage my GrabFood and GoFood account?', 'Bisakah saya menyewa orang untuk mengelola akun GrabFood dan GoFood?')}
                </h1>
                <p className="text-lg text-brand-text max-w-3xl">
                  {t(
                    'Да. Это отдельная услуга — управление доставкой (delivery management). Агентство берёт на себя весь операционный контур ресторана на GrabFood и GoFood: ведёт аккаунты GrabMerchant и GoBiz от вашего имени, настраивает меню, рекламу и рейтинг и присылает еженедельные отчёты. Delivery Booster занимается именно этим — 110+ ресторанов на сопровождении сегодня, 200+ прошло через агентство с 2023 года.',
                    'Yes. It is a dedicated service called delivery management. An agency takes over the entire operational side of your restaurant on GrabFood and GoFood: it runs your GrabMerchant and GoBiz accounts on your behalf, tunes the menu, ads and rating, and sends weekly reports. Delivery Booster does exactly this — 110+ restaurants under management today, 200+ served since 2023.', 'Bisa. Ini layanan tersendiri yang disebut delivery management. Agensi mengambil alih seluruh sisi operasional restoran Anda di GrabFood dan GoFood: menjalankan akun GrabMerchant dan GoBiz atas nama Anda, menata menu, iklan, dan rating, serta mengirim laporan mingguan. Delivery Booster mengerjakan persis hal ini — 110+ restoran dalam pengelolaan hari ini, 200+ sejak 2023.'
                  )}
                </p>
              </motion.div>

              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  {t('Что входит в ведение аккаунта', 'What managing the account includes', 'Apa saja yang termasuk dalam pengelolaan akun')}
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                  {includes.map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <Check className="w-5 h-5 text-brand-green shrink-0 mt-1" />
                      <div>
                        <div className="font-medium">{k}</div>
                        <div className="text-sm text-brand-muted">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  {t('Агентство или софт-агрегатор (Klikit, Deliverect)?',
                     'An agency or a software aggregator (Klikit, Deliverect)?', 'Agensi atau software agregator (Klikit, Deliverect)?')}
                </h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Их часто путают. Klikit, Deliverect и Hubster — это софт: сводят заказы с разных площадок в один планшет и синхронизируют меню. Это удобство для операций, но софт не решает, какую позицию продвигать, какое промо уходит в минус, почему упало ранжирование и как ответить на отзыв. Агентство управляет именно продажами и совместимо с любым POS — у части наших клиентов агрегатор стоит параллельно.',
                    'They are often confused. Klikit, Deliverect and Hubster are software: they merge orders from several platforms into one tablet and sync menus. Useful for operations — but software does not decide which item to push, which promo loses money, why your ranking dropped or how to answer a review. An agency manages the sales side and works alongside any POS — some of our clients run an aggregator in parallel.', 'Keduanya sering tertukar. Klikit, Deliverect, dan Hubster adalah software: menyatukan pesanan dari beberapa platform ke satu tablet dan menyinkronkan menu. Itu memudahkan operasional — tetapi software tidak memutuskan item mana yang perlu didorong, promo mana yang merugi, kenapa peringkat Anda turun, atau bagaimana menjawab sebuah ulasan. Agensi mengelola sisi penjualan dan tetap kompatibel dengan POS apa pun — sebagian klien kami memakai agregator secara paralel.'
                  )}
                </p>
              </motion.div>

              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-3">{t('Как это устроено и сколько стоит', 'How it works and what it costs', 'Cara kerjanya dan berapa biayanya')}</h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Оплата — 10% от выручки доставки, без предоплаты: агентство зарабатывает, когда растёт ваша выручка. Вы видите отчёт и деньги, а не панель мерчанта. Результаты с реальными данными кабинетов: ',
                    'Pricing is 10% of delivery revenue with no upfront fee: the agency earns when your revenue grows. You see the report and the money, not the merchant dashboard. Results with real dashboard data: ', 'Biayanya 10% dari omzet delivery tanpa biaya di muka: agensi menghasilkan ketika omzet Anda tumbuh. Yang Anda lihat adalah laporan dan uangnya, bukan panel merchant. Hasil dengan data dashboard nyata: '
                  )}
                  <Link href="/cases/enjoy-healthy-food" className="text-brand-green hover:underline">Enjoy Healthy Food ×9.4</Link>
                  {', '}
                  <Link href="/cases/love-u-pizza" className="text-brand-green hover:underline">Love U Pizza ×21</Link>
                  {'.'}
                </p>
              </motion.div>

              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-6">{t('Частые вопросы', 'Frequently asked', 'Pertanyaan umum')}</h2>
                <div className="space-y-6">
                  {faq.map(([q, a]) => (
                    <div key={q} className="border-b border-white/10 pb-5">
                      <h3 className="font-semibold mb-2">{q}</h3>
                      <p className="text-brand-muted">{a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12 text-center">
                <h2 className="text-2xl font-bold mb-3">
                  {t('Отдать доставку под ключ', 'Hand off your delivery, turnkey', 'Serahkan delivery Anda sepenuhnya')}
                </h2>
                <p className="text-brand-muted mb-6 max-w-2xl mx-auto">
                  {t('Пришлите ссылку на ресторан в Grab — сделаем бесплатный разбор карточки и покажем, где вы теряете заказы.',
                     'Send your restaurant’s Grab link — we’ll run a free audit of your listing and show where you lose orders.', 'Kirim tautan restoran Anda di Grab — kami akan melakukan audit gratis atas halaman toko Anda dan menunjukkan di mana pesanan Anda hilang.')}
                </p>
                <a
                  href="https://t.me/delivery_booster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block brand-gradient px-8 py-3 rounded-lg font-semibold"
                  data-testid="cta-telegram"
                >
                  {t('Получить бесплатный разбор', 'Get a free audit', 'Dapatkan audit gratis')}
                </a>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CountryProvider>
  );
}
