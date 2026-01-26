/**
 * KABBALISTIC COLOR SYSTEM
 * Based on R. David ben Yehudah he-Ḥasid's Diagram (13th-14th c.)
 * As documented by Moshe Idel in "Visualization of Colors"
 * Integrated with Nechama Yaffe's "Streams of Color" methodology
 */

// ============================================
// SEFIROT COLORS
// ============================================

export interface SefirahData {
  name: string;
  english: string;
  color: string;
  hex: string;
  quality: string;
  bodyPart: string;
  soulLevel: string;
  visualization: string;
  whenToWear: string;
  healing: string;
  patriarch?: string;
  matriarch?: string;
}

export const SEFIROT_COLORS: Record<string, SefirahData> = {
  keter: {
    name: "כתר",
    english: "Keter (Crown)",
    color: "White like snow (לבן כשלג)",
    hex: "#FFFAFA",
    quality: "The true Unity, united in all its names",
    bodyPart: "Crown of head",
    soulLevel: "Yechidah (singular unity)",
    visualization: "Transcends the structure of the ten sefirot",
    whenToWear: "For spiritual elevation, connection to the Infinite",
    healing: "For those seeking unity and transcendence"
  },
  chokmah: {
    name: "חכמה",
    english: "Chokmah (Wisdom)",
    color: "Blue of heaven (תכלית השמים)",
    hex: "#4A90D9",
    quality: "Heavenly wisdom, the first flash of insight",
    bodyPart: "Right brain",
    soulLevel: "Chayah (living essence)",
    visualization: "Clothed in blue with 377 lights of splendor",
    whenToWear: "For wisdom, insight, creative breakthroughs",
    healing: "For those who feel mentally blocked or lack inspiration"
  },
  binah: {
    name: "בינה",
    english: "Binah (Understanding)",
    color: "Green as the rainbow (ירוק כקשת)",
    hex: "#4CAF50",
    quality: "Where the holy beasts dwell, understanding that develops",
    bodyPart: "Left brain",
    soulLevel: "Neshamah (breath of God)",
    visualization: "Green like the rainbow - containing all possibilities",
    whenToWear: "For deep understanding, processing, maternal energy",
    healing: "For those who cannot integrate or understand life experiences"
  },
  chesed: {
    name: "גדולה/חסד",
    english: "Chesed (Loving-kindness)",
    color: "Refined silver (כסף צרוף)",
    hex: "#C0C0C0",
    quality: "Clothed in whiteness of silver and like white waters",
    bodyPart: "Right arm",
    soulLevel: "Ruach (spirit)",
    patriarch: "Avraham Avinu",
    visualization: "Pure silver light, expanding outward",
    whenToWear: "For generosity, expansion, beginning new things",
    healing: "For those who feel contracted, fearful, unable to give"
  },
  gevurah: {
    name: "גבורה",
    english: "Gevurah (Strength/Judgment)",
    color: "Red as fire (אדום כאש)",
    hex: "#C62828",
    quality: "Clothed in the likeness of fire",
    bodyPart: "Left arm",
    soulLevel: "Ruach (spirit)",
    patriarch: "Yitzchak Avinu",
    visualization: "Flaming red, concentrated power",
    whenToWear: "For courage, boundaries, discipline, focused action",
    healing: "For those too scattered, lacking self-discipline or courage"
  },
  tiferet: {
    name: "תפארת",
    english: "Tiferet (Beauty/Harmony)",
    color: "White tending to red (לובן נוטה לאדום)",
    hex: "#FFCDD2",
    quality: "Clothed in white and red - balance of opposites",
    bodyPart: "Heart/Torso",
    soulLevel: "Ruach (spirit)",
    patriarch: "Yaakov Avinu",
    visualization: "White suffused with rose - compassion",
    whenToWear: "For balance, truth, self-compassion, harmony",
    healing: "For those experiencing inner conflict"
  },
  netzach: {
    name: "נצח",
    english: "Netzach (Victory/Eternity)",
    color: "White tending to blue (לובן נוטה לתכלית)",
    hex: "#E3F2FD",
    quality: "Eternal victory through persistence",
    bodyPart: "Right leg",
    soulLevel: "Nefesh (vital soul)",
    patriarch: "Moshe Rabbeinu",
    visualization: "White with blue shimmer - endurance",
    whenToWear: "For persistence, ambition, overcoming obstacles",
    healing: "For those who give up easily or lack motivation"
  },
  hod: {
    name: "הוד",
    english: "Hod (Splendor/Gratitude)",
    color: "Green tending to red (ירוק נוטה לאדום)",
    hex: "#A5D6A7",
    quality: "Splendor through acknowledgment",
    bodyPart: "Left leg",
    soulLevel: "Nefesh (vital soul)",
    patriarch: "Aharon HaKohen",
    visualization: "Green with warm rose undertone",
    whenToWear: "For gratitude, humility, learning, acknowledgment",
    healing: "For those who are arrogant or disconnected from gratitude"
  },
  yesod: {
    name: "יסוד",
    english: "Yesod (Foundation)",
    color: "Blue tending to black (תכלית נוטה לשחור)",
    hex: "#3F51B5",
    quality: "Foundation connecting all above to below",
    bodyPart: "Reproductive organs",
    soulLevel: "Nefesh (vital soul)",
    patriarch: "Yosef HaTzaddik",
    visualization: "Deep blue approaching indigo - the channel",
    whenToWear: "For connection, bonding, grounding, intimacy",
    healing: "For those feeling disconnected or ungrounded"
  },
  malkhut: {
    name: "מלכות",
    english: "Malkhut (Kingdom)",
    color: "Black hue (גוון שחור)",
    hex: "#212121",
    quality: "Receives all colors, manifests all",
    bodyPart: "Feet/Mouth",
    soulLevel: "Nefesh (vital soul)",
    matriarch: "Dovid HaMelech / Rochel Imeinu",
    visualization: "Contains and reveals all colors through speech",
    whenToWear: "For dignity, leadership, manifestation, sovereignty",
    healing: "For those who struggle to receive or feel unworthy"
  }
};

