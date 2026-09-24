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
              "Бесплатная автоматическая диагностика карточки на diagnostic.booster.delivery: вставьте ссылку на ресторан в Grab или GoFood, через минуту отчёт, что теряет заказы прямо сейчас. Без логина и оплаты.",
              "A free automated listing check at diagnostic.booster.delivery: paste your Grab or GoFood restaurant link and in a minute you see what loses orders right now. No login, no payment.",
              "Pemeriksaan listing otomatis gratis di diagnostic.booster.delivery: tempel link restoran Anda di Grab atau GoFood, semenit kemudian terlihat apa yang membuat pesanan hilang sekarang. Tanpa login dan tanpa bayar."
            , 'ตัวตรวจหน้าร้านอัตโนมัติฟรีที่ diagnostic.booster.delivery: วางลิงก์ร้านของคุณบน Grab หรือ GoFood อีกหนึ่งนาทีเห็นเลยว่าอะไรทำให้เสียออร์เดอร์อยู่ตอนนี้ ไม่ต้องล็อกอิน ไม่ต้องจ่าย')}
          </p>
          <a
            href={diagnosticUrl('landing-bottom', language)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-cta-main"
            className="brand-gradient text-white px-8 py-4 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105 text-lg inline-block"
          >
            {t("Проверить карточку бесплатно", "Check my listing free", "Cek listing saya gratis", 'ตรวจหน้าร้านฟรี')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
