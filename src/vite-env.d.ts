
/// <reference types="vite/client" />

// Add custom type declaration for window.addVehicleFromAssistant
interface Window {
  addVehicleFromAssistant?: (
    brand: string,
    model: string,
    year: number,
    mileage: number,
    price: number,
    fuelType: string,
    transmission: string,
    exteriorColor: string,
    interiorColor: string,
    image: string,
    fbLink?: string,
    description?: string,
    features?: string[],
    catalogType?: 'standard' | 'featured'
  ) => boolean;
}
