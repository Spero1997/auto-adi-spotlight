
import { Link } from 'react-router-dom';
import { Globe, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
import CartCount from '../CartCount';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavigationProps {
  scrolled: boolean;
}

const DesktopNavigation = ({ scrolled }: DesktopNavigationProps) => {
  const { translate } = useLanguage();

  return (
    <div className="hidden md:flex items-center space-x-4 text-white">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`
                font-montserrat 
                font-light 
                hover:text-white 
                hover:bg-transparent 
                ${scrolled 
                  ? 'text-brand-darkBlue hover:text-brand-blue' 
                  : 'text-white hover:text-white/80'}
              `}
            >
              Véhicules
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[400px]">
                <li>
                  <Link
                    to="/vehicules"
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vehicules/occasion"
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`
                font-montserrat 
                font-light 
                hover:text-white 
                hover:bg-transparent 
                ${scrolled 
                  ? 'text-brand-darkBlue hover:text-brand-blue' 
                  : 'text-white hover:text-white/80'}
              `}
            >
              {translate('services', menuTranslations.services)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[400px]">
                <li>
                  <Link
                    to="/services"
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    Nos services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financement"
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    Financement
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link 
        to="/contact"
        className={`
          font-montserrat 
          font-light 
          tracking-wide 
          px-5 
          py-1.5 
          border 
          border-transparent 
          rounded-md 
          transition-all 
          duration-300 
          hover:border-white/40 
          ${scrolled 
            ? 'text-brand-darkBlue hover:text-brand-blue' 
            : 'text-white hover:text-white/80'}
        `}
      >
        {translate('contact', menuTranslations.contact)}
      </Link>
      
      {/* Cart Link */}
      <Link 
        to="/panier"
        className={`
          font-montserrat 
          font-light 
          tracking-wide 
          px-5 
          py-1.5 
          border 
          border-transparent 
          rounded-md 
          transition-all 
          duration-300 
          hover:border-white/40 
          flex 
          items-center 
          relative 
          ${scrolled 
            ? 'text-brand-darkBlue hover:text-brand-blue' 
            : 'text-white hover:text-white/80'}
        `}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        <CartCount />
        {translate('cart', menuTranslations.cart)}
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`
              font-montserrat 
              font-light 
              tracking-wide 
              px-5 
              py-1.5 
              border 
              border-transparent 
              hover:border-white/40 
              rounded-md 
              transition-all 
              duration-300 
              ${scrolled 
                ? 'text-brand-darkBlue hover:bg-transparent hover:text-brand-blue' 
                : 'text-white hover:bg-transparent hover:text-white/80'}
            `}
          >
            <Globe className="mr-1 h-4 w-4" />
            {translate('language', menuTranslations.language)}
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
  );
};

export default DesktopNavigation;
