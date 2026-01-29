-- SECURITY HARDENING: Fix 6 error-level vulnerabilities

-- 1) Add ownership columns for RLS scoping
ALTER TABLE public.client_profiles  ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE public.photo_analyses   ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE public.saved_palettes   ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE public.session_history  ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE public.training_samples ADD COLUMN IF NOT EXISTS created_by uuid;
ALTER TABLE public.ai_feedback      ADD COLUMN IF NOT EXISTS created_by uuid;

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_client_profiles_owner_id  ON public.client_profiles(owner_id);
CREATE INDEX IF NOT EXISTS idx_photo_analyses_owner_id   ON public.photo_analyses(owner_id);
CREATE INDEX IF NOT EXISTS idx_saved_palettes_owner_id   ON public.saved_palettes(owner_id);
CREATE INDEX IF NOT EXISTS idx_session_history_owner_id  ON public.session_history(owner_id);
CREATE INDEX IF NOT EXISTS idx_training_samples_created_by ON public.training_samples(created_by);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_created_by      ON public.ai_feedback(created_by);

-- Default ownership to logged-in user for new rows
ALTER TABLE public.client_profiles  ALTER COLUMN owner_id   SET DEFAULT auth.uid();
ALTER TABLE public.photo_analyses   ALTER COLUMN owner_id   SET DEFAULT auth.uid();
ALTER TABLE public.saved_palettes   ALTER COLUMN owner_id   SET DEFAULT auth.uid();
ALTER TABLE public.session_history  ALTER COLUMN owner_id   SET DEFAULT auth.uid();
ALTER TABLE public.training_samples ALTER COLUMN created_by SET DEFAULT auth.uid();
ALTER TABLE public.ai_feedback      ALTER COLUMN created_by SET DEFAULT auth.uid();

-- 2) Replace permissive policies with owner-scoped policies

-- client_profiles
DROP POLICY IF EXISTS "Public read client_profiles" ON public.client_profiles;
DROP POLICY IF EXISTS "Authenticated insert client_profiles" ON public.client_profiles;
DROP POLICY IF EXISTS "Authenticated update client_profiles" ON public.client_profiles;
DROP POLICY IF EXISTS "Authenticated delete client_profiles" ON public.client_profiles;

CREATE POLICY "Users read own client_profiles" ON public.client_profiles FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Users insert own client_profiles" ON public.client_profiles FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users update own client_profiles" ON public.client_profiles FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users delete own client_profiles" ON public.client_profiles FOR DELETE TO authenticated USING (owner_id = auth.uid());

-- photo_analyses
DROP POLICY IF EXISTS "Public read photo_analyses" ON public.photo_analyses;
DROP POLICY IF EXISTS "Authenticated insert photo_analyses" ON public.photo_analyses;
DROP POLICY IF EXISTS "Authenticated update photo_analyses" ON public.photo_analyses;
DROP POLICY IF EXISTS "Authenticated delete photo_analyses" ON public.photo_analyses;

CREATE POLICY "Users read own photo_analyses" ON public.photo_analyses FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Users insert own photo_analyses" ON public.photo_analyses FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users update own photo_analyses" ON public.photo_analyses FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users delete own photo_analyses" ON public.photo_analyses FOR DELETE TO authenticated USING (owner_id = auth.uid());

-- saved_palettes
DROP POLICY IF EXISTS "Public read saved_palettes" ON public.saved_palettes;
DROP POLICY IF EXISTS "Authenticated insert saved_palettes" ON public.saved_palettes;
DROP POLICY IF EXISTS "Authenticated update saved_palettes" ON public.saved_palettes;
DROP POLICY IF EXISTS "Authenticated delete saved_palettes" ON public.saved_palettes;

CREATE POLICY "Users read own saved_palettes" ON public.saved_palettes FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Users insert own saved_palettes" ON public.saved_palettes FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users update own saved_palettes" ON public.saved_palettes FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users delete own saved_palettes" ON public.saved_palettes FOR DELETE TO authenticated USING (owner_id = auth.uid());

-- session_history
DROP POLICY IF EXISTS "Public read session_history" ON public.session_history;
DROP POLICY IF EXISTS "Authenticated insert session_history" ON public.session_history;
DROP POLICY IF EXISTS "Authenticated update session_history" ON public.session_history;
DROP POLICY IF EXISTS "Authenticated delete session_history" ON public.session_history;

CREATE POLICY "Users read own session_history" ON public.session_history FOR SELECT TO authenticated USING (owner_id = auth.uid());
CREATE POLICY "Users insert own session_history" ON public.session_history FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users update own session_history" ON public.session_history FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users delete own session_history" ON public.session_history FOR DELETE TO authenticated USING (owner_id = auth.uid());

-- training_samples (authenticated can read all, but only owners can write)
DROP POLICY IF EXISTS "Public read training_samples" ON public.training_samples;
DROP POLICY IF EXISTS "Authenticated insert training_samples" ON public.training_samples;
DROP POLICY IF EXISTS "Authenticated update training_samples" ON public.training_samples;
DROP POLICY IF EXISTS "Authenticated delete training_samples" ON public.training_samples;

CREATE POLICY "Authenticated read training_samples" ON public.training_samples FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own training_samples" ON public.training_samples FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users update own training_samples" ON public.training_samples FOR UPDATE TO authenticated USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users delete own training_samples" ON public.training_samples FOR DELETE TO authenticated USING (created_by = auth.uid());

-- ai_feedback
DROP POLICY IF EXISTS "Public read ai_feedback" ON public.ai_feedback;
DROP POLICY IF EXISTS "Authenticated insert ai_feedback" ON public.ai_feedback;
DROP POLICY IF EXISTS "Authenticated update ai_feedback" ON public.ai_feedback;
DROP POLICY IF EXISTS "Authenticated delete ai_feedback" ON public.ai_feedback;

CREATE POLICY "Authenticated read ai_feedback" ON public.ai_feedback FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users insert own ai_feedback" ON public.ai_feedback FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users update own ai_feedback" ON public.ai_feedback FOR UPDATE TO authenticated USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY "Users delete own ai_feedback" ON public.ai_feedback FOR DELETE TO authenticated USING (created_by = auth.uid());

-- 3) Secure photo storage bucket
UPDATE storage.buckets SET public = false WHERE id = 'analysis-photos';

DROP POLICY IF EXISTS "Public read analysis photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload analysis photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update analysis photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete analysis photos" ON storage.objects;

CREATE POLICY "Users read own analysis photos" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'analysis-photos' AND (owner = auth.uid() OR (storage.foldername(name))[1] = auth.uid()::text));

CREATE POLICY "Users upload own analysis photos" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'analysis-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users update own analysis photos" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'analysis-photos' AND (owner = auth.uid() OR (storage.foldername(name))[1] = auth.uid()::text))
WITH CHECK (bucket_id = 'analysis-photos' AND (owner = auth.uid() OR (storage.foldername(name))[1] = auth.uid()::text));

CREATE POLICY "Users delete own analysis photos" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'analysis-photos' AND (owner = auth.uid() OR (storage.foldername(name))[1] = auth.uid()::text));

-- 4) Create internal secrets table for sync endpoint protection
CREATE TABLE IF NOT EXISTS public.internal_secrets (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.internal_secrets ENABLE ROW LEVEL SECURITY;
-- No RLS policies = only service role can access

INSERT INTO public.internal_secrets(key, value)
VALUES ('sync_from_source_secret', encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (key) DO NOTHING;