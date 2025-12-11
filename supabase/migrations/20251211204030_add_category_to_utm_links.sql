/*
  # Add category column to utm_links table

  1. Changes
    - Add `category` column to `utm_links` table with enum type ('social' or 'youtube')
    - Set default value to 'social' for existing records
    - Make the column nullable to support backward compatibility

  2. Notes
    - Existing links without a category will be treated as 'social' by default in the UI
    - This allows for better organization of UTM links by type
*/

-- Add category column to utm_links table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'utm_links' AND column_name = 'category'
  ) THEN
    ALTER TABLE utm_links ADD COLUMN category text CHECK (category IN ('social', 'youtube'));
  END IF;
END $$;

-- Set default value for existing records
UPDATE utm_links SET category = 'social' WHERE category IS NULL;
