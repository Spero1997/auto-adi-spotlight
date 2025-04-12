
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ImportedVehicle, getImportedVehicles, updateVehicleImage } from '@/utils/vehicleImportService';

export const useVehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  const fetchVehicle = useCallback(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First try to find the vehicle in the featured catalog
      let vehicles = getImportedVehicles();
      console.log("Véhicules chargés du catalogue:", vehicles.length);
      
      let foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      
      if (!foundVehicle) {
        // If still not found, check all vehicles with more flexible matching
        console.log("Recherche plus flexible pour l'ID:", id);
        
        foundVehicle = vehicles.find(v => 
          v.id === id || 
          v.id.includes(id) || 
          id.includes(v.id) || 
          id.toLowerCase().includes(v.brand.toLowerCase()) || 
          id.toLowerCase().includes(v.model.toLowerCase()) ||
          `${v.brand.toLowerCase()}-${v.model.toLowerCase()}`.includes(id.toLowerCase())
        );
      }
      
      if (foundVehicle) {
        console.log("Véhicule trouvé:", foundVehicle);
        console.log("ID du véhicule:", foundVehicle.id);
        console.log("URL de l'image:", foundVehicle.image);
        setVehicle(foundVehicle);
        setNotFound(false);
      } else {
        console.error("Véhicule non trouvé avec l'ID:", id);
        setNotFound(true);
        toast.error("Véhicule non trouvé");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule:", error);
      toast.error("Erreur lors du chargement du véhicule");
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  
  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);
  
  const updateImage = useCallback((newImageUrl: string) => {
    if (vehicle) {
      const success = updateVehicleImage(vehicle.id, newImageUrl, vehicle.catalogType);
      if (success) {
        setVehicle(prev => prev ? { ...prev, image: newImageUrl } : null);
        toast.success("Image du véhicule mise à jour");
      } else {
        toast.error("Erreur lors de la mise à jour de l'image");
      }
    }
  }, [vehicle]);
  
  return { 
    vehicle, 
    isLoading, 
    notFound, 
    refreshVehicle: fetchVehicle,
    updateImage 
  };
};
