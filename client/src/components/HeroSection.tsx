import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const HeroSection = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInUpDelayed = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-8" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              {t(
                "Рост заказов на Grab/Gojek без удара по марже",
                "Grow Grab/Gojek orders without killing your margin"
              )}
            </h1>
            
            <p className="text-xl text-brand-muted leading-relaxed" data-testid="text-hero-subtitle">
              {t(
                "Прокачиваем карточки, меню, промо/рекламу и рейтинг в сервисах доставки.",
                "We fix cards, menu, promos/ads and ratings in delivery services."
              )}
              <br />
              {t("Бали и Таиланд.", "Bali & Thailand.")}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://t.me/delivery_booster"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-primary-cta"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
              >
                {t(
                  "Получить бесплатную диагностику",
                  "Book a free audit"
                )}
              </a>
              
              <a 
                href="https://t.me/DeliveryBoosterBot"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-open-bot"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t(
                  "Чат-бот",
                  "Chat-bot"
                )}
              </a>
              
              <a 
                href="https://t.me/DeliveryBoosterBali"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-telegram-channel"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t(
                  "Канал в Telegram",
                  "Telegram channel"
                )}
              </a>
            </div>
            

          </motion.div>
          
          <motion.div {...fadeInUpDelayed}>
            <div className="glass-card p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                <img 
                  src="/2025-08-18 21.17.30_1755717966950.jpg"
                  alt="Food delivery app interface showcasing menu items"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-1"
                />
                <img 
                  src="/2025-08-18 21.17.17_1755717966951.jpg"
                  alt="Grab delivery driver with mobile app"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-2"
                />
                <img 
                  src="/photo_2025-10-18_17-12-17_1760800401840.jpg"
                  alt="Grab app interface"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-3"
                />
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Food packaging for delivery"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-4"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
