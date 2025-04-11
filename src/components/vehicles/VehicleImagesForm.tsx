
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from 'lucide-react';

const VehicleImagesForm = () => {
  const { 
    formState, 
    updateField, 
    addImage, 
    removeImage, 
    updateImage 
  } = useVehicleForm();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image">URL de l'image principale</Label>
        <Input
          type="url"
          id="image"
          value={formState.image}
          onChange={(e) => updateField('image', e.target.value)}
        />
      </div>
      
      <div>
        <Label>Images additionnelles</Label>
        {formState.additionalImages.map((img, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              type="url"
              value={img}
              placeholder="URL de l'image..."
              onChange={(e) => updateImage(index, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addImage}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une image
        </Button>
      </div>
    </div>
  );
};

export default VehicleImagesForm;
