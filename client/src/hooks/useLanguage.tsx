import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ru: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return 'ru'; // Default for SSR
  }

  // Priority 1: Check URL parameter (?lang=en or ?lang=ru)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'ru' || urlLang === 'en') {
    // Save to localStorage and return
    localStorage.setItem('preferredLanguage', urlLang);
    return urlLang;
  }

  // Priority 2: Check saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang === 'ru' || savedLang === 'en') {
    return savedLang;
  }

  // Priority 3: Detect browser language
  const browserLang = navigator.language.toLowerCase();

  // If starts with 'ru' → Russian
  if (browserLang.startsWith('ru')) {
    return 'ru';
  }

  // Otherwise → English
  return 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => detectBrowserLanguage());

  const setLanguageWithSave = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  // NOTE: only <html lang> lives here. document.title is owned by each page
  // (gate/country/case/about/answers): a provider effect runs AFTER its
  // children's effects, so setting the title here silently overwrote every
  // per-page title — including in the prerendered snapshots bots read.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (ru: string, en: string): string => {
    return language === 'ru' ? ru : en;
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
