import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-pricing-title">
            {t("Стоимость - бесплатно*", "Pricing - free*")}
          </h2>

          <p className="text-xl text-brand-text mb-4" data-testid="text-pricing-main">
            {t(
              "10% от выручки GoJek/Grab (среднее $400-800/мес).",
              "10% of GoJek/Grab revenue (average $400-800/month)."
            )}
          </p>

          <p className="text-lg text-brand-muted mb-4" data-testid="text-pricing-benefits">
            {t(
              "Нет рисков. Нет предоплаты. ROI 5-12x.",
              "No risk. No upfront payment. ROI 5-12x."
            )}
          </p>

          <p className="text-sm text-brand-muted italic mb-8" data-testid="text-pricing-footnote">
            {t(
              "* - свяжитесь с нами, чтобы узнать как можно получить услугу абсолютно бесплатно.",
              "* - contact us to learn how you can get the service absolutely free."
            )}
          </p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <a
              href="https://t.me/delivery_booster"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
              data-testid="button-pricing-cta"
            >
              {t("Узнать подробнее", "Learn more")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
