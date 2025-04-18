
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import LanguageSelector from './header/LanguageSelector';
import MobileLanguageSelector from './header/MobileLanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-2'
    )}>
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <Logo className={cn('h-10 w-auto', 'text-blue-600')} />
          </Link>

          <DesktopNavigation />

          {/* Desktop Language Selector */}
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>
          
          {/* Mobile Navigation Controls */}
          <div className="flex items-center lg:hidden">
            <MobileLanguageSelector />
            
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
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
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && <MobileNavigation isMenuOpen={isMenuOpen} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
