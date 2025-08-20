import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { Play } from 'lucide-react';

export const VideoSection = () => {
  const { t } = useLanguage();

  const handleVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=oXg8VAd1gQw&feature=youtu.be', '_blank');
  };

  const videoPoints = [
    {
      ru: "Объемы рынка доставки на Бали и его особенности",
      en: "Bali delivery market volumes and features"
    },
    {
      ru: "Нужно ли вашему бизнесу заниматься доставкой?",
      en: "Does your business need delivery services?"
    },
    {
      ru: "Как настроить аккаунты в Gojek и Grab и правильно оформить меню",
      en: "How to set up Gojek and Grab accounts and design menu properly"
    },
    {
      ru: "Советы по повышению среднего чека и формированию товаров-локомотивов",
      en: "Tips for increasing average order value and creating bestsellers"
    },
    {
      ru: "Рекомендации по ведению рекламных кампаний и работе с аккаунт-менеджерами",
      en: "Recommendations for advertising campaigns and account manager relationships"
    },
    {
      ru: "Как эффективно управлять рейтингами на платформах доставки",
      en: "How to effectively manage ratings on delivery platforms"
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-video-title">
              {t("Платформы доставки еды Gojek и Grab на Бали. Как подключиться и заработать на этом.", "Gojek and Grab food delivery platforms in Bali. How to connect and profit from it.")}
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              className="relative group cursor-pointer"
              onClick={handleVideoClick}
              data-testid="button-video-play"
            >
              <div className="aspect-video rounded-2xl glass-card overflow-hidden relative">
                <img 
                  src="/2025-08-18 21.17.17_1755717966951.jpg"
                  alt="Video thumbnail about Gojek and Grab delivery platforms"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 brand-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-sm font-medium text-brand-text">
                      {t(
                        "Платформы доставки еды Gojek и Grab на Бали",
                        "Gojek and Grab food delivery platforms in Bali"
                      )}
                    </p>
                    <p className="text-xs text-brand-muted mt-1">
                      {t("Смотреть на YouTube", "Watch on YouTube")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {videoPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                data-testid={`text-video-point-${index}`}
              >
                <div className="w-6 h-6 brand-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <p className="text-brand-muted leading-relaxed">
                  {t(point.ru, point.en)}
                </p>
              </motion.div>
            ))}
            
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={handleVideoClick}
                className="brand-gradient text-white px-6 py-3 rounded-xl font-medium brand-shadow hover:brand-shadow-hover transition-all duration-300 transform hover:scale-105"
                data-testid="button-video-cta"
              >
                {t("Смотреть видео", "Watch Video")}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};