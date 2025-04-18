
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import FeaturedCars from '@/components/FeaturedCars';
import TestimonialSection from '@/components/TestimonialSection';
import ConditionsHighlight from '@/components/ConditionsHighlight';
import HeaderLanguageSwitcher from '@/components/HeaderLanguageSwitcher';
import VehicleInitializer from '@/components/VehicleInitializer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Auto ADI | Importation et vente de véhicules d'occasion</title>
        <meta 
          name="description" 
          content="Auto ADI - Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité. Large choix de marques et modèles disponibles." 
        />
      </Helmet>
      
      <VehicleInitializer />
      
      <div className="flex flex-col min-h-screen">
        <HeaderLanguageSwitcher />
        <Header />
        
        <main className="flex-grow mt-16">
          <Benefits />
          <FeaturedCars featuredOnly={true} />
          
          <div id="conditions-section" className="w-full">
            <ConditionsHighlight />
          </div>
          
          <TestimonialSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

