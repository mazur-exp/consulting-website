import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const ServicesSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
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

  const services = [
    {
      title: {
        ru: "Рейтинги и отзывы",
        en: "Ratings & Reviews",
        id: "Rating dan ulasan"
      },
      description: {
        ru: "Сценарии запросов, ответы на 1★, цель — рейтинг 4.8+. Технология поднятия рейтинга!",
        en: "Ethical review asks, 1★ de-escalation; target 4.8+. Rating increase technology!",
        id: "Permintaan ulasan yang wajar, penanganan ulasan 1★, target rating 4.8+. Teknologi kami untuk menaikkan rating."
      }
    },
    {
      title: {
        ru: "Промо и реклама",
        en: "Promos & Ads",
        id: "Promo dan iklan"
      },
      description: {
        ru: "Управляем рекламой с фокусом на прибыль и прозрачные результаты.",
        en: "We manage ads with focus on profit and transparent results.",
        id: "Kami kelola iklan dengan fokus pada profit dan hasil yang transparan."
      }
    },
    {
      title: {
        ru: "Меню и цены",
        en: "Menu & Pricing",
        id: "Menu dan harga"
      },
      description: {
        ru: "Хиты, комбо/бандлы, AOV с учётом комиссий.",
        en: "Hits, bundles, AOV with platform fees in mind.",
        id: "Item unggulan, paket bundel, rata-rata nilai pesanan dengan memperhitungkan komisi platform."
      }
    },
    {
      title: {
        ru: "Профиль и карточки",
        en: "Profile & Cards",
        id: "Profil dan halaman menu"
      },
      description: {
        ru: "Фото, тексты, теги, «герои» меню; факторы видимости под вашим контролем.",
        en: "Photos, copy, tags, hero items; visibility factors you can control.",
        id: "Foto, teks, tag, item andalan; faktor visibilitas yang bisa Anda kendalikan."
      }
    },
    {
      title: {
        ru: "Консалтинг и обучение команды",
        en: "Consulting & Team Training",
        id: "Konsultasi dan pelatihan tim"
      },
      description: {
        ru: "Видео-тренинг, тест и гайд для сотрудников ресторана",
        en: "Video training, test and guide for restaurant staff",
        id: "Video pelatihan, tes, dan panduan untuk tim restoran"
      }
    },
    {
      title: {
        ru: "Аналитика",
        en: "Analytics",
        id: "Analitik"
      },
      description: {
        ru: "Автоматический сбор данных, еженедельная отчетность, план экспериментов.",
        en: "Automated data collection, weekly reporting, test plan.",
        id: "Pengumpulan data otomatis, laporan mingguan, rencana uji coba."
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-services-title">
            {t("Что именно мы делаем", "What we do", "Apa yang kami kerjakan")}
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
              data-testid={`card-service-${index}`}
            >
              <h3 className="text-xl font-semibold mb-3 text-center">
                {t(service.title.ru, service.title.en, service.title.id)}
              </h3>
              <p className="text-brand-muted">
                {t(service.description.ru, service.description.en, service.description.id)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
