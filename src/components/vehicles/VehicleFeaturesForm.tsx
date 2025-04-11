
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ListChecks } from 'lucide-react';
import { Card } from "@/components/ui/card";

const VehicleFeaturesForm = () => {
  const { 
    formState, 
    updateField, 
    addFeature, 
    removeFeature, 
    updateFeature 
  } = useVehicleForm();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base font-medium">Description</Label>
        <Textarea
          id="description"
          value={formState.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Décrivez le véhicule en détail..."
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium">Équipements et options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formState.features.map((feature, index) => (
            <Card key={index} className="p-2 relative flex items-center">
              <ListChecks className="h-4 w-4 text-gray-500 mx-2" />
              <Input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Équipement ou option..."
                className="border-0 flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
        
        {formState.features.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
            <ListChecks className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Aucun équipement ajouté</p>
            <p className="text-xs text-gray-400">Cliquez sur "Ajouter" pour inclure des équipements</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleFeaturesForm;
