
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export type Language = 'FR' | 'EN' | 'ES' | 'IT' | 'PT' | 'RO';

// Translation helper function
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('FR');
  const [cartItems, setCartItems] = useState(0);

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['FR', 'EN', 'ES', 'IT', 'PT', 'RO'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage as Language);
    }
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    navigate(path);
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

  return (
    <header className="w-full">
      {/* Top bar with rating */}
      <div className="w-full bg-black text-white py-2">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              <Star className="h-4 w-4 fill-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400" />
            </div>
            <span className="font-medium">4.8/5</span>
            <span className="mx-2">|</span>
            <span className="font-bold">+12.000</span>
            <span className="ml-1">clients satisfaits.</span>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className={cn(
        "w-full py-3 transition-all duration-300 z-50",
        isScrolled ? "bg-white shadow-md" : "bg-gray-500/70 text-white"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={cn(
                "lg:hidden p-2 rounded-md",
                isScrolled ? "text-gray-800" : "text-white"
              )}
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Logo */}
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center mx-auto lg:mx-0"
            >
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-10"
              />
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className={cn(
                  "px-3 py-2 font-medium",
                  isScrolled ? "text-gray-800 hover:text-brand-blue" : "text-white hover:text-gray-200"
                )}
                onClick={() => handleNavigation('/vehicules/occasion')}
              >
                Véhicules
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "px-3 py-2 font-medium",
                  isScrolled ? "text-gray-800 hover:text-brand-blue" : "text-white hover:text-gray-200"
                )}
                onClick={() => handleNavigation('/services')}
              >
                Services
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "px-3 py-2 font-medium",
                  isScrolled ? "text-gray-800 hover:text-brand-blue" : "text-white hover:text-gray-200"
                )}
                onClick={() => handleNavigation('/financement')}
              >
                Financement
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "px-3 py-2 font-medium",
                  isScrolled ? "text-gray-800 hover:text-brand-blue" : "text-white hover:text-gray-200"
                )}
                onClick={() => handleNavigation('/rachat')}
              >
                Rachat
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "px-3 py-2 font-medium",
                  isScrolled ? "text-gray-800 hover:text-brand-blue" : "text-white hover:text-gray-200"
                )}
                onClick={() => handleNavigation('/a-propos')}
              >
                À propos
              </Button>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/search')}
                className={cn(
                  isScrolled ? "text-gray-800" : "text-white"
                )}
              >
                <Search className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost"
                size="icon"
                className={cn(
                  "relative",
                  isScrolled ? "text-gray-800" : "text-white"
                )}
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-6 w-6" /> 
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
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
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              onClick={() => handleNavigation('/vehicules/occasion')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Véhicules
            </Button>

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
              Rachat
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleNavigation('/a-propos')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              À propos
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
