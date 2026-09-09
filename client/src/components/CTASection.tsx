import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { diagnosticUrl } from '../lib/cta';

export const CTASection = () => {
  const { t, language } = useLanguage();

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
            {t("Готовы увеличить заказы?", "Ready to increase orders?", "Siap menambah pesanan?", 'พร้อมเพิ่มออร์เดอร์แล้วหรือยัง')}
          </h2>
          <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
            {t(
              "Получите бесплатную диагностику вашего профиля и узнайте, как увеличить доходы на 50-600%",
              "Get a free profile audit and learn how to increase revenue by 50-600%",
              "Dapatkan audit gratis untuk profil Anda dan pelajari cara menaikkan omzet 50-600%"
            , 'รับวิเคราะห์ร้านฟรี แล้วดูว่าจะเพิ่มยอดขาย 50-600% ได้อย่างไร')}
          </p>
          <a
            href={diagnosticUrl('landing-bottom', language)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-cta-main"
            className="brand-gradient text-white px-8 py-4 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105 text-lg inline-block"
          >
            {t("Получить бесплатную диагностику", "Get a free audit", "Dapatkan audit gratis", 'ขอวิเคราะห์ร้านฟรี')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
