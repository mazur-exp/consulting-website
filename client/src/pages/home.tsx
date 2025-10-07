import { AnimatedBackground } from '../components/AnimatedBackground';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TargetAudienceSection } from '../components/TargetAudienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkProcessSection } from '../components/WorkProcessSection';
import { CaseStudiesSection } from '../components/CaseStudiesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FounderSection } from '../components/FounderSection';
import { CTASection } from '../components/CTASection';
import { VideoSection } from '../components/VideoSection';
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
        <TestimonialsSection />
        <FounderSection />
        <CTASection />
        <VideoSection />
      </main>
      
      <Footer />
    </div>
  );
}
