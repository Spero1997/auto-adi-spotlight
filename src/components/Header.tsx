import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Car, ShoppingCart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import VerticalMarquee from './VerticalMarquee';

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { language, setLanguage, translate } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleNavigation = (path: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    navigate(path);
  };

  const languageNames: Record<Language, string> = {
    'FR': 'Français',
    'EN': 'English',
    'ES': 'Español',
    'IT': 'Italiano',
    'PT': 'Português',
    'RO': 'Română'
  };

  const languageFlags: Record<Language, string> = {
    'FR': '🇫🇷',
    'EN': '🇬🇧',
    'ES': '🇪🇸',
    'IT': '🇮🇹',
    'PT': '🇵🇹',
    'RO': '🇷🇴'
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    
    const messages: Record<Language, string> = {
      'FR': 'Le site est maintenant en Français',
      'EN': 'The site is now in English',
      'ES': 'El sitio ahora está en Español',
      'IT': 'Il sito è ora in Italiano',
      'PT': 'O site agora está em Português',
      'RO': 'Site-ul este acum în Română'
    };
    
    toast({
      title: languageNames[lang],
      description: messages[lang],
    });
  };

  const handleCartClick = () => {
    const cartMessages: Record<Language, string> = {
      'FR': 'Votre panier est actuellement vide.',
      'EN': 'Your cart is currently empty.',
      'ES': 'Tu carrito está actualmente vacío.',
      'IT': 'Il tuo carrello è attualmente vuoto.',
      'PT': 'O seu carrinho está atualmente vazio.',
      'RO': 'Coșul tău este momentan gol.'
    };
    
    toast({
      title: cartMessages[language].includes('cart') ? 'Cart' : 
             cartMessages[language].includes('carrito') ? 'Carrito' :
             cartMessages[language].includes('carrello') ? 'Carrello' :
             cartMessages[language].includes('coșul') ? 'Coș' : 'Panier',
      description: cartMessages[language],
    });
  };

  const menuTranslations: Record<string, Record<Language, string>> = {
    'vehicles': {
      'FR': 'Véhicules',
      'EN': 'Vehicles',
      'ES': 'Vehículos',
      'IT': 'Veicoli',
      'PT': 'Veículos',
      'RO': 'Vehicule'
    },
    'usedVehicles': {
      'FR': 'Véhicules d\'occasion',
      'EN': 'Used vehicles',
      'ES': 'Vehículos usados',
      'IT': 'Veicoli usati',
      'PT': 'Veículos usados',
      'RO': 'Vehicule uzate'
    },
    'commercialVehicles': {
      'FR': 'Véhicules utilitaires',
      'EN': 'Commercial vehicles',
      'ES': 'Vehículos comerciales',
      'IT': 'Veicoli commerciali',
      'PT': 'Veículos comerciais',
      'RO': 'Vehicule comerciale'
    },
    'services': {
      'FR': 'Services',
      'EN': 'Services',
      'ES': 'Servicios',
      'IT': 'Servizi',
      'PT': 'Serviços',
      'RO': 'Servicii'
    },
    'financing': {
      'FR': 'Financement',
      'EN': 'Financing',
      'ES': 'Financiamiento',
      'IT': 'Finanziamento',
      'PT': 'Financiamento',
      'RO': 'Finanțare'
    },
    'buyback': {
      'FR': 'Rachat de votre véhicule',
      'EN': 'Vehicle trade-in',
      'ES': 'Recompra de su vehículo',
      'IT': 'Riacquisto del tuo veicolo',
      'PT': 'Recompra do seu veículo',
      'RO': 'Răscumpărarea vehiculului'
    },
    'about': {
      'FR': 'À propos',
      'EN': 'About',
      'ES': 'Acerca de',
      'IT': 'Chi siamo',
      'PT': 'Sobre nós',
      'RO': 'Despre noi'
    },
    'language': {
      'FR': 'Langue',
      'EN': 'Language',
      'ES': 'Idioma',
      'IT': 'Lingua',
      'PT': 'Idioma',
      'RO': 'Limbă'
    },
    'cart': {
      'FR': 'Panier',
      'EN': 'Cart',
      'ES': 'Carrito',
      'IT': 'Carrello',
      'PT': 'Carrinho',
      'RO': 'Coș'
    }
  };

  return (
    <header className={cn(
      "w-full bg-white sticky top-0 z-50 transition-all duration-300", 
      isScrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container px-4 mx-auto">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center"
            >
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-12"
              />
            </button>
            
            <div className="hidden md:block h-[60px] w-[250px] border-l border-gray-200 pl-4">
              <VerticalMarquee />
            </div>
          </div>

          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    luxurious
                    className="text-base"
                    onClick={() => {}}
                  >
                    {translate('vehicles', menuTranslations.vehicles)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                      <div 
                        onClick={() => handleNavigation('/vehicules/occasion')}
                        className="flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue">
                          <Car className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {translate('usedVehicles', menuTranslations.usedVehicles)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Trouvez votre prochain véhicule d'occasion
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleNavigation('/vehicules/utilitaires')}
                        className="flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-orange/10 text-brand-orange">
                          <Car className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {translate('commercialVehicles', menuTranslations.commercialVehicles)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Solutions pour les professionnels
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center bg-transparent px-5 py-3 text-base text-gray-800 hover:text-brand-blue font-medium transition-all duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-blue after:transition-transform after:duration-300",
                      "hover:after:origin-bottom-left hover:after:scale-x-100"
                    )}
                  >
                    <button onClick={() => handleNavigation('/services')}>
                      {translate('services', menuTranslations.services)}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center bg-transparent px-5 py-3 text-base text-gray-800 hover:text-brand-blue font-medium transition-all duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-blue after:transition-transform after:duration-300",
                      "hover:after:origin-bottom-left hover:after:scale-x-100"
                    )}
                  >
                    <button onClick={() => handleNavigation('/financement')}>
                      {translate('financing', menuTranslations.financing)}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center bg-transparent px-5 py-3 text-base text-gray-800 hover:text-brand-blue font-medium transition-all duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-blue after:transition-transform after:duration-300",
                      "hover:after:origin-bottom-left hover:after:scale-x-100"
                    )}
                  >
                    <button onClick={() => handleNavigation('/rachat')}>
                      {translate('buyback', menuTranslations.buyback)}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center bg-transparent px-5 py-3 text-base text-gray-800 hover:text-brand-blue font-medium transition-all duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-blue after:transition-transform after:duration-300",
                      "hover:after:origin-bottom-left hover:after:scale-x-100"
                    )}
                  >
                    <button onClick={() => handleNavigation('/a-propos')}>
                      {translate('about', menuTranslations.about)}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center border-gray-300 hover:bg-gray-50 hover:text-brand-blue transition-colors"
                >
                  <Globe className="h-4 w-4 mr-1" /> {languageFlags[language]} {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] p-2">
                <div className="grid grid-cols-2 gap-1">
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('FR')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇫🇷 Français</span>
                    {language === 'FR' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('EN')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇬🇧 English</span>
                    {language === 'EN' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('ES')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇪🇸 Español</span>
                    {language === 'ES' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('IT')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇮🇹 Italiano</span>
                    {language === 'IT' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('PT')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇵🇹 Português</span>
                    {language === 'PT' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={() => handleLanguageChange('RO')}
                    className="flex items-center justify-between hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span>🇷🇴 Română</span>
                    {language === 'RO' && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue"></span>}
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center border-gray-300 relative hover:bg-gray-50 hover:text-brand-blue transition-colors"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> 
              {translate('cart', menuTranslations.cart)}
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            <Button 
              variant="default" 
              size="sm"
              className="bg-brand-blue hover:bg-brand-darkBlue text-white"
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <div className="h-[40px] w-[180px] overflow-hidden border-l border-gray-200 pl-2 mr-2">
              <VerticalMarquee />
            </div>
            
            <Button 
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-800 hover:text-brand-blue focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </div>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={() => handleNavigation('/')} className="flex items-center">
            <img 
              src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
              alt="Auto Adi" 
              className="h-10"
            />
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-800 hover:text-brand-blue focus:outline-none"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            <div>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => toggleDropdown('vehicles-mobile')}
                aria-expanded={activeDropdown === 'vehicles-mobile'}
                aria-haspopup="true"
              >
                <span className="flex items-center">
                  <Car className="mr-3 h-5 w-5 text-brand-blue" />
                  {translate('vehicles', menuTranslations.vehicles)}
                </span>
                <ChevronDown className="h-5 w-5" />
              </Button>
              {activeDropdown === 'vehicles-mobile' && (
                <div className="pl-10 mt-1 space-y-1">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/vehicules/occasion')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/vehicules/utilitaires')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('commercialVehicles', menuTranslations.commercialVehicles)}
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/services')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {translate('services', menuTranslations.services)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/financement')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {translate('financing', menuTranslations.financing)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/rachat')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {translate('buyback', menuTranslations.buyback)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/a-propos')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {translate('about', menuTranslations.about)}
            </Button>

            <div>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => toggleDropdown('language-mobile')}
                aria-expanded={activeDropdown === 'language-mobile'}
                aria-haspopup="true"
              >
                <span className="flex items-center">
                  <Globe className="mr-3 h-5 w-5 text-brand-blue" />
                  {translate('language', menuTranslations.language)} ({languageFlags[language]})
                </span>
                <ChevronDown className="h-5 w-5" />
              </Button>
              {activeDropdown === 'language-mobile' && (
                <div className="pl-10 mt-1 space-y-1">
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('FR')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇫🇷 Français
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('EN')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇬🇧 English
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('ES')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇪🇸 Español
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('IT')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇮🇹 Italiano
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('PT')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇵🇹 Português
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('RO')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇷🇴 Română
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
