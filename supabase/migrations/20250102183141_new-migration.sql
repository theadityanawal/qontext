-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Clean up existing tables if needed (be careful with this in production!)
drop table if exists users cascade;
drop table if exists resumes cascade;
drop table if exists personal_info cascade;
drop table if exists work_experience cascade;
drop table if exists education cascade;
drop table if exists projects cascade;
drop table if exists skills cascade;
drop table if exists certifications cascade;
drop table if exists social_links cascade;

-- Create tables
create table users (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    name text not null,
    created_at timestamptz default now() not null
);

create table resumes (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references users(id) on delete cascade not null,
    type text check (type in ('base', 'ai_generated')) not null,
    parent_resume_id uuid references resumes(id),
    job_description text,
    summary text,
    created_at timestamptz default now() not null,
    last_updated timestamptz default now() not null,
    is_active boolean default true not null
);

create table personal_info (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    headline text not null,
    phone text,
    location text,
    languages jsonb[] default array[]::jsonb[],
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    constraint unique_resume_personal_info unique (resume_id)
);

create table social_links (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    platform text not null,
    url text not null,
    created_at timestamptz default now() not null
);

create table work_experience (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    title text not null,
    company text not null,
    location text not null,
    start_date date not null,
    end_date date,
    description text[] default array[]::text[],
    achievements text[] default array[]::text[],
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create table education (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    institution text not null,
    degree text not null,
    field_of_study text not null,
    start_date date not null,
    end_date date,
    grade text,
    description text[] default array[]::text[],
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create table projects (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    title text not null,
    description text not null,
    technologies text[] default array[]::text[],
    url text,
    start_date date not null,
    end_date date,
    achievements text[] default array[]::text[],
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create table skills (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    category text not null,
    skills_list text[] not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create table certifications (
    id uuid default uuid_generate_v4() primary key,
    resume_id uuid references resumes(id) on delete cascade not null,
    name text not null,
    issuer text not null,
    issue_date date not null,
    expiration_date date,
    url text,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- Enable Row Level Security (RLS)
alter table users enable row level security;
alter table resumes enable row level security;
alter table personal_info enable row level security;
alter table social_links enable row level security;
alter table work_experience enable row level security;
alter table education enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table certifications enable row level security;

-- Create basic RLS policies
create policy "Users can view own data" on users for select using (auth.uid() = id);
create policy "Users can update own data" on users for update using (auth.uid() = id);

create policy "Users can view own resumes" on resumes for select using (auth.uid() = user_id);
create policy "Users can insert own resumes" on resumes for insert with check (auth.uid() = user_id);
create policy "Users can update own resumes" on resumes for update using (auth.uid() = user_id);
create policy "Users can delete own resumes" on resumes for delete using (auth.uid() = user_id);

-- Add basic indexes for performance
create index resumes_user_id_idx on resumes(user_id);
create index work_experience_resume_id_idx on work_experience(resume_id);
create index education_resume_id_idx on education(resume_id);
create index projects_resume_id_idx on projects(resume_id);
create index skills_resume_id_idx on skills(resume_id);
create index certifications_resume_id_idx on certifications(resume_id);
create index social_links_resume_id_idx on social_links(resume_id);
