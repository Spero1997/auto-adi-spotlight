
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MainNavigation from './navigation/MainNavigation';
import MobileMenu from './navigation/MobileMenu';
import LanguageSelector from './language/LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, translate } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const translations = {
    language: {
      FR: "Langue",
      EN: "Language",
      ES: "Idioma",
      IT: "Lingua",
      PT: "Idioma",
      RO: "Limbă"
    },
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled
          ? 'bg-white shadow-md py-2' 
          : 'bg-white shadow-sm py-2'
      )}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <Logo className={cn('h-10 w-auto', 'text-blue-600')} />
          </Link>

          <div className="hidden lg:flex items-center space-x-1 w-full justify-between">
            <MainNavigation />
            <LanguageSelector translations={translations} />
          </div>
          
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-gray-700" />
            ) : (
              <Menu className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
