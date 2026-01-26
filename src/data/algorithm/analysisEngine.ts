/**
 * STREAMS OF COLOR - COMPLETE AI ALGORITHM
 * =========================================
 * Part 4: AI Analysis Engine
 * 
 * This is the core algorithm for analyzing photos and matching to subtypes
 */

// =============================================================================
// SECTION 1: COLOR ANALYSIS RANGES (RGB/HSL)
// =============================================================================

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface PhotoData {
  skinColors: ColorRGB[];
  eyeColors: ColorRGB[];
  hairColors: ColorRGB[];
  naturalLight?: boolean;
  clearSkin?: boolean;
  clearEyes?: boolean;
}

interface AnalysisResult {
  skinUndertone: string;
  skinDepth: string;
  eyeColor: string;
  hairColor: string;
  contrast: string;
  clarity: string;
  skinDescription?: string;
  eyeDescription?: string;
  hairDescription?: string;
}

export const COLOR_RANGES = {
  
  // SKIN UNDERTONE DETECTION
  skinUndertones: {
    warm: {
      description: "Yellow, golden, peachy undertones",
      hueRange: [15, 45] as [number, number],
      indicators: ["Terra Cotta", "Apricot", "Golden", "Peach", "Cream with yellow"]
    },
    cool: {
      description: "Pink, blue, rose undertones",
      hueRange: [330, 360] as [number, number],
      hueRange2: [0, 15] as [number, number],
      indicators: ["Rose", "Pink", "Mauve", "Porcelain", "Cream with pink"]
    },
    neutral: {
      description: "Mix of warm and cool",
      indicators: ["Can wear both gold and silver", "Olive undertones"]
    }
  },
  
  // SKIN DEPTH
  skinDepth: {
    light: { luminosity: [70, 100] as [number, number], description: "Porcelain, Ivory, Cream" },
    medium: { luminosity: [45, 70] as [number, number], description: "Beige, Tan, Medium Brown" },
    deep: { luminosity: [20, 45] as [number, number], description: "Dark Brown, Espresso, Deep" }
  },
  
  // EYE COLOR CATEGORIES
  eyeColors: {
    blue: {
      hueRange: [200, 240] as [number, number],
      variants: ["Sapphire", "Sky Blue", "Slate Blue", "Grey Blue", "Ice Blue"]
    },
    green: {
      hueRange: [80, 160] as [number, number],
      variants: ["Emerald", "Seafoam", "Olive", "Bottle Green", "Golden Green"]
    },
    hazel: {
      description: "Mix of green, brown, gold",
      variants: ["Green-Gold", "Brown-Green", "Amber-Green"]
    },
    brown: {
      hueRange: [20, 45] as [number, number],
      variants: ["Golden Brown", "Dark Brown", "Black Brown", "Amber", "Topaz"]
    },
    grey: {
      saturation: [0, 20] as [number, number],
      variants: ["Silver Grey", "Blue Grey", "Green Grey"]
    }
  },
  
  // HAIR COLOR CATEGORIES
  hairColors: {
    blonde: {
      luminosity: [60, 90] as [number, number],
      variants: ["Platinum", "Golden Blonde", "Strawberry Blonde", "Ash Blonde"]
    },
    brown: {
      luminosity: [25, 60] as [number, number],
      variants: ["Golden Brown", "Chocolate", "Chestnut", "Amber", "Cocoa", "Caramel"]
    },
    black: {
      luminosity: [0, 25] as [number, number],
      variants: ["Black", "Black-Brown", "Blue-Black"]
    },
    red: {
      hueRange: [0, 30] as [number, number],
      saturation: [40, 100] as [number, number],
      variants: ["Auburn", "Copper", "Ginger", "Strawberry"]
    },
    grey: {
      saturation: [0, 15] as [number, number],
      variants: ["Silver", "Salt and Pepper", "White"]
    }
  }
};

// =============================================================================
// SECTION 2: SEASON DETERMINATION LOGIC
// =============================================================================

