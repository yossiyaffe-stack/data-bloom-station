-- =====================================================
-- STREAMS OF COLOR DATA HUB - COMPLETE SCHEMA
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SEASONS (4 base seasons)
-- =====================================================
CREATE TABLE public.seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  undertone TEXT, -- warm, cool, neutral
  characteristics JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.seasons (name, description, undertone, characteristics) VALUES
('Spring', 'Warm, clear, bright colors with golden undertones', 'warm', '["clear", "bright", "light", "fresh"]'),
('Summer', 'Cool, soft, muted colors with rose or blue undertones', 'cool', '["soft", "muted", "cool", "gentle"]'),
('Autumn', 'Warm, muted, rich colors with golden undertones', 'warm', '["muted", "rich", "earthy", "deep"]'),
('Winter', 'Cool, clear, bold colors with blue undertones', 'cool', '["clear", "bold", "dramatic", "high-contrast"]');

-- =====================================================
-- SUBTYPES (40 unique subtypes)
-- =====================================================
CREATE TABLE public.subtypes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES public.seasons(id),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  beauty_statement TEXT,
  effects JSONB DEFAULT '[]',
  color_combinations JSONB DEFAULT '[]',
  style_dos JSONB DEFAULT '[]',
  style_donts JSONB DEFAULT '[]',
  eras JSONB DEFAULT '[]',
  art_references JSONB DEFAULT '[]',
  designers JSONB DEFAULT '[]',
  home_decor JSONB DEFAULT '[]',
  jewelry_styles JSONB DEFAULT '{}',
  unique_features TEXT,
  bridging_to JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- COLORS (200+ master color database)
-- =====================================================
CREATE TABLE public.colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  hex TEXT NOT NULL,
  hsl_h INTEGER,
  hsl_s INTEGER,
  hsl_l INTEGER,
  category TEXT NOT NULL, -- skin_tone, romantic, formal, browns, greens, blues, purples, neutrals, metallics
  warmth TEXT, -- warm, cool, neutral
  seasons JSONB DEFAULT '[]', -- which seasons can use this color
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_COLORS (palette assignments)
-- =====================================================
CREATE TABLE public.subtype_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  color_id UUID REFERENCES public.colors(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- skin_tones, romantic, formal, hair_color, eye_color, neutrals, metallics, enlivened, high_note, pastels
  is_primary BOOLEAN DEFAULT false,
  notes TEXT,
  UNIQUE(subtype_id, color_id, category)
);

-- =====================================================
-- FABRICS (44+ fabrics)
-- =====================================================
CREATE TABLE public.fabrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- natural, textured, sheer, sheen, knit, casual, synthetic, decorative
  keywords JSONB DEFAULT '[]',
  characteristics JSONB DEFAULT '[]',
  formality_level TEXT, -- casual, smart_casual, dressy, formal, versatile
  care_level TEXT, -- easy, moderate, delicate
  quality_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_FABRICS (recommendations per subtype)
-- =====================================================
CREATE TABLE public.subtype_fabrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  fabric_id UUID REFERENCES public.fabrics(id) ON DELETE CASCADE,
  rating TEXT NOT NULL, -- perfect, good, avoid
  notes TEXT,
  UNIQUE(subtype_id, fabric_id)
);

-- =====================================================
-- PRINTS (51+ print categories)
-- =====================================================
CREATE TABLE public.prints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category TEXT, -- floral, geometric, abstract, ethnic, etc.
  description TEXT,
  keywords JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_PRINTS
-- =====================================================
CREATE TABLE public.subtype_prints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  print_id UUID REFERENCES public.prints(id) ON DELETE CASCADE,
  rating TEXT NOT NULL, -- perfect, good, avoid
  notes TEXT,
  UNIQUE(subtype_id, print_id)
);

-- =====================================================
-- GEMSTONES (24+ gemstones)
-- =====================================================
CREATE TABLE public.gemstones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color_hex TEXT,
  description TEXT,
  symbolism TEXT,
  seasons JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_GEMSTONES
