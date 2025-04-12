
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Phone, Mail, MapPin, Shield, FileText, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, translate } = useLanguage();

  // Traductions pour le footer
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
      FR: "Rejoignez-nous sur les réseaux sociaux",
      EN: "Join us on social media",
      ES: "Únase a nosotros en las redes sociales",
      IT: "Unisciti a noi sui social media",
      PT: "Junte-se a nós nas redes sociais",
      RO: "Alăturați-vă nouă pe rețelele sociale"
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
      RO: "Pagina Facebook"
    }
  };

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto p-6">
        {/* Logo and company description */}
        <div className="mb-8">
          <Link to="/">
            <img 
              src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
              alt="Auto Adi" 
              className="h-16 mb-4"
            />
          </Link>
          <p className="text-gray-100 mb-4">
            {translate('companyDescription', translations.companyDescription)}
          </p>
          <p className="text-gray-100 font-semibold mb-4">
            {translate('contactAvailability', translations.contactAvailability)}
          </p>
          <div className="flex space-x-4 mb-8">
            <a 
              href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} className="text-white" />
            </a>
            <a 
              href="https://wa.me/393761753341" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} className="text-white" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{translate('quickLinks', translations.quickLinks)}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/vehicules/neufs" className="text-gray-100 hover:text-gray-300 transition-colors block">
                {translate('newVehicles', translations.newVehicles)}
              </Link>
            </li>
            <li>
              <Link to="/vehicules/occasion" className="text-gray-100 hover:text-gray-300 transition-colors block">
                {translate('usedVehicles', translations.usedVehicles)}
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-gray-100 hover:text-gray-300 transition-colors block">
                {translate('services', translations.services)}
              </Link>
            </li>
            <li>
              <Link to="/financement" className="text-gray-100 hover:text-gray-300 transition-colors block">
                {translate('financing', translations.financing)}
              </Link>
            </li>
            <li>
              <Link to="/rachat" className="text-gray-100 hover:text-gray-300 transition-colors block">
                {translate('vehicleBuyback', translations.vehicleBuyback)}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{translate('legalInfo', translations.legalInfo)}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/mentions-legales" className="text-gray-100 hover:text-gray-300 transition-colors block flex items-center">
                <Shield className="h-4 w-4 mr-2 text-brand-orange" />
                {translate('legalNotice', translations.legalNotice)}
              </Link>
            </li>
            <li>
              <Link to="/politique-confidentialite" className="text-gray-100 hover:text-gray-300 transition-colors block flex items-center">
                <Shield className="h-4 w-4 mr-2 text-brand-orange" />
                {translate('privacyPolicy', translations.privacyPolicy)}
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-gray-100 hover:text-gray-300 transition-colors block flex items-center">
                <Settings className="h-4 w-4 mr-2 text-brand-orange" />
                {translate('cookieManagement', translations.cookieManagement)}
              </Link>
            </li>
            <li>
              <Link to="/cgv" className="text-gray-100 hover:text-gray-300 transition-colors block flex items-center">
                <FileText className="h-4 w-4 mr-2 text-brand-orange" />
                {translate('termsAndConditions', translations.termsAndConditions)}
              </Link>
            </li>
            <li>
              <Link to="/conditions" className="text-gray-100 hover:text-gray-300 transition-colors block flex items-center">
                <FileText className="h-4 w-4 mr-2 text-brand-orange" />
                {translate('saleConditions', translations.saleConditions)}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{translate('contact', translations.contact)}</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-brand-orange" />
              <span className="text-gray-100">‪+39 376 175 3341‬</span>
            </li>
            <li className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-3 text-brand-orange" />
              <span className="text-gray-100">WhatsApp: ‪+39 376 175 3341‬</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-brand-orange" />
              <span className="text-gray-100">serviceautoadi@gmail.com</span>
            </li>
            <li className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-brand-orange" />
              <span className="text-gray-100">
                Borgo Ognissanti, 142r 50123 Firenze FI Italie
              </span>
            </li>
            <li className="flex items-center">
              <Facebook className="h-5 w-5 mr-3 text-brand-orange" />
              <a 
                href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-gray-300 transition-colors"
              >
                {translate('facebookPage', translations.facebookPage)}
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 pt-6 text-center">
          <p className="text-gray-100 text-sm">
            {translate('copyright', translations.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
