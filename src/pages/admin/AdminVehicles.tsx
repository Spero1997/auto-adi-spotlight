
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { getImportedVehicles, saveImportedVehicles, deleteImportedVehicle, ImportedVehicle, addVehicle } from '@/utils/vehicleImportService';

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
  
  useEffect(() => {
    loadVehicles();
    
    // Ajouter un écouteur d'événement pour les mises à jour des véhicules
    const handleVehiclesUpdated = () => {
      console.log("Événement vehiclesUpdated capturé dans AdminVehicles");
      loadVehicles();
    };
    
    window.addEventListener('vehiclesUpdated', handleVehiclesUpdated);
    return () => {
      window.removeEventListener('vehiclesUpdated', handleVehiclesUpdated);
    };
  }, []);

  const loadVehicles = () => {
    try {
      setIsLoading(true);
      const importedVehicles = getImportedVehicles();
      console.log("Véhicules chargés:", importedVehicles.length);
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

  const handleAddNewVehicle = () => {
    // Créer un nouveau véhicule vide plutôt que de rediriger
    const newVehicle: ImportedVehicle = {
      id: `vehicle-standard-${Date.now()}`,
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      price: 0,
      fuelType: 'Essence',
      transmission: 'Manuelle',
      exteriorColor: '',
      interiorColor: '',
      image: '',
      description: '',
      features: [],
      images: [],
      catalogType: 'standard'
    };
    
    setCurrentVehicle(newVehicle);
    setIsEditDialogOpen(true);
  };

  const handleEditClick = (vehicle: ImportedVehicle) => {
    setCurrentVehicle({ 
      ...vehicle,
      images: vehicle.images || [] // S'assurer que images est toujours un tableau
    });
    setIsEditDialogOpen(true);
  };

  const handleSave = (vehicle: ImportedVehicle) => {
    if (!vehicle) return;

    try {
      // Si c'est un nouveau véhicule (sans ID existant dans la liste)
      const isNewVehicle = !vehicles.some(v => v.id === vehicle.id);
      
      if (isNewVehicle) {
        // Ajouter un nouveau véhicule
        const success = addVehicle(vehicle, 'standard');
        
        if (success) {
          // Mettre à jour l'état local immédiatement
          setVehicles(prevVehicles => [...prevVehicles, vehicle]);
          toast.success(`${vehicle.brand} ${vehicle.model} ajouté avec succès`);
          
          // Forcer un rechargement des véhicules après un court délai
          setTimeout(() => {
            loadVehicles();
          }, 300);
        } else {
          toast.error("Erreur lors de l'ajout du véhicule");
        }
      } else {
        // Mettre à jour un véhicule existant
        const updatedVehicles = vehicles.map(v => 
          v.id === vehicle.id ? vehicle : v
        );
        
        saveImportedVehicles(updatedVehicles);
        setVehicles(updatedVehicles);
        toast.success(`${vehicle.brand} ${vehicle.model} mis à jour avec succès`);
        
        // Forcer un rechargement après un court délai pour s'assurer que les modifications sont bien prises en compte
        setTimeout(() => {
          loadVehicles();
          
          // Déclencher explicitement l'événement de mise à jour
          window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
            detail: { catalogType: 'standard' } 
          }));
        }, 300);
      }
      
      setIsEditDialogOpen(false);
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
      
      // Forcer un rechargement des véhicules
      setTimeout(loadVehicles, 300);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error("Erreur lors de la suppression du véhicule");
    } finally {
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
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
