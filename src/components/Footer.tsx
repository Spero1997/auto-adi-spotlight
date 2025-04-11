
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, translate } = useLanguage();

  // Translations for the footer
  const translations = {
    companyDescription: {
      FR: "Auto Adi, votre partenaire de confiance pour l'achat de véhicules neufs et d'occasion en Europe.",
      EN: "Auto Adi, your trusted partner for purchasing new and used vehicles in Europe.",
      ES: "Auto Adi, su socio de confianza para la compra de vehículos nuevos y usados en Europa.",
      IT: "Auto Adi, il tuo partner di fiducia per l'acquisto di veicoli nuovi e usati in Europa.",
      PT: "Auto Adi, o seu parceiro de confiança para a compra de veículos novos e usados na Europa.",
      RO: "Auto Adi, partenerul dvs. de încredere pentru achiziționarea de vehicule noi și second-hand în Europa."
    },
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
    },
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
    },
    contact: {
      FR: "Contact",
      EN: "Contact",
      ES: "Contacto",
      IT: "Contatto",
      PT: "Contato",
      RO: "Contact"
    },
    copyright: {
      FR: "© 2002 Auto Adi. N° d'identification: 827 514 860. Tous droits réservés.",
      EN: "© 2002 Auto Adi. ID number: 827 514 860. All rights reserved.",
      ES: "© 2002 Auto Adi. N° de identificación: 827 514 860. Todos los derechos reservados.",
      IT: "© 2002 Auto Adi. N° di identificazione: 827 514 860. Tutti i diritti riservati.",
      PT: "© 2002 Auto Adi. N° de identificação: 827 514 860. Todos os direitos reservados.",
      RO: "© 2002 Auto Adi. Număr de identificare: 827 514 860. Toate drepturile rezervate."
    },
    socialMediaInfo: {
      FR: "Nous sommes disponibles uniquement sur Facebook et WhatsApp",
      EN: "We are available only on Facebook and WhatsApp",
      ES: "Estamos disponibles solo en Facebook y WhatsApp",
      IT: "Siamo disponibili solo su Facebook e WhatsApp",
      PT: "Estamos disponíveis apenas no Facebook e WhatsApp",
      RO: "Suntem disponibili doar pe Facebook și WhatsApp"
    },
    contactAvailability: {
      FR: "Nous sommes disponibles uniquement sur Facebook et WhatsApp",
      EN: "We are available only on Facebook and WhatsApp",
      ES: "Estamos disponibles solo en Facebook y WhatsApp",
      IT: "Siamo disponibili solo su Facebook e WhatsApp",
      PT: "Estamos disponíveis apenas no Facebook e WhatsApp",
      RO: "Suntem disponibili doar pe Facebook și WhatsApp"
    },
    facebookPage: {
      FR: "Page Facebook",
      EN: "Facebook Page",
      ES: "Página de Facebook",
      IT: "Pagina Facebook",
      PT: "Página do Facebook",
      RO: "Pagină de Facebook"
    }
  };

  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Main content */}
        <div className="mb-8">
          {/* Logo and description */}
          <div className="mb-8">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-12"
              />
            </Link>
            <p className="text-white text-lg">
              {translate('companyDescription', translations.companyDescription)}
            </p>
            <p className="text-white font-semibold mt-4 mb-6">
              {translate('contactAvailability', translations.contactAvailability)}
            </p>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brand-orange transition-colors bg-white/10 p-3 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://wa.me/393761753341" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brand-orange transition-colors bg-white/10 p-3 rounded-full"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">{translate('quickLinks', translations.quickLinks)}</h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/vehicules/neufs" className="text-white hover:text-brand-orange block">
                  {translate('newVehicles', translations.newVehicles)}
                </Link>
              </li>
              <li>
                <Link to="/vehicules/occasion" className="text-white hover:text-brand-orange block">
                  {translate('usedVehicles', translations.usedVehicles)}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-brand-orange block">
                  {translate('services', translations.services)}
                </Link>
              </li>
              <li>
                <Link to="/financement" className="text-white hover:text-brand-orange block">
                  {translate('financing', translations.financing)}
                </Link>
              </li>
              <li>
                <Link to="/rachat" className="text-white hover:text-brand-orange block">
                  {translate('vehicleBuyback', translations.vehicleBuyback)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal information */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">{translate('legalInfo', translations.legalInfo)}</h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/mentions-legales" className="text-white hover:text-brand-orange block">
                  {translate('legalNotice', translations.legalNotice)}
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-white hover:text-brand-orange block">
                  {translate('privacyPolicy', translations.privacyPolicy)}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white hover:text-brand-orange block">
                  {translate('cookieManagement', translations.cookieManagement)}
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-white hover:text-brand-orange block">
                  {translate('termsAndConditions', translations.termsAndConditions)}
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-white hover:text-brand-orange block">
                  {translate('saleConditions', translations.saleConditions)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translate('contact', translations.contact)}</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <Phone className="h-6 w-6 mr-3 text-brand-orange" />
                <span className="text-white">‪+39 376 175 3341‬</span>
              </li>
              <li className="flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-brand-orange" />
                <span className="text-white">WhatsApp: ‪+39 376 175 3341‬</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 mr-3 text-brand-orange" />
                <span className="text-white">serviceautoadi@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 text-brand-orange flex-shrink-0 mt-1" />
                <span className="text-white">
                  Borgo Ognissanti, 142r 50123 Firenze FI Italie
                </span>
              </li>
              <li className="flex items-center">
                <Facebook className="h-6 w-6 mr-3 text-brand-orange" />
                <a 
                  href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-orange"
                >
                  {translate('facebookPage', translations.facebookPage)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-blue-700 pt-6 text-center">
          <p className="text-white">
            {translate('copyright', translations.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
