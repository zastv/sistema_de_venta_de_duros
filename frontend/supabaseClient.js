// Configuración de Supabase para React
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://czrnlpwxjpmesxqdogvw.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_B-v269PyKwTZve3GCwrmrA_7C4U5Z9Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
