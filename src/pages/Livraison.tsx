
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/livraison/HeroSection';
import ServiceDescription from '@/components/livraison/ServiceDescription';
import ProcessCards from '@/components/livraison/ProcessCards';
import TransportDestinations from '@/components/livraison/TransportDestinations';
import TestimonialsSection from '@/components/livraison/TestimonialsSection';
import CTASection from '@/components/livraison/CTASection';

const Livraison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow mt-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Main Description */}
                <ServiceDescription />
                
                {/* Right Column - Process Cards */}
                <ProcessCards />
              </div>
            </div>
          </div>
        </section>
        
        {/* Destinations Section */}
        <TransportDestinations />

        {/* Testimonials Section with improved styling */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <TestimonialsSection />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Livraison;