// ============================================
// BIGDEI KEHUNA - Kohen's Garments
// ============================================

export interface BigdeiKehunaData {
  name: string;
  english: string;
  color?: string;
  colors?: string[];
  hex?: string;
  hexes?: string[];
  atonement: string;
  lesson: string;
  forSeason?: string;
  colorAdvice: string;
}

export const BIGDEI_KEHUNA: Record<string, BigdeiKehunaData> = {
  me_il: {
    name: "מעיל (Me'il)",
    english: "Robe",
    color: "Pure Techelet (תכלת)",
    hex: "#4A90D9",
    atonement: "Lashon Hara (evil speech)",
    lesson: "The garment that surrounds us affects how we communicate",
    forSeason: "summer",
    colorAdvice: "Recommend blue tones for those working on speech or communication"
  },
  ephod: {
    name: "אפוד (Ephod)",
    english: "Apron",
    colors: ["Gold", "Techelet", "Argaman", "Scarlet", "White linen"],
    hexes: ["#FFD700", "#4A90D9", "#9C27B0", "#C62828", "#FFFAFA"],
    atonement: "Avodah Zarah (misplaced priorities)",
    lesson: "Weaving multiple colors creates wholeness - integration",
    forSeason: "all",
    colorAdvice: "Multi-toned palettes for integrating different aspects of self"
  },
  choshen: {
    name: "חושן (Choshen)",
    english: "Breastplate",
    atonement: "Perversion of justice",
    lesson: "Each person has their unique 'stone' - their essence color",
    forSeason: "all",
    colorAdvice: "Finding the client's signature color is finding their tribe"
  },
  tzitz: {
    name: "ציץ (Tzitz)",
    english: "Forehead Plate",
    color: "Pure Gold (זהב טהור)",
    hex: "#FFD700",
    atonement: "Azut Panim (brazenness)",
    lesson: "Gold on the forehead - conscious awareness, holy boldness",
    forSeason: "autumn",
    colorAdvice: "Gold accents near the face for developing healthy confidence"
  },
  ketonet: {
    name: "כתונת (Ketonet)",
    english: "Tunic",
    color: "Pure White Linen (בד לבן)",
    hex: "#FFFAFA",
    atonement: "Bloodshed",
    lesson: "The base layer is purity - what touches the skin matters most",
    forSeason: "all",
    colorAdvice: "Recommend white/cream undergarments for everyone"
  },
  avnet: {
    name: "אבנט (Avnet)",
    english: "Belt/Sash",
    colors: ["Techelet", "Argaman", "Scarlet", "White"],
    hexes: ["#4A90D9", "#9C27B0", "#C62828", "#FFFAFA"],
    atonement: "Improper thoughts of the heart",
    lesson: "What we wrap around our middle - our core intentions",
    forSeason: "all",
    colorAdvice: "Belts and waist definition as points of spiritual intention"
  },
  mitznefet: {
    name: "מצנפת (Mitznefet)",
    english: "Turban/Head covering",
    color: "White Linen (בד לבן)",
    hex: "#FFFAFA",
    atonement: "Arrogance (גסות הרוח)",
    lesson: "What covers the head - humility and connection to Above",
    forSeason: "all",
    colorAdvice: "Head coverings, hats as expressions of humility"
  },
  michnasayim: {
    name: "מכנסיים (Michnasayim)",
    english: "Pants/Breeches",
    color: "White Linen",
    hex: "#FFFAFA",
    atonement: "Gilui Arayot (immorality)",
    lesson: "Modesty and boundaries are foundational",
    forSeason: "all",
    colorAdvice: "Grounding, modest foundation pieces"
  }
};

