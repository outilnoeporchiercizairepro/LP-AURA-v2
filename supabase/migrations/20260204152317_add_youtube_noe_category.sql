/*
  # Add YouTube Noé Category
  
  1. Changes
    - Drop existing category constraint
    - Add new constraint supporting 'youtube-noe'
  
  2. Notes
    - Allows tracking YouTube links for Noé
    - Preserves existing categories
*/

-- Drop the old constraint if it exists
DO $$
BEGIN
  ALTER TABLE utm_links DROP CONSTRAINT IF EXISTS utm_links_category_check;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Add new constraint with youtube-noe
ALTER TABLE utm_links ADD CONSTRAINT utm_links_category_check 
  CHECK (category IN ('social', 'youtube-baptiste', 'youtube-imrane', 'youtube-noe'));
