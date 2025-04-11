
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/utils/types/database.types';

const SUPABASE_URL = "https://zvjmclywakuvjiqavxbp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2am1jbHl3YWt1dmppcWF2eGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDQ2NjUsImV4cCI6MjA1OTk4MDY2NX0.8sfUPJqVbZM9kJbBz5CIpv3wIYGWZhQr8Sbt013THmA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
