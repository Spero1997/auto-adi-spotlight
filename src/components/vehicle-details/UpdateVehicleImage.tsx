
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Image } from 'lucide-react';

interface UpdateVehicleImageProps {
  vehicleId: string;
  updateImage: (newImageUrl: string) => void;
  // Propriétés optionnelles pour gérer les images additionnelles
  additionalImages?: string[];
  updateAdditionalImages?: (updatedImages: string[]) => void;
}

const UpdateVehicleImage = ({ 
  vehicleId, 
  updateImage,
  additionalImages,
  updateAdditionalImages
}: UpdateVehicleImageProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateImage = () => {
    setIsUpdating(true);
    
    // Utiliser la nouvelle image Toyota C-HR bleue
    const newImageUrl = '/lovable-uploads/3a09b1ff-510f-4248-97b3-89ccc312f68e.png';
    
    updateImage(newImageUrl);
    
    // Mettre à jour les images additionnelles si la fonction est fournie
    if (additionalImages && updateAdditionalImages) {
      // Ajouter quelques images additionnelles au véhicule
      const additionalImageUrls = [
        '/lovable-uploads/4a7d0135-15bc-4d67-8593-95afa2898553.png',
        '/lovable-uploads/a148b039-46ad-4622-a3ec-a299bc1de8e4.png',
        '/lovable-uploads/b11a2e4e-48e8-4a7b-a908-f4bf4874c706.png',
        '/lovable-uploads/69913e1b-9583-451e-841b-0091350a3fba.png',
        '/lovable-uploads/8f78987f-d770-458f-820e-6298eaad2db1.png',
        '/lovable-uploads/68704d4d-09dd-42ce-b2f0-974c7764a40f.png'
      ];
      
      updateAdditionalImages([...additionalImageUrls]);
    }
    
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