// ============================================
// CHOSHEN STONES - 12 Tribes
// ============================================

export interface ChoshenStone {
  tribe: string;
  tribeEnglish: string;
  stone: string;
  stoneEnglish: string;
  hex: string;
  quality: string;
  month: string;
  row: number;
}

export const CHOSHEN_STONES: ChoshenStone[] = [
  { tribe: "ראובן", tribeEnglish: "Reuven", stone: "אודם (Odem)", stoneEnglish: "Ruby/Carnelian", hex: "#E53935", quality: "Teshuvah - Return", month: "Nisan", row: 1 },
  { tribe: "שמעון", tribeEnglish: "Shimon", stone: "פטדה (Pitda)", stoneEnglish: "Topaz/Peridot", hex: "#7CB342", quality: "Inner listening", month: "Iyar", row: 1 },
  { tribe: "לוי", tribeEnglish: "Levi", stone: "ברקת (Bareket)", stoneEnglish: "Emerald", hex: "#00897B", quality: "Service and teaching", month: "Sivan", row: 1 },
  { tribe: "יהודה", tribeEnglish: "Yehuda", stone: "נפך (Nofech)", stoneEnglish: "Garnet/Carbuncle", hex: "#B71C1C", quality: "Leadership with gratitude", month: "Tammuz", row: 2 },
  { tribe: "יששכר", tribeEnglish: "Yissachar", stone: "ספיר (Sapir)", stoneEnglish: "Sapphire", hex: "#1565C0", quality: "Torah wisdom", month: "Av", row: 2 },
  { tribe: "זבולון", tribeEnglish: "Zevulun", stone: "יהלום (Yahalom)", stoneEnglish: "Diamond", hex: "#E0E0E0", quality: "Commerce with integrity", month: "Elul", row: 2 },
  { tribe: "דן", tribeEnglish: "Dan", stone: "לשם (Leshem)", stoneEnglish: "Jacinth/Amber", hex: "#FF8F00", quality: "Justice", month: "Tishrei", row: 3 },
  { tribe: "נפתלי", tribeEnglish: "Naftali", stone: "שבו (Shevo)", stoneEnglish: "Agate", hex: "#8D6E63", quality: "Swift service", month: "Cheshvan", row: 3 },
  { tribe: "גד", tribeEnglish: "Gad", stone: "אחלמה (Achlamah)", stoneEnglish: "Amethyst", hex: "#7B1FA2", quality: "Courage in battle", month: "Kislev", row: 3 },
  { tribe: "אשר", tribeEnglish: "Asher", stone: "תרשיש (Tarshish)", stoneEnglish: "Beryl/Aquamarine", hex: "#4DD0E1", quality: "Abundance and blessing", month: "Tevet", row: 4 },
  { tribe: "יוסף", tribeEnglish: "Yosef", stone: "שהם (Shoham)", stoneEnglish: "Onyx", hex: "#37474F", quality: "Beauty and righteousness", month: "Shevat", row: 4 },
  { tribe: "בנימין", tribeEnglish: "Binyamin", stone: "ישפה (Yashfeh)", stoneEnglish: "Jasper", hex: "#6D4C41", quality: "Completeness", month: "Adar", row: 4 }
];

