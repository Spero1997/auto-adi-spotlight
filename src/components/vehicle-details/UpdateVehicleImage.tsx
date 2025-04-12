
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateVehicleImage } from '@/utils/vehicleImportService';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface UpdateVehicleImageProps {
  vehicleId: string;
  updateImage: (newImageUrl: string) => void;
}

const UpdateVehicleImage = ({ vehicleId, updateImage }: UpdateVehicleImageProps) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateImage = async () => {
    if (!newImageUrl.trim()) {
      toast.error("Veuillez entrer une URL d'image valide");
      return;
    }

    setIsLoading(true);
    try {
      const success = updateVehicleImage(vehicleId, newImageUrl);
      
      if (success) {
        updateImage(newImageUrl);
        toast.success("L'image du véhicule a été mise à jour avec succès");
        setNewImageUrl('');
      } else {
        toast.error("Erreur lors de la mise à jour de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'image:", error);
      toast.error("Une erreur est survenue lors de la mise à jour de l'image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 border border-dashed border-gray-300 rounded-md p-4">
      <h3 className="text-sm font-medium mb-2">Mettre à jour l'image du véhicule</h3>
      <div className="flex gap-2">
        <Input
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Nouvelle URL d'image..."
          className="flex-1"
        />
        <Button 
          onClick={handleUpdateImage} 
          disabled={isLoading || !newImageUrl.trim()}
          size="sm"
        >
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Mettre à jour"}
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Note: Cette option est uniquement disponible pour certains véhicules spécifiques.</p>
    </div>
  );
};

export default UpdateVehicleImage;
