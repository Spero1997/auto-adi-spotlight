import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CreditCard, Phone, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

interface MobileNavigationProps {
  isMenuOpen: boolean;
}

const MobileNavigation = ({ isMenuOpen }: MobileNavigationProps) => {
  const { translate } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg overflow-hidden fixed top-[60px] left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="max-h-[65vh] overflow-y-auto pb-16">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {/* Collection Section */}
            <AccordionItem value="vehicles" className="border-none">
              <AccordionTrigger className="flex items-center text-2xl text-gray-900 py-2 hover:no-underline hover:text-brand-gold">
                <div className="flex items-center gap-6">
                  <Car className="w-7 h-7" />
                  <span className="font-light tracking-wide">{translate('vehicles', menuTranslations.vehicles)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-14">
                  <Link 
                    to="/vehicules" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('allVehicles', menuTranslations.allVehicles)}
                  </Link>
                  <Link 
                    to="/vehicules/neuf" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                  <Link 
                    to="/occasion" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                  <Link 
                    to="/utilitaires" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('utility', menuTranslations.utility)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Services Section */}
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="flex items-center text-2xl text-gray-900 py-2 hover:no-underline hover:text-brand-gold">
                <div className="flex items-center gap-6">
                  <Wrench className="w-7 h-7" />
                  <span className="font-light tracking-wide">{translate('services', menuTranslations.services)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-14">
                  <Link 
                    to="/services" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                  <Link 
                    to="/garantie" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                  <Link 
                    to="/livraison" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('delivery', menuTranslations.delivery)}
                  </Link>
                  <Link 
                    to="/rachat" 
                    className="block text-xl px-4 py-2 text-gray-700 hover:text-brand-gold rounded-sm transition-colors"
                  >
                    {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Direct Access Links */}
            <div className="space-y-2 pt-1">
              <Link 
                to="/financement" 
                className="flex items-center gap-6 px-4 py-2 text-2xl text-gray-900 hover:text-brand-gold rounded-sm transition-colors"
              >
                <CreditCard className="w-7 h-7" />
                <span className="font-light tracking-wide">{translate('financing', menuTranslations.financing)}</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-6 px-4 py-2 text-2xl text-brand-gold hover:text-brand-darkBlue rounded-sm transition-colors"
              >
                <Phone className="w-7 h-7" />
                <span className="font-light tracking-wide">{translate('directContact', menuTranslations.directContact)}</span>
              </Link>
              <Link 
                to="/panier" 
                className="flex items-center gap-6 px-4 py-2 text-2xl text-brand-gold hover:text-brand-darkBlue rounded-sm transition-colors"
              >
                <ShoppingCart className="w-7 h-7" />
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
