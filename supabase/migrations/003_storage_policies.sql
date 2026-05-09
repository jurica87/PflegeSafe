insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('exam-documents', 'exam-documents', false, 15728640, array['application/pdf','image/jpeg','image/png']),
  ('user-documents', 'user-documents', false, 15728640, array['application/pdf','image/jpeg','image/png']),
  ('profile-images', 'profile-images', false, 5242880, array['image/jpeg','image/png'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy storage_exam_owner_insert on storage.objects for insert with check (bucket_id = 'exam-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy storage_exam_owner_select on storage.objects for select using (bucket_id = 'exam-documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_privileged()));
create policy storage_exam_owner_delete on storage.objects for delete using (bucket_id = 'exam-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy storage_docs_owner_insert on storage.objects for insert with check (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy storage_docs_owner_select on storage.objects for select using (bucket_id = 'user-documents' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_privileged()));
create policy storage_docs_owner_update on storage.objects for update using (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy storage_docs_owner_delete on storage.objects for delete using (bucket_id = 'user-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy storage_profile_images_owner_insert on storage.objects for insert with check (bucket_id = 'profile-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy storage_profile_images_owner_select on storage.objects for select using (bucket_id = 'profile-images' and ((storage.foldername(name))[1] = auth.uid()::text or exists (select 1 from public.profiles p where p.id::text = (storage.foldername(name))[1] and p.photo_url = name)));
create policy storage_profile_images_owner_update on storage.objects for update using (bucket_id = 'profile-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy storage_profile_images_owner_delete on storage.objects for delete using (bucket_id = 'profile-images' and (storage.foldername(name))[1] = auth.uid()::text);
