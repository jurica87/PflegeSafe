import { supabase } from '../lib/supabase';

export async function exportMyData() {
  const [profile, exams, documents, tags, shareLinks] = await Promise.all([
    supabase.from('profiles').select('*').single(),
    supabase.from('exam_documents').select('*'),
    supabase.from('documents').select('*'),
    supabase.from('document_tags').select('*'),
    supabase.from('share_links').select('*'),
  ]);
  for (const result of [profile, exams, documents, tags, shareLinks]) {
    if (result.error) throw result.error;
  }
  return {
    exportedAt: new Date().toISOString(),
    profile: profile.data,
    exam_documents: exams.data,
    documents: documents.data,
    document_tags: tags.data,
    share_links: shareLinks.data,
  };
}
