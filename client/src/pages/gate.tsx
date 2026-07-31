import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { LanguageToggle } from '../components/LanguageToggle';
import { getSavedCountry, saveCountryPreference, Country } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Landing gate at "/".
 * 1. Saved preference → instant redirect to /id or /th.
 * 2. Geo-IP detection: TH → /th, ID → /id.
 * 3. Unknown / failed → country picker.
 */
export default function Gate() {
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster — Рост продаж ресторанов на платформах доставки'
        : 'Delivery Booster — Delivery Sales Growth for Restaurants';
  }, [language]);

  useEffect(() => {
    const go = (country: Country) => {
      setLocation(country === 'th' ? '/th' : '/id', { replace: true });
    };

    const saved = getSavedCountry();
    if (saved) {
      go(saved);
      return;
    }

    let cancelled = false;
    // If geo API hangs — show the picker
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setShowPicker(true);
    }, 2500);

    const detect = async () => {
      try {
        const res = await fetch('https://api.country.is/');
        const data = await res.json();
        if (cancelled) return;
        clearTimeout(fallbackTimer);
        const cc = String(data?.country || '').toUpperCase();
        if (cc === 'TH') {
          saveCountryPreference('th');
          go('th');
        } else if (cc === 'ID') {
          saveCountryPreference('id');
          go('id');
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

  const choose = (country: Country) => {
    saveCountryPreference(country);
    setLocation(country === 'th' ? '/th' : '/id');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-hidden relative">
      <AnimatedBackground />

      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
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
            className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border border-white/15"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            data-testid="gate-picker"
          >
            <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">DB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Delivery Booster</h1>
            <p className="text-brand-muted mb-2 text-lg">
              {t('Где находится ваш ресторан?', 'Where is your restaurant located?')}
            </p>
            <p className="text-brand-muted mb-8 text-sm">
              {t(
                'Покажем кейсы и условия для вашего региона',
                "We'll show case studies and terms for your region"
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => choose('id')}
                data-testid="button-choose-indonesia"
                className="glass-card border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-green/50 transition-all duration-300 group"
              >
                <span className="block text-5xl mb-3">🇮🇩</span>
                <span className="block font-semibold text-lg group-hover:text-brand-green transition-colors">
                  {t('Бали, Индонезия', 'Bali, Indonesia')}
                </span>
                <span className="block text-sm text-brand-muted mt-1">Gojek · Grab</span>
              </button>
              <button
                onClick={() => choose('th')}
                data-testid="button-choose-thailand"
                className="glass-card border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-green/50 transition-all duration-300 group"
              >
                <span className="block text-5xl mb-3">🇹🇭</span>
                <span className="block font-semibold text-lg group-hover:text-brand-green transition-colors">
                  {t('Пхукет, Таиланд', 'Phuket, Thailand')}
                </span>
                <span className="block text-sm text-brand-muted mt-1">Grab</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
