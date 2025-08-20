import { useLanguage } from '../hooks/useLanguage';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <button
        data-testid="button-lang-ru"
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1.5 text-sm border border-white/20 rounded-lg transition-all duration-300 ${
          language === 'ru'
            ? 'brand-gradient text-white brand-shadow border-transparent'
            : 'text-brand-muted hover:bg-white/10'
        }`}
      >
        RU
      </button>
      <button
        data-testid="button-lang-en"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-sm border border-white/20 rounded-lg transition-all duration-300 ${
          language === 'en'
            ? 'brand-gradient text-white brand-shadow border-transparent'
            : 'text-brand-muted hover:bg-white/10'
        }`}
      >
        EN
      </button>
    </div>
  );
};