-- =====================================================
CREATE TABLE public.subtype_gemstones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  gemstone_id UUID REFERENCES public.gemstones(id) ON DELETE CASCADE,
  rating TEXT NOT NULL, -- perfect, good, neutral
  notes TEXT,
  UNIQUE(subtype_id, gemstone_id)
);

-- =====================================================
-- ARTISTS (21 master artists)
-- =====================================================
CREATE TABLE public.artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  era TEXT,
  style TEXT,
  notable_works JSONB DEFAULT '[]',
  color_characteristics TEXT,
  seasons_affinity JSONB DEFAULT '[]',
  wikipedia_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_ARTISTS
-- =====================================================
CREATE TABLE public.subtype_artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  notes TEXT,
  UNIQUE(subtype_id, artist_id)
);

-- =====================================================
-- HISTORICAL_ERAS (27 eras)
-- =====================================================
CREATE TABLE public.historical_eras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  period TEXT, -- e.g., "1600s", "1920s"
  description TEXT,
  style_characteristics JSONB DEFAULT '[]',
  color_palette_notes TEXT,
  seasons_affinity JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_ERAS
-- =====================================================
CREATE TABLE public.subtype_eras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  era_id UUID REFERENCES public.historical_eras(id) ON DELETE CASCADE,
  notes TEXT,
  UNIQUE(subtype_id, era_id)
);

-- =====================================================
-- DESIGNERS (18+ designers)
-- =====================================================
CREATE TABLE public.designers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  brand_style TEXT,
  price_tier TEXT, -- luxury, premium, accessible
  signature_elements JSONB DEFAULT '[]',
  seasons_affinity JSONB DEFAULT '[]',
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SUBTYPE_DESIGNERS
-- =====================================================
CREATE TABLE public.subtype_designers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  designer_id UUID REFERENCES public.designers(id) ON DELETE CASCADE,
  notes TEXT,
  UNIQUE(subtype_id, designer_id)
);

-- =====================================================
-- MASTERPIECE PAINTINGS (for "See Yourself in Masters")
-- =====================================================
CREATE TABLE public.masterpiece_paintings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES public.artists(id),
  artist_name TEXT, -- denormalized for quick access
  year TEXT,
  museum TEXT,
  museum_url TEXT,
  image_url TEXT,
  local_image_path TEXT,
  body_type_affinity JSONB DEFAULT '[]', -- hourglass, pear, athletic, etc.
  color_season_affinity JSONB DEFAULT '[]',
  notable_colors JSONB DEFAULT '[]',
  why_it_matches TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- BODY TYPES (for cross-reference)
-- =====================================================
CREATE TABLE public.body_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  system TEXT, -- kibbe, trinny_susannah, traditional
  description TEXT,
  characteristics JSONB DEFAULT '[]',
  style_recommendations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- METHODOLOGY METADATA
-- =====================================================
CREATE TABLE public.methodology_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.methodology_metadata (key, value, description) VALUES
('total_subtypes', '40', 'Total number of unique subtypes'),
('total_colors', '157', 'Colors in master database'),
('total_fabrics', '44', 'Fabric types analyzed'),
('total_prints', '51', 'Print categories'),
('total_gemstones', '24', 'Gemstone recommendations'),
('total_artists', '21', 'Master artist inspirations'),
('total_eras', '27', 'Historical era references'),
('methodology_name', '"Streams of Color"', 'Official methodology name'),
('methodology_author', '"Nechama Yaffe"', 'Methodology creator'),
('version', '"2.0"', 'Data version');

-- =====================================================
-- ENABLE ROW LEVEL SECURITY (Public Read)
-- =====================================================
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fabrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_fabrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_prints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historical_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtype_designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.masterpiece_paintings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.methodology_metadata ENABLE ROW LEVEL SECURITY;

