import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Check } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { syncOpenGraph } from '../components/AnswerLayout';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { messengerUrl, WHATSAPP_DISPLAY } from '../lib/cta';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

/** Реквизиты компании: одно место, откуда они берутся на /pricing, в футере и в схеме.
 *  Адрес и телефон те же, что в анкете платёжного провайдера (Xendit, 06.11.2026). */
export const COMPANY = {
  legalName: 'PT Delivery Booster Group',
  address: 'Jalan Raya Semer No. 40 B, Kerobokan, Kuta Utara, Badung, Bali 80361, Indonesia',
  phone: '+62 859 5677 9546',
  phoneHref: 'tel:+6285956779546',
};

/**
 * /pricing: услуги, цена, как платить, реквизиты. Требование платёжного провайдера
 * (Xendit, 06.11.2026): на сайте должны быть услуги, тарифы, раздел «как оплатить»,
 * адрес, телефон и полное название юрлица. Цифры только те, что уже есть на сайте.
 */
export default function PricingPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t(
      'Цены и оплата - Delivery Booster',
      'Pricing and payment - Delivery Booster',
      'Harga dan pembayaran - Delivery Booster',
      'ราคาและการชำระเงิน - Delivery Booster'
    );
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://booster.delivery/pricing';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content = t(
        'Услуги, цена и порядок оплаты Delivery Booster: ведение аккаунтов GrabFood, GoFood и LINE MAN за 10% от выручки доставки, без предоплаты. Инвойс раз в месяц, оплата по ссылке. PT Delivery Booster Group, Бали.',
        'Delivery Booster services, pricing and payment: GrabFood, GoFood and LINE MAN account management for 10% of delivery revenue, no upfront payment. Monthly invoice, pay by link. PT Delivery Booster Group, Bali.',
        'Layanan, harga, dan cara pembayaran Delivery Booster: pengelolaan akun GrabFood, GoFood, dan LINE MAN dengan biaya 10% dari omzet delivery, tanpa uang muka. Invoice bulanan, bayar lewat tautan. PT Delivery Booster Group, Bali.',
        'บริการ ราคา และวิธีชำระเงินของ Delivery Booster: ดูแลบัญชี GrabFood, GoFood และ LINE MAN ค่าบริการ 10% ของยอดขายเดลิเวอรี ไม่มีค่าใช้จ่ายล่วงหน้า ออกใบแจ้งหนี้รายเดือน ชำระผ่านลิงก์ PT Delivery Booster Group บาหลี'
      );
    syncOpenGraph();
  }, [language]);

  const services: string[] = [
    t('Подключение ресторана к GrabFood и GoFood (в Таиланде к Grab и LINE MAN) и настройка мерчант-кабинетов',
      'Onboarding the restaurant to GrabFood and GoFood (in Thailand: Grab and LINE MAN) and setting up the merchant accounts',
      'Pendaftaran restoran ke GrabFood dan GoFood (di Thailand: Grab dan LINE MAN) dan penyiapan akun merchant',
      'เปิดร้านบน GrabFood และ GoFood (ในประเทศไทย: Grab และ LINE MAN) และตั้งค่าบัญชีร้านค้า'),
    t('Ежедневное ведение GrabMerchant, GoBiz и LINE MAN Wongnai Merchant от имени ресторана',
      'Daily management of GrabMerchant, GoBiz and LINE MAN Wongnai Merchant on the restaurant’s behalf',
      'Pengelolaan harian GrabMerchant, GoBiz, dan LINE MAN Wongnai Merchant atas nama restoran',
      'ดูแล GrabMerchant, GoBiz และ LINE MAN Wongnai Merchant แทนร้านทุกวัน'),
    t('Меню и фото: названия под поиск внутри приложения, категории, описания, цены доставочного меню',
      'Menu and photos: item names for in-app search, categories, descriptions, delivery-menu pricing',
      'Menu dan foto: nama item untuk pencarian di aplikasi, kategori, deskripsi, harga menu delivery',
      'เมนูและรูปภาพ: ชื่อเมนูสำหรับการค้นหาในแอป หมวดหมู่ คำอธิบาย ราคาเมนูเดลิเวอรี'),
    t('Контроль стопов и времени принятия заказов, возврат выключенных позиций в продажу',
      'Monitoring item stops and order acceptance time, switching unavailable items back on',
      'Pemantauan stop item dan waktu terima pesanan, mengaktifkan kembali item yang mati',
      'ตรวจสอบเมนูที่ถูกปิดและเวลารับออร์เดอร์ เปิดขายรายการที่ถูกปิดกลับคืน'),
    t('Экономика промо: расчёт и отключение убыточных акций',
      'Promo economics: calculating and switching off loss-making promotions',
      'Ekonomi promo: menghitung dan mematikan promo yang merugi',
      'เศรษฐศาสตร์โปรโมชัน: คำนวณและปิดโปรโมชันที่ขาดทุน'),
    t('Реклама GrabAds и GoFood Ads с контролем ROAS и еженедельной корректировкой ставок',
      'GrabAds and GoFood Ads with ROAS control and weekly bid adjustments',
      'Iklan GrabAds dan GoFood Ads dengan kontrol ROAS dan penyesuaian bid mingguan',
      'โฆษณา GrabAds และ GoFood Ads พร้อมคุม ROAS และปรับราคาประมูลรายสัปดาห์'),
    t('Рейтинг и отзывы: ответы гостям, апелляции по несправедливым отзывам',
      'Rating and reviews: replies to guests, appeals on unfair reviews',
      'Rating dan ulasan: balasan ke pelanggan, banding atas ulasan yang tidak adil',
      'เรตติ้งและรีวิว: ตอบลูกค้า ยื่นอุทธรณ์รีวิวที่ไม่เป็นธรรม'),
    t('Еженедельный отчёт: заказы, выручка, ROAS, изменения рейтинга',
      'Weekly report: orders, revenue, ROAS, rating changes',
      'Laporan mingguan: pesanan, omzet, ROAS, perubahan rating',
      'รายงานรายสัปดาห์: ออร์เดอร์ ยอดขาย ROAS การเปลี่ยนแปลงเรตติ้ง'),
  ];

  const payment: string[] = [
    t('Предоплаты нет. Счёт выставляется раз в месяц по факту: 10% от выручки доставки за прошедший месяц по цифрам GrabMerchant, GoBiz и LINE MAN Wongnai Merchant.',
      'No upfront payment. One invoice per month, after the fact: 10% of the previous month’s delivery revenue as shown in GrabMerchant, GoBiz and LINE MAN Wongnai Merchant.',
      'Tidak ada uang muka. Satu invoice per bulan setelah periode berjalan: 10% dari omzet delivery bulan sebelumnya sesuai angka di GrabMerchant, GoBiz, dan LINE MAN Wongnai Merchant.',
      'ไม่มีค่าใช้จ่ายล่วงหน้า ออกใบแจ้งหนี้เดือนละครั้งตามจริง: 10% ของยอดขายเดลิเวอรีเดือนที่ผ่านมา ตามตัวเลขใน GrabMerchant, GoBiz และ LINE MAN Wongnai Merchant'),
    t('Инвойс от PT Delivery Booster Group приходит на email и в WhatsApp со ссылкой на оплату.',
      'The invoice from PT Delivery Booster Group arrives by email and WhatsApp with a payment link.',
      'Invoice dari PT Delivery Booster Group dikirim lewat email dan WhatsApp beserta tautan pembayaran.',
      'ใบแจ้งหนี้จาก PT Delivery Booster Group ส่งทางอีเมลและ WhatsApp พร้อมลิงก์ชำระเงิน'),
    t('Оплата по ссылке: банковский перевод (virtual account), карта Visa/Mastercard, QRIS, электронные кошельки. Наличными не принимаем.',
      'Pay by link: bank transfer (virtual account), Visa/Mastercard, QRIS, e-wallets. We do not accept cash.',
      'Bayar lewat tautan: transfer bank (virtual account), kartu Visa/Mastercard, QRIS, dompet digital. Kami tidak menerima tunai.',
      'ชำระผ่านลิงก์: โอนผ่านธนาคาร (virtual account), บัตร Visa/Mastercard, QRIS, กระเป๋าเงินอิเล็กทรอนิกส์ ไม่รับเงินสด'),
    t('Комиссии площадок, рекламный бюджет и скидки за счёт ресторана в наш счёт не входят: их ресторан платит площадкам напрямую.',
      'Platform commissions, ad budgets and restaurant-funded discounts are not part of our invoice: the restaurant pays those to the platforms directly.',
      'Komisi platform, anggaran iklan, dan diskon yang ditanggung restoran tidak termasuk dalam invoice kami: restoran membayarnya langsung ke platform.',
      'ค่าคอมมิชชันแพลตฟอร์ม งบโฆษณา และส่วนลดที่ร้านออกเอง ไม่รวมอยู่ในใบแจ้งหนี้ของเรา ร้านชำระให้แพลตฟอร์มโดยตรง'),
    t('Аккаунт и выплаты от площадок остаются у владельца ресторана: мы работаем в вашем кабинете, деньги от Grab и Gojek приходят вам.',
      'The merchant account and platform payouts stay with the restaurant owner: we work inside your dashboard, the money from Grab and Gojek goes to you.',
      'Akun merchant dan pencairan dana dari platform tetap milik pemilik restoran: kami bekerja di dasbor Anda, uang dari Grab dan Gojek masuk ke Anda.',
      'บัญชีร้านค้าและเงินโอนจากแพลตฟอร์มยังเป็นของเจ้าของร้าน เราทำงานในหลังบ้านของคุณ เงินจาก Grab และ Gojek เข้าบัญชีคุณ'),
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GrabFood, GoFood and LINE MAN account management for restaurants',
    provider: {
      '@type': 'Organization',
      name: 'Delivery Booster',
      legalName: COMPANY.legalName,
      url: 'https://booster.delivery',
      telephone: COMPANY.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jalan Raya Semer No. 40 B, Kerobokan',
        addressLocality: 'Kuta Utara, Badung',
        addressRegion: 'Bali',
        postalCode: '80361',
        addressCountry: 'ID',
      },
    },
    areaServed: ['Indonesia', 'Thailand'],
    offers: {
      '@type': 'Offer',
      url: 'https://booster.delivery/pricing',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '10',
        priceCurrency: 'IDR',
        unitText: 'percent of monthly delivery platform revenue',
        description: '10% of monthly GrabFood, GoFood and LINE MAN revenue; typical invoice IDR 6,500,000 to 13,000,000 per month (USD 400 to 800). No upfront payment, no setup fee. Invoiced monthly, payable by link.',
      },
    },
  };

  return (
    <CountryProvider country="id">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10">
          <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors mb-8" data-testid="link-back-home">
                <ArrowLeft className="w-4 h-4" />
                {t('На главную', 'Home', 'Ke beranda', 'หน้าแรก')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                  {t('Цены и оплата', 'Pricing and payment', 'Harga dan pembayaran', 'ราคาและการชำระเงิน')}
                </h1>
                <p className="text-lg text-brand-muted max-w-3xl">
                  {t(
                    'Delivery Booster ведёт аккаунты ресторанов на GrabFood, GoFood и LINE MAN под ключ. Одна услуга, одна цена: 10% от выручки доставки, без предоплаты. Ниже: что входит, сколько это стоит в месяц, как выставляется счёт и как его оплатить.',
                    'Delivery Booster runs restaurant accounts on GrabFood, GoFood and LINE MAN end to end. One service, one price: 10% of delivery revenue, no upfront payment. Below: what is included, what it costs per month, how we invoice and how to pay.',
                    'Delivery Booster mengelola akun restoran di GrabFood, GoFood, dan LINE MAN secara menyeluruh. Satu layanan, satu harga: 10% dari omzet delivery, tanpa uang muka. Di bawah ini: apa yang termasuk, berapa biayanya per bulan, bagaimana invoice dibuat, dan cara membayarnya.',
                    'Delivery Booster ดูแลบัญชีร้านอาหารบน GrabFood, GoFood และ LINE MAN แบบครบวงจร บริการเดียว ราคาเดียว: 10% ของยอดขายเดลิเวอรี ไม่มีค่าใช้จ่ายล่วงหน้า ด้านล่างนี้คือสิ่งที่รวมอยู่ ค่าใช้จ่ายต่อเดือน วิธีออกใบแจ้งหนี้ และวิธีชำระเงิน'
                  )}
                </p>
              </motion.div>

              {/* Services */}
              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-4">{t('Услуги: что мы делаем для ресторана', 'Services: what we do for the restaurant', 'Layanan: yang kami kerjakan untuk restoran', 'บริการ: สิ่งที่เราทำให้ร้าน')}</h2>
                <ul className="space-y-3 max-w-3xl">
                  {services.map((x, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Price */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12" id="price">
                <h2 className="text-2xl font-bold mb-4">{t('Цена', 'Price', 'Harga', 'ราคา')}</h2>
                <p className="text-3xl sm:text-4xl font-bold mb-2">
                  {t('10% от выручки доставки', '10% of delivery revenue', '10% dari omzet delivery', '10% ของยอดขายเดลิเวอรี')}
                </p>
                <p className="text-brand-muted mb-6">
                  {t(
                    'Типичный счёт: от 6 500 000 до 13 000 000 IDR в месяц (400-800 USD). Без предоплаты и без платы за подключение. Платите больше только тогда, когда выросла выручка.',
                    'Typical invoice: from IDR 6,500,000 to 13,000,000 per month (USD 400-800). No upfront payment, no setup fee. You pay more only when revenue has grown.',
                    'Invoice umumnya: mulai Rp6.500.000 hingga Rp13.000.000 per bulan (USD 400-800). Tanpa uang muka, tanpa biaya pemasangan. Anda membayar lebih hanya ketika omzet sudah naik.',
                    'ใบแจ้งหนี้โดยทั่วไป: ตั้งแต่ 6,500,000 ถึง 13,000,000 IDR ต่อเดือน (400-800 USD) ไม่มีค่าใช้จ่ายล่วงหน้า ไม่มีค่าติดตั้ง จ่ายเพิ่มก็ต่อเมื่อยอดขายโตขึ้นเท่านั้น'
                  )}
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  {[
                    [t('Предоплата', 'Upfront payment', 'Uang muka', 'ค่าใช้จ่ายล่วงหน้า'), t('нет', 'none', 'tidak ada', 'ไม่มี')],
                    [t('Плата за подключение', 'Setup fee', 'Biaya pemasangan', 'ค่าติดตั้ง'), t('нет', 'none', 'tidak ada', 'ไม่มี')],
                    [t('Гарантия', 'Guarantee', 'Garansi', 'การรับประกัน'), t('целевые продажи за 6 месяцев или возврат комиссии', 'target sales in 6 months or commission refund', 'target penjualan dalam 6 bulan atau komisi dikembalikan', 'ทำยอดขายไม่ถึงเป้าใน 6 เดือน คืนค่าคอมมิชชัน')],
                  ].map(([k, v]) => (
                    <div key={k} className="border border-white/10 rounded-xl p-4">
                      <div className="text-brand-muted mb-1">{k}</div>
                      <div className="font-medium">{v}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* How to pay */}
              <motion.div {...fadeIn} className="mt-12" id="how-to-pay">
                <h2 className="text-2xl font-bold mb-4">{t('Как оплатить', 'How to pay', 'Cara membayar', 'วิธีชำระเงิน')}</h2>
                <ul className="space-y-3 max-w-3xl">
                  {payment.map((x, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={messengerUrl(language, 'pricing')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block brand-gradient text-white px-6 py-3 rounded-lg font-semibold mt-6"
                  data-testid="button-pricing-page-cta"
                  data-slot="pricing"
                >
                  {t('Получить инвойс или задать вопрос', 'Request an invoice or ask a question', 'Minta invoice atau tanya', 'ขอใบแจ้งหนี้หรือสอบถาม')}
                </a>
              </motion.div>

              {/* Company details */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12" id="company">
                <h2 className="text-2xl font-bold mb-4">{t('Реквизиты и контакты', 'Company details and contacts', 'Data perusahaan dan kontak', 'ข้อมูลบริษัทและการติดต่อ')}</h2>
                <div className="space-y-3">
                  {[
                    [t('Юридическое лицо', 'Legal entity', 'Badan hukum', 'นิติบุคคล'), COMPANY.legalName],
                    [t('Адрес', 'Address', 'Alamat', 'ที่อยู่'), COMPANY.address],
                    [t('Телефон', 'Phone', 'Telepon', 'โทรศัพท์'), COMPANY.phone],
                    ['WhatsApp', WHATSAPP_DISPLAY],
                    [t('Сайт', 'Website', 'Situs web', 'เว็บไซต์'), 'https://booster.delivery'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-white/10 pb-3">
                      <span className="text-brand-muted">{k}</span>
                      <span className="font-medium sm:text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
