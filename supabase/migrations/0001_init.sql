-- everforce-x-board schema (RH Supabase: ywtsgnjvhykkjnrzmjtg)
-- Run in Supabase Studio SQL editor.

create table if not exists wa_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  column_key text not null default 'backlog'
    check (column_key in ('backlog','next','in_progress','in_review','blocked','done')),
  labels text[] not null default '{}',
  assignees text[] not null default '{}',
  page_url text,
  audit_grade text,
  position double precision not null default extract(epoch from now()),
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists wa_cards_column_idx on wa_cards (column_key, position);

create table if not exists wa_comments (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references wa_cards(id) on delete cascade,
  author_email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists wa_comments_card_idx on wa_comments (card_id, created_at);

create or replace function wa_touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists wa_cards_touch on wa_cards;
create trigger wa_cards_touch before update on wa_cards
  for each row execute function wa_touch_updated_at();

-- RLS: open read/write for anyone with the publishable key (auth is handled
-- client-side via shared password + @everflow.io email gate). Same pattern
-- used by Creative Review and other internal tools on this Supabase.
alter table wa_cards enable row level security;
alter table wa_comments enable row level security;

drop policy if exists wa_cards_all on wa_cards;
create policy wa_cards_all on wa_cards for all using (true) with check (true);

drop policy if exists wa_comments_all on wa_comments;
create policy wa_comments_all on wa_comments for all using (true) with check (true);

grant all on wa_cards, wa_comments to anon, authenticated;
