
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedCars from '@/components/FeaturedCars';
import Benefits from '@/components/Benefits';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Brands from '@/components/Brands';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import PaymentOptions from '@/components/PaymentOptions';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleCouponCodeChange = (code: string) => {
    setCouponCode(code);
  };

  const handlePaymentProofChange = (file: File | null) => {
    console.log('Payment proof file:', file);
    // Handle the payment proof file
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <ConditionsHighlight />
        <div className="mt-10" id="featured-cars">
          <FeaturedCars featuredOnly={true} />
        </div>
        
        <Benefits />
        <TestimonialSection />
        <CallToAction />
        <Brands />
        <PaymentOptions 
          price={1000}
          onPaymentMethodChange={handlePaymentMethodChange}
          onCouponCodeChange={handleCouponCodeChange}
          onPaymentProofChange={handlePaymentProofChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
