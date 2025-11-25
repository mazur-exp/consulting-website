import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const { t, language } = useLanguage();

  const faqs = [
    {
      q: { ru: "Сколько стоит?", en: "How much does it cost?" },
      a: {
        ru: (
          <>
            Условно бесплатно - узнай в <a href="https://t.me/delivery_booster" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">чате</a> как.
            {'\n'}10% от выручки GoJek/Grab. Среднее $400-800/мес. Нет рисков, нет предоплаты.
          </>
        ),
        en: (
          <>
            Conditionally free - find out how in the <a href="https://t.me/delivery_booster" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:text-brand-green-light underline transition-colors">chat</a>.
            {'\n'}10% of GoJek/Grab revenue. Average $400-800/month. No risk, no upfront payment.
          </>
        )
      }
    },
    {
      q: { ru: "Как быстро результат?", en: "How fast are results?" },
      a: {
        ru: "Первый рост: 2-4 недели. Полная раскачка: 3-6 месяцев. Подтверждено 85+ клиентами.",
        en: "First growth: 2-4 weeks. Full ramp-up: 3-6 months. Confirmed by 85+ clients."
      }
    },
    {
      q: { ru: "Есть гарантия?", en: "Is there a guarantee?" },
      a: {
        ru: "Да. Целевые продажи за 6 месяцев или возврат комиссии.",
        en: "Yes. Target sales in 6 months or commission refund."
      }
    },
    {
      q: { ru: "Что входит?", en: "What's included?" },
      a: {
        ru: "Полное управление GoJek/Grab. Вы тратите 0 часов, получаете отчеты.",
        en: "Full GoJek/Grab management. You spend 0 hours, get reports."
      }
    },
    {
      q: { ru: "Почему не делать самому?", en: "Why not do it yourself?" },
      a: {
        ru: "Можете! Обучение 3-6 мес, ошибки $5-10k. Или платите $600/мес, результат за 3 мес.",
        en: "You can! Learning 3-6 months, mistakes $5-10k. Or pay $600/month, results in 3 months."
      }
    }
  ];

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          data-testid="text-faq-title"
        >
          {t("Вопросы", "Questions")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/10"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-brand-green transition-colors">
                  {typeof faq.q === 'string' ? t(faq.q, faq.q) : (language === 'ru' ? faq.q.ru : faq.q.en)}
                </AccordionTrigger>
                <AccordionContent className="text-brand-muted text-base pt-2 whitespace-pre-line">
                  {typeof faq.a === 'object' && 'ru' in faq.a ? (language === 'ru' ? faq.a.ru : faq.a.en) : faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
