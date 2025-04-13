
import Footer from '@/components/Footer';
import HeroSection from '@/components/livraison/HeroSection';
import ServiceDescription from '@/components/livraison/ServiceDescription';
import ProcessCards from '@/components/livraison/ProcessCards';
import TransportDestinations from '@/components/livraison/TransportDestinations';
import TestimonialsSection from '@/components/livraison/TestimonialsSection';
import CTASection from '@/components/livraison/CTASection';

const Livraison = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[100vh]">
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Main Description */}
              <ServiceDescription />
              
              {/* Right Column - Process Cards */}
              <ProcessCards />
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <TransportDestinations />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Livraison;
