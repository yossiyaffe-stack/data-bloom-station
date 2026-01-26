import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database, Palette, Shirt, Gem, Brush, Clock, PenTool, Image, Users, Camera, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatCardProps {
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, count, description, icon, color }: StatCardProps) => (
  <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{count}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

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

const Index = () => {
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

  const { data: clientProfiles } = useQuery({
    queryKey: ["client_profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_profiles").select("id");
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

  const isLoading = !seasons;

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
              : stats.map((stat) => <StatCard key={stat.title} {...stat} />)
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
                    className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
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
              <TabsContent value="read" className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  <div className="text-muted-foreground mb-1">Complete Methodology</div>
                  <code>GET /functions/v1/methodology</code>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  <div className="text-muted-foreground mb-1">Get Subtype by Slug</div>
                  <code>GET /functions/v1/subtype?slug=wildflower-spring</code>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  <div className="text-muted-foreground mb-1">Get Colors by Category</div>
                  <code>GET /functions/v1/colors?category=skin_tone</code>
                </div>
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
