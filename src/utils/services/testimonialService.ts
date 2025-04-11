
import { supabase } from '@/integrations/supabase/client';

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
