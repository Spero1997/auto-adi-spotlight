
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicleDetailsTranslations } from '@/translations/vehicleDetailsTranslations';
import { ImportedVehicle, getImportedVehicles } from '@/utils/vehicleImportService';
import { updateKiaSorentoImage } from '@/scripts/updateKiaSorento';
import { addPorscheCayenne } from '@/scripts/addPorscheCayenne';
import { checkAndUpdateBMWX5 } from '@/scripts/addBMWX5';

export const useVehicleDetails = (id: string | undefined) => {
  const [vehicle, setVehicle] = useState<ImportedVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { translate } = useLanguage();

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }
    
    try {
      if (id.includes('kia-sorento')) {
        updateKiaSorentoImage();
      }
      
      if (id.includes('porsche-cayenne')) {
        addPorscheCayenne();
      }
      
      if (id.includes('bmw-x5')) {
        const updatedBMW = checkAndUpdateBMWX5();
        if (updatedBMW) {
          setVehicle(updatedBMW);
          setIsLoading(false);
          return;
        }
      }
      
      // Filter out any BMW X7 vehicles that might be in the catalogs
      const filterBMWX7 = (vehicles: ImportedVehicle[]) => {
        return vehicles.filter(v => !(v.brand === "BMW" && v.model && v.model.includes("X7")));
      };
      
      let vehicles = filterBMWX7(getImportedVehicles('featured'));
      let foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      
      if (!foundVehicle) {
        vehicles = filterBMWX7(getImportedVehicles('standard'));
        foundVehicle = vehicles.find(v => v.id === id || v.id.includes(id) || id.includes(v.id));
      }
      
      if (!foundVehicle) {
        vehicles = filterBMWX7(getImportedVehicles());
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
        setVehicle(foundVehicle);
      } else {
        setNotFound(true);
        toast.error(translate("vehicleNotFound", vehicleDetailsTranslations.FR));
      }
    } catch (error) {
      console.error("Erreur lors du chargement du véhicule:", error);
      toast.error(translate("vehicleNotFound", vehicleDetailsTranslations.FR));
    } finally {
      setIsLoading(false);
    }
  }, [id, translate]);

  return { vehicle, isLoading, notFound };
};
