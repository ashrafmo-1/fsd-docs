begin;

-- Kept outside the public API. Provision these IDs with an owner connection.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;
create table private.dashboard_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table private.dashboard_admins enable row level security;
revoke all on private.dashboard_admins from public, anon, authenticated;

create function private.is_dashboard_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from private.dashboard_admins where user_id = (select auth.uid())
  );
$$;
revoke all on function private.is_dashboard_admin() from public, anon;
grant execute on function private.is_dashboard_admin() to authenticated;

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  page_key text not null check (page_key = '/docs' or page_key like '/docs/%'),
  title text not null check (length(btrim(title)) between 1 and 200),
  youtube_url text not null,
  youtube_video_id text not null check (youtube_video_id ~ '^[A-Za-z0-9_-]{11}$'),
  description text check (length(description) <= 500),
  is_published boolean not null default false,
  display_order integer not null default 0 check (display_order between 0 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index videos_published_page_order on public.videos (page_key, display_order, created_at) where is_published;
alter table public.videos enable row level security;
revoke all on public.videos from public, anon, authenticated;
grant select on public.videos to anon, authenticated;
grant insert, update on public.videos to authenticated;

create policy videos_published_read on public.videos for select
  to anon, authenticated using (is_published);
create policy videos_admin_read on public.videos for select
  to authenticated using ((select private.is_dashboard_admin()));
create policy videos_admin_insert on public.videos for insert
  to authenticated with check ((select private.is_dashboard_admin()));
create policy videos_admin_update on public.videos for update
  to authenticated using ((select private.is_dashboard_admin()))
  with check ((select private.is_dashboard_admin()));

commit;
