
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
    DE: string;
    NL: string;
    PL: string;
    RU: string;
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
      RO: "Linkuri rapide",
      DE: "Schnelllinks",
      NL: "Snelle links",
      PL: "Szybkie linki",
      RU: "Быстрые ссылки"
    },
    newVehicles: {
      FR: "Véhicules neufs",
      EN: "New vehicles",
      ES: "Vehículos nuevos",
      IT: "Veicoli nuovi",
      PT: "Veículos novos",
      RO: "Vehicule noi",
      DE: "Neufahrzeuge",
      NL: "Nieuwe voertuigen",
      PL: "Nowe pojazdy",
      RU: "Новые автомобили"
    },
    usedVehicles: {
      FR: "Véhicules d'occasion",
      EN: "Used vehicles",
      ES: "Vehículos usados",
      IT: "Veicoli usati",
      PT: "Veículos usados",
      RO: "Vehicule second-hand",
      DE: "Gebrauchtwagen",
      NL: "Gebruikte voertuigen",
      PL: "Pojazdy używane",
      RU: "Подержанные автомобили"
    },
    services: {
      FR: "Services",
      EN: "Services",
      ES: "Servicios",
      IT: "Servizi",
      PT: "Serviços",
      RO: "Servicii",
      DE: "Dienstleistungen",
      NL: "Diensten",
      PL: "Usługi",
      RU: "Услуги"
    },
    financing: {
      FR: "Financement",
      EN: "Financing",
      ES: "Financiación",
      IT: "Finanziamento",
      PT: "Financiamento",
      RO: "Finanțare",
      DE: "Finanzierung",
      NL: "Financiering",
      PL: "Finansowanie",
      RU: "Финансирование"
    },
    vehicleBuyback: {
      FR: "Rachat de votre véhicule",
      EN: "Vehicle buyback",
      ES: "Recompra de su vehículo",
      IT: "Riacquisto del veicolo",
      PT: "Recompra do seu veículo",
      RO: "Răscumpărarea vehiculului",
      DE: "Fahrzeugrückkauf",
      NL: "Terugkoop van uw voertuig",
      PL: "Odkup pojazdu",
      RU: "Выкуп автомобиля"
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
