/**
 * STREAMS OF COLOR - COMPLETE AI ALGORITHM
 * =========================================
 * Part 3: Winter Subtypes
 * 
 * Merged from Nechama Yaffe's consultation documents
 * Client names removed for privacy
 */

// =============================================================================
// WINTER SUBTYPES (10)
// =============================================================================

export const WINTER_SUBTYPES = {

  burnishedWinter: {
    id: "burnished-winter",
    season: "Winter",
    name: "Burnished Winter",
    
    palette: {
      formal: ["Black", "Blue-Black", "Midnight Blue", "Charcoal"],
      neutral: ["Pewter", "Gunmetal", "Grey", "Brown-Grey"],
      hairColor: ["Black-Brown", "Chocolate", "Dark Amber"],
      skinTones: ["Rose Terra Cotta", "Terra Cotta", "Apricot", "Cream", "Ivory"],
      romantic: ["Burgundy", "Wine", "Sangria", "Maroon"],
      eyeColor: ["Topaz", "Amber", "Golden Brown", "Black Brown"],
      enlivened: ["Emerald", "Teal", "Blue Green"],
      highShade: ["Cobalt Blue", "Sapphire", "Bright Emerald"],
      pastels: ["Sage", "Silver", "Cream", "Soft Apricot"],
      metals: ["Antique Gold", "Pewter", "Silver", "Platinum"]
    },
    
    colorCombinations: [
      "Midnight Blue and Gold",
      "Burgundy, Cream and Emerald",
      "Charcoal, Silver and Cream",
      "Sapphire and Antique Gold",
      "Emerald, Burgundy and Ivory",
      "Pewter, Grey and Rose",
      "Black and Cream"
    ],
    
    paletteEffects: ["Winter Sunset", "Medieval Knight", "Spanish Renaissance", "Antique Tapestry"],
    
    fabrics: ["Velvet", "Brocade", "Tapestry", "Silk Shantung", "Satin", "Cashmere", "Fine Wool", "Leather", "Suede", "Tweed", "Lace", "Metallic Weave"],
    
    prints: ["Paisley", "Brocade patterns", "Tapestry designs", "Herringbone", "Houndstooth", "Animal prints", "Leopard", "Mosaic", "Tile prints", "Medieval motifs"],
    
    jewelry: {
      metals: { perfect: ["Antique Gold", "Pewter", "Silver", "Platinum"] },
      stones: { perfect: ["Emeralds", "Sapphires", "Rubies", "Topaz", "Amber", "Diamonds"] },
      styles: ["Links", "Chains", "Rope designs", "Medieval inspired", "Coins", "Filigree"]
    },
    
    makeup: {
      dramatic: "Deep reds with emerald or sapphire eye",
      soft: "Skin tones with gold accents"
    }
  },

  cameoWinter: {
    id: "cameo-winter",
    season: "Winter",
    name: "Cameo Winter",
    
    palette: {
      formal: ["Black", "Navy Blue", "Midnight Blue", "Charcoal"],
      neutral: ["Silver Grey", "Pewter", "Dove Grey", "Taupe"],
      hairColor: ["Black-Brown", "Chocolate", "Dark Brown"],
      skinTones: ["Rose", "Pink Rose", "Cameo Pink", "Cream", "Porcelain"],
      romantic: ["Wine", "Burgundy", "Deep Rose", "Claret"],
      eyeColor: ["Blue", "Grey Blue", "Violet", "Deep Blue"],
      enlivened: ["Emerald", "Teal", "Deep Teal"],
      highShade: ["Sapphire", "Cobalt", "Royal Blue"],
      pastels: ["Lavender", "Soft Pink", "Silver", "Ice Blue"],
      metals: ["Silver", "White Gold", "Platinum", "Rose Gold"]
    },
    
    colorCombinations: [
      "Navy and Silver",
      "Wine and Cream",
      "Sapphire and Rose",
      "Black and Lavender",
      "Emerald and Silver",
      "Charcoal and Ice Blue",
      "Burgundy and Pewter"
    ],
    
    paletteEffects: ["Cameo Portrait", "Victorian Rose", "Winter Rose Garden", "Edwardian Elegance"],
    
    fabrics: ["Velvet", "Satin", "Fine Lace", "Chiffon", "Silk", "Cashmere", "Fine Wool", "Brocade", "Organza"],
    
    prints: ["Cameos", "Roses", "Victorian florals", "Lace patterns", "Fine stripes", "Delicate geometrics", "Ribbons", "Pearls"],
    
    jewelry: {
      metals: { perfect: ["Silver", "White Gold", "Platinum", "Rose Gold"] },
      stones: { perfect: ["Cameos", "Pearls", "Sapphires", "Diamonds", "Amethyst", "Blue Topaz"] },
      styles: ["Cameos", "Filigree", "Victorian designs", "Delicate chains", "Pearl strands", "Lockets"]
    },
    
    makeup: {
      dramatic: "Deep wine lip with sapphire eye",
      soft: "Rose and cream with soft grey eye"
    }
  },

  crystalWinter: {
    id: "crystal-winter",
    season: "Winter",
    name: "Crystal Winter",
    
    palette: {
      formal: ["Navy", "Midnight Blue", "Black"],
      neutral: ["Silver", "Pewter", "Grey", "Charcoal"],
      hairColor: ["Chocolate Brown", "Dark Brown", "Black-Brown"],
      skinTones: ["Ice-Pink", "Silver-Pink", "Rose", "Cream", "Porcelain"],
      romantic: ["Deep Rose", "Raspberry", "Burgundy"],
      eyeColor: ["Bottle Green", "Glass Green", "Emerald", "Blue-Green"],
      enlivened: ["Teal", "Emerald", "Purple"],
      highShade: ["Bright Emerald", "Sapphire"],
      pastels: ["Violet", "Mint", "Silver", "Sage", "Ice Pink"],
      metals: ["White Gold", "Silver", "Rose Gold", "Platinum"]
    },
    
    colorCombinations: [
      "Navy and Ice Pink",
      "Emerald and Silver",
      "Black and Mint",
      "Midnight Blue and Rose",
      "Purple and Silver",
      "Teal and Cream",
      "Raspberry and Grey"
    ],
    
    paletteEffects: ["Ice Crystal", "Winter Forest", "Frozen Lake", "Crystal Palace"],
    
    fabrics: ["Fine Corduroy", "Metallic fabrics", "Velvet", "Crystal embellished", "Lace", "Eyelet", "Denim", "Tulle", "Satin", "Silk"],
    
    prints: ["Paisley", "Leopard with flowers", "Geometric", "Tropical flowers", "Silver hearts", "Lockets", "William Morris designs", "Stripes"],
    
    style: {
      looks: ["Safari", "Striped resort", "Chanel style", "A-line", "Pencil skirts", "Puff sleeve", "Princess cut"],
      shoes: ["Pointed toe", "Ballet flats", "Ankle boots"]
    },
    
    jewelry: {
      metals: { perfect: ["White Gold", "Silver", "Rose Gold", "Platinum"] },
      stones: { perfect: ["Diamonds", "Emeralds", "Sapphires", "Rubies", "Green Glass"] },
      styles: ["Hearts", "Lockets", "Etched silver", "Enamel", "Pave", "Floral motifs"]
    },
    
    makeup: {
      soft: "Pink with bottle green soft liner",
      dramatic: "Raspberry lip with emerald eye"
    },
    
    designers: ["Chanel", "Bluemarine", "Chloe"],
    artists: ["Matisse", "Picasso"]
  },

  exoticWinter: {
    id: "exotic-winter",
    season: "Winter",
    name: "Exotic Winter",
    
    palette: {
      formal: ["Black", "Blue-Black", "Midnight Blue", "Midnight Green"],
      neutral: ["Charcoal", "Pewter", "Deep Purple", "Raisin"],
      hairColor: ["Black", "Black-Brown", "Dark Chocolate"],
      skinTones: ["Dark Terra Cotta", "Bronze", "Copper", "Warm Brown", "Cream"],
      romantic: ["Wine", "Burgundy", "Deep Red", "Sangria"],
      eyeColor: ["Black Brown", "Dark Amber", "Onyx"],
      enlivened: ["Emerald", "Teal", "Peacock Blue"],
      highShade: ["Cobalt", "Sapphire", "Bright Teal"],
      pastels: ["Sage", "Cream", "Soft Gold"],
      metals: ["Gold", "Antique Gold", "Bronze", "Copper"]
    },
    
    colorCombinations: [
      "Black and Gold",
      "Emerald and Burgundy",
      "Midnight Blue and Bronze",
      "Wine and Cream",
      "Peacock Blue and Gold",
      "Sapphire and Copper"
    ],
    
    paletteEffects: ["Exotic Princess", "Persian Night", "Moroccan Palace", "Indian Empress"],
    
    fabrics: ["Silk Shantung", "Brocade", "Velvet", "Satin", "Metallic weave", "Sari fabric", "Lace", "Embroidered silk", "Jacquard"],
    
    prints: ["Paisley", "Persian designs", "Moroccan tile", "Ethnic prints", "Animal prints", "Peacock feathers", "Indian motifs", "Abstract geometrics"],
    
    jewelry: {
      metals: { perfect: ["Gold", "Antique Gold", "Bronze", "Copper"] },
      stones: { perfect: ["Emeralds", "Rubies", "Sapphires", "Onyx", "Tiger Eye", "Amber"] },
      styles: ["Chandelier earrings", "Layered chains", "Cuffs", "Indian inspired", "Persian motifs", "Coins"]
    },
    
    makeup: {
      dramatic: "Kohl eyes with wine lip",
      soft: "Bronze and gold tones"
    }
  },

  fairyTaleWinter: {
    id: "fairy-tale-winter",
    season: "Winter",
    name: "Fairy Tale Winter",
    
    palette: {
      formal: ["Black", "Midnight Blue", "Midnight Green"],
      neutral: ["Mushroom", "Taupe", "Grey Olive", "Black-Olive", "Deep Purple"],
      hairColor: ["Black-Brown", "Chocolate", "Amber"],
      skinTones: ["Rose Terra Cotta", "Rose-Mauve", "Apricot", "Dusty Apricot", "Cream"],
      romantic: ["Wine", "Deep Red", "Purple Red", "Plum"],
      eyeColor: ["Emerald Green", "Blue Green", "Teal"],
      enlivened: ["Emerald", "Sapphire Blue"],
      highShade: ["Sapphire Blue", "Prussian Blue"],
      pastels: ["Sage", "Mauve", "Cream", "Soft Purple"],
      metals: ["White Gold", "Yellow Gold", "Copper-Gold"]
    },
    
    colorCombinations: [
      "Midnight Blue and Cream",
      "Emerald and Gold",
      "Wine and Ivory",
      "Purple and Sage",
      "Black and Rose",
      "Sapphire and Mauve"
    ],
    
    paletteEffects: ["Biblical", "Edwardian", "Renaissance", "Grecian", "Hungarian folk", "Fairy tale", "Riding costume", "1920's", "1960's"],
    
    fabrics: ["Silk", "Satin", "Fine Lace", "Crocheted Lace", "Wool Lace", "Metallic threads (knights armor)", "Tweed", "Two-tone", "Cashmere", "Embossed leather", "Suede", "Fur", "Denim", "Chambray", "Jersey", "Damask", "Tapestry", "Brocade", "Velvet", "Cut Velvet"],
    
    prints: ["Swirls", "Handwriting", "Chinese script", "Scallops", "Fans", "Tropical flowers-leaves", "Roses", "Lilies", "Calla lilies", "Grapes", "Leaves", "Branches", "Trompe l'oeil", "Cameo-ribbon", "Pearls", "Paisley", "Suit stripes", "Braided/twisted rope", "Tassels", "Feathers", "Wings", "Birds", "Leopard", "Cheetah", "Small forest animals", "Deer", "Ostrich feathers", "Military buttons", "Hungarian embroidery", "Polka dots", "Lace prints"],
    
    style: {
      looks: ["Safari", "Sari", "Grecian", "Draped", "Romanesque", "Diagonal", "Pleated", "Column", "Military"],
      dresses: ["Deep V back", "Cape collar", "A-line", "Pencil skirts", "Wrap", "Side tied", "Kaftan", "Mandarin"],
      sleeves: ["Sharp puff", "Pleated sleeve", "Trumpet sleeve"],
      shoes: ["Grecian sandals", "Brocade-suede espadrilles", "Oval-pointed leather", "Olive army boots", "Wrap sandals", "Side button ankle boots", "Two-fabric shoes"],
      coats: ["Military coat", "Side buttoned mohair-cashmere", "Cape coat", "Tweed", "Belted trench", "Leather flying jacket"]
    },
    
    jewelry: {
      metals: { perfect: ["White Gold", "Yellow Gold", "Copper-Gold"] },
      stones: { perfect: ["Garnet", "Emeralds", "Sapphires", "Jade", "Aquamarine", "Coral roses", "Carved ivory", "Pearls", "White Coral", "Mother of Pearl"] },
      styles: ["Cameos", "Ribbon necklaces", "Suede necklaces", "Gold chains", "Links", "Rope chains", "Lockets", "Birds", "Wings", "Feathers", "Enamel", "Filigree", "Ribbons", "Fans", "Camelias"]
    },
    
    makeup: {
      evening: "Red lip with blue green liner",
      everyday: "Apricot/mauve/rose with olive liner"
    },
    
    artists: ["Vermeer", "Leonardo Da Vinci"]
  },

  gemstoneWinter: {
    id: "gemstone-winter",
    season: "Winter",
    name: "Gemstone Winter",
    
    beautyStatement: "This Palette blends cool blues and purples along with warmer earth tones. Like a blue lake at sunset.",
    
    paletteEffects: ["Jewel Tone Palette", "Bouquet of Roses", "Blue Lake at sunset"],
    
    palette: {
      skinTones: ["Terra Cotta Rose", "Apricot Rose", "Mauve Rose", "Mauve Terra Cotta", "Cream", "Ecru-Cream"],
      romantic: ["Sangria", "Wine", "Burgundy", "Soft Red"],
      formal: ["Midnight Blue", "Black", "Sapphire Blue", "Midnight Green"],
      hairColor: ["Chocolate", "Black-Brown", "Amber"],
      eyeColor: ["Golden Green", "Green", "Olive"],
      neutral: ["Slate Blue", "Grey Blue", "Confederate Blue"],
      metallics: ["Gold", "Pewter", "Silver", "Rose Gold"],
      enlivened: ["Blue Green", "Prussian Blue", "Teal-Blue"],
      highNote: ["Electric Blue"],
      pastels: ["Seafoam Green", "Aqua", "Blue-Green"]
    },
    
    colorCombinations: [
      "Olive, Raisin, Midnight Blue",
      "Raisin, Deep Purple, Emerald",
      "Cream, Terra Cotta Rose and Red",
      "Sapphire Blue and Ivory",
      "Ivory, Bright Blue and Blue-Grey",
      "Amber Brown, Olive and Mushroom",
      "Taupe, Dark Mushroom and Ivory",
      "Mosaic Flowers and Leaves",
      "Fruit, Branches, Leaves and Vines"
    ],
    
    fabrics: ["Lace", "Fine Lace", "Linen", "Linen Cotton", "Denim", "Chambray", "Velvet", "Cut Velvet", "Fine tweed", "Fur", "Cashmere", "Angora", "Tulle", "Toile", "Sheep Boucle", "Satin", "Silk", "Shantung"],
    
    prints: ["Houndstooth", "Fine Stripe", "Toile prints", "Plaid", "Roses and Branches", "Hibiscus Flowers", "Tropical Flowers and Leaves", "Gardenias", "Lotus Flowers", "Grapes, Grape Leaves, Pomegranates, Apples", "Small Diamonds", "Chevron", "Tweed", "Missoni Prints", "Paisley", "Mosaic Prints", "Fleur De Lis", "Lace prints", "Trompe L'oeil", "Birds, Deer and Elephants", "Embossed leather", "Peacock Feathers", "Ostrich Feathers", "Silk Tassels", "Lilies", "Water lilies", "Calla Lilies"],
    
    style: {
      overview: "Romantic and Elegant Style",
      dresses: ["Sari inspired", "Wrap dresses", "Safari Dress", "A Line Dress", "Grecian Draped Dress", "Draped panels"],
      skirts: ["Wrap a line skirts", "Diagonal sashes", "Striped linen skirts"],
      tops: ["Wrap Top", "V neck", "Boat neck", "oval neckline", "Sweetheart neckline"],
      sleeves: ["Puffed sleeve tight at wrists", "Bell sleeve", "Butterfly sleeve", "draped sleeve"],
      collars: ["V neck", "oval neck", "boat neck", "mandarin Collar", "Military Collar", "Epaulettes"],
      shoes: ["Oval", "Ballet flats", "espadrilles", "Riding boots", "ankle boots"],
      coats: ["Cape coat", "Military coat", "Fur Collar coat", "leather jacket with wide lapels"],
      recommendations: ["Mix streamlined dress with romantic element", "Simple dresses with many delicate chains", "Detailed dress with one statement piece"]
    },
    
    jewelry: {
      metals: { perfect: ["Rose Gold", "Platinum", "Silver", "Gold"] },
      stones: { perfect: ["Pearls", "Sapphires", "Amethyst", "Carnelian", "Garnets", "Rubies"] },
      styles: ["Filigree", "Enamel", "Pave", "Links", "Braided Chains", "Floral Enamel", "Birds", "Feathers", "Leaves", "Water Lilies", "Lotus flowers"]
    },
    
    makeup: {
      dramatic: "Dramatic colors for evening",
      soft: "Rose colored and seafoam for less formal look"
    },
    
    eras: ["Persian", "Indian", "Edwardian", "Romanian peasant style"],
    artists: ["Modigliani", "Da Vinci"]
  },

  mediterraneanWinter: {
    id: "mediterranean-winter",
    season: "Winter",
    name: "Mediterranean Winter",
    
    palette: {
      formal: ["Black", "Blue Black", "Midnight Blue", "Midnight Green", "Charcoal"],
      neutral: ["Olives", "Brown Olives", "Dark Purples", "Raisin", "Maroon"],
      hairColor: ["Chocolate Brown", "Black Brown"],
      skinTones: ["Dark Terra Cotta", "Rose Terra Cotta", "Dark Apricot", "Apricot", "Cream", "Ecru", "Ivory"],
      romantic: ["Burgundy", "Sangria", "Maroon"],
      eyeColor: ["Amber", "Copper", "Topaz"],
      enlivened: ["Dark Teal", "Soft Teal", "Blue Green"],
      highShade: ["Prussian Blue", "Blue Green", "Bright Teal"],
      pastels: ["Soft purples", "Grey Purples", "Sage", "Light Olive", "Moss", "Cream", "Yellow-Cream"],
      metals: ["Copper", "Antique Gold", "Yellow Gold", "Pewter"]
    },
    
    colorCombinations: [
      "Olive, Terra Cotta and Ivory",
      "Midnight, Charcoal and Golden cream",
      "Gold and Prussian Blue",
      "Brown-Olive, Purple and Apricot",
      "Emerald Green and Cobalt Blue",
      "Soft Purple, Pastel Purple and Sage",
      "Emerald, Sage and Cream",
      "Teal, Olive and Dusty Peach"
    ],
    
    paletteEffects: ["Spanish Mountains", "Mediterranean Palette", "Queen Esther", "Moroccan Mosaics", "Spanish Tiles", "Early Winter Sunset"],
    
    fabrics: ["Shantung", "Jersey", "Crushed Velvet", "Cut Velvet", "Corduroy", "Suit Fabric", "Fine wool", "Tweed", "Linen", "Linen Cotton mix", "Lace", "Boucle", "Polished Cotton", "Brocade", "Tapestry"],
    
    prints: ["Mosaic", "Fine stripes", "Geometric Patterns", "Tile Prints", "Leaves", "Branches", "Houses", "Pitchers", "Feathers", "Trees", "Leopard", "Tiger", "Zebra", "Plaid", "Missoni Prints", "Pinstripes", "Ombre Chiffon Prints", "Mountain and Water prints", "Indian and Persian Embroidery", "Lilies", "Parrot Flowers", "Roses", "Wheat", "Grapes", "Apples", "Toile"],
    
    style: {
      looks: ["Diagonal Lines and A line", "Safari Style", "Indian Sari style", "Grecian Style with pleats and drape"],
      details: ["Sharp tailoring combined with flowy effects", "Sharp Bell sleeve", "Handkerchief hem", "Wrap dresses", "Wrap tops and skirts pulled in at waist", "Deep v neck with shell", "boat neck", "deep oval"],
      shoes: ["Small rectangular toe", "oval toe", "sharp point"]
    },
    
    jewelry: {
      metals: { perfect: ["Gold", "Antique Gold", "Copper", "Pewter", "Antique Silver"] },
      stones: { perfect: ["Amber", "Topaz", "Coral", "Labradorite", "Jade", "Ivory", "Agate", "Onyx", "Jasper"] },
      styles: ["Rope and Links for chains", "Layered chains of different textures", "Green and Coral beads", "Large opaque stones", "Irregular shaped stones", "Beaded or Braided settings", "Chandelier earrings", "Leaf and Feather shaped earrings", "Pear or rectangular earrings"]
    },
    
    makeup: {
      evening: "High shades, blues and greens and deep reds. Satin lipstick",
      subdued: "Earth tones and terra cotta's"
    },
    
    designers: ["Etro", "Brunello Cuccinelli", "Missoni"],
    artists: ["Corot", "Modigliani"]
  },

  multiColoredWinter: {
    id: "multi-colored-winter",
    season: "Winter",
    name: "Multi-Colored Winter",
    
    palette: {
      skinTones: ["Coral-Terra Cotta", "Rose Terra Cotta", "Apricot", "Soft Peach", "Cream"],
      hairColor: ["Caramel", "Dark Brown", "Black Brown", "Wheat", "Golden Brown"],
      eyeColor: ["Blue-Green", "Aquamarine", "Emerald", "Slate Blue"],
      formal: ["Black", "Midnight Blue", "Midnight Green", "Grey Blue"],
      neutral: ["Black Olive", "Grey-Green", "Dark Blue Green", "Plum", "Raisin", "Dark Purple"],
      romantic: ["Coral", "Red Coral", "Terra Cotta-Red", "Scarlett", "Vermillion"],
      highShade: ["Sapphire Blue"],
      metals: ["Pewter", "Yellow Gold", "Antique Gold", "Old Silver", "Platinum"]
    },
    
    colorCombinations: [
      "Coral and Black Olive",
      "Midnight Blue and Cream",
      "Emerald and Gold",
      "Sapphire and Terra Cotta",
      "Plum and Antique Gold",
      "Vermillion and Grey"
    ],
    
    fabrics: ["Silk Shantung", "Two-tone silk", "Basket weave silk", "Sari", "Fine tweed", "Wool jersey", "Cady", "Boucle", "Lambswool", "Fur", "Linen", "Linen-silk", "Linen-cotton", "Lace", "Fine lace", "Chiffon", "Net lace", "Crushed velvet", "Cut velvet", "Silk velvet", "Denim", "Twill", "Chambray", "Jacquard", "Brocade", "Damask", "Toile", "Leather", "Snakeskin print"],
    
    prints: ["Chevron", "Prince of Wales", "Tweed", "Trompe l'oeil houses-trees-boats", "Pomegranates", "Grapes-grape leaves", "Orange-lemon trees", "Olive-fig trees", "Cedar", "Cypress", "Myrtle", "Willows", "Branches", "Leaves", "Leopard", "Tropical birds", "Deer", "Tropical florals", "Roses", "Lilies", "Calla lilies", "Paisley", "Tassels", "Ropes", "Braids", "Feathers", "Wings", "Ribbons", "Polka dots", "Waves", "Lines", "Diamonds", "Tile prints", "Tile mosaic", "Chinese script-scroll", "Japanese blue ink paintings", "Fine stripes", "Missoni", "Chinese porcelain", "Enamel"],
    
    style: {
      overview: "Classic streamlined, oval/diagonal/column lines",
      looks: ["Kimono", "Sari", "Safari", "Asymmetrical", "Wrap", "Column", "Cape", "Kaftan", "Pleated Grecian"],
      dresses: ["Pencil skirts", "Lace-silk-satin-tweed", "Layered", "Crushed pleated", "Kimono top", "Mandarin blouse", "Side buttoned", "Wrap"],
      sleeves: ["Sharp puff shoulder", "Flowy sleeve tight wrists", "Batwing", "Kimono sleeve"],
      collars: ["Cowl neck", "Cape neck", "Boat neck", "Slit neck", "Deep V", "Asymmetrical", "Oval"],
      shoes: ["Grecian sandal", "Wrap sandal", "Espadrilles", "Velvet shoes", "Oval slip-ons", "Patent leather", "Leather tassel ties", "Embossed leather"],
      coats: ["Cape coat", "Fur collar", "Military", "Riding jacket", "Leather bomber", "Printed silk scarves"],
      accessories: ["Versace scarves", "Pashmina-cashmere shawls", "Mosaic bags-belts", "Woven-tassel belts"]
    },
    
    jewelry: {
      metals: { perfect: ["Gold", "Platinum", "Silver", "Antique Gold"] },
      stones: { perfect: ["Diamonds", "Emeralds", "Sapphires", "Coral", "White Coral", "Jade", "Ivory", "Blue Topaz", "Tourmaline", "Aquamarine", "Opal", "Topaz"] },
      styles: ["Braided gold", "Ropes", "Tassels", "Feather-bird motifs enamel-mosaic", "Pearls", "Mother of pearl", "Pearls with gold clasps", "Enamel flowers-leaves-branches", "Rectangular-tear-oval stones", "Gold filigree", "Layered gold bangles", "Cuffs serpentine", "S-shape earrings-necklaces", "Coiled gold"]
    },
    
    makeup: {
      everyday: "Soft skin tones-pastels-neutrals (sage-olive liner + terracotta lip)",
      evening: "Red-coral with emerald-sapphire eye"
    },
    
    eras: ["Ancient Chinese-Japanese", "Italian-Spanish classical", "1920's-1940's evening", "Persian-Indian", "Flemish"],
    artists: ["Vermeer", "Sargent", "Da Vinci"]
  },

  ornamentalWinter: {
    id: "ornamental-winter",
    season: "Winter",
    name: "Ornamental Winter",
    
    beautyStatement: "Soft and rich earth tones, deep greens and blues with bright high notes in blue and purple",
    
    paletteEffects: ["Winter Sunset", "Tapestry Palette", "Antique", "Golden Diadem", "Girl with a Pitcher", "Ornamental Designs"],
    
    palette: {
      skinTones: ["Rose-Terra Cotta", "Dusty Peach", "Dark Rose", "Ivory-Cream", "Apricot"],
      romantic: ["Burgundy", "Soft Red", "Sangria"],
      formal: ["Midnight Blue", "Dark Blue", "Blue-Black"],
      hairColor: ["Chocolate Brown", "Copper Brown", "Deep Amber", "Gold", "Topaz"],
      eyeColor: ["Golden-Green", "Seafoam", "Silver-Green", "Black Olive", "Forest Green"],
      neutral: ["Maroon", "Purple-Brown", "Raisin", "Deep Purple"],
      metallics: ["Antique Gold", "Woven Gold", "Platinum", "Silver"],
      enlivened: ["Deep Teal", "Blue Green", "Sea Green", "Sapphire"],
      highNote: ["Peacock Blue", "Prussian Blue", "Royal Blue", "Bright Purple"],
      pastels: ["Sage", "Apricot", "Cream"]
    },
    
    colorCombinations: [
      "Midnight Blue and Gold",
      "Amber, Cream and Apricot",
      "Purple, Emerald and Royal Blue",
      "Emerald Green, Chocolate and Ivory",
      "Deep Purple, Plum and Gold",
      "Wine, Ivory and Amber",
      "Charcoal Grey, Silver and Cream",
      "Sky Blue with Amber in Prints",
      "Forest Green and Midnight Blue",
      "Sky Blue and Cobalt"
    ],
    
    fabrics: ["Silk", "Satin", "Velvet", "Brocade", "Silk weaves", "Chiffon", "Fine Lace", "Wool Jersey", "Cotton-Linen", "Linen", "Cashmere", "Shantung Silk", "Two Toned fabric", "Soft Leather", "Suede", "Polished Cotton"],
    
    prints: ["Paisley", "Houndstooth", "Fine Check", "Plaid", "Black and White prints", "Abstract oil painting or watercolor prints", "Prints of houses, bridges, trees, branches, water", "Coiled designs", "Swirled seashell designs", "Pitcher, waves and water prints", "Toile with birds and water, leaves and trees", "Animal Prints with Deer, Gazelle, Antelope and Birds", "Narrow Stripe", "Diamond prints", "Small circles, rectangles or oval prints", "Delicate lines or branch prints", "Trompe L'oeil prints", "Watercolor Floral Prints", "Chain and Locket prints", "Rope Prints", "Polka Dots", "Date Palms", "Fig Trees", "Almond Trees", "Roses", "Lilies", "Orchids", "Alliums", "Scabiosa", "Purple Tulips", "White Tulips", "Lavender", "Queen Anne's Lace"],
    
    style: {
      dresses: ["Grecian Pleats and drape", "Wrap dresses", "A line Dresses", "Column Dress", "Safari Dress", "Sari", "Kaftan", "Shawl Collar", "Kimono Dress"],
      skirts: ["Pencil Skirt", "Pleated Skirt", "A line Skirt", "Draped Skirt", "Side tied skirt", "Wrap skirt", "Asymmetrical hem"],
      sleeves: ["Puffed Sleeve", "Butterfly Sleeve", "Trumpet Sleeve", "Pleated Sleeve", "Sleeves trimmed with lace, brocade or embroidery"],
      collars: ["Mandarin", "Deep V", "Shawl Collar", "Pointed Collar"],
      shoes: ["Espadrilles", "Suede shoes", "Soft rectangular or oval", "pointed oval toe", "Grecian Sandal", "Pointed Toes boots", "Embossed leathers", "alligator", "snakeskin prints", "Patent Leather"],
      recommendations: [
        "Wear delicate prints in small to medium",
        "Wear sharply etched designs or painting effects",
        "Wear high notes alone in satin or velvet",
        "Mix satin with denim, lace with leather",
        "Short jacket with longer skirt/dress",
        "Long jacket with short skirt",
        "Bring colors together in prints like paisley, florals or toile"
      ]
    },
    
    jewelry: {
      stones: { perfect: ["Diamonds", "Amber", "Topaz", "Emeralds", "Sapphires", "Jade", "Turquoise", "Aventurine"] },
      metals: { perfect: ["Gold", "Silver", "Platinum", "Antique Gold"] },
      styles: ["Links", "Chains", "Narrow bands", "Multiple strands", "Filigree", "Chinese Lacquer", "Enamel", "Beaded Indian designs", "Delicate Branch earrings", "Leaves", "Branches", "Winter Florals"]
    },
    
    makeup: {
      eyes: { perfect: ["Blues", "Greens", "Purples"] },
      lips: { perfect: ["Mauves", "Reds"] },
      cheeks: { perfect: ["Mauves", "Rose"] },
      looks: ["Dramatic Kohl on eyes with soft lip", "Red lip with soft green/gold liner"]
    },
    
    eras: ["1800's Italian", "1800's Moroccan", "Ancient Chinese", "Ancient Grecian Design"],
    artists: ["Modigliani", "Da Vinci", "Corot"]
  },

  silkRoadWinter: {
    id: "silk-road-winter",
    season: "Winter",
    name: "Silk Road Winter",
    
    palette: {
      formal: ["Black", "Midnight Blue", "Midnight Green"],
      neutral: ["Charcoal", "Pewter", "Olive", "Black Olive", "Deep Purple", "Raisin"],
      hairColor: ["Black-Brown", "Chocolate", "Dark Amber"],
      skinTones: ["Rose Terra Cotta", "Terra Cotta", "Apricot", "Cream", "Ivory"],
      romantic: ["Wine", "Burgundy", "Deep Red", "Coral Red"],
      eyeColor: ["Emerald", "Blue-Green", "Teal", "Golden Green"],
      enlivened: ["Emerald", "Teal", "Peacock Blue"],
      highShade: ["Cobalt", "Sapphire", "Bright Teal"],
      pastels: ["Sage", "Cream", "Soft Gold", "Apricot"],
      metals: ["Antique Gold", "Gold", "Copper", "Bronze"]
    },
    
    colorCombinations: [
      "Midnight and Gold",
      "Emerald and Burgundy",
      "Sapphire and Cream",
      "Wine and Sage",
      "Cobalt and Copper",
      "Peacock Blue and Antique Gold"
    ],
    
    paletteEffects: ["Silk Road Traveler", "Persian Palace", "Chinese Dynasty", "Moroccan Night", "Byzantine Empress"],
    
    fabrics: ["Silk Shantung", "Brocade", "Damask", "Velvet", "Satin", "Metallic weave", "Sari silk", "Embroidered silk", "Jacquard", "Tapestry", "Fine wool", "Cashmere", "Pashmina"],
    
    prints: ["Paisley", "Persian designs", "Chinese motifs", "Silk Road patterns", "Ethnic prints", "Tile patterns", "Mosaic", "Pagodas", "Dragons", "Phoenixes", "Peacocks", "Geometric borders"],
    
    style: {
      looks: ["Kaftan", "Sari inspired", "Kimono", "Column dress", "Wrap dress", "Draped silhouettes"],
      details: ["Embroidered edges", "Metallic trim", "Tassel details", "Braided closures"]
    },
    
    jewelry: {
      metals: { perfect: ["Antique Gold", "Gold", "Copper", "Bronze"] },
      stones: { perfect: ["Jade", "Lapis Lazuli", "Turquoise", "Coral", "Amber", "Emeralds", "Rubies"] },
      styles: ["Layered chains", "Coin necklaces", "Chandelier earrings", "Cuffs", "Statement rings", "Ethnic inspired designs"]
    },
    
    makeup: {
      dramatic: "Kohl eyes with wine lip",
      soft: "Gold and bronze tones"
    }
  },

  tapestryWinter: {
    id: "tapestry-winter",
    season: "Winter",
    name: "Tapestry Winter",
    
    palette: {
      formal: ["Black", "Blue-Black", "Midnight Blue", "Midnight Green"],
      neutral: ["Charcoal Grey", "Brown-Grey", "Grey Purple"],
      hairColor: ["Chocolate Brown", "Dark Amber", "Burnt Sienna", "Golden Brown"],
      skinTones: ["Brown-Mauve", "Pink-Mauve", "Brown Champagne", "Dark Apricot", "Light Apricot", "Ivory"],
      romantic: ["Maroon", "Burgundy", "Mauve-Red", "Purple", "Grape"],
      eyeColor: ["Golden Green", "Topaz", "Olive", "Black Olive", "Grey-Green"],
      enlivened: ["Green", "Prussian Blue", "Teal"],
      highShade: ["Emerald Green", "Peacock Blue", "Cobalt Blue"],
      pastels: ["Soft Purple", "Sage Green", "Ivory", "Light Apricot"],
      metals: ["Antique Gold", "Silver", "Platinum", "Bronze", "Green Copper (oxidized)"]
    },
    
    colorCombinations: [
      "Olive, Deep Purple, Midnight Blue",
      "Black and Ivory",
      "Midnight Blue, Mauve and Ivory",
      "Champagne and Olive",
      "Pewter and Grey",
      "Chocolate, Amber and Ivory",
      "Maroon, Apricot and Mauve",
      "Sage Green, Apricot and Emerald Green",
      "Emerald and Prussian Blue"
    ],
    
    paletteEffects: ["Italian Renaissance", "Spanish Renaissance", "Antique Chinese design", "Mediterranean Princess", "Biblical Designs", "Mediterranean Seaside and Desert", "Moroccan design"],
    
    fabrics: ["Silk shantung", "Silk wool blend", "Velvet", "Cut velvet", "Lace", "Jersey", "Cashmere", "Fine knits", "Ribbed knits", "Leather", "Suede", "Satin", "Denim", "Corduroy", "Linen", "Chiffon", "Brocade", "Tapestry", "Black lace with Color underneath or vice versa"],
    
    prints: ["Missoni Prints", "Cheetah", "Leopard", "Alligator", "Ostrich", "Snakeskin", "Stripes", "Small Checks", "Fine Plaid", "Fine Tweed", "Houndstooth", "Paisley", "Polka Dots", "Geometric prints", "Leaves", "Branches", "Chinese Pagodas", "Jasmine", "Lilies", "Roses", "Anemones", "Orchids", "Coils", "Gold Coins", "Braided Gold", "Sari Prints", "Chinese Watercolor prints", "Blue or Black ink painting on Chiffon", "Delicate feathers", "Ropes and Chain prints"],
    
    style: {
      silhouettes: ["Hourglass shape", "Romantic and Tailored"],
      dresses: ["Trapeze dresses", "Fine pleats", "Accordion pleats", "Slightly puffed sleeve or bell sleeve", "Accordion sleeve from elbow", "A line Wrap dresses in small geometric prints"],
      details: ["Smooth lines with small prints", "Pointed, soft rectangle or oval toed shoes", "Gold Buckle", "Deep V neckline", "deep oval neckline", "boatneck"]
    },
    
    jewelry: {
      metals: { perfect: ["Antique Gold", "Silver", "Platinum", "Bronze"] },
      stones: { perfect: ["Emeralds", "Diamonds", "Sapphires", "Topaz", "Labradorite", "Agate", "Jade", "Ivory"] },
      styles: ["Gold Coins", "Ropes", "Chains", "Links"]
    },
    
    makeup: {
      lips: { perfect: ["Skin tones", "Romantic Colors"] },
      cheeks: { perfect: ["Skin tones", "Romantic Colors"] },
      dramatic: "Blues, greens and purples for eyes"
    },
    
    designers: ["Missoni", "Brunello Cuccinelli", "Chloe"],
    artists: ["Modigliani", "Da Vinci"]
  },

  winterRose: {
    id: "winter-rose",
    season: "Winter",
    name: "Winter Rose",
    
    palette: {
      formal: ["Black", "Navy Blue", "Midnight Blue", "Charcoal"],
      neutral: ["Silver Grey", "Pewter", "Dove Grey", "Slate"],
      hairColor: ["Black-Brown", "Chocolate", "Dark Brown"],
      skinTones: ["Rose", "Pink Rose", "Cream", "Porcelain", "Ivory"],
      romantic: ["Wine", "Burgundy", "Deep Rose", "Claret", "Raspberry"],
      eyeColor: ["Blue", "Grey Blue", "Violet", "Sapphire"],
      enlivened: ["Emerald", "Teal", "Deep Teal"],
      highShade: ["Sapphire", "Cobalt", "Royal Blue", "Bright Emerald"],
      pastels: ["Lavender", "Soft Pink", "Silver", "Ice Blue", "Mint"],
      metals: ["Silver", "White Gold", "Platinum", "Rose Gold"]
    },
    
    colorCombinations: [
      "Navy and Rose",
      "Wine and Silver",
      "Sapphire and Cream",
      "Black and Lavender",
      "Emerald and Ice Pink",
      "Charcoal and Mint",
      "Burgundy and Pewter"
    ],
    
    paletteEffects: ["Winter Rose Garden", "Snow Queen", "Ice Princess", "Victorian Winter", "Romantic Winter"],
    
    fabrics: ["Velvet", "Satin", "Fine Lace", "Chiffon", "Silk", "Cashmere", "Fine Wool", "Brocade", "Organza", "Tulle", "Fur"],
    
    prints: ["Roses", "Victorian florals", "Lace patterns", "Fine stripes", "Delicate geometrics", "Snowflakes", "Ribbons", "Pearls", "Cameos"],
    
    style: {
      looks: ["Princess style", "Victorian romantic", "Ice princess", "Elegant evening"],
      details: ["Lace trim", "Fur accents", "Crystal embellishments", "Velvet ribbons"]
    },
    
    jewelry: {
      metals: { perfect: ["Silver", "White Gold", "Platinum", "Rose Gold"] },
      stones: { perfect: ["Diamonds", "Sapphires", "Pearls", "Amethyst", "Blue Topaz", "Rose Quartz"] },
      styles: ["Filigree", "Victorian designs", "Delicate chains", "Pearl strands", "Lockets", "Cameos", "Snowflake motifs"]
    },
    
    makeup: {
      dramatic: "Deep wine lip with sapphire or emerald eye",
      soft: "Rose and cream with soft grey eye"
    }
  }
};

export default { WINTER_SUBTYPES };
