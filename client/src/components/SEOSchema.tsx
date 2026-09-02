import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { getCountryFaqs } from '../config/faqs';

export const SEOSchema = () => {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const country = useCountry();
  const platforms = country.platformsShort;
  const regionRu = country.inCountryRu;
  const regionEn = country.inCountryEn;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Delivery Booster",
    "alternateName": ["Food Delivery Booster", "Delivery Booster Bali"],
    "url": `https://booster.delivery/${country.code}`,
    "logo": "https://booster.delivery/favicon.svg",
    "description": isRu
      ? `Сервис по увеличению продаж на ${country.platformsRu} для ресторанов ${regionRu}. Рост продаж в 2-6 раз.`
      : `${country.platformsEn} delivery optimization service for restaurants ${regionEn}. 2-6x sales growth.`,
    "areaServed": [
      { "@type": "Place", "name": `${country.cityEn}, ${country.nameEn}` },
      { "@type": "Place", "name": country.nameEn }
    ],
    "serviceType": [
      ...(country.code === 'id' ? ["GoJek restaurant optimization"] : []),
      "Grab delivery optimization",
      "Restaurant delivery consulting",
      "Menu optimization",
      "Delivery analytics",
      "Rating management"
    ],
    "knowsAbout": [
      ...(country.code === 'id' ? ["GoJek optimization"] : []),
      "Grab delivery",
      "Dark kitchen",
      "Restaurant analytics",
      "Food delivery consulting",
      "Menu engineering",
      "Delivery app rating management"
    ],
    "sameAs": [
      "https://t.me/DeliveryBoosterBali",
      "https://t.me/DeliveryBoosterBot"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://t.me/delivery_booster",
      "availableLanguage": ["Russian", "English"]
    },
    "priceRange": "$400-$800/month"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alexey Mazur",
    "jobTitle": "Founder & Delivery Platform Optimization Consultant",
    "worksFor": {
      "@type": "Organization",
      "name": "Delivery Booster"
    },
    "description": isRu
      ? "Основатель Delivery Booster. Сооснователь IKA Sushi (4 точки на Бали), FoodLab (8 брендов). 200+ клиентов с 2023 года, 15 лет опыта в бизнесе."
      : "Founder of Delivery Booster. Co-founder of IKA Sushi (4 locations in Bali), FoodLab (8 brands). 200+ clients since 2023, 15 years of business experience.",
    "knowsAbout": [
      "GoJek optimization",
      "Grab delivery optimization",
      "Dark kitchen operations",
      "Restaurant analytics",
      "Food delivery consulting Southeast Asia",
      "Menu engineering for delivery apps"
    ],
    "url": "https://booster.delivery",
    "image": "https://booster.delivery/photo_2025-09-25_04-24-22_1760798837110.jpg"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isRu
          ? `Сколько стоит оптимизация доставки на ${country.platformsRu}?`
          : `How much does ${country.platformsEn} delivery optimization cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu
            ? `10% от выручки ${platforms}. Среднее $400-800/мес. Нет рисков, нет предоплаты.`
            : `10% of ${platforms} revenue. Average $400-800/month. No risk, no upfront payment.`
        }
      },
      {
        "@type": "Question",
        "name": isRu ? "Как быстро будут результаты?" : "How fast are results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu
            ? "Первый рост: 2-4 недели. Полная раскачка: 3-6 месяцев. Подтверждено 110+ ресторанами на сопровождении."
            : "First growth: 2-4 weeks. Full ramp-up: 3-6 months. Confirmed by 110+ restaurants under management."
        }
      },
      {
        "@type": "Question",
        "name": isRu ? "Есть гарантия результата?" : "Is there a guarantee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu
            ? "Да. Целевые продажи за 6 месяцев или возврат комиссии."
            : "Yes. Target sales in 6 months or commission refund."
        }
      },
      {
        "@type": "Question",
        "name": isRu ? "Что входит в управление доставкой?" : "What's included in delivery management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu
            ? `Полное управление ${platforms}: меню, реклама, рейтинги, аналитика, обучение команды. Вы тратите 0 часов, получаете еженедельные отчеты.`
            : `Full ${platforms} management: menu, ads, ratings, analytics, team training. You spend 0 hours, get weekly reports.`
        }
      },
      {
        "@type": "Question",
        "name": isRu ? "Почему не делать оптимизацию самому?" : "Why not do delivery optimization yourself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu
            ? "Можете! Самостоятельное обучение займёт 3-6 месяцев, а ошибки обойдутся в $5-10k упущенной прибыли."
            : "You can! Self-learning takes 3-6 months, and mistakes cost $5-10k in lost profits and time."
        }
      },
      ...getCountryFaqs(country).map((f) => ({
        "@type": "Question",
        "name": isRu ? f.qRu : f.qEn,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isRu ? f.aRu : f.aEn
        }
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
