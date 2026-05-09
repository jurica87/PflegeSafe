create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles for each row execute function public.touch_updated_at();
create trigger exam_touch_updated_at before update on public.exam_documents for each row execute function public.touch_updated_at();
create trigger documents_touch_updated_at before update on public.documents for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, public_id)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'public_id', encode(gen_random_bytes(12), 'hex')))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.has_verified_exam(p_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.exam_documents where user_id = p_user_id and verification_status = 'verified')
$$;

create or replace function public.get_profile_completion_status(p_user_id uuid)
returns text language plpgsql stable security definer set search_path = public as $$
begin
  if exists (select 1 from public.exam_documents where user_id = p_user_id and verification_status = 'verified') then
    return 'verified';
  elsif not exists (select 1 from public.exam_documents where user_id = p_user_id) then
    return 'exam_missing';
  elsif exists (select 1 from public.exam_documents where user_id = p_user_id and verification_status = 'submitted') then
    return 'exam_submitted';
  elsif exists (select 1 from public.exam_documents where user_id = p_user_id and verification_status = 'rejected') then
    return 'rejected';
  end if;
  return 'incomplete';
end;
$$;

create or replace function public.sync_profile_status()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set profile_status = public.get_profile_completion_status(coalesce(new.user_id, old.user_id)) where id = coalesce(new.user_id, old.user_id);
  return coalesce(new, old);
end;
$$;

create trigger exam_sync_profile_insert after insert or update or delete on public.exam_documents for each row execute function public.sync_profile_status();

create or replace function public.log_exam_verification()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if old.verification_status is distinct from new.verification_status then
    insert into public.verification_logs(document_kind, document_id, user_id, verifier_id, old_status, new_status, comment)
    values ('exam', new.id, new.user_id, auth.uid(), old.verification_status, new.verification_status, new.admin_comment);
  end if;
  return new;
end;
$$;

create trigger exam_verification_log after update on public.exam_documents for each row execute function public.log_exam_verification();

create or replace function public.log_document_verification()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if old.verification_status is distinct from new.verification_status then
    insert into public.verification_logs(document_kind, document_id, user_id, verifier_id, old_status, new_status, comment)
    values ('document', new.id, new.user_id, auth.uid(), old.verification_status, new.verification_status, null);
  end if;
  return new;
end;
$$;

create trigger document_verification_log after update on public.documents for each row execute function public.log_document_verification();

create or replace function public.get_public_profile(p_public_id text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'profile', jsonb_build_object(
      'public_id', p.public_id,
      'first_name', p.first_name,
      'last_name', p.last_name,
      'job_title', p.job_title,
      'specialties', p.specialties,
      'photo_url', p.photo_url,
      'bio', p.bio,
      'profile_status', p.profile_status
    ),
    'examStatus', public.get_profile_completion_status(p.id),
    'documents', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', d.id,
        'title', d.title,
        'document_type', d.document_type,
        'description', d.description,
        'issuing_organization', d.issuing_organization,
        'issue_date', d.issue_date,
        'expiry_date', d.expiry_date,
        'verification_status', d.verification_status
      ) order by d.expiry_date nulls last, d.title)
      from public.documents d
      where d.user_id = p.id
        and d.visibility = 'public'
        and d.lifecycle_status = 'active'
        and d.verification_status <> 'rejected'
    ), '[]'::jsonb)
  )
  from public.profiles p
  where p.public_id = p_public_id and p.account_status = 'active'
$$;
