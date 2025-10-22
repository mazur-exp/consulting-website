import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const TargetAudienceSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const audiences = [
    {
      title: "Owner / Оператор",
      description: {
        ru: "Нужно быстро поднять заказы и рейтинг без вечных скидок.",
        en: "Needs quick order and rating lift without endless discounts."
      }
    },
    {
      title: "General Manager", 
      description: {
        ru: "Сократить отмены и задержки, улучшить SLA и качество выполнения заказов.",
        en: "Reduce cancellations and delays, improve SLA and order fulfillment quality."
      }
    },
    {
      title: "Marketing Lead",
      description: {
        ru: "Прогнозируемые промо и Ads, прозрачная отчётность и A/B-тесты.",
        en: "Predictable promos and Ads with transparent reporting & A/B tests."
      }
    },
    {
      title: "Cloud/Ghost Kitchen",
      description: {
        ru: "Больше заказов и узнаваемости в приложениях доставки — без необходимости открывать зал.",
        en: "More orders and visibility in delivery apps – without needing a dining room."
      }
    }
  ];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-audience-title">
            {t("Кому мы помогаем", "Who we help")}
          </h2>
          <p className="text-brand-muted text-lg max-w-3xl mx-auto" data-testid="text-audience-subtitle">
            {t(
              "Чёткие роли и задачи — чтобы говорить на одном языке.",
              "Clear roles and needs – so we speak the same language."
            )}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {audiences.map((audience, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              data-testid={`card-audience-${index}`}
            >
              <div className="inline-block px-3 py-1 bg-brand-green/20 border border-brand-green/40 text-brand-green text-xs rounded-full mb-4 font-medium">
                {audience.title}
              </div>
              <p className="text-brand-muted">
                {t(audience.description.ru, audience.description.en)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
