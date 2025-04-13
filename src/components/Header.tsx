
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from './LanguageSwitcher';
import { Globe } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, translate } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    const translations = {
    language: {
      FR: "Langue",
      EN: "Language",
      ES: "Idioma",
      IT: "Lingua",
      PT: "Idioma",
      RO: "Limbă"
    },
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full', // Ajout de w-full
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 w-full"> {/* Ajout de w-full */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className={cn('h-10 w-auto', isScrolled ? 'text-blue-600' : 'text-white')} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isScrolled ? 'text-gray-700' : 'text-white'}>
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
                              Tous nos véhicules
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Découvrez notre sélection complète de véhicules neufs et d'occasion
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/neufs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">Véhicules neufs</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Les derniers modèles disponibles
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/occasion"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">Véhicules d'occasion</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Véhicules d'occasion certifiés et garantis
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/utilitaires"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">Utilitaires</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Véhicules utilitaires pour professionnels
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={isScrolled ? 'text-gray-700' : 'text-white'}>
                    Services
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

                <NavigationMenuItem>
                  <div className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-1.5 text-sm font-montserrat font-light tracking-wide transition-all duration-300 hover:border-brand-gold/70 hover:shadow-sm hover:text-brand-darkBlue border border-transparent focus:outline-none",
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}>
                    <Link to="/a-propos">
                      À propos
                    </Link>
                  </div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <div className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-1.5 text-sm font-montserrat font-light tracking-wide transition-all duration-300 hover:border-brand-gold/70 hover:shadow-sm hover:text-brand-darkBlue border border-transparent focus:outline-none",
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}>
                    <Link to="/contact">
                      Contact
                    </Link>
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-700' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              

              <div className="space-y-2">
                <div className="font-medium text-gray-800">Véhicules</div>
                <Link to="/vehicules" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Tous nos véhicules
                </Link>
                <Link to="/vehicules/neufs" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Véhicules neufs
                </Link>
                <Link to="/vehicules/occasion" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Véhicules d'occasion
                </Link>
                <Link to="/vehicules/utilitaires" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Utilitaires
                </Link>
              </div>

              <div className="space-y-2">
                <div className="font-medium text-gray-800">Services</div>
                <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Nos services
                </Link>
                <Link to="/financement" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Financement
                </Link>
                <Link to="/garantie" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Garantie
                </Link>
                <Link to="/livraison" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Livraison
                </Link>
                <Link to="/rachat" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Rachat de véhicule
                </Link>
              </div>

              <Link to="/a-propos" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                À propos
              </Link>
              <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

