import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Check, X as XIcon } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { CaseStudy } from '../config/case-studies';
import NotFound from '@/pages/not-found';

/** Standalone, indexable case study page: /cases/<slug> */
export default function CasePage({ caseStudy }: { caseStudy: CaseStudy | undefined }) {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (!caseStudy) return;
    document.title =
      language === 'ru'
        ? `Кейс ${caseStudy.nameRu}: ${caseStudy.headlineRu} — Delivery Booster`
        : `Case study ${caseStudy.nameEn}: ${caseStudy.headlineEn} — Delivery Booster`;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://booster.delivery/cases/${caseStudy.slug}`;
  }, [language, caseStudy]);

  if (!caseStudy) return <NotFound />;
  const c = caseStudy;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: language === 'ru' ? `${c.nameRu}: ${c.headlineRu}` : `${c.nameEn}: ${c.headlineEn}`,
    about: { '@type': 'Restaurant', name: c.nameEn, address: c.locationEn },
    author: { '@type': 'Organization', name: 'Delivery Booster', url: 'https://booster.delivery' },
    publisher: { '@type': 'Organization', name: 'Delivery Booster' },
    url: `https://booster.delivery/cases/${c.slug}`,
    image: c.images.map((i) => `https://booster.delivery${i.src}`),
  };

  return (
    <CountryProvider country="th">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10">
          {/* Hero */}
          <section className="py-16 sm:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/th"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors mb-8"
                data-testid="link-back"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('Все кейсы', 'All case studies')}
              </Link>

              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-brand-green font-medium mb-3 uppercase tracking-wide text-sm">
                  {t('Кейс · GrabFood ·', 'Case study · GrabFood ·')} {t(c.locationRu, c.locationEn)}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" data-testid="text-case-title">
                  {t(c.nameRu, c.nameEn)}: {t(c.headlineRu, c.headlineEn)}
                </h1>
                <p className="text-brand-muted text-lg mb-8">{t(c.periodRu, c.periodEn)}</p>

                <div className="grid grid-cols-3 gap-4 max-w-xl">
                  {c.heroStats.map((s, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-brand-green">{s.value}</p>
                      <p className="text-sm text-brand-muted mt-1">{t(s.labelRu, s.labelEn)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Situation before */}
          <section className="py-14 border-t border-white/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-4">{t('Ситуация до начала работы', 'The situation before we started')}</h2>
              <p className="text-brand-muted text-lg mb-8 max-w-3xl">{t(c.situationRu, c.situationEn)}</p>
              <ul className="space-y-3 max-w-3xl">
                {(language === 'ru' ? c.problemsRu : c.problemsEn).map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-muted">
                    <XIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* What we did */}
          <section className="py-14 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-10">{t('Что мы сделали — стратегия из 4 направлений', 'What we did — a 4-track strategy')}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {c.work.map((w, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6">
                    <div className="w-9 h-9 brand-gradient rounded-lg flex items-center justify-center text-white font-bold mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-lg mb-4">{t(w.titleRu, w.titleEn)}</h3>
                    <ul className="space-y-2.5">
                      {(language === 'ru' ? w.itemsRu : w.itemsEn).map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-brand-muted">
                          <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="py-14 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-10">{t('Ключевые результаты', 'Key results')}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {c.results.map((r, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 text-center" data-testid={`case-result-${i}`}>
                    <p className="text-3xl sm:text-4xl font-bold text-brand-green mb-2">{r.value}</p>
                    <p className="text-brand-text font-medium">{t(r.labelRu, r.labelEn)}</p>
                    {r.subRu && <p className="text-sm text-brand-muted mt-1">{t(r.subRu, r.subEn || r.subRu)}</p>}
                  </div>
                ))}
              </div>

              {/* Before / after table */}
              <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[560px]">
                  <thead>
                    <tr className="border-b border-white/10 text-sm text-brand-muted">
                      <th className="px-6 py-4 font-medium">{t('Показатель', 'Metric')}</th>
                      <th className="px-6 py-4 font-medium">{t('До', 'Before')}</th>
                      <th className="px-6 py-4 font-medium">{t('После', 'After')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.beforeAfter.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-6 py-3.5 text-brand-text">{t(row.metricRu, row.metricEn)}</td>
                        <td className="px-6 py-3.5 text-red-400">{row.before}</td>
                        <td className="px-6 py-3.5 text-brand-green font-semibold">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Screenshots */}
          <section className="py-14 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">{t('Данные из GrabFood', 'The GrabFood data')}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {c.images.map((img, i) => (
                  <div key={i} className="glass-card rounded-2xl p-3">
                    <img src={img.src} alt={img.alt} className="w-full rounded-xl" loading="lazy" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-brand-muted mt-4">
                {t('Данные реального клиента из GrabMerchant.', 'Real client data from GrabMerchant.')}
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="glass-card p-8 md:p-12 rounded-3xl">
                <h2 className="text-3xl font-bold mb-4">
                  {t('Хотите такой же рост вашего ресторана?', 'Want the same growth for your restaurant?')}
                </h2>
                <p className="text-brand-muted text-lg mb-8">
                  {t(
                    `Мы сделали это для ${c.nameRu}. Сделаем и для вас — бесплатная диагностика профиля за 24 часа.`,
                    `We did it for ${c.nameEn}. We'll do it for you — free profile audit within 24 hours.`
                  )}
                </p>
                <a
                  href={t('https://t.me/delivery_booster', 'https://wa.me/79520029077')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-gradient text-white px-8 py-4 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105 text-lg inline-block"
                  data-testid="button-case-cta"
                >
                  {t('Получить бесплатную диагностику', 'Book a free audit')}
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
