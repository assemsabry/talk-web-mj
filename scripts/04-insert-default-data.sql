-- Insert default verified accounts
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'assem@talk.app', NOW(), NOW(), NOW(), '{"username": "assem", "full_name": "Assem Sabry", "title": "AI Engineer"}'),
  ('00000000-0000-0000-0000-000000000002', 'official@talk.app', NOW(), NOW(), NOW(), '{"username": "talk", "full_name": "Talk App", "title": "Public Figure"}')
ON CONFLICT (id) DO NOTHING;

-- Insert profiles for default accounts
INSERT INTO profiles (id, username, full_name, bio, title, verified, avatar_url, created_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'assem', 'Assem Sabry', 'I Made it @talk', 'AI Engineer', TRUE, '/talk-logo.png', NOW()),
  ('00000000-0000-0000-0000-000000000002', 'talk', 'Talk App', 'Official Talk App Account 🚀', 'Public Figure', TRUE, '/talk-logo.png', NOW())
ON CONFLICT (username) DO NOTHING;

-- Insert some default hashtags
INSERT INTO hashtags (name, posts_count) VALUES
  ('TalkApp', 15),
  ('AI', 45),
  ('SocialMedia', 32),
  ('Technology', 28),
  ('Design', 19),
  ('Innovation', 12),
  ('TechStartup', 8),
  ('Welcome', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (id, user_id, content, likes_count, comments_count, reposts_count, created_at) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Just launched the beta version of Talk! Excited to hear your feedback. #TalkApp #SocialMedia', 1243, 45, 23, NOW()),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'I Made it @talk! 🚀 Welcome to the future of social media. #Innovation #TechStartup', 3567, 128, 89, NOW() - INTERVAL '1 hour'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Welcome to Talk! 🎉 The new era of social networking begins now. Connect, share, and discover amazing content! #Welcome #TalkApp', 2891, 67, 156, NOW() - INTERVAL '2 hours')
ON CONFLICT (id) DO NOTHING;

-- Link hashtags to posts
INSERT INTO post_hashtags (post_id, hashtag_id) 
SELECT p.id, h.id 
FROM posts p, hashtags h 
WHERE (p.content LIKE '%#' || h.name || '%')
ON CONFLICT DO NOTHING;

-- Insert mentions
INSERT INTO mentions (post_id, mentioned_user_id, mentioning_user_id, created_at)
SELECT 
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  NOW() - INTERVAL '1 hour'
ON CONFLICT DO NOTHING;
