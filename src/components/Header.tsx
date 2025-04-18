import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Languages } from 'lucide-react';
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled
          ? 'bg-white shadow-md py-2' 
          : 'bg-white shadow-sm py-2'
      )}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <Logo className={cn('h-10 w-auto', 'text-blue-600')} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Vehicles Menu Item */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700">
                    {translate('vehicles', menuTranslations.vehicles)}
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
                              {translate('allVehicles', menuTranslations.allVehicles)}
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              {translate('allVehicles', menuTranslations.allVehicles)}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/neufs"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('newVehicles', menuTranslations.newVehicles)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('latestModels', menuTranslations.latestModels)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/occasion"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('usedVehicles', menuTranslations.usedVehicles)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('certifiedUsed', menuTranslations.certifiedUsed)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vehicules/utilitaires"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('utility', menuTranslations.utility)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('utilityVehicles', menuTranslations.utilityVehicles)}
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services Menu Item */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700">
                    {translate('services', menuTranslations.services)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <Link
                          to="/services"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('ourServices', menuTranslations.ourServices)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('discoverAll', menuTranslations.discoverAll)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/financement"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('financing', menuTranslations.financing)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('financingSolutions', menuTranslations.financingSolutions)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/garantie"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('warranty', menuTranslations.warranty)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('warrantyOnVehicles', menuTranslations.warrantyOnVehicles)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/livraison"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('delivery', menuTranslations.delivery)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('deliveryEurope', menuTranslations.deliveryEurope)}
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/rachat"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                        >
                          <div className="text-sm font-medium leading-none">{translate('vehicleBuyback', menuTranslations.vehicleBuyback)}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            {translate('sellYourVehicle', menuTranslations.sellYourVehicle)}
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About Us Link */}
                <NavigationMenuItem>
                  <div className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-1.5 text-sm font-montserrat font-light tracking-wide text-gray-700 transition-all duration-300 hover:text-brand-darkBlue">
                    <Link to="/a-propos">
                      {translate('aboutUs', menuTranslations.aboutUs)}
                    </Link>
                  </div>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <div className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-1.5 text-sm font-montserrat font-light tracking-wide text-gray-700 transition-all duration-300 hover:text-brand-darkBlue">
                    <Link to="/contact">
                      {translate('contact', menuTranslations.contact)}
                    </Link>
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden">
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
              {/* Language Switcher (Kept at top) */}
              <div className="border-b border-gray-200 pb-3 mb-2">
                <div className="flex items-center space-x-2 mb-3">
                  <Languages className="h-5 w-5 text-brand-blue" />
                  <div className="font-semibold text-brand-darkBlue">{translate('language', menuTranslations.language)}</div>
                </div>
                <LanguageSwitcher />
              </div>

              {/* Vehicles Menu */}
              <div className="space-y-2">
                <div className="font-medium text-gray-800">{translate('vehicles', menuTranslations.vehicles)}</div>
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
                <div className="font-medium text-gray-800">{translate('services', menuTranslations.services)}</div>
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
