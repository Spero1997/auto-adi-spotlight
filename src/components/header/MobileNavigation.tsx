
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, Info, Phone, MapPin } from 'lucide-react';
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
          <Accordion type="single" collapsible className="w-full">
            {/* Vehicles Section */}
            <AccordionItem value="vehicles">
              <AccordionTrigger className="flex items-center text-gray-800 py-2">
                <Car className="w-4 h-4 mr-2" />
                {translate('vehicles', menuTranslations.vehicles)}
              </AccordionTrigger>
              <AccordionContent>
                <Link to="/vehicules" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  {translate('allVehicles', menuTranslations.allVehicles)}
                </Link>
              </AccordionContent>
            </AccordionItem>

            {/* Services Section */}
            <AccordionItem value="services">
              <AccordionTrigger className="flex items-center text-gray-800 py-2">
                <Wrench className="w-4 h-4 mr-2" />
                {translate('services', menuTranslations.services)}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('ourServices', menuTranslations.ourServices)}
                  </Link>
                  <Link to="/financement" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('financing', menuTranslations.financing)}
                  </Link>
                  <Link to="/garantie" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('warranty', menuTranslations.warranty)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* About Section */}
            <AccordionItem value="about">
              <AccordionTrigger className="flex items-center text-gray-800 py-2">
                <Info className="w-4 h-4 mr-2" />
                {translate('aboutUs', menuTranslations.aboutUs)}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  <Link to="/a-propos" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('aboutUs', menuTranslations.aboutUs)}
                  </Link>
                  <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                    {translate('contact', menuTranslations.contact)}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Contact Direct Link */}
            <div className="mt-2 border-t pt-2">
              <Link to="/contact" className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                <Phone className="w-4 h-4 mr-2" />
                {translate('contact', menuTranslations.contact)}
              </Link>
            </div>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
