
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [selectedVehicleType, setSelectedVehicleType] = useState<'homme' | 'femme' | null>(null);

  const handleVehicleTypeClick = (type: 'homme' | 'femme') => {
    setSelectedVehicleType(type);
    
    // Naviguer vers la page appropriée
    if (type === 'homme') {
      navigate('/vehicules/occasion?categories=berline,suv');
    } else {
      navigate('/vehicules/occasion?categories=citadine,compacte');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/lovable-uploads/4823ca5c-e9d1-4587-af3e-99002b7b76ad.png')",
          filter: "brightness(0.85)"
        }}
      />
      
      {/* Contenu du hero */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Titre principal avec mise en évidence */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Exigez <span className="text-yellow-400">la compétence</span>,<br />
            même en uniforme.
          </h1>
          
          {/* Sous-titre */}
          <div className="text-white text-xl md:text-2xl mb-10">
            <p className="mb-2">Qualité, Confort et Style.</p>
            <p>
              Pour vous accompagner là où la compétence est<br />
              le reflet de votre engagement.
            </p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => handleVehicleTypeClick('homme')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md font-bold text-lg"
            >
              POUR HOMME
            </Button>
            
            <Button 
              onClick={() => handleVehicleTypeClick('femme')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 rounded-md font-bold text-lg"
            >
              POUR FEMME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
