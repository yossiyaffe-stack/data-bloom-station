import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SyncSource {
  id: string;
  app_name: string;
  app_url: string;
  export_endpoint: string;
  last_sync_at: string | null;
  sync_status: string;
}

interface SyncResult {
  table: string;
  inserted: number;
  updated: number;
  errors: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const sourceId = url.searchParams.get("source_id");
    const action = url.searchParams.get("action") || "sync";

    // List all registered sources
    if (action === "list") {
      const { data: sources, error } = await supabase
        .from("sync_sources")
        .select("*")
        .order("app_name");
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, sources }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Register a new source
    if (action === "register" && req.method === "POST") {
      const body = await req.json();
      const { app_name, app_url, export_endpoint } = body;
      
      if (!app_name || !app_url) {
        throw new Error("app_name and app_url are required");
      }

      const { data, error } = await supabase
        .from("sync_sources")
        .upsert({
          app_name,
          app_url,
          export_endpoint: export_endpoint || "/functions/v1/methodology-export",
          sync_status: "registered"
        }, { onConflict: "app_name" })
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, source: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sync from ALL registered sources (for cron jobs)
    if (action === "sync-all") {
      const { data: sources, error: sourcesError } = await supabase
        .from("sync_sources")
        .select("*")
        .order("app_name");
      
      if (sourcesError) throw sourcesError;
      
      const allResults: { source: string; results: SyncResult[]; error?: string }[] = [];
      
      for (const source of sources || []) {
        try {
          const syncResults = await syncFromSource(supabase, source);
          allResults.push({ source: source.app_name, results: syncResults });
        } catch (e) {
          allResults.push({ 
            source: source.app_name, 
            results: [], 
            error: e instanceof Error ? e.message : String(e) 
          });
        }
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          synced_sources: allResults.length,
          results: allResults,
          synced_at: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sync from a specific source
    if (action === "sync") {
      if (!sourceId) {
        throw new Error("source_id is required for sync action");
      }

      // Get the source details
      const { data: source, error: sourceError } = await supabase
        .from("sync_sources")
        .select("*")
        .eq("id", sourceId)
        .single();
      
      if (sourceError || !source) {
        throw new Error(`Source not found: ${sourceId}`);
      }

      const results = await syncFromSource(supabase, source);

      return new Response(
        JSON.stringify({ 
          success: true, 
          source: source.app_name,
          results,
          synced_at: new Date().toISOString()
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    throw new Error(`Unknown action: ${action}`);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Sync error:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Main sync logic for a single source
async function syncFromSource(supabase: any, source: any): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  
  // Update status to syncing
  await supabase
    .from("sync_sources")
    .update({ sync_status: "syncing" })
    .eq("id", source.id);
  
  try {
    // Fetch data from source app's export endpoint
    let exportUrl = `${source.app_url}${source.export_endpoint}`;
    console.log(`Fetching from: ${exportUrl}`);
    
    let response = await fetch(exportUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from source: ${response.status}`);
    }
    
    let exportData = await response.json();
    
    // Check if this is a Streams-style export with sub-paths
    if (exportData.endpoints && !exportData.subtypes) {
      const allUrl = `${exportUrl}/all`;
      console.log(`Streams format detected, fetching from: ${allUrl}`);
      response = await fetch(allUrl);
      if (response.ok) {
        exportData = await response.json();
      }
    }
    
    // Handle Streams nested subtypes format (by season)
    let subtypesToSync: any[] = [];
    if (exportData.subtypes) {
      if (Array.isArray(exportData.subtypes)) {
        subtypesToSync = exportData.subtypes;
      } else {
        for (const [season, types] of Object.entries(exportData.subtypes)) {
          if (Array.isArray(types)) {
            subtypesToSync.push(...(types as any[]).map(t => ({ ...t, season })));
          }
        }
      }
    }
    
    if (subtypesToSync.length > 0) {
      const subtypeResult = await syncSubtypesFromStreams(supabase, subtypesToSync, source.app_name);
      results.push(subtypeResult);
    }

    // Handle Streams grouped colors format OR flat array
    let colorsToSync: any[] = [];
    if (exportData.colors) {
      if (Array.isArray(exportData.colors)) {
        colorsToSync = exportData.colors;
      } else {
        for (const [category, colors] of Object.entries(exportData.colors)) {
          if (Array.isArray(colors)) {
            colorsToSync.push(...(colors as any[]).map(c => ({ ...c, category })));
          }
        }
      }
    }
    
    if (colorsToSync.length > 0) {
      const colorResult = await syncColors(supabase, colorsToSync, source.app_name);
      results.push(colorResult);
    }

    // Sync fabrics
    if (exportData.fabrics?.length > 0) {
      const fabricResult = await syncFabrics(supabase, exportData.fabrics, source.app_name);
      results.push(fabricResult);
    }

    // Sync artists
    if (exportData.artists?.length > 0) {
      const artistResult = await syncArtists(supabase, exportData.artists, source.app_name);
      results.push(artistResult);
    }

    // Sync training samples
    if (exportData.training_samples?.length > 0) {
      const sampleResult = await syncTrainingSamples(supabase, exportData.training_samples, source.app_name);
      results.push(sampleResult);
    }

    // Sync seasons
    if (exportData.seasons?.length > 0) {
      const seasonResult = await syncSeasons(supabase, exportData.seasons, source.app_name);
      results.push(seasonResult);
    }

    // Sync masterpiece paintings
    if (exportData.paintings?.length > 0) {
      const paintingResult = await syncPaintings(supabase, exportData.paintings, source.app_name);
      results.push(paintingResult);
    }

    // Sync nature photos
    if (exportData.nature_photos?.length > 0) {
      const photoResult = await syncNaturePhotos(supabase, exportData.nature_photos, source.app_name);
      results.push(photoResult);
    }

    // Update sync status and timestamp
    await supabase
      .from("sync_sources")
      .update({ 
        sync_status: "completed",
        last_sync_at: new Date().toISOString()
      })
      .eq("id", source.id);

  } catch (syncError) {
    await supabase
      .from("sync_sources")
      .update({ sync_status: "failed" })
      .eq("id", source.id);
    throw syncError;
  }
  
  return results;
}

// Sync helpers with upsert logic
async function syncSubtypes(supabase: any, subtypes: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "subtypes", inserted: 0, updated: 0, errors: [] };
  
  for (const subtype of subtypes) {
    try {
      const { error } = await supabase
        .from("subtypes")
        .upsert({
          slug: subtype.slug,
          name: subtype.name,
          beauty_statement: subtype.beauty_statement,
          unique_features: subtype.unique_features,
          effects: subtype.effects,
          style_dos: subtype.style_dos,
          style_donts: subtype.style_donts,
          color_combinations: subtype.color_combinations,
          designers: subtype.designers,
          eras: subtype.eras,
          art_references: subtype.art_references,
          jewelry_styles: subtype.jewelry_styles,
          home_decor: subtype.home_decor,
          bridging_to: subtype.bridging_to,
          source_app: sourceName,
          synced_at: new Date().toISOString()
        }, { onConflict: "slug" });
      
      if (error) {
        result.errors.push(`Subtype ${subtype.slug}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Subtype ${subtype.slug}: ${e}`);
    }
  }
  
  return result;
}

// Handle Streams-style subtypes (with id instead of slug, nested palette)
async function syncSubtypesFromStreams(supabase: any, subtypes: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "subtypes", inserted: 0, updated: 0, errors: [] };
  
  for (const subtype of subtypes) {
    try {
      const slug = subtype.id || subtype.slug;
      const { error } = await supabase
        .from("subtypes")
        .upsert({
          slug,
          name: subtype.name,
          beauty_statement: subtype.beautyStatement || subtype.beauty_statement,
          unique_features: subtype.uniqueFeatures || subtype.unique_features,
          effects: subtype.effects,
          style_dos: subtype.styleDos || subtype.style_dos,
          style_donts: subtype.styleDonts || subtype.style_donts,
          color_combinations: subtype.palette || subtype.color_combinations,
          designers: subtype.designers,
          eras: subtype.eras,
          art_references: subtype.artists || subtype.art_references,
          jewelry_styles: subtype.jewelry_styles,
          home_decor: subtype.home_decor,
          bridging_to: subtype.bridging_to,
          source_app: sourceName,
          synced_at: new Date().toISOString()
        }, { onConflict: "slug" });
      
      if (error) {
        result.errors.push(`Subtype ${slug}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Subtype ${subtype.id || subtype.slug}: ${e}`);
    }
  }
  
  return result;
}

async function syncColors(supabase: any, colors: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "colors", inserted: 0, updated: 0, errors: [] };
  
  for (const color of colors) {
    try {
      // Generate slug from name if not provided
      const slug = color.slug || color.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Handle Streams format with nested hsl object
      const hsl_h = color.hsl_h ?? color.hsl?.h;
      const hsl_s = color.hsl_s ?? color.hsl?.s;
      const hsl_l = color.hsl_l ?? color.hsl?.l;
      
      const { error } = await supabase
        .from("colors")
        .upsert({
          slug,
          name: color.name,
          hex: color.hex,
          category: color.category || "neutral",
          warmth: color.warmth,
          hsl_h,
          hsl_s,
          hsl_l,
          seasons: color.seasons,
          source_app: sourceName,
          synced_at: new Date().toISOString()
        }, { onConflict: "slug" });
      
      if (error) {
        result.errors.push(`Color ${slug}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Color ${color.name}: ${e}`);
    }
  }
  
  return result;
}

async function syncFabrics(supabase: any, fabrics: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "fabrics", inserted: 0, updated: 0, errors: [] };
  
  for (const fabric of fabrics) {
    try {
      const { error } = await supabase
        .from("fabrics")
        .upsert({
          slug: fabric.slug,
          name: fabric.name,
          category: fabric.category || "natural",
          characteristics: fabric.characteristics,
          keywords: fabric.keywords,
          formality_level: fabric.formality_level,
          care_level: fabric.care_level,
          quality_notes: fabric.quality_notes,
          source_app: sourceName,
          synced_at: new Date().toISOString()
        }, { onConflict: "slug" });
      
      if (error) {
        result.errors.push(`Fabric ${fabric.slug}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Fabric ${fabric.slug}: ${e}`);
    }
  }
  
  return result;
}

async function syncArtists(supabase: any, artists: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "artists", inserted: 0, updated: 0, errors: [] };
  
  for (const artist of artists) {
    try {
      const { error } = await supabase
        .from("artists")
        .upsert({
          slug: artist.slug,
          name: artist.name,
          era: artist.era,
          style: artist.style,
          color_characteristics: artist.color_characteristics,
          notable_works: artist.notable_works,
          seasons_affinity: artist.seasons_affinity,
          wikipedia_url: artist.wikipedia_url,
          source_app: sourceName,
          synced_at: new Date().toISOString()
        }, { onConflict: "slug" });
      
      if (error) {
        result.errors.push(`Artist ${artist.slug}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Artist ${artist.slug}: ${e}`);
    }
  }
  
  return result;
}

async function syncTrainingSamples(supabase: any, samples: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "training_samples", inserted: 0, updated: 0, errors: [] };
  
  // Pre-fetch seasons and subtypes for slug lookup
  const { data: seasons } = await supabase.from("seasons").select("id, name");
  const { data: subtypes } = await supabase.from("subtypes").select("id, slug");
  
  const seasonMap = new Map((seasons || []).map((s: any) => [s.name.toLowerCase(), s.id]));
  const subtypeMap = new Map((subtypes || []).map((s: any) => [s.slug, s.id]));
  
  for (const sample of samples) {
    try {
      // Look up season_id from season name/slug
      let seasonId = sample.assigned_season_id;
      if (!seasonId && sample.season_slug) {
        seasonId = seasonMap.get(sample.season_slug.toLowerCase());
      }
      
      // Look up subtype_id from slug
      let subtypeId = sample.assigned_subtype_id;
      if (!subtypeId && sample.subtype_slug) {
        subtypeId = subtypeMap.get(sample.subtype_slug);
      }
      
      const { error } = await supabase
        .from("training_samples")
        .upsert({
          photo_url: sample.photo_url,
          assigned_season_id: seasonId,
          assigned_subtype_id: subtypeId,
          skin_undertone: sample.skin_undertone,
          eye_color: sample.eye_color,
          hair_color: sample.hair_color,
          contrast_level: sample.contrast_level,
          notes: sample.notes,
          labeled_by: sample.labeled_by || sourceName,
          confidence_score: sample.confidence_score
        }, { onConflict: "photo_url" });
      
      if (error) {
        result.errors.push(`Sample ${sample.photo_url}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Sample ${sample.photo_url}: ${e}`);
    }
  }
  
  return result;
}

async function syncSeasons(supabase: any, seasons: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "seasons", inserted: 0, updated: 0, errors: [] };
  
  for (const season of seasons) {
    try {
      const slug = season.slug || season.name.toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase
        .from("seasons")
        .upsert({
          name: season.name,
          description: season.description,
          undertone: season.undertone,
          characteristics: season.characteristics
        }, { onConflict: "name" });
      
      if (error) {
        result.errors.push(`Season ${season.name}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Season ${season.name}: ${e}`);
    }
  }
  
  return result;
}

async function syncPaintings(supabase: any, paintings: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "masterpiece_paintings", inserted: 0, updated: 0, errors: [] };
  
  // Pre-fetch artists for lookup
  const { data: artists } = await supabase.from("artists").select("id, slug, name");
  const artistSlugMap = new Map((artists || []).map((a: any) => [a.slug, a.id]));
  const artistNameMap = new Map((artists || []).map((a: any) => [a.name.toLowerCase(), a.id]));
  
  for (const painting of paintings) {
    try {
      // Look up artist_id
      let artistId = painting.artist_id;
      if (!artistId && painting.artist_slug) {
        artistId = artistSlugMap.get(painting.artist_slug);
      }
      if (!artistId && painting.artist_name) {
        artistId = artistNameMap.get(painting.artist_name.toLowerCase());
      }
      
      const { error } = await supabase
        .from("masterpiece_paintings")
        .upsert({
          title: painting.title,
          artist_id: artistId,
          artist_name: painting.artist_name,
          year: painting.year,
          museum: painting.museum,
          museum_url: painting.museum_url,
          image_url: painting.image_url,
          local_image_path: painting.local_image_path,
          notable_colors: painting.notable_colors,
          color_season_affinity: painting.color_season_affinity,
          body_type_affinity: painting.body_type_affinity,
          why_it_matches: painting.why_it_matches
        }, { onConflict: "title" });
      
      if (error) {
        result.errors.push(`Painting ${painting.title}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Painting ${painting.title}: ${e}`);
    }
  }
  
  return result;
}

async function syncNaturePhotos(supabase: any, photos: any[], sourceName: string): Promise<SyncResult> {
  const result: SyncResult = { table: "nature_photos", inserted: 0, updated: 0, errors: [] };
  
  // Pre-fetch seasons and subtypes for lookup
  const { data: seasons } = await supabase.from("seasons").select("id, name");
  const { data: subtypes } = await supabase.from("subtypes").select("id, slug");
  
  const seasonMap = new Map((seasons || []).map((s: any) => [s.name.toLowerCase(), s.id]));
  const subtypeMap = new Map((subtypes || []).map((s: any) => [s.slug, s.id]));
  
  for (const photo of photos) {
    try {
      // Look up season_id and subtype_id
      let seasonId = photo.season_id;
      if (!seasonId && photo.season_name) {
        seasonId = seasonMap.get(photo.season_name.toLowerCase());
      }
      
      let subtypeId = photo.subtype_id;
      if (!subtypeId && photo.subtype_slug) {
        subtypeId = subtypeMap.get(photo.subtype_slug);
      }
      
      const { error } = await supabase
        .from("nature_photos")
        .upsert({
          title: photo.title,
          category: photo.category || "landscape",
          description: photo.description,
          image_url: photo.image_url,
          season_id: seasonId,
          subtype_id: subtypeId,
          color_palette: photo.color_palette,
          mood: photo.mood
        }, { onConflict: "image_url" });
      
      if (error) {
        result.errors.push(`Photo ${photo.title || photo.image_url}: ${error.message}`);
      } else {
        result.updated++;
      }
    } catch (e) {
      result.errors.push(`Photo ${photo.title || photo.image_url}: ${e}`);
    }
  }
  
  return result;
}
