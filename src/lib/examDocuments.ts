import { supabase } from './supabase';
import { uploadPrivateFile } from './storage';
import type { ExamDocument } from '../types/exam';

interface ExamUploadInput {
  professional_title: string;
  issuing_authority: string;
  issue_date?: string;
  user_comment?: string;
  file: File;
}

export async function listMyExamDocuments(): Promise<ExamDocument[]> {
  const { data, error } = await supabase.from('exam_documents').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as ExamDocument[];
}

export async function createExamDocument(input: ExamUploadInput): Promise<ExamDocument> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) throw userError ?? new Error('Nicht angemeldet');
  const id = crypto.randomUUID();
  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${userData.user.id}/${id}/${safeName}`;
  await uploadPrivateFile('exam-documents', filePath, input.file);
  const { data, error } = await supabase
    .from('exam_documents')
    .insert({
      id,
      user_id: userData.user.id,
      professional_title: input.professional_title,
      issuing_authority: input.issuing_authority,
      issue_date: input.issue_date || null,
      user_comment: input.user_comment || null,
      file_path: filePath,
      file_name: input.file.name,
      file_type: input.file.type,
      file_size: input.file.size,
      verification_status: 'submitted',
    })
    .select('*')
    .single();
  if (error) throw error;
  return data as ExamDocument;
}
