
import { FileText, Package, Truck, MapPin, Globe, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';

const ProcessCards = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Notre processus de livraison</h3>
      
      <div className="space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold">1. Préparation du dossier</h4>
          </div>
          <p className="text-gray-700">
            Nous constituons un dossier complet avec tous les documents nécessaires pour l'exportation du véhicule.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold">2. Inspection et préparation</h4>
          </div>
          <p className="text-gray-700">
            Nous effectuons une inspection complète du véhicule, le préparons pour le transport et documentons son état par des photos.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold">3. Transport sécurisé</h4>
          </div>
          <p className="text-gray-700">
            Nous confions votre véhicule à nos transporteurs spécialisés qui l'acheminent jusqu'à la destination finale.
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <h4 className="text-xl font-bold">4. Livraison et inspection finale</h4>
          </div>
          <p className="text-gray-700">
            Nous livrons votre véhicule à l'adresse indiquée et procédons à une inspection finale avec vous pour vérifier son état.
          </p>
        </div>
      </div>
      
      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold mb-4">Options de transport</h3>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">Transport standard par camion porte-voitures</span>
          </li>
          <li className="flex items-center">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">Transport premium en camion fermé</span>
          </li>
          <li className="flex items-center">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">Livraison express avec chauffeur privé</span>
          </li>
          <li className="flex items-center">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">Transport maritime pour destinations hors Europe</span>
          </li>
        </ul>
        <RouterLink to="/contact">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Demander un devis personnalisé
          </Button>
        </RouterLink>
      </div>
    </div>
  );
};

export default ProcessCards;
