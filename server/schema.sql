create table if not exists public.case_file_sets (
  visitor_id uuid primary key,
  files jsonb not null default '[]'::jsonb
    check (jsonb_typeof(files) = 'array'),
  updated_at timestamptz not null default now()
);

alter table public.case_file_sets enable row level security;
revoke all on table public.case_file_sets from anon, authenticated;
grant all on table public.case_file_sets to service_role;