-- Run this in Supabase Dashboard → SQL Editor → New Query

-- 1. Create the clients table
create table if not exists public.clients (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null default auth.uid(),
  client_id   text not null,
  name        text not null,
  industry    text default '',
  hq          text default '',
  country     text default '',
  status      text default 'Active',
  ticker      text default '—',
  tier        int default 2,
  source      text default '',
  website_url text default '',
  image_url   text default '',
  error_detected boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Enable Row Level Security
alter table public.clients enable row level security;

-- 3. Users can only see their own clients
create policy "Users read own clients"
  on public.clients for select
  using (auth.uid() = user_id);

-- 4. Users can only insert their own clients
create policy "Users insert own clients"
  on public.clients for insert
  with check (auth.uid() = user_id);

-- 5. Users can only update their own clients
create policy "Users update own clients"
  on public.clients for update
  using (auth.uid() = user_id);

-- 6. Users can only delete their own clients
create policy "Users delete own clients"
  on public.clients for delete
  using (auth.uid() = user_id);

-- 7. Index for fast per-user lookups
create index if not exists idx_clients_user_id on public.clients(user_id);

-- 8. Auto-update updated_at on row changes
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();
