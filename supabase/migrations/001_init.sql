create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user','verifier','admin','superadmin')),
  public_id text unique not null default encode(gen_random_bytes(12), 'hex'),
  first_name text,
  last_name text,
  job_title text,
  state text,
  city text,
  employer text,
  experience_years integer check (experience_years is null or experience_years >= 0),
  specialties text[] default '{}',
  photo_url text,
  bio text,
  profile_status text not null default 'exam_missing' check (profile_status in ('incomplete','exam_missing','exam_submitted','verified','rejected')),
  account_status text not null default 'active' check (account_status in ('active','locked','deleted')),
  subscription_status text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exam_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  professional_title text not null,
  issuing_authority text not null,
  issue_date date,
  file_path text not null,
  file_name text,
  file_type text,
  file_size bigint,
  verification_status text not null default 'submitted' check (verification_status in ('unverified','submitted','verified','rejected')),
  user_comment text,
  admin_comment text,
  verified_by uuid references auth.users(id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  document_type text not null,
  description text,
  issuing_organization text,
  issue_date date,
  expiry_date date,
  file_path text,
  file_name text,
  file_type text,
  file_size bigint,
  visibility text not null default 'private' check (visibility in ('private','public','share_link')),
  lifecycle_status text not null default 'active' check (lifecycle_status in ('active','expired','archived')),
  verification_status text not null default 'self_declared' check (verification_status in ('self_declared','submitted','verified','rejected')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on column public.documents.document_type is 'Freies Textfeld: keine feste Zertifikatsliste und kein Enum für normale Nachweise.';

create table public.document_tags (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  tag text not null
);

create table public.share_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text unique not null default encode(gen_random_bytes(24), 'hex'),
  title text,
  expires_at timestamptz,
  password_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.share_link_documents (
  id uuid primary key default gen_random_uuid(),
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  document_id uuid not null references public.documents(id) on delete cascade,
  unique (share_link_id, document_id)
);

create table public.verification_logs (
  id uuid primary key default gen_random_uuid(),
  document_kind text not null check (document_kind in ('exam','document')),
  document_id uuid not null,
  user_id uuid references auth.users(id) on delete cascade,
  verifier_id uuid references auth.users(id),
  old_status text,
  new_status text,
  comment text,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);
