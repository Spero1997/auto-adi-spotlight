
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const Hero = () => {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();

  // Traductions pour l'interface du Hero
  const translations = {
    heroTitle: {
      FR: "Trouvez la voiture parfaite pour vous",
      EN: "Find the perfect car for you",
      ES: "Encuentre el coche perfecto para usted",
      IT: "Trova l'auto perfetta per te",
      PT: "Encontre o carro perfeito para você",
      RO: "Găsiți mașina perfectă pentru dvs."
    },
    heroDescription: {
      FR: "Des milliers de véhicules d'occasion vérifiés et garantis",
      EN: "Thousands of verified and guaranteed used vehicles",
      ES: "Miles de vehículos usados verificados y garantizados",
      IT: "Migliaia di veicoli usati verificati e garantiti",
      PT: "Milhares de veículos usados verificados e garantidos",
      RO: "Mii de vehicule second-hand verificate și garantate"
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand"
    }
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden py-12">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')" 
        }}
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {translate('heroTitle', translations.heroTitle)}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-100">
            {translate('heroDescription', translations.heroDescription)}
          </p>
          
          {/* Call to action button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/vehicules/occasion">
              <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-6 py-3 rounded-md font-semibold text-lg">
                {translate('usedVehicles', translations.usedVehicles)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
