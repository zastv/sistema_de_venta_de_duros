import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://incftkpsdlslfwhlpype.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluY2Z0a3BzZGxzbGZ3aGxweXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNjA4NDAsImV4cCI6MjA3MTgzNjg0MH0.9ON2x3isNJogWcVoA5HxNLXQIHIil_lHJeTCmemfxDg';

// Configurar cliente con opciones adicionales para debugging
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // No necesitamos sesión para este caso de uso público
  },
  db: {
    schema: 'public'
  }
});

// Función para verificar la conexión
export const verificarConexion = async () => {
  try {
    const { error } = await supabase
      .from('sabores')
      .select('id', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('Error de conexión:', error);
      return false;
    }
    console.log('Conexión exitosa con Supabase');
    return true;
  } catch (error) {
    console.error('Error verificando conexión:', error);
    return false;
  }
};
