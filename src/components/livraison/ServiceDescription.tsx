
import { ShieldCheck } from 'lucide-react';

const ServiceDescription = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Un service clé en main partout en Europe</h2>
      <p className="text-lg text-gray-700 mb-6">
        Nous prenons en charge toutes les démarches administratives, douanières et logistiques pour vous livrer votre véhicule dans les meilleures conditions, quelle que soit votre localisation en Europe.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Notre service de livraison internationale a été spécialement conçu pour faciliter l'acquisition de votre véhicule sans les contraintes habituelles liées à l'importation. Que vous soyez un particulier ou un professionnel, nous gérons l'intégralité du processus.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Nous travaillons avec un réseau de transporteurs spécialisés et certifiés qui garantissent la sécurité et l'intégrité de votre véhicule pendant tout le trajet.
      </p>
      
      <h3 className="text-2xl font-bold mb-4 mt-8">Nos garanties</h3>
      <ul className="space-y-4">
        <li className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700">Livraison sécurisée dans toute l'Europe</p>
        </li>
        <li className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700">Assurance transport complète incluse</p>
        </li>
        <li className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700">Inspection complète du véhicule avant expédition</p>
        </li>
        <li className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700">Suivi en temps réel de votre livraison</p>
        </li>
        <li className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <p className="text-gray-700">Documentation complète pour les démarches administratives</p>
        </li>
      </ul>
    </div>
  );
};

export default ServiceDescription;
