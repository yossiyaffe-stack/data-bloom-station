-- ============================================
-- CLIENT APP DATA TABLES
-- ============================================

-- Client profiles (stores analysis results for each user)
CREATE TABLE public.client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id TEXT UNIQUE, -- ID from the client app
  name TEXT,
  email TEXT,
  assigned_season_id UUID REFERENCES public.seasons(id),
  assigned_subtype_id UUID REFERENCES public.subtypes(id),
  quiz_answers JSONB DEFAULT '{}',
  analysis_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Photo analyses (extracted features from client photos)
CREATE TABLE public.photo_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_profile_id UUID REFERENCES public.client_profiles(id) ON DELETE CASCADE,
  photo_url TEXT,
  skin_undertone TEXT,
  eye_color TEXT,
  hair_color TEXT,
  contrast_level TEXT,
  extracted_features JSONB DEFAULT '{}',
  ai_prediction JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved palettes (personalized color selections)
CREATE TABLE public.saved_palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_profile_id UUID REFERENCES public.client_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color_ids UUID[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Session history (consultation tracking)
CREATE TABLE public.session_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_profile_id UUID REFERENCES public.client_profiles(id) ON DELETE CASCADE,
  session_date TIMESTAMPTZ DEFAULT now(),
  session_type TEXT,
  notes TEXT,
  trainer_notes TEXT,
  recommendations JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TRAINER APP DATA TABLES
-- ============================================

-- Training samples (labeled photos for AI training)
CREATE TABLE public.training_samples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_url TEXT NOT NULL,
  assigned_season_id UUID REFERENCES public.seasons(id),
  assigned_subtype_id UUID REFERENCES public.subtypes(id),
  skin_undertone TEXT,
  eye_color TEXT,
  hair_color TEXT,
  contrast_level TEXT,
  labeled_by TEXT,
  confidence_score DECIMAL(3,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI feedback corrections (when trainers correct AI predictions)
CREATE TABLE public.ai_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_sample_id UUID REFERENCES public.training_samples(id) ON DELETE CASCADE,
  photo_analysis_id UUID REFERENCES public.photo_analyses(id) ON DELETE SET NULL,
  ai_predicted_season_id UUID REFERENCES public.seasons(id),
  ai_predicted_subtype_id UUID REFERENCES public.subtypes(id),
  corrected_season_id UUID REFERENCES public.seasons(id),
  corrected_subtype_id UUID REFERENCES public.subtypes(id),
  correction_reason TEXT,
  corrected_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ENABLE RLS
-- ============================================
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (for API access)
-- ============================================
CREATE POLICY "Public read client_profiles" ON public.client_profiles FOR SELECT USING (true);
CREATE POLICY "Public read photo_analyses" ON public.photo_analyses FOR SELECT USING (true);
CREATE POLICY "Public read saved_palettes" ON public.saved_palettes FOR SELECT USING (true);
CREATE POLICY "Public read session_history" ON public.session_history FOR SELECT USING (true);
CREATE POLICY "Public read training_samples" ON public.training_samples FOR SELECT USING (true);
CREATE POLICY "Public read ai_feedback" ON public.ai_feedback FOR SELECT USING (true);

-- ============================================
-- AUTHENTICATED WRITE POLICIES (for edge functions)
-- ============================================
CREATE POLICY "Authenticated insert client_profiles" ON public.client_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update client_profiles" ON public.client_profiles FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete client_profiles" ON public.client_profiles FOR DELETE USING (true);

CREATE POLICY "Authenticated insert photo_analyses" ON public.photo_analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update photo_analyses" ON public.photo_analyses FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete photo_analyses" ON public.photo_analyses FOR DELETE USING (true);

CREATE POLICY "Authenticated insert saved_palettes" ON public.saved_palettes FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update saved_palettes" ON public.saved_palettes FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete saved_palettes" ON public.saved_palettes FOR DELETE USING (true);

CREATE POLICY "Authenticated insert session_history" ON public.session_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update session_history" ON public.session_history FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete session_history" ON public.session_history FOR DELETE USING (true);

CREATE POLICY "Authenticated insert training_samples" ON public.training_samples FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update training_samples" ON public.training_samples FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete training_samples" ON public.training_samples FOR DELETE USING (true);

CREATE POLICY "Authenticated insert ai_feedback" ON public.ai_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update ai_feedback" ON public.ai_feedback FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete ai_feedback" ON public.ai_feedback FOR DELETE USING (true);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER update_client_profiles_updated_at
  BEFORE UPDATE ON public.client_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- STORAGE BUCKET FOR PHOTOS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('analysis-photos', 'analysis-photos', true);

-- Storage policies for photo uploads
CREATE POLICY "Public read analysis photos" ON storage.objects FOR SELECT USING (bucket_id = 'analysis-photos');
CREATE POLICY "Anyone can upload analysis photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'analysis-photos');
CREATE POLICY "Anyone can update analysis photos" ON storage.objects FOR UPDATE USING (bucket_id = 'analysis-photos');
CREATE POLICY "Anyone can delete analysis photos" ON storage.objects FOR DELETE USING (bucket_id = 'analysis-photos');