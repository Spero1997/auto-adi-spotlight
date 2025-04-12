
import { VehicleFormState } from "../types/vehicleForm";
import { ImportedVehicle } from "../types/vehicle";

export const prepareVehicleData = (formState: VehicleFormState): ImportedVehicle => {
  // Filter out empty additional images
  const filteredAdditionalImages = formState.additionalImages.filter(img => img.trim() !== '');

  return {
    id: `${formState.brand}-${formState.model}-${Date.now()}`,
    brand: formState.brand,
    model: formState.model,
    year: parseInt(formState.year),
    mileage: parseInt(formState.mileage),
    fuelType: formState.fuelType,
    price: parseInt(formState.price),
    image: formState.image,
    images: filteredAdditionalImages.length > 0 ? filteredAdditionalImages : undefined,
    description: formState.description,
    exteriorColor: formState.exteriorColor,
    interiorColor: formState.interiorColor,
    transmission: formState.transmission,
    doors: formState.doors ? parseInt(formState.doors) : undefined,
    engine: formState.engine,
    features: formState.features.filter(f => f.trim() !== ''),
    catalogType: 'standard' as const
  };
};

export const prepareVehicleForSupabase = (formState: VehicleFormState) => {
  const filteredAdditionalImages = formState.additionalImages.filter(img => img.trim() !== '');
  
  return {
    brand: formState.brand,
    model: formState.model,
    year: parseInt(formState.year),
    mileage: parseInt(formState.mileage),
    fuel_type: formState.fuelType,
    transmission: formState.transmission || 'Non spécifié',
    price: parseInt(formState.price),
    description: formState.description || '',
    image_url: formState.image || '',
    additional_images: filteredAdditionalImages.length > 0 ? filteredAdditionalImages : [],
    exterior_color: formState.exteriorColor || 'Non spécifié',
    interior_color: formState.interiorColor || 'Non spécifié',
    engine: formState.engine || '',
    doors: formState.doors ? parseInt(formState.doors) : null,
    features: formState.features.filter(f => f.trim() !== ''),
    is_featured: false
  };
};
