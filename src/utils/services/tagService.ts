
import { supabase } from '@/integrations/supabase/client';
import { Tag } from '../types/tag';

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
