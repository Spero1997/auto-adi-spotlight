
import React from 'react';
import { Helmet } from 'react-helmet';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FeaturedCars from '@/components/FeaturedCars';

const AdminFeatured = () => {
  const navigate = useNavigate();
  
  const handleAddVehicle = () => {
    navigate('/vehicules/import');
  };
  
  return (
    <>
      <Helmet>
        <title>Véhicules en vedette | Administration</title>
      </Helmet>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des véhicules en vedette</h1>
          
          <Button onClick={handleAddVehicle} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un véhicule
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4 text-amber-500">
            <Star className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">Véhicules en vedette</h2>
          </div>
          
          <FeaturedCars featuredOnly={true} />
        </div>
      </div>
    </>
  );
};

export default AdminFeatured;
