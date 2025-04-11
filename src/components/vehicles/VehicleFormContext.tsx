
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { addImportedVehicle } from "@/utils/vehicleImportService";

// Types pour notre contexte
type Feature = string;

interface VehicleFormState {
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

interface VehicleFormContextType {
  formState: VehicleFormState;
  updateField: <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K]
  ) => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  // Fonctions spécifiques pour les tableaux
  addImage: () => void;
  removeImage: (index: number) => void;
  updateImage: (index: number, value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  updateFeature: (index: number, value: string) => void;
}

// Valeurs initiales du formulaire
const initialFormState: VehicleFormState = {
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

// Création du contexte
const VehicleFormContext = createContext<VehicleFormContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useVehicleForm = () => {
  const context = useContext(VehicleFormContext);
  if (!context) {
    throw new Error('useVehicleForm doit être utilisé dans un VehicleFormProvider');
  }
  return context;
};

// Provider du contexte
export const VehicleFormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<VehicleFormState>(initialFormState);
  const { toast } = useToast();

  // Fonction pour mettre à jour un champ spécifique
  const updateField = <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Fonctions spécifiques pour les tableaux
  const addImage = () => {
    setFormState(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const removeImage = (index: number) => {
    setFormState(prev => {
      const newImages = [...prev.additionalImages];
      newImages.splice(index, 1);
      return { ...prev, additionalImages: newImages };
    });
  };

  const updateImage = (index: number, value: string) => {
    setFormState(prev => {
      const newImages = [...prev.additionalImages];
      newImages[index] = value;
      return { ...prev, additionalImages: newImages };
    });
  };

  const addFeature = () => {
    setFormState(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormState(prev => {
      const newFeatures = [...prev.features];
      newFeatures.splice(index, 1);
      return { ...prev, features: newFeatures };
    });
  };

  const updateFeature = (index: number, value: string) => {
    setFormState(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.brand || !formState.model || !formState.year || !formState.mileage || !formState.fuelType || !formState.price) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Filtrer les images additionnelles vides
    const filteredAdditionalImages = formState.additionalImages.filter(img => img.trim() !== '');

    const newVehicle = {
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
    };

    const success = await addImportedVehicle(newVehicle);

    if (success) {
      resetForm();
      toast({
        title: "Succès",
        description: `${formState.brand} ${formState.model} a été ajouté avec succès.`,
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du véhicule.",
        variant: "destructive",
      });
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormState(initialFormState);
  };

  const value = {
    formState,
    updateField,
    handleSubmit,
    resetForm,
    addImage,
    removeImage,
    updateImage,
    addFeature,
    removeFeature,
    updateFeature,
  };

  return (
    <VehicleFormContext.Provider value={value}>
      {children}
    </VehicleFormContext.Provider>
  );
};
