
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const AnimatedHero = () => {
  const { translate } = useLanguage();

  // Traductions pour le bouton
  const translations = {
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
    <div className="animated-header relative">
      <div className="animated-header-background"></div>
      
      {/* Navbar superposée */}
      <div className="absolute top-0 left-0 w-full z-10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
              alt="Auto Adi" 
              className="h-12"
            />
          </Link>
          
          {/* Boutons de droite */}
          <div className="flex items-center gap-4">
            {/* Bouton Shop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
              onClick={() => console.log('Shop clicked')}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Bouton Menu */}
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative z-3 container mx-auto px-4 flex flex-col items-center">
        <h1 className="animated-header-title mb-16">Bienvenue chez Auto ADI</h1>
        
        {/* Bouton Véhicules d'occasion */}
        <Link to="/vehicules/occasion">
          <Button className="bg-brand-orange hover:bg-brand-lightOrange transition-colors text-white px-8 py-3 rounded-md font-semibold text-lg mt-8">
            {translate('usedVehicles', translations.usedVehicles)}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AnimatedHero;
