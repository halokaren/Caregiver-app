-- ============================================================
-- 在 Supabase 后台执行此 SQL 创建 demands 表
-- 路径：Supabase 控制台 → SQL Editor → 粘贴并运行
-- ============================================================

-- 创建 demands 表（护理需求）
create table if not exists public.demands (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  salary integer not null,
  location text not null,
  publisher_name text,
  patient_current_rating numeric(3,2) default null,
  created_at timestamptz default now() not null
);

-- 允许匿名用户读取和插入（便于前端直接调用，后续可改为 RLS 策略）
alter table public.demands enable row level security;

-- 策略：允许所有人读取
create policy "允许所有人读取 demands"
  on public.demands for select
  using (true);

-- 策略：允许所有人插入（发布需求）
create policy "允许所有人插入 demands"
  on public.demands for insert
  with check (true);

-- 可选：允许所有人更新/删除（便于后续扩展）
-- create policy "允许所有人更新 demands" on public.demands for update using (true);
-- create policy "允许所有人删除 demands" on public.demands for delete using (true);
