-- Add provenance tracking columns to key tables
ALTER TABLE public.subtypes 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.colors 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.fabrics 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.artists 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.designers 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.gemstones 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.metals 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.prints 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.historical_eras 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

ALTER TABLE public.body_types 
ADD COLUMN IF NOT EXISTS source_app text DEFAULT 'data-hub',
ADD COLUMN IF NOT EXISTS synced_at timestamp with time zone DEFAULT now();

-- Create sync_sources table to register connected apps
CREATE TABLE IF NOT EXISTS public.sync_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name text NOT NULL UNIQUE,
  app_url text NOT NULL,
  export_endpoint text NOT NULL DEFAULT '/functions/v1/methodology-export',
  last_sync_at timestamp with time zone,
  sync_status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sync_sources ENABLE ROW LEVEL SECURITY;

-- RLS policies for sync_sources
CREATE POLICY "Public read sync_sources" ON public.sync_sources FOR SELECT USING (true);
CREATE POLICY "Authenticated insert sync_sources" ON public.sync_sources FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated update sync_sources" ON public.sync_sources FOR UPDATE USING (true);
CREATE POLICY "Authenticated delete sync_sources" ON public.sync_sources FOR DELETE USING (true);