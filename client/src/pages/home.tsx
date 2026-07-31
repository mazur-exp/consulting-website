import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TargetAudienceSection } from '../components/TargetAudienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { PricingSection } from '../components/PricingSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FounderSection } from '../components/FounderSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { VideoSection } from '../components/VideoSection';
import { Footer } from '../components/Footer';
import { SEOSchema } from '../components/SEOSchema';
import { useLanguage } from '../hooks/useLanguage';
import { useEffect } from 'react';

export default function Home() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Delivery Booster — Рост продаж на GoJek и Grab для ресторанов на Бали и в Таиланде'
        : 'Delivery Booster — GoJek & Grab Optimization for Restaurants in Bali & Thailand';
  }, [language]);

  return (
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
        <TestimonialsSection />
        <FounderSection />
        <FAQSection />
        <CTASection />
        <VideoSection />
      </main>
      
      <Footer />
    </div>
  );
}
