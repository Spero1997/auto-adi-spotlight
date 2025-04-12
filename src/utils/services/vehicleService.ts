import { supabase } from '@/integrations/supabase/client';
import { ImportedVehicle } from '../types/vehicle';
import { toast } from 'sonner';

export const fetchVehiclesFromSupabase = async () => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching vehicles from Supabase:', error);
    throw error;
  }
  
  return data || [];
};

export const addVehicleToSupabase = async (vehicle: any) => {
  try {
    console.log("Ajout d'un véhicule à Supabase:", vehicle);
    
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicle)
      .select();
    
    if (error) {
      console.error('Error adding vehicle to Supabase:', error);
      throw error;
    }
    
    console.log("Véhicule ajouté avec succès:", data?.[0]);
    
    // Trigger an event to notify the application about the update
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: vehicle.is_featured ? 'featured' : 'standard' } 
    }));
    
    return data?.[0];
  } catch (error) {
    console.error('Error in addVehicleToSupabase:', error);
    throw error;
  }
};

export const updateVehicleInSupabase = async (id: string, vehicle: any) => {
  try {
    console.log("Mise à jour d'un véhicule dans Supabase:", id, vehicle);
    
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicle)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating vehicle in Supabase:', error);
      throw error;
    }
    
    console.log("Véhicule mis à jour avec succès:", data?.[0]);
    
    // Trigger an event to notify the application about the update
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: vehicle.is_featured ? 'featured' : 'standard' } 
    }));
    
    return data?.[0];
  } catch (error) {
    console.error('Error in updateVehicleInSupabase:', error);
    throw error;
  }
};

export const deleteVehicleFromSupabase = async (id: string) => {
  try {
    console.log("Suppression d'un véhicule de Supabase:", id);
    
    // First get the vehicle to know if it's featured
    const { data: vehicleData } = await supabase
      .from('vehicles')
      .select('is_featured')
      .eq('id', id)
      .single();
    
    const isFeatured = vehicleData?.is_featured;
    
    // Then delete it
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting vehicle from Supabase:', error);
      throw error;
    }
    
    console.log("Véhicule supprimé avec succès");
    
    // Trigger an event to notify the application about the update
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: isFeatured ? 'featured' : 'standard' } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error in deleteVehicleFromSupabase:', error);
    throw error;
  }
};

export const toggleFeaturedStatusInSupabase = async (id: string, isFeatured: boolean) => {
  try {
    console.log(`${isFeatured ? 'Ajout' : 'Retrait'} du véhicule ${id} ${isFeatured ? 'aux' : 'des'} vedettes`);
    
    const { data, error } = await supabase
      .from('vehicles')
      .update({ is_featured: isFeatured })
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating featured status in Supabase:', error);
      throw error;
    }
    
    console.log("Statut vedette mis à jour avec succès:", data?.[0]);
    
    // Trigger an event to notify the application about the update
    window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
      detail: { catalogType: 'all' } 
    }));
    
    return data?.[0];
  } catch (error) {
    console.error('Error in toggleFeaturedStatusInSupabase:', error);
    throw error;
  }
};

// Fonction utilitaire pour migrer les véhicules du localStorage vers Supabase
export const migrateLocalVehiclesToSupabase = async () => {
  try {
    // Fonction pour récupérer les véhicules du localStorage
    const getLocalVehicles = (key: string) => {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error(`Erreur lors de la récupération des véhicules depuis ${key}:`, e);
        return [];
      }
    };
    
    // Récupérer les véhicules du localStorage
    const standardVehicles = getLocalVehicles('imported_vehicles');
    const featuredVehicles = getLocalVehicles('featured_vehicles');
    
    console.log(`Migration: ${standardVehicles.length} véhicules standard et ${featuredVehicles.length} véhicules vedettes trouvés dans le localStorage`);
    
    // Combiner tous les véhicules
    const allVehicles = [...standardVehicles, ...featuredVehicles];
    
    if (allVehicles.length === 0) {
      console.log('Aucun véhicule à migrer depuis le localStorage');
      return { migrated: 0 };
    }
    
    // Convertir au format Supabase
    const supabaseVehicles = allVehicles.map(vehicle => ({
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      fuel_type: vehicle.fuelType,
      transmission: vehicle.transmission || 'Non spécifié',
      price: vehicle.price,
      description: vehicle.description || '',
      image_url: vehicle.image || '',
      additional_images: vehicle.images || [],
      exterior_color: vehicle.exteriorColor || 'Non spécifié',
      interior_color: vehicle.interiorColor || 'Non spécifié',
      engine: vehicle.engine || '',
      doors: vehicle.doors || null,
      features: vehicle.features || [],
      is_featured: vehicle.featured || vehicle.catalogType === 'featured' || false
    }));
    
    // Ajouter les véhicules à Supabase
    let migrated = 0;
    let errors = 0;
    
    for (const vehicle of supabaseVehicles) {
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .upsert(vehicle, { onConflict: 'id' })
          .select();
        
        if (error) {
          console.error(`Erreur lors de la migration du véhicule ${vehicle.brand} ${vehicle.model}:`, error);
          errors++;
        } else {
          console.log(`Véhicule ${vehicle.brand} ${vehicle.model} migré avec succès`);
          migrated++;
        }
      } catch (e) {
        console.error(`Exception lors de la migration du véhicule ${vehicle.brand} ${vehicle.model}:`, e);
        errors++;
      }
    }
    
    console.log(`Migration terminée: ${migrated} véhicules migrés, ${errors} erreurs`);
    
    if (migrated > 0) {
      // Notifier l'application que des véhicules ont été ajoutés
      window.dispatchEvent(new CustomEvent('vehiclesUpdated', { 
        detail: { catalogType: 'all' } 
      }));
    }
    
    return { migrated, errors };
  } catch (error) {
    console.error('Erreur lors de la migration des véhicules:', error);
    throw error;
  }
};
