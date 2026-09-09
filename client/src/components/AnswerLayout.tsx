import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { Footer } from './Footer';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { diagnosticUrl, messengerUrl } from '../lib/cta';
import { ANSWER_MATERIALS, ASSET_MATERIALS } from './AnswersIndex';

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

/** Section with the site's glass-card look. */
export const Block = ({
  title,
  card = false,
  children,
}: {
  title?: string;
  card?: boolean;
  children: ReactNode;
}) => (
  <motion.div {...fadeIn} className={card ? 'glass-card p-6 sm:p-8 rounded-2xl mt-12' : 'mt-12'}>
    {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
    {children}
  </motion.div>
);

/**
 * Видимая подпись под заголовком: автор, даты, время чтения.
 *
 * Те же значения уходят в Article-схему. Дублирование намеренное: разметку
 * читает машина, подпись — человек, и Google прямо ожидает, что видимая дата
 * совпадает с датой в разметке. Дата только в разметке — это заявка без
 * подтверждения на странице.
 */
export const ArticleMeta = ({
  datePublished,
  dateModified,
  minutes,
}: {
  datePublished: string;
  dateModified?: string;
  minutes?: number;
}) => {
  const { t, language } = useLanguage();
  const locale = language === 'ru' ? 'ru-RU' : language === 'id' ? 'id-ID' : language === 'th' ? 'th-TH' : 'en-GB';
  const fmt = (d: string) =>
    new Date(d + 'T00:00:00Z').toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  const updated = dateModified && dateModified !== datePublished;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted mb-6">
      <span>
        {t('Автор: ', 'By ', 'Oleh ', 'โดย ')}
        <a href="/about" className="text-brand-text hover:text-brand-green transition-colors">
          Aleksei Mazur
        </a>
        {t(', основатель Delivery Booster', ', founder of Delivery Booster', ', pendiri Delivery Booster', ' ผู้ก่อตั้ง Delivery Booster')}
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={updated ? dateModified : datePublished}>
        {updated
          ? t(`Обновлено ${fmt(dateModified!)}`, `Updated ${fmt(dateModified!)}`, `Diperbarui ${fmt(dateModified!)}`, `อัปเดต ${fmt(dateModified!)}`)
          : t(`Опубликовано ${fmt(datePublished)}`, `Published ${fmt(datePublished)}`, `Dipublikasikan ${fmt(datePublished)}`, `เผยแพร่ ${fmt(datePublished)}`)}
      </time>
      {minutes ? (
        <>
          <span aria-hidden="true">·</span>
          <span>{minutes} {t('мин чтения', 'min read', 'menit baca', 'นาทีในการอ่าน')}</span>
        </>
      ) : null}
    </div>
  );
};

/**
 * Shared shell for answer pages (/answers/*, /method): background, header,
 * footer, back link, h1 + lead, and the JSON-LD blocks. Pages supply only
 * their content, so every answer page stays structurally identical — the same
 * rule country pages follow.
 */
