
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CreditCard, Phone } from 'lucide-react';
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
      className="lg:hidden bg-white shadow-lg overflow-hidden fixed top-[60px] left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="max-h-[70vh] overflow-y-auto pb-4 scrollbar-thin">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {/* Collection Section */}
            <AccordionItem value="vehicles" className="border-none">
              <AccordionTrigger className="flex items-center text-gray-800 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span className="font-light tracking-wide">{translate('vehicles', menuTranslations.vehicles)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-6">
                  <Link to="/vehicules" className="block px-4 py-3 text-gray-600 hover:text-brand-blue rounded-md transition-colors">
                    {translate('newVehicles', menuTranslations.newVehicles)}
                  </Link>
                  <Link to="/occasion" className="block px-4 py-3 text-gray-600 hover:text-brand-blue rounded-md transition-colors">
                    {translate('usedVehicles', menuTranslations.usedVehicles)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Services Section */}
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="flex items-center text-gray-800 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  <span className="font-light tracking-wide">{translate('services', menuTranslations.services)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-6">
                  <Link to="/services" className="block px-4 py-3 text-gray-600 hover:text-brand-blue rounded-md transition-colors">
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                  <Link to="/garantie" className="block px-4 py-3 text-gray-600 hover:text-brand-blue rounded-md transition-colors">
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Direct Access Links */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <Link to="/financement" className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:text-brand-blue rounded-md transition-colors">
                <CreditCard className="w-4 h-4" />
                <span className="font-light tracking-wide">{translate('financing', menuTranslations.financing)}</span>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 px-4 py-3 text-brand-blue hover:text-brand-darkBlue rounded-md transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-light tracking-wide">{translate('directContact', menuTranslations.directContact)}</span>
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
