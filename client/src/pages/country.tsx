import { useEffect } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TargetAudienceSection } from '../components/TargetAudienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { PricingSection } from '../components/PricingSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { ClientsSection } from '../components/ClientsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FounderSection } from '../components/FounderSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { VideoSection } from '../components/VideoSection';
import { Footer } from '../components/Footer';
import { SEOSchema } from '../components/SEOSchema';
import { CountryProvider } from '../hooks/useCountry';
import { useLanguage } from '../hooks/useLanguage';
import { COUNTRIES, CountryCode } from '../config/countries';

/**
 * One page shape for every market. What differs between countries lives in
 * config/countries.ts, not here — so all pages stay structurally identical.
 */
export default function CountryPage({ code }: { code: CountryCode }) {
  const { language } = useLanguage();
  const country = COUNTRIES[code];

  useEffect(() => {
    document.title =
      language === 'ru'
        ? `Delivery Booster — Рост продаж на ${country.platformsRu} для ресторанов ${country.inCountryRu}`
        : `Delivery Booster — ${country.platformsEn} Optimization for Restaurants ${country.inCountryEn}`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://booster.delivery/${code}`;
  }, [language, code, country]);

  return (
    <CountryProvider country={code}>
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
          {country.clients && <ClientsSection />}
          {country.showTestimonials && <TestimonialsSection />}
          <FounderSection />
          <FAQSection />
          <CTASection />
          {country.showVideo && <VideoSection />}
        </main>

        <Footer />
      </div>
    </CountryProvider>
  );
}
