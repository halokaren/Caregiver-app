# Supabase 后台配置说明

## 1. 环境变量（已完成）

确保项目**根目录**（与 `package.json` 同级）有 `.env.local`，内容示例：

```env
NEXT_PUBLIC_SUPABASE_URL=https://你的项目.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key
```

注意：不要将 `.env.local` 放在 `.next` 目录下，否则 Next 可能读不到。

---

## 2. 在 Supabase 网页后台执行的 SQL

打开 [Supabase Dashboard](https://supabase.com/dashboard) → 选择你的项目 → **SQL Editor** → 新建查询，粘贴下面整段 SQL 后点击 **Run**。

```sql
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

-- 开启 RLS
alter table public.demands enable row level security;

-- 允许所有人读取
create policy "允许所有人读取 demands"
  on public.demands for select
  using (true);

-- 允许所有人插入（发布需求）
create policy "允许所有人插入 demands"
  on public.demands for insert
  with check (true);
```

执行成功后，在左侧 **Table Editor** 中应能看到 `demands` 表。

---

## 3. 登录功能（可选）

- 登录页路径：`/login`，使用 **邮箱 + 密码** 登录。
- 若要在 Supabase 中启用邮箱注册：
  - 进入 **Authentication → Providers**，确认 **Email** 已开启。
  - 在 **Authentication → Users** 中可手动添加用户，或开启 **Enable Email Signup** 让用户自行注册。

完成以上步骤后，发布需求会写入 `demands`，首页会从该表拉取列表。
