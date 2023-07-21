import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rbyxjqjwdiafatqcpdju.supabase.co'
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)
console.log(supabase);

export default supabase;