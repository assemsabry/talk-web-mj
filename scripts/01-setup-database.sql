-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_title AS ENUM (
  'Public Figure', 'Influencer', 'Content Creator', 'AI Engineer', 'Software Engineer', 
  'Data Scientist', 'Product Manager', 'UX Designer', 'UI Designer', 'Graphic Designer',
  'Web Developer', 'Mobile Developer', 'DevOps Engineer', 'Cybersecurity Expert', 
  'Blockchain Developer', 'Game Developer', 'Machine Learning Engineer', 'Cloud Architect',
  'Business Analyst', 'Digital Marketer', 'Social Media Manager', 'SEO Specialist',
  'Entrepreneur', 'Startup Founder', 'CEO', 'CTO', 'CMO', 'CFO', 'COO', 'VP of Engineering',
  'Tech Lead', 'Engineering Manager', 'Scrum Master', 'Project Manager', 'Consultant',
  'Freelancer', 'Artist', 'Musician', 'Writer', 'Blogger', 'Journalist', 'Photographer',
  'Videographer', 'Film Director', 'Producer', 'Actor', 'Voice Actor', 'Comedian',
  'Podcaster', 'YouTuber', 'Streamer', 'Gamer', 'Esports Player', 'Coach', 'Trainer',
  'Fitness Instructor', 'Nutritionist', 'Doctor', 'Nurse', 'Therapist', 'Psychologist',
  'Teacher', 'Professor', 'Researcher', 'Scientist', 'Engineer', 'Architect', 'Lawyer',
  'Judge', 'Police Officer', 'Firefighter', 'Paramedic', 'Pilot', 'Chef', 'Baker',
  'Restaurant Owner', 'Food Blogger', 'Travel Blogger', 'Fashion Designer', 'Model',
  'Makeup Artist', 'Hair Stylist', 'Beauty Influencer', 'Lifestyle Blogger', 'Mom Blogger',
  'Dad Blogger', 'Parenting Expert', 'Relationship Coach', 'Life Coach', 'Motivational Speaker',
  'Author', 'Poet', 'Translator', 'Editor', 'Publisher', 'Librarian', 'Historian',
  'Archaeologist', 'Anthropologist', 'Sociologist', 'Political Scientist', 'Economist',
  'Financial Advisor', 'Investment Banker', 'Stock Trader', 'Real Estate Agent', 
  'Property Developer', 'Interior Designer', 'Landscape Architect', 'Urban Planner',
  'Environmental Scientist', 'Marine Biologist', 'Veterinarian', 'Farmer', 'Gardener',
  'Botanist', 'Zoologist', 'Geologist', 'Meteorologist', 'Astronomer', 'Physicist',
  'Chemist', 'Mathematician', 'Statistician', 'Actuary', 'Quality Assurance', 'Tester',
  'Technical Writer', 'Sales Manager', 'Account Manager', 'Customer Success Manager',
  'HR Manager', 'Recruiter', 'Operations Manager', 'Supply Chain Manager', 'Logistics Coordinator',
  'Event Planner', 'Wedding Planner', 'Travel Agent', 'Tour Guide', 'Hotel Manager',
  'Restaurant Manager', 'Retail Manager', 'Store Owner', 'Cashier', 'Sales Associate',
  'Customer Service Representative', 'Call Center Agent', 'Virtual Assistant', 'Secretary',
  'Administrative Assistant', 'Office Manager', 'Receptionist', 'Data Entry Clerk',
  'Bookkeeper', 'Accountant', 'Tax Advisor', 'Auditor', 'Insurance Agent', 'Bank Teller',
  'Loan Officer', 'Credit Analyst', 'Risk Manager', 'Compliance Officer', 'Legal Assistant',
  'Paralegal', 'Court Reporter', 'Bailiff', 'Security Guard', 'Private Investigator',
  'Detective', 'Social Worker', 'Counselor', 'Case Manager', 'Non-profit Worker', 'Volunteer',
  'Community Organizer', 'Activist', 'Politician', 'Government Official', 'Diplomat',
  'Military Officer', 'Veteran', 'Student', 'Graduate Student', 'Intern', 'Apprentice',
  'Retired', 'Homemaker', 'Stay-at-home Parent', 'Caregiver', 'Other'
);

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  title user_title DEFAULT 'Other',
  avatar_url TEXT,
  banner_url TEXT,
  birth_date DATE,
  verified BOOLEAN DEFAULT FALSE,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$')
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  image_urls TEXT[],
  video_url TEXT,
  poll_id UUID,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  reposts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT content_length CHECK (char_length(content) <= 2000)
);

-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT comment_content_length CHECK (char_length(content) <= 500)
);

-- Create likes table
CREATE TABLE likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  reaction_type TEXT DEFAULT 'like',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT like_target CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR 
    (post_id IS NULL AND comment_id IS NOT NULL)
  ),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, comment_id)
);

-- Create follows table
CREATE TABLE follows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT no_self_follow CHECK (follower_id != following_id),
  UNIQUE(follower_id, following_id)
);

-- Create saved_posts table
CREATE TABLE saved_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, post_id)
);

-- Create polls table
CREATE TABLE polls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  multiple_choice BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  total_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT question_length CHECK (char_length(question) <= 500)
);

-- Create poll_votes table
CREATE TABLE poll_votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  option_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(poll_id, user_id, option_index)
);

-- Create hashtags table
CREATE TABLE hashtags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT hashtag_format CHECK (name ~ '^[a-zA-Z0-9_]+$')
);

-- Create post_hashtags junction table
CREATE TABLE post_hashtags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  hashtag_id UUID REFERENCES hashtags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, hashtag_id)
);

-- Create mentions table
CREATE TABLE mentions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  mentioned_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mentioning_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT mention_target CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR 
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key for polls in posts
ALTER TABLE posts ADD CONSTRAINT fk_posts_poll FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE SET NULL;
