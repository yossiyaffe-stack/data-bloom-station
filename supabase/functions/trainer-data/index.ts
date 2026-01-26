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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const url = new URL(req.url);
    const resource = url.searchParams.get("resource");

    // GET - Read training data
    if (req.method === "GET") {
      if (resource === "samples") {
        const seasonId = url.searchParams.get("season_id");
        const subtypeId = url.searchParams.get("subtype_id");
        
        let query = supabase
          .from("training_samples")
          .select(`
            *,
            seasons(name),
            subtypes(name, slug)
          `)
          .order("created_at", { ascending: false });

        if (seasonId) query = query.eq("assigned_season_id", seasonId);
        if (subtypeId) query = query.eq("assigned_subtype_id", subtypeId);

        const { data, error } = await query;
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, data, total: data?.length || 0 }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "feedback") {
        const { data, error } = await supabase
          .from("ai_feedback")
          .select(`
            *,
            training_samples(*),
            ai_predicted_season:seasons!ai_feedback_ai_predicted_season_id_fkey(name),
            corrected_season:seasons!ai_feedback_corrected_season_id_fkey(name),
            ai_predicted_subtype:subtypes!ai_feedback_ai_predicted_subtype_id_fkey(name),
            corrected_subtype:subtypes!ai_feedback_corrected_subtype_id_fkey(name)
          `)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "paintings") {
        const seasonAffinity = url.searchParams.get("season");
        
        let query = supabase
          .from("masterpiece_paintings")
          .select(`*, artists(name, style)`)
          .order("created_at", { ascending: false });

        if (seasonAffinity) {
          query = query.contains("color_season_affinity", [seasonAffinity]);
        }

        const { data, error } = await query;
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Return stats for trainers
      if (resource === "stats") {
        const [samples, feedback, paintings] = await Promise.all([
          supabase.from("training_samples").select("id", { count: "exact" }),
          supabase.from("ai_feedback").select("id", { count: "exact" }),
          supabase.from("masterpiece_paintings").select("id", { count: "exact" })
        ]);

        return new Response(
          JSON.stringify({
            success: true,
            data: {
              training_samples: samples.count || 0,
              ai_corrections: feedback.count || 0,
              masterpiece_paintings: paintings.count || 0
            }
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "Invalid resource" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST - Create training data
    if (req.method === "POST") {
      const body = await req.json();

      if (resource === "sample") {
        const { data, error } = await supabase
          .from("training_samples")
          .insert(body)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "feedback") {
        const { data, error } = await supabase
          .from("ai_feedback")
          .insert(body)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "painting") {
        const { data, error } = await supabase
          .from("masterpiece_paintings")
          .insert(body)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update methodology data (colors, subtypes, etc.)
      if (resource === "color") {
        const { data, error } = await supabase
          .from("colors")
          .upsert(body, { onConflict: "slug" })
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "subtype") {
        const { data, error } = await supabase
          .from("subtypes")
          .upsert(body, { onConflict: "slug" })
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "Invalid resource" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // PUT - Update training data
    if (req.method === "PUT") {
      const body = await req.json();
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "ID required for update" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const table = resource === "sample" ? "training_samples"
        : resource === "feedback" ? "ai_feedback"
        : resource === "painting" ? "masterpiece_paintings"
        : resource === "color" ? "colors"
        : resource === "subtype" ? "subtypes"
        : null;

      if (!table) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid resource" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from(table)
        .update(body)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DELETE
    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "ID required for delete" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const table = resource === "sample" ? "training_samples"
        : resource === "feedback" ? "ai_feedback"
        : resource === "painting" ? "masterpiece_paintings"
        : null;

      if (!table) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid resource" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
