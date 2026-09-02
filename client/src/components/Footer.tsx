import { useLanguage } from '../hooks/useLanguage';

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/delivery.booster/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@DeliveryBooster' },
  { label: 'Telegram', href: 'https://t.me/delivery_booster' },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3" data-testid="footer-brand">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">DB</span>
            </div>
            <span className="text-lg font-semibold">Delivery Booster</span>
          </div>
          <nav
            className="flex items-center gap-5"
            aria-label="Delivery Booster on social media"
            data-testid="footer-social"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-brand-muted hover:text-white transition-colors text-sm"
              >
                {s.label}
              </a>
            ))}
          </nav>
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
