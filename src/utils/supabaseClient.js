import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmxqnsdjjjfycvvfqilu.supabase.co';
const supabaseKey = 'sb_publishable_7qYR8WQR9BiZwZ-RekqFzg_L5UT9MUt';
export const supabase = createClient(supabaseUrl, supabaseKey);
