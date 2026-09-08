import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { Footer } from './Footer';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

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
 * Shared shell for answer pages (/answers/*, /method): background, header,
 * footer, back link, h1 + lead, and the JSON-LD blocks. Pages supply only
 * their content, so every answer page stays structurally identical — the same
 * rule country pages follow.
 */
export const AnswerLayout = ({
  h1,
  lead,
  schemas,
  children,
}: {
  h1: string;
  lead: ReactNode;
  schemas: object[];
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
                {t('На главную', 'Home')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">{h1}</h1>
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

export const articleSchema = ({
  headline,
  url,
  about,
}: {
  headline: string;
  url: string;
  about: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  author: { '@type': 'Organization', name: 'Delivery Booster' },
  publisher: {
    '@type': 'Organization',
    name: 'Delivery Booster',
    legalName: 'PT Delivery Booster Group',
  },
  mainEntityOfPage: url,
  about,
});

/** CTA used at the bottom of every answer page. */
export const AnswerCta = () => {
  const { t } = useLanguage();
  return (
    <Block card>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">
          {t('Проверить свой ресторан', 'Check your own restaurant')}
        </h2>
        <p className="text-brand-muted mb-6 max-w-2xl mx-auto">
          {t(
            'Пришлите ссылку на ресторан в Grab — сделаем бесплатный разбор карточки и покажем, где вы теряете заказы.',
            'Send your restaurant’s Grab link — we’ll run a free audit of your listing and show where you lose orders.'
          )}
        </p>
        <a
          href="https://t.me/delivery_booster"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block brand-gradient px-8 py-3 rounded-lg font-semibold"
          data-testid="cta-telegram"
        >
          {t('Получить бесплатный разбор', 'Get a free audit')}
        </a>
      </div>
    </Block>
  );
};
