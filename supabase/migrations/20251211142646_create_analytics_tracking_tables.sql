/*
  # Create Analytics Tracking System

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `session_id` (uuid) - Unique session identifier
      - `page_path` (text) - Page URL path
      - `utm_source` (text) - UTM source parameter
      - `utm_medium` (text) - UTM medium parameter
      - `utm_campaign` (text) - UTM campaign parameter
      - `utm_term` (text) - UTM term parameter
      - `utm_content` (text) - UTM content parameter
      - `referrer` (text) - Document referrer
      - `user_agent` (text) - Browser user agent
      - `screen_resolution` (text) - Screen size
      - `created_at` (timestamptz) - Visit timestamp

    - `click_events`
      - `id` (uuid, primary key)
      - `session_id` (uuid) - Session identifier
      - `element_id` (text) - Element ID that was clicked
      - `element_text` (text) - Text content of element
      - `element_type` (text) - Type of element (button, link, etc)
      - `page_path` (text) - Page where click occurred
      - `created_at` (timestamptz) - Click timestamp

    - `session_data`
      - `id` (uuid, primary key)
      - `session_id` (uuid, unique) - Session identifier
      - `entry_page` (text) - First page visited
      - `exit_page` (text) - Last page visited
      - `session_start` (timestamptz) - Session start time
      - `session_end` (timestamptz) - Session end time
      - `total_duration` (integer) - Total time in seconds
      - `bounce` (boolean) - Whether session was a bounce (single page)
      - `utm_source` (text)
      - `utm_medium` (text)
      - `utm_campaign` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Only authenticated users (admins) can read analytics data
    - Public users can insert tracking data
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  page_path text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  screen_resolution text,
  created_at timestamptz DEFAULT now()
);

-- Create click_events table
CREATE TABLE IF NOT EXISTS click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  element_id text,
  element_text text,
  element_type text NOT NULL,
  page_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create session_data table
CREATE TABLE IF NOT EXISTS session_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid UNIQUE NOT NULL,
  entry_page text NOT NULL,
  exit_page text,
  session_start timestamptz NOT NULL DEFAULT now(),
  session_end timestamptz,
  total_duration integer DEFAULT 0,
  bounce boolean DEFAULT false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_source ON page_views(utm_source);
CREATE INDEX IF NOT EXISTS idx_click_events_session_id ON click_events(session_id);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at);
CREATE INDEX IF NOT EXISTS idx_session_data_session_id ON session_data(session_id);
CREATE INDEX IF NOT EXISTS idx_session_data_created_at ON session_data(created_at);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_data ENABLE ROW LEVEL SECURITY;

-- Policies for page_views
CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (true);

-- Policies for click_events
CREATE POLICY "Anyone can insert click events"
  ON click_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all click events"
  ON click_events FOR SELECT
  TO authenticated
  USING (true);

-- Policies for session_data
CREATE POLICY "Anyone can insert session data"
  ON session_data FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their session data"
  ON session_data FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all session data"
  ON session_data FOR SELECT
  TO authenticated
  USING (true);