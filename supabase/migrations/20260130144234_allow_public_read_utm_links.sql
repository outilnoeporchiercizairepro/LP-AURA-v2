/*
  # Allow public read access to UTM links

  1. Changes
    - Add policy to allow anonymous users to read utm_links table
    - This is needed so that visitors can resolve UTM short codes to source labels
    - Only SELECT access is granted, no write operations

  2. Security
    - Anonymous users can only read data, not modify it
    - This allows the tracking system to work for non-authenticated visitors
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can view all UTM links" ON utm_links;

-- Create new policy that allows both authenticated and anonymous users to read
CREATE POLICY "Anyone can view UTM links"
  ON utm_links FOR SELECT
  TO public
  USING (true);