// ============================================
// SEASONAL DATA WITH SEFIRAH MAPPINGS
// ============================================

export interface SeasonKabbalahData {
  name: string;
  hebrewName: string;
  primaryKey: string;
  quality: string;
  dominantSefirot: string[];
  kabbalisticQuality: string;
  spiritualLesson: string;
  bigdeiKehuna: string;
  metals: string[];
  fabrics: string[];
  subtypes: SeasonSubtype[];
  colors: {
    primary: string[];
    neutrals: string[];
    accents: string[];
    kabbalistic: string[];
  };
}

export interface SeasonSubtype {
  id: string;
  name: string;
  sefirahBlend: string;
  description: string;
}

export const SEASONS_KABBALAH: Record<string, SeasonKabbalahData> = {
  spring: {
    name: "Spring",
    hebrewName: "אביב",
    primaryKey: "Vividness",
    quality: "Clear, vital",
    dominantSefirot: ["chesed", "netzach"],
    kabbalisticQuality: "Expansion (התפשטות) - The energy of Chesed dominates, like Avraham's tent open on all sides",
    spiritualLesson: "Spring people naturally embody Chesed - giving, openness, warmth. Their spiritual work is to develop appropriate Gevurah (boundaries) without losing their essential light.",
    bigdeiKehuna: "The Ephod's gold threads represent Spring's radiant warmth. Gold near the face (like the Tzitz) enhances their natural confidence.",
    metals: ["Yellow Gold", "Light Bronze", "Copper"],
    fabrics: ["Light cotton", "Linen", "Silk charmeuse", "Chiffon"],
    subtypes: [
      { id: "early_spring", name: "Early Spring", sefirahBlend: "Chesed-Chokmah", description: "Most ethereal, first flash of warmth" },
      { id: "floral_spring", name: "Floral Spring", sefirahBlend: "Chesed-Tiferet", description: "Romantic balance of warmth and beauty" },
      { id: "golden_spring", name: "Golden Spring", sefirahBlend: "Chesed-Hod", description: "Abundant gratitude energy" },
      { id: "vital_spring", name: "Vital Spring", sefirahBlend: "Chesed-Gevurah", description: "Strongest Spring - kindness with power" }
    ],
    colors: {
      primary: ["#FFF5E6", "#FFD4A3", "#FFEAA7", "#98D8C8", "#F8B4B4"],
      neutrals: ["#F5E6D3", "#D4A574", "#C4A484", "#8B7355"],
      accents: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"],
      kabbalistic: [SEFIROT_COLORS.chesed.hex, SEFIROT_COLORS.netzach.hex]
    }
  },
  summer: {
    name: "Summer",
    hebrewName: "קיץ",
    primaryKey: "Mutedness",
    quality: "Soft, refined",
    dominantSefirot: ["binah", "hod"],
    kabbalisticQuality: "Understanding (בינה) - Like the palace that Binah builds, Summer creates refined spaces",
    spiritualLesson: "Summer people embody Binah's processing power and Hod's humility. Their spiritual work is to trust their inner wisdom and not dim their light for others.",
    bigdeiKehuna: "The Me'il (pure blue robe) represents Summer's refinement. The Techelet connects them to heavenly communication.",
    metals: ["Silver", "White Gold", "Platinum", "Rose Gold (soft)"],
    fabrics: ["Soft jersey", "Matte silk", "Cashmere", "Velvet (matte)"],
    subtypes: [
      { id: "iridescent_summer", name: "Iridescent Summer", sefirahBlend: "Binah-Keter", description: "Most luminous, pearlescent" },
      { id: "rose_summer", name: "Rose Summer", sefirahBlend: "Binah-Tiferet", description: "Pink-based, romantic softness" },
      { id: "jewel_tone_summer", name: "Jewel Tone Summer", sefirahBlend: "Binah-Malkhut", description: "Deepest Summer colors" },
      { id: "twilight_summer", name: "Twilight Summer", sefirahBlend: "Binah-Yesod", description: "Evening hues, contemplative" }
    ],
    colors: {
      primary: ["#D4C4D4", "#B8C5D6", "#C9B8C5", "#A8DADC"],
      neutrals: ["#9E8B9E", "#7B8FA1", "#6B5B6B", "#8E9AAF"],
      accents: ["#9B59B6", "#5DADE2", "#F1948A", "#85C1E9"],
      kabbalistic: [SEFIROT_COLORS.binah.hex, SEFIROT_COLORS.hod.hex]
    }
  },
  autumn: {
    name: "Autumn",
    hebrewName: "סתיו",
    primaryKey: "Tonation",
    quality: "Rich, grounded",
    dominantSefirot: ["gevurah", "hod"],
    kabbalisticQuality: "Strength (גבורה) and Gratitude (הוד) - The harvested grain that results from disciplined work",
    spiritualLesson: "Autumn people embody Gevurah's focused power and earthly wisdom. Their spiritual work is to balance their intensity with Chesed's softness.",
    bigdeiKehuna: "The Scarlet thread (תולעת שני) in the Ephod represents Autumn's passionate depth. Earth tones connect to Malkhut.",
    metals: ["Antique Gold", "Bronze", "Copper", "Brass"],
    fabrics: ["Tweed", "Suede", "Leather", "Heavy linen", "Corduroy"],
    subtypes: [
      { id: "metallic_autumn", name: "Metallic Autumn", sefirahBlend: "Gevurah-Tiferet", description: "Copper-gold lustrous" },
      { id: "bronze_autumn", name: "Bronze Autumn", sefirahBlend: "Gevurah-Hod", description: "Deep warm earth" },
      { id: "spice_autumn", name: "Spice Autumn", sefirahBlend: "Gevurah-Yesod", description: "Exotic warm depth" },
      { id: "forest_autumn", name: "Forest Autumn", sefirahBlend: "Gevurah-Malkhut", description: "Deep greens and browns" }
    ],
    colors: {
      primary: ["#D4A574", "#C19A6B", "#8B6914", "#CD853F"],
      neutrals: ["#6B4423", "#8B4513", "#5D4037", "#795548"],
      accents: ["#D2691E", "#B8860B", "#CD5C5C", "#228B22"],
      kabbalistic: [SEFIROT_COLORS.gevurah.hex, SEFIROT_COLORS.hod.hex]
    }
  },
  winter: {
    name: "Winter",
    hebrewName: "חורף",
    primaryKey: "Contrast",
    quality: "Sharp, dramatic",
    dominantSefirot: ["malkhut", "yesod"],
    kabbalisticQuality: "Kingdom (מלכות) - The sharp contrast like black letters on white parchment - revelation",
    spiritualLesson: "Winter people embody Malkhut's regal presence and Yesod's connecting power. Their spiritual work is to use their dramatic presence for revealing rather than concealing.",
    bigdeiKehuna: "The contrast of the white Ketonet against dark represents Winter's power. Black (Malkhut) contains all colors.",
    metals: ["Silver", "Platinum", "White Gold", "Gunmetal"],
    fabrics: ["Silk satin", "Smooth leather", "Gabardine", "Sequins"],
    subtypes: [
      { id: "classic_winter", name: "Classic Winter", sefirahBlend: "Malkhut-Tiferet", description: "True cool, high contrast" },
      { id: "dynamic_winter", name: "Dynamic Winter", sefirahBlend: "Malkhut-Gevurah", description: "Most dramatic intensity" },
      { id: "crystal_winter", name: "Crystal Winter", sefirahBlend: "Malkhut-Chokmah", description: "Clear, icy brilliance" },
      { id: "midnight_winter", name: "Midnight Winter", sefirahBlend: "Malkhut-Yesod", description: "Deepest, most mysterious" }
    ],
    colors: {
      primary: ["#2C3E50", "#8E44AD", "#1ABC9C", "#E74C3C", "#FFFFFF"],
      neutrals: ["#1C1C1C", "#2C2C2C", "#404040", "#FFFFFF"],
      accents: ["#FF0066", "#00CED1", "#9400D3", "#00FF7F"],
      kabbalistic: [SEFIROT_COLORS.malkhut.hex, SEFIROT_COLORS.yesod.hex]
    }
  }
};

