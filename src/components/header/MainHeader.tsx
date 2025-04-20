
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MobileLanguageSelector from './MobileLanguageSelector';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

interface MainHeaderProps {
  scrolled: boolean;
}

const MainHeader = ({ scrolled }: MainHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const logoURL = "/lovable-uploads/f18eff87-6558-4180-a9d8-1f31ef85c370.png";

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-30 py-3 transition-colors duration-300 ${scrolled ? 'bg-brand-blue/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-3 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logoURL} 
              alt="Auto ADI Monaco" 
              className="h-12 md:h-14"
            />
          </Link>
          
          <DesktopNavigation scrolled={scrolled} />
          
          <div className="flex md:hidden">
            <MobileLanguageSelector />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <MobileNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default MainHeader;
