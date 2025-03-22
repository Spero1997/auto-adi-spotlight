
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedHero = () => {
  const { translate } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const handleShopClick = () => {
    toast.success("Boutique en ligne bientôt disponible !");
    console.log('Shop clicked');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`animated-header relative ${isMobile ? 'h-[380px]' : 'h-[500px] md:h-[600px]'}`}>
      <div className="animated-header-background"></div>
      
      {/* Navbar superposée */}
      <div className="absolute top-0 left-0 w-full z-10 py-3">
        <div className="container mx-auto px-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
              alt="Auto Adi" 
              className={`${isMobile ? 'h-8' : 'h-12'}`}
            />
          </Link>
          
          {/* Boutons de droite */}
          <div className="flex items-center gap-1">
            {/* Bouton Shop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
              onClick={handleShopClick}
            >
              <ShoppingCart className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </Button>
            
            {/* Bouton Menu avec dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
                >
                  {mobileMenuOpen ? 
                    <X className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} /> : 
                    <Menu className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 bg-white/95 backdrop-blur-md border-none shadow-lg rounded-lg">
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/" className="w-full font-medium">Accueil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/vehicules/occasion" className="w-full font-medium">Véhicules d'occasion</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/services" className="w-full font-medium">Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/financement" className="w-full font-medium">Financement</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/a-propos" className="w-full font-medium">À propos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-2">
                  <Link to="/contact" className="w-full font-medium">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="relative z-3 container mx-auto px-3 flex flex-col items-center justify-center h-full">
        <h1 className={`animated-header-title ${isMobile ? 'text-2xl mb-5' : 'text-5xl md:text-6xl mb-8'}`}>
          Bienvenue chez Auto ADI
        </h1>
        
        {/* Bouton Véhicules d'occasion - Amélioration de la lisibilité */}
        <Link to="/vehicules/occasion">
          <Button className={`bg-[#FF9752] hover:bg-[#FF8030] transition-all duration-300
                             ${isMobile ? 'px-4 py-2 text-base' : 'px-6 py-4 text-xl'} 
                             rounded-md font-bold shadow-lg shadow-black/30 pulse-animation 
                             transform hover:scale-105 border-2 border-white text-white`}>
            {translate('usedVehicles', translations.usedVehicles)}
          </Button>
        </Link>
      </div>
      
      {/* QuickSearch maintenant placé en bas du header */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20">
        <div className="container mx-auto">
          <div id="quick-search-container"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHero;
