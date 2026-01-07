/*
  # Fix YouTube Creator Categories

  1. Changes
    - Remove old category constraint
    - Add new constraint supporting 'youtube-baptiste' and 'youtube-imrane'
    - Migrate any remaining 'youtube' entries to 'youtube-baptiste'

  2. Notes
    - This safely handles any existing data
    - Allows tracking YouTube links separately for Baptiste and Imrane
*/

-- Drop the old constraint if it exists
DO $$
BEGIN
  ALTER TABLE utm_links DROP CONSTRAINT IF EXISTS utm_links_category_check;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Migrate any remaining 'youtube' entries to 'youtube-baptiste'
UPDATE utm_links SET category = 'youtube-baptiste' WHERE category = 'youtube';

-- Add new constraint with creator-specific YouTube categories
ALTER TABLE utm_links ADD CONSTRAINT utm_links_category_check 
  CHECK (category IN ('social', 'youtube-baptiste', 'youtube-imrane'));
