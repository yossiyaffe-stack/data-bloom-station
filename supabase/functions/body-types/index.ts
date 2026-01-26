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
    const system = url.searchParams.get("system");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    if (slug) {
      const { data, error } = await supabase
        .from("body_types")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let query = supabase.from("body_types").select("*");
    if (system) {
      query = query.eq("system", system);
    }

    const { data, error } = await query.order("name");
    if (error) throw error;

    // Group by system
    const grouped = (data || []).reduce((acc: Record<string, unknown[]>, bt: { system: string }) => {
      const sys = bt.system || "other";
      if (!acc[sys]) acc[sys] = [];
      acc[sys].push(bt);
      return acc;
    }, {});

    return new Response(
      JSON.stringify({ success: true, data, grouped, total: data?.length || 0 }),
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
