import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  const res = await supabase.from('reading').select('content').limit(1);
  console.log("Reading content:", res.data[0].content.substring(0, 200));
  
  const lRes = await supabase.from('listening').select('transcript').limit(1);
  console.log("Listening transcript:", lRes.data[0].transcript.substring(0, 200));
  
  const { data: qData } = await supabase.from('quiz').select('*').limit(5);
  console.log("Quiz Data:", qData);
}
check();
