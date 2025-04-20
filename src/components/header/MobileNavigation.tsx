
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CreditCard, Phone, ShoppingCart, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import CartCount from '../CartCount';
import LanguageSwitcher from '../LanguageSwitcher';

interface MobileNavigationProps {
  isMenuOpen: boolean;
}

const MobileNavigation = ({ isMenuOpen }: MobileNavigationProps) => {
  const { translate } = useLanguage();

  // Only render when menu is open
  if (!isMenuOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden fixed top-[60px] left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="max-h-[75vh] overflow-y-auto pb-16">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {/* Collection Section */}
            <AccordionItem value="vehicles" className="border-none">
              <AccordionTrigger className="flex items-center text-xl text-gray-900 py-3 hover:no-underline hover:text-brand-gold">
                <div className="flex items-center gap-6">
                  <Car className="w-6 h-6" />
                  <span className="font-light tracking-wide">{translate('vehicles', menuTranslations.vehicles)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-14">
                  <Link 
                    to="/vehicules" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                  <Link 
                    to="/vehicules/neuf" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                  <Link 
                    to="/occasion" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                  <Link 
                    to="/utilitaires" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('utility', menuTranslations.utility)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Services Section */}
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="flex items-center text-xl text-gray-900 py-3 hover:no-underline hover:text-brand-gold">
                <div className="flex items-center gap-6">
                  <Wrench className="w-6 h-6" />
                  <span className="font-light tracking-wide">{translate('services', menuTranslations.services)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-14">
                  <Link 
                    to="/services" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                  <Link 
                    to="/garantie" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                  <Link 
                    to="/livraison" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('delivery', menuTranslations.delivery)}
                  </Link>
                  <Link 
                    to="/rachat" 
                    className="block text-lg px-4 py-3 text-gray-700 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
                  >
                    {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Language Section */}
            <AccordionItem value="language" className="border-none">
              <AccordionTrigger className="flex items-center text-xl text-gray-900 py-3 hover:no-underline hover:text-brand-gold">
                <div className="flex items-center gap-6">
                  <Globe className="w-6 h-6" />
                  <span className="font-light tracking-wide">{translate('language', menuTranslations.language)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-14 pr-4 py-2">
                  <LanguageSwitcher />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Direct Access Links */}
            <div className="space-y-2 pt-1">
              <Link 
                to="/financement" 
                className="flex items-center gap-6 px-4 py-3 text-xl text-gray-900 hover:text-brand-gold rounded-sm transition-colors min-h-[48px]"
              >
                <CreditCard className="w-6 h-6" />
                <span className="font-light tracking-wide">{translate('financing', menuTranslations.financing)}</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-6 px-4 py-3 text-xl text-brand-gold hover:text-brand-darkBlue rounded-sm transition-colors min-h-[48px]"
              >
                <Phone className="w-6 h-6" />
                <span className="font-light tracking-wide">{translate('directContact', menuTranslations.directContact)}</span>
              </Link>
              <Link 
                to="/panier" 
                className="flex items-center gap-6 px-4 py-3 text-xl text-brand-gold hover:text-brand-darkBlue rounded-sm transition-colors relative min-h-[48px]"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <CartCount />
                </div>
                <span className="font-light tracking-wide">
                  {translate('cart', { FR: 'Panier', EN: 'Cart', ES: 'Carrito', IT: 'Carrello', PT: 'Carrinho', RO: 'Coș' })}
                </span>
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
