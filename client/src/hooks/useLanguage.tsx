import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en' | 'id' | 'th';

const LANGS: Language[] = ['ru', 'en', 'id', 'th'];
const isLang = (v: unknown): v is Language => LANGS.includes(v as Language);

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** t(ru, en, id?, th?) — Bahasa and Thai fall back to English until a page is
   *  translated. Adding a language means adding an optional argument, never
   *  touching the 600+ existing call sites. */
  t: (ru: string, en: string, id?: string, th?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ru';

  // Priority 1: URL parameter (?lang=en / ?lang=ru / ?lang=id / ?lang=th)
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (isLang(urlLang)) {
    localStorage.setItem('preferredLanguage', urlLang);
    return urlLang;
  }

  // Priority 2: saved preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (isLang(savedLang)) return savedLang;

  // Priority 3: browser language. 'in' is the legacy ISO code for Indonesian
  // and is still what some Android browsers report.
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('id') || browserLang.startsWith('in')) return 'id';
  if (browserLang.startsWith('th')) return 'th';
  return 'en';
};

/** Language variants live on ?lang=..., so each variant must point its canonical
 *  at itself — otherwise Google folds them into one URL and the Bahasa version
 *  never gets indexed. Pages own their canonical; this normalises the query
 *  suffix afterwards, which works because a provider effect runs AFTER its
 *  children's effects. Same ordering that used to break <title>, used on purpose. */
const syncCanonicalAndAlternates = (language: Language) => {
  const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) return;
  const base = link.href.split('?')[0];
  link.href = language === 'en' ? base : `${base}?lang=${language}`;

  const alternates: Array<[string, string]> = [
    ['en', base],
    ['ru', `${base}?lang=ru`],
    ['id', `${base}?lang=id`],
    ['th', `${base}?lang=th`],
    ['x-default', base],
  ];
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  for (const [hreflang, href] of alternates) {
    const el = document.createElement('link');
    el.rel = 'alternate';
    el.hreflang = hreflang;
    el.href = href;
    document.head.appendChild(el);
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => detectBrowserLanguage());

  const setLanguageWithSave = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  // NOTE: only <html lang>, canonical and hreflang live here. document.title is
  // owned by each page (gate/country/case/about/answers): a provider effect runs
  // AFTER its children's effects, so setting the title here silently overwrote
  // every per-page title — including in the prerendered snapshots bots read.
  useEffect(() => {
    document.documentElement.lang = language;
    syncCanonicalAndAlternates(language);
  }, [language]);

  const t = (ru: string, en: string, id?: string, th?: string): string => {
    if (language === 'ru') return ru;
    if (language === 'id') return id ?? en;
    if (language === 'th') return th ?? en;
    return en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithSave, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
