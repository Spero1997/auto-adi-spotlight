
import React from 'react';

interface VehicleLoadingProps {
  message?: string;
}

const VehicleLoading = ({ message = "Chargement du véhicule..." }: VehicleLoadingProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div 
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" 
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Chargement...
        </span>
      </div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default VehicleLoading;
