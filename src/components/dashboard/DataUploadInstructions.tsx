import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, MessageSquare, Upload } from "lucide-react";

export const DataUploadInstructions = () => {
  return (
    <Alert className="mb-8 border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <Info className="h-5 w-5 text-blue-600" />
      <AlertTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
        Data Upload Guidelines
      </AlertTitle>
      <AlertDescription className="mt-3 text-blue-800 dark:text-blue-200">
        <div className="grid md:grid-cols-2 gap-6 mt-2">
          {/* Safe for Direct Import */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
              <Upload className="h-4 w-4" />
              <span>Safe for Direct Import (CSV/JSON)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              These standalone reference tables have no foreign key dependencies:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Colors</strong> — hex, name, category, warmth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Fabrics</strong> — name, category, characteristics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Artists</strong> — name, era, style, works</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Designers</strong> — name, brand style, price tier</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Gemstones</strong> — name, color, symbolism</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Metals</strong> — name, warmth, price tier</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Prints</strong> — name, category, keywords</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Historical Eras</strong> — name, period, style notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Body Types</strong> — name, system, characteristics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Style Icons</strong> — name, profession, era</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Occasions</strong> — name, category, formality</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span><strong>Face Shapes</strong> — name, characteristics</span>
              </li>
            </ul>
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
  );
};
