import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const WorkProcessSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
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

  const steps = [
    {
      number: 1,
      title: {
        ru: "Вводная консультация",
        en: "Intro call"
      },
      description: {
        ru: "Экспресс-диагностика профиля Grab/Go и приоритеты на 30 дней.",
        en: "Quick Grab/Go profile check and 30-day priorities."
      }
    },
    {
      number: 2,
      title: {
        ru: "Индивидуальный план",
        en: "Plan"
      },
      description: {
        ru: "Согласуем цели и объём работ — без типовых «пакетов».",
        en: "Agree on goals and scope — no generic packages."
      }
    },
    {
      number: 3,
      title: {
        ru: "Запуск и спринты",
        en: "Sprints"
      },
      description: {
        ru: "Еженедельные итерации с отчётами и рекомендациями.",
        en: "Weekly iterations with reports and recommendations."
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-process-title">
            {t("Как мы работаем", "How we work")}
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="text-center"
              data-testid={`card-process-${index}`}
            >
              <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {t(step.title.ru, step.title.en)}
              </h3>
              <p className="text-brand-muted">
                {t(step.description.ru, step.description.en)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
