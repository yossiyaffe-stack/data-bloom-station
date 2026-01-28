import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Layers, Check, X, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PhaseAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Season {
  id: string;
  name: string;
}

interface Phase {
  id: string;
  name: string;
  display_order: number;
  season_id: string;
}

interface Subtype {
  id: string;
  name: string;
  slug: string;
  phase_id: string | null;
  season_id: string | null;
  seasons: { name: string } | null;
}

export const PhaseAssignmentModal = ({ open, onOpenChange }: PhaseAssignmentModalProps) => {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch seasons
  const { data: seasons, isLoading: seasonsLoading } = useQuery({
    queryKey: ["seasons-for-phases"],
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seasons")
        .select("id, name")
        .order("name");
      if (error) throw error;
      return data as Season[];
    },
  });

  // Fetch phases for selected season
  const { data: phases, isLoading: phasesLoading } = useQuery({
    queryKey: ["phases-for-season", selectedSeason],
    enabled: open && !!selectedSeason,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("season_phases")
        .select("id, name, display_order, season_id")
        .eq("season_id", selectedSeason!)
        .order("display_order");
      if (error) throw error;
      return data as Phase[];
    },
  });

  // Fetch subtypes for selected season
  const { data: subtypes, isLoading: subtypesLoading } = useQuery({
    queryKey: ["subtypes-for-phases", selectedSeason],
    enabled: open && !!selectedSeason,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subtypes")
        .select("id, name, slug, phase_id, season_id, seasons(name)")
        .eq("season_id", selectedSeason!)
        .order("name");
      if (error) throw error;
      return data as Subtype[];
    },
  });

  // Update subtype phase mutation
  const updatePhaseMutation = useMutation({
    mutationFn: async ({ subtypeId, phaseId }: { subtypeId: string; phaseId: string | null }) => {
      const { error } = await supabase
        .from("subtypes")
        .update({ phase_id: phaseId })
        .eq("id", subtypeId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtypes-for-phases", selectedSeason] });
      toast.success("Phase assignment updated");
    },
    onError: (error) => {
      toast.error("Failed to update phase: " + (error as Error).message);
    },
  });

  // Delete subtype mutation
  const deleteSubtypeMutation = useMutation({
    mutationFn: async (subtypeId: string) => {
      const { error } = await supabase
        .from("subtypes")
        .delete()
        .eq("id", subtypeId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subtypes-for-phases", selectedSeason] });
      queryClient.invalidateQueries({ queryKey: ["subtypes"] });
      toast.success("Subtype deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete subtype: " + (error as Error).message);
    },
  });

  const handlePhaseChange = (subtypeId: string, phaseId: string) => {
    updatePhaseMutation.mutate({ 
      subtypeId, 
      phaseId: phaseId === "none" ? null : phaseId 
    });
  };

  const handleDeleteSubtype = (subtypeId: string) => {
    deleteSubtypeMutation.mutate(subtypeId);
  };

  const getSubtypesByPhase = (phaseId: string | null) => {
    if (!subtypes) return [];
    if (phaseId === null) {
      return subtypes.filter(s => s.phase_id === null);
    }
    return subtypes.filter(s => s.phase_id === phaseId);
  };

  const isLoading = seasonsLoading || phasesLoading || subtypesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Subtype Phase Assignment
          </DialogTitle>
          <DialogDescription>
            Organize subtypes into Early, Middle, and Late phases within each season
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Season Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Select Season:</label>
            <Select
              value={selectedSeason || ""}
              onValueChange={(value) => setSelectedSeason(value || null)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose a season..." />
              </SelectTrigger>
              <SelectContent>
                {seasons?.map((season) => (
                  <SelectItem key={season.id} value={season.id}>
                    {season.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phase Columns */}
          {selectedSeason && (
            <ScrollArea className="h-[60vh]">
              {isLoading ? (
                <div className="grid grid-cols-4 gap-4 p-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 p-2">
                  {/* Unassigned Column */}
                  <Card className="border-dashed border-2 border-muted-foreground/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <X className="h-4 w-4 text-muted-foreground" />
                        Unassigned
                        <Badge variant="secondary" className="ml-auto">
                          {getSubtypesByPhase(null).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {getSubtypesByPhase(null).map((subtype) => (
                        <SubtypeCard
                          key={subtype.id}
                          subtype={subtype}
                          phases={phases || []}
                          onPhaseChange={handlePhaseChange}
                          onDelete={handleDeleteSubtype}
                          isUpdating={updatePhaseMutation.isPending}
                          isDeleting={deleteSubtypeMutation.isPending}
                        />
                      ))}
                      {getSubtypesByPhase(null).length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">
                          All subtypes assigned
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Phase Columns */}
                  {phases?.map((phase) => (
                    <Card key={phase.id} className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {phase.name}
                          <Badge variant="outline" className="ml-auto">
                            {getSubtypesByPhase(phase.id).length}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {getSubtypesByPhase(phase.id).map((subtype) => (
                          <SubtypeCard
                            key={subtype.id}
                            subtype={subtype}
                            phases={phases || []}
                            currentPhaseId={phase.id}
                            onPhaseChange={handlePhaseChange}
                            onDelete={handleDeleteSubtype}
                            isUpdating={updatePhaseMutation.isPending}
                            isDeleting={deleteSubtypeMutation.isPending}
                          />
                        ))}
                        {getSubtypesByPhase(phase.id).length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-4">
                            No subtypes assigned
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}

          {!selectedSeason && (
            <div className="text-center py-12 text-muted-foreground">
              <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a season to manage subtype phases</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface SubtypeCardProps {
  subtype: Subtype;
  phases: Phase[];
  currentPhaseId?: string;
  onPhaseChange: (subtypeId: string, phaseId: string) => void;
  onDelete: (subtypeId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const SubtypeCard = ({ subtype, phases, currentPhaseId, onPhaseChange, onDelete, isUpdating, isDeleting }: SubtypeCardProps) => {
  return (
    <div className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium text-sm truncate flex-1">{subtype.name}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-destructive"
              disabled={isDeleting}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Subtype</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{subtype.name}"? This action cannot be undone and will remove all associated mappings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(subtype.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="mt-1">
        <Select
          value={subtype.phase_id || "none"}
          onValueChange={(value) => onPhaseChange(subtype.id, value)}
          disabled={isUpdating}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="Assign phase..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">— Unassigned —</SelectItem>
            {phases.map((phase) => (
              <SelectItem key={phase.id} value={phase.id}>
                {phase.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PhaseAssignmentModal;
