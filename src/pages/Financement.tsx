
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFinancingTranslations } from '@/components/financing/FinancingTranslations';
import FinancingHero from '@/components/financing/FinancingHero';
import FinancingOptions from '@/components/financing/FinancingOptions';
import SpecialOffer from '@/components/financing/SpecialOffer';
import FinancingCalculator from '@/components/financing/FinancingCalculator';
import FinancingFAQ from '@/components/financing/FinancingFAQ';
import CallToAction from '@/components/financing/CallToAction';

const Financement = () => {
  const { language } = useLanguage();
  const translations = getFinancingTranslations();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <FinancingHero translations={translations} />

        {/* Main Financing Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FinancingOptions translations={translations} />
            
            {/* Special cash payment offer */}
            <SpecialOffer translations={translations} />
            
            {/* Financing simulation section */}
            <FinancingCalculator translations={translations} />
            
            {/* FAQ section */}
            <FinancingFAQ translations={translations} />
            
            {/* Call-to-action section */}
            <CallToAction translations={translations} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Financement;