// ============================================
// HAIR/EYE/SKIN WITH SEFIRAH MAPPINGS
// ============================================

export interface HairNeutralKabbalah {
  neutral: string;
  seasonHint: string | null;
  hex: string;
  sefirah: string | null;
}

export const HAIR_NEUTRALS_KABBALAH: Record<string, HairNeutralKabbalah> = {
  black: { neutral: "True Black", seasonHint: "winter", hex: "#1C1C1C", sefirah: "malkhut" },
  blue_black: { neutral: "Blue-Black", seasonHint: "winter", hex: "#0D0D1A", sefirah: "yesod" },
  dark_brown: { neutral: "Raw Umber", seasonHint: null, hex: "#5D4037", sefirah: null },
  medium_brown: { neutral: "Burnt Sienna", seasonHint: null, hex: "#8B4513", sefirah: null },
  auburn: { neutral: "Copper Brown", seasonHint: "autumn", hex: "#B87333", sefirah: "gevurah" },
  red: { neutral: "Burnt Orange", seasonHint: "autumn", hex: "#CC5500", sefirah: "gevurah" },
  copper: { neutral: "Copper", seasonHint: "autumn", hex: "#B87333", sefirah: "hod" },
  strawberry_blonde: { neutral: "Golden Apricot", seasonHint: "spring", hex: "#FBCEB1", sefirah: "chesed" },
  golden_blonde: { neutral: "Wheat", seasonHint: "spring", hex: "#F5DEB3", sefirah: "chesed" },
  ash_blonde: { neutral: "Taupe", seasonHint: "summer", hex: "#8B8589", sefirah: "binah" },
  platinum: { neutral: "Silver Gray", seasonHint: "winter", hex: "#C0C0C0", sefirah: "chokmah" },
  gray: { neutral: "Pewter", seasonHint: "summer", hex: "#8F9196", sefirah: "binah" },
  white: { neutral: "Pure White", seasonHint: "winter", hex: "#FFFFFF", sefirah: "keter" }
};

