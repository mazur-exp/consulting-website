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
            <p className="text-brand-muted text-lg leading-relaxed" data-testid="text-founder-description">
              {t(
                "Совладелец IKA Sushi (3 точки на Бали, оборот более 1млрд рупий в месяц), отвечает за маркетинг, продажи и доставку. Опыт работы с маркетплейсами - 8 лет команда делала Android приложения (более 700 приложений было сделано), знания в маркетинге и построении бизнесов - за 13 лет было создано 9 успешных бизнесов в разных сферах. Основатель Delivery Booster, сервиса по увеличению продаж на Gojek и Grab: более 100 клиентов, рост продаж в 2-6 раз за счет настройки и оптимизации услуг доставки.",
                "Co-owner of IKA Sushi (3 locations in Bali, revenue over 1 billion rupees per month), responsible for marketing, sales and delivery. Experience with marketplaces - 8 years the team made Android applications (more than 700 applications were made), knowledge in marketing and business building - over 13 years, 9 successful businesses were created in various fields. Founder of Delivery Booster, a service to increase sales on Gojek and Grab: more than 100 clients, sales growth of 2-6 times through setup and optimization of delivery services."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://t.me/delivery_booster"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-founder-audit"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300"
              >
                {t("Записаться на аудит", "Book a free audit")}
              </a>
              <a 
                href="https://t.me/DeliveryBoosterBot"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-founder-bot"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t("Чат-бот", "Chat-bot")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
