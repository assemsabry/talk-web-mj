-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON likes FOR ALL USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can manage own follows" ON follows FOR ALL USING (auth.uid() = follower_id);

-- Saved posts policies
CREATE POLICY "Users can view own saved posts" ON saved_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own saved posts" ON saved_posts FOR ALL USING (auth.uid() = user_id);

-- Polls policies
CREATE POLICY "Polls are viewable by everyone" ON polls FOR SELECT USING (true);
CREATE POLICY "Users can create polls for own posts" ON polls FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM posts WHERE id = post_id AND user_id = auth.uid())
);

-- Poll votes policies
CREATE POLICY "Poll votes are viewable by everyone" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Users can manage own votes" ON poll_votes FOR ALL USING (auth.uid() = user_id);

-- Hashtags policies
CREATE POLICY "Hashtags are viewable by everyone" ON hashtags FOR SELECT USING (true);
CREATE POLICY "Anyone can create hashtags" ON hashtags FOR INSERT WITH CHECK (true);

-- Post hashtags policies
CREATE POLICY "Post hashtags are viewable by everyone" ON post_hashtags FOR SELECT USING (true);
CREATE POLICY "Users can manage hashtags for own posts" ON post_hashtags FOR ALL USING (
  EXISTS (SELECT 1 FROM posts WHERE id = post_id AND user_id = auth.uid())
);

-- Mentions policies
CREATE POLICY "Mentions are viewable by everyone" ON mentions FOR SELECT USING (true);
CREATE POLICY "Users can create mentions" ON mentions FOR INSERT WITH CHECK (auth.uid() = mentioning_user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
