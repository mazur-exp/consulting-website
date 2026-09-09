import { useLanguage } from '../hooks/useLanguage';
import { useCountry } from '../hooks/useCountry';
import { getCountryFaqs } from '../config/faqs';

export const SEOSchema = () => {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const isId = language === 'id';
  const isTh = language === 'th';
  const country = useCountry();
  const platforms = country.platformsShort;
  const regionRu = country.inCountryRu;
  const regionEn = country.inCountryEn;
  const regionId = country.inCountryId ?? country.inCountryEn;
  const platformsId = country.platformsId ?? country.platformsEn;
  const regionTh = country.inCountryTh ?? country.inCountryEn;
  const platformsTh = country.platformsTh ?? country.platformsEn;

  /** Picks the localized string for the JSON-LD payload; Bahasa and Thai fall back to English. */
  const pick = (ru: string, en: string, id?: string, th?: string): string => {
    if (isRu) return ru;
    if (isId) return id ?? en;
    if (isTh) return th ?? en;
    return en;
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    // Канонический идентификатор организации — на него ссылаются provider в
    // makesOffer и publisher в Article-схемах. Один узел, а не копия на каждой
    // странице: так движок видит одну компанию, а не двадцать четыре.
    "@id": "https://booster.delivery/#organization",
    "name": "Delivery Booster",
    "alternateName": ["Food Delivery Booster", "Delivery Booster Bali"],
    "url": `https://booster.delivery/${country.code}`,
    "logo": "https://booster.delivery/favicon.svg",
    "description": pick(
      `Сервис по увеличению продаж на ${country.platformsRu} для ресторанов ${regionRu}. Рост продаж в 2-6 раз.`,
      `${country.platformsEn} delivery optimization service for restaurants ${regionEn}. 2-6x sales growth.`,
      `Layanan peningkatan penjualan di ${platformsId} untuk restoran ${regionId}. Pertumbuhan omzet 2-6 kali lipat.`,
      `บริการเพิ่มยอดขายบน ${platformsTh} สำหรับร้านอาหาร${regionTh} ยอดขายโต 2-6 เท่า`
    ),
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
      "https://www.youtube.com/@DeliveryBooster",
      "https://www.instagram.com/delivery.booster/",
      "https://t.me/deliverybooster_asia",
      "https://www.linkedin.com/in/alekseimazur"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://t.me/delivery_booster",
      "availableLanguage": ["Russian", "English", "Indonesian", "Thai"]
    },
    // Бесплатная диагностика вынесена в makesOffer отдельным Offer с price 0 и
    // собственным URL. Движки в ответах регулярно советуют «возьмите бесплатный
    // аудит» — им нужен адрес, который можно назвать, а не ссылка в мессенджер.
    "makesOffer": {
      "@type": "Offer",
      "name": pick(
        "Бесплатная диагностика карточки GrabFood",
        "Free GrabFood listing diagnostic",
        "Diagnostik gratis halaman GrabFood",
        "ตรวจวิเคราะห์หน้าร้าน GrabFood ฟรี"
      ),
      "price": "0",
      "priceCurrency": "USD",
      "url": "https://diagnostic.booster.delivery/",
      "availabilityStarts": "2026-09-09",
      "itemOffered": {
        "@type": "Service",
        "name": pick(
          "Диагностика карточки ресторана в GrabFood",
          "GrabFood restaurant listing diagnostic",
          "Diagnostik halaman restoran di GrabFood",
          "ตรวจวิเคราะห์หน้าร้านอาหารบน GrabFood"
        ),
        "description": pick(
          "Разбор карточки по ссылке: меню и поиск, покрытие фото по категориям, тональность отзывов, цены против соседей. Отчёт за пару минут, бесплатно и без формы.",
          "A listing audit from a link: menu and search, photo coverage by category, review sentiment, prices against neighbours. Report in a couple of minutes, free and with no form.",
          "Audit halaman dari sebuah link: menu dan pencarian, kelengkapan foto per kategori, sentimen ulasan, harga dibanding tetangga. Laporan dalam beberapa menit, gratis dan tanpa formulir.",
          "วิเคราะห์หน้าร้านจากลิงก์: เมนูและการค้นหา ความครบของรูปภาพในแต่ละหมวด โทนของรีวิว ราคาเทียบกับร้านข้างเคียง รายงานเสร็จในไม่กี่นาที ฟรีและไม่ต้องกรอกฟอร์ม"
        ),
        "provider": { "@id": "https://booster.delivery/#organization" },
        "url": "https://diagnostic.booster.delivery/"
      }
    },
    "priceRange": "$400-$800/month"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    // Канонический идентификатор. На него ссылаются все Article-схемы сайта
    // (AUTHOR_ID в AnswerLayout) — так материалы связываются с одним автором.
    "@id": "https://booster.delivery/#aleksei-mazur",
    "name": "Aleksei Mazur",
    "alternateName": "Алексей Мазур",
    "jobTitle": "Founder & Delivery Platform Optimization Consultant",
    "sameAs": ["https://www.linkedin.com/in/alekseimazur"],
    "worksFor": {
      "@type": "Organization",
      "name": "Delivery Booster"
    },
    "description": pick(
      "Основатель Delivery Booster. Сооснователь FoodLab (8 брендов), до 2025 года — сооснователь IKA Sushi (4 точки на Бали). 200+ клиентов с 2023 года, 15 лет опыта в бизнесе.",
      "Founder of Delivery Booster. Co-founder of FoodLab (8 brands); until 2025 co-founder of IKA Sushi (4 locations in Bali). 200+ clients since 2023, 15 years of business experience.",
      "Pendiri Delivery Booster. Co-founder FoodLab (8 merek); hingga 2025 co-founder IKA Sushi (4 gerai di Bali). 200+ klien sejak 2023, 15 tahun pengalaman di bisnis.",
      "ผู้ก่อตั้ง Delivery Booster ผู้ร่วมก่อตั้ง FoodLab (8 แบรนด์) และจนถึงปี 2025 เป็นผู้ร่วมก่อตั้ง IKA Sushi (4 สาขาในบาหลี) ลูกค้ากว่า 200 รายตั้งแต่ปี 2023 ประสบการณ์ทำธุรกิจ 15 ปี"
    ),
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
        "name": pick(
          `Сколько стоит оптимизация доставки на ${country.platformsRu}?`,
          `How much does ${country.platformsEn} delivery optimization cost?`,
          `Berapa biaya optimasi delivery di ${platformsId}?`,
          `ค่าบริการดูแลเดลิเวอรี่บน ${platformsTh} เท่าไหร่?`
        ),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(
            `10% от выручки ${platforms}. Среднее $400-800/мес. Нет рисков, нет предоплаты.`,
            `10% of ${platforms} revenue. Average $400-800/month. No risk, no upfront payment.`,
            `10% dari omzet ${platforms}. Rata-rata $400-800/bulan. Tanpa risiko, tanpa pembayaran di muka.`,
            `10% ของรายได้จาก ${platforms} เฉลี่ย $400-800/เดือน ไม่มีความเสี่ยง ไม่ต้องจ่ายล่วงหน้า`
          )
        }
      },
      {
        "@type": "Question",
        "name": pick("Как быстро будут результаты?", "How fast are results?", "Seberapa cepat hasilnya terlihat?", "เห็นผลเร็วแค่ไหน?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(
            "Первый рост: 2-4 недели. Полная раскачка: 3-6 месяцев. Подтверждено 110+ ресторанами на сопровождении и 200+, прошедшими через агентство с 2023 года.",
            "First growth: 2-4 weeks. Full ramp-up: 3-6 months. Confirmed by 110+ restaurants under management and 200+ served since 2023.",
            "Pertumbuhan pertama: 2-4 minggu. Skala penuh: 3-6 bulan. Dikonfirmasi oleh 110+ restoran dalam pengelolaan kami dan 200+ yang sudah kami tangani sejak 2023.",
            "เห็นผลครั้งแรก: 2-4 สัปดาห์ เต็มกำลัง: 3-6 เดือน ยืนยันจากร้านอาหารกว่า 110 แห่งที่เราดูแลอยู่ และกว่า 200 แห่งที่ผ่านมือเราตั้งแต่ปี 2023"
          )
        }
      },
      {
        "@type": "Question",
        "name": pick("Есть гарантия результата?", "Is there a guarantee?", "Apakah ada garansi hasil?", "มีการรับประกันผลลัพธ์ไหม?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(
            "Да. Целевые продажи за 6 месяцев или возврат комиссии.",
            "Yes. Target sales in 6 months or commission refund.",
            "Ya. Target penjualan tercapai dalam 6 bulan atau komisi dikembalikan.",
            "มี ทำยอดขายไม่ถึงเป้าภายใน 6 เดือน เราคืนค่าคอมมิชชัน"
          )
        }
      },
      {
        "@type": "Question",
        "name": pick(
          "Что входит в управление доставкой?",
          "What's included in delivery management?",
          "Apa saja yang termasuk dalam pengelolaan delivery?",
          "การดูแลเดลิเวอรี่ครอบคลุมอะไรบ้าง?"
        ),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(
            `Полное управление ${platforms}: меню, реклама, рейтинги, аналитика, обучение команды. Вы тратите 0 часов, получаете еженедельные отчеты.`,
            `Full ${platforms} management: menu, ads, ratings, analytics, team training. You spend 0 hours, get weekly reports.`,
            `Pengelolaan penuh ${platforms}: menu, iklan, rating, analitik, pelatihan tim. Anda menghabiskan 0 jam dan menerima laporan mingguan.`,
            `ดูแล ${platforms} แบบครบวงจร: เมนู โฆษณา เรตติ้ง การวิเคราะห์ข้อมูล และการอบรมทีมงาน คุณใช้เวลา 0 ชั่วโมง และได้รับรายงานทุกสัปดาห์`
          )
        }
      },
      {
        "@type": "Question",
        "name": pick(
          "Почему не делать оптимизацию самому?",
          "Why not do delivery optimization yourself?",
          "Kenapa tidak melakukan optimasi sendiri?",
          "ทำไมไม่ทำเองล่ะ?"
        ),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(
            "Можете! Самостоятельное обучение займёт 3-6 месяцев, а ошибки обойдутся в $5-10k упущенной прибыли.",
            "You can! Self-learning takes 3-6 months, and mistakes cost $5-10k in lost profits and time.",
            "Bisa saja. Belajar sendiri butuh 3-6 bulan, dan kesalahan bisa merugikan $5-10k berupa laba dan waktu yang hilang.",
            "ทำเองก็ได้! แต่การเรียนรู้ด้วยตัวเองใช้เวลา 3-6 เดือน และความผิดพลาดระหว่างทางกินกำไรที่ควรได้ไป $5-10k"
          )
        }
      },
      ...getCountryFaqs(country).map((f) => ({
        "@type": "Question",
        "name": pick(f.qRu, f.qEn, f.qId, f.qTh),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": pick(f.aRu, f.aEn, f.aId, f.aTh)
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