export interface EyeColorKabbalah {
  label: string;
  seasons: string[];
  sefirah: string;
}

export const EYE_COLORS_KABBALAH: Record<string, EyeColorKabbalah> = {
  blue_clear: { label: "Clear Blue", seasons: ["winter", "spring"], sefirah: "chokmah" },
  blue_soft: { label: "Soft Blue", seasons: ["summer"], sefirah: "binah" },
  green_clear: { label: "Clear Green", seasons: ["spring", "autumn"], sefirah: "netzach" },
  green_soft: { label: "Soft Green", seasons: ["summer", "autumn"], sefirah: "hod" },
  hazel_warm: { label: "Warm Hazel", seasons: ["autumn", "spring"], sefirah: "tiferet" },
  brown_warm: { label: "Warm Brown", seasons: ["autumn", "spring"], sefirah: "gevurah" },
  brown_cool: { label: "Cool Brown", seasons: ["winter"], sefirah: "yesod" },
  brown_dark: { label: "Dark Brown/Black", seasons: ["winter", "autumn"], sefirah: "malkhut" },
  gray: { label: "Gray", seasons: ["summer", "winter"], sefirah: "binah" },
  amber: { label: "Amber/Golden", seasons: ["autumn", "spring"], sefirah: "tiferet" }
};

