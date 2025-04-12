
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { addVehicleToSupabase } from "@/utils/services/vehicleService";
import { useNavigate } from 'react-router-dom';
import { VehicleFormState, VehicleFormContextType, initialFormState } from '@/utils/types/vehicleForm';
import { useFormArrays } from '@/hooks/useFormArrays';
import { validateVehicleForm } from '@/utils/validation/vehicleFormValidation';
import { prepareVehicleForSupabase } from '@/utils/vehicles/vehicleDataPreparation';

// Create the context
const VehicleFormContext = createContext<VehicleFormContextType | undefined>(undefined);

// Custom hook for using the context
export const useVehicleForm = () => {
  const context = useContext(VehicleFormContext);
  if (!context) {
    throw new Error('useVehicleForm doit être utilisé dans un VehicleFormProvider');
  }
  return context;
};

// Context provider
export const VehicleFormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, setFormState] = useState<VehicleFormState>(initialFormState);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get array operations from our custom hook
  const { 
    addImage, 
    removeImage, 
    updateImage, 
    addFeature, 
    removeFeature, 
    updateFeature 
  } = useFormArrays(formState, setFormState);

  // Generic function to update any field
  const updateField = <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form
    if (!validateVehicleForm(formState, toast)) {
      return;
    }

    try {
      // Préparer les données pour Supabase
      const vehicleForSupabase = prepareVehicleForSupabase(formState);
      
      // Ajouter directement à Supabase
      const addedVehicle = await addVehicleToSupabase(vehicleForSupabase);
      
      if (addedVehicle) {
        console.log("Véhicule ajouté à Supabase avec succès:", addedVehicle);
        
        // Reset the form
        resetForm();
        
        // Success notification
        toast({
          title: "Succès",
          description: `${formState.brand} ${formState.model} a été ajouté avec succès.`,
        });
        
        // Force an update of displayed vehicles
        console.log("Déclenchement de l'événement vehiclesUpdated");
        window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
          detail: { catalogType: 'standard' } 
        }));
        
        // Redirect to the vehicles page after a short delay to see the new vehicle
        setTimeout(() => {
          navigate('/vehicules');
        }, 1500);
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout du véhicule.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du véhicule à Supabase.",
        variant: "destructive",
      });
    }
  };

  // Reset form to initial state
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
