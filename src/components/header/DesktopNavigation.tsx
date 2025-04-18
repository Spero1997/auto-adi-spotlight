
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, Info, Phone } from 'lucide-react';
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
    <div className="hidden lg:flex items-center space-x-4">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700">
              <Car className="w-4 h-4 mr-2" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-3">
                <li>
                  <Link to="/vehicules" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700">
              <Wrench className="w-4 h-4 mr-2" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-3">
                <li>
                  <Link to="/services" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                </li>
                <li>
                  <Link to="/financement" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('financing', menuTranslations.financing)}
                  </Link>
                </li>
                <li>
                  <Link to="/garantie" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700">
              <Info className="w-4 h-4 mr-2" />
              {translate('aboutUs', menuTranslations.aboutUs)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-3">
                <li>
                  <Link to="/a-propos" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('aboutUs', menuTranslations.aboutUs)}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('contact', menuTranslations.contact)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
