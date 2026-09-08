import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { readConsent, writeConsent } from '../lib/analytics';

/**
 * Полоса согласия на куки. Гейтит ТОЛЬКО Google Analytics: Umami кук не ставит,
 * поэтому базовая статистика по источникам собирается в любом случае и отказ
 * её не ломает. Отсюда и формулировка — мы не пугаем «мы используем куки», а
 * говорим, что именно включается по согласию.
 *
 * Показывается один раз: выбор лежит в localStorage. Пока выбора нет, GA4
 * работает в режиме Consent Mode v2 с запрещённым хранилищем — то есть тег
 * на странице есть (иначе Google не подтвердит владение сайтом), а кук нет.
 */
export const ConsentBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Решение принимаем после монтирования: на сервере localStorage нет, а в
    // пререндер-снимке баннер оказаться не должен — бот увидел бы его текст
    // как часть страницы.
    if (readConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (value: 'granted' | 'denied') => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-[#0B140D]/95 backdrop-blur"
      role="region"
      aria-label={t('Согласие на аналитику', 'Analytics consent', 'Persetujuan analitik')}
      data-testid="consent-banner"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-xs sm:text-sm text-brand-muted flex-1">
          {t(
            'Мы считаем визиты, чтобы понимать, откуда к нам приходят. Базовая аналитика работает без кук. Google Analytics включаем только с вашего согласия.',
            'We count visits to understand where people find us. Our basic analytics works without cookies. Google Analytics runs only if you agree.',
            'Kami menghitung kunjungan untuk tahu dari mana pengunjung datang. Analitik dasar berjalan tanpa cookie. Google Analytics hanya aktif jika Anda setuju.'
          )}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide('denied')}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm border border-white/15 text-brand-muted hover:text-white hover:border-white/30 transition-colors"
            data-testid="consent-deny"
          >
            {t('Только необходимые', 'Essential only', 'Hanya yang penting')}
          </button>
          <button
            onClick={() => decide('granted')}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm brand-gradient font-medium"
            data-testid="consent-accept"
          >
            {t('Принять', 'Accept', 'Terima')}
          </button>
        </div>
      </div>
    </div>
  );
};
