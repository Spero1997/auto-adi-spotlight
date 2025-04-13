
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FeaturedCars from '@/components/FeaturedCars';
import QuickSearch from '@/components/QuickSearch';
import { updateVolvoV40Image } from '@/scripts/updateVolvoV40Image';
import { addVolvoV40 } from '@/scripts/addVolvoV40';
import { updateToyotaCHRImage } from '@/scripts/updateToyotaCHRImage';
import { addToyotaCHR } from '@/scripts/addToyotaCHR';

const VehiculesOccasion = () => {
  useEffect(() => {
    // Ajouter les véhicules au catalogue s'ils n'existent pas déjà
    addVolvoV40();
    addToyotaCHR();
    
    // Mettre à jour les images des véhicules s'ils existent dans le catalogue
    updateVolvoV40Image();
    updateToyotaCHRImage();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Véhicules d'occasion | Auto Import</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion importés à prix compétitifs. Garantie et service après-vente inclus." />
      </Helmet>
      
      <div className="py-6">
        <QuickSearch />
        <FeaturedCars />
      </div>
    </div>
  );
};

export default VehiculesOccasion;
