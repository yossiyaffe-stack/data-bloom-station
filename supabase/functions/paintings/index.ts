import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const artistId = url.searchParams.get("artist_id");
    const season = url.searchParams.get("season");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    if (id) {
      const { data, error } = await supabase
        .from("masterpiece_paintings")
        .select("*, artists(*)")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let query = supabase.from("masterpiece_paintings").select("*, artists(*)");
    
    if (artistId) {
      query = query.eq("artist_id", artistId);
    }
    
    if (season) {
      query = query.contains("color_season_affinity", [season]);
    }

    const { data, error } = await query.order("title");
    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data, total: data?.length || 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
