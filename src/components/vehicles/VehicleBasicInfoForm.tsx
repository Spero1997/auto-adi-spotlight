
import React from 'react';
import { useVehicleForm } from './VehicleFormContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Gauge, Calendar, Banknote, Fuel, GripVertical } from 'lucide-react';

const VehicleBasicInfoForm = () => {
  const { formState, updateField } = useVehicleForm();

  const fuelTypes = [
    { value: 'Essence', label: 'Essence' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Hybride', label: 'Hybride' },
    { value: 'Électrique', label: 'Électrique' },
    { value: 'GPL', label: 'GPL' },
    { value: 'Hydrogène', label: 'Hydrogène' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand" className="text-base font-medium">Marque *</Label>
          <div className="relative">
            <Input
              type="text"
              id="brand"
              value={formState.brand}
              onChange={(e) => updateField('brand', e.target.value)}
              required
              placeholder="Ex: Renault, Peugeot..."
              className="pl-10"
            />
            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model" className="text-base font-medium">Modèle *</Label>
          <div className="relative">
            <Input
              type="text"
              id="model"
              value={formState.model}
              onChange={(e) => updateField('model', e.target.value)}
              required
              placeholder="Ex: Clio, 308..."
              className="pl-10"
            />
            <GripVertical className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year" className="text-base font-medium">Année *</Label>
          <div className="relative">
            <Input
              type="number"
              id="year"
              value={formState.year}
              onChange={(e) => updateField('year', e.target.value)}
              required
              placeholder="Ex: 2022"
              min="1990"
              max="2025"
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mileage" className="text-base font-medium">Kilométrage (km) *</Label>
          <div className="relative">
            <Input
              type="number"
              id="mileage"
              value={formState.mileage}
              onChange={(e) => updateField('mileage', e.target.value)}
              required
              placeholder="Ex: 45000"
              min="0"
              className="pl-10"
            />
            <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-base font-medium">Prix (€) *</Label>
          <div className="relative">
            <Input
              type="number"
              id="price"
              value={formState.price}
              onChange={(e) => updateField('price', e.target.value)}
              required
              placeholder="Ex: 15000"
              min="0"
              className="pl-10"
            />
            <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fuelType" className="text-base font-medium">Type de carburant *</Label>
          <div className="relative">
            <Select
              value={formState.fuelType}
              onValueChange={(value) => updateField('fuelType', value)}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Sélectionnez..." />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Fuel className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleBasicInfoForm;
