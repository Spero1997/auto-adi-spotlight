
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VehicleBasicInfoForm = () => {
  const { formState, updateField } = useVehicleForm();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="brand">Marque *</Label>
          <Input
            type="text"
            id="brand"
            value={formState.brand}
            onChange={(e) => updateField('brand', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="model">Modèle *</Label>
          <Input
            type="text"
            id="model"
            value={formState.model}
            onChange={(e) => updateField('model', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Année *</Label>
          <Input
            type="number"
            id="year"
            value={formState.year}
            onChange={(e) => updateField('year', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="mileage">Kilométrage *</Label>
          <Input
            type="number"
            id="mileage"
            value={formState.mileage}
            onChange={(e) => updateField('mileage', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Prix (€) *</Label>
          <Input
            type="number"
            id="price"
            value={formState.price}
            onChange={(e) => updateField('price', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleBasicInfoForm;
