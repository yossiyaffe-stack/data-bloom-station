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

    // GET - Read lifestyle data
    if (req.method === "GET") {
      // Occasions
      if (resource === "occasions") {
        const slug = url.searchParams.get("slug");
        const category = url.searchParams.get("category");
        
        let query = supabase.from("occasions").select("*").order("name");
        if (slug) query = query.eq("slug", slug);
        if (category) query = query.eq("category", category);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Occasion Outfits by Subtype
      if (resource === "occasion-outfits") {
        const subtypeId = url.searchParams.get("subtype_id");
        const occasionId = url.searchParams.get("occasion_id");
        
        let query = supabase
          .from("subtype_occasion_outfits")
          .select(`*, subtypes(name, slug), occasions(name, slug, category)`)
          .order("created_at", { ascending: false });
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        if (occasionId) query = query.eq("occasion_id", occasionId);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Style Icons
      if (resource === "style-icons") {
        const slug = url.searchParams.get("slug");
        const era = url.searchParams.get("era");
        
        let query = supabase.from("style_icons").select("*").order("name");
        if (slug) query = query.eq("slug", slug);
        if (era) query = query.eq("era", era);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Subtype Style Icons
      if (resource === "subtype-style-icons") {
        const subtypeId = url.searchParams.get("subtype_id");
        
        let query = supabase
          .from("subtype_style_icons")
          .select(`*, subtypes(name, slug), style_icons(*)`)
          .order("id");
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Face Shapes
      if (resource === "face-shapes") {
        const slug = url.searchParams.get("slug");
        
        let query = supabase.from("face_shapes").select("*").order("name");
        if (slug) query = query.eq("slug", slug);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Face Shape Recommendations
      if (resource === "face-shape-recommendations") {
        const faceShapeId = url.searchParams.get("face_shape_id");
        const category = url.searchParams.get("category");
        
        let query = supabase
          .from("face_shape_recommendations")
          .select(`*, face_shapes(name, slug)`)
          .order("category");
        
        if (faceShapeId) query = query.eq("face_shape_id", faceShapeId);
        if (category) query = query.eq("category", category);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Era Photos
      if (resource === "era-photos") {
        const eraId = url.searchParams.get("era_id");
        
        let query = supabase
          .from("era_photos")
          .select(`*, historical_eras(name, slug, period)`)
          .order("year_approximate");
        
        if (eraId) query = query.eq("era_id", eraId);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Cultural Clothing
      if (resource === "cultural-clothing") {
        const slug = url.searchParams.get("slug");
        const culture = url.searchParams.get("culture");
        const region = url.searchParams.get("region");
        
        let query = supabase.from("cultural_clothing").select("*").order("name");
        if (slug) query = query.eq("slug", slug);
        if (culture) query = query.ilike("culture", `%${culture}%`);
        if (region) query = query.ilike("region", `%${region}%`);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Nature Photos
      if (resource === "nature-photos") {
        const seasonId = url.searchParams.get("season_id");
        const subtypeId = url.searchParams.get("subtype_id");
        const category = url.searchParams.get("category");
        
        let query = supabase
          .from("nature_photos")
          .select(`*, seasons(name), subtypes(name, slug)`)
          .order("created_at", { ascending: false });
        
        if (seasonId) query = query.eq("season_id", seasonId);
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        if (category) query = query.eq("category", category);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Interior Designs
      if (resource === "interiors") {
        const subtypeId = url.searchParams.get("subtype_id");
        const roomType = url.searchParams.get("room_type");
        
        let query = supabase
          .from("interior_designs")
          .select(`*, subtypes(name, slug)`)
          .order("created_at", { ascending: false });
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        if (roomType) query = query.eq("room_type", roomType);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Accent Colors
      if (resource === "accent-colors") {
        const subtypeId = url.searchParams.get("subtype_id");
        
        let query = supabase
          .from("subtype_accent_colors")
          .select(`*, subtypes(name, slug)`)
          .order("color_name");
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Outfit Links
      if (resource === "outfit-links") {
        const subtypeId = url.searchParams.get("subtype_id");
        const occasionId = url.searchParams.get("occasion_id");
        const sizeCategory = url.searchParams.get("size_category");
        const sizeValue = url.searchParams.get("size_value");
        
        let query = supabase
          .from("outfit_links")
          .select(`*, subtypes(name, slug), occasions(name, slug), body_types(name, slug)`)
          .eq("is_active", true)
          .order("created_at", { ascending: false });
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        if (occasionId) query = query.eq("occasion_id", occasionId);
        if (sizeCategory) query = query.eq("size_category", sizeCategory);
        if (sizeValue) query = query.eq("size_value", sizeValue);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Alternate Seasons
      if (resource === "alternate-seasons") {
        const primarySubtypeId = url.searchParams.get("primary_subtype_id");
        
        let query = supabase
          .from("alternate_seasons")
          .select(`
            *,
            primary_subtype:subtypes!alternate_seasons_primary_subtype_id_fkey(name, slug),
            alternate_subtype:subtypes!alternate_seasons_alternate_subtype_id_fkey(name, slug)
          `)
          .order("overlap_percentage", { ascending: false });
        
        if (primarySubtypeId) query = query.eq("primary_subtype_id", primarySubtypeId);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Seasonal Dressing Guides
      if (resource === "dressing-guides") {
        const subtypeId = url.searchParams.get("subtype_id");
        const weatherSeason = url.searchParams.get("weather_season");
        
        let query = supabase
          .from("seasonal_dressing_guides")
          .select(`*, subtypes(name, slug)`)
          .order("weather_season");
        
        if (subtypeId) query = query.eq("subtype_id", subtypeId);
        if (weatherSeason) query = query.eq("weather_season", weatherSeason);
        
        const { data, error } = await query;
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Stats for all lifestyle tables
      if (resource === "stats") {
        const [occasions, outfits, icons, faceShapes, eraPhotos, cultural, nature, interiors, accents, links, alternates, guides] = await Promise.all([
          supabase.from("occasions").select("id", { count: "exact" }),
          supabase.from("subtype_occasion_outfits").select("id", { count: "exact" }),
          supabase.from("style_icons").select("id", { count: "exact" }),
          supabase.from("face_shapes").select("id", { count: "exact" }),
          supabase.from("era_photos").select("id", { count: "exact" }),
          supabase.from("cultural_clothing").select("id", { count: "exact" }),
          supabase.from("nature_photos").select("id", { count: "exact" }),
          supabase.from("interior_designs").select("id", { count: "exact" }),
          supabase.from("subtype_accent_colors").select("id", { count: "exact" }),
          supabase.from("outfit_links").select("id", { count: "exact" }),
          supabase.from("alternate_seasons").select("id", { count: "exact" }),
          supabase.from("seasonal_dressing_guides").select("id", { count: "exact" }),
        ]);

        return new Response(JSON.stringify({
          success: true,
          data: {
            occasions: occasions.count || 0,
            occasion_outfits: outfits.count || 0,
            style_icons: icons.count || 0,
            face_shapes: faceShapes.count || 0,
            era_photos: eraPhotos.count || 0,
            cultural_clothing: cultural.count || 0,
            nature_photos: nature.count || 0,
            interior_designs: interiors.count || 0,
            accent_colors: accents.count || 0,
            outfit_links: links.count || 0,
            alternate_seasons: alternates.count || 0,
            dressing_guides: guides.count || 0,
          }
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(
        JSON.stringify({ success: false, error: "Invalid resource" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST - Create lifestyle data
    if (req.method === "POST") {
      const body = await req.json();

      const tableMap: Record<string, string> = {
        "occasion": "occasions",
        "occasion-outfit": "subtype_occasion_outfits",
        "style-icon": "style_icons",
        "subtype-style-icon": "subtype_style_icons",
        "face-shape": "face_shapes",
        "face-shape-recommendation": "face_shape_recommendations",
        "era-photo": "era_photos",
        "cultural-clothing": "cultural_clothing",
        "nature-photo": "nature_photos",
        "interior": "interior_designs",
        "accent-color": "subtype_accent_colors",
        "outfit-link": "outfit_links",
        "alternate-season": "alternate_seasons",
        "dressing-guide": "seasonal_dressing_guides",
      };

      const table = tableMap[resource || ""];
      if (!table) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid resource" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Use upsert for tables with unique constraints
      const upsertTables = ["occasions", "style_icons", "face_shapes", "cultural_clothing"];
      const uniqueKeyMap: Record<string, string> = {
        "occasions": "slug",
        "style_icons": "slug",
        "face_shapes": "slug",
        "cultural_clothing": "slug",
      };

      if (upsertTables.includes(table)) {
        const { data, error } = await supabase
          .from(table)
          .upsert(body, { onConflict: uniqueKeyMap[table] })
          .select()
          .single();
        
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const { data, error } = await supabase
        .from(table)
        .insert(body)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // PUT - Update lifestyle data
    if (req.method === "PUT") {
      const body = await req.json();
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "ID required for update" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const tableMap: Record<string, string> = {
        "occasion": "occasions",
        "occasion-outfit": "subtype_occasion_outfits",
        "style-icon": "style_icons",
        "subtype-style-icon": "subtype_style_icons",
        "face-shape": "face_shapes",
        "face-shape-recommendation": "face_shape_recommendations",
        "era-photo": "era_photos",
        "cultural-clothing": "cultural_clothing",
        "nature-photo": "nature_photos",
        "interior": "interior_designs",
        "accent-color": "subtype_accent_colors",
        "outfit-link": "outfit_links",
        "alternate-season": "alternate_seasons",
        "dressing-guide": "seasonal_dressing_guides",
      };

      const table = tableMap[resource || ""];
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
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
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

      const tableMap: Record<string, string> = {
        "occasion": "occasions",
        "occasion-outfit": "subtype_occasion_outfits",
        "style-icon": "style_icons",
        "subtype-style-icon": "subtype_style_icons",
        "face-shape": "face_shapes",
        "face-shape-recommendation": "face_shape_recommendations",
        "era-photo": "era_photos",
        "cultural-clothing": "cultural_clothing",
        "nature-photo": "nature_photos",
        "interior": "interior_designs",
        "accent-color": "subtype_accent_colors",
        "outfit-link": "outfit_links",
        "alternate-season": "alternate_seasons",
        "dressing-guide": "seasonal_dressing_guides",
      };

      const table = tableMap[resource || ""];
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
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
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
