import { supabase } from './supabase';
import type { UserRole } from '../types/roles';

export async function listProfilesForAdmin() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(250);
  if (error) throw error;
  return data;
}

export async function listVerificationQueue() {
  const [exam, documents] = await Promise.all([
    supabase.from('exam_documents').select('*').eq('verification_status', 'submitted').order('created_at'),
    supabase.from('documents').select('*').eq('verification_status', 'submitted').order('created_at'),
  ]);
  if (exam.error) throw exam.error;
  if (documents.error) throw documents.error;
  return { examDocuments: exam.data, documents: documents.data };
}

export async function verifyDocument(kind: 'exam' | 'document', id: string, newStatus: 'verified' | 'rejected', comment: string) {
  const table = kind === 'exam' ? 'exam_documents' : 'documents';
  const patch = kind === 'exam'
    ? { verification_status: newStatus, admin_comment: comment, verified_at: new Date().toISOString() }
    : { verification_status: newStatus };
  const { error } = await supabase.from(table).update(patch).eq('id', id);
  if (error) throw error;
}

export async function updateUserRole(userId: string, role: UserRole) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  if (error) throw error;
}

export async function setAccountLock(userId: string, locked: boolean) {
  const { error } = await supabase.from('profiles').update({ account_status: locked ? 'locked' : 'active' }).eq('id', userId);
  if (error) throw error;
}
