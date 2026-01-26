/**
 * STREAMS OF COLOR - COMPLETE AI ALGORITHM
 * =========================================
 * Master Index File
 * 
 * Merged from 42 of Nechama Yaffe's consultation documents
 * All client names removed for privacy
 * 
 * Last Updated: January 2026
 */

// Import all subtype definitions
import { SPRING_SUBTYPES, SUMMER_SUBTYPES } from './springSummerSubtypes';
import { AUTUMN_SUBTYPES } from './autumnSubtypes';
import { WINTER_SUBTYPES } from './winterSubtypes';

// Import analysis engine
import AnalysisEngine, {
  COLOR_RANGES,
  SEASON_RULES,
  SUBTYPE_INDICATORS,
  analyzePhoto,
  detectUndertone,
  detectDepth,
  calculateContrast,
  scoreSeason,
  scoreSubtypes
} from './analysisEngine';

// =============================================================================
// COMBINED DATABASE
// =============================================================================

export const ALL_SUBTYPES = {
  ...SPRING_SUBTYPES,
  ...SUMMER_SUBTYPES,
  ...AUTUMN_SUBTYPES,
  ...WINTER_SUBTYPES
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubtypeData = any;

// =============================================================================
// STATISTICS
// =============================================================================

export const DATABASE_STATS = {
  totalSubtypes: Object.keys(ALL_SUBTYPES).length,
  
  bySeason: {
    spring: Object.keys(SPRING_SUBTYPES).length,
    summer: Object.keys(SUMMER_SUBTYPES).length,
    autumn: Object.keys(AUTUMN_SUBTYPES).length,
    winter: Object.keys(WINTER_SUBTYPES).length
  },
  
  // Unique values extracted from Nechama's documents
  uniqueElements: {
    fabrics: extractUnique(ALL_SUBTYPES, 'fabrics'),
    prints: extractUnique(ALL_SUBTYPES, 'prints'),
    stones: extractUniqueStones(ALL_SUBTYPES),
    metals: extractUniqueMetals(ALL_SUBTYPES),
    designers: extractUnique(ALL_SUBTYPES, 'designers'),
    artists: extractUnique(ALL_SUBTYPES, 'artists'),
    eras: extractUnique(ALL_SUBTYPES, 'eras')
  },
  
  sourceDocuments: 42,
  lastUpdated: "January 2026"
};

// =============================================================================
// HELPER FUNCTIONS FOR STATS
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractUnique(subtypes: Record<string, any>, field: string): string[] {
  const all = new Set<string>();
  Object.values(subtypes).forEach(subtype => {
    const value = subtype[field];
    if (value && Array.isArray(value)) {
      value.forEach((item: unknown) => {
        if (typeof item === 'string') all.add(item);
      });
    }
  });
  return Array.from(all);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractUniqueStones(subtypes: Record<string, any>): string[] {
  const all = new Set<string>();
  Object.values(subtypes).forEach(subtype => {
    if (subtype.jewelry?.stones?.perfect) {
      subtype.jewelry.stones.perfect.forEach((s: string) => all.add(s));
    }
    if (subtype.jewelry?.stones?.good) {
      subtype.jewelry.stones.good.forEach((s: string) => all.add(s));
    }
  });
  return Array.from(all);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractUniqueMetals(subtypes: Record<string, any>): string[] {
  const all = new Set<string>();
  Object.values(subtypes).forEach(subtype => {
    if (subtype.jewelry?.metals?.perfect) {
      subtype.jewelry.metals.perfect.forEach((m: string) => all.add(m));
    }
  });
  return Array.from(all);
}

// =============================================================================
// LOOKUP FUNCTIONS
// =============================================================================

export function getSubtypeById(id: string): SubtypeData | null {
  return ALL_SUBTYPES[id] || null;
}

export function getSubtypesBySeason(season: string): Record<string, SubtypeData> {
  const seasonLower = season.toLowerCase();
  return Object.entries(ALL_SUBTYPES)
    .filter(([, data]) => data.season?.toLowerCase() === seasonLower)
    .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});
}

export function searchSubtypes(query: string): Record<string, SubtypeData> {
  const queryLower = query.toLowerCase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.entries(ALL_SUBTYPES as Record<string, any>)
    .filter(([id, data]) => {
      return id.toLowerCase().includes(queryLower) ||
             data.name?.toLowerCase().includes(queryLower) ||
             data.paletteEffects?.some((e: string) => e.toLowerCase().includes(queryLower)) ||
             data.artists?.some((a: string) => a.toLowerCase().includes(queryLower)) ||
             data.designers?.some((d: string) => d.toLowerCase().includes(queryLower));
    })
    .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});
}

export function getSubtypesByArtist(artist: string): Record<string, SubtypeData> {
  const artistLower = artist.toLowerCase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.entries(ALL_SUBTYPES as Record<string, any>)
    .filter(([, data]) => data.artists?.some((a: string) => a.toLowerCase().includes(artistLower)))
    .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});
}

export function getSubtypesByDesigner(designer: string): Record<string, SubtypeData> {
  const designerLower = designer.toLowerCase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.entries(ALL_SUBTYPES as Record<string, any>)
    .filter(([, data]) => data.designers?.some((d: string) => d.toLowerCase().includes(designerLower)))
    .reduce((acc, [id, data]) => ({ ...acc, [id]: data }), {});
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  SPRING_SUBTYPES,
  SUMMER_SUBTYPES,
  AUTUMN_SUBTYPES,
  WINTER_SUBTYPES,
  COLOR_RANGES,
  SEASON_RULES,
  SUBTYPE_INDICATORS,
  analyzePhoto,
  detectUndertone,
  detectDepth,
  calculateContrast,
  scoreSeason,
  scoreSubtypes
};

export default {
  ALL_SUBTYPES,
  DATABASE_STATS,
  getSubtypeById,
  getSubtypesBySeason,
  searchSubtypes,
  getSubtypesByArtist,
  getSubtypesByDesigner,
  analyzePhoto,
  AnalysisEngine
};
