
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
      
      <main className="flex-grow mt-8"> {/* Ajout de mt-8 pour un margin-top de 2 cm */}
        {/* Hero Section */}
        <FinancingHero translations={translations} />

        <section className="py-16 container mx-auto px-4">
          <FinancingOptions translations={translations} />
          <SpecialOffer translations={translations} />
          <FinancingCalculator translations={translations} />
          <FinancingFAQ translations={translations} />
          <CallToAction translations={translations} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Financement;
