
import React from 'react';

interface VehicleOrderSummaryProps {
  brand: string;
  model: string;
  price: number;
}

const VehicleOrderSummary = ({ brand, model, price }: VehicleOrderSummaryProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Véhicule:</span>
        <span>{brand} {model}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Prix total:</span>
        <span className="font-bold">{price.toLocaleString('fr-FR')} €</span>
      </div>
      <div className="flex justify-between items-center text-brand-blue">
        <span className="font-medium">Acompte (20%):</span>
        <span className="font-bold">{Math.round(price * 0.2).toLocaleString('fr-FR')} €</span>
      </div>
    </div>
  );
};

export default VehicleOrderSummary;
