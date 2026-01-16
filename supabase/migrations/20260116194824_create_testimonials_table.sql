/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `name` (text, required) - Name of the person giving the testimonial
      - `title` (text, required) - Title/headline of the testimonial
      - `text` (text, required) - Full testimonial content
      - `published` (boolean, default false) - Whether the testimonial is published on the site
      - `created_at` (timestamptz) - When the testimonial was created
      - `updated_at` (timestamptz) - When the testimonial was last updated

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for authenticated users (admins) to manage testimonials
    - Add policy for public users to read published testimonials only

  3. Notes
    - Testimonials can be created, edited, and published/unpublished from the admin panel
    - Only published testimonials will be visible on the public website
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  text text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage all testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public users can view published testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (published = true);

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published, created_at DESC);
