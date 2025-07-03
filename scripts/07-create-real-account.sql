-- Create real account for Assem Sabry
-- Note: This will be handled by the signup process, but we can prepare the profile
-- The actual auth.users entry will be created when signing up through the app

-- Update default profiles with real information
UPDATE profiles 
SET 
  full_name = 'Assem Sabry',
  bio = 'AI Engineer & Founder of Talk 🚀',
  title = 'AI Engineer',
  verified = TRUE,
  avatar_url = '/talk-logo.png'
WHERE username = 'assem';

UPDATE profiles 
SET 
  full_name = 'Talk',
  bio = 'The future of social media is here 🌟',
  title = 'Public Figure',
  verified = TRUE,
  avatar_url = '/talk-logo.png'
WHERE username = 'talk';

-- Clear fake posts and add real ones
DELETE FROM post_hashtags;
DELETE FROM mentions;
DELETE FROM posts;

-- Insert real posts
INSERT INTO posts (id, user_id, content, likes_count, comments_count, reposts_count, created_at) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'بعد شهور من العمل المتواصل، أخيراً أطلقنا Talk! 🚀 منصة التواصل الاجتماعي الجديدة التي ستغير طريقة تفاعلنا. #TalkApp #AI #Innovation', 0, 0, 0, NOW()),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Talk is not just another social media platform. It''s built with AI at its core to create meaningful connections. Welcome to the future! 🌟 #TalkApp #ArtificialIntelligence', 0, 0, 0, NOW() - INTERVAL '2 hours'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'مرحباً بكم في Talk! 🎉 المنصة التي ستعيد تعريف التواصل الاجتماعي. انضموا إلينا في هذه الرحلة المثيرة! #Welcome #TalkApp #SocialMedia', 0, 0, 0, NOW() - INTERVAL '1 hour');

-- Re-link hashtags
INSERT INTO post_hashtags (post_id, hashtag_id) 
SELECT p.id, h.id 
FROM posts p, hashtags h 
WHERE (p.content LIKE '%#' || h.name || '%')
ON CONFLICT DO NOTHING;
