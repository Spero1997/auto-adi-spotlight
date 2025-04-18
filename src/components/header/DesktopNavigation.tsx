
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
    <div className="hidden lg:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {/* Vehicles Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700 px-3 py-1.5">
              <Car className="w-4 h-4 mr-2" />
              {translate('vehicles', menuTranslations.vehicles)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-1 p-2">
                <li>
                  <Link to="/vehicules" className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600">
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700 px-3 py-1.5">
              <Wrench className="w-4 h-4 mr-2" />
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-1 p-2">
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

          {/* About Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-700 px-3 py-1.5">
              <Info className="w-4 h-4 mr-2" />
              {translate('aboutUs', menuTranslations.aboutUs)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[180px] gap-1 p-2">
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

          {/* Direct Contact Link */}
          <NavigationMenuItem>
            <Link to="/contact" className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <Phone className="w-4 h-4" />
              {translate('contact', menuTranslations.contact)}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
