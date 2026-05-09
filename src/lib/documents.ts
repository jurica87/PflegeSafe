import { supabase } from './supabase';
import { uploadPrivateFile } from './storage';
import type { DocumentFilters, DocumentRecord } from '../types/document';

export interface DocumentInput {
  title: string;
  document_type: string;
  description?: string;
  issuing_organization?: string;
  issue_date?: string;
  expiry_date?: string;
  visibility: 'private' | 'public' | 'share_link';
  lifecycle_status?: 'active' | 'expired' | 'archived';
  verification_status?: 'self_declared' | 'submitted';
  notes?: string;
  tags?: string[];
  file?: File | null;
}

export async function listMyDocuments(filters: DocumentFilters = {}): Promise<DocumentRecord[]> {
  let query = supabase.from('documents').select('*, document_tags(*)');
  if (filters.lifecycle_status && filters.lifecycle_status !== 'all') query = query.eq('lifecycle_status', filters.lifecycle_status);
  if (filters.visibility && filters.visibility !== 'all') query = query.eq('visibility', filters.visibility);
  if (filters.verification_status && filters.verification_status !== 'all') query = query.eq('verification_status', filters.verification_status);
  if (filters.search) query = query.or(`title.ilike.%${filters.search}%,document_type.ilike.%${filters.search}%`);
  const sortBy = filters.sortBy ?? 'created_at';
  const { data, error } = await query.order(sortBy, { ascending: filters.sortDirection === 'asc' });
  if (error) throw error;
  return data as DocumentRecord[];
}

export async function createDocument(input: DocumentInput): Promise<DocumentRecord> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error('Nicht angemeldet');
  const id = crypto.randomUUID();
  let filePath: string | null = null;
  if (input.file) {
    const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    filePath = `${userData.user.id}/${id}/${safeName}`;
    await uploadPrivateFile('user-documents', filePath, input.file);
  }
  const { data, error } = await supabase
    .from('documents')
    .insert({
      id,
      user_id: userData.user.id,
      title: input.title,
      document_type: input.document_type,
      description: input.description || null,
      issuing_organization: input.issuing_organization || null,
      issue_date: input.issue_date || null,
      expiry_date: input.expiry_date || null,
      visibility: input.visibility,
      lifecycle_status: input.lifecycle_status ?? 'active',
      verification_status: input.verification_status ?? 'self_declared',
      notes: input.notes || null,
      file_path: filePath,
      file_name: input.file?.name ?? null,
      file_type: input.file?.type ?? null,
      file_size: input.file?.size ?? null,
    })
    .select('*')
    .single();
  if (error) throw error;
  if (input.tags?.length) await upsertDocumentTags(data.id, input.tags);
  return data as DocumentRecord;
}

export async function upsertDocumentTags(documentId: string, tags: string[]) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error('Nicht angemeldet');
  await supabase.from('document_tags').delete().eq('document_id', documentId);
  const unique = Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean)));
  if (!unique.length) return;
  const { error } = await supabase.from('document_tags').insert(unique.map((tag) => ({ document_id: documentId, user_id: userData.user.id, tag })));
  if (error) throw error;
}

export async function deleteDocument(document: DocumentRecord) {
  const { error } = await supabase.from('documents').delete().eq('id', document.id);
  if (error) throw error;
}
