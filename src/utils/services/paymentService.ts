
import { supabase } from '@/integrations/supabase/client';

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
