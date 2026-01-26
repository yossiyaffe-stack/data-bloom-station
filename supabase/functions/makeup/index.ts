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
    const subtypeId = url.searchParams.get("subtype_id");
    const subtypeSlug = url.searchParams.get("subtype_slug");
    const category = url.searchParams.get("category");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    // Get by subtype slug
    if (subtypeSlug) {
      const { data: subtype } = await supabase
        .from("subtypes")
        .select("id")
        .eq("slug", subtypeSlug)
        .single();
      
      if (!subtype) {
        return new Response(
          JSON.stringify({ success: false, error: "Subtype not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from("makeup_recommendations")
        .select("*, subtypes(id, name, slug)")
        .eq("subtype_id", subtype.id)
        .order("category");
      
      if (error) throw error;

      // Group by category
      const grouped = (data || []).reduce((acc: Record<string, unknown[]>, rec: { category: string }) => {
        if (!acc[rec.category]) acc[rec.category] = [];
        acc[rec.category].push(rec);
        return acc;
      }, {});

      return new Response(
        JSON.stringify({ success: true, data, grouped, total: data?.length || 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get by subtype ID
    if (subtypeId) {
      const { data, error } = await supabase
        .from("makeup_recommendations")
        .select("*, subtypes(id, name, slug)")
        .eq("subtype_id", subtypeId)
        .order("category");
      
      if (error) throw error;

      const grouped = (data || []).reduce((acc: Record<string, unknown[]>, rec: { category: string }) => {
        if (!acc[rec.category]) acc[rec.category] = [];
        acc[rec.category].push(rec);
        return acc;
      }, {});

      return new Response(
        JSON.stringify({ success: true, data, grouped, total: data?.length || 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get by category
    let query = supabase.from("makeup_recommendations").select("*, subtypes(id, name, slug)");
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query.order("category");
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
