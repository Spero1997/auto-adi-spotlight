import { supabase } from '@/integrations/supabase/client';
import { ImportedVehicle } from '../types/vehicle';
import { Tag } from '../types/tag';

// Vehicle Management
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

// Testimonials Management
export const fetchTestimonials = async (approved: boolean = true) => {
  const query = supabase
    .from('testimonials')
    .select('*');
  
  if (approved) {
    query.eq('is_approved', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
  
  return data || [];
};

export const addTestimonial = async (testimonial: any) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert(testimonial)
    .select();
  
  if (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
  
  return data?.[0];
};

export const approveTestimonial = async (id: string, isApproved: boolean) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ is_approved: isApproved })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error approving testimonial:', error);
    throw error;
  }
  
  return data?.[0];
};

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
  
  return true;
};

// Payments Management
export const fetchPayments = async () => {
  const { data, error } = await supabase
    .from('payments')
    .select('*, vehicles(*)')
    .order('payment_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
  
  return data || [];
};

export const addPayment = async (payment: any) => {
  const { data, error } = await supabase
    .from('payments')
    .insert(payment)
    .select();
  
  if (error) {
    console.error('Error adding payment:', error);
    throw error;
  }
  
  return data?.[0];
};

export const updatePaymentStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from('payments')
    .update({ status })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
  
  return data?.[0];
};

// Promotions Management
export const fetchPromotions = async () => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching promotions:', error);
    throw error;
  }
  
  return data || [];
};

export const addPromotion = async (promotion: any) => {
  const { data, error } = await supabase
    .from('promotions')
    .insert(promotion)
    .select();
  
  if (error) {
    console.error('Error adding promotion:', error);
    throw error;
  }
  
  return data?.[0];
};

export const updatePromotion = async (id: string, promotion: any) => {
  const { data, error } = await supabase
    .from('promotions')
    .update(promotion)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating promotion:', error);
    throw error;
  }
  
  return data?.[0];
};

export const togglePromotionStatus = async (id: string, isActive: boolean) => {
  const { data, error } = await supabase
    .from('promotions')
    .update({ is_active: isActive })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error toggling promotion status:', error);
    throw error;
  }
  
  return data?.[0];
};

// Statistics Management
export const fetchDailyStats = async (days: number = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .gte('date', date.toISOString().split('T')[0])
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching daily stats:', error);
    throw error;
  }
  
  return data || [];
};

export const updateDailyStats = async (stats: any) => {
  // Check if stats for today already exist
  const today = new Date().toISOString().split('T')[0];
  
  const { data: existingStats } = await supabase
    .from('stats')
    .select('*')
    .eq('date', today)
    .limit(1);
  
  if (existingStats && existingStats.length > 0) {
    // Update existing stats
    const { data, error } = await supabase
      .from('stats')
      .update(stats)
      .eq('id', existingStats[0].id)
      .select();
    
    if (error) {
      console.error('Error updating daily stats:', error);
      throw error;
    }
    
    return data?.[0];
  } else {
    // Insert new stats
    const { data, error } = await supabase
      .from('stats')
      .insert({ ...stats, date: today })
      .select();
    
    if (error) {
      console.error('Error adding daily stats:', error);
      throw error;
    }
    
    return data?.[0];
  }
};

// Tags Management
export const fetchTags = async (): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
  
  return data || [];
};

export const addTag = async (name: string): Promise<Tag> => {
  const { data, error } = await supabase
    .from('tags')
    .insert({ name })
    .select();
  
  if (error) {
    console.error('Error adding tag:', error);
    throw error;
  }
  
  return data?.[0];
};

export const fetchVehicleTags = async (vehicleId: string): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from('vehicle_tags')
    .select('tags(*)')
    .eq('vehicle_id', vehicleId);
  
  if (error) {
    console.error('Error fetching vehicle tags:', error);
    throw error;
  }
  
  // Transform the data structure to return an array of Tag objects
  // The response has this structure: [{ tags: { id: '...', name: '...' } }, ...]
  const tags: Tag[] = data.map(item => {
    // Ensure that 'tags' exists and has the expected properties
    if (item && item.tags && typeof item.tags === 'object') {
      const tagObj = item.tags as any; // Cast to any to access properties
      return {
        id: tagObj.id,
        name: tagObj.name
      };
    }
    // Provide a fallback to avoid runtime errors
    console.warn('Unexpected tag format:', item);
    return { id: '', name: '' };
  });
  
  return tags || [];
};

export const addVehicleTag = async (vehicleId: string, tagId: string) => {
  const { data, error } = await supabase
    .from('vehicle_tags')
    .insert({ vehicle_id: vehicleId, tag_id: tagId })
    .select();
  
  if (error) {
    console.error('Error adding vehicle tag:', error);
    throw error;
  }
  
  return data?.[0];
};

export const removeVehicleTag = async (vehicleId: string, tagId: string) => {
  const { error } = await supabase
    .from('vehicle_tags')
    .delete()
    .eq('vehicle_id', vehicleId)
    .eq('tag_id', tagId);
  
  if (error) {
    console.error('Error removing vehicle tag:', error);
    throw error;
  }
  
  return true;
};
