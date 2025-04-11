
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Image } from 'lucide-react';
import { Card } from "@/components/ui/card";

const VehicleImagesForm = () => {
  const { 
    formState, 
    updateField, 
    addImage, 
    removeImage, 
    updateImage 
  } = useVehicleForm();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image" className="text-base font-medium">Image principale *</Label>
        <div className="relative">
          <Input
            type="url"
            id="image"
            value={formState.image}
            onChange={(e) => updateField('image', e.target.value)}
            placeholder="URL de l'image principale..."
            className="pl-10"
          />
          <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        
        {formState.image && (
          <div className="mt-2 rounded-md overflow-hidden h-40 bg-gray-100">
            <img 
              src={formState.image} 
              alt="Aperçu de l'image principale"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=URL+Invalide';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Images additionnelles</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addImage}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formState.additionalImages.map((img, index) => (
            <Card key={index} className="p-4 relative">
              <div className="relative mb-2">
                <Input
                  type="url"
                  value={img}
                  placeholder="URL de l'image..."
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="pl-10 pr-10"
                />
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="absolute right-0 top-0 h-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {img && (
                <div className="rounded-md overflow-hidden h-32 bg-gray-100">
                  <img 
                    src={img} 
                    alt={`Aperçu de l'image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=URL+Invalide';
                    }}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
        
        {formState.additionalImages.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
            <Image className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Aucune image additionnelle</p>
            <p className="text-xs text-gray-400">Cliquez sur "Ajouter" pour inclure plus d'images</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleImagesForm;
