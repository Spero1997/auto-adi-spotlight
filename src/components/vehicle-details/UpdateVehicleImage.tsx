
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Image } from 'lucide-react';

interface UpdateVehicleImageProps {
  vehicleId: string;
  updateImage: (newImageUrl: string) => void;
  additionalImages?: string[];
  updateAdditionalImages?: (images: string[]) => void;
}

const UpdateVehicleImage = ({ 
  vehicleId, 
  updateImage, 
  additionalImages = [], 
  updateAdditionalImages 
}: UpdateVehicleImageProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const handleUpdateImage = () => {
    setIsUpdating(true);
    
    // Utiliser l'image téléchargée
    const newImageUrl = '/lovable-uploads/f1910bf4-1361-4308-b68a-e2b90159423d.png';
    
    updateImage(newImageUrl);
    setIsUpdating(false);
    
    toast.success("Image principale mise à jour avec succès");
  };

  const handleAddAdditionalImage = () => {
    if (!updateAdditionalImages) return;
    
    const newImageUrl = '/lovable-uploads/f1910bf4-1361-4308-b68a-e2b90159423d.png';
    const updatedImages = [...additionalImages, newImageUrl];
    
    updateAdditionalImages(updatedImages);
    toast.success("Image additionnelle ajoutée avec succès");
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
      
      {updateAdditionalImages && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdditionalOptions(!showAdditionalOptions)}
            className="w-full text-sm"
          >
            {showAdditionalOptions ? 'Masquer les options' : 'Afficher plus d\'options'}
          </Button>
          
          {showAdditionalOptions && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddAdditionalImage}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une image additionnelle
            </Button>
          )}
        </>
      )}
      
      {additionalImages && additionalImages.length > 0 && showAdditionalOptions && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2">Images additionnelles ({additionalImages.length})</p>
          <div className="grid grid-cols-3 gap-2">
            {additionalImages.map((img, index) => (
              <div key={index} className="relative h-16 w-16 rounded overflow-hidden bg-gray-100">
                <img src={img} alt={`Image ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVehicleImage;
