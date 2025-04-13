
import { useState, useEffect } from 'react';
import { ChevronDown, Search, Globe } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import QuickSearch from '@/components/QuickSearch';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const location = useLocation();
  const { language, setLanguage, translate } = useLanguage();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Use a logo from the public folder
  const logoURL = "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png";

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

  // Vérifier si un chemin est actif (pour le soulignement du menu actif)
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Traductions pour les liens du menu et le texte d'accueil
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
    },
    // Nouvelles traductions pour le texte de bienvenue
    welcomeHeader: {
      FR: "Bienvenue chez Auto ADI",
      EN: "Welcome to Auto ADI",
      ES: "Bienvenido a Auto ADI",
      IT: "Benvenuti in Auto ADI",
      PT: "Bem-vindo à Auto ADI",
      RO: "Bine ați venit la Auto ADI"
    },
    welcomeSubtext: {
      FR: "Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion de qualité",
      EN: "Your trusted partner for importing and selling quality used vehicles",
      ES: "Su socio de confianza para la importación y venta de vehículos usados de calidad",
      IT: "Il vostro partner affidabile per l'importazione e la vendita di veicoli usati di qualità",
      PT: "Seu parceiro confiável para importação e venda de veículos usados de qualidade",
      RO: "Partenerul dvs. de încredere pentru importul și vânzarea de vehicule rulate de calitate"
    },
    // Traduction pour le menu langue
    language: {
      FR: "Langue",
      EN: "Language",
      ES: "Idioma",
      IT: "Lingua",
      PT: "Idioma",
      RO: "Limbă"
    }
  };

  return (
    <>
      {/* Hero section avec fond animé pleine largeur/hauteur */}
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-brand-blue to-brand-darkBlue">
        {/* Animation en arrière-plan - utilisation d'un effet CSS pour l'animation */}
        <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat hero-background-animate">
          {/* Overlay semi-transparent pour améliorer le contraste et la lisibilité */}
          <div className="absolute inset-0 bg-black/70 z-1"></div>
        </div>
        
        {/* Navbar superposée - conserver la structure container mais pour la navbar uniquement */}
        <div className={`fixed top-0 left-0 w-full z-30 py-3 transition-colors duration-300 ${scrolled ? 'bg-brand-blue/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
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
            <div className="hidden md:flex space-x-4 text-white">
              {mainLinks.map((link, index) => {
                const isActiveLink = isActive(link.href);
                
                return (
                  <Link 
                    key={index}
                    to={link.href}
                    className={cn(
                      "font-montserrat font-light tracking-wide px-5 py-1.5 border border-transparent rounded-md transition-all duration-300",
                      isActiveLink 
                        ? "border-white/70 text-white" 
                        : "border-transparent hover:border-white/40 hover:shadow-sm"
                    )}
                  >
                    {translate(link.labelKey, translations[link.labelKey as keyof typeof translations])}
                  </Link>
                );
              })}
              
              {/* Menu déroulant pour la sélection de langue - desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-white font-montserrat font-light tracking-wide px-5 py-1.5 border border-transparent hover:border-white/40 rounded-md transition-all duration-300"
                  >
                    <Globe className="mr-1 h-4 w-4" />
                    {translate('language', translations.language)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-sm p-1 mt-1 w-40"
                >
                  <LanguageSwitcher />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Menu mobile - visible uniquement sur mobile */}
            <div className="flex md:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="text-white font-montserrat font-light tracking-wide border border-white/30 hover:border-white/70 px-4 py-1">
                    Menu <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-screen p-0 border-none bg-brand-blue/95 backdrop-blur-md">
                  <div className="flex flex-col p-3">
                    {mainLinks.map((link, index) => (
                      <Link 
                        key={index}
                        to={link.href}
                        className="py-3 px-4 text-white font-montserrat font-light hover:bg-brand-darkBlue/80 rounded-sm"
                      >
                        {translate(link.labelKey, translations[link.labelKey as keyof typeof translations])}
                      </Link>
                    ))}
                    
                    {/* Option de langue pour mobile */}
                    <div className="py-3 px-4 text-white">
                      <p className="mb-2 font-montserrat font-semibold">{translate('language', translations.language)}</p>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        {/* Contenu central du hero avec titre et QuickSearch superposés */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10 px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg animate-fade-in">
              {translate('welcomeHeader', translations.welcomeHeader)}
            </h1>
            <p className="font-montserrat text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
              {translate('welcomeSubtext', translations.welcomeSubtext)}
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
