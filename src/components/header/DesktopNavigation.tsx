
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CreditCard, Phone, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import CartCount from '../CartCount';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';

const DesktopNavigation = () => {
  const { translate } = useLanguage();

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-6">
          {/* Vehicles Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light">
              <Car className="w-5 h-5" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 bg-white shadow-lg border rounded-md">
                <li>
                  <Link 
                    to="/vehicules" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/vehicules/neufs" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/occasion" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/utilitaires" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('utility', menuTranslations.utility)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light">
              <Wrench className="w-5 h-5" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 bg-white shadow-lg border rounded-md">
                <li>
                  <Link 
                    to="/services" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/garantie" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/livraison" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('delivery', menuTranslations.delivery)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/rachat" 
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Financing Link */}
          <NavigationMenuItem>
            <Link 
              to="/financement" 
              className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light"
            >
              <CreditCard className="w-5 h-5" />
              {translate('financing', menuTranslations.financing)}
            </Link>
          </NavigationMenuItem>

          {/* Contact Link */}
          <NavigationMenuItem>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light"
            >
              <Phone className="w-5 h-5" />
              {translate('contact', menuTranslations.contact)}
            </Link>
          </NavigationMenuItem>

          {/* Shopping Cart Link */}
          <NavigationMenuItem>
            <Link 
              to="/panier" 
              className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <CartCount />
              </div>
              {translate('cart', { FR: 'Panier', EN: 'Cart', ES: 'Carrito', IT: 'Carrello', PT: 'Carrinho', RO: 'Coș' })}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-800 hover:text-brand-gold transition-colors font-light">
            <Globe className="w-5 h-5" />
            {translate('language', menuTranslations.language)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-white shadow-lg border rounded-md p-2">
          <LanguageSwitcher />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopNavigation;
