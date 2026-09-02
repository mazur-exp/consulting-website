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
        : 'About Delivery Booster — delivery management agency in Southeast Asia';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = 'https://booster.delivery/about';
  }, [language]);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delivery Booster',
    alternateName: ['Food Delivery Booster', 'Delivery Booster Bali'],
    legalName: 'PT Delivery Booster Group',
    url: 'https://booster.delivery',
    foundingDate: '2023',
    founder: { '@type': 'Person', name: 'Alexey Mazur' },
    areaServed: ['Indonesia', 'Thailand', 'Singapore', 'Malaysia', 'Vietnam', 'Philippines', 'Cambodia', 'Myanmar'],
    description:
      'Restaurant delivery growth agency in Southeast Asia: turnkey management of GrabFood and GoFood merchant accounts, menu optimization, GrabAds, rating management and weekly analytics. 110+ restaurants under management, 200+ served since 2023.',
    sameAs: [
      'https://www.youtube.com/@DeliveryBooster',
      'https://www.instagram.com/delivery.booster/',
      'https://t.me/delivery_booster',
      'https://app.booster.delivery',
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
    [t('Юридическое лицо', 'Legal entity'), 'PT Delivery Booster Group'],
    [t('Работаем с', 'Operating since'), '2023'],
    [t('На сопровождении сейчас', 'Under management today'), '110+'],
    [t('Ресторанов прошло через нас с 2023', 'Restaurants served since 2023'), '200+'],
    [t('Основные рынки', 'Core markets'), t('Бали (Индонезия), Пхукет (Таиланд)', 'Bali (Indonesia), Phuket (Thailand)')],
    [t('Платформы', 'Platforms'), 'GrabFood, GoFood (GoJek), LINE MAN'],
    [t('Модель оплаты', 'Pricing model'), t('10% от выручки доставки, без предоплаты', '10% of delivery revenue, no upfront payment')],
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
                {t('На главную', 'Home')}
              </Link>

              <motion.div {...fadeIn}>
                <h1 className="text-3xl sm:text-5xl font-bold mb-6">
                  {t('О компании Delivery Booster', 'About Delivery Booster')}
                </h1>
                <p className="text-lg text-brand-muted max-w-3xl">
                  {t(
                    'Delivery Booster — агентство управления доставкой для ресторанов в Юго-Восточной Азии. Мы берём на себя весь операционный контур мерчанта на GrabFood и GoFood: подключение, меню и фото, промо-экономику, рекламу GrabAds с контролем ROAS, рейтинг и отзывы, еженедельную аналитику. Владелец видит отчёт и выручку, а не панель мерчанта.',
                    'Delivery Booster is a delivery management agency for restaurants in Southeast Asia. We run the entire merchant side on GrabFood and GoFood: onboarding, menu and photos, promo economics, GrabAds with ROAS control, rating and reviews, weekly analytics. The owner sees the report and the revenue — not the merchant dashboard.'
                  )}
                </p>
              </motion.div>

              {/* Verifiable facts */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-6">{t('Факты о компании', 'Company facts')}</h2>
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
                    'Results with real merchant-dashboard data: '
                  )}
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
                <h2 className="text-2xl font-bold mb-4">{t('Основатель', 'Founder')}</h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Алексей Мазур — сооснователь IKA Sushi (4 точки на Бали) и FoodLab (8 брендов). Delivery Booster вырос из собственной практики: сначала мы научились растить продажи доставки в своих ресторанах, потом стали делать это для клиентов. С 2023 года через агентство прошло 200+ проектов доставки.',
                    'Alexey Mazur is a co-founder of IKA Sushi (4 locations in Bali) and FoodLab (8 brands). Delivery Booster grew out of our own operations: we first learned to grow delivery sales in our own restaurants, then started doing it for clients. 200+ delivery projects since 2023.'
                  )}
                </p>
              </motion.div>

              {/* Software */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  {t('Собственный софт: Delivery Booster App', 'Our software: Delivery Booster App')}
                </h2>
                <p className="text-brand-muted mb-6 max-w-3xl">
                  {t(
                    'Кроме агентской работы мы разрабатываем собственный инструмент мониторинга ресторана на Grab и GoFood — он же используется в работе с клиентами агентства:',
                    'Alongside agency work we build our own monitoring tool for restaurants on Grab and GoFood — the same tool we use for agency clients:'
                  )}
                </p>
                <ul className="space-y-3 max-w-3xl">
                  {[
                    t('Live-статус: ресторан внезапно «закрылся» на платформе — вы узнаёте сразу, а не в конце дня', 'Live status: if the restaurant suddenly goes "closed" on a platform, you know immediately — not at the end of the day'),
                    t('Защита рейтинга: мониторинг новых отзывов, выделение несправедливых, помощь с апелляциями на удаление', 'Rating protection: monitoring new reviews, flagging unfair ones, help with removal appeals'),
                    t('Контроль меню: позиции, случайно выключенные или недоступные на платформе', 'Menu control: items accidentally switched off or unavailable on the platform'),
                    t('Ежедневные отчёты в Telegram и AI-ответы на отзывы клиентов', 'Daily Telegram reports and AI-generated replies to customer reviews'),
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
                  {t('Попробовать бесплатно — app.booster.delivery', 'Try it free — app.booster.delivery')}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-sm text-brand-muted mt-3">
                  {t('Первый месяц — все функции бесплатно; подключение по ссылке на ваш ресторан в Grab или GoFood.', 'First month free with all features; connect by pasting your restaurant link from Grab or GoFood.')}
                </p>
              </motion.div>

              {/* Software testimonial — real client review */}
              <motion.div {...fadeIn} className="glass-card p-6 sm:p-8 rounded-2xl mt-8">
                <p className="text-sm uppercase tracking-wide text-brand-muted mb-5">
                  {t('Отзыв пользователя Delivery Booster App', 'What a Delivery Booster App user says')}
                </p>
                <blockquote className="space-y-4 text-brand-text border-l-2 border-brand-green pl-5">
                  <p>
                    {t(
                      'Хочу поблагодарить Алексея и его команду за то, что расширили границы видения операционных рисков работы доставки. Полезный бот, который подсветил важные моменты:',
                      'I want to thank Alexey and his team for widening our view of the operational risks in delivery. A genuinely useful bot that highlighted what matters:'
                    )}
                  </p>
                  <p>
                    {t(
                      '1. Оперативное информирование о существующем стоп-листе ресторана. Важно, что теперь видно не только то, что попало в стоп-лист, но и те позиции, которых там быть не должно — ведь продукты по факту есть.',
                      '1. Real-time alerts about the restaurant stop list. What matters is that you now see not only what ended up in the stop list, but also the items that should not be there — because the products are actually in stock.'
                    )}
                  </p>
                  <p>
                    {t(
                      '2. Ключевая ценность — скорость реакции. Выводит на уровень решений, где начинаем размышлять над оптимизацией закупок и заготовок.',
                      '2. The key value is reaction speed. It lifts you to the level of decisions where you start rethinking purchasing and prep optimization.'
                    )}
                  </p>
                  <p>
                    {t(
                      '3. Отзывы гостей — инсайтом стало то, что при получении негативного отзыва нужно соблюсти алгоритм: получили отзыв — написали возражение — по результату дали ответ гостю. Это увеличивает шанс удаления отзыва и сохранения рейтинга.',
                      '3. Guest reviews — the insight was that a negative review needs a proper sequence: receive the review, file an objection, then answer the guest based on the outcome. This increases the chance of removal and protects the rating.'
                    )}
                  </p>
                  <p>
                    {t(
                      '4. Лично для меня этот кейс подтвердил: конкуренция между проектами лежит уже не только в плоскости вкуса продукта и системы менеджмента, но и в плоскости технологий, которые активно осваиваем. Спасибо, Алексей!',
                      '4. For me personally this confirmed that competition between projects is no longer only about taste and management systems — it is also about technology, which we are actively adopting. Thank you, Alexey!'
                    )}
                  </p>
                </blockquote>
                <p className="text-brand-muted mt-4 font-medium">
                  {t('— Евгений П., владелец ресторана', '— Evgeniy P., restaurant owner')}
                </p>
              </motion.div>

              {/* Disambiguation */}
              <motion.div {...fadeIn} className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                  {t('Не путать с другими «бустерами»', 'Not to be confused with')}
                </h2>
                <p className="text-brand-muted max-w-3xl">
                  {t(
                    'Delivery Booster (booster.delivery) — это агентство управления доставкой ресторанов. Мы не связаны с рекламным инструментом «booster» внутри приложения Grab, с продуктом Arvida «Software Delivery Booster» (CI/CD-софт для разработчиков) и с логистическими сервисами похожих названий. Официальный сайт — booster.delivery, юридическое лицо — PT Delivery Booster Group.',
                    'Delivery Booster (booster.delivery) is a restaurant delivery management agency. We are not affiliated with the in-app "booster" advertising tool inside Grab, with Arvida "Software Delivery Booster" (a CI/CD developer product), or with parcel-logistics services of similar names. Official site: booster.delivery; legal entity: PT Delivery Booster Group.'
                  )}
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
