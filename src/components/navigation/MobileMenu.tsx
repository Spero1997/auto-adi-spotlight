
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white shadow-lg overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <div className="font-medium text-gray-800">Véhicules</div>
              <Link to="/vehicules" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Tous nos véhicules
              </Link>
              <Link to="/vehicules/neufs" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Véhicules neufs
              </Link>
              <Link to="/vehicules/occasion" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Véhicules d'occasion
              </Link>
              <Link to="/vehicules/utilitaires" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Utilitaires
              </Link>
            </div>

            <div className="space-y-2">
              <div className="font-medium text-gray-800">Services</div>
              <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Nos services
              </Link>
              <Link to="/financement" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Financement
              </Link>
              <Link to="/garantie" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Garantie
              </Link>
              <Link to="/livraison" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Livraison
              </Link>
              <Link to="/rachat" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Rachat de véhicule
              </Link>
            </div>

            <Link to="/a-propos" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              À propos
            </Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
