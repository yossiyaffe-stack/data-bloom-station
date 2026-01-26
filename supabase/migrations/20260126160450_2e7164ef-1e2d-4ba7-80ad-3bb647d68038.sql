-- 1. Sephirot/Kabbalistic Colors table
CREATE TABLE public.sephirot_colors (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  hebrew_name TEXT,
  color_hex TEXT NOT NULL,
  meaning TEXT,
  attributes JSONB DEFAULT '[]'::jsonb,
  associated_body_part TEXT,
  associated_seasons JSONB DEFAULT '[]'::jsonb,
  position_on_tree INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.sephirot_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read sephirot_colors" ON public.sephirot_colors
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert sephirot_colors" ON public.sephirot_colors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update sephirot_colors" ON public.sephirot_colors
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete sephirot_colors" ON public.sephirot_colors
  FOR DELETE USING (true);

-- 2. Makeup Recommendations table
CREATE TABLE public.makeup_recommendations (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'lip', 'blush', 'eyeshadow', 'foundation', 'bronzer', 'highlighter'
  product_type TEXT,
  color_hex TEXT,
  color_name TEXT,
  finish TEXT, -- 'matte', 'satin', 'shimmer', 'glossy', 'dewy'
  intensity TEXT, -- 'subtle', 'medium', 'bold'
  notes TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.makeup_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read makeup_recommendations" ON public.makeup_recommendations
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert makeup_recommendations" ON public.makeup_recommendations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update makeup_recommendations" ON public.makeup_recommendations
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete makeup_recommendations" ON public.makeup_recommendations
  FOR DELETE USING (true);

-- 3. Metals table (to pair with existing gemstones)
CREATE TABLE public.metals (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color_hex TEXT,
  warmth TEXT, -- 'warm', 'cool', 'neutral'
  description TEXT,
  seasons JSONB DEFAULT '[]'::jsonb,
  price_tier TEXT, -- 'budget', 'mid', 'luxury'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.metals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read metals" ON public.metals
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert metals" ON public.metals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update metals" ON public.metals
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete metals" ON public.metals
  FOR DELETE USING (true);

-- 4. Subtype-Metal junction table
CREATE TABLE public.subtype_metals (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  subtype_id UUID REFERENCES public.subtypes(id) ON DELETE CASCADE,
  metal_id UUID REFERENCES public.metals(id) ON DELETE CASCADE,
  rating TEXT NOT NULL, -- 'best', 'good', 'avoid'
  notes TEXT,
  UNIQUE(subtype_id, metal_id)
);

ALTER TABLE public.subtype_metals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read subtype_metals" ON public.subtype_metals
  FOR SELECT USING (true);

CREATE POLICY "Authenticated insert subtype_metals" ON public.subtype_metals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update subtype_metals" ON public.subtype_metals
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete subtype_metals" ON public.subtype_metals
  FOR DELETE USING (true);