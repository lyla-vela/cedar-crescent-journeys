-- Cedar & Crescent Journeys — Supabase schema
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Tables match the Pydantic models in backend/main.py.
-- No prices, dates, airlines, or real agency name: seed rows are samples only.

create table if not exists packages (
  id bigint generated always as identity primary key,
  destination text not null,
  country text not null,
  title text not null,
  description text not null,
  highlights text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  destination text not null,
  message text not null default '',
  created_at timestamptz not null default now()
);

-- Row Level Security.
-- STARTER-ONLY policies: anon users can read all rows and insert new ones.
-- This is fine for a portfolio demo with sample data, but NOT production
-- auth. For production, replace these with authenticated-user policies.
alter table packages enable row level security;
alter table inquiries enable row level security;

drop policy if exists "Allow anon read" on packages;
create policy "Allow anon read" on packages for select using (true);
drop policy if exists "Allow anon insert" on packages;
create policy "Allow anon insert" on packages for insert with check (true);

drop policy if exists "Allow anon read" on inquiries;
create policy "Allow anon read" on inquiries for select using (true);
drop policy if exists "Allow anon insert" on inquiries;
create policy "Allow anon insert" on inquiries for insert with check (true);

-- Seed rows (sample data only). Each INSERT is guarded so re-running
-- this file does not duplicate rows. No prices, dates, or airlines.
insert into packages (destination, country, title, description, highlights)
select 'Istanbul', 'Turkey', 'Sample Package: LAX to Istanbul, Turkey',
  'A sample travel package from LAX to Istanbul, Turkey.',
  array['Historic old city', 'Bosphorus', 'Local food and markets']
where not exists (select 1 from packages where title = 'Sample Package: LAX to Istanbul, Turkey');

insert into packages (destination, country, title, description, highlights)
select 'Beirut', 'Lebanon', 'Sample Package: LAX to Beirut, Lebanon',
  'A sample travel package from LAX to Beirut, Lebanon.',
  array['Mediterranean coast', 'Historic downtown', 'Local food and culture']
where not exists (select 1 from packages where title = 'Sample Package: LAX to Beirut, Lebanon');

insert into packages (destination, country, title, description, highlights)
select 'Dubai', 'United Arab Emirates', 'Sample Package: LAX to Dubai',
  'A sample travel package from LAX to Dubai.',
  array['City skyline', 'Desert experiences', 'Shopping and dining']
where not exists (select 1 from packages where title = 'Sample Package: LAX to Dubai');

insert into inquiries (name, email, destination, message)
select 'Sample Inquirer', 'sample@example.com', 'Turkey',
  'Sample inquiry about the LAX to Turkey package.'
where not exists (select 1 from inquiries where email = 'sample@example.com');
