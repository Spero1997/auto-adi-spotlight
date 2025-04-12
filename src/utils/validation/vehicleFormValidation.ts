
import { VehicleFormState } from "../types/vehicleForm";
import { ToastAction } from "@/components/ui/toast";
import { toast as useToast } from "@/hooks/use-toast";

export const validateVehicleForm = (formState: VehicleFormState, toast: typeof useToast): boolean => {
  if (!formState.brand || !formState.model || !formState.year || !formState.mileage || !formState.fuelType || !formState.price) {
    toast({
      title: "Erreur",
      description: "Veuillez remplir tous les champs obligatoires.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};
