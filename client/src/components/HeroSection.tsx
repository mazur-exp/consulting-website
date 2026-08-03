import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';

export const HeroSection = () => {
  const { t } = useLanguage();
  const country = useCountry();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const fadeInUpDelayed = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-8" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-title">
              {t(
                `Увеличение продаж в 2-6 раз в ${country.platformsRu}`,
                `2-6x sales increase in ${country.platformsEn}`
              )}
            </h1>

            <p className="text-lg text-brand-muted text-center lg:text-left" data-testid="text-hero-social-proof">
              {t(country.socialProofRu, country.socialProofEn)}
            </p>

            <p className="text-xl text-brand-muted leading-relaxed" data-testid="text-hero-subtitle">
              {t(
                "Управление вашей доставкой «под ключ» (меню, реклама, обучение команды, статистика, отчеты и многое другое)",
                "Turnkey delivery management (menu, ads, team training, analytics, reports and more)"
              )}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={t("https://t.me/delivery_booster", "https://wa.me/79520029077")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-primary-cta"
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
              >
                {t(
                  "Получить бесплатную диагностику",
                  "Book a free audit"
                )}
              </a>
            </div>


          </motion.div>

          <motion.div {...fadeInUpDelayed}>
            <div className="glass-card p-4 rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="/2025-08-18 21.17.30_1755717966950.jpg"
                  alt="Food delivery app interface showcasing menu items"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-1"
                />
                <img
                  src={country.heroImage}
                  alt={country.heroImageAlt}
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-2"
                />
                <img
                  src="/photo_2025-10-18_17-12-17_1760800401840.jpg"
                  alt="Grab app interface"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-3"
                />
                <img
                  src="/photo_2025-10-18_17-15-51_1760800597028.jpg"
                  alt="Delicious pizzas for delivery"
                  className="w-full h-40 object-cover rounded-lg"
                  data-testid="img-hero-gallery-4"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
