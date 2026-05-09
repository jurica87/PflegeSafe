alter table public.profiles enable row level security;
alter table public.exam_documents enable row level security;
alter table public.documents enable row level security;
alter table public.document_tags enable row level security;
alter table public.share_links enable row level security;
alter table public.share_link_documents enable row level security;
alter table public.verification_logs enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.current_role()
returns text language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user')
$$;

create or replace function public.is_privileged()
returns boolean language sql stable security definer set search_path = public as $$
  select public.current_role() in ('verifier','admin','superadmin')
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select public.current_role() in ('admin','superadmin')
$$;

create policy profiles_own_select on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_own_update on public.profiles for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy profiles_superadmin_role_update on public.profiles for update using (public.current_role() = 'superadmin') with check (public.current_role() = 'superadmin');

create policy exam_own_select on public.exam_documents for select using (user_id = auth.uid() or public.is_privileged());
create policy exam_own_insert on public.exam_documents for insert with check (user_id = auth.uid());
create policy exam_own_update on public.exam_documents for update using (user_id = auth.uid() or public.is_privileged()) with check (user_id = auth.uid() or public.is_privileged());
create policy exam_own_delete on public.exam_documents for delete using (user_id = auth.uid());

create policy documents_own_select on public.documents for select using (user_id = auth.uid() or public.is_admin() or (public.is_privileged() and verification_status = 'submitted'));
create policy documents_public_select on public.documents for select using (visibility = 'public' and lifecycle_status = 'active' and verification_status <> 'rejected');
create policy documents_own_insert on public.documents for insert with check (user_id = auth.uid());
create policy documents_own_update on public.documents for update using (user_id = auth.uid() or public.is_privileged()) with check (user_id = auth.uid() or public.is_privileged());
create policy documents_own_delete on public.documents for delete using (user_id = auth.uid());

create policy tags_own_select on public.document_tags for select using (user_id = auth.uid() or exists (select 1 from public.documents d where d.id = document_id and d.visibility = 'public'));
create policy tags_own_insert on public.document_tags for insert with check (user_id = auth.uid());
create policy tags_own_update on public.document_tags for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy tags_own_delete on public.document_tags for delete using (user_id = auth.uid());

create policy share_links_own_all on public.share_links for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy share_link_docs_own_all on public.share_link_documents for all using (exists (select 1 from public.share_links sl where sl.id = share_link_id and (sl.user_id = auth.uid() or public.is_admin()))) with check (exists (select 1 from public.share_links sl where sl.id = share_link_id and (sl.user_id = auth.uid() or public.is_admin())));

create policy verification_logs_privileged_select on public.verification_logs for select using (public.is_privileged() or user_id = auth.uid());
create policy verification_logs_privileged_insert on public.verification_logs for insert with check (public.is_privileged());
create policy audit_logs_admin_select on public.audit_logs for select using (public.is_admin() or user_id = auth.uid());
create policy audit_logs_insert on public.audit_logs for insert with check (user_id = auth.uid() or public.is_admin());
