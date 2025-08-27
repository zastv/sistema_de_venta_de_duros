// Configuración de Supabase para React
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://incftkpsdlslfwhlpype.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluY2Z0a3BzZGxzbGZ3aGxweXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNjA4NDAsImV4cCI6MjA3MTgzNjg0MH0.9ON2x3isNJogWcVoA5HxNLXQIHIil_lHJeTCmemfxDg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
