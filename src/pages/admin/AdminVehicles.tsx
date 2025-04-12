
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getImportedVehicles, saveImportedVehicles, deleteImportedVehicle, ImportedVehicle } from '@/utils/vehicleImportService';

// UI Components
import VehicleTable from '@/components/admin/vehicles/VehicleTable';
import VehicleSearchBar from '@/components/admin/vehicles/VehicleSearchBar';
import VehicleEditDialog from '@/components/admin/vehicles/VehicleEditDialog';
import VehicleDeleteDialog from '@/components/admin/vehicles/VehicleDeleteDialog';

const AdminVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<ImportedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<ImportedVehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
    
    window.addEventListener('vehiclesUpdated', loadVehicles);
    return () => {
      window.removeEventListener('vehiclesUpdated', loadVehicles);
    };
  }, []);

  const loadVehicles = () => {
    try {
      setIsLoading(true);
      const importedVehicles = getImportedVehicles();
      setVehicles(importedVehicles);
    } catch (error) {
      console.error("Error loading vehicles:", error);
      toast.error("Erreur lors du chargement des véhicules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleEditClick = (vehicle: ImportedVehicle) => {
    setCurrentVehicle({ 
      ...vehicle,
      images: vehicle.images || [] // Ensure images is always an array
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = (vehicle: ImportedVehicle) => {
    if (!vehicle) return;

    try {
      const updatedVehicles = vehicles.map(v => 
        v.id === vehicle.id ? vehicle : v
      );
      
      saveImportedVehicles(updatedVehicles);
      setVehicles(updatedVehicles);
      setIsEditDialogOpen(false);
      toast.success(`${vehicle.brand} ${vehicle.model} mis à jour avec succès`);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast.error("Erreur lors de la sauvegarde du véhicule");
    }
  };

  const handleDeleteClick = (id: string) => {
    setVehicleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!vehicleToDelete) return;
    
    try {
      deleteImportedVehicle(vehicleToDelete);
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete));
      toast.success("Véhicule supprimé avec succès");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Erreur lors de la suppression du véhicule");
    } finally {
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const handleAddNewVehicle = () => {
    // Rediriger vers la page d'importation de véhicule
    navigate('/vehicule/import');
  };

  return (
    <>
      <Helmet>
        <title>Gestion des véhicules | Administration</title>
      </Helmet>

      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Gestion des véhicules</h1>
          
          <VehicleSearchBar 
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onAddNewVehicle={handleAddNewVehicle}
          />
        </div>
        
        <VehicleTable 
          vehicles={vehicles}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Edit Dialog */}
      <VehicleEditDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentVehicle={currentVehicle}
        setCurrentVehicle={setCurrentVehicle}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <VehicleDeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminVehicles;
