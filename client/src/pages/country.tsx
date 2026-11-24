import { syncOpenGraph } from '../components/AnswerLayout';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { AudienceV2, CasesV2, FinalCtaV2, HeroV2, LogosStrip, PriceV2, ProcessV2, ReviewsV2, ServicesV2 } from '../components/HomeV2';
import { ClientsSection } from '../components/ClientsSection';
import { FounderSection } from '../components/FounderSection';
import { FAQSection } from '../components/FAQSection';
import { VideoSection } from '../components/VideoSection';
import { Footer } from '../components/Footer';
import { SEOSchema } from '../components/SEOSchema';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { COUNTRIES, CountryCode } from '../config/countries';

/**
 * One page shape for every market. What differs between countries lives in
 * config/countries.ts and config/cases.ts, not here.
 * Порядок блоков по финальному ТЗ маркетолога (24.11.2026): первый экран,
 * логотипы, кейсы, кому, что делаем, как работаем, цена, отзывы, основатель,
 * вопросы и статьи, финальный призыв.
 */
export default function CountryPage({ code }: { code: CountryCode }) {
  const { language } = useLanguage();
  const country = COUNTRIES[code];

  useEffect(() => {
    const platformsId = country.platformsId ?? country.platformsEn;
    const inCountryId = country.inCountryId ?? country.inCountryEn;
    const platformsTh = country.platformsTh ?? country.platformsEn;
    const inCountryTh = country.inCountryTh ?? country.inCountryEn;

    document.title =
      language === 'ru'
        ? `Delivery Booster — Рост продаж на ${country.platformsRu} для ресторанов ${country.inCountryRu}`
        : language === 'id'
          ? `Delivery Booster — Pertumbuhan Omzet di ${platformsId} untuk Restoran ${inCountryId}`
          : language === 'th'
            ? `Delivery Booster — บริการดูแลร้านอาหารบน ${platformsTh} ${inCountryTh} เพิ่มยอดขาย 2-6 เท่า`
            : `Delivery Booster — ${country.platformsEn} Optimization for Restaurants ${country.inCountryEn}`;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? `Delivery Booster — сервис по увеличению продаж на ${country.platformsRu} для ресторанов ${country.inCountryRu}. Рост продаж в 2-6 раз: доступность, меню и цены, рейтинг и реклама в одном аккаунте.`
          : language === 'id'
            ? `Delivery Booster menumbuhkan omzet restoran ${inCountryId} di ${platformsId}. Omzet naik 2-6 kali: ketersediaan, menu dan harga, rating, serta iklan dikelola dalam satu akun.`
            : language === 'th'
              ? `Delivery Booster คือเอเจนซีที่รับดูแลบัญชี ${platformsTh} ให้ร้านอาหาร${inCountryTh} แทนเจ้าของร้าน ยอดขายโต 2-6 เท่า: ความพร้อมขาย เมนูและราคา เรตติ้ง และโฆษณา ดูแลรวมอยู่ในบัญชีเดียว คิดค่าบริการเป็นเปอร์เซ็นต์ของยอดเงินโอนสุทธิ`
              : `Delivery Booster grows restaurant sales ${country.inCountryEn} on ${country.platformsEn}. 2-6x revenue growth: availability, menu and pricing, rating and ads managed in one account.`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://booster.delivery/${code}`;
    syncOpenGraph();
  }, [language, code, country]);

  return (
    <CountryProvider country={code}>
      <div className="v v-hpad" style={{ overflowX: 'hidden' }}>
        <SEOSchema />
        <Header />
        <main>
          <HeroV2 />
          {code === 'id' ? <ClientsSection /> : <LogosStrip />}
          <CasesV2 />
          <AudienceV2 />
          <ServicesV2 />
          <ProcessV2 />
          <PriceV2 />
          <ReviewsV2 />
          <FounderSection />
          <FAQSection />
          <FinalCtaV2 />
          {country.showVideo && <VideoSection />}
        </main>
        <Footer />
      </div>
    </CountryProvider>
  );
}
