
import { useState } from 'react';
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

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('FR');

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

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    toast({
      title: "Langue modifiée",
      description: `Le site est maintenant en ${lang === 'FR' ? 'Français' : lang === 'EN' ? 'Anglais' : lang === 'DE' ? 'Allemand' : 'Espagnol'}`,
    });
  };

  const handleCartClick = () => {
    toast({
      title: "Panier",
      description: "Votre panier est actuellement vide.",
    });
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
                  Véhicules <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/occasion')}>
                  Véhicules d'occasion
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/vehicules/utilitaires')}>
                  Véhicules utilitaires
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/services')}
            >
              Services
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/financement')}
            >
              Financement
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/rachat')}
            >
              Rachat de votre véhicule
            </Button>

            <Button 
              variant="ghost" 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
              onClick={() => handleNavigation('/a-propos')}
            >
              À propos
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
                  <Globe className="h-4 w-4 mr-1" /> {currentLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleLanguageChange('FR')}>
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('EN')}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('DE')}>
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleLanguageChange('ES')}>
                  🇪🇸 Español
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
              Panier
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
                  Véhicules
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
                    Véhicules d'occasion
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/vehicules/utilitaires')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Véhicules utilitaires
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/services')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Services
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/financement')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Financement
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/rachat')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Rachat de votre véhicule
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/a-propos')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              À propos
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
                  Langue ({currentLanguage})
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
                    onClick={() => handleLanguageChange('DE')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇩🇪 Deutsch
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLanguageChange('ES')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    🇪🇸 Español
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