-- Public READ access (anyone can read methodology data)
CREATE POLICY "Public read seasons" ON public.seasons FOR SELECT USING (true);
CREATE POLICY "Public read subtypes" ON public.subtypes FOR SELECT USING (true);
CREATE POLICY "Public read colors" ON public.colors FOR SELECT USING (true);
CREATE POLICY "Public read subtype_colors" ON public.subtype_colors FOR SELECT USING (true);
CREATE POLICY "Public read fabrics" ON public.fabrics FOR SELECT USING (true);
CREATE POLICY "Public read subtype_fabrics" ON public.subtype_fabrics FOR SELECT USING (true);
CREATE POLICY "Public read prints" ON public.prints FOR SELECT USING (true);
CREATE POLICY "Public read subtype_prints" ON public.subtype_prints FOR SELECT USING (true);
CREATE POLICY "Public read gemstones" ON public.gemstones FOR SELECT USING (true);
CREATE POLICY "Public read subtype_gemstones" ON public.subtype_gemstones FOR SELECT USING (true);
CREATE POLICY "Public read artists" ON public.artists FOR SELECT USING (true);
CREATE POLICY "Public read subtype_artists" ON public.subtype_artists FOR SELECT USING (true);
CREATE POLICY "Public read historical_eras" ON public.historical_eras FOR SELECT USING (true);
CREATE POLICY "Public read subtype_eras" ON public.subtype_eras FOR SELECT USING (true);
CREATE POLICY "Public read designers" ON public.designers FOR SELECT USING (true);
CREATE POLICY "Public read subtype_designers" ON public.subtype_designers FOR SELECT USING (true);
CREATE POLICY "Public read masterpiece_paintings" ON public.masterpiece_paintings FOR SELECT USING (true);
CREATE POLICY "Public read body_types" ON public.body_types FOR SELECT USING (true);
CREATE POLICY "Public read methodology_metadata" ON public.methodology_metadata FOR SELECT USING (true);

-- Authenticated WRITE access (trainers can update)
CREATE POLICY "Authenticated insert seasons" ON public.seasons FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update seasons" ON public.seasons FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete seasons" ON public.seasons FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtypes" ON public.subtypes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtypes" ON public.subtypes FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtypes" ON public.subtypes FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert colors" ON public.colors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update colors" ON public.colors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete colors" ON public.colors FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_colors" ON public.subtype_colors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_colors" ON public.subtype_colors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_colors" ON public.subtype_colors FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert fabrics" ON public.fabrics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update fabrics" ON public.fabrics FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete fabrics" ON public.fabrics FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_fabrics" ON public.subtype_fabrics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_fabrics" ON public.subtype_fabrics FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_fabrics" ON public.subtype_fabrics FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert prints" ON public.prints FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update prints" ON public.prints FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete prints" ON public.prints FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_prints" ON public.subtype_prints FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_prints" ON public.subtype_prints FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_prints" ON public.subtype_prints FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert gemstones" ON public.gemstones FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update gemstones" ON public.gemstones FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete gemstones" ON public.gemstones FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_gemstones" ON public.subtype_gemstones FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_gemstones" ON public.subtype_gemstones FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_gemstones" ON public.subtype_gemstones FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert artists" ON public.artists FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update artists" ON public.artists FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete artists" ON public.artists FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_artists" ON public.subtype_artists FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_artists" ON public.subtype_artists FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_artists" ON public.subtype_artists FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert historical_eras" ON public.historical_eras FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update historical_eras" ON public.historical_eras FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete historical_eras" ON public.historical_eras FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_eras" ON public.subtype_eras FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_eras" ON public.subtype_eras FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_eras" ON public.subtype_eras FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert designers" ON public.designers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update designers" ON public.designers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete designers" ON public.designers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert subtype_designers" ON public.subtype_designers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_designers" ON public.subtype_designers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete subtype_designers" ON public.subtype_designers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert masterpiece_paintings" ON public.masterpiece_paintings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update masterpiece_paintings" ON public.masterpiece_paintings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete masterpiece_paintings" ON public.masterpiece_paintings FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert body_types" ON public.body_types FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update body_types" ON public.body_types FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete body_types" ON public.body_types FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated insert methodology_metadata" ON public.methodology_metadata FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update methodology_metadata" ON public.methodology_metadata FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete methodology_metadata" ON public.methodology_metadata FOR DELETE TO authenticated USING (true);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_seasons_updated_at BEFORE UPDATE ON public.seasons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subtypes_updated_at BEFORE UPDATE ON public.subtypes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_methodology_metadata_updated_at BEFORE UPDATE ON public.methodology_metadata
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();