import { supabase } from './supabase';
import type { ShareLink } from '../types/sharing';

export async function listMyShareLinks(): Promise<ShareLink[]> {
  const { data, error } = await supabase.from('share_links').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as ShareLink[];
}

export async function createShareLink(title: string, documentIds: string[], expires_at?: string): Promise<ShareLink> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error('Nicht angemeldet');
  const token = crypto.randomUUID().replaceAll('-', '');
  const { data, error } = await supabase.from('share_links').insert({ user_id: userData.user.id, token, title, expires_at: expires_at || null }).select('*').single();
  if (error) throw error;
  if (documentIds.length) {
    const { error: linkError } = await supabase.from('share_link_documents').insert(documentIds.map((document_id) => ({ share_link_id: data.id, document_id })));
    if (linkError) throw linkError;
  }
  return data as ShareLink;
}

export async function deactivateShareLink(id: string) {
  const { error } = await supabase.from('share_links').update({ is_active: false }).eq('id', id);
  if (error) throw error;
}
