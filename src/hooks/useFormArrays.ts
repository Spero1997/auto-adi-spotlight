
import { useState } from 'react';
import { VehicleFormState } from '@/utils/types/vehicleForm';

export const useFormArrays = (
  formState: VehicleFormState,
  setFormState: React.Dispatch<React.SetStateAction<VehicleFormState>>
) => {
  // Functions for handling additional images array
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

  // Functions for handling features array
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

  return {
    addImage,
    removeImage,
    updateImage,
    addFeature,
    removeFeature,
    updateFeature
  };
};
