import { useLanguage } from '../hooks/useLanguage';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0" data-testid="footer-brand">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">DB</span>
            </div>
            <span className="text-lg font-semibold">Delivery Booster</span>
          </div>
          <p className="text-brand-muted text-center md:text-right" data-testid="text-copyright">
            {t(
              "© Delivery Booster. Bali & Thailand.",
              "© Delivery Booster. Bali & Thailand."
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};
