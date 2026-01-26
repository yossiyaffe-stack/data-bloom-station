/**
 * STREAMS OF COLOR - COMPLETE AI ALGORITHM
 * =========================================
 * Part 2: Autumn Subtypes
 * 
 * Merged from Nechama Yaffe's consultation documents
 * Client names removed for privacy
 */

export const AUTUMN_SUBTYPES = {

  auburnAutumn: {
    id: "auburn-autumn",
    season: "Autumn",
    name: "Auburn Autumn",
    palette: {
      colors: ["Prussian Blue", "Blue-Green", "Dark Emerald", "Hunter", "Bronze Green", "Terra Cotta", "Apricot", "Apricot cream", "Yellow-Cream", "Amber", "Topaz", "Chocolate Brown"]
    },
    colorCombinations: ["Burnt Orange, Amber and Cream", "Emerald and Cream", "Prussian Blue and Terra Cotta", "Forest Green, Cream and Slate Blue"],
    paletteEffects: ["Mid Autumn", "Woods and Pine Trees", "Knight's Armour", "Persian Carpet"],
    fabrics: ["Velvet", "Tweed", "Herringbone", "Blanket wool", "Aran Knits", "Irish tweed", "Linen"],
    prints: ["Herringbone", "American Indian designs", "Geometric prints", "Paisley", "Hawks", "Elephants", "Tigers", "Pine Trees"],
    jewelry: { metals: { perfect: ["Antique Gold", "Bronze", "Pewter"] }, stones: { perfect: ["Topaz", "Emerald", "Amber"] } }
  },

  burnishedAutumn: {
    id: "burnished-autumn",
    season: "Autumn", 
    name: "Burnished Autumn",
    palette: {
      skinTones: ["Terra Cotta", "Apricot", "Apricot Cream", "Cream"],
      formal: ["Blue-Black", "Midnight Blue", "Prussian Blue", "Chocolate"],
      hairColor: ["Amber", "Topaz", "Chocolate"],
      eyeColor: ["Amber", "Gold"],
      highShade: ["Emerald Green", "Prussian Blue"],
      neutrals: ["Grey", "Grey Brown", "Rust"],
      romantic: ["Burgundy", "Maroon", "Brick Red"]
    },
    colorCombinations: ["Terra Cotta and Cream", "Emerald, Midnight and Copper", "Copper, Olive Green and Cream", "Prussian Blue and Copper"],
    paletteEffects: ["Mediterranean", "Portuguese Mosaic", "Spanish Desert", "Italy 1800's", "Moroccan Textiles"],
    fabrics: ["Shantung", "Fine Lace", "Satin", "Linen", "Wool/silk mix", "Denim", "Cashmere", "Mohair", "Fur"],
    prints: ["Sari Motifs", "Indian prints", "Paisley", "Palm Trees", "Fig Trees", "Pomegranates", "Grapes and Vines", "Pucci Prints"],
    jewelry: { stones: { perfect: ["Emeralds", "Jade", "Labradorite", "Pearls"] }, metals: { perfect: ["Copper", "Antique Gold", "Bronze"] }, styles: ["Rope chains", "Asymmetrical", "Branches and Leaves", "Enamel", "Mosaic"] },
    makeup: { dramatic: "Emerald and Blue eye liner", soft: "Coral/TerraCotta and Cream" },
    designers: ["Cavalli", "Etro"],
    artists: ["Corot", "Gauguin"]
  },

  cloisonneAutumn: {
    id: "cloisonne-autumn",
    season: "Autumn",
    name: "Cloisonne Autumn",
    palette: {
      formal: ["Midnight Blue", "Navy Blue", "Prussian Blue"],
      neutral: ["Olive", "Black olive", "Grey Olive", "Moss"],
      hairColor: ["Chocolate Brown", "Amber", "Golden Brown"],
      skinTones: ["Rose", "Rose-Peach", "Apricot", "Pink Terra Cotta", "Ecru", "Ivory"],
      romantic: ["Sangria", "Soft Red", "Blush Rose"],
      eyeColor: ["Blue-Green", "Emerald", "Seafoam"],
      enlivened: ["Bright Emerald", "Dark Emerald"],
      highShade: ["Aquamarine", "Tiffany blue", "Prussian Blue"],
      metals: ["Antique Gold", "Rose Gold", "Pewter"]
    },
    colorCombinations: ["Midnight and Cream", "Aqua and Peach", "Sage, Cream and Apricot", "Sapphire Blue and Tiffany Blue"],
    paletteEffects: ["Cloisonne and Chinoiserie", "Japanese Garden", "Kimono Palette", "English Rose", "French Girl Look"],
    fabrics: ["Silk Shantung", "Brocade", "Tweed", "Velvet", "Crocheted Lace", "Fine Wool", "Soft Satin", "Denim", "Tapestry"],
    prints: ["Soft Plaid", "Fine Checks", "Mosaic Prints", "Porcelain Prints", "Toile", "Leaves and Ivy", "Birds", "Deer", "Kimono Prints"],
    jewelry: { types: ["Cloisonne", "Enamel", "Multi Colored Stones"], stones: { perfect: ["Sapphires", "Emeralds", "Topaz", "Jade", "Opals"] }, styles: ["Gold Filigree", "Dangling earrings", "Feathers and tassels", "Cameos"] },
    designers: ["Chloe", "Ralph Lauren", "Ulla Johnson"],
    artists: ["Rossetti", "Sargent"]
  },

  grecianAutumn: {
    id: "grecian-autumn",
    season: "Autumn",
    name: "Grecian Autumn",
    palette: { description: "Autumn Sunset. Golden Saffrons, Burnt Oranges. Soft Apricots. Brick Reds and Dark Purples. Blue Greens. Indigo Blues." },
    colorCombinations: ["Purple, Olive and Copper", "Caramel, Terra-Cotta and Dark Brown", "Indigo Blue and Copper", "Olive, Sangria and Deep Purple"],
    paletteEffects: ["Grecian Style", "Indo-Persian Style", "Indian Sari Prints", "Spanish Romantic", "Italian Renaissance"],
    fabrics: ["Sari Fabric", "Indo-Persian Embroidery", "Shantung", "Pleated Chiffon", "Satin", "Cashmere", "Velvet", "Dark Lace", "Etro Prints"],
    jewelry: { stones: { perfect: ["Emerald", "Citrine", "Topaz", "Tourmaline", "Yellow Diamonds"] }, metals: { perfect: ["Copper", "Gold", "Antique Gold"] }, styles: ["Pave Jewels", "Moroccan Jewelry", "Multi Stranded Gold"] },
    makeup: { lips: { perfect: ["Apricot", "Terra-Cotta", "Sangria"] }, cheeks: { perfect: ["Burnt Orange", "Lavender"] } }
  },

  mellowAutumn: {
    id: "mellow-autumn",
    season: "Autumn",
    name: "Mellow Autumn",
    palette: {
      skinTones: ["Terra Cotta", "Apricot", "Soft Coral", "Cream", "Peach-Rose"],
      romantic: ["Burgundy", "Maroon", "Dark Mauve", "Coral Pink"],
      formal: ["Black", "Blue Black", "Prussian Blue", "Midnight Blue"],
      hairColor: ["Chocolate", "Amber", "Topaz"],
      eyeColor: ["Golden Brown", "Gold", "Olive", "Golden Green"],
      neutrals: ["Mushrooms", "Charcoals", "Olive", "Deep Purple", "Raisin"],
      metallics: ["Gold", "Bronze", "Copper", "Pewter"],
      enlivened: ["Dark Teal", "Grey Green", "Blue Green"],
      highNote: ["Bright Teal", "Prussian Blue", "Emerald"]
    },
    colorCombinations: ["Teal, Apricot and Cream", "Charcoal, Pewter and Cream", "Terra Cotta, Olive and Teal", "Gold and Dark Emerald"],
    paletteEffects: ["Grecian Princess", "Mediterranean Palette", "End of Autumn", "Spanish Desert", "Ancient Japan", "Renaissance Italy"],
    fabrics: ["Denim", "Fur", "Mohair", "Tweed", "Leather", "Suede", "Shantung", "Chiffon", "Velvet", "Brocade", "Tapestry"],
    prints: ["Paisley", "Herringbone", "Houndstooth", "Prince of Wales", "Leaves", "Branches", "Moroccan Tile", "Animal print", "Feathers"],
    jewelry: { metals: { perfect: ["Copper", "Antique Gold", "Pewter", "Yellow Gold"] }, stones: { perfect: ["Topaz", "Emerald", "Amber", "Citrine", "Labradorite", "Pearls", "Coral", "Jade", "Ivory"] }, styles: ["Braided gold", "chain link", "rope necklaces", "Leaves, Coins, Feathers", "Filigree", "Enamel"] },
    eras: ["19th Century Morocco", "19th Century Spain and Italy", "1940's", "1920's Art Deco"],
    artists: ["Modigliani", "Corot"],
    designers: ["Etro", "Cuccinelli", "Ralph Lauren"]
  },

  multiColoredAutumn: {
    id: "multi-colored-autumn",
    season: "Autumn",
    name: "Multi-Colored Autumn",
    palette: { colors: ["Putty", "Ecru", "Oyster-Shell", "Soft Terra Cotta", "Pink-Browns", "Prussian Blue", "Cobalt Blue", "Olive Green", "Sap Green", "Black Green", "Bright Coral Orange", "Rust Red", "Gold", "Black Brown", "Emerald", "Raisin", "Deep Purple"] },
    colorCombinations: ["Coral and Ecru", "Black Brown, Gold and Ecru", "Coral and Emerald", "Cobalt Blue and Gold"],
    paletteEffects: ["Multicolored Gems and Tapestry", "Queen Esther Palette", "Coat of Many Colors", "Persian Design", "Spanish Renaissance"],
    fabrics: ["Chiffon", "Black/Brown lace", "Linen", "Satin", "Cashmere", "Pashmina", "Sari cloth", "Suede", "Velvet", "Embossed leather"],
    styleDos: ["Mix fabrics and textures", "Asymmetrical hemlines", "Wrap dresses, V neckline", "Renaissance details", "Cape like wraps", "Mandarin Collar"],
    styleDonts: ["Don't wear Spring-like rounded prints", "Don't wear too many ruffles", "Avoid colors too Yellow or Pink"],
    jewelry: { stones: { perfect: ["Jasper", "Labradorite", "Coral", "Turquoise", "Topaz", "Amber", "Green Onyx", "Ivory", "Yellow diamonds"] }, styles: ["Braided chains", "Links", "Woven Gold", "Ropes and Tassels", "Crescent Shaped", "Chandelier earrings", "Animal shapes", "Cloisonne", "Enamel"] },
    makeup: { options: ["Orange lip with Neutral cheek", "Kohl eyeliner with Nude lip", "Rust Red lip with Smokey eye", "Gold eyeshadow for evening"] },
    artists: ["El Greco", "Corot", "Modigliani"],
    designers: ["Cavalli", "Missoni", "Brunello Cuccinelli"]
  },

  persianAutumn: {
    id: "persian-autumn",
    season: "Autumn",
    name: "Persian Autumn",
    palette: {
      formal: ["Midnight Blue", "Black Lace", "Midnight Green"],
      neutral: ["Olive", "Black Olive", "Burgundy", "Deep Purple"],
      hairColor: ["Chocolate Brown", "Golden Brown", "Amber", "Topaz"],
      skinTones: ["Terra Cotta", "Soft Peach", "Rose-Terra Cotta"],
      romantic: ["Coral", "Red Coral", "Orange", "Rust", "Wine Red"],
      eyeColor: ["Coffee", "Caramel", "Black Brown"],
      enlivened: ["Jade", "Emerald"],
      highShade: ["Prussian Blue", "Soft Turquoise"],
      metals: ["Copper", "Antique Gold", "Yellow Gold", "Pewter"]
    },
    colorCombinations: ["Prussian Blue and Cream", "Burgundy, Sage and Ecru", "Turquoise and Silver", "Purple, Coral and Ivory"],
    paletteEffects: ["Spanish Desert", "Moroccan Tile", "Italian Seaside", "Japanese Garden"],
    fabrics: ["Metallic Chiffon", "Lace", "Wool Knit", "Silk Shantung", "Denim", "Leather", "Suede", "Sari Fabric", "Tweed"],
    prints: ["Birds, Tigers, Elephants and Leopards", "Paisley", "Geometric Shapes", "Mosaic patterns", "Kimono Prints", "Pagodas", "Missoni Stripe", "Peacock feathers"],
    jewelry: { metals: { perfect: ["Gold", "Antique gold", "Copper", "Pewter"] }, stones: { perfect: ["Polished Jade", "Amber", "Pearls", "Ivory"] }, styles: ["Birds, Branches, Leaves and Feathers", "Hammered gold", "Mosaic and Enamel designs"] },
    designers: ["Etro", "Dries Van Noten", "Cavalli"],
    artists: ["Corot", "Modigliani", "Gauguin"]
  },

  renaissanceAutumn: {
    id: "renaissance-autumn",
    season: "Autumn",
    name: "Renaissance Autumn",
    palette: {
      formal: ["Midnight Blue", "Navy Blue", "Prussian Blue"],
      neutral: ["Charcoal", "Pewter", "Slate", "Dove-Greys"],
      hairColor: ["Chocolate Brown", "Amber", "Golden Brown", "Camel"],
      skinTones: ["Terra Cotta", "Apricot", "Pink Terra Cotta", "Ecru", "Ivory", "Champagne"],
      romantic: ["Sangria", "Coral", "Coral Red"],
      eyeColor: ["Blue-Green", "Emerald", "Seafoam", "Deep Green"],
      enlivened: ["Green", "Teal", "Dark Emeralds"],
      highShade: ["Aquamarine", "Tiffany blue", "Cobalt"],
      metals: ["Antique Gold", "Pewter", "Yellow Gold", "Bronze", "Copper"]
    },
    colorCombinations: ["Ivory, Sage Green, Maroon", "Cobalt and Gold", "Champagne and Chocolate", "Midnight Blue and Dark Emerald"],
    paletteEffects: ["Renaissance Queen", "Mediterranean Palette", "Medieval Spanish and Italian", "Persian and Moroccan", "Guinevere"],
    fabrics: ["Silk shantung", "Silk", "Satin", "Taffeta", "Velvet", "Corduroy", "Denim", "Cashmere", "Pashmina", "Lace", "Sari silk", "Tapestries", "Tweed", "Leather", "Suede", "Mohair", "Etro Prints"],
    prints: ["Printed chiffon of houses, Trees, Water", "Leaf and Branch prints", "Paisley", "Tiger, Zebra, leopard", "Ostrich and Peacock feathers", "Houndstooth", "Burberry Plaid", "Military braid and Gold buttons"],
    jewelry: { metals: { perfect: ["Gold", "Pewter", "Copper", "Silver"] }, stones: { perfect: ["Pearls", "shells", "amber", "Topaz", "Jade", "Onyx", "Opals", "Blue Topaz"] }, styles: ["Rope necklaces", "Chain links", "Indian and Persian designs", "Grapes, wheat, leaves motifs"] },
    designers: ["Etro", "Dries Van Noten"],
    artists: ["John Singer Sargent"]
  },

  sunlitAutumn: {
    id: "sunlit-autumn",
    season: "Autumn",
    name: "Sunlit Autumn",
    beautyStatement: "Like an Early September day. Leaves just changing, mix of flowers, fruits and leaves",
    paletteEffects: ["Sunlight in Early Autumn", "Mediterranean seaside", "Boats and Sunset", "Harvest"],
    palette: {
      skinTones: ["Terra Cotta", "Rose Terra Cotta", "Apricot", "Apricot-cream", "Ecru", "Cream"],
      romantic: ["Sangria", "Red Brown", "Burgundy", "Raisin"],
      formal: ["Black", "Midnight Blue", "Midnight Green", "Black Brown"],
      hairColor: ["Walnut", "Dark Brown", "Golden Brown", "Caramel"],
      eyeColor: ["Blue Green", "Olive Green", "Light Olive"],
      neutral: ["Plum", "Deep purple", "Olive"],
      metallics: ["Silver", "Gold", "Antique Silver", "Burnished Silver"],
      enlivened: ["Sea Green", "Emerald Green", "Deep Green"],
      highNote: ["Bright blue", "Midnight Blue", "Aqua", "Sea Green"]
    },
    colorCombinations: ["Ivory, Gold and Olive", "Plum, Gold and Silver", "Rose, Apricot and Cream", "Midnight Blue, Chocolate Brown and Gold", "Dark Brown, Caramel and Gold"],
    fabrics: ["Heavy lace", "Crocheted lace", "Fine lace", "Gold and Copper lace", "Jersey wool", "Boucle", "Irish knits", "Tweed", "velvet", "brocade", "Denim", "Leather", "Suede", "Feathers", "Chambray", "organza", "linen", "Cashmere", "Angora", "Mohair", "Fur"],
    prints: ["Leaves and Flowers", "Fan shaped flowers", "Palm trees", "Wheat", "Plaid", "Herringbone", "Chevron", "Missoni", "Prince of Wales", "Butterflies", "exotic birds", "tropical flowers", "Leopards, Cheetah, Tiger", "Paisley", "Indian prints", "Persian rug prints"],
    jewelry: { stones: { perfect: ["Emeralds", "ivory", "Jade", "Blue Topaz", "Topaz", "Pearls", "pink coral", "white coral"] }, metals: { perfect: ["Gold", "antique gold", "antique silver"] }, styles: ["Links", "ropes and chains", "Birds, wings, feathers", "Tassels", "Egyptian motifs", "Persian paisley", "Seashell and fan earrings"] },
    eras: ["1970's", "Classic Grecian", "Mediterranean looks", "Egyptian"],
    artists: ["Van Gogh", "Da Vinci"],
    designers: ["Cavalli", "Dries Van Noten", "Brunello Cuccinelli"]
  },

  tapestryAutumn: {
    id: "tapestry-autumn",
    season: "Autumn",
    name: "Tapestry Autumn",
    palette: {
      formal: ["Midnight Blue", "Prussian Blue"],
      neutral: ["Olive", "Black Olive", "Burgundy", "Maroon", "Purple", "Raisin"],
      hairColor: ["Golden Brown", "Amber", "Chocolate Brown"],
      skinTones: ["Terra Cotta", "Soft Peach", "Ivory", "Cream"],
      romantic: ["Coral", "Coral Pink", "Soft Rust"],
      eyeColor: ["Green", "Golden Green", "Emerald", "Aqua"],
      enlivened: ["Emerald Green-Bright", "Blue-Green"],
      highShade: ["Cobalt Blue", "Bright Prussian Blue"],
      metals: ["Copper", "Bronze", "Antique Gold", "Pewter"]
    },
    colorCombinations: ["Midnight Blue and Cream", "Terra Cotta, Coral and Cream", "Emerald, Cobalt and Gold", "Olive, Purple and Coral"],
    paletteEffects: ["Spanish Sunset", "Mediterranean Seaside", "Spanish Princess", "French Girl Chic"],
    fabrics: ["Silk Shantung", "Silk-Linen", "Linen-Cotton", "Denim", "Fur", "Suede", "Velvet", "Satin", "Boucle", "Tweed", "Cashmere", "Tapestry", "Brocade"],
    prints: ["Paisley", "Mosaic", "Tile patterns", "Spanish motifs", "Mediterranean prints", "Fruit and Vine", "Leaves and Branches", "Animal prints"],
    jewelry: { metals: { perfect: ["Copper", "Bronze", "Antique Gold", "Pewter"] }, stones: { perfect: ["Coral", "Amber", "Topaz", "Jade", "Turquoise"] }, styles: ["Mosaic designs", "Tapestry inspired", "Ethnic patterns", "Coins", "Links"] },
    designers: ["Etro", "Missoni"],
    artists: ["Corot"]
  },

  topazAutumn: {
    id: "topaz-autumn",
    season: "Autumn",
    name: "Topaz Autumn",
    palette: {
      formal: ["Midnight Blue", "Prussian Blue", "Black Brown"],
      neutral: ["Olive", "Brown Olive", "Raisin", "Deep Purple"],
      hairColor: ["Golden Brown", "Amber", "Chocolate", "Topaz"],
      skinTones: ["Terra Cotta", "Apricot", "Soft Peach", "Cream", "Ecru"],
      romantic: ["Burgundy", "Wine", "Coral", "Rust"],
      eyeColor: ["Topaz", "Amber", "Golden Brown", "Olive"],
      enlivened: ["Emerald", "Teal", "Blue Green"],
      highShade: ["Cobalt", "Sapphire", "Bright Teal"],
      metals: ["Gold", "Antique Gold", "Copper", "Bronze"]
    },
    colorCombinations: ["Amber, Cream and Olive", "Emerald and Gold", "Burgundy and Cream", "Teal and Topaz"],
    paletteEffects: ["Autumn Jewels", "Golden Harvest", "Mediterranean Autumn", "Spanish Gold"],
    fabrics: ["Silk Shantung", "Velvet", "Suede", "Leather", "Tweed", "Cashmere", "Wool", "Brocade", "Satin", "Linen"],
    prints: ["Paisley", "Leaves and Branches", "Geometric", "Animal prints", "Ethnic patterns", "Mosaic"],
    jewelry: { metals: { perfect: ["Gold", "Antique Gold", "Copper", "Bronze"] }, stones: { perfect: ["Topaz", "Amber", "Citrine", "Yellow Sapphire", "Emerald", "Jade"] }, styles: ["Links", "Chains", "Coins", "Leaves and Branches", "Ethnic designs"] },
    designers: ["Etro", "Cavalli"],
    artists: ["Corot", "Modigliani"]
  }
};

export default { AUTUMN_SUBTYPES };
