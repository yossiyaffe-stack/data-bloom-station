-- 1. Occasions (red carpet, bat mitzvah, cruise, wedding, etc.)
CREATE TABLE public.occasions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT, -- formal, casual, celebration, travel
  formality_level TEXT, -- black-tie, semi-formal, casual, etc.
  description TEXT,
  styling_principles JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.occasions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read occasions" ON public.occasions FOR SELECT USING (true);
CREATE POLICY "Authenticated insert occasions" ON public.occasions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update occasions" ON public.occasions FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete occasions" ON public.occasions FOR DELETE USING (true);

-- 2. Subtype Occasion Outfits (how to dress for each occasion by subtype)
CREATE TABLE public.subtype_occasion_outfits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  occasion_id UUID REFERENCES occasions(id),
  outfit_description TEXT,
  key_pieces JSONB DEFAULT '[]',
  styling_tips JSONB DEFAULT '[]',
  colors_to_emphasize JSONB DEFAULT '[]',
  fabrics_recommended JSONB DEFAULT '[]',
  accessories JSONB DEFAULT '[]',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subtype_id, occasion_id)
);

ALTER TABLE public.subtype_occasion_outfits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read subtype_occasion_outfits" ON public.subtype_occasion_outfits FOR SELECT USING (true);
CREATE POLICY "Authenticated insert subtype_occasion_outfits" ON public.subtype_occasion_outfits FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_occasion_outfits" ON public.subtype_occasion_outfits FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete subtype_occasion_outfits" ON public.subtype_occasion_outfits FOR DELETE USING (true);

-- 3. Style Icons (celebrities and Old Hollywood)
CREATE TABLE public.style_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  era TEXT, -- old-hollywood, golden-age, modern, contemporary
  birth_year TEXT,
  nationality TEXT,
  profession TEXT,
  is_celebrity BOOLEAN DEFAULT true,
  image_url TEXT,
  wikipedia_url TEXT,
  style_signature TEXT,
  why_they_match TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.style_icons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read style_icons" ON public.style_icons FOR SELECT USING (true);
CREATE POLICY "Authenticated insert style_icons" ON public.style_icons FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update style_icons" ON public.style_icons FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete style_icons" ON public.style_icons FOR DELETE USING (true);

-- 4. Subtype Style Icons mapping
CREATE TABLE public.subtype_style_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  style_icon_id UUID REFERENCES style_icons(id),
  notes TEXT,
  UNIQUE(subtype_id, style_icon_id)
);

ALTER TABLE public.subtype_style_icons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read subtype_style_icons" ON public.subtype_style_icons FOR SELECT USING (true);
CREATE POLICY "Authenticated insert subtype_style_icons" ON public.subtype_style_icons FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_style_icons" ON public.subtype_style_icons FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete subtype_style_icons" ON public.subtype_style_icons FOR DELETE USING (true);

-- 5. Face Shapes
CREATE TABLE public.face_shapes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  characteristics JSONB DEFAULT '[]',
  visual_traits JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.face_shapes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read face_shapes" ON public.face_shapes FOR SELECT USING (true);
CREATE POLICY "Authenticated insert face_shapes" ON public.face_shapes FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update face_shapes" ON public.face_shapes FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete face_shapes" ON public.face_shapes FOR DELETE USING (true);

-- 6. Face Shape Recommendations (glasses, jewelry, necklines, hairstyles)
CREATE TABLE public.face_shape_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  face_shape_id UUID REFERENCES face_shapes(id),
  category TEXT NOT NULL, -- glasses, jewelry, necklines, hairstyles
  item_type TEXT, -- specific type within category (e.g., cat-eye, round frames)
  recommendation TEXT NOT NULL,
  why_it_works TEXT,
  avoid TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.face_shape_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read face_shape_recommendations" ON public.face_shape_recommendations FOR SELECT USING (true);
CREATE POLICY "Authenticated insert face_shape_recommendations" ON public.face_shape_recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update face_shape_recommendations" ON public.face_shape_recommendations FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete face_shape_recommendations" ON public.face_shape_recommendations FOR DELETE USING (true);

-- 7. Era Photos (historical photo library)
CREATE TABLE public.era_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  era_id UUID REFERENCES historical_eras(id),
  title TEXT,
  description TEXT,
  image_url TEXT,
  source TEXT,
  year_approximate TEXT,
  notable_style_elements JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.era_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read era_photos" ON public.era_photos FOR SELECT USING (true);
CREATE POLICY "Authenticated insert era_photos" ON public.era_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update era_photos" ON public.era_photos FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete era_photos" ON public.era_photos FOR DELETE USING (true);

-- 8. Cultural Clothing (costumes, cultural references)
CREATE TABLE public.cultural_clothing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  culture TEXT,
  region TEXT,
  time_period TEXT,
  description TEXT,
  traditional_colors JSONB DEFAULT '[]',
  fabrics_used JSONB DEFAULT '[]',
  occasions_worn JSONB DEFAULT '[]',
  image_url TEXT,
  season_affinity JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.cultural_clothing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cultural_clothing" ON public.cultural_clothing FOR SELECT USING (true);
