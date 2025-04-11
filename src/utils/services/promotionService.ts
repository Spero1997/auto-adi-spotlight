
import { supabase } from '@/integrations/supabase/client';

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
