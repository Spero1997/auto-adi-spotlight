
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Car, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container px-4 mx-auto">
        {/* Top bar with contact */}
        <div className="hidden md:flex justify-end items-center py-2 text-sm border-b">
          <a href="tel:+33123456789" className="flex items-center mr-4 text-gray-600 hover:text-brand-blue">
            <Phone className="h-4 w-4 mr-1" /> 01 23 45 67 89
          </a>
          <button 
            onClick={() => handleNavigation('/contact#locations')}
            className="flex items-center text-gray-600 hover:text-brand-blue"
          >
            <MapPin className="h-4 w-4 mr-1" /> Nos concessions
          </button>
        </div>
        
        {/* Main navigation */}
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
              alt="Auto Adi" 
              className="h-12"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center">
            <div className="relative group">
              <button
                className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium flex items-center"
                onClick={() => toggleDropdown('vehicles')}
                aria-expanded={activeDropdown === 'vehicles'}
                aria-haspopup="true"
              >
                Véhicules <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div 
                className={cn(
                  "absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
                  activeDropdown === 'vehicles' ? "block" : "hidden group-hover:block"
                )}
              >
                <div className="py-1">
                  <button 
                    onClick={() => handleNavigation('/vehicules/occasion')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Véhicules d'occasion
                  </button>
                  <button 
                    onClick={() => handleNavigation('/vehicules/utilitaires')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Véhicules utilitaires
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleNavigation('/services')} 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
            >
              Services
            </button>

            <button 
              onClick={() => handleNavigation('/financement')} 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
            >
              Financement
            </button>

            <button 
              onClick={() => handleNavigation('/rachat')} 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
            >
              Rachat de votre véhicule
            </button>

            <button 
              onClick={() => handleNavigation('/a-propos')} 
              className="px-4 py-2 text-gray-800 hover:text-brand-blue font-medium"
            >
              À propos
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-800 hover:text-brand-blue focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
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
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-800 hover:text-brand-blue focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            <div>
              <button
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
              </button>
              {activeDropdown === 'vehicles-mobile' && (
                <div className="pl-10 mt-1 space-y-1">
                  <button
                    onClick={() => handleNavigation('/vehicules/occasion')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Véhicules d'occasion
                  </button>
                  <button
                    onClick={() => handleNavigation('/vehicules/utilitaires')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Véhicules utilitaires
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation('/services')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Services
            </button>

            <button
              onClick={() => handleNavigation('/financement')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Financement
            </button>

            <button
              onClick={() => handleNavigation('/rachat')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Rachat de votre véhicule
            </button>

            <button
              onClick={() => handleNavigation('/a-propos')}
              className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              À propos
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a
                href="tel:+33123456789"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Phone className="mr-3 h-5 w-5 text-brand-blue" />
                01 23 45 67 89
              </a>
              <button
                onClick={() => handleNavigation('/contact#locations')}
                className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <MapPin className="mr-3 h-5 w-5 text-brand-blue" />
                Nos concessions
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
