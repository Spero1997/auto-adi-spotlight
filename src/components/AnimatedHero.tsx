import { useState, useEffect } from 'react';
import { ChevronDown, Search, Globe, Phone, Menu, X } from 'lucide-react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import MobileLanguageSelector from './header/MobileLanguageSelector';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from 'framer-motion';

const mainLinks = [
  { href: '/services', labelKey: 'services' },
  { href: '/vehicules/occasion', labelKey: 'usedVehicles' },
  { href: '/financement', labelKey: 'financing' },
  { href: '/rachat', labelKey: 'buyback' },
  { href: '/a-propos', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

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
  
  const logoURL = "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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
    language: {
      FR: "Langue",
      EN: "Language",
      ES: "Idioma",
      IT: "Lingua",
      PT: "Idioma",
      RO: "Limbă"
    },
    allVehicles: {
      FR: "Tous nos véhicules",
      EN: "All our vehicles",
      ES: "Todos nuestros vehículos",
      IT: "Tutti i nostri veicoli",
      PT: "Todos os nossos veículos",
      RO: "Toate vehiculele noastre"
    },
    allVehiclesDescription: {
      FR: "Découvrez notre sélection complète de véhicules neufs et d'occasion",
      EN: "Discover our complete selection of new and used vehicles",
      ES: "Descubra nuestra selección completa de vehículos nuevos y usados",
      IT: "Scopri la nostra selezione completa di veicoli nuovi e usati",
      PT: "Descubra a nossa seleção completa de veículos novos e usados",
      RO: "Descoperiți selecția noastră completă de vehicule noi și second-hand"
    },
    newVehicles: {
      FR: "Véhicules neufs",
      EN: "New vehicles",
      ES: "Vehículos nuevos",
      IT: "Veicoli nuovi",
      PT: "Veículos novos",
      RO: "Vehicule noi"
    },
    newVehiclesDescription: {
      FR: "Les derniers modèles disponibles",
      EN: "The latest models available",
      ES: "Los últimos modelos disponibles",
      IT: "Gli ultimi modelli disponibili",
      PT: "Os últimos modelos disponíveis",
      RO: "Ultimele modele disponibile"
    },
    usedVehiclesTitle: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos de ocasión",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand"
    },
    usedVehiclesDescription: {
      FR: "Véhicules d'occasion certifiés et garantis",
      EN: "Certified and guaranteed used vehicles",
      ES: "Vehículos de ocasión certificados y garantizados",
      IT: "Veicoli usati certificati e garantiti",
      PT: "Veículos usados certificados e garantidos",
      RO: "Vehicule second-hand certificate și garantate"
    },
    commercialVehicles: {
      FR: "Utilitaires",
      EN: "Commercial vehicles",
      ES: "Vehículos comerciales",
      IT: "Veicoli commerciali",
      PT: "Veículos comerciais",
      RO: "Vehicule comerciale"
    },
    commercialVehiclesDescription: {
      FR: "Véhicules utilitaires pour professionnels",
      EN: "Commercial vehicles for professionals",
      ES: "Vehículos comerciales para profesionales",
      IT: "Veicoli commerciali per professionisti",
      PT: "Veículos comerciais para profissionais",
      RO: "Vehicule comerciale pentru profesioniști"
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-brand-blue to-brand-darkBlue">
        <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat hero-background-animate">
          <div className="absolute inset-0 bg-black/70 z-1"></div>
        </div>
        
        <div className={`fixed top-0 left-0 w-full z-30 py-3 transition-colors duration-300 ${scrolled ? 'bg-brand-blue/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-3 flex justify-between items-center">
            <Link to="/" className="flex-shrink-0">
              <img 
                src={logoURL} 
                alt="Auto ADI Monaco" 
                className="h-12 md:h-14"
              />
            </Link>
            
            <div className="hidden md:flex space-x-4 text-white">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-montserrat font-light hover:text-white hover:bg-transparent ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      Véhicules
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li>
                          <Link
                            to="/vehicules"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            {translate('allVehicles', translations.allVehicles)}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/vehicules/occasion"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            {translate('usedVehiclesTitle', translations.usedVehiclesTitle)}
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-montserrat font-light hover:text-white hover:bg-transparent ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      {translate('services', translations.services)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px]">
                        <li>
                          <Link
                            to="/services"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            Nos services
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/financement"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            Financement
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link 
                to="/contact"
                className="font-montserrat font-light tracking-wide px-5 py-1.5 border border-transparent rounded-md transition-all duration-300 hover:border-white/40"
              >
                {translate('contact', translations.contact)}
              </Link>
              
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
            
            <div className="flex md:hidden">
              <MobileLanguageSelector />
              
              <button
                onClick={toggleMenu}
                className="p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="text-white" />
                ) : (
                  <Menu className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20 mt-16 bg-brand-blue/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 pt-6 pb-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  <div className="border-b border-white/20 pb-4">
                    <Link
                      to="/vehicules"
                      className="block py-3 text-white font-montserrat text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {translate('allVehicles', translations.allVehicles)}
                    </Link>
                    <Link
                      to="/vehicules/occasion"
                      className="block py-3 text-white font-montserrat text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {translate('usedVehiclesTitle', translations.usedVehiclesTitle)}
                    </Link>
                  </div>
                  
                  <div className="border-b border-white/20 pb-4">
                    <Link
                      to="/services"
                      className="block py-3 text-white font-montserrat text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Nos services
                    </Link>
                    <Link
                      to="/garantie"
                      className="block py-2 text-white/90 font-montserrat text-base pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Garanties
                    </Link>
                    <Link
                      to="/livraison"
                      className="block py-2 text-white/90 font-montserrat text-base pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Livraison
                    </Link>
                    <Link
                      to="/rachat"
                      className="block py-2 text-white/90 font-montserrat text-base pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Rachat de véhicules
                    </Link>
                    <Link
                      to="/financement"
                      className="block py-3 text-white font-montserrat text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Financement
                    </Link>
                  </div>
                  
                  <div className="border-b border-white/20 pb-4">
                    <Link
                      to="/contact"
                      className="block py-3 text-white font-montserrat text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {translate('contact', translations.contact)}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10 px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-4 drop-shadow-lg animate-fade-in">
              {translate('welcomeHeader', translations.welcomeHeader)}
            </h1>
            <p className="font-montserrat text-lg md:text-xl text-white mb-6 max-w-2xl mx-auto drop-shadow-md">
              {translate('welcomeSubtext', translations.welcomeSubtext)}
            </p>
          </div>
          
          <div className="w-full max-w-4xl mx-auto animate-fade-in animation-delay-300">
            <QuickSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedHero;
