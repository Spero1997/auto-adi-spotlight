
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import Brands from '@/components/Brands';
import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroCarousel />
        <div className="mt-32">
          <ConditionsHighlight />
        </div>
        <div className="mt-10">
          <FeaturedCars />
        </div>
        <Benefits />
        <Brands />
        <TestimonialSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
