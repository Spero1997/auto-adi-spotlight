
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Image } from 'lucide-react';

interface UpdateVehicleImageProps {
  vehicleId: string;
  updateImage: (newImageUrl: string) => void;
}

const UpdateVehicleImage = ({ 
  vehicleId, 
  updateImage
}: UpdateVehicleImageProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateImage = () => {
    setIsUpdating(true);
    
    // Utiliser la nouvelle image Toyota C-HR bleue
    const newImageUrl = '/lovable-uploads/3a09b1ff-510f-4248-97b3-89ccc312f68e.png';
    
    updateImage(newImageUrl);
    setIsUpdating(false);
    
    toast.success("Image principale mise à jour avec succès");
  };

  return (
    <div className="mt-2 space-y-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleUpdateImage}
        disabled={isUpdating}
        className="w-full flex items-center justify-center gap-2"
      >
        <Image className="h-4 w-4" />
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour l\'image principale'}
      </Button>
    </div>
  );
};

export default UpdateVehicleImage;
