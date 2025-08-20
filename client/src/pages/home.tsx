import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TargetAudienceSection } from '../components/TargetAudienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { FounderSection } from '../components/FounderSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      
      <main className="relative pt-16 z-10">
        <HeroSection />
        <TargetAudienceSection />
        <ServicesSection />
        <WorkProcessSection />
        <CaseStudiesSection />
        <FounderSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
