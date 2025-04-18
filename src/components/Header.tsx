import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Languages, Car, Wrench } from 'lucide-react';
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from './LanguageSwitcher';
import { menuTranslations } from '@/translations/menuTranslations';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

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

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-2'
    )}>
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <Logo className={cn('h-10 w-auto', 'text-blue-600')} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Vehicles Menu Item */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700">
                    <Car className="w-4 h-4 mr-2" />
                    {translate('vehicles', menuTranslations.vehicles)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <Link to="/vehicules" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('allVehicles', menuTranslations.allVehicles)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/vehicules/neufs" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('newVehicles', menuTranslations.newVehicles)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/vehicules/occasion" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('usedVehicles', menuTranslations.usedVehicles)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/vehicules/utilitaires" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('utility', menuTranslations.utility)}
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services Menu Item */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700">
                    <Wrench className="w-4 h-4 mr-2" />
                    {translate('services', menuTranslations.services)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <Link to="/services" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('ourServices', menuTranslations.ourServices)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/financement" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('financing', menuTranslations.financing)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/garantie" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('warranty', menuTranslations.warranty)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/livraison" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('delivery', menuTranslations.delivery)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/rachat" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About & Contact Links */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700">
                    Plus
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <Link to="/a-propos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('aboutUs', menuTranslations.aboutUs)}
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                          {translate('contact', menuTranslations.contact)}
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Language Switcher for Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-brand-blue/30 text-brand-blue font-semibold">
                <Languages className="h-5 w-5" />
                <span>{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-lg rounded-sm p-3 w-[470px]"
            >
              <div className="text-sm font-medium text-gray-700 mb-2 px-2 flex items-center gap-2">
                <Languages className="h-4 w-4 text-brand-blue" />
                {translate('selectLanguage', {
                  FR: 'Sélectionnez une langue',
                  EN: 'Select a language',
                  ES: 'Seleccione un idioma',
                  IT: 'Seleziona una lingua',
                  PT: 'Selecione um idioma',
                  RO: 'Selectați o limbă'
                })}
              </div>
              <LanguageSwitcher />
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden">
            {/* Language Switcher Button for Mobile */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mr-2 flex items-center gap-1 border-brand-blue/30 text-brand-blue"
                >
                  <Languages className="h-4 w-4" />
                  <span>{language}</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-4 pb-6 pt-2">
                <div className="mx-auto w-full max-w-sm">
                  <div className="flex items-center space-x-2 mb-4 p-2 border-b border-gray-100">
                    <Languages className="h-6 w-6 text-brand-blue" />
                    <div className="font-semibold text-brand-darkBlue text-lg">
                      {translate('selectLanguage', {
                        FR: 'Sélectionnez une langue',
                        EN: 'Select a language',
                        ES: 'Seleccione un idioma',
                        IT: 'Seleziona una lingua',
                        PT: 'Selecione um idioma',
                        RO: 'Selectați o limbă'
                      })}
                    </div>
                  </div>
                  <LanguageSwitcher />
                  <DrawerClose className="mt-4 w-full">
                    <Button variant="outline" className="w-full">
                      {translate('close', {
                        FR: 'Fermer',
                        EN: 'Close',
                        ES: 'Cerrar',
                        IT: 'Chiudi',
                        PT: 'Fechar',
                        RO: 'Închide'
                      })}
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-gray-700" />
              ) : (
                <Menu className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Vehicles Menu */}
              <div className="space-y-2">
                <div className="font-medium text-gray-800 flex items-center">
                  <Car className="w-4 h-4 mr-2" />
                  {translate('vehicles', menuTranslations.vehicles)}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/vehicules" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                  <Link to="/vehicules/neufs" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                  <Link to="/vehicules/occasion" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                  <Link to="/vehicules/utilitaires" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('utility', menuTranslations.utility)}
                  </Link>
                </div>
              </div>

              {/* Services Menu */}
              <div className="space-y-2">
                <div className="font-medium text-gray-800 flex items-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  {translate('services', menuTranslations.services)}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                  <Link to="/financement" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('financing', menuTranslations.financing)}
                  </Link>
                  <Link to="/garantie" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                  <Link to="/livraison" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('delivery', menuTranslations.delivery)}
                  </Link>
                  <Link to="/rachat" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
                  </Link>
                </div>
              </div>

              {/* About & Contact Links */}
              <div className="grid grid-cols-2 gap-2">
                <Link to="/a-propos" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  {translate('aboutUs', menuTranslations.aboutUs)}
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  {translate('contact', menuTranslations.contact)}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