export const SEASON_RULES = {
  
  spring: {
    skinIndicators: ["Warm undertone", "Light to medium depth", "Clear, bright complexion"],
    eyeIndicators: ["Clear, bright eyes", "Blue, Green, or Light Brown"],
    hairIndicators: ["Golden tones", "Warm blonde to medium brown"],
    overallContrast: "Low to Medium",
    colorHarmony: "Warm, clear, bright colors"
  },
  
  summer: {
    skinIndicators: ["Cool undertone", "Light to medium depth", "Soft, muted complexion"],
    eyeIndicators: ["Soft, muted eyes", "Blue, Grey, Soft Green, Rose Brown"],
    hairIndicators: ["Ash tones", "No golden highlights naturally"],
    overallContrast: "Low to Medium",
    colorHarmony: "Cool, soft, muted colors"
  },
  
  autumn: {
    skinIndicators: ["Warm undertone", "Medium to deep depth", "Rich, earthy complexion"],
    eyeIndicators: ["Warm, rich eyes", "Green, Hazel, Brown, Amber"],
    hairIndicators: ["Warm tones", "Red highlights, Golden brown to dark brown"],
    overallContrast: "Medium to High",
    colorHarmony: "Warm, muted, rich colors"
  },
  
  winter: {
    skinIndicators: ["Cool undertone", "Any depth", "Clear, high contrast complexion"],
    eyeIndicators: ["Clear, intense eyes", "Dark Brown, Black, Clear Blue or Green"],
    hairIndicators: ["Cool tones", "Dark brown to black, or very light ash"],
    overallContrast: "High",
    colorHarmony: "Cool, clear, intense colors"
  }
};

// =============================================================================
// SECTION 3: SUBTYPE MATCHING ALGORITHM
// =============================================================================

export function analyzePhoto(photoData: PhotoData) {
  /**
   * Main analysis function
   * Input: photoData object with extracted color values
   * Output: Ranked list of matching subtypes with confidence scores
   */
  
  const analysis: AnalysisResult = {
    skinUndertone: detectUndertone(photoData.skinColors),
    skinDepth: detectDepth(photoData.skinColors),
    eyeColor: categorizeEyeColor(photoData.eyeColors),
    hairColor: categorizeHairColor(photoData.hairColors),
    contrast: calculateContrast(photoData),
    clarity: assessClarity(photoData)
  };
  
  // Step 1: Determine primary season
  const seasonScores = scoreSeason(analysis);
  
  // Step 2: Score subtypes within top seasons
  const subtypeScores = scoreSubtypes(analysis, seasonScores);
  
  // Step 3: Generate top 3 matches with confidence
  return generateResults(subtypeScores, analysis, photoData);
}

function categorizeEyeColor(eyeColors: ColorRGB[]): string {
  if (!eyeColors || eyeColors.length === 0) return "unknown";
  
  const avgHsl = eyeColors.reduce((acc, color) => {
    const hsl = rgbToHsl(color);
    return { h: acc.h + hsl.h, s: acc.s + hsl.s, l: acc.l + hsl.l };
  }, { h: 0, s: 0, l: 0 });
  
  avgHsl.h /= eyeColors.length;
  avgHsl.s /= eyeColors.length;
  avgHsl.l /= eyeColors.length;
  
  if (avgHsl.s < 20) return "grey";
  if (avgHsl.h >= 200 && avgHsl.h <= 240) return "blue";
  if (avgHsl.h >= 80 && avgHsl.h <= 160) return "green";
  if (avgHsl.h >= 20 && avgHsl.h <= 45) return "brown";
  return "hazel";
}

function categorizeHairColor(hairColors: ColorRGB[]): string {
  if (!hairColors || hairColors.length === 0) return "unknown";
  
  const avgLum = getAverageLuminosity(hairColors);
  const avgHsl = hairColors.reduce((acc, color) => {
    const hsl = rgbToHsl(color);
    return { h: acc.h + hsl.h, s: acc.s + hsl.s, l: acc.l + hsl.l };
  }, { h: 0, s: 0, l: 0 });
  
  avgHsl.s /= hairColors.length;
  
  if (avgHsl.s < 15) return "grey";
  if (avgLum >= 60) return "blonde";
  if (avgLum <= 25) return "black";
  return "brown";
}

function assessClarity(photoData: PhotoData): string {
  // Simplified clarity assessment based on color saturation
  const allColors = [...photoData.skinColors, ...photoData.eyeColors, ...photoData.hairColors];
  const avgSaturation = allColors.reduce((sum, color) => {
    const hsl = rgbToHsl(color);
    return sum + hsl.s;
  }, 0) / allColors.length;
  
  return avgSaturation > 50 ? "clear" : "muted";
}

