import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../hooks/useLanguage';

export const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3" data-testid="brand-logo">
            <div className="w-9 h-9 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <span className="text-xl font-bold text-brand-text">Delivery Booster</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href={t("https://t.me/delivery_booster", "https://wa.me/79520029077")}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient text-white px-4 py-2 rounded-lg text-sm font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
              data-testid="link-header-audit"
            >
              {t("Написать", "Contact us")}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
