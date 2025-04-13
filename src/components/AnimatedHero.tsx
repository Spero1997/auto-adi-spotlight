
import { useState, useEffect } from 'react';
import { ChevronDown, Search, Globe, Phone } from 'lucide-react';
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
    },
    // Traductions pour les sous-menus de véhicules
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
              {/* Menu déroulant pour les véhicules */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-montserrat font-light text-white hover:text-white hover:bg-transparent ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      Véhicules
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                              to="/vehicules"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium text-white">
                                {translate('allVehicles', translations.allVehicles)}
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                {translate('allVehiclesDescription', translations.allVehiclesDescription)}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link
                            to="/vehicules/neufs"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">
                              {translate('newVehicles', translations.newVehicles)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {translate('newVehiclesDescription', translations.newVehiclesDescription)}
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/vehicules/occasion"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">
                              {translate('usedVehiclesTitle', translations.usedVehiclesTitle)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {translate('usedVehiclesDescription', translations.usedVehiclesDescription)}
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/vehicules/utilitaires"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">
                              {translate('commercialVehicles', translations.commercialVehicles)}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {translate('commercialVehiclesDescription', translations.commercialVehiclesDescription)}
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Menu déroulant pour les services */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`font-montserrat font-light text-white hover:text-white hover:bg-transparent ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                      {translate('services', translations.services)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li>
                          <Link
                            to="/services"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">Nos services</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Découvrez tous nos services automobiles
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/financement"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">Financement</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Solutions de financement adaptées
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/garantie"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">Garantie</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Nos garanties sur tous les véhicules
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/livraison"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">Livraison</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Livraison partout en Europe
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/rachat"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                          >
                            <div className="text-sm font-medium leading-none">Rachat de véhicule</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Vendez votre véhicule rapidement
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Lien simple pour À propos */}
              <Link 
                to="/a-propos"
                className="font-montserrat font-light tracking-wide px-5 py-1.5 border border-transparent rounded-md transition-all duration-300 hover:border-white/40 hover:shadow-sm"
              >
                {translate('about', translations.about)}
              </Link>

              {/* Lien simple pour Contact */}
              <Link 
                to="/contact"
                className="font-montserrat font-light tracking-wide px-5 py-1.5 border border-transparent rounded-md transition-all duration-300 hover:border-white/40 hover:shadow-sm"
              >
                {translate('contact', translations.contact)}
              </Link>
              
              {/* Lien téléphone */}
              <a
                href="tel:+33123456789"
                className="flex items-center gap-2 font-medium transition-colors font-montserrat font-light"
              >
                <Phone className="h-5 w-5" />
                <span className="hidden xl:inline">+33 1 23 45 67 89</span>
              </a>
              
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
                    {/* Ajouter les liens de véhicules pour mobile */}
                    <div className="py-3 px-4 text-white border-b border-white/10">
                      <div className="font-montserrat font-semibold mb-2">Véhicules</div>
                      <Link 
                        to="/vehicules" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Tous nos véhicules
                      </Link>
                      <Link 
                        to="/vehicules/neufs" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Véhicules neufs
                      </Link>
                      <Link 
                        to="/vehicules/occasion" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Véhicules d'occasion
                      </Link>
                      <Link 
                        to="/vehicules/utilitaires" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Utilitaires
                      </Link>
                    </div>
                    
                    {/* Sous-menu services pour mobile */}
                    <div className="py-3 px-4 text-white border-b border-white/10">
                      <div className="font-montserrat font-semibold mb-2">Services</div>
                      <Link 
                        to="/services" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Nos services
                      </Link>
                      <Link 
                        to="/financement" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Financement
                      </Link>
                      <Link 
                        to="/garantie" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Garantie
                      </Link>
                      <Link 
                        to="/livraison" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Livraison
                      </Link>
                      <Link 
                        to="/rachat" 
                        className="block py-2 hover:bg-brand-darkBlue/30 px-2 rounded"
                      >
                        Rachat de véhicule
                      </Link>
                    </div>
                    
                    {/* Autres liens principaux pour mobile */}
                    <Link 
                      to="/a-propos"
                      className="py-3 px-4 text-white font-montserrat font-light hover:bg-brand-darkBlue/80 rounded-sm"
                    >
                      {translate('about', translations.about)}
                    </Link>
                    
                    <Link 
                      to="/contact"
                      className="py-3 px-4 text-white font-montserrat font-light hover:bg-brand-darkBlue/80 rounded-sm"
                    >
                      {translate('contact', translations.contact)}
                    </Link>
                    
                    {/* Lien de téléphone pour mobile */}
                    <a
                      href="tel:+33123456789"
                      className="py-3 px-4 text-white font-montserrat font-semibold hover:bg-brand-darkBlue/80 rounded-sm flex items-center"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      +33 1 23 45 67 89
                    </a>
                    
                    {/* Option de langue pour mobile */}
                    <div className="py-3 px-4 text-white border-t border-white/10 mt-2">
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