export function detectUndertone(skinColors: ColorRGB[]): string {
  /**
   * Analyze skin colors to determine warm/cool/neutral undertone
   */
  let warmScore = 0;
  let coolScore = 0;
  
  skinColors.forEach(color => {
    const hsl = rgbToHsl(color);
    
    // Check hue position
    if (hsl.h >= 15 && hsl.h <= 45) warmScore += 2;
    if (hsl.h >= 330 || hsl.h <= 15) coolScore += 2;
    
    // Check for golden vs pink tints
    if (color.r > color.b) warmScore += 1;
    if (color.b > color.r * 0.9) coolScore += 1;
  });
  
  if (Math.abs(warmScore - coolScore) <= 2) return "neutral";
  return warmScore > coolScore ? "warm" : "cool";
}

export function detectDepth(skinColors: ColorRGB[]): string {
  /**
   * Analyze luminosity to determine skin depth
   */
  const avgLuminosity = skinColors.reduce((sum, c) => {
    return sum + (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 * 100;
  }, 0) / skinColors.length;
  
  if (avgLuminosity >= 70) return "light";
  if (avgLuminosity >= 45) return "medium";
  return "deep";
}

export function calculateContrast(photoData: PhotoData): string {
  /**
   * Calculate contrast level between features
   */
  const skinLum = getAverageLuminosity(photoData.skinColors);
  const hairLum = getAverageLuminosity(photoData.hairColors);
  const eyeLum = getAverageLuminosity(photoData.eyeColors);
  
  const skinHairContrast = Math.abs(skinLum - hairLum);
  const skinEyeContrast = Math.abs(skinLum - eyeLum);
  
  const avgContrast = (skinHairContrast + skinEyeContrast) / 2;
  
  if (avgContrast >= 40) return "high";
  if (avgContrast >= 20) return "medium";
  return "low";
}

export function scoreSeason(analysis: AnalysisResult): Record<string, number> {
  /**
   * Score each season based on analysis results
   */
  const scores: Record<string, number> = {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0
  };
  
  // Undertone scoring
  if (analysis.skinUndertone === "warm") {
    scores.spring += 30;
    scores.autumn += 30;
  } else if (analysis.skinUndertone === "cool") {
    scores.summer += 30;
    scores.winter += 30;
  } else {
    // Neutral can go either way
    scores.spring += 15;
    scores.summer += 15;
    scores.autumn += 15;
    scores.winter += 15;
  }
  
  // Contrast scoring
  if (analysis.contrast === "high") {
    scores.winter += 25;
    scores.autumn += 10;
  } else if (analysis.contrast === "low") {
    scores.spring += 20;
    scores.summer += 20;
  } else {
    scores.spring += 10;
    scores.summer += 10;
    scores.autumn += 15;
    scores.winter += 10;
  }
  
  // Clarity scoring
  if (analysis.clarity === "clear") {
    scores.spring += 15;
    scores.winter += 15;
  } else {
    scores.summer += 15;
    scores.autumn += 15;
  }
  
  // Depth scoring
  if (analysis.skinDepth === "light") {
    scores.spring += 10;
    scores.summer += 10;
  } else if (analysis.skinDepth === "deep") {
    scores.autumn += 10;
    scores.winter += 10;
  }
  
  return scores;
}

// =============================================================================
// SECTION 4: SUBTYPE SPECIFIC SCORING
// =============================================================================

export const SUBTYPE_INDICATORS: Record<string, {
  skinTones: string[];
  eyeColors: string[];
  hairColors: string[];
  keyColors: string[];
  contrast: string;
}> = {
  
  // SUMMER SUBTYPES
  ballerinaSummer: {
    skinTones: ["Rose", "Dusty Rose", "Cream"],
    eyeColors: ["Dark Brown", "Gold"],
    hairColors: ["Chocolate", "Amber"],
    keyColors: ["Emerald", "Lavender", "Rose"],
    contrast: "low-medium"
  },
  
  porcelainSummer: {
    skinTones: ["Rose", "Rose Mauve", "Pale Mauve", "Cream", "Pink-Cream"],
    eyeColors: ["Midnight Blue", "Sapphire Blue", "Blue-Grey"],
    hairColors: ["Golden Brown", "Amber", "Chocolate"],
    keyColors: ["Sapphire", "Emerald", "Lavender"],
    contrast: "medium"
  },
  
  chinoiserieSummer: {
    skinTones: ["Rose", "Apricot Rose", "Dusty Rose", "Rose-Terra Cotta"],
    eyeColors: ["Blue green", "Aquamarine", "Sapphire"],
    hairColors: ["Golden Brown", "Chestnut", "Topaz"],
    keyColors: ["Teal", "Emerald", "Sapphire"],
    contrast: "medium"
  },
  
  degasSummer: {
    skinTones: ["Mauve", "Pink Mauve", "Gray pink"],
    eyeColors: ["Blue-Green", "Seafoam", "Gray Green"],
    hairColors: ["Mushroom", "Taupe", "Soft Brown"],
    keyColors: ["Mauve", "Seafoam", "Soft Purple"],
    contrast: "low"
  },
  
  // AUTUMN SUBTYPES
  burnishedAutumn: {
    skinTones: ["Terra Cotta", "Apricot", "Apricot Cream"],
    eyeColors: ["Amber", "Gold"],
    hairColors: ["Amber", "Topaz", "Chocolate"],
    keyColors: ["Emerald", "Prussian Blue", "Burgundy"],
    contrast: "medium-high"
  },
  
  cloisonneAutumn: {
    skinTones: ["Rose", "Rose-Peach", "Apricot", "Pink Terra Cotta"],
    eyeColors: ["Blue-Green", "Emerald", "Seafoam"],
    hairColors: ["Chocolate Brown", "Amber", "Golden Brown"],
    keyColors: ["Aquamarine", "Tiffany blue", "Emerald"],
    contrast: "medium"
  },
  
  mellowAutumn: {
    skinTones: ["Terra Cotta", "Apricot", "Soft Coral", "Peach-Rose"],
    eyeColors: ["Golden Brown", "Gold", "Olive", "Golden Green"],
    hairColors: ["Chocolate", "Amber", "Topaz"],
    keyColors: ["Teal", "Emerald", "Burgundy"],
    contrast: "medium"
  },
  
  sunlitAutumn: {
    skinTones: ["Terra Cotta", "Rose Terra Cotta", "Apricot"],
    eyeColors: ["Blue Green", "Olive Green", "Light Olive"],
    hairColors: ["Walnut", "Dark Brown", "Golden Brown", "Caramel"],
    keyColors: ["Bright blue", "Emerald", "Burgundy"],
    contrast: "medium-high"
  },
  
  // WINTER SUBTYPES
  tapestryWinter: {
    skinTones: ["Brown-Mauve", "Pink-Mauve", "Brown Champagne"],
    eyeColors: ["Golden Green", "Topaz", "Olive", "Grey-Green"],
    hairColors: ["Chocolate Brown", "Dark Amber", "Burnt Sienna"],
    keyColors: ["Emerald", "Peacock Blue", "Burgundy"],
    contrast: "high"
  },
  
  mediterraneanWinter: {
    skinTones: ["Dark Terra Cotta", "Rose Terra Cotta", "Dark Apricot"],
    eyeColors: ["Amber", "Copper", "Topaz"],
    hairColors: ["Chocolate Brown", "Black Brown"],
    keyColors: ["Prussian Blue", "Teal", "Burgundy"],
    contrast: "high"
  },
  
  gemstoneWinter: {
    skinTones: ["Terra Cotta Rose", "Apricot Rose", "Mauve Rose"],
    eyeColors: ["Golden Green", "Green", "Olive"],
    hairColors: ["Chocolate", "Black-Brown", "Amber"],
    keyColors: ["Electric Blue", "Sapphire", "Wine"],
    contrast: "high"
  },
  
  ornamentalWinter: {
    skinTones: ["Rose-Terra Cotta", "Dusty Peach", "Dark Rose"],
    eyeColors: ["Golden-Green", "Seafoam", "Silver-Green", "Forest Green"],
    hairColors: ["Chocolate Brown", "Copper Brown", "Deep Amber"],
    keyColors: ["Peacock Blue", "Royal Blue", "Burgundy"],
    contrast: "medium-high"
  }
};

interface SubtypeScore {
  subtypeId: string;
  score: number;
  confidence: string;
}

export function scoreSubtypes(analysis: AnalysisResult, seasonScores: Record<string, number>): SubtypeScore[] {
  /**
   * Score individual subtypes based on feature matching
   */
  const results: SubtypeScore[] = [];
  
  // Score each subtype
  Object.entries(SUBTYPE_INDICATORS).forEach(([subtypeId, indicators]) => {
    let score = 0;
    
    // Check skin tone match
    const skinMatch = findBestMatch(analysis.skinDescription || "", indicators.skinTones);
    score += skinMatch * 25;
    
    // Check eye color match
    const eyeMatch = findBestMatch(analysis.eyeDescription || "", indicators.eyeColors);
    score += eyeMatch * 25;
    
    // Check hair color match
    const hairMatch = findBestMatch(analysis.hairDescription || "", indicators.hairColors);
    score += hairMatch * 20;
    
    // Check contrast match
    if (analysis.contrast === indicators.contrast || 
        indicators.contrast.includes(analysis.contrast)) {
      score += 15;
    }
    
    // Add season base score
    const subtypeSeason = getSubtypeSeason(subtypeId);
    score += (seasonScores[subtypeSeason] || 0) * 0.5;
    
    results.push({
      subtypeId,
      score,
      confidence: calculateConfidence(score)
    });
  });
  
  return results.sort((a, b) => b.score - a.score);
}

// =============================================================================
// SECTION 5: HELPER FUNCTIONS
// =============================================================================

function rgbToHsl(color: ColorRGB): HSL {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function getAverageLuminosity(colors: ColorRGB[]): number {
  if (!colors || colors.length === 0) return 50;
  return colors.reduce((sum, c) => {
    return sum + (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255 * 100;
  }, 0) / colors.length;
}

function findBestMatch(description: string, options: string[]): number {
  if (!description || !options) return 0;
  
  const descLower = description.toLowerCase();
  let bestMatch = 0;
  
  options.forEach(option => {
    const optLower = option.toLowerCase();
    if (descLower.includes(optLower) || optLower.includes(descLower)) {
      bestMatch = 1;
    } else if (descLower.split(' ').some(word => optLower.includes(word))) {
      bestMatch = Math.max(bestMatch, 0.5);
    }
  });
  
  return bestMatch;
}

function getSubtypeSeason(subtypeId: string): string {
  if (subtypeId.includes('Summer')) return 'summer';
  if (subtypeId.includes('Autumn')) return 'autumn';
  if (subtypeId.includes('Winter')) return 'winter';
  if (subtypeId.includes('Spring')) return 'spring';
  return 'summer'; // default
}

function calculateConfidence(score: number): string {
  if (score >= 80) return "high";
  if (score >= 60) return "medium-high";
  if (score >= 40) return "medium";
  return "low";
}

function generateResults(subtypeScores: SubtypeScore[], analysis: AnalysisResult, photoData: PhotoData) {
  const top3 = subtypeScores.slice(0, 3);
  
  return {
    primaryMatch: top3[0],
    alternateMatches: top3.slice(1),
    analysis: analysis,
    recommendations: {
      needsNechamaReview: top3[0]?.confidence !== "high",
      suggestedPhotos: getSuggestedPhotos(photoData),
      notes: generateNotes(top3, analysis)
    }
  };
}

function getSuggestedPhotos(photoData: PhotoData): string[] {
  const suggestions: string[] = [];
  
  if (!photoData.naturalLight) {
    suggestions.push("Photo in natural daylight near a window");
  }
  if (!photoData.clearSkin) {
    suggestions.push("Close-up photo showing bare skin (no makeup)");
  }
  if (!photoData.clearEyes) {
    suggestions.push("Photo with eyes clearly visible");
  }
  
  return suggestions;
}

function generateNotes(top3: SubtypeScore[], analysis: AnalysisResult): string[] {
  const notes: string[] = [];
  
  if (top3.length >= 2 && top3[0].score - top3[1].score < 10) {
    notes.push("Close match between top 2 subtypes - Nechama review recommended");
  }
  
  if (analysis.skinUndertone === "neutral") {
    notes.push("Neutral undertone detected - could fall into either warm or cool season");
  }
  
  return notes;
}

// =============================================================================
// SECTION 6: EXPORT COMPLETE ALGORITHM
// =============================================================================

export default {
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
