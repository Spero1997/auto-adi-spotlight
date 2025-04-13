
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const MainNavigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700">
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
          <NavigationMenuTrigger className="text-gray-700">
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
          <div className="group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-1.5 text-sm font-montserrat font-light tracking-wide text-gray-700 transition-all duration-300 hover:text-brand-darkBlue">
            <Link to="/a-propos">
              À propos
            </Link>
          </div>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <div className="group inline-flex h-10 w-max items-center justify-center rounded-md px-5 py-1.5 text-sm font-montserrat font-light tracking-wide text-gray-700 transition-all duration-300 hover:text-brand-darkBlue">
            <Link to="/contact">
              Contact
            </Link>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
