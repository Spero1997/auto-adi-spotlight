
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

const AnimatedHero = () => {
  const { translate } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              onClick={handleShopClick}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            {/* Bouton Menu avec dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 bg-white/90 backdrop-blur-md border-none shadow-lg rounded-lg">
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/" className="w-full font-medium">Accueil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/vehicules/occasion" className="w-full font-medium">Véhicules d'occasion</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/services" className="w-full font-medium">Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/financement" className="w-full font-medium">Financement</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/a-propos" className="w-full font-medium">À propos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 py-3">
                  <Link to="/contact" className="w-full font-medium">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="relative z-3 container mx-auto px-4 flex flex-col items-center">
        <h1 className="animated-header-title mb-16">Bienvenue chez Auto ADI</h1>
        
        {/* Bouton Véhicules d'occasion plus visible */}
        <Link to="/vehicules/occasion">
          <Button className="bg-[#F97316] hover:bg-[#F97316]/80 transition-all duration-300 text-white px-8 py-6 rounded-md font-bold text-xl mt-8 shadow-lg shadow-[#F97316]/30 pulse-animation transform hover:scale-105">
            {translate('usedVehicles', translations.usedVehicles)}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AnimatedHero;