CREATE POLICY "Authenticated insert cultural_clothing" ON public.cultural_clothing FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update cultural_clothing" ON public.cultural_clothing FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete cultural_clothing" ON public.cultural_clothing FOR DELETE USING (true);

-- 9. Nature Photos (trees, flowers, water, skies, mountains by season)
CREATE TABLE public.nature_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  season_id UUID REFERENCES seasons(id),
  subtype_id UUID REFERENCES subtypes(id),
  category TEXT NOT NULL, -- trees, flowers, water, skies, mountains, landscapes
  title TEXT,
  description TEXT,
  image_url TEXT,
  color_palette JSONB DEFAULT '[]',
  mood TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.nature_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read nature_photos" ON public.nature_photos FOR SELECT USING (true);
CREATE POLICY "Authenticated insert nature_photos" ON public.nature_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update nature_photos" ON public.nature_photos FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete nature_photos" ON public.nature_photos FOR DELETE USING (true);

-- 10. Interior Designs (rooms by subtype)
CREATE TABLE public.interior_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  room_type TEXT, -- living-room, bedroom, kitchen, office, etc.
  style_name TEXT,
  title TEXT,
  description TEXT,
  image_url TEXT,
  fabric_suggestions JSONB DEFAULT '[]',
  color_palette JSONB DEFAULT '[]',
  furniture_styles JSONB DEFAULT '[]',
  accent_ideas JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.interior_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read interior_designs" ON public.interior_designs FOR SELECT USING (true);
CREATE POLICY "Authenticated insert interior_designs" ON public.interior_designs FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update interior_designs" ON public.interior_designs FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete interior_designs" ON public.interior_designs FOR DELETE USING (true);

-- 11. Accent Colors (unique signature colors per subtype)
CREATE TABLE public.subtype_accent_colors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  usage_notes TEXT,
  best_worn_as TEXT, -- accessory, top, accent-piece
  is_signature BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.subtype_accent_colors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read subtype_accent_colors" ON public.subtype_accent_colors FOR SELECT USING (true);
CREATE POLICY "Authenticated insert subtype_accent_colors" ON public.subtype_accent_colors FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update subtype_accent_colors" ON public.subtype_accent_colors FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete subtype_accent_colors" ON public.subtype_accent_colors FOR DELETE USING (true);

-- 12. Outfit Links (size-based curated shopping links)
CREATE TABLE public.outfit_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  occasion_id UUID REFERENCES occasions(id),
  body_type_id UUID REFERENCES body_types(id),
  size_category TEXT, -- tops, bottoms, dresses, shoes
  size_value TEXT, -- S, M, L, XL, 6, 8, 10, etc.
  product_name TEXT,
  product_url TEXT,
  retailer TEXT,
  price_tier TEXT, -- budget, mid-range, luxury
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.outfit_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read outfit_links" ON public.outfit_links FOR SELECT USING (true);
CREATE POLICY "Authenticated insert outfit_links" ON public.outfit_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update outfit_links" ON public.outfit_links FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete outfit_links" ON public.outfit_links FOR DELETE USING (true);

-- 13. Alternate Seasons (for dual-season individuals)
CREATE TABLE public.alternate_seasons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_subtype_id UUID REFERENCES subtypes(id),
  alternate_subtype_id UUID REFERENCES subtypes(id),
  overlap_percentage INTEGER,
  shared_characteristics JSONB DEFAULT '[]',
  when_to_use_alternate TEXT,
  transition_tips TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(primary_subtype_id, alternate_subtype_id)
);

ALTER TABLE public.alternate_seasons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read alternate_seasons" ON public.alternate_seasons FOR SELECT USING (true);
CREATE POLICY "Authenticated insert alternate_seasons" ON public.alternate_seasons FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update alternate_seasons" ON public.alternate_seasons FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete alternate_seasons" ON public.alternate_seasons FOR DELETE USING (true);

-- 14. Seasonal Dressing Guides (how to dress for weather seasons in your color season)
CREATE TABLE public.seasonal_dressing_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subtype_id UUID REFERENCES subtypes(id),
  weather_season TEXT NOT NULL, -- spring, summer, fall, winter (actual weather)
  dressing_tips JSONB DEFAULT '[]',
  layering_advice TEXT,
  fabric_weights JSONB DEFAULT '[]',
  color_emphasis JSONB DEFAULT '[]',
  key_pieces JSONB DEFAULT '[]',
  avoid JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subtype_id, weather_season)
);

ALTER TABLE public.seasonal_dressing_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read seasonal_dressing_guides" ON public.seasonal_dressing_guides FOR SELECT USING (true);
CREATE POLICY "Authenticated insert seasonal_dressing_guides" ON public.seasonal_dressing_guides FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update seasonal_dressing_guides" ON public.seasonal_dressing_guides FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete seasonal_dressing_guides" ON public.seasonal_dressing_guides FOR DELETE USING (true);