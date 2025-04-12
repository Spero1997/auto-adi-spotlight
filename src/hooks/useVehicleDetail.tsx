
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ImportedVehicle, getImportedVehicles } from '@/utils/vehicleImportService';

export const useVehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    try {
      // First try to find the vehicle in the featured catalog
      let vehicles = getImportedVehicles('featured');
      console.log("Véhicules chargés du catalogue vedette:", vehicles.length);
      
      let foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      
      if (!foundVehicle) {
        // If not found in featured, try the standard catalog
        vehicles = getImportedVehicles('standard');
        console.log("Véhicules chargés du catalogue standard:", vehicles.length);
        foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      }
      
      if (!foundVehicle) {
        // If still not found, check all vehicles with more flexible matching
        vehicles = getImportedVehicles();
        console.log("Véhicules chargés de tous les catalogues:", vehicles.length);
        
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
  
  return { vehicle, isLoading, notFound };
};
