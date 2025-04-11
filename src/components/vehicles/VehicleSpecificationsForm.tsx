
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehicleSpecificationsForm = () => {
  const { formState, updateField } = useVehicleForm();

  const getFuelTypeOptions = () => [
    { value: 'Essence', label: 'Essence' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Hybride', label: 'Hybride' },
    { value: 'Électrique', label: 'Électrique' },
    { value: 'GPL', label: 'GPL' },
    { value: 'Hydrogène', label: 'Hydrogène' }
  ];

  const getTransmissionOptions = () => [
    { value: 'Manuelle', label: 'Manuelle' },
    { value: 'Automatique', label: 'Automatique' },
    { value: 'Semi-automatique', label: 'Semi-automatique' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fuelType">Type de carburant *</Label>
          <Select 
            value={formState.fuelType} 
            onValueChange={(value) => updateField('fuelType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {getFuelTypeOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select 
            value={formState.transmission} 
            onValueChange={(value) => updateField('transmission', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {getTransmissionOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="doors">Nombre de portes</Label>
          <Input
            type="number"
            id="doors"
            value={formState.doors}
            onChange={(e) => updateField('doors', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="engine">Moteur</Label>
          <Input
            type="text"
            id="engine"
            value={formState.engine}
            onChange={(e) => updateField('engine', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="exteriorColor">Couleur extérieure</Label>
          <Input
            type="text"
            id="exteriorColor"
            value={formState.exteriorColor}
            onChange={(e) => updateField('exteriorColor', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="interiorColor">Couleur intérieure</Label>
          <Input
            type="text"
            id="interiorColor"
            value={formState.interiorColor}
            onChange={(e) => updateField('interiorColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecificationsForm;
