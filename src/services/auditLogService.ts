import { supabase } from '../lib/supabase';

export async function writeAuditLog(action: string, entity_type?: string, entity_id?: string) {
  const { error } = await supabase.from('audit_logs').insert({ action, entity_type, entity_id });
  if (error) throw error;
}
