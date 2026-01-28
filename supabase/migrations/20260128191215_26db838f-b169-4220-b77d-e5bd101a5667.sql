-- Create season_phases table for flexible phase definitions
CREATE TABLE public.season_phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES public.seasons(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Add phase_id to subtypes (nullable for existing records)
ALTER TABLE public.subtypes 
ADD COLUMN phase_id uuid REFERENCES public.season_phases(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE public.season_phases ENABLE ROW LEVEL SECURITY;

-- RLS policies for season_phases
CREATE POLICY "Public read season_phases" ON public.season_phases
FOR SELECT USING (true);

CREATE POLICY "Authenticated insert season_phases" ON public.season_phases
FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated update season_phases" ON public.season_phases
FOR UPDATE USING (true);

CREATE POLICY "Authenticated delete season_phases" ON public.season_phases
FOR DELETE USING (true);

-- Seed default phases for each existing season
INSERT INTO public.season_phases (season_id, name, display_order, description)
SELECT 
  s.id,
  phase.name,
  phase.display_order,
  phase.description
FROM public.seasons s
CROSS JOIN (
  VALUES 
    ('Early', 0, 'Beginning of the seasonal expression'),
    ('Middle', 1, 'Core seasonal characteristics'),
    ('Late', 2, 'Transitional seasonal qualities')
) AS phase(name, display_order, description);