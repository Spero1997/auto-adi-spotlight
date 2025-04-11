
import { supabase } from '@/integrations/supabase/client';
import { ImportedVehicle } from '../types/vehicle';

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

export const syncLocalVehiclesToSupabase = async (localVehicles: ImportedVehicle[]) => {
  try {
    // Map local vehicle structure to Supabase structure
    const supabaseVehicles = localVehicles.map(vehicle => ({
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
      is_featured: vehicle.featured || false
    }));
    
    // Insert all vehicles
    const { data, error } = await supabase
      .from('vehicles')
      .upsert(supabaseVehicles, { onConflict: 'brand,model,year' });
    
    if (error) {
      console.error('Error syncing vehicles to Supabase:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in syncLocalVehiclesToSupabase:', error);
    throw error;
  }
};

export const addVehicleToSupabase = async (vehicle: any) => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert(vehicle)
      .select();
    
    if (error) {
      console.error('Error adding vehicle to Supabase:', error);
      throw error;
    }
    
    return data?.[0];
  } catch (error) {
    console.error('Error in addVehicleToSupabase:', error);
    throw error;
  }
};

export const updateVehicleInSupabase = async (id: string, vehicle: any) => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update(vehicle)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error updating vehicle in Supabase:', error);
      throw error;
    }
    
    return data?.[0];
  } catch (error) {
    console.error('Error in updateVehicleInSupabase:', error);
    throw error;
  }
};

export const deleteVehicleFromSupabase = async (id: string) => {
  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting vehicle from Supabase:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteVehicleFromSupabase:', error);
    throw error;
  }
};
