import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tysgujeglozoasmyjsbj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5c2d1amVnbG96b2FzbXlqc2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNjM1NzksImV4cCI6MjAzMTkzOTU3OX0.fEuzmqewq8eZzkbUtVKQW1_z4hsf0GYoYL_y2TZnSgs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
