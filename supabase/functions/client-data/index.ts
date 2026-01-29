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
    // Require authentication for all operations
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: "User ID not found in token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const resource = url.searchParams.get("resource");

    // GET - Read data
    if (req.method === "GET") {
      const externalId = url.searchParams.get("external_id");
      const profileId = url.searchParams.get("profile_id");

      if (resource === "profile" && externalId) {
        const { data, error } = await supabase
          .from("client_profiles")
          .select(`
            *,
            seasons(name, undertone),
            subtypes(name, slug, beauty_statement)
          `)
          .eq("external_id", externalId)
          .maybeSingle();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "photos" && profileId) {
        const { data, error } = await supabase
          .from("photo_analyses")
          .select("*")
          .eq("client_profile_id", profileId)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "palettes" && profileId) {
        const { data, error } = await supabase
          .from("saved_palettes")
          .select("*")
          .eq("client_profile_id", profileId);
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "sessions" && profileId) {
        const { data, error } = await supabase
          .from("session_history")
          .select("*")
          .eq("client_profile_id", profileId)
          .order("session_date", { ascending: false });
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "Invalid resource or missing parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST - Create data
    if (req.method === "POST") {
      const body = await req.json();

      if (resource === "profile") {
        // Ensure owner_id is set to the authenticated user
        const profileData = { ...body, owner_id: userId };
        const { data, error } = await supabase
          .from("client_profiles")
          .upsert(profileData, { onConflict: "external_id" })
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "photo") {
        const photoData = { ...body, owner_id: userId };
        const { data, error } = await supabase
          .from("photo_analyses")
          .insert(photoData)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "palette") {
        const paletteData = { ...body, owner_id: userId };
        const { data, error } = await supabase
          .from("saved_palettes")
          .insert(paletteData)
          .select()
          .single();
        
        if (error) throw error;
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (resource === "session") {
        const sessionData = { ...body, owner_id: userId };
        const { data, error } = await supabase
          .from("session_history")
          .insert(sessionData)
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

    // PUT - Update data
    if (req.method === "PUT") {
      const body = await req.json();
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "ID required for update" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const table = resource === "profile" ? "client_profiles" 
        : resource === "photo" ? "photo_analyses"
        : resource === "palette" ? "saved_palettes"
        : resource === "session" ? "session_history"
        : null;

      if (!table) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid resource" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // RLS will enforce ownership check
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

      const table = resource === "profile" ? "client_profiles" 
        : resource === "photo" ? "photo_analyses"
        : resource === "palette" ? "saved_palettes"
        : resource === "session" ? "session_history"
        : null;

      if (!table) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid resource" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // RLS will enforce ownership check
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
