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
                "Рост заказов на Grab/Go без удара по марже",
                "Grow Grab/Go orders without killing your margin"
              )}
            </h1>
            
            <p className="text-xl text-brand-muted leading-relaxed" data-testid="text-hero-subtitle">
              {t(
                "Прокачиваем карточки, меню, промо/Ads и рейтинг. Бали и Таиланд.",
                "We fix cards, menu, promos/Ads and ratings. Bali & Thailand."
              )}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                data-testid="button-primary-cta"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
              >
                {t(
                  "Получить бесплатный аудит",
                  "Book a free audit"
                )}
              </button>
              
              <button 
                data-testid="button-open-bot"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t(
                  "Открыть бота",
                  "Open bot"
                )}
              </button>
              
              <button 
                data-testid="button-telegram-channel"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t(
                  "Канал в Telegram",
                  "Telegram channel"
                )}
              </button>
            </div>
            
            <p className="text-sm text-brand-muted" data-testid="text-bot-notice">
              {t(
                "Материалы в боте доступны после подписки на канал.",
                "Bot materials unlock after channel subscription."
              )}
            </p>
          </motion.div>
          
          <motion.div {...fadeInUpDelayed}>
            <div className="glass-card p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Professional food photography"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-1"
                />
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Mobile food delivery app"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-2"
                />
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Restaurant kitchen preparation"
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
