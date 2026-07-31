import { useEffect } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TargetAudienceSection } from '../components/TargetAudienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { PricingSection } from '../components/PricingSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ThaiClientsSection } from '../components/ThaiClientsSection';
import { FounderSection } from '../components/FounderSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { SEOSchema } from '../components/SEOSchema';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';

export default function Thailand() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster — Рост продаж на Grab для ресторанов на Пхукете и в Таиланде'
        : 'Delivery Booster — Grab Optimization for Restaurants in Phuket & Thailand';
  }, [language]);

  return (
    <CountryProvider country="th">
      <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
        <SEOSchema />
        <AnimatedBackground />
        <Header />

        <main className="relative pt-16 z-10">
          <HeroSection />
          <TargetAudienceSection />
          <ServicesSection />
          <WorkProcessSection />
          <PricingSection />
          <CaseStudiesSection />
          <ThaiClientsSection />
          <FounderSection />
          <FAQSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
