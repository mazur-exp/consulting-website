import { useLanguage } from '../hooks/useLanguage';

const OPTIONS = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
] as const;

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      {OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          data-testid={`button-lang-${code}`}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1.5 text-sm border border-white/20 rounded-lg transition-all duration-300 ${
            language === code
              ? 'brand-gradient text-white brand-shadow border-transparent'
              : 'text-brand-muted hover:bg-white/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
