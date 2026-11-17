import { useEffect, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { Header } from './Header';
import { Footer } from './Footer';
import { syncOpenGraph } from './AnswerLayout';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

export interface LegalSection {
  heading: string;
  body: ReactNode[];
}

interface LegalLayoutProps {
  /** Путь страницы, например '/terms'. Должен быть в EN_ONLY_PATHS (config/company.ts). */
  path: string;
  title: string;
  description: string;
  /** Дата последней правки текста, как она показывается на странице. */
  updated: string;
  sections: LegalSection[];
}

/**
 * Общий каркас юридических страниц (/terms, /refund). Требование платёжного провайдера
 * (Xendit, 16.11.2026): Terms & Conditions и Return & Refund Policy отдельными страницами.
 * Только английский: canonical без ?lang=, hreflang-альтернатов нет (см. useLanguage).
 * Текст берётся из действующего Consulting Services Agreement; цифры конкретного клиента
 * (срок, цель, компенсация) на сайт не выносятся.
 */
export function LegalLayout({ path, title, description, updated, sections }: LegalLayoutProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${title} - Delivery Booster`;
    document.documentElement.lang = 'en';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://booster.delivery${path}`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    syncOpenGraph();
    return () => {
      document.documentElement.lang = language;
    };
  }, [language, path, title, description]);

  return (
    <CountryProvider country="id">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10" lang="en">
          <section className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors mb-8" data-testid="link-back-home">
                <ArrowLeft className="w-4 h-4" />
                {t('На главную', 'Home', 'Ke beranda', 'หน้าแรก')}
              </Link>

              <h1 className="text-3xl sm:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-brand-muted mb-10">Last updated: {updated}</p>

              <div className="space-y-8">
                {sections.map((s, i) => (
                  <section key={s.heading}>
                    <h2 className="text-xl font-bold mb-3">
                      {i + 1}. {s.heading}
                    </h2>
                    <div className="space-y-3 text-brand-muted leading-relaxed">
                      {s.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
