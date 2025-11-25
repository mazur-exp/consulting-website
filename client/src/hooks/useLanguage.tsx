import { createContext, useContext, useState, ReactNode } from 'react';

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

  // Check saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang === 'ru' || savedLang === 'en') {
    return savedLang;
  }

  // Detect browser language
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
