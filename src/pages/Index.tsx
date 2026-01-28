import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database, Palette, Shirt, Gem, Brush, Clock, PenTool, Image, Users, Camera, Lightbulb, Sparkles, Heart, Circle, Crown, Grid3X3, User, Eye, SwatchBook, History, AlertTriangle, CheckCircle2, XCircle, AlertCircle, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { useModalState } from "@/components/dashboard/useModalState";
import {
  SeasonsModal, SubtypesModal, ColorsModal, FabricsModal, GemstonesModal,
  ArtistsModal, ErasModal, PaintingsModal, SephirotModal, MakeupModal,
  MetalsModal, DesignersModal, PrintsModal, BodyTypesModal,
  CompletionStatusModal, JunctionMappingsModal, SeasonDetailModal,
  MakeupMappingsModal, FabricMappingsModal, EraMappingsModal,
  DesignerMappingsModal, GemstoneMappingsModal, ArtistMappingsModal, MetalMappingsModal
} from "@/components/dashboard/DataModals";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
const CollapsibleContent = CollapsiblePrimitive.Content;
interface StatCardProps {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const StatCard = ({ title, count, description, icon, color, onClick }: StatCardProps) => {
  const interactive = typeof onClick === "function";

  return (
    <Card
      className={
        "group transition-all duration-300 border-2 hover:border-primary/20" +
        (interactive ? " cursor-pointer hover:shadow-lg" : "")
      }
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-10 rounded-lg" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
);

interface CompletionItemProps {
  title: string;
  current: number;
  total: number;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'complete';
  description: string;
  onClick?: () => void;
}

const CompletionItem = ({ title, current, total, priority, description, onClick }: CompletionItemProps) => {
  const percentage = Math.round((current / total) * 100);
  const interactive = typeof onClick === "function";
  
  const priorityConfig = {
    critical: { 
      icon: <XCircle className="h-5 w-5 text-red-600" />, 
      badge: "bg-red-100 text-red-800 border-red-200",
      progressColor: "bg-red-500",
      label: "Critical"
    },
    high: { 
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />, 
      badge: "bg-orange-100 text-orange-800 border-orange-200",
      progressColor: "bg-orange-500",
      label: "High Priority"
    },
    medium: { 
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />, 
      badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
      progressColor: "bg-yellow-500",
      label: "Medium"
    },
    low: { 
      icon: <AlertCircle className="h-5 w-5 text-blue-600" />, 
      badge: "bg-blue-100 text-blue-800 border-blue-200",
      progressColor: "bg-blue-500",
      label: "Low"
    },
    complete: { 
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />, 
      badge: "bg-green-100 text-green-800 border-green-200",
      progressColor: "bg-green-500",
      label: "Complete"
    },
  };

  const config = priorityConfig[priority];

  return (
    <div 
      className={`p-4 rounded-lg border bg-card transition-all ${interactive ? "cursor-pointer hover:shadow-md hover:border-primary/30" : ""}`}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {config.icon}
          <h4 className="font-semibold">{title}</h4>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${config.badge}`}>
          {config.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{current} / {total} subtypes</span>
          <span className="font-medium">{percentage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.progressColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const { isOpen, getOpenChange, getClickHandler, openModalHandler, openSeasonDetail, selectedSeasonId } = useModalState();

  const { data: seasons } = useQuery({
    queryKey: ["seasons"],
    queryFn: async () => {
      const { data, error } = await supabase.from("seasons").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: subtypes } = useQuery({
    queryKey: ["subtypes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtypes").select("id, name, slug, seasons(name)");
      if (error) throw error;
      return data;
    },
  });

  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("colors").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: fabrics } = useQuery({
    queryKey: ["fabrics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("fabrics").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: gemstones } = useQuery({
    queryKey: ["gemstones"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gemstones").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: artists } = useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      const { data, error } = await supabase.from("artists").select("id");
      if (error) throw error;
      return data;
    },
  });


  const { data: eras } = useQuery({
    queryKey: ["eras"],
    queryFn: async () => {
      const { data, error } = await supabase.from("historical_eras").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: paintings } = useQuery({
    queryKey: ["paintings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("masterpiece_paintings").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: sephirotColors } = useQuery({
    queryKey: ["sephirot_colors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sephirot_colors").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: makeupRecommendations } = useQuery({
    queryKey: ["makeup_recommendations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("makeup_recommendations").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: metals } = useQuery({
    queryKey: ["metals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metals").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: designers } = useQuery({
    queryKey: ["designers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("designers").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: prints } = useQuery({
    queryKey: ["prints"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prints").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: bodyTypes } = useQuery({
    queryKey: ["body_types"],
    queryFn: async () => {
      const { data, error } = await supabase.from("body_types").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: clientProfiles } = useQuery({
    queryKey: ["client_profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_profiles").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: photoAnalyses } = useQuery({
    queryKey: ["photo_analyses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("photo_analyses").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: savedPalettes } = useQuery({
    queryKey: ["saved_palettes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("saved_palettes").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: sessionHistory } = useQuery({
    queryKey: ["session_history"],
    queryFn: async () => {
      const { data, error } = await supabase.from("session_history").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: trainingSamples } = useQuery({
    queryKey: ["training_samples"],
    queryFn: async () => {
      const { data, error } = await supabase.from("training_samples").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: aiFeedback } = useQuery({
    queryKey: ["ai_feedback"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ai_feedback").select("id");
      if (error) throw error;
      return data;
    },
  });

  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: async () => {
      const { data, error } = await supabase.from("methodology_metadata").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Junction table coverage queries
  const { data: subtypeArtistsCoverage } = useQuery({
    queryKey: ["subtype_artists_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_artists").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: subtypeGemstonesCoverage } = useQuery({
    queryKey: ["subtype_gemstones_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_gemstones").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: subtypeFabricsCoverage } = useQuery({
    queryKey: ["subtype_fabrics_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_fabrics").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: subtypeDesignersCoverage } = useQuery({
    queryKey: ["subtype_designers_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_designers").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: subtypeMetalsCoverage } = useQuery({
    queryKey: ["subtype_metals_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_metals").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: subtypeErasCoverage } = useQuery({
    queryKey: ["subtype_eras_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_eras").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: makeupCoverage } = useQuery({
    queryKey: ["makeup_coverage"],
    queryFn: async () => {
      const { data, error } = await supabase.from("makeup_recommendations").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const isLoading = !seasons;
  const totalSubtypes = subtypes?.length || 40;

  const stats = [
    { 
      title: "Seasons", 
      count: seasons?.length || 0, 
      description: "Base seasonal categories",
      icon: <Database className="h-5 w-5 text-amber-700" />,
      color: "bg-amber-100"
    },
    { 
      title: "Subtypes", 
      count: subtypes?.length || 0, 
      description: "Unique color personalities",
      icon: <Palette className="h-5 w-5 text-rose-700" />,
      color: "bg-rose-100"
    },
    { 
      title: "Colors", 
      count: colors?.length || 0, 
      description: "Master color database",
      icon: <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500" />,
      color: "bg-purple-100"
    },
    { 
      title: "Fabrics", 
      count: fabrics?.length || 0, 
      description: "Fabric recommendations",
      icon: <Shirt className="h-5 w-5 text-blue-700" />,
      color: "bg-blue-100"
    },
    { 
      title: "Gemstones", 
      count: gemstones?.length || 0, 
      description: "Jewelry stone options",
      icon: <Gem className="h-5 w-5 text-emerald-700" />,
      color: "bg-emerald-100"
    },
    { 
      title: "Artists", 
      count: artists?.length || 0, 
      description: "Master artist inspirations",
      icon: <Brush className="h-5 w-5 text-orange-700" />,
      color: "bg-orange-100"
    },
    { 
      title: "Historical Eras", 
      count: eras?.length || 0, 
      description: "Style era references",
      icon: <Clock className="h-5 w-5 text-slate-700" />,
      color: "bg-slate-100"
    },
    { 
      title: "Masterpieces", 
      count: paintings?.length || 0, 
      description: "Curated paintings",
      icon: <Image className="h-5 w-5 text-teal-700" />,
      color: "bg-teal-100"
    },
    { 
      title: "Sephirot Colors", 
      count: sephirotColors?.length || 0, 
      description: "Kabbalistic mappings",
      icon: <Sparkles className="h-5 w-5 text-violet-700" />,
      color: "bg-violet-100"
    },
    { 
      title: "Makeup", 
      count: makeupRecommendations?.length || 0, 
      description: "Beauty recommendations",
      icon: <Heart className="h-5 w-5 text-pink-700" />,
      color: "bg-pink-100"
    },
    { 
      title: "Metals", 
      count: metals?.length || 0, 
      description: "Jewelry metal guide",
      icon: <Circle className="h-5 w-5 text-amber-700" />,
      color: "bg-amber-100"
    },
    { 
      title: "Designers", 
      count: designers?.length || 0, 
      description: "Fashion designer references",
      icon: <Crown className="h-5 w-5 text-fuchsia-700" />,
      color: "bg-fuchsia-100"
    },
    { 
      title: "Prints", 
      count: prints?.length || 0, 
      description: "Pattern categories",
      icon: <Grid3X3 className="h-5 w-5 text-cyan-700" />,
      color: "bg-cyan-100"
    },
    { 
      title: "Body Types", 
      count: bodyTypes?.length || 0, 
      description: "Style systems",
      icon: <User className="h-5 w-5 text-lime-700" />,
      color: "bg-lime-100"
    },
  ];

  const appDataStats = [
    { 
      title: "Client Profiles", 
      count: clientProfiles?.length || 0, 
      description: "From Client App",
      icon: <Users className="h-5 w-5 text-indigo-700" />,
      color: "bg-indigo-100"
    },
    { 
      title: "Photo Analyses", 
      count: photoAnalyses?.length || 0, 
      description: "Client color analyses",
      icon: <Eye className="h-5 w-5 text-sky-700" />,
      color: "bg-sky-100"
    },
    { 
      title: "Saved Palettes", 
      count: savedPalettes?.length || 0, 
      description: "Client palettes",
      icon: <SwatchBook className="h-5 w-5 text-orange-700" />,
      color: "bg-orange-100"
    },
    { 
      title: "Sessions", 
      count: sessionHistory?.length || 0, 
      description: "Consultation history",
      icon: <History className="h-5 w-5 text-emerald-700" />,
      color: "bg-emerald-100"
    },
    { 
      title: "Training Samples", 
      count: trainingSamples?.length || 0, 
      description: "From Trainer App",
      icon: <Camera className="h-5 w-5 text-pink-700" />,
      color: "bg-pink-100"
    },
    { 
      title: "AI Corrections", 
      count: aiFeedback?.length || 0, 
      description: "Trainer feedback",
      icon: <Lightbulb className="h-5 w-5 text-yellow-700" />,
      color: "bg-yellow-100"
    },
  ];

  const methodologyName = metadata?.find(m => m.key === "methodology_name")?.value;
  const methodologyAuthor = metadata?.find(m => m.key === "methodology_author")?.value;
  const version = metadata?.find(m => m.key === "version")?.value;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Data Modals */}
        <SeasonsModal open={isOpen("seasons")} onOpenChange={getOpenChange("seasons")} />
        <SubtypesModal open={isOpen("subtypes")} onOpenChange={getOpenChange("subtypes")} />
        <ColorsModal open={isOpen("colors")} onOpenChange={getOpenChange("colors")} />
        <FabricsModal open={isOpen("fabrics")} onOpenChange={getOpenChange("fabrics")} />
        <GemstonesModal open={isOpen("gemstones")} onOpenChange={getOpenChange("gemstones")} />
        <ArtistsModal open={isOpen("artists")} onOpenChange={getOpenChange("artists")} />
        <ErasModal open={isOpen("eras")} onOpenChange={getOpenChange("eras")} />
        <PaintingsModal open={isOpen("paintings")} onOpenChange={getOpenChange("paintings")} />
        <SephirotModal open={isOpen("sephirot")} onOpenChange={getOpenChange("sephirot")} />
        <MakeupModal open={isOpen("makeup")} onOpenChange={getOpenChange("makeup")} />
        <MetalsModal open={isOpen("metals")} onOpenChange={getOpenChange("metals")} />
        <DesignersModal open={isOpen("designers")} onOpenChange={getOpenChange("designers")} />
        <PrintsModal open={isOpen("prints")} onOpenChange={getOpenChange("prints")} />
        <BodyTypesModal open={isOpen("bodyTypes")} onOpenChange={getOpenChange("bodyTypes")} />
        <CompletionStatusModal open={isOpen("completionStatus")} onOpenChange={getOpenChange("completionStatus")} />
        <JunctionMappingsModal open={isOpen("junctionMappings")} onOpenChange={getOpenChange("junctionMappings")} />
        <SeasonDetailModal open={isOpen("seasonDetail")} onOpenChange={getOpenChange("seasonDetail")} seasonId={selectedSeasonId} />
        <MakeupMappingsModal open={isOpen("makeupMappings")} onOpenChange={getOpenChange("makeupMappings")} />
        <FabricMappingsModal open={isOpen("fabricMappings")} onOpenChange={getOpenChange("fabricMappings")} />
        <EraMappingsModal open={isOpen("eraMappings")} onOpenChange={getOpenChange("eraMappings")} />
        <DesignerMappingsModal open={isOpen("designerMappings")} onOpenChange={getOpenChange("designerMappings")} />
        <GemstoneMappingsModal open={isOpen("gemstoneMappings")} onOpenChange={getOpenChange("gemstoneMappings")} />
        <ArtistMappingsModal open={isOpen("artistMappings")} onOpenChange={getOpenChange("artistMappings")} />
        <MetalMappingsModal open={isOpen("metalMappings")} onOpenChange={getOpenChange("metalMappings")} />
        {/* Header */}

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 flex items-center justify-center">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Streams of Color
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Centralized Data Hub for Color Analysis Methodology
          </p>
          {methodologyAuthor && (
            <p className="text-sm text-muted-foreground mt-2">
              By {String(methodologyAuthor).replace(/"/g, '')} • Version {String(version || "1.0").replace(/"/g, '')}
            </p>
          )}
        </div>

        {/* Attention Needed Section */}
        <Card className="mb-8 border-2 border-orange-200 dark:border-orange-900">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
            <CardTitle 
              className="flex items-center gap-2 text-orange-800 dark:text-orange-200 cursor-pointer hover:underline"
              onClick={() => openModalHandler("completionStatus")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModalHandler("completionStatus"); } }}
            >
              <AlertTriangle className="h-5 w-5" />
              Data Completion Status
            </CardTitle>
            <CardDescription
              className="cursor-pointer hover:underline"
              onClick={() => openModalHandler("junctionMappings")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModalHandler("junctionMappings"); } }}
            >
              Junction table mappings - linking subtypes to their recommended elements
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CompletionItem
                title="Makeup Recommendations"
                current={makeupCoverage || 0}
                total={totalSubtypes}
                priority={((makeupCoverage || 0) / totalSubtypes) < 0.3 ? 'critical' : ((makeupCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : 'medium'}
                description="Lip, blush, eyeshadow, and nail recommendations per subtype"
                onClick={() => openModalHandler("makeupMappings")}
              />
              <CompletionItem
                title="Fabric Mappings"
                current={subtypeFabricsCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeFabricsCoverage || 0) / totalSubtypes) < 0.3 ? 'critical' : ((subtypeFabricsCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : 'medium'}
                description="Recommended fabrics (silk, cotton, velvet, etc.) per subtype"
                onClick={() => openModalHandler("fabricMappings")}
              />
              <CompletionItem
                title="Historical Era Links"
                current={subtypeErasCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeErasCoverage || 0) / totalSubtypes) < 0.3 ? 'critical' : ((subtypeErasCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : 'medium'}
                description="Fashion era references (Victorian, Art Deco, etc.) per subtype"
                onClick={() => openModalHandler("eraMappings")}
              />
              <CompletionItem
                title="Designer Associations"
                current={subtypeDesignersCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeDesignersCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : 'medium'}
                description="Designer recommendations (Chanel, Dior, etc.) per subtype"
                onClick={() => openModalHandler("designerMappings")}
              />
              <CompletionItem
                title="Gemstone Mappings"
                current={subtypeGemstonesCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeGemstonesCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : ((subtypeGemstonesCoverage || 0) / totalSubtypes) < 0.75 ? 'medium' : 'low'}
                description="Recommended gemstones per subtype"
                onClick={() => openModalHandler("gemstoneMappings")}
              />
              <CompletionItem
                title="Artist Inspirations"
                current={subtypeArtistsCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeArtistsCoverage || 0) / totalSubtypes) < 0.5 ? 'high' : ((subtypeArtistsCoverage || 0) / totalSubtypes) < 0.75 ? 'medium' : 'low'}
                description="Master artist references per subtype"
                onClick={() => openModalHandler("artistMappings")}
              />
              <CompletionItem
                title="Metal Recommendations"
                current={subtypeMetalsCoverage || 0}
                total={totalSubtypes}
                priority={((subtypeMetalsCoverage || 0) / totalSubtypes) >= 0.85 ? 'complete' : 'low'}
                description="Gold, silver, rose gold recommendations per subtype"
                onClick={() => openModalHandler("metalMappings")}
              />
            </div>

            {/* Data Quality Notes */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                Data Quality Notes
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Algorithm files provide detailed data for ~25 subtypes; remaining 15 have minimal metadata</li>
                <li>Some artist/designer names in algorithm don't match database entries (naming variations)</li>
                <li>Makeup recommendations need lips, blush, eyeshadow, and nails for each subtype</li>
                <li>Fabric mappings should include rating (perfect, good, avoid) and notes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* App Data Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Connected App Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading
              ? Array(3).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
              : appDataStats.map((stat) => <StatCard key={stat.title} {...stat} />)
            }
          </div>
        </div>

        {/* Methodology Stats Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Methodology Reference Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array(8).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
              : stats.map((stat) => (
                  <StatCard
                    key={stat.title}
                    {...stat}
                    onClick={getClickHandler(stat.title)}
                  />
                ))
            }
          </div>
        </div>

        {/* Seasons Overview */}
        {seasons && seasons.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Season Categories
              </CardTitle>
              <CardDescription>The four foundational seasonal color categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasons.map((season) => (
                  <div 
                    key={season.id} 
                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer hover:border-primary/30"
                    onClick={() => openSeasonDetail(season.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSeasonDetail(season.id); } }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{season.name}</h3>
                      <Badge variant={season.undertone === 'warm' ? 'default' : 'secondary'}>
                        {season.undertone}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{season.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              API Endpoints
            </CardTitle>
            <CardDescription>Connect your Client and Trainer apps to this Data Hub</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="read">Read (GET)</TabsTrigger>
                <TabsTrigger value="write">Write (POST/PUT)</TabsTrigger>
              </TabsList>
              <TabsContent value="read" className="space-y-3 mt-4">
                {/* Core Endpoints */}
                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Complete Methodology</div>
                      <code className="text-xs font-mono">GET /methodology</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Returns complete methodology with all seasons, subtypes, and their relationships.</p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: { seasons: [...], subtypes: [...], colors: [...] }`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Seasons with Subtypes</div>
                      <code className="text-xs font-mono">GET /seasons?undertone=warm</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?undertone=warm|cool</code> or no params for all.</p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, undertone, subtypes: [...] }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Subtype Details</div>
                      <code className="text-xs font-mono">GET /subtype?slug=wildflower-spring</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Returns full subtype with colors, fabrics, artists, designers, metals, etc.</p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: { id, name, slug, season, colors: [...], fabrics: [...], ... }`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Colors by Category</div>
                      <code className="text-xs font-mono">GET /colors?category=skin_tone</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?category=</code>, <code>?warmth=</code>, <code>?season=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, hex, hsl_h, hsl_s, hsl_l, warmth, category }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Artists</div>
                      <code className="text-xs font-mono">GET /artists?slug=monet</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?era=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, era, style, notable_works, seasons_affinity }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Designers</div>
                      <code className="text-xs font-mono">GET /designers?price_tier=luxury</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?price_tier=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, brand_style, price_tier, signature_elements }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Fabrics</div>
                      <code className="text-xs font-mono">GET /fabrics?category=natural</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?category=</code>, <code>?formality_level=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, category, characteristics, formality_level }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Gemstones</div>
                      <code className="text-xs font-mono">GET /gemstones?season=spring</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?season=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, color_hex, symbolism, description }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Metals</div>
                      <code className="text-xs font-mono">GET /metals?warmth=warm</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?warmth=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, color_hex, warmth, price_tier }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Historical Eras</div>
                      <code className="text-xs font-mono">GET /eras?slug=art-deco</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, period, color_palette_notes, style_characteristics }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Prints</div>
                      <code className="text-xs font-mono">GET /prints?category=floral</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?category=</code>, <code>?subtype_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, category, description, keywords }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Makeup Recommendations</div>
                      <code className="text-xs font-mono">GET /makeup?subtype_slug=french-spring</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?subtype_slug=</code>, <code>?subtype_id=</code>, <code>?category=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, category, color_name, color_hex, finish, intensity }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Body Types</div>
                      <code className="text-xs font-mono">GET /body-types?system=kibbe</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?slug=</code>, <code>?system=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, slug, system, characteristics, style_recommendations }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Masterpiece Paintings</div>
                      <code className="text-xs font-mono">GET /paintings?season=autumn</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Filters: <code>?season=</code>, <code>?artist_id=</code></p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, title, artist_name, museum, image_url, notable_colors }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                      <div className="text-muted-foreground text-xs mb-1">Sephirot Colors</div>
                      <code className="text-xs font-mono">GET /sephirot</code>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground border-t pt-2 mt-1">
                      <p className="mb-2">Returns all Kabbalistic color mappings. No filters available.</p>
                      <code className="block bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre">{`// Response: [{ id, name, hebrew_name, color_hex, meaning, attributes }]`}</code>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <p className="text-xs text-muted-foreground mt-3">
                  Base URL: <code className="bg-muted px-1 rounded">https://ipcjabzvinmzyujsfige.supabase.co/functions/v1</code>
                </p>
              </TabsContent>
              <TabsContent value="write" className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 font-mono text-sm border-l-4 border-indigo-500">
                  <div className="text-indigo-700 dark:text-indigo-300 font-semibold mb-2">Client App Endpoints</div>
                  <div className="space-y-2 text-xs">
                    <div><code>POST /functions/v1/client-data?resource=profile</code> - Create/update client</div>
                    <div><code>POST /functions/v1/client-data?resource=photo</code> - Save photo analysis</div>
                    <div><code>POST /functions/v1/client-data?resource=palette</code> - Save palette</div>
                    <div><code>GET /functions/v1/client-data?resource=profile&external_id=xxx</code> - Get client</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20 font-mono text-sm border-l-4 border-pink-500">
                  <div className="text-pink-700 dark:text-pink-300 font-semibold mb-2">Trainer App Endpoints</div>
                  <div className="space-y-2 text-xs">
                    <div><code>POST /functions/v1/trainer-data?resource=sample</code> - Add training sample</div>
                    <div><code>POST /functions/v1/trainer-data?resource=feedback</code> - Submit AI correction</div>
                    <div><code>POST /functions/v1/trainer-data?resource=painting</code> - Add masterpiece</div>
                    <div><code>POST /functions/v1/trainer-data?resource=subtype</code> - Update methodology</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
