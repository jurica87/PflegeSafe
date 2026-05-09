import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Runtime guard keeps the client encapsulated while making deployment issues obvious.
  console.warn('PflegeSafe: VITE_SUPABASE_URL oder VITE_SUPABASE_ANON_KEY fehlt.');
}

export const supabase = createClient(supabaseUrl ?? 'http://localhost:8000', supabaseAnonKey ?? 'dev-anon-key', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
