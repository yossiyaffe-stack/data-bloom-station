/**
 * STREAMS OF COLOR - COMPLETE AI ALGORITHM
 * =========================================
 * Part 1: Spring & Summer Subtypes
 * 
 * Merged from Nechama Yaffe's consultation documents
 * Client names removed for privacy
 * 
 * Last Updated: January 2026
 */

// =============================================================================
// SPRING SUBTYPES (10)
// =============================================================================

export const SPRING_SUBTYPES = {
  
  frenchSpring: {
    id: "french-spring",
    season: "Spring",
    name: "French Spring",
    
    palette: {
      skinTones: ["Geranium Pink", "Pink Peach", "Ballet Pink", "White"],
      romantic: ["Coral Pink", "Rose Pink", "Red and White"],
      formal: ["Midnight Blue", "Navy", "Blue Purple"],
      hairColor: ["Soft Chocolate", "Cocoa", "Cream Blends"],
      secondBasic: ["Purple", "Grape", "Soft Plum", "Lavender", "Violet"],
      subdued: ["Slate Blue", "Confederate Blue", "Sky Blue", "Silver Blue"],
      casual: ["Silver-Green", "Moss Green", "Soft Pistachio"],
      metallics: ["Rose Gold", "Silver"],
      enlivened: ["Bottle Green", "Seafoam Green", "Blue Green"],
      highNote: ["Robin's Egg Blue", "Soft Turquoise"],
      pastels: ["Silver-Blue", "Silver-Purple", "Silver-Green"]
    },
    
    colorCombinations: [
      "Geranium and White",
      "Red and White",
      "Coral, Seafoam and Silver-Green",
      "Bottle Green, Robin's Egg Blue and White",
      "Plum and Rose",
      "Pistachio, Chocolate and White",
      "Navy and White",
      "Sky Blue, Midnight Blue and Coral",
      "Red and Turquoise"
    ],
    
    fabrics: ["Organza", "Muslin", "Cotton", "Taffeta", "Fine Tweed", "Velvet", "Grosgrain Ribbons", "Linen/Cotton", "Cotton lace", "Fine Lace", "Denim", "Chambray", "Wool Jersey", "Angora", "White or Chocolate Fur", "Suede"],
    
    prints: ["Gardenias", "Dogwood", "Jasmine", "Small Roses", "Butterflies", "Birds", "Fleur De Lis", "Small Diamonds", "Rectangles", "Blue and White Stripes", "Paisley", "Florals", "Polka dots", "Whimsical Prints", "Delftware", "Delft Blue and White", "Porcelain Tiles", "Camelias"],
    
    paletteEffects: ["Gardenia Summer", "Southern Belle", "Milk Maiden", "Gibson Girl"],
    
    style: {
      details: ["Side Part", "Braided hair", "Hair with Volume and Texture", "Soft Bun", "Lacing on dresses and tops", "Peasant style", "Dirndl Skirt", "Two tone or Three toned suede bag and boots", "Jeweled Embellishments on Clothing"]
    },
    
    jewelry: {
      stones: {
        perfect: ["Green Glass", "Blue Topaz", "Sapphire", "Pink Coral", "White Coral", "Amethyst"],
        good: ["Cameos"],
        avoid: ["Amber", "Orange stones", "Heavy gold"]
      },
      metals: {
        perfect: ["Rose Gold", "Silver"],
        avoid: ["Yellow Gold", "Copper"]
      },
      styles: ["Enameled Jewelry", "Floral Jewels", "Clusters of Stones", "Velvet Ribbons for Necklaces"]
    },
    
    makeup: {
      lips: { perfect: ["Coral", "Soft Pink"] },
      cheeks: { perfect: ["Soft Pink", "Coral"] },
      eyes: { perfect: ["Blue-Green", "Purple"] },
      mascara: "Brown",
      tips: ["Soft Lip and Cheeks with Blue-Green Eyeliner", "Defined Brows with Coral lip"]
    },
    
    eras: ["1800's French Dress", "1800's Dutch", "Gibson Girl", "Turn of the century American Fashion", "Japanese Kimono"],
    artists: ["Mary Cassatt", "Renoir", "Odilon Redon"]
  }
  
  // Note: Additional Spring subtypes (Porcelain Spring, Crystal Spring, etc.) 
  // to be added when documents are provided
};

// =============================================================================
// SUMMER SUBTYPES (10+)
// =============================================================================

