import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileJson, FileSpreadsheet, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TableImporterProps {
  tableName: string;
  displayName: string;
  requiredFields: readonly string[];
  optionalFields?: readonly string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ParsedRow {
  [key: string]: unknown;
}

export const TableImporter = ({
  tableName,
  displayName,
  requiredFields,
  optionalFields = [],
  open,
  onOpenChange,
  onSuccess
}: TableImporterProps) => {
  const [rawData, setRawData] = useState("");
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const parseCSV = (text: string): ParsedRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) throw new Error("CSV must have header row and at least one data row");
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
    const rows: ParsedRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      const row: ParsedRow = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx] || null;
      });
      rows.push(row);
    }
    
    return rows;
  };

  const parseJSON = (text: string): ParsedRow[] => {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (parsed.data && Array.isArray(parsed.data)) return parsed.data;
    throw new Error("JSON must be an array or have a 'data' array property");
  };

  const handleParse = useCallback(() => {
    setParseError(null);
    setValidationErrors([]);
    setParsedData([]);

    if (!rawData.trim()) {
      setParseError("Please paste CSV or JSON data");
      return;
    }

    try {
      let data: ParsedRow[];
      const trimmed = rawData.trim();
      
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        data = parseJSON(trimmed);
      } else {
        data = parseCSV(trimmed);
      }

      if (data.length === 0) {
        setParseError("No data rows found");
        return;
      }

      // Normalize field names and add slugs
      const normalizedData = data.map((row, idx) => {
        const normalized: ParsedRow = {};
        Object.keys(row).forEach(key => {
          const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
          normalized[normalizedKey] = row[key];
        });
        
        // Auto-generate slug if not provided but name exists
        if (!normalized.slug && normalized.name) {
          normalized.slug = generateSlug(String(normalized.name));
        }

        return normalized;
      });

      // Validate required fields
      const errors: string[] = [];
      normalizedData.forEach((row, idx) => {
        requiredFields.forEach(field => {
          if (!row[field] && row[field] !== 0) {
            errors.push(`Row ${idx + 1}: Missing required field "${field}"`);
          }
        });
      });

      if (errors.length > 0) {
        setValidationErrors(errors.slice(0, 10)); // Show first 10 errors
        if (errors.length > 10) {
          setValidationErrors([...errors.slice(0, 10), `...and ${errors.length - 10} more errors`]);
        }
        return;
      }

      setParsedData(normalizedData);
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Failed to parse data");
    }
  }, [rawData, requiredFields]);

  const handleImport = async () => {
    if (parsedData.length === 0) return;

    setIsImporting(true);
    try {
      // Filter to only include valid fields
      const allFields = [...requiredFields, ...optionalFields, 'slug'];
      const cleanedData = parsedData.map(row => {
        const cleaned: ParsedRow = {};
        allFields.forEach(field => {
          if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
            cleaned[field] = row[field];
          }
        });
        return cleaned;
      });

      const { data, error } = await supabase
        .from(tableName as any)
        .upsert(cleanedData as any, { onConflict: 'slug' })
        .select();

      if (error) throw error;

      toast.success(`Successfully imported ${data?.length || parsedData.length} ${displayName} records`);
      setRawData("");
      setParsedData([]);
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Import error:", error);
      toast.error(error instanceof Error ? error.message : "Import failed");
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setRawData("");
    setParsedData([]);
    setParseError(null);
    setValidationErrors([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import {displayName}
          </DialogTitle>
          <DialogDescription>
            Paste CSV or JSON data below. Required fields: <strong>{requiredFields.join(', ')}</strong>
            {optionalFields.length > 0 && (
              <span className="block mt-1 text-xs">
                Optional: {optionalFields.join(', ')}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Format hints */}
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileSpreadsheet className="h-3 w-3" />
              <span>CSV: header row + data rows</span>
            </div>
            <div className="flex items-center gap-1">
              <FileJson className="h-3 w-3" />
              <span>JSON: array of objects</span>
            </div>
          </div>

          {/* Data input */}
          <Textarea
            placeholder={`Example CSV:\nname,hex,category\nRuby Red,#E0115F,accent\nSapphire Blue,#0F52BA,accent\n\nOr JSON:\n[{"name": "Ruby Red", "hex": "#E0115F", "category": "accent"}]`}
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />

          {/* Parse button */}
          <Button onClick={handleParse} variant="secondary" className="w-full">
            Validate & Preview
          </Button>

          {/* Parse error */}
          {parseError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{parseError}</AlertDescription>
            </Alert>
          )}

          {/* Validation errors */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="text-sm space-y-1">
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Success preview */}
          {parsedData.length > 0 && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>{parsedData.length} records</strong> validated and ready to import.
                <div className="mt-2 text-xs max-h-32 overflow-y-auto">
                  Preview: {parsedData.slice(0, 3).map(r => r.name || r.slug || JSON.stringify(r)).join(', ')}
                  {parsedData.length > 3 && ` ...and ${parsedData.length - 3} more`}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={parsedData.length === 0 || isImporting}
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Import {parsedData.length > 0 ? parsedData.length : ''} Records
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Table configurations for easy reuse
export const TABLE_IMPORT_CONFIGS = {
  colors: {
    tableName: 'colors',
    displayName: 'Colors',
    requiredFields: ['name', 'hex', 'category'],
    optionalFields: ['warmth', 'hsl_h', 'hsl_s', 'hsl_l', 'seasons']
  },
  fabrics: {
    tableName: 'fabrics',
    displayName: 'Fabrics',
    requiredFields: ['name', 'category'],
    optionalFields: ['characteristics', 'keywords', 'formality_level', 'care_level', 'quality_notes']
  },
  artists: {
    tableName: 'artists',
    displayName: 'Artists',
    requiredFields: ['name'],
    optionalFields: ['era', 'style', 'color_characteristics', 'notable_works', 'wikipedia_url', 'seasons_affinity']
  },
  designers: {
    tableName: 'designers',
    displayName: 'Designers',
    requiredFields: ['name'],
    optionalFields: ['brand_style', 'price_tier', 'website_url', 'signature_elements', 'seasons_affinity']
  },
  gemstones: {
    tableName: 'gemstones',
    displayName: 'Gemstones',
    requiredFields: ['name'],
    optionalFields: ['color_hex', 'description', 'symbolism', 'seasons']
  },
  metals: {
    tableName: 'metals',
    displayName: 'Metals',
    requiredFields: ['name'],
    optionalFields: ['color_hex', 'warmth', 'price_tier', 'description', 'seasons']
  },
  prints: {
    tableName: 'prints',
    displayName: 'Prints',
    requiredFields: ['name'],
    optionalFields: ['category', 'description', 'keywords']
  },
  historical_eras: {
    tableName: 'historical_eras',
    displayName: 'Historical Eras',
    requiredFields: ['name'],
    optionalFields: ['period', 'description', 'color_palette_notes', 'style_characteristics', 'seasons_affinity']
  },
  body_types: {
    tableName: 'body_types',
    displayName: 'Body Types',
    requiredFields: ['name'],
    optionalFields: ['system', 'description', 'characteristics', 'style_recommendations']
  },
  style_icons: {
    tableName: 'style_icons',
    displayName: 'Style Icons',
    requiredFields: ['name'],
    optionalFields: ['profession', 'era', 'birth_year', 'nationality', 'style_signature', 'why_they_match', 'wikipedia_url', 'image_url', 'is_celebrity']
  },
  occasions: {
    tableName: 'occasions',
    displayName: 'Occasions',
    requiredFields: ['name'],
    optionalFields: ['category', 'description', 'formality_level', 'styling_principles']
  },
  face_shapes: {
    tableName: 'face_shapes',
    displayName: 'Face Shapes',
    requiredFields: ['name'],
    optionalFields: ['description', 'characteristics', 'visual_traits']
  }
} as const;

export type ImportableTable = keyof typeof TABLE_IMPORT_CONFIGS;
