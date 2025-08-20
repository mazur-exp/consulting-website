import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="glass-card p-8 md:p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-cta-title">
            {t("Готовы увеличить заказы?", "Ready to increase orders?")}
          </h2>
          <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
            {t(
              "Получите бесплатный аудит вашего профиля и узнайте, как увеличить доходы на 40-200%",
              "Get a free profile audit and learn how to increase revenue by 40-200%"
            )}
          </p>
          <a 
            href="https://t.me/DeliveryBoosterBali"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-cta-main"
            className="brand-gradient text-white px-8 py-4 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105 text-lg inline-block"
          >
            {t("Заказать аудит бесплатно", "Book Free Audit")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
