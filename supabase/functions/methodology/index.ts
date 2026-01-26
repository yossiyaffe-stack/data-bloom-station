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

    // Fetch all methodology data
    const [
      { data: seasons },
      { data: subtypes },
      { data: colors },
      { data: fabrics },
      { data: artists },
      { data: eras },
      { data: metadata }
    ] = await Promise.all([
      supabase.from("seasons").select("*"),
      supabase.from("subtypes").select("*, seasons(name)"),
      supabase.from("colors").select("*"),
      supabase.from("fabrics").select("*"),
      supabase.from("artists").select("*"),
      supabase.from("historical_eras").select("*"),
      supabase.from("methodology_metadata").select("*")
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          seasons,
          subtypes,
          colors,
          fabrics,
          artists,
          eras,
          metadata: Object.fromEntries(
            (metadata || []).map((m: { key: string; value: unknown }) => [m.key, m.value])
          )
        },
        stats: {
          subtypes: subtypes?.length || 0,
          colors: colors?.length || 0,
          fabrics: fabrics?.length || 0,
          artists: artists?.length || 0,
          eras: eras?.length || 0
        }
      }),
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
