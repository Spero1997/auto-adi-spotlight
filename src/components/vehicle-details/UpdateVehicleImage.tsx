
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UpdateVehicleImageProps {
  vehicleId: string;
  updateImage: (newImageUrl: string) => void;
}

const UpdateVehicleImage = ({ vehicleId, updateImage }: UpdateVehicleImageProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateImage = () => {
    setIsUpdating(true);
    
    // Utiliser l'image téléchargée
    const newImageUrl = '/lovable-uploads/f1910bf4-1361-4308-b68a-e2b90159423d.png';
    
    updateImage(newImageUrl);
    setIsUpdating(false);
    
    toast.success("Image mise à jour avec succès");
  };

  return (
    <div className="mt-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleUpdateImage}
        disabled={isUpdating}
      >
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour l\'image'}
      </Button>
    </div>
  );
};

export default UpdateVehicleImage;
