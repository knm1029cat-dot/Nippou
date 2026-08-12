-- Phase 1: core schema for スクール日報アプリ
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- updated_at auto-touch trigger, shared by all tables below
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: one row per user, created during initial school setup
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  school_name text,
  start_date date not null,
  duration_days integer not null default 90,
  main_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = user_id);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- daily_reports: one row per user per day
-- ---------------------------------------------------------------------------
create table if not exists public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  report_date date not null,
  actions text,
  learnings text,
  progress text,
  problems text,
  tomorrow_tasks text,
  comment text,
  achievement_score smallint check (achievement_score between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, report_date)
);

alter table public.daily_reports enable row level security;

create policy "daily_reports_select_own" on public.daily_reports
  for select using (auth.uid() = user_id);
create policy "daily_reports_insert_own" on public.daily_reports
  for insert with check (auth.uid() = user_id);
create policy "daily_reports_update_own" on public.daily_reports
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily_reports_delete_own" on public.daily_reports
  for delete using (auth.uid() = user_id);

create trigger daily_reports_set_updated_at
  before update on public.daily_reports
  for each row execute function public.set_updated_at();

create index if not exists daily_reports_user_date_idx
  on public.daily_reports (user_id, report_date desc);

-- ---------------------------------------------------------------------------
-- weekly_goals: one row per user per week (week_start = Monday)
-- ---------------------------------------------------------------------------
create table if not exists public.weekly_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_start date not null,
  goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

alter table public.weekly_goals enable row level security;

create policy "weekly_goals_select_own" on public.weekly_goals
  for select using (auth.uid() = user_id);
create policy "weekly_goals_insert_own" on public.weekly_goals
  for insert with check (auth.uid() = user_id);
create policy "weekly_goals_update_own" on public.weekly_goals
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "weekly_goals_delete_own" on public.weekly_goals
  for delete using (auth.uid() = user_id);

create trigger weekly_goals_set_updated_at
  before update on public.weekly_goals
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- weekly_reviews: one AI-generated review per user per week
-- ---------------------------------------------------------------------------
create table if not exists public.weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_start date not null,
  review_content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

alter table public.weekly_reviews enable row level security;

create policy "weekly_reviews_select_own" on public.weekly_reviews
  for select using (auth.uid() = user_id);
create policy "weekly_reviews_insert_own" on public.weekly_reviews
  for insert with check (auth.uid() = user_id);
create policy "weekly_reviews_update_own" on public.weekly_reviews
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "weekly_reviews_delete_own" on public.weekly_reviews
  for delete using (auth.uid() = user_id);

create trigger weekly_reviews_set_updated_at
  before update on public.weekly_reviews
  for each row execute function public.set_updated_at();
