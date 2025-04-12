
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type LegalLinksTranslations = {
  [key: string]: {
    FR: string;
    EN: string;
    ES: string;
    IT: string;
    PT: string;
    RO: string;
  };
};

const FooterLegalLinks = () => {
  const { translate } = useLanguage();

  const translations: LegalLinksTranslations = {
    legalInfo: {
      FR: "Informations légales",
      EN: "Legal information",
      ES: "Información legal",
      IT: "Informazioni legali",
      PT: "Informações legais",
      RO: "Informații legale"
    },
    legalNotice: {
      FR: "Mentions légales",
      EN: "Legal notice",
      ES: "Avisos legales",
      IT: "Note legali",
      PT: "Avisos legais",
      RO: "Mențiuni legale"
    },
    privacyPolicy: {
      FR: "Politique de confidentialité",
      EN: "Privacy policy",
      ES: "Política de privacidad",
      IT: "Politica sulla privacy",
      PT: "Política de privacidade",
      RO: "Politica de confidențialitate"
    },
    cookieManagement: {
      FR: "Gestion des cookies",
      EN: "Cookie management",
      ES: "Gestión de cookies",
      IT: "Gestione dei cookie",
      PT: "Gestão de cookies",
      RO: "Gestionarea cookie-urilor"
    },
    termsAndConditions: {
      FR: "CGV",
      EN: "Terms and conditions",
      ES: "Términos y condiciones",
      IT: "Termini e condizioni",
      PT: "Termos e condições",
      RO: "Termeni și condiții"
    },
    saleConditions: {
      FR: "Conditions de vente",
      EN: "Sale conditions",
      ES: "Condiciones de venta",
      IT: "Condizioni di vendita",
      PT: "Condições de venda",
      RO: "Condiții de vânzare"
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-6 text-center">
        {translate('legalInfo', translations.legalInfo)}
      </h3>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <Link to="/mentions-legales" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-3 py-2 bg-white/10 rounded-md backdrop-blur-sm">
          <Shield className="h-4 w-4 mr-2 text-brand-orange" />
          {translate('legalNotice', translations.legalNotice)}
        </Link>
        <Link to="/politique-confidentialite" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-3 py-2 bg-white/10 rounded-md backdrop-blur-sm">
          <Shield className="h-4 w-4 mr-2 text-brand-orange" />
          {translate('privacyPolicy', translations.privacyPolicy)}
        </Link>
        <Link to="/cookies" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-3 py-2 bg-white/10 rounded-md backdrop-blur-sm">
          <Settings className="h-4 w-4 mr-2 text-brand-orange" />
          {translate('cookieManagement', translations.cookieManagement)}
        </Link>
        <Link to="/cgv" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-3 py-2 bg-white/10 rounded-md backdrop-blur-sm">
          <FileText className="h-4 w-4 mr-2 text-brand-orange" />
          {translate('termsAndConditions', translations.termsAndConditions)}
        </Link>
        <Link to="/conditions" className="text-gray-200 hover:text-brand-orange transition-colors flex items-center px-3 py-2 bg-white/10 rounded-md backdrop-blur-sm">
          <FileText className="h-4 w-4 mr-2 text-brand-orange" />
          {translate('saleConditions', translations.saleConditions)}
        </Link>
      </div>
    </div>
  );
};

export default FooterLegalLinks;
