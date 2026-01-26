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

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
