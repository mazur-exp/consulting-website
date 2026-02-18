import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const FounderSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/photo_2025-09-25_04-24-22_1760798837110.jpg"
              alt="Алексей Мазур - основатель Delivery Booster"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              data-testid="img-founder"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold" data-testid="text-founder-title">
              {t("Алексей Мазур", "Alexey Mazur")}
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed whitespace-pre-line" data-testid="text-founder-description">
              {t(
                "Основатель Delivery Booster.\n\nСооснователь IKA Sushi (4 точки на Бали, оборот более 1,5 млрд рупий в месяц), FoodLab (8 брендов, 2 локации на Бали).\n\nОпыт работы с маркетплейсами - 8 лет команда делала Android приложения (более 3000 приложений было создано), знания в маркетинге и построении бизнесов - за 15 лет было создано 11 успешных бизнесов в разных сферах.\n\nОснователь Delivery Booster, сервиса по увеличению продаж на Gojek и Grab: более 100 клиентов, рост продаж в 2-6 раз за счет настройки и оптимизации услуг доставки.",
                "Founder of Delivery Booster.\n\nCo-founder of IKA Sushi (4 locations in Bali, revenue over 1.5 billion rupees per month), FoodLab (8 brands, 2 locations in Bali).\n\nExperience with marketplaces - 8 years the team made Android applications (more than 3000 applications were created), knowledge in marketing and business building - over 15 years, 11 successful businesses were created in various fields.\n\nFounder of Delivery Booster, a service to increase sales on Gojek and Grab: more than 100 clients, sales growth of 2-6 times through setup and optimization of delivery services."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={t("https://t.me/delivery_booster", "https://wa.me/79520029077")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-founder-audit"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300"
              >
                {t("Записаться на бесплатный аудит", "Book a free audit")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
