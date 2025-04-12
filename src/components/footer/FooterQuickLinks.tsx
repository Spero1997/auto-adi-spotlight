
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

type QuickLinksTranslations = {
  [key: string]: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
  };
};

const FooterQuickLinks = () => {
  const { translate } = useLanguage();

  const translations: QuickLinksTranslations = {
    quickLinks: {
      FR: "Liens rapides",
      EN: "Quick links",
      ES: "Enlaces rápidos",
      IT: "Link rapidi",
      PT: "Links rápidos",
      RO: "Linkuri rapide"
    },
    newVehicles: {
      FR: "Véhicules neufs",
      EN: "New vehicles",
      ES: "Vehículos nuevos",
      IT: "Veicoli nuovi",
      PT: "Veículos novos",
      RO: "Vehicule noi"
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand"
    },
    services: {
      FR: "Services",
      EN: "Services",
      ES: "Servicios",
      IT: "Servizi",
      PT: "Serviços",
      RO: "Servicii"
    },
    financing: {
      FR: "Financement",
      EN: "Financing",
      ES: "Financiación",
      IT: "Finanziamento",
      PT: "Financiamento",
      RO: "Finanțare"
    },
    vehicleBuyback: {
      FR: "Rachat de votre véhicule",
      EN: "Vehicle buyback",
      ES: "Recompra de su vehículo",
      IT: "Riacquisto del veicolo",
      PT: "Recompra do seu veículo",
      RO: "Răscumpărarea vehiculului"
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-left">{translate('quickLinks', translations.quickLinks)}</h3>
      <ul className="space-y-1 text-left text-sm md:text-base">
        <li>
          <Link to="/vehicules/neufs" className="text-gray-200 hover:text-brand-orange transition-colors block">
            {translate('newVehicles', translations.newVehicles)}
          </Link>
        </li>
        <li>
          <Link to="/vehicules/occasion" className="text-gray-200 hover:text-brand-orange transition-colors block">
            {translate('usedVehicles', translations.usedVehicles)}
          </Link>
        </li>
        <li>
          <Link to="/services" className="text-gray-200 hover:text-brand-orange transition-colors block">
            {translate('services', translations.services)}
          </Link>
        </li>
        <li>
          <Link to="/financement" className="text-gray-200 hover:text-brand-orange transition-colors block">
            {translate('financing', translations.financing)}
          </Link>
        </li>
        <li>
          <Link to="/rachat" className="text-gray-200 hover:text-brand-orange transition-colors block">
            {translate('vehicleBuyback', translations.vehicleBuyback)}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
