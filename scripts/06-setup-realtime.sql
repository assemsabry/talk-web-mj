-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
ALTER PUBLICATION supabase_realtime ADD TABLE follows;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE poll_votes;

-- Create notification triggers
CREATE OR REPLACE FUNCTION create_notification()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Like notification
    IF TG_TABLE_NAME = 'likes' AND NEW.post_id IS NOT NULL THEN
      INSERT INTO notifications (user_id, type, title, message, data)
      SELECT 
        p.user_id,
        'like',
        'New Like',
        u.full_name || ' liked your post',
        json_build_object('post_id', NEW.post_id, 'user_id', NEW.user_id)
      FROM posts p
      JOIN profiles u ON u.id = NEW.user_id
      WHERE p.id = NEW.post_id AND p.user_id != NEW.user_id;
    END IF;

    -- Comment notification
    IF TG_TABLE_NAME = 'comments' THEN
      INSERT INTO notifications (user_id, type, title, message, data)
      SELECT 
        p.user_id,
        'comment',
        'New Comment',
        u.full_name || ' commented on your post',
        json_build_object('post_id', NEW.post_id, 'comment_id', NEW.id, 'user_id', NEW.user_id)
      FROM posts p
      JOIN profiles u ON u.id = NEW.user_id
      WHERE p.id = NEW.post_id AND p.user_id != NEW.user_id;
    END IF;

    -- Follow notification
    IF TG_TABLE_NAME = 'follows' THEN
      INSERT INTO notifications (user_id, type, title, message, data)
      SELECT 
        NEW.following_id,
        'follow',
        'New Follower',
        u.full_name || ' started following you',
        json_build_object('user_id', NEW.follower_id)
      FROM profiles u
      WHERE u.id = NEW.follower_id;
    END IF;

    -- Mention notification
    IF TG_TABLE_NAME = 'mentions' THEN
      INSERT INTO notifications (user_id, type, title, message, data)
      SELECT 
        NEW.mentioned_user_id,
        'mention',
        'You were mentioned',
        u.full_name || ' mentioned you in a post',
        json_build_object('post_id', NEW.post_id, 'user_id', NEW.mentioning_user_id)
      FROM profiles u
      WHERE u.id = NEW.mentioning_user_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for notifications
CREATE TRIGGER notification_on_like
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER notification_on_comment
  AFTER INSERT ON comments
  FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER notification_on_follow
  AFTER INSERT ON follows
  FOR EACH ROW EXECUTE FUNCTION create_notification();

CREATE TRIGGER notification_on_mention
  AFTER INSERT ON mentions
  FOR EACH ROW EXECUTE FUNCTION create_notification();
