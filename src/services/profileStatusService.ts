import { supabase } from '../lib/supabase';
import type { ProfileStatus } from '../types/profile';

export async function hasVerifiedExam(userId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('exam_documents')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('verification_status', 'verified');
  if (error) throw error;
  return (count ?? 0) > 0;
}

export async function getProfileCompletionStatus(userId: string): Promise<ProfileStatus> {
  const { data, error } = await supabase
    .from('exam_documents')
    .select('verification_status')
    .eq('user_id', userId);
  if (error) throw error;
  if (!data.length) return 'exam_missing';
  if (data.some((row) => row.verification_status === 'verified')) return 'verified';
  if (data.every((row) => row.verification_status === 'rejected')) return 'rejected';
  if (data.some((row) => row.verification_status === 'submitted')) return 'exam_submitted';
  return 'incomplete';
}

export function profileStatusLabel(status: ProfileStatus): string {
  return {
    incomplete: 'Profil unvollständig',
    exam_missing: 'Examen fehlt',
    exam_submitted: 'Examen eingereicht',
    verified: 'Verifiziert vollständig',
    rejected: 'Examen abgelehnt',
  }[status];
}
