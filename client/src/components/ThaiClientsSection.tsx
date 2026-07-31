import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const THAI_CLIENTS = [
  'Enjoy Healthy Food',
  'Enjoy Healthy Food (Boat Avenue)',
  'USSR Phuket',
  'Meat Point',
  'Alma-Ata',
  'Etna',
  'Island KIDS',
  'Island (Bang Tao)',
  'Lavash & Grill (Karon)',
  'Ab House',
  'Swag Food',
  'Sensorica',
  'Yuuhi',
  'LeGourmet',
  'Surf Point',
];

export const ThaiClientsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-thai-clients-title">
            {t('Нам доверяют 15+ ресторанов в Таиланде', 'Trusted by 15+ restaurants in Thailand')}
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {THAI_CLIENTS.map((name, index) => (
            <span
              key={index}
              className="px-4 py-2 glass-card border border-white/15 rounded-full text-brand-text text-sm sm:text-base hover:border-brand-green/50 transition-colors duration-300"
              data-testid={`chip-thai-client-${index}`}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
