
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuTranslations } from '@/translations/menuTranslations';
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
      className="lg:hidden bg-white shadow-lg overflow-hidden"
    >
      <div className="container mx-auto px-4 py-4 space-y-4">
        <div className="space-y-2">
          <div className="font-medium text-gray-800 flex items-center">
            <Car className="w-4 h-4 mr-2" />
            {translate('vehicles', menuTranslations.vehicles)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/vehicules" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('allVehicles', menuTranslations.allVehicles)}
            </Link>
            <Link to="/vehicules/neufs" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('newVehicles', menuTranslations.newVehicles)}
            </Link>
            <Link to="/vehicules/occasion" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('usedVehicles', menuTranslations.usedVehicles)}
            </Link>
            <Link to="/vehicules/utilitaires" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('utility', menuTranslations.utility)}
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium text-gray-800 flex items-center">
            <Wrench className="w-4 h-4 mr-2" />
            {translate('services', menuTranslations.services)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('ourServices', menuTranslations.ourServices)}
            </Link>
            <Link to="/financement" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('financing', menuTranslations.financing)}
            </Link>
            <Link to="/garantie" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('warranty', menuTranslations.warranty)}
            </Link>
            <Link to="/livraison" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('delivery', menuTranslations.delivery)}
            </Link>
            <Link to="/rachat" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              {translate('vehicleBuyback', menuTranslations.vehicleBuyback)}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/a-propos" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            {translate('aboutUs', menuTranslations.aboutUs)}
          </Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            {translate('contact', menuTranslations.contact)}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
