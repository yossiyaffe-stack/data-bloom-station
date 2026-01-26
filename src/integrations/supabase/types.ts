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
          style: string | null
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
          style?: string | null
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
          style?: string | null
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
          style_recommendations: Json | null
          system: string | null
        }
        Insert: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          style_recommendations?: Json | null
          system?: string | null
        }
        Update: {
          characteristics?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          style_recommendations?: Json | null
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
          warmth?: string | null
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
          website_url?: string | null
        }
        Relationships: []
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
          symbolism: string | null
        }
        Insert: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          seasons?: Json | null
          slug: string
          symbolism?: string | null
        }
        Update: {
          color_hex?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          seasons?: Json | null
          slug?: string
          symbolism?: string | null
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
          style_characteristics: Json | null
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
          style_characteristics?: Json | null
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
          style_characteristics?: Json | null
        }
        Relationships: []
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
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: Json | null
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: Json | null
          name?: string
          slug?: string
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
          season_id: string | null
          slug: string
          style_donts: Json | null
          style_dos: Json | null
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
          season_id?: string | null
          slug: string
          style_donts?: Json | null
          style_dos?: Json | null
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
          season_id?: string | null
          slug?: string
          style_donts?: Json | null
          style_dos?: Json | null
          unique_features?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subtypes_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
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
