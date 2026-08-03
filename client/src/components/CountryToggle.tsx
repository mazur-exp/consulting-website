import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { useCountry, saveCountryPreference } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { COUNTRY_LIST, CountryCode, pathForCountry } from '../config/countries';

export const CountryToggle = () => {
  const current = useCountry();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const switchTo = (target: CountryCode) => {
    setOpen(false);
    if (target === current.code) return;
    saveCountryPreference(target);
    setLocation(pathForCountry(target));
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="button-country-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm border border-white/20 rounded-lg text-brand-muted hover:bg-white/10 transition-all duration-300"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{t(current.nameRu, current.nameEn)}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          data-testid="menu-country-list"
          className="absolute right-0 mt-2 w-56 glass-card border border-white/15 rounded-xl p-1.5 shadow-2xl bg-brand-bg/95 backdrop-blur-lg z-50"
        >
          {COUNTRY_LIST.map((c) => (
            <button
              key={c.code}
              role="option"
              aria-selected={c.code === current.code}
              onClick={() => switchTo(c.code)}
              data-testid={`button-country-${c.code}`}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors duration-200 ${
                c.code === current.code
                  ? 'bg-brand-green/20 text-brand-green'
                  : 'text-brand-text hover:bg-white/10'
              }`}
            >
              <span className="text-base leading-none">{c.flag}</span>
              <span className="flex-1">{t(c.nameRu, c.nameEn)}</span>
              <span className="text-xs text-brand-muted">{c.platformsShort}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
