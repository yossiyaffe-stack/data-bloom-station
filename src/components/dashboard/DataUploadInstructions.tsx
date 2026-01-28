import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  Upload, Info, CheckCircle2, MessageSquare,
  Palette, Shirt, Paintbrush, PenTool, Gem, CircleDot, 
  Grid3X3, Clock, User, Users, Calendar, Hexagon 
} from "lucide-react";
import { TableImporter, TABLE_IMPORT_CONFIGS, ImportableTable } from "./TableImporter";

const IMPORT_BUTTONS: { key: ImportableTable; label: string; icon: React.ElementType }[] = [
  { key: 'colors', label: 'Colors', icon: Palette },
  { key: 'fabrics', label: 'Fabrics', icon: Shirt },
  { key: 'artists', label: 'Artists', icon: Paintbrush },
  { key: 'designers', label: 'Designers', icon: PenTool },
  { key: 'gemstones', label: 'Gemstones', icon: Gem },
  { key: 'metals', label: 'Metals', icon: CircleDot },
  { key: 'prints', label: 'Prints', icon: Grid3X3 },
  { key: 'historical_eras', label: 'Eras', icon: Clock },
  { key: 'body_types', label: 'Body Types', icon: User },
  { key: 'style_icons', label: 'Style Icons', icon: Users },
  { key: 'occasions', label: 'Occasions', icon: Calendar },
  { key: 'face_shapes', label: 'Face Shapes', icon: Hexagon },
];

export const DataUploadInstructions = () => {
  const [activeImporter, setActiveImporter] = useState<ImportableTable | null>(null);

  const activeConfig = activeImporter ? TABLE_IMPORT_CONFIGS[activeImporter] : null;

  return (
    <>
      <Alert className="mb-8 border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Data Upload Guidelines
        </AlertTitle>
        <AlertDescription className="mt-3 text-blue-800 dark:text-blue-200">
          <div className="grid md:grid-cols-2 gap-6 mt-2">
            {/* Safe for Direct Import */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                <Upload className="h-4 w-4" />
                <span>Safe for Direct Import (CSV/JSON)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Click any button below to import data into standalone reference tables:
              </p>
              
              {/* Import Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {IMPORT_BUTTONS.map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 bg-white/50 dark:bg-gray-900/50 hover:bg-green-50 dark:hover:bg-green-950/30 border-green-200 dark:border-green-800"
                    onClick={() => setActiveImporter(key)}
                  >
                    <Icon className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat-Based Import Required */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-orange-700 dark:text-orange-400">
                <MessageSquare className="h-4 w-4" />
                <span>Chat-Based Import Required</span>
              </div>
              <p className="text-sm text-muted-foreground">
                These junction/mapping tables require ID resolution and relationship validation:
              </p>
              <ul className="text-sm space-y-1 ml-4 text-orange-800 dark:text-orange-300">
                <li>• <strong>Subtype ↔ Colors</strong> — links colors to specific subtypes</li>
                <li>• <strong>Subtype ↔ Artists</strong> — artist recommendations per subtype</li>
                <li>• <strong>Subtype ↔ Fabrics</strong> — fabric ratings by subtype</li>
                <li>• <strong>Subtype ↔ Gemstones</strong> — gemstone mappings</li>
                <li>• <strong>Subtype ↔ Metals</strong> — metal preferences</li>
                <li>• <strong>Subtype ↔ Eras</strong> — historical era associations</li>
                <li>• <strong>Subtype ↔ Designers</strong> — designer recommendations</li>
                <li>• <strong>Subtype ↔ Prints</strong> — print pattern mappings</li>
                <li>• <strong>Makeup Recommendations</strong> — requires subtype_id</li>
                <li>• <strong>Face Shape Recommendations</strong> — requires face_shape_id</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Paste data in chat with context, and I'll validate relationships and insert safely.
              </p>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Table Importer Modal */}
      {activeConfig && (
        <TableImporter
          tableName={activeConfig.tableName}
          displayName={activeConfig.displayName}
          requiredFields={activeConfig.requiredFields}
          optionalFields={activeConfig.optionalFields}
          open={!!activeImporter}
          onOpenChange={(open) => !open && setActiveImporter(null)}
        />
      )}
    </>
  );
};