export interface SkinUndertoneKabbalah {
  label: string;
  seasons: string[];
  sefirah: string;
}

export const SKIN_UNDERTONES_KABBALAH: Record<string, SkinUndertoneKabbalah> = {
  warm_fair: { label: "Fair with Warm/Peachy", seasons: ["spring"], sefirah: "chesed" },
  warm_light: { label: "Light with Golden", seasons: ["spring", "autumn"], sefirah: "tiferet" },
  warm_medium: { label: "Medium Golden/Olive", seasons: ["autumn"], sefirah: "gevurah" },
  warm_deep: { label: "Deep with Warm/Amber", seasons: ["autumn"], sefirah: "hod" },
  cool_fair: { label: "Fair with Pink/Rosy", seasons: ["summer"], sefirah: "binah" },
  cool_light: { label: "Light with Pink", seasons: ["summer", "winter"], sefirah: "netzach" },
  cool_medium: { label: "Medium Blue/Violet", seasons: ["winter"], sefirah: "yesod" },
  cool_deep: { label: "Deep Blue Undertones", seasons: ["winter"], sefirah: "malkhut" },
  neutral_fair: { label: "Fair Neutral (Ivory)", seasons: ["spring", "summer"], sefirah: "keter" },
  neutral_medium: { label: "Medium Neutral/Olive", seasons: ["winter", "autumn"], sefirah: "tiferet" }
};

// ============================================
// PRACTICAL COLOR HEALING
// ============================================

export interface ColorHealing {
  challenge: string;
  recommendedColors: string[];
  sefirahToStrengthen: string;
  hexes: string[];
}

export const COLOR_HEALING: ColorHealing[] = [
  {
    challenge: "Feeling contracted, fearful, unable to give",
    recommendedColors: ["Silver", "White", "Light blue"],
    sefirahToStrengthen: "chesed",
    hexes: ["#C0C0C0", "#FFFAFA", "#E3F2FD"]
  },
  {
    challenge: "Too scattered, lacking self-discipline",
    recommendedColors: ["Red", "Deep burgundy"],
    sefirahToStrengthen: "gevurah",
    hexes: ["#C62828", "#800020"]
  },
  {
    challenge: "Inner conflict, lack of self-compassion",
    recommendedColors: ["Pink", "Rose", "Gold"],
    sefirahToStrengthen: "tiferet",
    hexes: ["#FFCDD2", "#FFD700", "#FFC0CB"]
  },
  {
    challenge: "Giving up easily, lacking motivation",
    recommendedColors: ["Light blue-white", "Lavender"],
    sefirahToStrengthen: "netzach",
    hexes: ["#E3F2FD", "#E6E6FA"]
  },
  {
    challenge: "Arrogance, disconnection from gratitude",
    recommendedColors: ["Warm green", "Coral", "Peach"],
    sefirahToStrengthen: "hod",
    hexes: ["#A5D6A7", "#FF7F50", "#FFDAB9"]
  },
  {
    challenge: "Feeling ungrounded, disconnected",
    recommendedColors: ["Deep blue", "Indigo"],
    sefirahToStrengthen: "yesod",
    hexes: ["#3F51B5", "#4B0082"]
  },
  {
    challenge: "Unable to receive, feeling unworthy",
    recommendedColors: ["Black", "Navy", "Deep earth tones"],
    sefirahToStrengthen: "malkhut",
    hexes: ["#212121", "#000080", "#5D4037"]
  }
];

