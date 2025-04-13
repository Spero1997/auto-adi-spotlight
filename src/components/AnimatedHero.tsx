
import { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuickSearch from '@/components/QuickSearch';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import logoURL from '@/assets/auto-adi-monaco-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Liens du menu principal
const mainLinks = [
  { href: '/services', labelKey: 'services' },
  { href: '/vehicules/occasion', labelKey: 'usedVehicles' },
  { href: '/financement', labelKey: 'financing' },
  { href: '/rachat', labelKey: 'buyback' },
  { href: '/a-propos', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

// Liens secondaires (bas de page)
const secondaryLinks = [
  { href: '/mentions-legales', labelKey: 'legalNotice' },
  { href: '/politique-confidentialite', labelKey: 'privacyPolicy' },
  { href: '/cookies', labelKey: 'cookies' },
  { href: '/cgv', labelKey: 'termsOfSale' },
  { href: '/conditions', labelKey: 'terms' },
];

const AnimatedHero = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  // Détecter le défilement pour modifier le style du header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Traductions pour les liens du menu
  const translations = {
    services: {
      FR: "Services",
      EN: "Services",
      ES: "Servicios",
      IT: "Servizi",
      PT: "Serviços",
      RO: "Servicii"
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used Vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule rulate"
    },
    financing: {
      FR: "Financement",
      EN: "Financing",
      ES: "Financiación",
      IT: "Finanziamento",
      PT: "Financiamento",
      RO: "Finanțare"
    },
    buyback: {
      FR: "Rachat",
      EN: "Buyback",
      ES: "Recompra",
      IT: "Riacquisto",
      PT: "Recompra",
      RO: "Răscumpărare"
    },
    about: {
      FR: "À propos",
      EN: "About",
      ES: "Acerca de",
      IT: "Chi siamo",
      PT: "Sobre",
      RO: "Despre"
    },
    contact: {
      FR: "Contact",
      EN: "Contact",
      ES: "Contacto",
      IT: "Contatto",
      PT: "Contato",
      RO: "Contact"
    }
  };

  return (
    <>
      {/* Hero section avec fond animé pleine largeur/hauteur */}
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-gray-900/90 to-gray-800/90">
        {/* Animation en arrière-plan - utilisation d'un effet CSS pour l'animation */}
        <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat hero-background-animate">
          {/* Overlay semi-transparent pour améliorer le contraste et la lisibilité */}
          <div className="absolute inset-0 bg-black/60 z-1"></div>
        </div>
        
        {/* Navbar superposée - conserver la structure container mais pour la navbar uniquement */}
        <div className={`fixed top-0 left-0 w-full z-30 py-3 transition-colors duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-3 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logoURL} 
                alt="Auto ADI Monaco" 
                className="h-12 md:h-14"
              />
            </Link>
            
            {/* Menu de navigation - caché sur mobile */}
            <div className="hidden md:flex space-x-6 text-white">
              {mainLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.href}
                  className="text-white hover:text-brand-orange transition-colors font-medium"
                >
                  {translate(link.labelKey, translations[link.labelKey as keyof typeof translations])}
                </Link>
              ))}
            </div>
            
            {/* Menu mobile - visible uniquement sur mobile */}
            <div className="flex md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="text-white">
                    Menu <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-screen p-0 border-none bg-gray-900/95">
                  <div className="flex flex-col p-3">
                    {mainLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href}
                        className="py-3 px-4 text-white hover:bg-gray-800 rounded-md"
                      >
                        {translate(link.labelKey, translations[link.labelKey as keyof typeof translations])}
                      </Link>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Sélecteur de langue */}
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        
        {/* Contenu central du hero avec titre et QuickSearch superposés */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10 px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg animate-fade-in">
              Bienvenue chez Auto ADI
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
              Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité
            </p>
          </div>
          
          {/* QuickSearch intégré directement dans le hero */}
          <div className="w-full max-w-4xl mx-auto animate-fade-in animation-delay-300">
            <QuickSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedHero;
