
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, Info, Phone, CreditCard } from 'lucide-react';
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
    <div className="hidden lg:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="gap-6">
          {/* Collection Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-800 font-light tracking-wide">
              <Car className="w-4 h-4 mr-2" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <li>
                  <Link 
                    to="/vehicules" 
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/occasion" 
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-800 font-light tracking-wide">
              <Wrench className="w-4 h-4 mr-2" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-2 p-4">
                <li>
                  <Link 
                    to="/services" 
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/garantie" 
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-blue/5 hover:text-brand-blue"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Direct Access Items */}
          <NavigationMenuItem>
            <Link 
              to="/financement" 
              className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-brand-blue font-light tracking-wide transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              {translate('financing', menuTranslations.financing)}
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:text-brand-blue font-light tracking-wide transition-colors"
            >
              <Phone className="w-4 h-4" />
              {translate('directContact', menuTranslations.directContact)}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
