import { supabase } from './supabase';
import type { Profile, ProfileUpdate } from '../types/profile';

export async function getMyProfile(): Promise<Profile | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return null;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userData.user.id).single();
  if (error) throw error;
  return data as Profile;
}

export async function updateMyProfile(update: ProfileUpdate): Promise<Profile> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error('Nicht angemeldet');
  const { data, error } = await supabase.from('profiles').update(update).eq('id', userData.user.id).select('*').single();
  if (error) throw error;
  return data as Profile;
}

export async function getPublicProfile(publicId: string) {
  const { data, error } = await supabase.rpc('get_public_profile', { p_public_id: publicId });
  if (error) throw error;
  return data;
}
