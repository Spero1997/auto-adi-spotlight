
import React from 'react';

const AnimatedHero = () => {
  return (
    <div className="animated-header">
      <div className="animated-header-background"></div>
      <h1 className="animated-header-title">Bienvenue chez Auto ADI</h1>
      <img 
        src="https://via.placeholder.com/200x100.png?text=Voiture" 
        alt="Voiture" 
        className="animated-car"
      />
    </div>
  );
};

export default AnimatedHero;
