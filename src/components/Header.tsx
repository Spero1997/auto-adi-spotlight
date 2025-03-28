
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Car, ShoppingCart, Globe, Truck, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export type Language = 'FR' | 'EN' | 'ES' | 'IT' | 'PT' | 'RO';

// Create a context to manage language state throughout the app
export const getTranslation = (
  key: string, 
  language: Language,
  translations: Record<string, Record<Language, string>>
) => {
  return translations[key]?.[language] || translations[key]?.['FR'] || key;
};

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('FR');
  const [isScrolled, setIsScrolled] = useState(false);

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage as Language);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set initial value
    handleScroll();

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
    // Fermer le menu mobile si ouvert
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Naviguer vers la page
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
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    
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
      title: cartMessages[currentLanguage].includes('cart') ? 'Cart' : 
             cartMessages[currentLanguage].includes('carrito') ? 'Carrito' :
             cartMessages[currentLanguage].includes('carrello') ? 'Carrello' :
             cartMessages[currentLanguage].includes('coșul') ? 'Coș' : 'Panier',
      description: cartMessages[currentLanguage],
    });
  };

  // Translations for menu items
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
    },
    'contact': {
      'FR': 'Contact',
      'EN': 'Contact',
      'ES': 'Contacto',
      'IT': 'Contatto',
      'PT': 'Contato',
      'RO': 'Contact'
    }
  };

  // Translation for top info bar
  const infoTranslations: Record<Language, { 
    location: string,
    phone: string,
    promotion: string
  }> = {
    'FR': { 
      location: 'Notre showroom', 
      phone: 'Appelez-nous', 
      promotion: 'Livraison gratuite à partir de 500 Dh'
    },
    'EN': { 
      location: 'Our showroom', 
      phone: 'Call us', 
      promotion: 'Free shipping from 500 Dh'
    },
    'ES': { 
      location: 'Nuestro showroom', 
      phone: 'Llámanos', 
      promotion: 'Envío gratis a partir de 500 Dh'
    },
    'IT': { 
      location: 'Il nostro showroom', 
      phone: 'Chiamaci', 
      promotion: 'Spedizione gratuita da 500 Dh'
    },
    'PT': { 
      location: 'Nosso showroom', 
      phone: 'Ligue para nós', 
      promotion: 'Envio gratuito a partir de 500 Dh'
    },
    'RO': { 
      location: 'Showroom-ul nostru', 
      phone: 'Sunați-ne', 
      promotion: 'Livrare gratuită de la 500 Dh'
    }
  };

  return (
    <header className={cn(
      "w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-transparent"
    )}>
      {/* Top info bar */}
      <div className="w-full bg-brand-blue text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">
                {infoTranslations[currentLanguage].location}: Casa, Maroc
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">
                {infoTranslations[currentLanguage].phone}: +212 522 000 000
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span className="text-sm">
                {infoTranslations[currentLanguage].promotion}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:text-white/80 p-0"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="text-sm">{languageFlags[currentLanguage]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuItem onSelect={() => handleLanguageChange('FR')}>
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('EN')}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('ES')}>
                  🇪🇸 Español
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('IT')}>
                  🇮🇹 Italiano
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('PT')}>
                  🇵🇹 Português
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('RO')}>
                  🇷🇴 Română
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className={cn(
        "w-full transition-colors duration-300", 
        isScrolled ? "bg-white" : "bg-white/90 backdrop-blur-sm"
      )}>
        <div className="container px-4 mx-auto">
          {/* Main navigation */}
          <nav className="flex justify-between items-center py-4">
            {/* Logo */}
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center"
            >
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-10 md:h-12"
              />
            </button>

            {/* Desktop navigation links */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/vehicules/occasion')}
              >
                {getTranslation('vehicles', currentLanguage, menuTranslations)}
              </Button>

              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/services')}
              >
                {getTranslation('services', currentLanguage, menuTranslations)}
              </Button>

              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/financement')}
              >
                {getTranslation('financing', currentLanguage, menuTranslations)}
              </Button>

              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/rachat')}
              >
                {getTranslation('buyback', currentLanguage, menuTranslations)}
              </Button>

              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/a-propos')}
              >
                {getTranslation('about', currentLanguage, menuTranslations)}
              </Button>
              
              <Button 
                variant="ghost" 
                className="px-2 py-2 text-gray-800 hover:text-brand-blue font-medium"
                onClick={() => handleNavigation('/contact')}
              >
                {getTranslation('contact', currentLanguage, menuTranslations)}
              </Button>
            </div>

            {/* Search, Cart, hamburger (Right side) */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/search')}
                className="text-gray-800 hover:text-brand-blue"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Cart Button */}
              <Button 
                variant="ghost"
                size="icon"
                className="text-gray-800 hover:text-brand-blue relative"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-5 w-5" /> 
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
              
              {/* Mobile menu button */}
              <div className="lg:hidden">
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
              
              {/* Contact button on desktop */}
              <div className="hidden lg:block">
                <Button 
                  className="bg-brand-orange hover:bg-brand-lightOrange text-white"
                  onClick={() => handleNavigation('/contact')}
                >
                  Contactez-nous
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
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
                  {getTranslation('vehicles', currentLanguage, menuTranslations)}
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
                    {getTranslation('usedVehicles', currentLanguage, menuTranslations)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/vehicules/utilitaires')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {getTranslation('commercialVehicles', currentLanguage, menuTranslations)}
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/services')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {getTranslation('services', currentLanguage, menuTranslations)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/financement')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {getTranslation('financing', currentLanguage, menuTranslations)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/rachat')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {getTranslation('buyback', currentLanguage, menuTranslations)}
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/a-propos')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {getTranslation('about', currentLanguage, menuTranslations)}
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/contact')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {getTranslation('contact', currentLanguage, menuTranslations)}
            </Button>

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 py-2">
                <MapPin className="h-5 w-5 text-brand-blue" />
                <span className="text-sm">Casa, Maroc</span>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <Phone className="h-5 w-5 text-brand-blue" />
                <span className="text-sm">+212 522 000 000</span>
              </div>
              
              {/* Language selector (Mobile) */}
              <div className="mt-4">
                <div
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700"
                >
                  <Globe className="mr-3 h-5 w-5 text-brand-blue" />
                  {getTranslation('language', currentLanguage, menuTranslations)} ({languageFlags[currentLanguage]})
                </div>
                <div className="pl-10 mt-1 space-y-1 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('FR')}
                    className="text-xs"
                  >
                    🇫🇷 FR
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('EN')}
                    className="text-xs"
                  >
                    🇬🇧 EN
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('ES')}
                    className="text-xs"
                  >
                    🇪🇸 ES
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('IT')}
                    className="text-xs"
                  >
                    🇮🇹 IT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('PT')}
                    className="text-xs"
                  >
                    🇵🇹 PT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLanguageChange('RO')}
                    className="text-xs"
                  >
                    🇷🇴 RO
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
