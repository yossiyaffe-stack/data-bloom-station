-- Fix RLS policies for subtypes to allow public updates (admin Data Hub)
DROP POLICY IF EXISTS "Authenticated update subtypes" ON public.subtypes;
DROP POLICY IF EXISTS "Authenticated insert subtypes" ON public.subtypes;
DROP POLICY IF EXISTS "Authenticated delete subtypes" ON public.subtypes;

-- Create public update/insert/delete policies for admin dashboard
CREATE POLICY "Public update subtypes" 
ON public.subtypes 
FOR UPDATE 
USING (true);

CREATE POLICY "Public insert subtypes" 
ON public.subtypes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public delete subtypes" 
ON public.subtypes 
FOR DELETE 
USING (true);