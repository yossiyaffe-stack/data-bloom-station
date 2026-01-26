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
    const slug = url.searchParams.get("slug");
    const id = url.searchParams.get("id");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    if (slug) {
      const { data, error } = await supabase
        .from("subtypes")
        .select(`
          *,
          seasons(name, undertone),
          subtype_colors(*, colors(*)),
          subtype_fabrics(*, fabrics(*)),
          subtype_artists(*, artists(*)),
          subtype_eras(*, historical_eras(*))
        `)
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (id) {
      const { data, error } = await supabase
        .from("subtypes")
        .select(`
          *,
          seasons(name, undertone),
          subtype_colors(*, colors(*)),
          subtype_fabrics(*, fabrics(*)),
          subtype_artists(*, artists(*)),
          subtype_eras(*, historical_eras(*))
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Return all subtypes (summary only)
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, beauty_statement, seasons(name)");
      
      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
