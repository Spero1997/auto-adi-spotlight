
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Car, ShoppingCart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

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

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage as Language);
    }
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
    }
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container px-4 mx-auto">
        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
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

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
                >
                  {getTranslation('vehicles', currentLanguage, menuTranslations)} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/occasion')}>
                  {getTranslation('usedVehicles', currentLanguage, menuTranslations)}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/utilitaires')}>
                  {getTranslation('commercialVehicles', currentLanguage, menuTranslations)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/services')}
            >
              {getTranslation('services', currentLanguage, menuTranslations)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/financement')}
            >
              {getTranslation('financing', currentLanguage, menuTranslations)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/rachat')}
            >
              {getTranslation('buyback', currentLanguage, menuTranslations)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/a-propos')}
            >
              {getTranslation('about', currentLanguage, menuTranslations)}
            </Button>
          </div>

          {/* Cart and Language buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center border-gray-300"
                >
                  <Globe className="h-4 w-4 mr-1" /> {languageFlags[currentLanguage]} {currentLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
            
            {/* Cart Button */}
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center border-gray-300 relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> 
              {getTranslation('cart', currentLanguage, menuTranslations)}
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Cart Button (Mobile) */}
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

            {/* Langue (Mobile) */}
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
                  {getTranslation('language', currentLanguage, menuTranslations)} ({languageFlags[currentLanguage]})
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

