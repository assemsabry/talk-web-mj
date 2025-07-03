-- Create Assem's account in auth.users table
-- This script creates the real @assem account with the specified credentials

-- First, let's create the user in auth.users (this simulates the signup process)
-- Note: In production, this would be done through the signup API
-- For now, we'll create the profile directly

-- Insert the profile for Assem
INSERT INTO public.profiles (
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
  '00000000-0000-0000-0000-000000000001', -- Fixed UUID for Assem
  'assem',
  'Assem Sabry',
  'AI Engineer & Founder of Talk 🚀 | Building the future of social media',
  'AI Engineer',
  '/talk-logo.png',
  NULL,
  '1995-01-01',
  true, -- Verified account
  1250,
  180,
  3,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio,
  title = EXCLUDED.title,
  verified = EXCLUDED.verified,
  updated_at = NOW();

-- Create some initial posts for Assem
INSERT INTO public.posts (
  id,
  user_id,
  content,
  image_urls,
  video_url,
  poll_id,
  likes_count,
  comments_count,
  reposts_count,
  created_at,
  updated_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Just launched Talk! 🚀 The future of social media is here. What do you think? #TalkApp #SocialMedia #Innovation',
  NULL,
  NULL,
  NULL,
  1243,
  45,
  23,
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '2 hours'
),
(
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'Building something amazing with AI and modern web technologies. The possibilities are endless! 💡 #AI #WebDev #TechStartup',
  NULL,
  NULL,
  NULL,
  3567,
  128,
  89,
  NOW() - INTERVAL '5 hours',
  NOW() - INTERVAL '5 hours'
),
(
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'Welcome to Talk! 🎉 Connect, share, and discover amazing content. Let''s build this community together! #Welcome #Community',
  NULL,
  NULL,
  NULL,
  2891,
  67,
  156,
  NOW() - INTERVAL '8 hours',
  NOW() - INTERVAL '8 hours'
) ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  likes_count = EXCLUDED.likes_count,
  comments_count = EXCLUDED.comments_count,
  reposts_count = EXCLUDED.reposts_count,
  updated_at = NOW();

-- Create Talk official account
INSERT INTO public.profiles (
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
  '00000000-0000-0000-0000-000000000002',
  'talk',
  'Talk',
  'Official Talk App Account 🚀 | The future of social media',
  'Public Figure',
  '/talk-logo.png',
  NULL,
  NULL,
  true,
  50000,
  0,
  1,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio,
  verified = EXCLUDED.verified,
  updated_at = NOW();

-- Create a welcome post from Talk account
INSERT INTO public.posts (
  id,
  user_id,
  content,
  image_urls,
  video_url,
  poll_id,
  likes_count,
  comments_count,
  reposts_count,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000002',
  'Welcome to Talk! 🎉 We''re excited to have you join our community. Share your thoughts, connect with others, and discover amazing content! #Welcome #TalkApp',
  NULL,
  NULL,
  NULL,
  5000,
  200,
  300,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.posts TO authenticated;
GRANT ALL ON public.comments TO authenticated;
GRANT ALL ON public.saved_posts TO authenticated;
GRANT ALL ON public.polls TO authenticated;
