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

const DesktopNavigation = () => {
  const { translate } = useLanguage();

  return (
    <div className="hidden lg:flex flex-col items-start gap-12 py-8">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col gap-12">
          {/* Collection Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-900 text-4xl font-light tracking-wide hover:text-brand-gold transition-colors">
              <Car className="w-8 h-8 mr-6" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-4 p-6 bg-white/90 backdrop-blur-md">
                <li>
                  <Link 
                    to="/vehicules" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/vehicules/neuf" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/occasion" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/utilitaires" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('utility', menuTranslations.utility)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-900 text-4xl font-light tracking-wide hover:text-brand-gold transition-colors">
              <Wrench className="w-8 h-8 mr-6" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-4 p-6 bg-white/90 backdrop-blur-md">
                <li>
                  <Link 
                    to="/services" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/garantie" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/livraison" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('delivery', menuTranslations.delivery)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/rachat" 
                    className="block select-none text-xl rounded-sm p-4 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
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
              className="flex items-center gap-6 text-4xl text-gray-900 hover:text-brand-gold font-light tracking-wide transition-colors"
            >
              <CreditCard className="w-8 h-8" />
              {translate('financing', menuTranslations.financing)}
            </Link>
          </NavigationMenuItem>

          {/* Contact Link */}
          <NavigationMenuItem>
            <Link 
              to="/contact" 
              className="flex items-center gap-6 text-4xl text-gray-900 hover:text-brand-gold font-light tracking-wide transition-colors"
            >
              <Phone className="w-8 h-8" />
              {translate('directContact', menuTranslations.directContact)}
            </Link>
          </NavigationMenuItem>

          {/* Shopping Cart Link */}
          <NavigationMenuItem>
            <Link 
              to="/panier" 
              className="flex items-center gap-6 text-4xl text-brand-gold hover:text-brand-darkBlue font-light tracking-wide transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-8 h-8" />
                <CartCount />
              </div>
              {translate('cart', { FR: 'Panier', EN: 'Cart', ES: 'Carrito', IT: 'Carrello', PT: 'Carrinho', RO: 'Coș' })}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
