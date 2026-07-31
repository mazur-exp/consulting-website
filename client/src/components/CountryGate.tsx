import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { getSavedCountry, saveCountryPreference, Country } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Rendered only on the Indonesian (root) page.
 * 1. Saved preference wins: 'th' → redirect to /th, 'id' → stay.
 * 2. Otherwise detect country by IP: TH → /th, ID → stay.
 * 3. Unknown / detection failed → show a country picker modal.
 */
export const CountryGate = () => {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = getSavedCountry();
    if (saved === 'th') {
      setLocation('/th');
      return;
    }
    if (saved === 'id') return;

    let cancelled = false;
    // Fallback: if geo API hangs, ask the user directly
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setShowModal(true);
    }, 4000);

    const detect = async () => {
      try {
        const res = await fetch('https://api.country.is/');
        const data = await res.json();
        if (cancelled) return;
        clearTimeout(fallbackTimer);
        const cc = String(data?.country || '').toUpperCase();
        if (cc === 'TH') {
          saveCountryPreference('th');
          setLocation('/th');
        } else if (cc === 'ID') {
          saveCountryPreference('id');
        } else {
          setShowModal(true);
        }
      } catch {
        if (!cancelled) {
          clearTimeout(fallbackTimer);
          setShowModal(true);
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
    setShowModal(false);
    if (country === 'th') {
      setLocation('/th');
      window.scrollTo(0, 0);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      data-testid="modal-country-select"
    >
      <motion.div
        className="glass-card rounded-3xl p-8 sm:p-10 max-w-md w-full text-center border border-white/15 bg-brand-bg/90"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center mx-auto mb-5">
          <span className="text-white font-bold text-lg">DB</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-brand-text">
          {t('Где находится ваш ресторан?', 'Where is your restaurant located?')}
        </h2>
        <p className="text-brand-muted mb-8">
          {t(
            'Покажем кейсы и условия для вашего региона',
            "We'll show case studies and terms for your region"
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => choose('id')}
            data-testid="button-choose-indonesia"
            className="glass-card border border-white/20 rounded-2xl p-5 hover:bg-white/10 hover:border-brand-green/50 transition-all duration-300 group"
          >
            <span className="block text-4xl mb-3">🇮🇩</span>
            <span className="block font-semibold text-brand-text group-hover:text-brand-green transition-colors">
              {t('Бали, Индонезия', 'Bali, Indonesia')}
            </span>
            <span className="block text-sm text-brand-muted mt-1">Gojek · Grab</span>
          </button>
          <button
            onClick={() => choose('th')}
            data-testid="button-choose-thailand"
            className="glass-card border border-white/20 rounded-2xl p-5 hover:bg-white/10 hover:border-brand-green/50 transition-all duration-300 group"
          >
            <span className="block text-4xl mb-3">🇹🇭</span>
            <span className="block font-semibold text-brand-text group-hover:text-brand-green transition-colors">
              {t('Пхукет, Таиланд', 'Phuket, Thailand')}
            </span>
            <span className="block text-sm text-brand-muted mt-1">Grab</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
