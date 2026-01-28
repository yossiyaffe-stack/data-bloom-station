export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_feedback: {
        Row: {
          ai_predicted_season_id: string | null
          ai_predicted_subtype_id: string | null
          corrected_by: string | null
          corrected_season_id: string | null
          corrected_subtype_id: string | null
          correction_reason: string | null
          created_at: string | null
          id: string
          photo_analysis_id: string | null
          training_sample_id: string | null
        }
        Insert: {
          ai_predicted_season_id?: string | null
          ai_predicted_subtype_id?: string | null
          corrected_by?: string | null
          corrected_season_id?: string | null
          corrected_subtype_id?: string | null
          correction_reason?: string | null
          created_at?: string | null
          id?: string
          photo_analysis_id?: string | null
          training_sample_id?: string | null
        }
        Update: {
          ai_predicted_season_id?: string | null
          ai_predicted_subtype_id?: string | null
          corrected_by?: string | null
          corrected_season_id?: string | null
          corrected_subtype_id?: string | null
          correction_reason?: string | null
          created_at?: string | null
          id?: string
          photo_analysis_id?: string | null
          training_sample_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feedback_ai_predicted_season_id_fkey"
            columns: ["ai_predicted_season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_feedback_ai_predicted_subtype_id_fkey"
            columns: ["ai_predicted_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_feedback_corrected_season_id_fkey"
            columns: ["corrected_season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_feedback_corrected_subtype_id_fkey"
            columns: ["corrected_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_feedback_photo_analysis_id_fkey"
            columns: ["photo_analysis_id"]
            isOneToOne: false
            referencedRelation: "photo_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_feedback_training_sample_id_fkey"
            columns: ["training_sample_id"]
            isOneToOne: false
            referencedRelation: "training_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      alternate_seasons: {
        Row: {
          alternate_subtype_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          overlap_percentage: number | null
          primary_subtype_id: string | null
          shared_characteristics: Json | null
          transition_tips: string | null
          when_to_use_alternate: string | null
        }
        Insert: {
          alternate_subtype_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          overlap_percentage?: number | null
          primary_subtype_id?: string | null
          shared_characteristics?: Json | null
          transition_tips?: string | null
          when_to_use_alternate?: string | null
        }
        Update: {
          alternate_subtype_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          overlap_percentage?: number | null
          primary_subtype_id?: string | null
          shared_characteristics?: Json | null
          transition_tips?: string | null
          when_to_use_alternate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alternate_seasons_alternate_subtype_id_fkey"
            columns: ["alternate_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alternate_seasons_primary_subtype_id_fkey"
            columns: ["primary_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          color_characteristics: string | null
          created_at: string | null
          era: string | null
          id: string
          name: string
          notable_works: Json | null
          seasons_affinity: Json | null
          slug: string
          source_app: string | null
          style: string | null
          synced_at: string | null
          wikipedia_url: string | null
        }
        Insert: {
          color_characteristics?: string | null
          created_at?: string | null
          era?: string | null
          id?: string
          name: string
          notable_works?: Json | null
          seasons_affinity?: Json | null
          slug: string
          source_app?: string | null
          style?: string | null
          synced_at?: string | null
          wikipedia_url?: string | null
        }
        Update: {
          color_characteristics?: string | null
          created_at?: string | null
          era?: string | null
          id?: string
          name?: string
          notable_works?: Json | null
          seasons_affinity?: Json | null
          slug?: string
          source_app?: string | null
          style?: string | null
          synced_at?: string | null
          wikipedia_url?: string | null
        }
        Relationships: []
      }
      body_types: {
        Row: {
          characteristics: Json | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          source_app: string | null
          style_recommendations: Json | null
          synced_at: string | null
          system: string | null
        }
        Insert: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          source_app?: string | null
          style_recommendations?: Json | null
          synced_at?: string | null
          system?: string | null
        }
        Update: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          source_app?: string | null
          style_recommendations?: Json | null
          synced_at?: string | null
          system?: string | null
        }
        Relationships: []
      }
      client_profiles: {
        Row: {
          analysis_notes: string | null
          assigned_season_id: string | null
          assigned_subtype_id: string | null
          created_at: string | null
          email: string | null
          external_id: string | null
          id: string
          name: string | null
          quiz_answers: Json | null
          updated_at: string | null
        }
        Insert: {
          analysis_notes?: string | null
          assigned_season_id?: string | null
          assigned_subtype_id?: string | null
          created_at?: string | null
          email?: string | null
          external_id?: string | null
          id?: string
          name?: string | null
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Update: {
          analysis_notes?: string | null
          assigned_season_id?: string | null
          assigned_subtype_id?: string | null
          created_at?: string | null
          email?: string | null
          external_id?: string | null
          id?: string
          name?: string | null
          quiz_answers?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_assigned_season_id_fkey"
            columns: ["assigned_season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_profiles_assigned_subtype_id_fkey"
            columns: ["assigned_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      colors: {
        Row: {
          category: string
          created_at: string | null
          hex: string
          hsl_h: number | null
          hsl_l: number | null
          hsl_s: number | null
          id: string
          name: string
          seasons: Json | null
          slug: string
          source_app: string | null
          synced_at: string | null
          warmth: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          hex: string
          hsl_h?: number | null
          hsl_l?: number | null
          hsl_s?: number | null
          id?: string
          name: string
          seasons?: Json | null
          slug: string
          source_app?: string | null
          synced_at?: string | null
          warmth?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          hex?: string
          hsl_h?: number | null
          hsl_l?: number | null
          hsl_s?: number | null
          id?: string
          name?: string
          seasons?: Json | null
          slug?: string
          source_app?: string | null
          synced_at?: string | null
          warmth?: string | null
        }
        Relationships: []
      }
      cultural_clothing: {
        Row: {
          created_at: string | null
          culture: string | null
          description: string | null
          fabrics_used: Json | null
          id: string
          image_url: string | null
          name: string
          occasions_worn: Json | null
          region: string | null
          season_affinity: Json | null
          slug: string
          time_period: string | null
          traditional_colors: Json | null
        }
        Insert: {
          created_at?: string | null
          culture?: string | null
          description?: string | null
          fabrics_used?: Json | null
          id?: string
          image_url?: string | null
          name: string
          occasions_worn?: Json | null
          region?: string | null
          season_affinity?: Json | null
          slug: string
          time_period?: string | null
          traditional_colors?: Json | null
        }
        Update: {
          created_at?: string | null
          culture?: string | null
          description?: string | null
          fabrics_used?: Json | null
          id?: string
          image_url?: string | null
          name?: string
          occasions_worn?: Json | null
          region?: string | null
          season_affinity?: Json | null
          slug?: string
          time_period?: string | null
          traditional_colors?: Json | null
        }
        Relationships: []
      }
      designers: {
        Row: {
          brand_style: string | null
          created_at: string | null
          id: string
          name: string
          price_tier: string | null
          seasons_affinity: Json | null
          signature_elements: Json | null
          slug: string
          source_app: string | null
          synced_at: string | null
          website_url: string | null
        }
        Insert: {
          brand_style?: string | null
          created_at?: string | null
          id?: string
          name: string
          price_tier?: string | null
          seasons_affinity?: Json | null
          signature_elements?: Json | null
          slug: string
          source_app?: string | null
          synced_at?: string | null
          website_url?: string | null
        }
        Update: {
          brand_style?: string | null
          created_at?: string | null
          id?: string
          name?: string
          price_tier?: string | null
          seasons_affinity?: Json | null
          signature_elements?: Json | null
          slug?: string
          source_app?: string | null
          synced_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      era_photos: {
        Row: {
          created_at: string | null
          description: string | null
          era_id: string | null
          id: string
          image_url: string | null
          notable_style_elements: Json | null
          source: string | null
          title: string | null
          year_approximate: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          era_id?: string | null
          id?: string
          image_url?: string | null
          notable_style_elements?: Json | null
          source?: string | null
          title?: string | null
          year_approximate?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          era_id?: string | null
          id?: string
          image_url?: string | null
          notable_style_elements?: Json | null
          source?: string | null
          title?: string | null
          year_approximate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "era_photos_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "historical_eras"
            referencedColumns: ["id"]
          },
        ]
      }
      fabrics: {
        Row: {
          care_level: string | null
          category: string
          characteristics: Json | null
          created_at: string | null
          formality_level: string | null
          id: string
          keywords: Json | null
          name: string
          quality_notes: string | null
          slug: string
          source_app: string | null
          synced_at: string | null
        }
        Insert: {
          care_level?: string | null
          category: string
          characteristics?: Json | null
          created_at?: string | null
          formality_level?: string | null
          id?: string
          keywords?: Json | null
          name: string
          quality_notes?: string | null
          slug: string
          source_app?: string | null
          synced_at?: string | null
        }
        Update: {
          care_level?: string | null
          category?: string
          characteristics?: Json | null
          created_at?: string | null
          formality_level?: string | null
          id?: string
          keywords?: Json | null
          name?: string
          quality_notes?: string | null
          slug?: string
          source_app?: string | null
          synced_at?: string | null
        }
        Relationships: []
      }
      face_shape_recommendations: {
        Row: {
          avoid: string | null
          category: string
          created_at: string | null
          face_shape_id: string | null
          id: string
          image_url: string | null
          item_type: string | null
          recommendation: string
          why_it_works: string | null
        }
        Insert: {
          avoid?: string | null
          category: string
          created_at?: string | null
          face_shape_id?: string | null
          id?: string
          image_url?: string | null
          item_type?: string | null
          recommendation: string
          why_it_works?: string | null
        }
        Update: {
          avoid?: string | null
          category?: string
          created_at?: string | null
          face_shape_id?: string | null
          id?: string
          image_url?: string | null
          item_type?: string | null
          recommendation?: string
          why_it_works?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "face_shape_recommendations_face_shape_id_fkey"
            columns: ["face_shape_id"]
            isOneToOne: false
            referencedRelation: "face_shapes"
            referencedColumns: ["id"]
          },
        ]
      }
      face_shapes: {
        Row: {
          characteristics: Json | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          visual_traits: Json | null
        }
        Insert: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          visual_traits?: Json | null
        }
        Update: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          visual_traits?: Json | null
        }
        Relationships: []
      }
      gemstones: {
        Row: {
          color_hex: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          seasons: Json | null
          slug: string
          source_app: string | null
          symbolism: string | null
          synced_at: string | null
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          seasons?: Json | null
          slug: string
          source_app?: string | null
          symbolism?: string | null
          synced_at?: string | null
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          seasons?: Json | null
          slug?: string
          source_app?: string | null
          symbolism?: string | null
          synced_at?: string | null
        }
        Relationships: []
      }
      historical_eras: {
        Row: {
          color_palette_notes: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          period: string | null
          seasons_affinity: Json | null
          slug: string
          source_app: string | null
          style_characteristics: Json | null
          synced_at: string | null
        }
        Insert: {
          color_palette_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          period?: string | null
          seasons_affinity?: Json | null
          slug: string
          source_app?: string | null
          style_characteristics?: Json | null
          synced_at?: string | null
        }
        Update: {
          color_palette_notes?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          period?: string | null
          seasons_affinity?: Json | null
          slug?: string
          source_app?: string | null
          style_characteristics?: Json | null
          synced_at?: string | null
        }
        Relationships: []
      }
      interior_designs: {
        Row: {
          accent_ideas: Json | null
          color_palette: Json | null
          created_at: string | null
          description: string | null
          fabric_suggestions: Json | null
          furniture_styles: Json | null
          id: string
          image_url: string | null
          room_type: string | null
          style_name: string | null
          subtype_id: string | null
          title: string | null
        }
        Insert: {
          accent_ideas?: Json | null
          color_palette?: Json | null
          created_at?: string | null
          description?: string | null
          fabric_suggestions?: Json | null
          furniture_styles?: Json | null
          id?: string
          image_url?: string | null
          room_type?: string | null
          style_name?: string | null
          subtype_id?: string | null
          title?: string | null
        }
        Update: {
          accent_ideas?: Json | null
          color_palette?: Json | null
          created_at?: string | null
          description?: string | null
          fabric_suggestions?: Json | null
          furniture_styles?: Json | null
          id?: string
          image_url?: string | null
          room_type?: string | null
          style_name?: string | null
          subtype_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interior_designs_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      makeup_recommendations: {
        Row: {
          category: string
          color_hex: string | null
          color_name: string | null
          created_at: string | null
          finish: string | null
          id: string
          intensity: string | null
          is_primary: boolean | null
          notes: string | null
          product_type: string | null
          subtype_id: string | null
        }
        Insert: {
          category: string
          color_hex?: string | null
          color_name?: string | null
          created_at?: string | null
          finish?: string | null
          id?: string
          intensity?: string | null
          is_primary?: boolean | null
          notes?: string | null
          product_type?: string | null
          subtype_id?: string | null
        }
        Update: {
          category?: string
          color_hex?: string | null
          color_name?: string | null
          created_at?: string | null
          finish?: string | null
          id?: string
          intensity?: string | null
          is_primary?: boolean | null
          notes?: string | null
          product_type?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "makeup_recommendations_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      masterpiece_paintings: {
        Row: {
          artist_id: string | null
          artist_name: string | null
          body_type_affinity: Json | null
          color_season_affinity: Json | null
          created_at: string | null
          id: string
          image_url: string | null
          local_image_path: string | null
          museum: string | null
          museum_url: string | null
          notable_colors: Json | null
          title: string
          why_it_matches: string | null
          year: string | null
        }
        Insert: {
          artist_id?: string | null
          artist_name?: string | null
          body_type_affinity?: Json | null
          color_season_affinity?: Json | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          local_image_path?: string | null
          museum?: string | null
          museum_url?: string | null
          notable_colors?: Json | null
          title: string
          why_it_matches?: string | null
          year?: string | null
        }
        Update: {
          artist_id?: string | null
          artist_name?: string | null
          body_type_affinity?: Json | null
          color_season_affinity?: Json | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          local_image_path?: string | null
          museum?: string | null
          museum_url?: string | null
          notable_colors?: Json | null
          title?: string
          why_it_matches?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masterpiece_paintings_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      metals: {
        Row: {
          color_hex: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price_tier: string | null
          seasons: Json | null
          slug: string
          source_app: string | null
          synced_at: string | null
          warmth: string | null
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price_tier?: string | null
          seasons?: Json | null
          slug: string
          source_app?: string | null
          synced_at?: string | null
          warmth?: string | null
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price_tier?: string | null
          seasons?: Json | null
          slug?: string
          source_app?: string | null
          synced_at?: string | null
          warmth?: string | null
        }
        Relationships: []
      }
      methodology_metadata: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      nature_photos: {
        Row: {
          category: string
          color_palette: Json | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          mood: string | null
          season_id: string | null
          subtype_id: string | null
          title: string | null
        }
        Insert: {
          category: string
          color_palette?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          mood?: string | null
          season_id?: string | null
          subtype_id?: string | null
          title?: string | null
        }
        Update: {
          category?: string
          color_palette?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          mood?: string | null
          season_id?: string | null
          subtype_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nature_photos_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nature_photos_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      occasions: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          formality_level: string | null
          id: string
          name: string
          slug: string
          styling_principles: Json | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          formality_level?: string | null
          id?: string
          name: string
          slug: string
          styling_principles?: Json | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          formality_level?: string | null
          id?: string
          name?: string
          slug?: string
          styling_principles?: Json | null
        }
        Relationships: []
      }
      outfit_links: {
        Row: {
          body_type_id: string | null
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          occasion_id: string | null
          price_tier: string | null
          product_name: string | null
          product_url: string | null
          retailer: string | null
          size_category: string | null
          size_value: string | null
          subtype_id: string | null
        }
        Insert: {
          body_type_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          occasion_id?: string | null
          price_tier?: string | null
          product_name?: string | null
          product_url?: string | null
          retailer?: string | null
          size_category?: string | null
          size_value?: string | null
          subtype_id?: string | null
        }
        Update: {
          body_type_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          occasion_id?: string | null
          price_tier?: string | null
          product_name?: string | null
          product_url?: string | null
          retailer?: string | null
          size_category?: string | null
          size_value?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outfit_links_body_type_id_fkey"
            columns: ["body_type_id"]
            isOneToOne: false
            referencedRelation: "body_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_links_occasion_id_fkey"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_links_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      photo_analyses: {
        Row: {
          ai_prediction: Json | null
          client_profile_id: string | null
          contrast_level: string | null
          created_at: string | null
          extracted_features: Json | null
          eye_color: string | null
          hair_color: string | null
          id: string
          photo_url: string | null
          skin_undertone: string | null
        }
        Insert: {
          ai_prediction?: Json | null
          client_profile_id?: string | null
          contrast_level?: string | null
          created_at?: string | null
          extracted_features?: Json | null
          eye_color?: string | null
          hair_color?: string | null
          id?: string
          photo_url?: string | null
          skin_undertone?: string | null
        }
        Update: {
          ai_prediction?: Json | null
          client_profile_id?: string | null
          contrast_level?: string | null
          created_at?: string | null
          extracted_features?: Json | null
          eye_color?: string | null
          hair_color?: string | null
          id?: string
          photo_url?: string | null
          skin_undertone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photo_analyses_client_profile_id_fkey"
            columns: ["client_profile_id"]
            isOneToOne: false
            referencedRelation: "client_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prints: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          keywords: Json | null
          name: string
          slug: string
          source_app: string | null
          synced_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: Json | null
          name: string
          slug: string
          source_app?: string | null
          synced_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: Json | null
          name?: string
          slug?: string
          source_app?: string | null
          synced_at?: string | null
        }
        Relationships: []
      }
      saved_palettes: {
        Row: {
          client_profile_id: string | null
          color_ids: string[] | null
          created_at: string | null
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          client_profile_id?: string | null
          color_ids?: string[] | null
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          client_profile_id?: string | null
          color_ids?: string[] | null
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_palettes_client_profile_id_fkey"
            columns: ["client_profile_id"]
            isOneToOne: false
            referencedRelation: "client_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      season_phases: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number
          id: string
          name: string
          season_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          name: string
          season_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "season_phases_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      seasonal_dressing_guides: {
        Row: {
          avoid: Json | null
          color_emphasis: Json | null
          created_at: string | null
          dressing_tips: Json | null
          fabric_weights: Json | null
          id: string
          key_pieces: Json | null
          layering_advice: string | null
          subtype_id: string | null
          weather_season: string
        }
        Insert: {
          avoid?: Json | null
          color_emphasis?: Json | null
          created_at?: string | null
          dressing_tips?: Json | null
          fabric_weights?: Json | null
          id?: string
          key_pieces?: Json | null
          layering_advice?: string | null
          subtype_id?: string | null
          weather_season: string
        }
        Update: {
          avoid?: Json | null
          color_emphasis?: Json | null
          created_at?: string | null
          dressing_tips?: Json | null
          fabric_weights?: Json | null
          id?: string
          key_pieces?: Json | null
          layering_advice?: string | null
          subtype_id?: string | null
          weather_season?: string
        }
        Relationships: [
          {
            foreignKeyName: "seasonal_dressing_guides_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          characteristics: Json | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          undertone: string | null
          updated_at: string | null
        }
        Insert: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          undertone?: string | null
          updated_at?: string | null
        }
        Update: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          undertone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sephirot_colors: {
        Row: {
          associated_body_part: string | null
          associated_seasons: Json | null
          attributes: Json | null
          color_hex: string
          created_at: string | null
          hebrew_name: string | null
          id: string
          meaning: string | null
          name: string
          position_on_tree: number | null
          slug: string
        }
        Insert: {
          associated_body_part?: string | null
          associated_seasons?: Json | null
          attributes?: Json | null
          color_hex: string
          created_at?: string | null
          hebrew_name?: string | null
          id?: string
          meaning?: string | null
          name: string
          position_on_tree?: number | null
          slug: string
        }
        Update: {
          associated_body_part?: string | null
          associated_seasons?: Json | null
          attributes?: Json | null
          color_hex?: string
          created_at?: string | null
          hebrew_name?: string | null
          id?: string
          meaning?: string | null
          name?: string
          position_on_tree?: number | null
          slug?: string
        }
        Relationships: []
      }
      session_history: {
        Row: {
          client_profile_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          recommendations: Json | null
          session_date: string | null
          session_type: string | null
          trainer_notes: string | null
        }
        Insert: {
          client_profile_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recommendations?: Json | null
          session_date?: string | null
          session_type?: string | null
          trainer_notes?: string | null
        }
        Update: {
          client_profile_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recommendations?: Json | null
          session_date?: string | null
          session_type?: string | null
          trainer_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_history_client_profile_id_fkey"
            columns: ["client_profile_id"]
            isOneToOne: false
            referencedRelation: "client_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      style_icons: {
        Row: {
          birth_year: string | null
          created_at: string | null
          era: string | null
          id: string
          image_url: string | null
          is_celebrity: boolean | null
          name: string
          nationality: string | null
          profession: string | null
          slug: string
          style_signature: string | null
          why_they_match: string | null
          wikipedia_url: string | null
        }
        Insert: {
          birth_year?: string | null
          created_at?: string | null
          era?: string | null
          id?: string
          image_url?: string | null
          is_celebrity?: boolean | null
          name: string
          nationality?: string | null
          profession?: string | null
          slug: string
          style_signature?: string | null
          why_they_match?: string | null
          wikipedia_url?: string | null
        }
        Update: {
          birth_year?: string | null
          created_at?: string | null
          era?: string | null
          id?: string
          image_url?: string | null
          is_celebrity?: boolean | null
          name?: string
          nationality?: string | null
          profession?: string | null
          slug?: string
          style_signature?: string | null
          why_they_match?: string | null
          wikipedia_url?: string | null
        }
        Relationships: []
      }
      subtype_accent_colors: {
        Row: {
          best_worn_as: string | null
          color_hex: string
          color_name: string
          created_at: string | null
          id: string
          is_signature: boolean | null
          subtype_id: string | null
          usage_notes: string | null
        }
        Insert: {
          best_worn_as?: string | null
          color_hex: string
          color_name: string
          created_at?: string | null
          id?: string
          is_signature?: boolean | null
          subtype_id?: string | null
          usage_notes?: string | null
        }
        Update: {
          best_worn_as?: string | null
          color_hex?: string
          color_name?: string
          created_at?: string | null
          id?: string
          is_signature?: boolean | null
          subtype_id?: string | null
          usage_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_accent_colors_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_artists: {
        Row: {
          artist_id: string | null
          id: string
          notes: string | null
          subtype_id: string | null
        }
        Insert: {
          artist_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Update: {
          artist_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_artists_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_artists_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_colors: {
        Row: {
          category: string
          color_id: string | null
          id: string
          is_primary: boolean | null
          notes: string | null
          subtype_id: string | null
        }
        Insert: {
          category: string
          color_id?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          subtype_id?: string | null
        }
        Update: {
          category?: string
          color_id?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_colors_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_colors_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_designers: {
        Row: {
          designer_id: string | null
          id: string
          notes: string | null
          subtype_id: string | null
        }
        Insert: {
          designer_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Update: {
          designer_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_designers_designer_id_fkey"
            columns: ["designer_id"]
            isOneToOne: false
            referencedRelation: "designers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_designers_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_eras: {
        Row: {
          era_id: string | null
          id: string
          notes: string | null
          subtype_id: string | null
        }
        Insert: {
          era_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Update: {
          era_id?: string | null
          id?: string
          notes?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_eras_era_id_fkey"
            columns: ["era_id"]
            isOneToOne: false
            referencedRelation: "historical_eras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_eras_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_fabrics: {
        Row: {
          fabric_id: string | null
          id: string
          notes: string | null
          rating: string
          subtype_id: string | null
        }
        Insert: {
          fabric_id?: string | null
          id?: string
          notes?: string | null
          rating: string
          subtype_id?: string | null
        }
        Update: {
          fabric_id?: string | null
          id?: string
          notes?: string | null
          rating?: string
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_fabrics_fabric_id_fkey"
            columns: ["fabric_id"]
            isOneToOne: false
            referencedRelation: "fabrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_fabrics_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_gemstones: {
        Row: {
          gemstone_id: string | null
          id: string
          notes: string | null
          rating: string
          subtype_id: string | null
        }
        Insert: {
          gemstone_id?: string | null
          id?: string
          notes?: string | null
          rating: string
          subtype_id?: string | null
        }
        Update: {
          gemstone_id?: string | null
          id?: string
          notes?: string | null
          rating?: string
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_gemstones_gemstone_id_fkey"
            columns: ["gemstone_id"]
            isOneToOne: false
            referencedRelation: "gemstones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_gemstones_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_metals: {
        Row: {
          id: string
          metal_id: string | null
          notes: string | null
          rating: string
          subtype_id: string | null
        }
        Insert: {
          id?: string
          metal_id?: string | null
          notes?: string | null
          rating: string
          subtype_id?: string | null
        }
        Update: {
          id?: string
          metal_id?: string | null
          notes?: string | null
          rating?: string
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_metals_metal_id_fkey"
            columns: ["metal_id"]
            isOneToOne: false
            referencedRelation: "metals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_metals_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_occasion_outfits: {
        Row: {
          accessories: Json | null
          colors_to_emphasize: Json | null
          created_at: string | null
          fabrics_recommended: Json | null
          id: string
          image_url: string | null
          key_pieces: Json | null
          occasion_id: string | null
          outfit_description: string | null
          styling_tips: Json | null
          subtype_id: string | null
        }
        Insert: {
          accessories?: Json | null
          colors_to_emphasize?: Json | null
          created_at?: string | null
          fabrics_recommended?: Json | null
          id?: string
          image_url?: string | null
          key_pieces?: Json | null
          occasion_id?: string | null
          outfit_description?: string | null
          styling_tips?: Json | null
          subtype_id?: string | null
        }
        Update: {
          accessories?: Json | null
          colors_to_emphasize?: Json | null
          created_at?: string | null
          fabrics_recommended?: Json | null
          id?: string
          image_url?: string | null
          key_pieces?: Json | null
          occasion_id?: string | null
          outfit_description?: string | null
          styling_tips?: Json | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_occasion_outfits_occasion_id_fkey"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_occasion_outfits_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_prints: {
        Row: {
          id: string
          notes: string | null
          print_id: string | null
          rating: string
          subtype_id: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          print_id?: string | null
          rating: string
          subtype_id?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          print_id?: string | null
          rating?: string
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_prints_print_id_fkey"
            columns: ["print_id"]
            isOneToOne: false
            referencedRelation: "prints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_prints_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtype_style_icons: {
        Row: {
          id: string
          notes: string | null
          style_icon_id: string | null
          subtype_id: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          style_icon_id?: string | null
          subtype_id?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          style_icon_id?: string | null
          subtype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtype_style_icons_style_icon_id_fkey"
            columns: ["style_icon_id"]
            isOneToOne: false
            referencedRelation: "style_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtype_style_icons_subtype_id_fkey"
            columns: ["subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
      subtypes: {
        Row: {
          art_references: Json | null
          beauty_statement: string | null
          bridging_to: Json | null
          color_combinations: Json | null
          created_at: string | null
          designers: Json | null
          effects: Json | null
          eras: Json | null
          home_decor: Json | null
          id: string
          jewelry_styles: Json | null
          name: string
          phase_id: string | null
          season_id: string | null
          slug: string
          source_app: string | null
          style_donts: Json | null
          style_dos: Json | null
          synced_at: string | null
          unique_features: string | null
          updated_at: string | null
        }
        Insert: {
          art_references?: Json | null
          beauty_statement?: string | null
          bridging_to?: Json | null
          color_combinations?: Json | null
          created_at?: string | null
          designers?: Json | null
          effects?: Json | null
          eras?: Json | null
          home_decor?: Json | null
          id?: string
          jewelry_styles?: Json | null
          name: string
          phase_id?: string | null
          season_id?: string | null
          slug: string
          source_app?: string | null
          style_donts?: Json | null
          style_dos?: Json | null
          synced_at?: string | null
          unique_features?: string | null
          updated_at?: string | null
        }
        Update: {
          art_references?: Json | null
          beauty_statement?: string | null
          bridging_to?: Json | null
          color_combinations?: Json | null
          created_at?: string | null
          designers?: Json | null
          effects?: Json | null
          eras?: Json | null
          home_decor?: Json | null
          id?: string
          jewelry_styles?: Json | null
          name?: string
          phase_id?: string | null
          season_id?: string | null
          slug?: string
          source_app?: string | null
          style_donts?: Json | null
          style_dos?: Json | null
          synced_at?: string | null
          unique_features?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtypes_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "season_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtypes_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_sources: {
        Row: {
          app_name: string
          app_url: string
          created_at: string | null
          export_endpoint: string
          id: string
          last_sync_at: string | null
          sync_status: string | null
        }
        Insert: {
          app_name: string
          app_url: string
          created_at?: string | null
          export_endpoint?: string
          id?: string
          last_sync_at?: string | null
          sync_status?: string | null
        }
        Update: {
          app_name?: string
          app_url?: string
          created_at?: string | null
          export_endpoint?: string
          id?: string
          last_sync_at?: string | null
          sync_status?: string | null
        }
        Relationships: []
      }
      training_samples: {
        Row: {
          assigned_season_id: string | null
          assigned_subtype_id: string | null
          confidence_score: number | null
          contrast_level: string | null
          created_at: string | null
          eye_color: string | null
          hair_color: string | null
          id: string
          labeled_by: string | null
          notes: string | null
          photo_url: string
          skin_undertone: string | null
        }
        Insert: {
          assigned_season_id?: string | null
          assigned_subtype_id?: string | null
          confidence_score?: number | null
          contrast_level?: string | null
          created_at?: string | null
          eye_color?: string | null
          hair_color?: string | null
          id?: string
          labeled_by?: string | null
          notes?: string | null
          photo_url: string
          skin_undertone?: string | null
        }
        Update: {
          assigned_season_id?: string | null
          assigned_subtype_id?: string | null
          confidence_score?: number | null
          contrast_level?: string | null
          created_at?: string | null
          eye_color?: string | null
          hair_color?: string | null
          id?: string
          labeled_by?: string | null
          notes?: string | null
          photo_url?: string
          skin_undertone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_samples_assigned_season_id_fkey"
            columns: ["assigned_season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_samples_assigned_subtype_id_fkey"
            columns: ["assigned_subtype_id"]
            isOneToOne: false
            referencedRelation: "subtypes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
