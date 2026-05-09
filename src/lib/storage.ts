import { supabase } from './supabase';

export type StorageBucket = 'exam-documents' | 'user-documents' | 'profile-images';

export async function uploadPrivateFile(bucket: StorageBucket, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  return data.path;
}

export async function createSignedFileUrl(bucket: StorageBucket, path: string, expiresInSeconds = 300) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

export async function removeFile(bucket: StorageBucket, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
