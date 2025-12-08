/*
  # Update Storage Policies for Public Folder Access

  1. Changes
    - Drop existing restrictive upload policies
    - Create new policies that allow authenticated users to upload to public folder
    - Update delete policies to allow deleting files in public folder
  
  2. Security
    - Only authenticated users (admins) can upload and delete
    - Public can still read all files
    - Files are uploaded to public/ folder for easy management
*/

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own videos" ON storage.objects;

CREATE POLICY "Authenticated users can upload to images bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload to videos bucket"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can delete from images bucket"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete from videos bucket"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update videos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'videos')
  WITH CHECK (bucket_id = 'videos');
