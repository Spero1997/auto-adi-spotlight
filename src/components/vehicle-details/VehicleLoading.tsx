
import React from 'react';

const VehicleLoading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div 
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" 
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Chargement...
        </span>
      </div>
      <p className="ml-2">Chargement du véhicule...</p>
    </div>
  );
};

export default VehicleLoading;
