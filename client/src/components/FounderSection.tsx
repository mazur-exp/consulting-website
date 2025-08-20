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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
              alt="Founder of Delivery Booster"
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
              {t("Кто будет вести проект", "Who runs your project")}
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed" data-testid="text-founder-description">
              {t(
                "Опыт работы с ресторанами в ЮВА и платформами Grab/Gojek. Работаем на RU/EN, при необходимости привлекаем ID/TH ассистентов.",
                "Experience with SEA restaurants and Grab/Gojek. Work in RU/EN; ID/TH assistants on request."
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                data-testid="button-founder-audit"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300"
              >
                {t("Записаться на аудит", "Book a free audit")}
              </button>
              <button 
                data-testid="button-founder-bot"
                className="glass-card px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
              >
                {t("Открыть бота", "Open bot")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
