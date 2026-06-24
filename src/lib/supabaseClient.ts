export {}; // isolatedModules 대응 — Supabase 연결 시 삭제

// Supabase 연결 시 아래 주석을 해제하고 .env 파일에 키를 추가하세요.
//
// 설치: npm install @supabase/supabase-js
//
// .env 파일:
//   REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
//   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
//
// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//
// Supabase SQL (테이블 생성):
// create table todos (
//   id uuid default gen_random_uuid() primary key,
//   title text not null,
//   description text not null default '',
//   status text not null default 'active' check (status in ('active', 'completed')),
//   created_at timestamptz default now(),
//   updated_at timestamptz default now()
// );
