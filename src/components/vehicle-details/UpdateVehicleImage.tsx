
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

  // Array of available images to choose from
  const availableImages = [
    '/lovable-uploads/495da563-1459-4d21-b284-b231e9820ce3.png', // Nouvelle image Audi Q2 bleue
    '/lovable-uploads/d1e0c19e-72fd-40a2-a228-b75188a71035.png', // Image principale Audi A4
    '/lovable-uploads/79af1234-d887-4920-8edd-78971e26f636.png', // Image additionnelle 1
    '/lovable-uploads/84bf936c-fc4a-4fc9-8da4-696276e861ff.png', // Image additionnelle 2
    '/lovable-uploads/3ce46bb8-45d7-412a-9453-5c0a9a493ee1.png', // Image additionnelle 3
    '/lovable-uploads/7c30aba7-14ca-4c5c-a954-6e0ff468b848.png', // Image additionnelle 4
    '/lovable-uploads/7806d902-9d95-4659-b8f1-7b9f0e0b831b.png', // Image additionnelle 5
    '/lovable-uploads/1ee80174-6f50-41c3-9668-5f62b09f1ecc.png', // Image additionnelle 6
    '/lovable-uploads/f1910bf4-1361-4308-b68a-e2b90159423d.png'  // Ancienne image Hyundai
  ];

  const handleUpdateImage = () => {
    setIsUpdating(true);
    
    // Utiliser la nouvelle image Audi Q2 bleue
    const newImageUrl = '/lovable-uploads/495da563-1459-4d21-b284-b231e9820ce3.png';
    
    updateImage(newImageUrl);
    setIsUpdating(false);
    
    toast.success("Image principale mise à jour avec succès");
  };

  const handleAddAdditionalImage = () => {
    if (!updateAdditionalImages) return;
    
    // Ajouter une image additionnelle à partir de la liste
    const usedImages = additionalImages || [];
    const availableToAdd = availableImages.filter(img => !usedImages.includes(img));
    
    if (availableToAdd.length > 0) {
      const newImageUrl = availableToAdd[0];
      const updatedImages = [...usedImages, newImageUrl];
      
      updateAdditionalImages(updatedImages);
      toast.success("Image additionnelle ajoutée avec succès");
    } else {
      toast.error("Toutes les images disponibles ont déjà été ajoutées");
    }
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
