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
              href="https://t.me/DeliveryBoosterBot"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-all duration-300"
              data-testid="link-header-bot"
            >
              {t("Чат-бот Delivery Booster", "Delivery Booster Chat-bot")}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
