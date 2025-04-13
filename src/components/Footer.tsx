
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

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
    <footer className="bg-gradient-to-b from-brand-blue/95 to-brand-darkBlue pt-16 text-white relative overflow-hidden">
      {/* Élément décoratif - cercles lumineux */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-lightBlue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-orange/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png" 
                alt="Auto Adi" 
                className="h-14 mb-2"
              />
              <div className="h-1 w-16 bg-gradient-to-r from-brand-orange to-brand-lightOrange rounded-full"></div>
            </Link>
            <p className="text-white/90 text-base leading-relaxed">
              {translate('companyDescription', translations.companyDescription)}
            </p>
            <p className="text-white font-medium text-base">
              {translate('contactAvailability', translations.contactAvailability)}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://wa.me/393761753341" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">{translate('quickLinks', translations.quickLinks)}</span>
              <span className="absolute bottom-0 left-0 h-1 w-10 bg-brand-orange rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/vehicules/neufs", labelKey: "newVehicles" },
                { to: "/vehicules/occasion", labelKey: "usedVehicles" },
                { to: "/services", labelKey: "services" },
                { to: "/financement", labelKey: "financing" },
                { to: "/rachat", labelKey: "vehicleBuyback" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-white/80 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-2 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                    <span>{translate(link.labelKey, translations[link.labelKey])}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">{translate('legalInfo', translations.legalInfo)}</span>
              <span className="absolute bottom-0 left-0 h-1 w-10 bg-brand-orange rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/mentions-legales", labelKey: "legalNotice" },
                { to: "/politique-confidentialite", labelKey: "privacyPolicy" },
                { to: "/cookies", labelKey: "cookieManagement" },
                { to: "/cgv", labelKey: "termsAndConditions" },
                { to: "/conditions", labelKey: "saleConditions" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-white/80 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-2 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                    <span>{translate(link.labelKey, translations[link.labelKey])}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-bold mb-6 relative">
              <span className="relative z-10">{translate('contact', translations.contact)}</span>
              <span className="absolute bottom-0 left-0 h-1 w-10 bg-brand-orange rounded-full"></span>
            </h3>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-lg rounded-xl p-5">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-brand-orange flex-shrink-0" />
                  <span className="text-white">‪+39 376 175 3341‬</span>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="h-5 w-5 mr-3 text-brand-orange flex-shrink-0" />
                  <span className="text-white">WhatsApp: ‪+39 376 175 3341‬</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-brand-orange flex-shrink-0" />
                  <span className="text-white">serviceautoadi@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-brand-orange flex-shrink-0" />
                  <span className="text-white">
                    Borgo Ognissanti, 142r 50123 Firenze FI Italie
                  </span>
                </li>
                <li className="flex items-start">
                  <Facebook className="h-5 w-5 mr-3 text-brand-orange flex-shrink-0" />
                  <a 
                    href="https://www.facebook.com/share/1Ep7xZS8jM/?mibextid=wwXIfr"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-orange transition-colors"
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
            </Card>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Bottom bar with subtle animation */}
        <div className="py-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-white/80 text-sm mb-4 md:mb-0">
            {translate('copyright', translations.copyright)}
          </p>
          <div className="flex space-x-2 items-center">
            <span className="text-xs uppercase tracking-wider text-white/60 mr-1">
              Auto ADI
            </span>
            <span className="inline-block w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">Monaco</span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">Italia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
