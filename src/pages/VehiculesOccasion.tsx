
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FeaturedCars from '@/components/FeaturedCars';
import QuickSearch from '@/components/QuickSearch';
import { updateVolvoV40Image } from '@/scripts/updateVolvoV40Image';
import { addVolvoV40 } from '@/scripts/addVolvoV40';

const VehiculesOccasion = () => {
  useEffect(() => {
    // Ajouter la Volvo V40 au catalogue si elle n'existe pas déjà
    addVolvoV40();
    
    // Mettre à jour l'image de la Volvo V40 s'il existe dans le catalogue
    updateVolvoV40Image();
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