export const AnswerLayout = ({
  h1,
  lead,
  schemas,
  meta,
  children,
}: {
  h1: string;
  lead: ReactNode;
  schemas: object[];
  /** Те же даты, что уходят в Article-схему. Показываются под заголовком. */
  meta?: { datePublished: string; dateModified?: string; minutes?: number };
  children: ReactNode;
}) => {
  const { t } = useLanguage();

  return (
    <CountryProvider country="id">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
                {t('На главную', 'Home', 'Beranda', 'หน้าแรก')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">{h1}</h1>
                {meta ? <ArticleMeta {...meta} /> : null}
                <div className="text-lg text-brand-text max-w-3xl">{lead}</div>
              </motion.div>

              {children}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CountryProvider>
  );
};

/** Answer-first Q&A list, mirrored into FAQPage schema by the page. */
export const FaqList = ({ faq, title }: { faq: Array<[string, string]>; title: string }) => (
  <Block title={title}>
    <div className="space-y-6">
      {faq.map(([q, a]) => (
        <div key={q} className="border-b border-white/10 pb-5">
          <h3 className="font-semibold mb-2">{q}</h3>
          <p className="text-brand-muted">{a}</p>
        </div>
      ))}
    </div>
  </Block>
);

export const faqPageSchema = (faq: Array<[string, string]>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

/** Канонический @id основателя: тот же идентификатор объявлен в SEOSchema.
 *  Ссылка по @id связывает все материалы сайта с одним человеком — это
 *  машиночитаемое авторство, а не строка с названием компании. */
export const AUTHOR_ID = 'https://booster.delivery/#aleksei-mazur';

export const articleSchema = ({
  headline,
  url,
  about,
  datePublished,
  dateModified,
  language = 'en',
}: {
  headline: string;
  url: string;
  about: string;
  /** Дата первой публикации страницы. Не менять при правках. */
  datePublished: string;
  /** Дата последней содержательной правки. Обновлять при каждой. */
  dateModified: string;
  language?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  author: { '@id': AUTHOR_ID },
  publisher: {
    '@type': 'Organization',
    name: 'Delivery Booster',
    legalName: 'PT Delivery Booster Group',
    url: 'https://booster.delivery',
  },
  mainEntityOfPage: url,
  about,
  datePublished,
  dateModified,
  inLanguage: language === 'ru' ? 'ru-RU' : language === 'id' ? 'id-ID' : language === 'th' ? 'th-TH' : 'en-US',
  isPartOf: { '@type': 'WebSite', name: 'Delivery Booster', url: 'https://booster.delivery' },
});

/** CTA used at the bottom of every answer page. */
/**
 * Двухдорожечный финал страницы-ответа: сделать самому или отдать нам.
 * Односторонний CTA («отдайте нам») отсекает тех, кто пришёл разобраться, —
 * а именно они чаще всего и есть будущие клиенты. Самостоятельная дорожка у
 * нас сильнее, чем у кого-либо в нише: метод и данные опубликованы целиком
 * и бесплатно, и это же работает на доверие ко второй дорожке.
 */
export const AnswerCta = () => {
  const { t, language } = useLanguage();
  return (
    <Block card>
      <h2 className="text-2xl font-bold mb-2 text-center">
        {t('Два способа двигаться дальше', 'Two ways to go from here', 'Dua cara untuk melanjutkan', 'ไปต่อได้สองทาง')}
      </h2>
      <p className="text-brand-muted mb-8 max-w-2xl mx-auto text-center">
        {t(
          'Оба рабочие. Первый ничего не стоит и не требует нас.',
          'Both work. The first costs nothing and does not require us.',
          'Keduanya berhasil. Yang pertama gratis dan tidak membutuhkan kami.'
        , 'ได้ผลทั้งคู่ ทางแรกไม่เสียเงินและไม่ต้องพึ่งเรา')}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-6 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-brand-muted mb-2">
            {t('Сами', 'Do it yourself', 'Sendiri', 'ทำเอง')}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {t('Метод и нормы — открыто и бесплатно',
               'The method and the norms — open and free',
               'Metode dan norma — terbuka dan gratis', 'วิธีการและตัวเลขมาตรฐาน — เปิดเผยและฟรี')}
          </h3>
          <p className="text-sm text-brand-muted mb-5 flex-1">
            {t(
              'Пять этапов, по которым мы ведём каждый аккаунт, опубликованы целиком. Рядом — нормы рынка по 96 ресторанам, чтобы было с чем сравнить свои цифры.',
              'The five stages we run on every account, published in full. Alongside them, market norms from 96 restaurants so you have something to compare your numbers against.',
              'Lima tahap yang kami jalankan di setiap akun, dipublikasikan lengkap. Di sampingnya, norma pasar dari 96 restoran sebagai pembanding angka Anda.'
            , 'ห้าขั้นตอนที่เราใช้กับทุกบัญชี เผยแพร่ทั้งหมด พร้อมตัวเลขมาตรฐานจากร้าน 96 แห่ง เพื่อให้คุณมีอะไรเทียบกับตัวเลขของตัวเอง')}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/method" className="text-brand-green hover:underline text-sm font-medium">
              {t('Метод целиком', 'The full method', 'Metode lengkap', 'ดูวิธีการทั้งหมด')} →
            </a>
            <a href="/benchmark" className="text-brand-green hover:underline text-sm font-medium">
              {t('Бенчмарк 2026', 'Benchmark 2026', 'Benchmark 2026', 'Benchmark 2026')} →
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-brand-green/40 bg-brand-green/[0.06] p-6 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-brand-green mb-2">
            {t('С нами', 'With us', 'Bersama kami', 'ให้เราดูแล')}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {t('Разбор вашей карточки', 'An audit of your listing', 'Audit halaman Anda', 'วิเคราะห์หน้าร้านของคุณ')}
          </h3>
          <p className="text-sm text-brand-muted mb-5 flex-1">
            {t(
              'Вставьте ссылку на ресторан в Grab — отчёт придёт за пару минут: меню и поиск, фото по категориям, отзывы, цены против соседей. Бесплатно и без обязательств; дальше 10% от выручки доставки и без предоплаты.',
              'Paste your restaurant’s Grab link and the report comes back in a couple of minutes: menu and search, photo coverage, reviews, prices against the neighbours. Free, no strings; after that it is 10% of delivery revenue with no upfront payment.',
              'Tempel link restoran Anda di Grab dan laporannya datang dalam beberapa menit: menu dan pencarian, kelengkapan foto, ulasan, harga dibanding tetangga. Gratis, tanpa ikatan; setelahnya 10% dari omzet delivery tanpa pembayaran di muka.'
            , 'วางลิงก์ร้านของคุณบน Grab แล้วรับรายงานภายในไม่กี่นาที: เมนูกับการค้นหา ความครบของรูปภาพ รีวิว และราคาเทียบกับร้านข้างเคียง ฟรีและไม่มีข้อผูกมัด หลังจากนั้นคิด 10% ของยอดขายเดลิเวอรี ไม่ต้องจ่ายล่วงหน้า')}
          </p>
          <a
            href={diagnosticUrl('answer-cta', language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block brand-gradient px-6 py-3 rounded-lg font-semibold text-center"
            data-testid="cta-diagnostic"
          >
            {t('Разобрать мою карточку', 'Diagnose my listing', 'Analisa halaman saya', 'วิเคราะห์ร้านของฉัน')}
          </a>
          <a
            href={messengerUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-muted hover:text-brand-green mt-3 text-center"
            data-testid="cta-messenger"
          >
            {t('или напишите нам напрямую', 'or message us directly', 'atau hubungi kami langsung', 'หรือทักหาเราโดยตรง')} →
          </a>
        </div>
      </div>
    </Block>
  );
};

/**
 * «Читайте дальше» — плотная перелинковка внутри кластера. Берёт материалы из
 * общего реестра и показывает все, кроме текущего. Смысл не в удобстве, а в
 * том, что краулер с любой страницы кластера достаёт остальные за один переход,
 * а каждая страница получает вес от всех соседних.
 */
export const KeepReading = ({ currentHref }: { currentHref: string }) => {
  const { t } = useLanguage();
  const items = [...ANSWER_MATERIALS, ...ASSET_MATERIALS].filter((m) => m.href !== currentHref);
  return (
    <Block title={t('Читайте дальше', 'Keep reading', 'Baca juga', 'อ่านต่อ')}>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((m) => (
          <a
            key={m.href}
            href={m.href}
            className="text-brand-green hover:underline text-sm"
            data-testid={`keep-reading-${m.href}`}
          >
            {t(m.titleRu, m.titleEn, m.titleId, m.titleTh)}
          </a>
        ))}
      </div>
    </Block>
  );
};


/**
 * Mirror the page's title / description / canonical into the Open Graph and
 * Twitter meta tags. Without this every route inherits index.html's tags, so
 * og:url points at the homepage on every page — which makes LinkedIn, Slack,
 * WhatsApp and Telegram render the wrong preview (or refuse to make one).
 * Call at the END of a page's own useEffect, after title/canonical are set.
 */
export const syncOpenGraph = () => {
  const title = document.title;
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content;
  const set = (selector: string, value?: string) => {
    if (!value) return;
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) el.content = value;
  };
  set('meta[property="og:title"]', title);
  set('meta[name="twitter:title"]', title);
  set('meta[property="og:url"]', canonical);
  set('meta[property="og:description"]', description);
  set('meta[name="twitter:description"]', description);
};
