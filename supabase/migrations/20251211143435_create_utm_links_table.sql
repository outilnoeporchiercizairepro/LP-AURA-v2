/*
  # Create UTM Links Mapping Table

  1. New Tables
    - `utm_links`
      - `id` (uuid, primary key)
      - `short_code` (text, unique) - Code court généré (ex: "a1b2c3")
      - `source_label` (text) - Vraie valeur de la source (ex: "linkedin-baptiste")
      - `medium_label` (text) - Vraie valeur du medium (ex: "post-organique")
      - `campaign_label` (text) - Vraie valeur de la campagne (ex: "lancement-q1-2024")
      - `term_label` (text) - Vraie valeur du term (optionnel)
      - `content_label` (text) - Vraie valeur du content (optionnel)
      - `full_url` (text) - URL complète générée
      - `notes` (text) - Notes optionnelles
      - `created_at` (timestamptz)
      - `created_by` (uuid) - ID de l'utilisateur qui a créé le lien

  2. Security
    - Enable RLS on utm_links table
    - Only authenticated users can create, read, update, and delete UTM links
*/

-- Create utm_links table
CREATE TABLE IF NOT EXISTS utm_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code text UNIQUE NOT NULL,
  source_label text NOT NULL,
  medium_label text,
  campaign_label text,
  term_label text,
  content_label text,
  full_url text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_utm_links_short_code ON utm_links(short_code);
CREATE INDEX IF NOT EXISTS idx_utm_links_created_at ON utm_links(created_at);

-- Enable RLS
ALTER TABLE utm_links ENABLE ROW LEVEL SECURITY;

-- Policies for utm_links
CREATE POLICY "Authenticated users can view all UTM links"
  ON utm_links FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert UTM links"
  ON utm_links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their UTM links"
  ON utm_links FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can delete their UTM links"
  ON utm_links FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);