
// Types for the vehicle form
export type Feature = string;

export interface VehicleFormState {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  fuelType: string;
  price: string;
  image: string;
  additionalImages: string[];
  description: string;
  exteriorColor: string;
  interiorColor: string;
  transmission: string;
  doors: string;
  engine: string;
  features: Feature[];
}

export interface VehicleFormContextType {
  formState: VehicleFormState;
  updateField: <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K]
  ) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  // Functions specifically for arrays
  addImage: () => void;
  removeImage: (index: number) => void;
  updateImage: (index: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  updateFeature: (index: number, value: string) => void;
}

export const initialFormState: VehicleFormState = {
  brand: '',
  model: '',
  year: '',
  mileage: '',
  fuelType: '',
  price: '',
  image: '',
  additionalImages: [''],
  description: '',
  exteriorColor: '',
  interiorColor: '',
  transmission: '',
  doors: '',
  engine: '',
  features: [''],
};
