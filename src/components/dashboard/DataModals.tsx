import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Re-export the PhaseAssignment modal
export { PhaseAssignmentModal } from "./PhaseAssignment";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SeasonDetailModalProps extends ModalProps {
  seasonId: string | null;
}

// Artists Modal
export const ArtistsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artists-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("id, name, slug, era, style, wikipedia_url")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Artists</DialogTitle>
          <DialogDescription>Master artist inspirations in the database</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? (
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-muted-foreground">Couldn't load data.</div>
          ) : !data?.length ? (
            <div className="p-4 text-sm text-muted-foreground">No items found.</div>
          ) : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <code className="font-mono">{item.slug}</code>
                        {(item.era || item.style) && (
                          <> • {item.era}{item.era && item.style ? " — " : ""}{item.style}</>
                        )}
                      </div>
                    </div>
                    {item.wikipedia_url && (
                      <a href={item.wikipedia_url} target="_blank" rel="noreferrer" className="text-xs underline text-muted-foreground">Wiki</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Seasons Modal
export const SeasonsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seasons-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("seasons").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Seasons</DialogTitle>
          <DialogDescription>Base seasonal categories</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                    </div>
                    <Badge variant={item.undertone === "warm" ? "default" : "secondary"}>{item.undertone}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Season Detail Modal (with subtypes)
export const SeasonDetailModal = ({ open, onOpenChange, seasonId }: SeasonDetailModalProps) => {
  const { data: season, isLoading: seasonLoading } = useQuery({
    queryKey: ["season-detail", seasonId],
    enabled: open && !!seasonId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("id", seasonId!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: subtypes, isLoading: subtypesLoading } = useQuery({
    queryKey: ["season-subtypes", seasonId],
    enabled: open && !!seasonId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, beauty_statement, unique_features")
        .eq("season_id", seasonId!)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const isLoading = seasonLoading || subtypesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {season?.name || "Season Details"}
            {season?.undertone && (
              <Badge variant={season.undertone === "warm" ? "default" : "secondary"}>{season.undertone}</Badge>
            )}
          </DialogTitle>
          <DialogDescription>{season?.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-6 p-1">
              {/* Season Characteristics */}
              {season?.characteristics && Array.isArray(season.characteristics) && season.characteristics.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Characteristics</h4>
                  <div className="flex flex-wrap gap-2">
                    {(season.characteristics as string[]).map((char, i) => (
                      <Badge key={i} variant="outline">{char}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtypes */}
              <div>
                <h4 className="font-semibold mb-3">Subtypes ({subtypes?.length || 0})</h4>
                {subtypes && subtypes.length > 0 ? (
                  <ul className="divide-y border rounded-lg">
                    {subtypes.map((subtype) => (
                      <li key={subtype.id} className="p-4 hover:bg-muted/50">
                        <div className="font-medium">{subtype.name}</div>
                        <code className="text-xs text-muted-foreground font-mono">{subtype.slug}</code>
                        {subtype.beauty_statement && (
                          <p className="text-sm text-muted-foreground mt-2 italic">"{subtype.beauty_statement}"</p>
                        )}
                        {subtype.unique_features && (
                          <p className="text-sm text-muted-foreground mt-1">{subtype.unique_features}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No subtypes found for this season.</p>
                )}
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Subtypes Modal
export const SubtypesModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subtypes-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtypes").select("id, name, slug, seasons(name)").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Subtypes</DialogTitle>
          <DialogDescription>Unique color personalities</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <code className="text-xs text-muted-foreground font-mono">{item.slug}</code>
                    </div>
                    {item.seasons && <Badge variant="outline">{(item.seasons as { name: string }).name}</Badge>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Colors Modal
export const ColorsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("colors").select("id, name, slug, hex, category, warmth").order("category").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Colors</DialogTitle>
          <DialogDescription>Master color database</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md border shadow-sm" style={{ backgroundColor: item.hex }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      <code>{item.hex}</code> • {item.category} • {item.warmth || "neutral"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Fabrics Modal
export const FabricsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fabrics-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("fabrics").select("id, name, slug, category, formality_level, care_level").order("category").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Fabrics</DialogTitle>
          <DialogDescription>Fabric recommendations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="mr-1">{item.category}</Badge>
                    {item.formality_level && <span>• {item.formality_level}</span>}
                    {item.care_level && <span> • Care: {item.care_level}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Gemstones Modal
export const GemstonesModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gemstones-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("gemstones").select("id, name, slug, color_hex, description, symbolism").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Gemstones</DialogTitle>
          <DialogDescription>Jewelry stone options</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50 flex items-center gap-3">
                  {item.color_hex && <div className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: item.color_hex }} />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.symbolism || item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Designers Modal
export const DesignersModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["designers-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("designers").select("id, name, slug, brand_style, price_tier, website_url").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Designers</DialogTitle>
          <DialogDescription>Fashion designer references</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.brand_style && <span>{item.brand_style}</span>}
                        {item.price_tier && <Badge variant="outline" className="ml-2">{item.price_tier}</Badge>}
                      </div>
                    </div>
                    {item.website_url && (
                      <a href={item.website_url} target="_blank" rel="noreferrer" className="text-xs underline text-muted-foreground">Website</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Metals Modal
export const MetalsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["metals-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("metals").select("id, name, slug, color_hex, warmth, price_tier, description").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Metals</DialogTitle>
          <DialogDescription>Jewelry metal guide</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50 flex items-center gap-3">
                  {item.color_hex && <div className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: item.color_hex }} />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.warmth && <Badge variant="outline" className="mr-1">{item.warmth}</Badge>}
                      {item.price_tier && <span>• {item.price_tier}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Prints Modal
export const PrintsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["prints-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("prints").select("id, name, slug, category, description").order("category").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Prints</DialogTitle>
          <DialogDescription>Pattern categories</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.category && <Badge variant="outline" className="mr-1">{item.category}</Badge>}
                    {item.description && <span>{item.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Eras Modal
export const ErasModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["eras-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("historical_eras").select("id, name, slug, period, description").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Historical Eras</DialogTitle>
          <DialogDescription>Style era references</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </div>
                    {item.period && <Badge variant="outline">{item.period}</Badge>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Sephirot Modal
export const SephirotModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sephirot-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("sephirot_colors").select("id, name, hebrew_name, slug, color_hex, meaning, position_on_tree").order("position_on_tree");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Sephirot Colors</DialogTitle>
          <DialogDescription>Kabbalistic color mappings</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: item.color_hex }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.name} {item.hebrew_name && <span className="text-muted-foreground">({item.hebrew_name})</span>}</div>
                    <div className="text-xs text-muted-foreground">{item.meaning}</div>
                  </div>
                  <Badge variant="outline">#{item.position_on_tree}</Badge>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Paintings Modal
export const PaintingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paintings-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("masterpiece_paintings").select("id, title, artist_name, year, museum, museum_url").order("artist_name").order("title");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Masterpiece Paintings</DialogTitle>
          <DialogDescription>Curated paintings for color inspiration</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.artist_name}{item.year && `, ${item.year}`}
                        {item.museum && <span> • {item.museum}</span>}
                      </div>
                    </div>
                    {item.museum_url && (
                      <a href={item.museum_url} target="_blank" rel="noreferrer" className="text-xs underline text-muted-foreground">View</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Makeup Modal
export const MakeupModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["makeup-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("makeup_recommendations").select("id, category, color_name, color_hex, finish, intensity, is_primary, subtypes(name)").order("category");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Makeup Recommendations</DialogTitle>
          <DialogDescription>Beauty recommendations by subtype</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50 flex items-center gap-3">
                  {item.color_hex && <div className="w-6 h-6 rounded-full border shadow-sm" style={{ backgroundColor: item.color_hex }} />}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.color_name || item.category}</div>
                    <div className="text-xs text-muted-foreground">
                      <Badge variant="outline" className="mr-1">{item.category}</Badge>
                      {item.finish && <span>• {item.finish}</span>}
                      {item.intensity && <span> • {item.intensity}</span>}
                      {item.is_primary && <Badge className="ml-1">Primary</Badge>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Body Types Modal
export const BodyTypesModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["body-types-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("body_types").select("id, name, slug, system, description").order("system").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Body Types</DialogTitle>
          <DialogDescription>Style systems</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </div>
                    {item.system && <Badge variant="outline">{item.system}</Badge>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Data Completion Status Modal
export const CompletionStatusModal = ({ open, onOpenChange }: ModalProps) => {
  const { data: subtypesCount } = useQuery({
    queryKey: ["subtypes-count-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtypes").select("id");
      if (error) throw error;
      return data?.length || 40;
    },
  });

  const { data: makeupCoverage } = useQuery({
    queryKey: ["makeup-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("makeup_recommendations").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: fabricsCoverage } = useQuery({
    queryKey: ["fabrics-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_fabrics").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: erasCoverage } = useQuery({
    queryKey: ["eras-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_eras").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: designersCoverage } = useQuery({
    queryKey: ["designers-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_designers").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: gemstonesCoverage } = useQuery({
    queryKey: ["gemstones-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_gemstones").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: artistsCoverage } = useQuery({
    queryKey: ["artists-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_artists").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: metalsCoverage } = useQuery({
    queryKey: ["metals-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_metals").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: colorsCoverage } = useQuery({
    queryKey: ["colors-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_colors").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const { data: printsCoverage } = useQuery({
    queryKey: ["prints-coverage-modal"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("subtype_prints").select("subtype_id");
      if (error) throw error;
      return new Set(data?.map(d => d.subtype_id)).size;
    },
  });

  const totalSubtypes = subtypesCount || 40;

  const coverageItems = [
    { label: "Makeup Recommendations", current: makeupCoverage || 0 },
    { label: "Fabric Mappings", current: fabricsCoverage || 0 },
    { label: "Historical Era Links", current: erasCoverage || 0 },
    { label: "Designer Associations", current: designersCoverage || 0 },
    { label: "Gemstone Mappings", current: gemstonesCoverage || 0 },
    { label: "Artist Inspirations", current: artistsCoverage || 0 },
    { label: "Metal Recommendations", current: metalsCoverage || 0 },
    { label: "Color Mappings", current: colorsCoverage || 0 },
    { label: "Print Mappings", current: printsCoverage || 0 },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Data Completion Status</DialogTitle>
          <DialogDescription>Junction table coverage - how many of the {totalSubtypes} subtypes have mappings</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4 p-1">
            {coverageItems.map(({ label, current }) => {
              const percentage = Math.round((current / totalSubtypes) * 100);
              const status = percentage >= 85 ? "complete" : percentage >= 50 ? "medium" : percentage >= 30 ? "high" : "critical";
              const statusColors = {
                critical: "bg-red-500",
                high: "bg-orange-500",
                medium: "bg-yellow-500",
                complete: "bg-green-500",
              };
              return (
                <div key={label} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{label}</span>
                    <Badge variant="outline">{current} / {totalSubtypes}</Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${statusColors[status]} transition-all`} style={{ width: `${percentage}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-right">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Junction Mappings Modal
export const JunctionMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data: artistsCount, isLoading: artistsLoading } = useQuery({
    queryKey: ["subtype_artists-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_artists").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: colorsCount, isLoading: colorsLoading } = useQuery({
    queryKey: ["subtype_colors-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_colors").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: designersCount, isLoading: designersLoading } = useQuery({
    queryKey: ["subtype_designers-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_designers").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: erasCount, isLoading: erasLoading } = useQuery({
    queryKey: ["subtype_eras-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_eras").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: fabricsCount, isLoading: fabricsLoading } = useQuery({
    queryKey: ["subtype_fabrics-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_fabrics").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: gemstonesCount, isLoading: gemstonesLoading } = useQuery({
    queryKey: ["subtype_gemstones-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_gemstones").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: metalsCount, isLoading: metalsLoading } = useQuery({
    queryKey: ["subtype_metals-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_metals").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: printsCount, isLoading: printsLoading } = useQuery({
    queryKey: ["subtype_prints-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("subtype_prints").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: makeupCount, isLoading: makeupLoading } = useQuery({
    queryKey: ["makeup_recommendations-count"],
    enabled: open,
    queryFn: async () => {
      const { count, error } = await supabase.from("makeup_recommendations").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const junctionItems = [
    { table: "subtype_artists", label: "Subtype → Artists", description: "Links subtypes to master artist inspirations", count: artistsCount, isLoading: artistsLoading },
    { table: "subtype_colors", label: "Subtype → Colors", description: "Links subtypes to their recommended color palette", count: colorsCount, isLoading: colorsLoading },
    { table: "subtype_designers", label: "Subtype → Designers", description: "Links subtypes to fashion designer recommendations", count: designersCount, isLoading: designersLoading },
    { table: "subtype_eras", label: "Subtype → Eras", description: "Links subtypes to historical fashion eras", count: erasCount, isLoading: erasLoading },
    { table: "subtype_fabrics", label: "Subtype → Fabrics", description: "Links subtypes to recommended fabrics with ratings", count: fabricsCount, isLoading: fabricsLoading },
    { table: "subtype_gemstones", label: "Subtype → Gemstones", description: "Links subtypes to gemstone recommendations", count: gemstonesCount, isLoading: gemstonesLoading },
    { table: "subtype_metals", label: "Subtype → Metals", description: "Links subtypes to metal recommendations (gold, silver, etc.)", count: metalsCount, isLoading: metalsLoading },
    { table: "subtype_prints", label: "Subtype → Prints", description: "Links subtypes to pattern recommendations", count: printsCount, isLoading: printsLoading },
    { table: "makeup_recommendations", label: "Makeup Recommendations", description: "Lips, blush, eyeshadow, and nail recommendations per subtype", count: makeupCount, isLoading: makeupLoading },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Junction Table Mappings</DialogTitle>
          <DialogDescription>Linking subtypes to their recommended elements</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <ul className="divide-y">
            {junctionItems.map(({ table, label, description, count, isLoading }) => (
              <li key={table} className="p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{description}</div>
                    <code className="text-xs text-muted-foreground font-mono mt-1 block">{table}</code>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {isLoading ? "..." : `${count} rows`}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Makeup Mappings Modal - shows which subtypes have makeup recommendations
export const MakeupMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["makeup-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: makeupData } = await supabase
        .from("makeup_recommendations")
        .select("subtype_id, category");
      
      const makeupBySubtype = (makeupData || []).reduce((acc: Record<string, string[]>, rec) => {
        if (rec.subtype_id) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          if (!acc[rec.subtype_id].includes(rec.category)) acc[rec.subtype_id].push(rec.category);
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        categories: makeupBySubtype[s.id] || [],
        hasMakeup: !!makeupBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasMakeup).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Makeup Recommendations by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have makeup recommendations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasMakeup && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasMakeup && item.categories.map(c => (
                          <Badge key={c} variant="secondary" className="mr-1 text-[10px]">{c}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Fabric Mappings Modal
export const FabricMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fabric-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: fabricData } = await supabase
        .from("subtype_fabrics")
        .select("subtype_id, fabrics(name), rating");
      
      const fabricsBySubtype = (fabricData || []).reduce((acc: Record<string, { name: string; rating: string }[]>, rec) => {
        if (rec.subtype_id && rec.fabrics) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          acc[rec.subtype_id].push({ name: (rec.fabrics as { name: string }).name, rating: rec.rating });
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        fabrics: fabricsBySubtype[s.id] || [],
        hasFabrics: !!fabricsBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasFabrics).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Fabric Mappings by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have fabric recommendations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasFabrics && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasFabrics && <span className="text-muted-foreground">{item.fabrics.length} fabrics</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Era Mappings Modal
export const EraMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["era-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: eraData } = await supabase
        .from("subtype_eras")
        .select("subtype_id, historical_eras(name)");
      
      const erasBySubtype = (eraData || []).reduce((acc: Record<string, string[]>, rec) => {
        if (rec.subtype_id && rec.historical_eras) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          acc[rec.subtype_id].push((rec.historical_eras as { name: string }).name);
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        eras: erasBySubtype[s.id] || [],
        hasEras: !!erasBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasEras).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Historical Era Links by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have era references
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasEras && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasEras && item.eras.map(e => (
                          <Badge key={e} variant="secondary" className="mr-1 text-[10px]">{e}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Designer Mappings Modal
export const DesignerMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["designer-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: designerData } = await supabase
        .from("subtype_designers")
        .select("subtype_id, designers(name)");
      
      const designersBySubtype = (designerData || []).reduce((acc: Record<string, string[]>, rec) => {
        if (rec.subtype_id && rec.designers) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          acc[rec.subtype_id].push((rec.designers as { name: string }).name);
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        designers: designersBySubtype[s.id] || [],
        hasDesigners: !!designersBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasDesigners).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Designer Associations by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have designer recommendations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasDesigners && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasDesigners && <span className="text-muted-foreground">{item.designers.slice(0, 3).join(", ")}{item.designers.length > 3 && ` +${item.designers.length - 3}`}</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Gemstone Mappings Modal
export const GemstoneMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gemstone-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: gemstoneData } = await supabase
        .from("subtype_gemstones")
        .select("subtype_id, gemstones(name, color_hex), rating");
      
      const gemstonesBySubtype = (gemstoneData || []).reduce((acc: Record<string, { name: string; hex: string | null }[]>, rec) => {
        if (rec.subtype_id && rec.gemstones) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          const gem = rec.gemstones as { name: string; color_hex: string | null };
          acc[rec.subtype_id].push({ name: gem.name, hex: gem.color_hex });
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        gemstones: gemstonesBySubtype[s.id] || [],
        hasGemstones: !!gemstonesBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasGemstones).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Gemstone Mappings by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have gemstone recommendations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasGemstones && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center flex-wrap gap-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasGemstones && item.gemstones.slice(0, 4).map(g => (
                          <span key={g.name} className="inline-flex items-center gap-1">
                            {g.hex && <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: g.hex }} />}
                            <span>{g.name}</span>
                          </span>
                        ))}
                        {item.gemstones.length > 4 && <span className="text-muted-foreground">+{item.gemstones.length - 4}</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Artist Mappings Modal
export const ArtistMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: artistData } = await supabase
        .from("subtype_artists")
        .select("subtype_id, artists(name)");
      
      const artistsBySubtype = (artistData || []).reduce((acc: Record<string, string[]>, rec) => {
        if (rec.subtype_id && rec.artists) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          acc[rec.subtype_id].push((rec.artists as { name: string }).name);
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        artists: artistsBySubtype[s.id] || [],
        hasArtists: !!artistsBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasArtists).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Artist Inspirations by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have artist references
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasArtists && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasArtists && <span className="text-muted-foreground">{item.artists.slice(0, 3).join(", ")}{item.artists.length > 3 && ` +${item.artists.length - 3}`}</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Metal Mappings Modal
export const MetalMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["metal-mappings-detail"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, seasons(name)")
        .order("name");
      if (error) throw error;

      const { data: metalData } = await supabase
        .from("subtype_metals")
        .select("subtype_id, metals(name, color_hex), rating");
      
      const metalsBySubtype = (metalData || []).reduce((acc: Record<string, { name: string; hex: string | null; rating: string }[]>, rec) => {
        if (rec.subtype_id && rec.metals) {
          if (!acc[rec.subtype_id]) acc[rec.subtype_id] = [];
          const metal = rec.metals as { name: string; color_hex: string | null };
          acc[rec.subtype_id].push({ name: metal.name, hex: metal.color_hex, rating: rec.rating });
        }
        return acc;
      }, {});

      return data?.map(s => ({
        ...s,
        metals: metalsBySubtype[s.id] || [],
        hasMetals: !!metalsBySubtype[s.id]?.length
      }));
    },
  });

  const covered = data?.filter(s => s.hasMetals).length || 0;
  const total = data?.length || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Metal Recommendations by Subtype</DialogTitle>
          <DialogDescription>
            {covered} of {total} subtypes have metal recommendations
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : (
            <ul className="divide-y">
              {data?.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {item.name}
                        {!item.hasMetals && <Badge variant="destructive" className="text-[10px]">Missing</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center flex-wrap gap-1">
                        {item.seasons && <Badge variant="outline" className="mr-1">{(item.seasons as { name: string }).name}</Badge>}
                        {item.hasMetals && item.metals.map(m => (
                          <span key={m.name} className="inline-flex items-center gap-1">
                            {m.hex && <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: m.hex }} />}
                            <span>{m.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// ============= LIFESTYLE MODALS =============

// Occasions Modal
export const OccasionsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["occasions-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("occasions").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Occasions</DialogTitle>
          <DialogDescription>Event categories for styling recommendations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.category && <Badge variant="outline" className="mr-1">{item.category}</Badge>}
                        {item.formality_level && <span>• {item.formality_level}</span>}
                      </div>
                      {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Style Icons Modal
export const StyleIconsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["style-icons-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("style_icons").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Style Icons</DialogTitle>
          <DialogDescription>Celebrity and historical style inspirations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.profession && <span>{item.profession}</span>}
                        {item.era && <span> • {item.era}</span>}
                        {item.nationality && <span> • {item.nationality}</span>}
                      </div>
                      {item.style_signature && <p className="text-sm text-muted-foreground mt-1 italic">"{item.style_signature}"</p>}
                    </div>
                    {item.wikipedia_url && (
                      <a href={item.wikipedia_url} target="_blank" rel="noreferrer" className="text-xs underline text-muted-foreground">Wiki</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Face Shapes Modal
export const FaceShapesModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["face-shapes-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("face_shapes").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Face Shapes</DialogTitle>
          <DialogDescription>Face shape classifications with styling recommendations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-4 hover:bg-muted/50">
                  <div className="font-medium text-lg">{item.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  {item.characteristics && Array.isArray(item.characteristics) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(item.characteristics as string[]).map((c, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Face Shape Recommendations Modal
export const FaceShapeRecommendationsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["face-shape-recommendations-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("face_shape_recommendations")
        .select("*, face_shapes(name)")
        .order("category");
      if (error) throw error;
      return data;
    },
  });

  // Group by face shape
  const grouped = data?.reduce((acc, item) => {
    const shapeName = (item.face_shapes as { name: string } | null)?.name || "Unknown";
    if (!acc[shapeName]) acc[shapeName] = [];
    acc[shapeName].push(item);
    return acc;
  }, {} as Record<string, typeof data>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Face Shape Recommendations</DialogTitle>
          <DialogDescription>Glasses, jewelry, necklines, and hairstyle recommendations by face shape</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <div className="space-y-6 p-1">
              {Object.entries(grouped || {}).map(([shapeName, recs]) => (
                <div key={shapeName} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">{shapeName} Face</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(recs as typeof data)?.map((rec) => (
                      <div key={rec.id} className="bg-muted/30 rounded p-3">
                        <Badge className="mb-2">{rec.category}</Badge>
                        <p className="text-sm font-medium">{rec.recommendation}</p>
                        {rec.why_it_works && <p className="text-xs text-muted-foreground mt-1">Why: {rec.why_it_works}</p>}
                        {rec.avoid && <p className="text-xs text-red-600 mt-1">Avoid: {rec.avoid}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Interior Designs Modal
export const InteriorDesignsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["interior-designs-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("interior_designs").select("*, subtypes(name)").order("title");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Interior Designs</DialogTitle>
          <DialogDescription>Home styling recommendations by subtype</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.title || item.style_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.room_type && <Badge variant="outline" className="mr-1">{item.room_type}</Badge>}
                    {item.subtypes && <span>• For: {(item.subtypes as { name: string }).name}</span>}
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Seasonal Dressing Guides Modal
export const SeasonalDressingModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seasonal-dressing-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("seasonal_dressing_guides").select("*, subtypes(name)").order("weather_season");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Seasonal Dressing Guides</DialogTitle>
          <DialogDescription>Weather-based styling recommendations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge>{item.weather_season}</Badge>
                    {item.subtypes && <span className="text-sm">• {(item.subtypes as { name: string }).name}</span>}
                  </div>
                  {item.layering_advice && <p className="text-sm text-muted-foreground mt-2">{item.layering_advice}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Alternate Seasons Modal
export const AlternateSeasonsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["alternate-seasons-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alternate_seasons")
        .select("*, primary:subtypes!alternate_seasons_primary_subtype_id_fkey(name), alternate:subtypes!alternate_seasons_alternate_subtype_id_fkey(name)")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Alternate Seasons</DialogTitle>
          <DialogDescription>Dual-season mappings for overlapping subtypes</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{(item.primary as { name: string } | null)?.name}</Badge>
                    <span>→</span>
                    <Badge variant="secondary">{(item.alternate as { name: string } | null)?.name}</Badge>
                    {item.overlap_percentage && <span className="text-xs text-muted-foreground ml-2">{item.overlap_percentage}% overlap</span>}
                  </div>
                  {item.when_to_use_alternate && <p className="text-sm text-muted-foreground">{item.when_to_use_alternate}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Occasion Outfit Mappings Modal
export const OccasionOutfitMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["occasion-outfit-mappings"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtype_occasion_outfits")
        .select("*, subtypes(name), occasions(name)")
        .order("created_at");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Occasion Outfit Mappings</DialogTitle>
          <DialogDescription>Subtype-specific outfit recommendations per occasion</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{(item.subtypes as { name: string } | null)?.name}</Badge>
                    <span>•</span>
                    <Badge variant="outline">{(item.occasions as { name: string } | null)?.name}</Badge>
                  </div>
                  {item.outfit_description && <p className="text-sm text-muted-foreground">{item.outfit_description}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Style Icon Mappings Modal
export const StyleIconMappingsModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["style-icon-mappings"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtype_style_icons")
        .select("*, subtypes(name), style_icons(name, profession)")
        .order("subtype_id");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Style Icon Mappings</DialogTitle>
          <DialogDescription>Celebrity inspirations linked to subtypes</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Badge>{(item.subtypes as { name: string } | null)?.name}</Badge>
                    <span>→</span>
                    <span className="font-medium">{(item.style_icons as { name: string; profession: string } | null)?.name}</span>
                    {(item.style_icons as { name: string; profession: string } | null)?.profession && (
                      <span className="text-xs text-muted-foreground">({(item.style_icons as { name: string; profession: string }).profession})</span>
                    )}
                  </div>
                  {item.notes && <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Cultural Clothing Modal
export const CulturalClothingModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cultural-clothing-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("cultural_clothing").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Cultural Clothing</DialogTitle>
          <DialogDescription>Traditional garments from around the world</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.culture && <Badge variant="outline" className="mr-1">{item.culture}</Badge>}
                    {item.region && <span>• {item.region}</span>}
                    {item.time_period && <span> • {item.time_period}</span>}
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Nature Photos Modal
export const NaturePhotosModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nature-photos-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("nature_photos").select("*, seasons(name), subtypes(name)").order("title");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Nature Photos</DialogTitle>
          <DialogDescription>Seasonal nature imagery for color inspiration</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.title || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="mr-1">{item.category}</Badge>
                    {item.mood && <span>• {item.mood}</span>}
                    {item.seasons && <span> • {(item.seasons as { name: string }).name}</span>}
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Era Photos Modal
export const EraPhotosModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["era-photos-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.from("era_photos").select("*, historical_eras(name)").order("title");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Era Photos</DialogTitle>
          <DialogDescription>Historical fashion photography</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="font-medium">{item.title || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.historical_eras && <Badge variant="outline" className="mr-1">{(item.historical_eras as { name: string }).name}</Badge>}
                    {item.year_approximate && <span>• ~{item.year_approximate}</span>}
                    {item.source && <span> • {item.source}</span>}
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Outfit Links Modal
export const OutfitLinksModal = ({ open, onOpenChange }: ModalProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["outfit-links-list"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("outfit_links")
        .select("*, subtypes(name), occasions(name), body_types(name)")
        .order("product_name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Outfit Links</DialogTitle>
          <DialogDescription>Shoppable outfit recommendations</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {isLoading ? <LoadingSkeleton /> : error ? <ErrorMessage /> : !data?.length ? <EmptyMessage /> : (
            <ul className="divide-y">
              {data.map((item) => (
                <li key={item.id} className="p-3 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.product_name || "Unnamed product"}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.retailer && <Badge variant="outline" className="mr-1">{item.retailer}</Badge>}
                        {item.price_tier && <span>• {item.price_tier}</span>}
                        {item.subtypes && <span> • {(item.subtypes as { name: string }).name}</span>}
                      </div>
                    </div>
                    {item.product_url && (
                      <a href={item.product_url} target="_blank" rel="noreferrer" className="text-xs underline text-primary">Shop</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Helper components
const LoadingSkeleton = () => (
  <div className="p-4 space-y-2">
    <Skeleton className="h-5 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

const ErrorMessage = () => (
  <div className="p-4 text-sm text-muted-foreground">Couldn't load data.</div>
);

const EmptyMessage = () => (
  <div className="p-4 text-sm text-muted-foreground">No items found.</div>
);
