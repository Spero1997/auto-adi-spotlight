
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CreditCard, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';

const DesktopNavigation = () => {
  const { translate } = useLanguage();

  return (
    <div className="hidden lg:flex flex-col items-start gap-8 py-4">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col gap-8">
          {/* Collection Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-900 text-2xl font-light tracking-wide hover:text-brand-gold transition-colors">
              <Car className="w-6 h-6 mr-4" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-6 bg-white/90 backdrop-blur-md">
                <li>
                  <Link 
                    to="/vehicules" 
                    className="block select-none text-lg rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/occasion" 
                    className="block select-none text-lg rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-900 text-2xl font-light tracking-wide hover:text-brand-gold transition-colors">
              <Wrench className="w-6 h-6 mr-4" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-6 bg-white/90 backdrop-blur-md">
                <li>
                  <Link 
                    to="/services" 
                    className="block select-none text-lg rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/garantie" 
                    className="block select-none text-lg rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gold/5 hover:text-brand-gold"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Financing Link */}
          <NavigationMenuItem>
            <Link 
              to="/financement" 
              className="flex items-center gap-4 text-2xl text-gray-900 hover:text-brand-gold font-light tracking-wide transition-colors"
            >
              <CreditCard className="w-6 h-6" />
              {translate('financing', menuTranslations.financing)}
            </Link>
          </NavigationMenuItem>

          {/* Contact Link */}
          <NavigationMenuItem>
            <Link 
              to="/contact" 
              className="flex items-center gap-4 text-2xl text-brand-gold hover:text-brand-darkBlue font-light tracking-wide transition-colors"
            >
              <Phone className="w-6 h-6" />
              {translate('directContact', menuTranslations.directContact)}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
