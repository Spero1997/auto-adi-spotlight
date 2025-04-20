
import { useState, useEffect } from 'react';
import MainHeader from './header/MainHeader';
import HeroContent from './hero/HeroContent';

const AnimatedHero = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-brand-blue to-brand-darkBlue">
      <div className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat hero-background-animate">
        <div className="absolute inset-0 bg-black/70 z-1"></div>
      </div>
      
      <MainHeader scrolled={scrolled} />
      <HeroContent />
    </div>
  );
};

export default AnimatedHero;
