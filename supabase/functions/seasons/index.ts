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
    const name = url.searchParams.get("name");
    const undertone = url.searchParams.get("undertone");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    if (name) {
      const { data, error } = await supabase
        .from("seasons")
        .select("*, subtypes(id, name, slug, beauty_statement)")
        .ilike("name", name)
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let query = supabase.from("seasons").select("*, subtypes(id, name, slug, beauty_statement)");
    if (undertone) {
      query = query.eq("undertone", undertone);
    }

    const { data, error } = await query.order("name");
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
