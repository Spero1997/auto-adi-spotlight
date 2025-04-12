
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Car, Edit, Trash2 } from 'lucide-react';
import { ImportedVehicle } from '@/utils/vehicleImportService';
import EmptyState from '@/components/EmptyState';

interface VehicleTableProps {
  vehicles: ImportedVehicle[];
  isLoading: boolean;
  searchTerm: string;
  onEdit: (vehicle: ImportedVehicle) => void;
  onDelete: (id: string) => void;
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  isLoading,
  searchTerm,
  onEdit,
  onDelete,
}) => {
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.brand?.toLowerCase().includes(searchLower) ||
      vehicle.model?.toLowerCase().includes(searchLower) ||
      vehicle.fuelType?.toLowerCase().includes(searchLower) ||
      String(vehicle.year).includes(searchTerm) ||
      String(vehicle.price).includes(searchTerm)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (filteredVehicles.length === 0) {
    return (
      <EmptyState 
        title="Aucun véhicule trouvé"
        description={searchTerm ? "Aucun résultat pour cette recherche." : "Ajoutez des véhicules pour commencer."}
        icon={<Car className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Marque & Modèle</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Année</TableHead>
            <TableHead>Carburant</TableHead>
            <TableHead>Kilométrage</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>
                {vehicle.image ? (
                  <div className="h-16 w-24 rounded overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100?text=No+Image';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-16 w-24 bg-gray-200 flex items-center justify-center rounded">
                    <Car className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{vehicle.brand}</div>
                  <div className="text-sm text-gray-500">{vehicle.model}</div>
                </div>
              </TableCell>
              <TableCell>{vehicle.price?.toLocaleString('fr-FR')} €</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.fuelType}</TableCell>
              <TableCell>{vehicle.mileage?.toLocaleString('fr-FR')} km</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(vehicle)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(vehicle.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleTable;
