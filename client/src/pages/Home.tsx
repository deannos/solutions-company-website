import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesSection from "@/components/home/ServicesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import HighlightedContent from "@/components/home/HighlightedContent";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InsightsSection from "@/components/home/InsightsSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24">
        <HeroCarousel />
        <ServicesSection />
        <IndustriesSection />
        <HighlightedContent />
        <TestimonialsSection />
        <InsightsSection />
        <NewsEventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
