-- Create real account for @assem with specific credentials
-- This script creates the account in auth.users and profiles tables

-- First, insert into auth.users (this simulates what Supabase auth does)
-- Note: In production, this would be handled by Supabase Auth API
-- The password hash is generated using Supabase's bcrypt with salt rounds 10
-- Password: AssemsAbry789$

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  aud,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  last_sign_in_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'assemsabry19@gmail.com',
  '$2a$10$8K1p/a0dUrZBvHsiQHCrce4Ec99lQcGUoeva.bAehRXbNxOgf5PQu', -- AssemsAbry789$
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  'authenticated',
  'authenticated',
  '{"provider": "email", "providers": ["email"]}',
  '{"username": "assem", "full_name": "Assem Sabry", "title": "AI Engineer"}',
  false,
  NOW(),
  null,
  null,
  '',
  '',
  '',
  0,
  null,
  '',
  null,
  false,
  null
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  updated_at = NOW(),
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- Update or insert the profile
INSERT INTO profiles (
  id,
  username,
  full_name,
  bio,
  title,
  avatar_url,
  banner_url,
  birth_date,
  verified,
  followers_count,
  following_count,
  posts_count,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'assem',
  'Assem Sabry',
  'AI Engineer & Founder of Talk 🚀 Building the future of social media',
  'AI Engineer',
  '/talk-logo.png',
  null,
  '1995-01-01',
  true,
  0,
  0,
  3,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio,
  title = EXCLUDED.title,
  avatar_url = EXCLUDED.avatar_url,
  verified = EXCLUDED.verified,
  updated_at = NOW();

-- Create some initial posts for @assem
INSERT INTO posts (id, user_id, content, likes_count, comments_count, reposts_count, created_at) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'بعد شهور من العمل المتواصل، أخيراً أطلقنا Talk! 🚀 منصة التواصل الاجتماعي الجديدة التي ستغير طريقة تفاعلنا. #TalkApp #AI #Innovation', 0, 0, 0, NOW()),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Talk is not just another social media platform. It''s built with AI at its core to create meaningful connections. Welcome to the future! 🌟 #TalkApp #ArtificialIntelligence', 0, 0, 0, NOW() - INTERVAL '2 hours'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'مرحباً بكم في Talk! 🎉 المنصة التي ستعيد تعريف التواصل الاجتماعي. انضموا إلينا في هذه الرحلة المثيرة! #Welcome #TalkApp #SocialMedia', 0, 0, 0, NOW() - INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING;

-- Link hashtags to posts
INSERT INTO post_hashtags (post_id, hashtag_id) 
SELECT p.id, h.id 
FROM posts p, hashtags h 
WHERE (p.content LIKE '%#' || h.name || '%')
ON CONFLICT DO NOTHING;
