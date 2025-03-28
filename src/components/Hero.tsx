
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [selectedVehicleType, setSelectedVehicleType] = useState<'sedan' | 'suv' | 'compact' | null>(null);

  const handleVehicleTypeClick = (type: 'sedan' | 'suv' | 'compact') => {
    setSelectedVehicleType(type);
    
    // Navigate to the appropriate page
    if (type === 'sedan') {
      navigate('/vehicules/occasion?categories=berline');
    } else if (type === 'suv') {
      navigate('/vehicules/occasion?categories=suv');
    } else {
      navigate('/vehicules/occasion?categories=citadine,compacte');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/2a03c911-dfae-4186-b265-5b9977a7b1cb.png')",
          filter: "brightness(0.75)"
        }}
      />
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Main title with highlight */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trouvez la <span className="text-yellow-400">voiture d'occasion</span><br />
            de vos rêves.
          </h1>
          
          {/* Subtitle */}
          <div className="text-white text-xl md:text-2xl mb-10">
            <p className="mb-2">Large choix de véhicules. Prix compétitifs.</p>
            <p>
              Garantie et financement disponibles<br />
              pour votre prochaine voiture.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => handleVehicleTypeClick('sedan')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md font-bold text-lg"
            >
              BERLINES
            </Button>
            
            <Button 
              onClick={() => handleVehicleTypeClick('suv')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md font-bold text-lg"
            >
              SUV & CROSSOVERS
            </Button>
            
            <Button 
              onClick={() => handleVehicleTypeClick('compact')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md font-bold text-lg"
            >
              CITADINES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
