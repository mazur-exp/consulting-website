import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';

/** Named clients for the current market. Rendered only when the country has a client list. */
export const ClientsSection = () => {
  const { t } = useLanguage();
  const country = useCountry();

  if (!country.clients || country.clients.length === 0) return null;

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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-clients-title">
            {t(country.clientsTitleRu, country.clientsTitleEn)}
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {country.clients.map((name, index) => (
            <span
              key={index}
              className="px-4 py-2 glass-card border border-white/15 rounded-full text-brand-text text-sm sm:text-base hover:border-brand-green/50 transition-colors duration-300"
              data-testid={`chip-client-${index}`}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
