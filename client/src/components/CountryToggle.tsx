import { useLocation } from 'wouter';
import { useCountry, saveCountryPreference, Country } from '../hooks/useCountry';

export const CountryToggle = () => {
  const country = useCountry();
  const [, setLocation] = useLocation();

  const switchTo = (target: Country) => {
    if (target === country) return;
    saveCountryPreference(target);
    setLocation(target === 'th' ? '/th' : '/');
    window.scrollTo(0, 0);
  };

  const baseClass =
    'px-2.5 py-1.5 text-sm border border-white/20 rounded-lg transition-all duration-300';
  const activeClass = 'brand-gradient text-white brand-shadow border-transparent';
  const inactiveClass = 'text-brand-muted hover:bg-white/10';

  return (
    <div className="flex space-x-2">
      <button
        data-testid="button-country-id"
        onClick={() => switchTo('id')}
        className={`${baseClass} ${country === 'id' ? activeClass : inactiveClass}`}
        aria-label="Bali, Indonesia"
        title="Bali, Indonesia"
      >
        🇮🇩
      </button>
      <button
        data-testid="button-country-th"
        onClick={() => switchTo('th')}
        className={`${baseClass} ${country === 'th' ? activeClass : inactiveClass}`}
        aria-label="Phuket, Thailand"
        title="Phuket, Thailand"
      >
        🇹🇭
      </button>
    </div>
  );
};
