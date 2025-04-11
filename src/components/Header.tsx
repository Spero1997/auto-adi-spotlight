import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Car, ShoppingCart, Globe, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
  
  const { language, setLanguage, translate } = useLanguage();

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
    },
    'legalInfo': {
      'FR': 'Informations légales',
      'EN': 'Legal information',
      'ES': 'Información legal',
      'IT': 'Informazioni legali',
      'PT': 'Informações legais',
      'RO': 'Informații legale'
    },
    'legalNotice': {
      'FR': 'Mentions légales',
      'EN': 'Legal notice',
      'ES': 'Avisos legales',
      'IT': 'Note legali',
      'PT': 'Avisos legales',
      'RO': 'Mențiuni legale'
    },
    'privacyPolicy': {
      'FR': 'Politique de confidentialité',
      'EN': 'Privacy policy',
      'ES': 'Política de privacidad',
      'IT': 'Politica sulla privacy',
      'PT': 'Política de privacidade',
      'RO': 'Politica de confidențialitate'
    },
    'cookieManagement': {
      'FR': 'Gestion des cookies',
      'EN': 'Cookie management',
      'ES': 'Gestión de cookies',
      'IT': 'Gestione dei cookie',
      'PT': 'Gestão de cookies',
      'RO': 'Gestionarea cookie-urilor'
    },
    'termsAndConditions': {
      'FR': 'CGV',
      'EN': 'Terms and conditions',
      'ES': 'Términos y condiciones',
      'IT': 'Termini e condizioni',
      'PT': 'Termos e condições',
      'RO': 'Termeni și condiții'
    },
    'saleConditions': {
      'FR': 'Conditions de vente',
      'EN': 'Sale conditions',
      'ES': 'Condiciones de venta',
      'IT': 'Condizioni di vendita',
      'PT': 'Condições de venda',
      'RO': 'Condiții de vânzare'
    }
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
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
            
            {/* Vertical Marquee */}
            <div className="hidden md:block h-[60px] w-[250px] border-l border-gray-200 pl-4">
              <VerticalMarquee />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
                >
                  {translate('vehicles', menuTranslations.vehicles)} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/occasion')}>
                  {translate('usedVehicles', menuTranslations.usedVehicles)}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/utilitaires')}>
                  {translate('commercialVehicles', menuTranslations.commercialVehicles)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/services')}
            >
              {translate('services', menuTranslations.services)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/financement')}
            >
              {translate('financing', menuTranslations.financing)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/rachat')}
            >
              {translate('buyback', menuTranslations.buyback)}
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/a-propos')}
            >
              {translate('about', menuTranslations.about)}
            </Button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center border-gray-300"
                >
                  <Globe className="h-4 w-4 mr-1" /> {languageFlags[language]} {language}
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
            
            <Button 
              variant="outline"
              size="sm"
              className="flex items-center border-gray-300 relative"
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
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Marquee */}
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

        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
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

            {/* Legal Information Dropdown */}
            <div>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => toggleDropdown('legal-mobile')}
                aria-expanded={activeDropdown === 'legal-mobile'}
                aria-haspopup="true"
              >
                <span className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-brand-blue" />
                  {translate('legalInfo', menuTranslations.legalInfo)}
                </span>
                <ChevronDown className="h-5 w-5" />
              </Button>
              {activeDropdown === 'legal-mobile' && (
                <div className="pl-10 mt-1 space-y-1">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/mentions-legales')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('legalNotice', menuTranslations.legalNotice)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/politique-confidentialite')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('privacyPolicy', menuTranslations.privacyPolicy)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/cookies')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('cookieManagement', menuTranslations.cookieManagement)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/cgv')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('termsAndConditions', menuTranslations.termsAndConditions)}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/conditions')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    {translate('saleConditions', menuTranslations.saleConditions)}
                  </Button>
                </div>
              )}
            </div>

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