export const SUMMER_SUBTYPES = {
  
  ballerinaSummer: {
    id: "ballerina-summer",
    season: "Summer",
    name: "Ballerina Summer",
    
    palette: {
      skinTones: ["Rose", "Dusty Rose", "Cream"],
      romantic: ["Red", "Rose Red"],
      formal: ["Navy Blue", "Midnight Blue"],
      hairColor: ["Chocolate", "Amber"],
      eyeColor: ["Dark Brown", "Gold"],
      neutrals: ["Slate Blue", "Grey Blue"],
      metallics: ["Rose Gold", "Silver"],
      enlivened: ["Dark Emerald", "Bottle Green"],
      highNote: ["Emerald"],
      pastels: ["Lavender", "Lilac", "Pink", "Cream"]
    },
    
    colorCombinations: [
      "Lavender, Purple and Cream",
      "Rose, Red and Ivory",
      "Emerald and Ivory",
      "Emerald and Lavender",
      "Bottle Green and Pink",
      "Ballet Pink and Chocolate",
      "Grey and Silver",
      "Rose Gold and Emerald Green"
    ],
    
    paletteEffects: ["Princess", "Rose Garden", "Ballerina", "Peasant Girl- Eastern Europe", "Milk Maiden"],
    
    fabrics: ["Lace", "Eyelet", "White Fur", "Fine Cotton", "Organza", "Chiffon", "Embroidery", "Needlepoint", "Fine wool", "Wool Jersey", "Velvet", "Fine Corduroy"],
    
    prints: ["Florals", "Roses", "Hydrangeas", "Tulips", "Violets", "Paisley", "Polka Dots", "Fleur De Lis", "Hearts", "Lockets", "Ribbons", "Birds", "Butterflies", "Fountains", "Windowpane", "Diamonds", "Ovals", "Delicate Branches with Flowers"],
    
    style: {
      silhouettes: ["A line Skirts or Dress", "Princess cut dress or coat"],
      sleeves: ["Butterfly Sleeve", "Ruffled Sleeve", "Mutton Sleeve", "Puffed sleeve at shoulder"],
      details: ["Pleated skirt", "Narrow belts", "Suede belts and boots", "Vintage embroidery", "Military style velvet jacket", "Gold buttons", "Braid or ribbon trim"],
      hair: ["High updo with flowers", "Side part with embellished floral pins", "Ribbons in hair"]
    },
    
    jewelry: {
      stones: {
        perfect: ["Amethyst", "Blue topaz", "Green opals", "Blue Glass", "Pearls", "Quartz"],
        good: ["Pink Coral", "White Coral"],
        avoid: ["Amber", "Orange stones", "Dark heavy stones"]
      },
      metals: {
        perfect: ["Rose Gold", "Silver"],
        avoid: ["Yellow Gold", "Copper", "Bronze"]
      },
      styles: ["Colored stones", "Enamel Flowers", "Hanging beaded earrings", "Cameo Flowers", "Flower and bird designs"]
    },
    
    makeup: {
      eyes: { perfect: ["Emerald", "Silver", "Gold", "Rose"] },
      lips: { perfect: ["Rose", "Cherry red", "Cream"] },
      cheeks: { perfect: ["Rose", "Pink"] },
      looks: [
        "Emerald with Silver or Gold for evening",
        "All Rose for Romantic look",
        "Cream, Rose and Cherry red for classic Summer look"
      ]
    },
    
    eras: ["Gibson Girl", "England 1800's", "France 1800's", "Hungarian Costume 19th century"],
    artists: ["Monet", "Cassatt"]
  },

  cameoSummer: {
    id: "cameo-summer",
    season: "Summer",
    name: "Cameo Summer",
    
    palette: {
      skinTones: ["Cream", "Peach", "Rose"],
      romantic: ["Dark Rose", "Claret", "Soft Red", "Cameo"],
      formal: ["Purple", "Dark Purple"],
      neutrals: ["Slate Blue", "Confederate Blue"],
      metallics: ["Rose Gold", "Silver"],
      enlivened: ["Blue Green", "Aqua", "Dark Greens"],
      pastels: ["Lavender", "Lilac", "Pale Greens", "Seafoam", "Grey Green"]
    },
    
    colorCombinations: [
      "Purple, Teal and Midnight",
      "Golden Brown and Rose",
      "Cameo, Seafoam and Lavender",
      "Rose Gold and Soft Blue",
      "Dark Rose and Seafoam",
      "Purple and Cream",
      "Claret and Pastel Green"
    ],
    
    fabrics: ["Toile", "Embroidered Cotton", "Velvet", "Chiffon", "Smooth Satin", "Micro Tweeds", "Fine Wool", "Cotton Linen Mix", "Suede", "Jersey", "Satin Jersey", "Polished Cotton"],
    
    paletteEffects: ["English Roses", "Romantic French Design", "Fleur de Lis", "Trompe L'oeil", "Iridescent Embroidered Cloth"],
    
    style: {
      shoes: ["Oval shoes"],
      silhouettes: ["S-curve"],
      details: ["Feathers and Lace", "Delicate Ties and Ribbon at sleeves"]
    },
    
    jewelry: {
      stones: {
        perfect: ["Cameos", "Pink Quartz", "Pearls", "Rubies", "Sapphires", "Labradorite", "Green Stones"]
      },
      metals: {
        perfect: ["Rose Gold", "Silver"]
      },
      styles: ["Dangling Earrings", "Teardrop earrings", "Pear Cut Pink Diamond"]
    },
    
    makeup: {
      lips: { perfect: ["Reds", "Rose"] },
      cheeks: { perfect: ["Cameo", "Pale Pink"] },
      eyes: { perfect: ["Blue Green liner or Shadow"] },
      tips: ["Use High Tone for Evening"]
    }
  },

  chinoiserieSummer: {
    id: "chinoiserie-summer",
    season: "Summer",
    name: "Chinoiserie Summer",
    
    palette: {
      formal: ["Dark Blue", "Dark Green", "Hunter Green", "Prussian Blue", "Chocolate Brown"],
      neutral: ["Olive Green", "Grey Green", "Burgundy"],
      hairColor: ["Golden Brown", "Chestnut", "Topaz"],
      skinTones: ["Rose", "Apricot Rose", "Dusty Rose", "Rose-Terra Cotta", "Apricot", "Cream", "Ivory"],
      romantic: ["Dark Rose", "Sangria", "Dusty Red"],
      eyeColor: ["Blue green", "Aquamarine", "Sapphire"],
      enlivened: ["Emerald", "Bright Hunter Green"],
      highShade: ["Sapphire Blue", "Teal"],
      pastels: ["Sage", "Lavender (iridescent)", "Sky Blue", "Apricot", "Ivory"],
      metals: ["Rose Gold", "Gold", "Silver"]
    },
    
    colorCombinations: [
      "Rose, Ivory and Deep Rose",
      "Sapphire and Ivory",
      "Chocolate Brown, Olive and Cream",
      "Burgundy, Olive and Apricot",
      "Sage, Lavender and Silver Grey",
      "Emerald Green and Cream",
      "Teal, Olive and Ivory",
      "Black Olive, Dusty Red and Golden Brown"
    ],
    
    paletteEffects: ["Summer Princess", "Guinevere", "Summer Woods", "Summer Rose Garden", "Renaissance Princess", "Grecian Effects", "Japanese Garden", "Chinoiserie Effect", "Cloisonne Effect"],
    
    fabrics: ["Lace", "Crocheted lace", "Eyelet", "Velvet", "Crushed Velvet", "Corduroy", "Chambray", "Denim", "Soft Leather", "Suede", "Embossed Leather", "Fine Tweed", "Brocade", "Tapestry", "Organza", "Pleated Cotton", "Cotton Linen", "Silk", "Woven Silk", "Polished Cotton", "Jersey", "Fine Wool", "Mohair", "Angora", "Melange", "Needle point"],
    
    prints: ["Roses", "Myrtle", "Clematis", "Wisteria", "Wild Rose", "Camelias", "Almond Blossoms", "Star Flowers", "Hibiscus", "Jasmine", "Fine Ombre Stripe", "Ombre", "Iridescent fabrics", "Climbing Flowers", "Trees and Flowers", "Orchard prints", "Prince of Wales plaid", "Small Scottish Plaid", "Painted Pagodas and Houses", "Birds", "Butterflies", "Dragonflies", "Feathers", "Wings", "Hearts", "Pearls", "Seashells", "Trompe L'oeil Ribbons and Lace"],
    
    style: {
      overview: "French Girls Chic, Summer Rose Look, Romantic princess style, updated Bohemian princess look with leather/suede accents",
      dresses: ["A Line dresses", "Safari dress", "Kimono dress", "Wrap dresses", "Pleated dresses", "Grecian style", "Peasant Dresses"],
      skirts: ["A line with fitted top", "Straight skirt with romantic top", "Denim or suede skirt with flowy top"],
      hair: ["Soft Updo", "Side part with soft curls/waves", "Braiding or twisting hair back", "Leaves and flowers in updo"],
      shoes: ["Suede shoes", "Ballerina wrap", "Espadrilles", "Riding boots", "Blue suede ankle boots"]
    },
    
    jewelry: {
      types: ["Enamel", "Cloisonne", "Colored Glass"],
      metals: { perfect: ["Rose Gold", "Gold", "Silver"] },
      stones: { perfect: ["Blue Topaz", "Aquamarine", "Labradorite", "Pink Quartz", "Opals", "White Coral", "Amethyst", "Garnet"] },
      styles: ["Embossed Gold", "Filigree", "Engraved gold", "Cameos in Roses and Leaves", "Gold chains of Leaves, Branches and Flowers", "Birds and Feathers"]
    },
    
    makeup: {
      soft: "Skin tones and pastels, Roses and Apricots. Soft green eyeliner with rose lip",
      evening: "Dramatic colors, Blues and teals"
    },
    
    designers: ["Bluemarine", "Chloe"],
    artists: ["Sargent", "Degas"]
  },

  degasSummer: {
    id: "degas-summer",
    season: "Summer",
    name: "Degas Summer",
    
    palette: {
      colors: ["Mushroom", "Taupe", "Mauve", "Pink Mauve", "Gray pink", "Silver", "Silver Gray", "Pistachio", "Soft Yellow Green", "Apricot", "Lemon Cream", "Soft Purple", "Lilac", "Deep purple", "Brown Purple", "Blue Gray", "Cadet Blue", "Deep teal", "Aqua", "Blue-Green", "Seafoam", "Gray Green"]
    },
    
    colorCombinations: [
      "Apricot, Cream and Seafoam",
      "Cadet Blue, Violet and Cream",
      "Grey Green, Pistachio and Lemon Cream",
      "Mauve and Seafoam",
      "Mauve, Mushroom and Ballet Slipper Pink",
      "Silver, Taupe and Burgundy",
      "Cadet Blue, Grey Blue and Silver"
    ],
    
    paletteEffects: ["1800's Indian and Persian design (soft)", "1600's Dutch", "Mid 1800's France", "English Rose", "Ballerina", "Summer Lake at Dawn", "Opal and Moonstone Palette", "Softly Iridescent Colors", "Peacock-Pheasant Palette"],
    
    fabrics: ["Velvet", "Soft knits", "Chanel Tweed", "Fine corduroy", "Jersey", "Silk", "Tulle", "Eyelet", "Crocheted Lace", "Angora", "Mohair", "Scottish Lace", "Colored Denim", "Iridescent leather", "Soft Leather", "Suede", "Cotton", "Cotton-Linen"],
    
    prints: ["Small flowers", "Stripes", "Animal print", "Tulips", "Peonies", "Bluebells", "Hibiscus", "Jasmine", "Daisies", "Bamboo prints", "Soft tropical flowers"],
    
    style: {
      military: "Military Styles in soft Grays Mushrooms and Cadet blues, Silver buttons, epaulets",
      indian: "Persian and Indian Sari Styles. Sari lace and prints in pink and purple. Pashmina shawl prints",
      english: "English Riding costume and cape and riding boots",
      shoes: ["Ballet flats", "espadrilles", "criss cross straps", "suede shoes", "pointed or oval toes"],
      skirts: ["Straight skirt with flowy sleeves top", "A-line dress and skirt", "Fitted top with Flowy skirt"],
      sleeves: ["Puffed sleeve", "mutton sleeve", "small puff at shoulder"],
      hair: ["Side part", "High Bun"],
      tips: ["Brace palette by wearing darker colors over lighter", "Add structure to one part of outfit", "Avoid prints that are too high contrast"]
    },
    
    jewelry: {
      stones: { perfect: ["Garnet", "Rhodonite", "Quartz", "Moonstone", "Opal", "Blue Topaz", "Agate", "Tourmaline"] },
      metals: { perfect: ["Rose Gold", "Silver"] },
      styles: ["Beaded Chandelier Earrings", "Tear Drop shapes", "Oval cut gems", "Multi colored gemstones in shapes of flowers and birds", "Ivory enamel flowers"]
    },
    
    makeup: {
      options: [
        "Iridescent Mauves, Pink and Green eyeshadow or liner",
        "Soft Pink cheeks and lip with blue gray eyeliner",
        "Deep Mauve lip with defined eyes"
      ]
    },
    
    artists: ["Ingres", "Vermeer"],
    designers: ["Marni", "Bluemarine", "Chloe"]
  },

  duskySummer: {
    id: "dusky-summer",
    season: "Summer",
    name: "Dusky Summer",
    
    palette: {
      colors: ["Cream", "Rose", "Deep Rose", "Mauve", "Sangria", "Burgundy", "Deep Purple", "Chocolate", "Green/Brown", "Teal", "Sea Green", "Aqua", "Silver", "Amber", "Silver Blue", "Powder Blue", "Slate Blue"]
    },
    
    colorCombinations: [
      "Cream and Chocolate",
      "Rose, Cream and Green",
      "Amber, Purple and Silver",
      "Forest Green and Soft Green",
      "Amber, Chocolate and Cream",
      "Aqua, Sea Green and Silver"
    ],
    
    fabrics: ["Jersey", "Angora", "Velvet", "Chenille", "Chiffon", "Fine Cotton", "Organza", "Fine Corduroy", "Mohair", "Colored Denim"],
    
    paletteEffects: ["Gibson Girl", "Cowgirl", "Grecian", "Edwardian Era", "English 1800's", "American Pioneer", "Patchwork"],
    
    style: {
      shoes: ["Cowboy Boots", "Oval Toe", "Espadrilles"],
      details: ["Criss cross Ribbons", "Worn Leather", "Leopard Print chiffon", "Mermaid style", "A line", "Fine pleats", "Braids", "Side part", "Net Lace", "Crochet Lace", "Graphics and Florals mixed"]
    },
    
    jewelry: {
      metals: { perfect: ["Antique Gold", "Silver"] },
      stones: { perfect: ["Aquamarine", "Labradorite", "Turquoise", "Opals", "Rose Quartz", "Pink Pearls"] },
      styles: ["Small Charms", "Hearts and Flowers", "Enameled Flowers"]
    },
    
    makeup: {
      lips: { perfect: ["Mauve", "Sangria"] },
      cheeks: { perfect: ["Rose", "Mauve"] },
      eyes: { perfect: ["Green and gold eyeliner/Shadow"] },
      looks: ["Soft look with shades of rose and strong brow", "Smudged eyeliner/soft shadow"]
    }
  },

  emeraldSummer: {
    id: "emerald-summer",
    season: "Summer",
    name: "Emerald Summer",
    
    palette: {
      skinTones: ["Cameo", "Rose", "Terra Cotta-Rose", "Apricot-Cream", "Cream", "Ivory"],
      romantic: ["Soft Wine", "Burgundy", "Vintage Rose"],
      formal: ["Midnight", "Prussian Blue", "Navy", "Blue-Black"],
      hairColor: ["Golden Brown", "Amber", "Topaz", "Chocolate"],
      eyeColor: ["Blue Green", "Aquamarine"],
      neutrals: ["Blue-Purples", "Dusty Blue", "Slate Blue", "Silver Grey", "Silver Green"],
      metallics: ["Rose Gold", "Copper", "White Gold"],
      enlivened: ["Bottle Green", "Forest Green"],
      highNote: ["Emerald"],
      pastels: ["Soft Rose", "Sage", "Cream", "Silver"]
    },
    
    colorCombinations: [
      "Midnight Blue and Cream",
      "Rose, Burgundy and Grey",
      "Slate Blue, Midnight Blue and Emerald",
      "Emerald and Rose Gold",
      "Dusty Blue, Rose and Sage",
      "Bottle Green and Amber",
      "Amber, Rose and Sage"
    ],
    
    paletteEffects: ["Rose Garden", "Renaissance Princess", "Tea Rose Palette", "Summer Sunset", "Summer Woods"],
    
    fabrics: ["Crocheted Lace", "Fine Lace", "Velvet", "Corduroy", "Striped Denim", "Fine Wool", "Fine Tweed", "Embossed Floral Leather", "Suede", "Jersey wool", "Fine Cotton", "Cotton/Linen Blend", "Burlap", "Colored Denim", "Silk", "Organza", "Chiffon", "Applique"],
    
    prints: ["Antique Roses", "Tea Roses", "Stone Garden Bench", "Marbled Stone", "Birds", "Flowers", "Butterflies", "Hearts", "Lockets", "Fleur De Lis", "Cameos", "Trompe L'oeil Lace and Ribbons", "Small geometric shapes", "Polka dots", "Paisley", "Tile Mosaic", "Climbing florals", "Floral embroidery", "Vases with Flowers"],
    
    style: ["Princess cut Coats and jackets", "Military braided jacket", "Princess cut dresses", "belted dresses", "Shirtwaist dresses", "Safari style jacket", "Puff sleeve", "butterfly sleeve", "Ruffled sleeve", "Renaissance looks with layered fabrics", "Riding style leather boots and velvet jacket"],
    
    jewelry: {
      stones: { perfect: ["Emeralds", "Small diamonds", "Topaz", "Blue Topaz"] },
      metals: { perfect: ["Copper", "Rose Gold", "White Gold"] },
      styles: ["Cameos", "Enamel flowers and leaves", "Floral filigree", "Marble or Mother of Pearl", "Pearls"]
    },
    
    eras: ["English Renaissance", "French 1800's", "England 1800's", "Gibson Girl", "1940's fashion"],
    artists: ["John Singer Sargent", "Dante Gabriel Rossetti"]
  },

  englishSummer: {
    id: "english-summer",
    season: "Summer",
    name: "English Summer",
    
    palette: {
      skinTones: ["Pink Mauve", "Mauve-Rose", "Rose", "Dark Rose"],
      romantic: ["Wine", "Soft Burgundy", "Sangria"],
      formal: ["Blue Black", "Prussian Blue", "Midnight Green", "Midnight Blue"],
      hairColor: ["Golden Brown", "Dark Brown", "Chocolate"],
      eyeColor: ["Grey Green", "Golden Green", "Olive Green"],
      neutrals: ["Grey", "Blue Grey", "Slate Blue", "Grey Purple", "Burgundy"],
      metallics: ["Rose Gold", "Gold"],
      enlivened: ["Teal", "Blue Green"],
      highNote: ["Emerald"],
      pastels: ["Mauve", "Cream", "Sage"]
    },
    
    colorCombinations: [
      "Sage, Mauve and Cream",
      "Burgundy, Green and Rose",
      "Rose, Mauve and Cream",
      "Emerald and Rose",
      "Teal, Emerald and Lilac",
      "Chocolate and Rose",
      "Slate Blue, Slate Purple and Grey"
    ],
    
    paletteEffects: ["Sunlight shining through the woods", "Late English Summer", "English Rose Garden", "Garden with hanging Flowers"],
    
    fabrics: ["Embroidered Chiffon", "Applique", "Jacquard", "Tapestry", "Fine Lace", "Embroidery on Cotton", "Fine tweed", "Fine Wool knit", "Linen Cotton", "Cotton Organza", "Chenille", "Stretch velvet", "Matte Velvet", "Fine ribbons"],
    
    prints: ["Pearls", "Seashells", "Roses", "Lilies", "Lilacs", "Tulips", "Lavender", "Small ovals, squares or diamonds", "Narrow stripe or lines", "Delicate flowers and branches", "Birds and Flowering trees", "Dogwood", "Ribbon Prints", "Lace Trompe L'oeil", "Watercolor Prints"],
    
    style: {
      necklines: ["Oval neckline", "sweetheart neckline", "Cowl neck", "V neckline", "Mandarin Collar"],
      sleeves: ["Bell Sleeve", "Sleeve with drape", "Butterfly sleeve"],
      details: ["Asymmetrical hemline", "A line Skirts and dresses", "Narrow belts", "Rose Gold belt", "Wrap Dresses", "Renaissance lacing"]
    },
    
    jewelry: {
      stones: { perfect: ["Green Glass", "Labradorite", "Pearls", "Topaz", "Green Opal", "Agate", "Aquamarine", "Aventurine"] },
      metals: { perfect: ["Rose Gold", "Gold", "Silver"] },
      styles: ["Delicate colored beads", "Glass beads", "Dangling pearls", "Clusters of stones", "Enamel Designs", "Pear shaped pendant", "Chandelier earrings in Filigree"]
    },
    
    makeup: {
      eyes: { perfect: ["Green eyeliner", "Gold eyeshadow"] },
      lips: { perfect: ["Burgundy"] },
      cheeks: { perfect: ["Rose tones"] }
    },
    
    eras: ["English 1800's", "Art Deco", "French 1700's"],
    artists: ["Monet", "Manet"]
  },

  porcelainSummer: {
    id: "porcelain-summer",
    season: "Summer",
    name: "Porcelain Summer",
    
    beautyStatement: "Deep Sapphire Blues and Glass Greens. Light pinks and blues of flowers grounded with Golden Browns. A pure and iridescent Palette",
    
    paletteEffects: ["Ballerina", "Porcelain effect", "Summer Rose Garden", "Venice Watercolors", "Watercolor painting", "Cloisonne", "French and English designs"],
    
    palette: {
      skinTones: ["Rose", "Rose Mauve", "Pale Mauve", "Cream", "Pink-Cream", "Ivory"],
      romantic: ["Mauve-Red", "Plum", "Rose", "Dusty Red"],
      formal: ["Midnight Blue", "Navy", "Slate Blue"],
      hairColor: ["Golden Brown", "Amber", "Chocolate"],
      eyeColor: ["Midnight Blue", "Sapphire Blue", "Blue-Grey"],
      neutral: ["Taupe", "Mushroom", "Dove Grey"],
      metallics: ["Gold", "Silver"],
      enlivened: ["Blue Greens", "Teal", "Emerald"],
      highNote: ["Sapphire Blue", "Sea green"],
      pastels: ["Lavender", "Periwinkle", "Chambray", "Dusty Blue", "Ivory", "Cream", "Light Pink"]
    },
    
    colorCombinations: [
      "Sage, Pale Pink and Sky Blue",
      "Emerald and Sapphire",
      "Cream, Rose and Soft Purple",
      "Lavender, Rose and Amber",
      "Chocolate and Light Pink",
      "Sea Green, Silver Blue and Ivory",
      "Taupe, Purple and Mauve",
      "Dark Blue, Ivory and Silver",
      "Aqua, Seafoam and Golden Brown"
    ],
    
    fabrics: ["Fine Lace", "Eyelet", "Crocheted Lace", "Net", "Chiffon", "Tulle", "Tweed", "Velvet", "Crushed velvet", "Corduroy", "Chambray", "Denim", "Fine wool", "Boucle", "Jersey", "Gauze", "Polished Cotton", "Silk", "Iridescent fabric", "Mohair", "Angora"],
    
    prints: ["Roses", "Daisies", "Anemones", "Peonies", "Hydrangeas", "Dogwood", "Water Lilies", "Lotus Flowers", "Jasmine", "Lace Prints", "Trompe L'oeil", "Swans", "Birds and Feathers", "Deer", "Porcelain designs", "Blue and White China", "Windowpane", "Bouquets of Flowers", "Vases", "Green Glass", "Fine stripes", "Climbing Florals", "Kimono Prints", "Cherry Blossoms", "Polka dots", "Paisley-delicate", "Toile Prints", "Musical instruments", "Musical Notes"],
    
    style: {
      overview: "Princess Palette, French and English Designs. Mix Structured design with something Flowy and Romantic",
      dresses: ["A line Dresses", "Ribbon tie at wrists and neck", "Puffed sleeve", "Safari Dress", "Column Dress", "Dress with tiered skirt", "Grecian pleated dress", "Princess Cut dresses", "Military style dress"],
      skirts: ["Pleated skirts", "Belted Skirts", "Denim skirt", "Pencil Skirt in rose print", "Shredded Tulle skirt", "Tweed Skirt with lace trim"],
      tops: ["Ribbon tie", "Kimono style", "Mandarin Collar shirt", "Angora Sweater", "Gauze Cotton Poets Blouse", "Lace and Ribbons blouse", "Military style"],
      shoes: ["Oval toed", "Espadrilles", "Ballerina Wrap", "Greek Sandals", "Suede Loafer", "Velvet boots", "Blue Suede ankle boots", "Riding Boots"],
      coats: ["Princess style coat", "Military style with Gold buttons and Braid", "Cape Coat", "Tweed Coat"],
      hair: ["Long layers", "updo", "high ponytail", "braids", "crown braid", "jeweled clips", "headbands"],
      recommendations: [
        "Mix floral Prints and Solids",
        "Wear structured top with Flowy skirt",
        "Mix fabrics: Denim and Lace, Tweed and silk, Tulle and Leather"
      ]
    },
    
    jewelry: {
      inspirations: ["Faberge"],
      stones: { perfect: ["Amethyst", "Blue topaz", "Topaz", "Garnet", "Quartz", "Pearls", "Sapphires", "Green Glass", "Tourmaline", "Aventurine"] },
      metals: { perfect: ["Gold", "Silver"] },
      styles: ["Enamel designs", "Cameos", "Cloisonne", "Jeweled flowers", "Bird Pendants", "Delicate dangling bird earrings", "feather earrings", "Climbing flowers", "Filigree", "Whimsical designs with birds, trees and houses"]
    },
    
    makeup: {
      soft: "Pastels and Skin tones",
      evening: "Deep Rose and Dusty red with Emerald and Blue"
    },
    
    eras: ["Edwardian", "French 1700's", "Russian Princess 1800's"],
    artists: ["Degas", "Sargent"]
  },

  roseGoldSummer: {
    id: "rose-gold-summer",
    season: "Summer",
    name: "Rose Gold Summer",
    
    palette: {
      skinTones: ["Rose Gold", "Rose", "Antique Rose", "Peach-Rose", "Cream", "Ivory"],
      romantic: ["Coral Rose", "Rose", "Velvet Rose"],
      hairColor: ["Golden Brown", "Soft Brown", "Chocolate"],
      eyeColor: ["Blue Green", "Aqua", "Gold Green", "Aquamarine"],
      neutrals: ["Taupe", "Mushroom", "Dove Grey", "Silver Grey", "Blue Purple", "Grey Purple", "Slate Blue"],
      formal: ["Navy Blue", "Prussian Blue", "Indigo"],
      pastels: ["Silver-Green", "Silver Blue", "Lavender"],
      enlivened: ["Teal", "Blue Green"],
      highShade: ["Emerald", "Bright Teal"]
    },
    
    colorCombinations: [
      "Antique Rose, Cream and Coral",
      "Emerald, Coral and Ivory",
      "Blue Purple, Silver Purple and Ivory",
      "Navy Blue and Ivory",
      "Lemon yellow, Cream and Golden Brown",
      "Golden Brown and Chocolate",
      "Golden Brown, Ivory and Rose",
      "Teal and Green"
    ],
    
    paletteEffects: ["English Rose Garden", "Renaissance Princess", "Gibson Girl", "French 1700's", "English 1800's", "Ancient Greece", "Edwardian Costume", "Ballerina Costume"],
    
    fabrics: ["Fine Velvet", "Crushed Velvet", "Velour", "Jersey", "Fine Tweed", "Tulle", "Chiffon", "Lace", "Crocheted Lace", "Gauze Cotton", "Silk", "Denim", "Fine Corduroy", "Chambray", "Shredded Tulle", "Brocade-Soft"],
    
    prints: ["Hearts", "Fleur De Lis", "Ribbons", "Toile in Roses, Leaves and Fountain", "Peonies", "Tulips", "Hollyhocks", "Larkspur", "Dogwood", "Hydrangeas", "Daisies", "Paisley", "Window Panes", "Fine Stripe", "Seashells", "Pearls", "Sea Glass", "Watercolor Prints", "Polka Dots", "Small Diamonds", "Ovals", "Leopard Prints", "Birds", "Deer"],
    
    style: {
      silhouettes: ["A line Skirt", "A line Dress"],
      sleeves: ["Bell Sleeve", "Puff Sleeve", "Butterfly sleeve"],
      necklines: ["Square Neckline", "Sweetheart Neckline", "Oval Neckline"],
      looks: ["Renaissance looks", "Ballerina", "Riding Style", "Grecian Dress"],
      shoes: ["Wedges", "Espadrilles", "Oval Toes", "Rounded rectangular toe", "pointed toe"]
    },
    
    jewelry: {
      stones: { perfect: ["White Coral", "Pearls", "Pink Coral", "Sea Glass", "Aventurine", "Topaz", "Blue Topaz", "Quartz", "Marble", "Opals"] },
      metals: { perfect: ["Rose Gold", "Woven Gold", "Silver"] },
      styles: ["Hearts", "Lockets", "Ribbons", "Delicate chains", "layered rings and bracelets"]
    },
    
    makeup: {
      dramatic: "High Shade for impact, Emerald and Teal with Coral",
      everyday: "Soft Roses and Creams"
    },
    
    designers: ["BlueMarine", "Chloe", "Ulla Johnson", "Stella McCartney"],
    artists: ["Sargent", "Manet"]
  },

  summerRose: {
    id: "summer-rose",
    season: "Summer",
    name: "Summer Rose",
    
    beautyStatement: "A Watercolor Palette in Blues, Greens and Purples. The Golden-Browns and Creams add warmth to the pastels. A Palette of a Rose Garden in late Summer",
    
    paletteEffects: ["Summer Rose Garden", "Lake with Water Lilies", "Japanese Garden", "Renaissance Princess"],
    
    palette: {
      skinTones: ["Rose", "Apricot", "Cream", "Dark Rose", "Mauve Rose", "Ballet Pink", "Ivory"],
      romantic: ["Soft red", "Rose Red", "Blush"],
      formal: ["Navy Blue", "Midnight Blue", "Prussian Blue"],
      hairColor: ["Golden Brown", "Cocoa", "Mushroom", "Amber"],
      eyeColor: ["Green", "Blue Green", "Aqua", "Seafoam", "Emerald"],
      neutral: ["Mushroom", "Taupe", "Slate Blue", "Silver Grey", "Dark plum", "Dusty Purple"],
      metallics: ["Rose Gold", "Silver", "Gold"],
      enlivened: ["Aquamarine", "Bright Seafoam"],
      highNote: ["Emerald", "Sapphire"],
      pastels: ["Lavender", "Violet", "Chartreuse", "Light Apricot", "Sage"]
    },
    
    colorCombinations: [
      "Rose, Cream, Dusty Red",
      "Midnight Blue and Ivory",
      "Prussian Blue and Sky Blue",
      "Sky Blue, Aqua and Sage",
      "Golden Brown, Cream and Gold",
      "Emerald and Sage",
      "Slate Blue, Navy Blue and Ivory",
      "Cocoa, Soft Olive and Plum",
      "Plum, Lavender and Silver"
    ],
    
    fabrics: ["Eyelet", "Lace", "Crocheted Lace", "Knitted Lace", "Velvet", "Crushed Velvet", "Fine Corduroy", "Chambray", "Denim", "Cotton-Linen", "Organza", "Chiffon", "Tulle", "Tweed", "Boucle", "Angora", "Silk", "Gauze Cotton", "Jersey", "Suede", "Soft Leather", "Fine Knits", "Fisherman Knits", "Irish Knits", "Embroidered Cotton", "Needlepoint/Tapestry"],
    
    prints: ["Flowers", "Ribbons", "Pearls", "Birds", "Bird Cages", "Feathers", "Butterflies", "Deer", "Diamond Prints", "Vases", "Fleur De Lis", "Fine Stripes", "Porcelain Prints", "Plaid", "Roses", "Peonies", "Tulips", "Jasmine", "Star Flowers", "Lilacs", "Hydrangeas", "Hibiscus", "Water Lilies", "Lotus", "Paisley", "Hearts", "Lockets", "Bows", "Cherry Blossoms", "Magnolias", "Gardenias"],
    
    style: {
      overview: "Garden Fairy, Cowgirl Style, Milk Maiden, English Rose, Sailor Chic, Japanese Kimono Style, Riding Style",
      dresses: ["Shirtwaist Dress", "Peasant Dress", "Embroidered Dress", "Jersey Dress", "Denim Dress", "A-Line Dress", "Pleated Grecian Dress", "Tulle Dress", "Military Style Dress"],
      skirts: ["Tweed with shredded tulle hem", "Tulle Skirt", "Ballerina Skirt", "Denim Skirt", "Plaid Skirt", "Wool Pencil Skirt"],
      tops: ["Ribbon tied tops", "Angora Sweaters", "Trompe L'oeil Sweaters", "Floral Cashmere", "Lace Blouse", "Peasant Top", "Kimono Top"],
      shoes: ["Espadrilles", "Ballet Flats", "Suede Ankle Boots", "Embroidered Loafers", "Grecian Sandals", "Riding Boots"],
      coats: ["Princess Style Coat", "Suede Biker Jacket", "Tweed Coat", "Velvet Coat"],
      recommendations: [
        "Wear Something tailored with something romantic",
        "Denim Skirt with Romantic Blouse",
        "Create an hourglass or Oval Silhouette"
      ]
    },
    
    jewelry: {
      stones: { perfect: ["Pearls", "White Coral", "Aquamarine", "Jade", "Blue Topaz", "Garnet", "Amethyst", "Quartz"] },
      styles: ["Cameos", "Enamel", "Pave", "Filigree", "Ribbon earrings and Necklaces", "Leaves and Flowers in Climbers", "Birds", "Butterflies", "Bird Cages"]
    },
    
    makeup: {
      daytime: "Pastels",
      evening: "High shade/dramatic"
    },
    
    eras: ["Grecian", "Ancient Chinese Prints", "Ancient Japan", "English Classic", "1940's and 1950's", "Dutch and Flemish Antique Design"],
    artists: ["Monet", "Vermeer"]
  },

  sunsetSummer: {
    id: "sunset-summer",
    season: "Summer",
    name: "Sunset Summer",
    alternateName: "Late Summer Palette",
    
    palette: {
      colors: ["Cream", "Rose", "Deep Rose", "Mauve", "Sangria", "Burgundy", "Deep Purple", "Violet", "Chocolate", "Green/Brown", "Teal", "Sea Green", "Bottle Green", "Silver", "Amber", "Silver Purple", "Powder Blue", "Slate Blue", "Seafoam Green", "Forest Green", "Midnight Blue"]
    },
    
    colorCombinations: [
      "Cream and Chocolate",
      "Rose, Cream and Green",
      "Amber, Purple and Silver",
      "Forest Green and Soft Green",
      "Amber, Chocolate and Cream",
      "Seafoam Green and Silver",
      "Rose, Amber and Violet"
    ],
    
    fabrics: ["Jersey", "Angora", "Velvet", "Chenille", "Chiffon", "Fine Cotton", "Organza", "Fine Corduroy", "Mohair", "Twill", "Cotton/Linen mix"],
    
    paletteEffects: ["Grecian draped dresses", "Edwardian Era", "English 1800's", "Riding Style", "French Contemporary"],
    
    style: {
      shoes: ["Cowboy Boots", "Oval Toe", "Espadrilles"],
      details: ["Criss cross Ribbons", "Worn Leather", "Leopard Print chiffon", "Mermaid style", "A line", "Fine pleats", "Soft waves", "Side part", "Net Lace", "Crochet Lace", "Paisley Prints", "Silver and Gold woven into fabrics", "Cowl neck", "S shaped dresses", "Jackets over flowy dresses", "Romantic Ribbons", "Bell shaped Sleeve", "Small puff at shoulder"]
    },
    
    jewelry: {
      metals: { perfect: ["Antique Gold", "Silver"] },
      stones: { perfect: ["Aquamarine", "Labradorite", "Turquoise", "Opals", "Rose Quartz", "Pink Pearls"] },
      styles: ["Delicate Florals and Leaves", "Enameled Flowers"]
    },
    
    makeup: {
      lips: { perfect: ["Mauve", "Sangria"] },
      cheeks: { perfect: ["Rose", "Mauve"] },
      eyes: { perfect: ["Green and gold eyeliner/Shadow"] },
      looks: ["Soft look with shades of rose and strong brow", "Smudged eyeliner/soft shadow"]
    }
  },

  waterLilySummer: {
    id: "water-lily-summer",
    season: "Summer",
    name: "Water Lily Summer",
    
    palette: {
      formal: ["Navy Blue", "Dark Blue", "Midnight"],
      neutral: ["Silver Grey", "Mushroom", "Light Taupe"],
      hairColor: ["Golden Brown", "Amber", "Cocoa"],
      skinTones: ["Rose", "Peach-Rose", "Apricot", "Cream", "Ivory"],
      romantic: ["Coral-Red", "Soft Red", "Rose-Coral"],
      eyeColor: ["Amber", "Golden Brown"],
      enlivened: ["Green", "Dark Emerald", "Turquoise", "Teal"],
      highShade: ["Sapphire", "Dark Cobalt"],
      pastels: ["Pistachio green", "Soft green", "Apricot", "Apricot Cream", "Lemon Cream"],
      metals: ["Rose Gold", "Silver"]
    },
    
    colorCombinations: [
      "Rose, Cream and Rose Gold",
      "Powder blue, Navy Blue and Pink",
      "Amber, Emerald and Seafoam",
      "Lavender and Emerald",
      "Light Purple and Rose Red",
      "Rose Red and Teal",
      "Taupe, Cream and Coral Red",
      "Sea Green and Bottle Green"
    ],
    
    paletteEffects: ["Summer Rose Garden", "Gibson Girl", "Edwardian Style", "Renaissance Style", "French Girl Fashion", "1920's Flapper Looks", "Grecian drapes and fine pleats"],
    
    fabrics: ["Fine Corduroy", "Velvet", "Chenille", "Crochet lace", "Eyelet", "Fine Lace", "Mohair", "Fine Tweed", "Jersey wool", "Satin", "Boucle", "Polished cotton", "Chiffon", "Organza", "Denim", "Chambray", "Suede", "Crushed Velvet", "Crushed silk", "China Silk", "Trompe l'oeil ribbons and lace"],
    
    prints: ["Fleur de lis", "Roses prints", "Watercolor Prints", "Fine Stripes", "Prince of Wales", "Diamond prints (small)", "Embroidered Flowers and Birds", "Leaves and Branches", "Bird and Butterfly print", "Small polka dots", "velvet polka dots", "Feathers and Wings", "Lilacs", "Lavender", "Dahlias", "Peonies", "Roses", "Honeysuckle", "Climbing Roses"],
    
    style: {
      overview: "Gibson Girl Style, Safari Style, Military Braid and Buttons, 1920's Looks, hourglass and S shape lines, Sari inspired looks",
      dresses: ["A Line", "Belted at waist", "Flowy Fabric", "Bell sleeve", "Cape Dresses", "Mandarin Collar", "Kimono Dress", "Wrap dresses"],
      skirts: ["A Line or Straight", "Peasant style", "Fine pleats"],
      hair: ["High Bun or on one side", "Shoulder length hair", "French bob", "Side part or all back"],
      shoes: ["Rounded (oval) toe", "Pointed toe", "Soft rectangle", "Ballerina style", "Ankle boots in suede", "Wrap straps", "Riding boots"],
      coats: ["Princess style", "Riding Style", "Suede Jacket", "Cape Coats"],
      accessories: ["Floral Gloves", "Butterfly and Bird Pins", "Wrap Belts", "Corset belts", "Velvet belts"]
    },
    
    jewelry: {
      stones: { perfect: ["Pink Coral", "Pearls", "Seashells", "Sapphires", "Emeralds", "Rubies", "Garnet", "Labradorite", "Amethyst"] },
      metals: { perfect: ["Rose Gold", "Gold", "Silver"] },
      styles: ["Delicate designs of leaves, trees, birds and Flowers", "Hearts and Lockets", "Filigree", "scrollwork", "Enamel"]
    },
    
    makeup: {
      soft: "Skin tones with pastels",
      evening: "High shade and romantic colors"
    },
    
    designers: ["Chloe", "Louis Vuitton"],
    artists: ["Matisse", "Rossetti"]
  }
};

export default { SPRING_SUBTYPES, SUMMER_SUBTYPES };