// ============================================
// KAVVANAH FOR PRAYER
// ============================================

export interface PrayerColor {
  blessing: string;
  blessingHebrew: string;
  sefirah: string;
  color: string;
  hex: string;
  purpose: string;
}

export const PRAYER_COLORS: PrayerColor[] = [
  { blessing: "Shield of Abraham", blessingHebrew: "מגן אברהם", sefirah: "chesed", color: "Silver/White", hex: "#C0C0C0", purpose: "Protection through kindness" },
  { blessing: "Revives the Dead", blessingHebrew: "מחיה מתים", sefirah: "gevurah", color: "Red as fire", hex: "#C62828", purpose: "Life force, revival" },
  { blessing: "The Holy God", blessingHebrew: "האל הקדוש", sefirah: "tiferet", color: "White-red blend", hex: "#FFCDD2", purpose: "Holy balance" },
  { blessing: "Grants Knowledge", blessingHebrew: "חונן הדעת", sefirah: "tiferet", color: "White-red blend", hex: "#FFCDD2", purpose: "Gift of understanding" },
  { blessing: "Desires Repentance", blessingHebrew: "הרוצה בתשובה", sefirah: "binah", color: "Green as rainbow", hex: "#4CAF50", purpose: "Return, understanding" },
  { blessing: "Forgive Us", blessingHebrew: "סלח לנו", sefirah: "tiferet", color: "White-red blend", hex: "#FFCDD2", purpose: "Forgiveness" },
  { blessing: "Redeemer of Israel", blessingHebrew: "גואל ישראל", sefirah: "netzach", color: "White tending to blue", hex: "#E3F2FD", purpose: "Redemption, victory" },
  { blessing: "Healer of the Sick", blessingHebrew: "רופא חולי", sefirah: "tiferet", color: "White-red blend", hex: "#FFCDD2", purpose: "Healing" },
  { blessing: "Blesses the Years", blessingHebrew: "מברך השנים", sefirah: "yesod", color: "Blue tending to black", hex: "#3F51B5", purpose: "Sustenance" },
  { blessing: "Hears Prayer", blessingHebrew: "שומע תפילה", sefirah: "malkhut", color: "Black hue", hex: "#212121", purpose: "Prayer received" }
];

// ============================================
// METADATA
// ============================================

export const KABBALAH_METADATA = {
  title: "Kabbalistic Color System - Streams of Color",
  creator: "Nechama Yaffe",
  brand: "Streams of Color",
  scholarly_sources: [
    { author: "Moshe Idel", title: "Visualization of Colors, 1: David ben Yehudah he-Ḥasid's Kabbalistic Diagram" },
    { author: "Moshe Idel", title: "Visualization of Colors, 2: Implications for the History of Kabbalah" },
    { author: "Gershom Scholem", title: "Colours and Their Symbolism in Jewish Tradition and Mysticism" },
    { author: "Rabbi Moshe Cordovero (Ramak)", title: "Pardes Rimonim, Sha'ar HaGvanim (Gate of Colors)" },
    { author: "Rabbi Aryeh Kaplan", title: "Meditation and Kabbalah" }
  ],
  transmission_note: "כל אלו הרמזים צריכין קבלה מפה אל פה - All these hints must be transmitted from mouth to mouth"
};
