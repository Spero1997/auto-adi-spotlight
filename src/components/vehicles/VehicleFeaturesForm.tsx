
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from 'lucide-react';

const VehicleFeaturesForm = () => {
  const { 
    formState, 
    updateField, 
    addFeature, 
    removeFeature, 
    updateFeature 
  } = useVehicleForm();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formState.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
      </div>

      <div>
        <Label>Équipements</Label>
        {formState.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              type="text"
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFeature(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un équipement
        </Button>
      </div>
    </div>
  );
};

export default VehicleFeaturesForm;
