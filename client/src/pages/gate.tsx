import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { LanguageToggle } from '../components/LanguageToggle';
import { getSavedCountry, saveCountryPreference } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { COUNTRY_LIST, CountryCode, countryFromGeo, pathForCountry } from '../config/countries';

/**
 * Landing gate at "/".
 * 1. Saved preference → instant redirect to that country page.
 * 2. Geo-IP: known Grab market → its page.
 * 3. Unknown / failed → country picker.
 */
export default function Gate() {
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster — Рост продаж ресторанов на Grab и Gojek в Юго-Восточной Азии'
        : 'Delivery Booster — Grab & Gojek Sales Growth for Restaurants in Southeast Asia';
  }, [language]);

  useEffect(() => {
    const go = (country: CountryCode) => {
      setLocation(pathForCountry(country), { replace: true });
    };

    const saved = getSavedCountry();
    if (saved) {
      go(saved);
      return;
    }

    let cancelled = false;
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setShowPicker(true);
    }, 2500);

    const detect = async () => {
      try {
        const res = await fetch('https://api.country.is/');
        const data = await res.json();
        if (cancelled) return;
        clearTimeout(fallbackTimer);
        const match = countryFromGeo(String(data?.country || ''));
        if (match) {
          saveCountryPreference(match);
          go(match);
        } else {
          setShowPicker(true);
        }
      } catch {
        if (!cancelled) {
          clearTimeout(fallbackTimer);
          setShowPicker(true);
        }
      }
    };
    detect();

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [setLocation]);

  const choose = (country: CountryCode) => {
    saveCountryPreference(country);
    setLocation(pathForCountry(country));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-hidden relative">
      <AnimatedBackground />

      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        {!showPicker ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            data-testid="gate-loading"
          >
            <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">DB</span>
            </div>
            <p className="text-2xl font-bold mb-3">Delivery Booster</p>
            <div className="w-8 h-8 border-2 border-white/20 border-t-brand-green rounded-full animate-spin mx-auto" />
          </motion.div>
        ) : (
          <motion.div
            className="solid-panel rounded-3xl p-6 sm:p-10 max-w-3xl w-full text-center shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            data-testid="gate-picker"
          >
            <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-5">
              <span className="text-white font-bold text-xl">DB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Delivery Booster</h1>
            <p className="text-brand-muted mb-1.5 text-lg">
              {t('Где находится ваш ресторан?', 'Where is your restaurant located?')}
            </p>
            <p className="text-brand-muted mb-8 text-sm">
              {t(
                'Покажем кейсы и условия для вашего региона',
                "We'll show case studies and terms for your region"
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {COUNTRY_LIST.map((c, index) => (
                <motion.a
                  key={c.code}
                  href={pathForCountry(c.code)}
                  onClick={(e) => {
                    e.preventDefault();
                    choose(c.code);
                  }}
                  data-testid={`button-choose-${c.code}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="glass-card border border-white/20 rounded-2xl p-4 sm:p-5 hover:bg-white/10 hover:border-brand-green/50 transition-all duration-300 group"
                >
                  <span className="block text-3xl sm:text-4xl mb-2">{c.flag}</span>
                  <span className="block font-semibold text-sm sm:text-base group-hover:text-brand-green transition-colors leading-tight">
                    {t(c.nameRu, c.nameEn)}
                  </span>
                  <span className="block text-xs text-brand-muted mt-1">
                    {c.platformsShort.replace('/', ' · ')}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Crawler-visible content: the gate must never be a dead end for search/AI bots.
          Real <a href> links so engines can reach cases and markets from "/". */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 pb-12 text-sm">
        <h2 className="text-brand-muted font-semibold mb-3 text-center">
          {t('Кейсы с реальными цифрами мерчант-кабинетов', 'Case studies with real merchant-dashboard numbers')}
        </h2>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-brand-muted">
          <li><a className="hover:text-brand-green transition-colors" href="/cases/love-u-pizza">Love U Pizza (Bali) — x21</a></li>
          <li><a className="hover:text-brand-green transition-colors" href="/cases/enjoy-healthy-food">Enjoy Healthy Food (Phuket) — x9.4</a></li>
          <li><a className="hover:text-brand-green transition-colors" href="/cases/ussr-phuket">USSR Phuket — x3.9</a></li>
          <li><a className="hover:text-brand-green transition-colors" href="/cases/zaytun-ubud">Zaytun (Ubud) — x2.6</a></li>
          <li><a className="hover:text-brand-green transition-colors" href="/cases/etna-phuket">Etna (Phuket) — +87%</a></li>
          <li><a className="hover:text-brand-green transition-colors" href="/cases/meat-point-phuket">Meat Point (Phuket) — +46%</a></li>
        </ul>
        <p className="text-brand-muted text-center mt-4 max-w-2xl mx-auto">
          {t(
            'Delivery Booster — агентство управления доставкой: ведём GrabFood и GoFood за ресторан — меню, реклама GrabAds, рейтинг, еженедельная аналитика. Сейчас на сопровождении 110+ ресторанов, всего через агентство прошло 200+ с 2023 года.',
            'Delivery Booster is a delivery management agency: we run GrabFood and GoFood for restaurants — menu, GrabAds, rating, weekly analytics. 110+ restaurants under management today, 200+ served since 2023.'
          )}{' '}
          <a className="text-brand-green hover:underline" href="/about">
            {t('О компании', 'About the company')}
          </a>
        </p>
      </section>
    </div>
  );
}
