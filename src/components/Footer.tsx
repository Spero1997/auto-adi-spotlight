
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
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
              Auto Adi, votre partenaire de confiance pour l'achat de véhicules neufs et d'occasion en Europe.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicules/neufs" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Véhicules neufs
                </Link>
              </li>
              <li>
                <Link to="/vehicules/occasion" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Véhicules d'occasion
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/financement" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Financement
                </Link>
              </li>
              <li>
                <Link to="/rachat" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Rachat de votre véhicule
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentions-legales" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Gestion des cookies
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-600 hover:text-brand-blue transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Conditions de vente
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
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
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 py-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2002 Auto Adi. N° d'identification: 827 514 860. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
