
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
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
    }
  };

  return (
    <footer className="bg-gray-100 pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-12"
              />
            </Link>
            <p className="text-gray-600">
              {translate('companyDescription', translations.companyDescription)}
            </p>
            <p className="text-gray-600 font-semibold">
              {translate('contactAvailability', translations.contactAvailability)}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://wa.me/393761753341" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translate('quickLinks', translations.quickLinks)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicules/neufs" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('newVehicles', translations.newVehicles)}
                </Link>
              </li>
              <li>
                <Link to="/vehicules/occasion" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('usedVehicles', translations.usedVehicles)}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('services', translations.services)}
                </Link>
              </li>
              <li>
                <Link to="/financement" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('financing', translations.financing)}
                </Link>
              </li>
              <li>
                <Link to="/rachat" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('vehicleBuyback', translations.vehicleBuyback)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translate('legalInfo', translations.legalInfo)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentions-legales" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('legalNotice', translations.legalNotice)}
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('privacyPolicy', translations.privacyPolicy)}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('cookieManagement', translations.cookieManagement)}
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('termsAndConditions', translations.termsAndConditions)}
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-600 hover:text-brand-blue transition-colors">
                  {translate('saleConditions', translations.saleConditions)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{translate('contact', translations.contact)}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0" />
                <span className="text-gray-600">‪+39 376 175 3341‬</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0" />
                <span className="text-gray-600">WhatsApp: ‪+39 376 175 3341‬</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0" />
                <span className="text-gray-600">serviceautoadi@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0" />
                <span className="text-gray-600">
                  Borgo Ognissanti, 142r 50123 Firenze FI Italie
                </span>
              </li>
              <li className="flex items-start">
                <Facebook className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0" />
                <a 
                  href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-blue transition-colors"
                >
                  {language === 'FR' ? 'Page Facebook' : 
                   language === 'EN' ? 'Facebook Page' :
                   language === 'ES' ? 'Página de Facebook' :
                   language === 'IT' ? 'Pagina Facebook' :
                   language === 'PT' ? 'Página do Facebook' :
                   'Pagina Facebook'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 py-8 text-center">
          <p className="text-gray-600 text-sm">
            {translate('copyright', translations.copyright)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
