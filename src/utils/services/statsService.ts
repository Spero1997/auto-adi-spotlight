
import { supabase } from '@/integrations/supabase/client';

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
