export interface MenuItem {
  code: string;
  nameDe: string;
  nameEn: string;
  descriptionDe?: string;
  descriptionEn?: string;
  price: number;
  priceLarge?: number; // For sets that have small/large options
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
}

export interface MenuCategory {
  id: string;
  titleDe: string;
  titleEn: string;
  items: MenuItem[];
}

export const regularMenu: MenuCategory[] = [
  {
    id: 'starters',
    titleDe: 'Vorspeisen',
    titleEn: 'Starters',
    items: [
      {
        code: 'V1',
        nameDe: 'Mini Frühlingsrollen',
        nameEn: 'Mini Spring Rolls',
        descriptionDe: 'Knusprige vegetarische Frühlingsrollen (6 Stk.) mit Süß-Sauer Sauce',
        descriptionEn: 'Crispy vegetarian spring rolls (6 pcs) served with sweet and sour sauce',
        price: 4.90,
        isVegetarian: true,
        isVegan: true
      },
      {
        code: 'V2',
        nameDe: 'Ebi Tempura',
        nameEn: 'Ebi Tempura',
        descriptionDe: 'Panierte Riesengarnelen (3 Stk.) mit Süß-Sauer Sauce',
        descriptionEn: 'Deep fried tempura prawns (3 pcs) served with sweet and sour sauce',
        price: 5.90
      },
      {
        code: 'V3',
        nameDe: 'Gyoza',
        nameEn: 'Gyoza',
        descriptionDe: 'Gebackene Teigtaschen gefüllt mit Hühnerfleisch oder Gemüse (5 Stk.) mit Süß-Sauer Sauce',
        descriptionEn: 'Fried dumplings filled with chicken or vegetables (5 pcs) served with sweet and sour sauce',
        price: 4.50
      },
      {
        code: 'V4',
        nameDe: 'Sommerrollen',
        nameEn: 'Summer Rolls',
        descriptionDe: 'Frische Sommerrollen mit Lachs oder Garnelen, Salat und Kräutern (2 Stk.)',
        descriptionEn: 'Fresh summer rolls with salmon or prawns, salad, and herbs (2 pcs)',
        price: 6.90
      },
      {
        code: 'V5',
        nameDe: 'Wakame Salat',
        nameEn: 'Wakame Salad',
        descriptionDe: 'Seetang Salat mit Sesam',
        descriptionEn: 'Seaweed salad topped with sesame seeds',
        price: 5.50,
        isVegetarian: true,
        isVegan: true
      },
      {
        code: 'V6',
        nameDe: 'Kimchi',
        nameEn: 'Kimchi',
        descriptionDe: 'Scharf fermentierter Chinakohl auf koreanische Art',
        descriptionEn: 'Spicy fermented napa cabbage Korean style',
        price: 5.50,
        isSpicy: true,
        isVegetarian: true
      },
      {
        code: 'V7',
        nameDe: 'Edamame',
        nameEn: 'Edamame',
        descriptionDe: 'Gegarte grüne Sojabohnen mit Meersalz',
        descriptionEn: 'Steamed green soybeans sprinkled with sea salt',
        price: 5.00,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      }
    ]
  },
  {
    id: 'soups',
    titleDe: 'Suppen',
    titleEn: 'Soups',
    items: [
      {
        code: 'T1',
        nameDe: 'Miso Suppe',
        nameEn: 'Miso Soup',
        descriptionDe: 'Japanische Sojabohnensuppe mit Tofu und Seetang',
        descriptionEn: 'Traditional Japanese soybean broth with tofu and seaweed',
        price: 4.20,
        isVegetarian: true
      },
      {
        code: 'T2',
        nameDe: 'Yasai Suppe',
        nameEn: 'Yasai Soup',
        descriptionDe: 'Klare Gemüsesuppe mit Tofu und frischem Gemüse',
        descriptionEn: 'Clear vegetable broth with tofu and fresh vegetables',
        price: 5.20,
        isVegetarian: true,
        isVegan: true
      },
      {
        code: 'T3',
        nameDe: 'Meeresfrüchte Suppe',
        nameEn: 'Seafood Soup',
        descriptionDe: 'Kräftige Suppe mit gemischten Meeresfrüchten und Gemüse',
        descriptionEn: 'Savory broth with mixed seafood and vegetables',
        price: 5.80
      },
      {
        code: 'T4',
        nameDe: 'Pikante Suppe',
        nameEn: 'Hot & Sour Soup',
        descriptionDe: 'Pikant-säuerliche Suppe mit Hühnerfleisch und Ei',
        descriptionEn: 'Spicy and sour soup with chicken and egg',
        price: 5.80,
        isSpicy: true
      }
    ]
  },
  {
    id: 'maki',
    titleDe: 'Maki',
    titleEn: 'Maki',
    items: [
      {
        code: 'M1',
        nameDe: 'Kappa Maki',
        nameEn: 'Kappa Maki',
        descriptionDe: 'Gurken-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Cucumber roll (6 pcs | 12 pcs)',
        price: 5.20,
        priceLarge: 9.20,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        code: 'M2',
        nameDe: 'Avocado Maki',
        nameEn: 'Avocado Maki',
        descriptionDe: 'Avocado-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Avocado roll (6 pcs | 12 pcs)',
        price: 5.20,
        priceLarge: 9.20,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        code: 'M3',
        nameDe: 'Sake Maki',
        nameEn: 'Sake Maki',
        descriptionDe: 'Lachs-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Salmon roll (6 pcs | 12 pcs)',
        price: 5.70,
        priceLarge: 9.90,
        isGlutenFree: true
      },
      {
        code: 'M4',
        nameDe: 'Tekka Maki',
        nameEn: 'Tekka Maki',
        descriptionDe: 'Thunfisch-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Tuna roll (6 pcs | 12 pcs)',
        price: 5.90,
        priceLarge: 10.90,
        isGlutenFree: true
      },
      {
        code: 'M5',
        nameDe: 'Ebi Maki',
        nameEn: 'Ebi Maki',
        descriptionDe: 'Garnelen-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Shrimp roll (6 pcs | 12 pcs)',
        price: 5.90,
        priceLarge: 10.50,
        isGlutenFree: true
      },
      {
        code: 'M6',
        nameDe: 'Oshinko Maki',
        nameEn: 'Oshinko Maki',
        descriptionDe: 'Rettich-Rolle (6 Stk. | 12 Stk.)',
        descriptionEn: 'Pickled radish roll (6 pcs | 12 pcs)',
        price: 5.20,
        priceLarge: 9.00,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        code: 'M7',
        nameDe: 'Maki Mix',
        nameEn: 'Maki Mix',
        descriptionDe: 'Gemischte Maki-Platte (18 Stk.: 6 Gurke, 6 Avocado, 6 Lachs)',
        descriptionEn: 'Assorted maki platter (18 pcs: 6 cucumber, 6 avocado, 6 salmon)',
        price: 14.50
      }
    ]
  },
  {
    id: 'specials',
    titleDe: 'Sushi Specials',
    titleEn: 'Sushi Specials',
    items: [
      {
        code: 'SC1',
        nameDe: 'Panierte Futo Maki',
        nameEn: 'Deep-Fried Futo Maki',
        descriptionDe: 'Panierte dicke Rolle gefüllt mit Ebi Tempura, Avocado und Paprika (10 Stk.)',
        descriptionEn: 'Crispy deep-fried big roll filled with tempura prawn, avocado, and bell pepper (10 pcs)',
        price: 13.50
      },
      {
        code: 'SC2',
        nameDe: 'Spicy Tuna Roll',
        nameEn: 'Spicy Tuna Roll',
        descriptionDe: 'Thunfisch, Koriander, Avocado und scharfe Sauce (8 Stk.)',
        descriptionEn: 'Tuna, coriander, avocado, topped with a spicy sauce (8 pcs)',
        price: 13.50,
        isSpicy: true
      },
      {
        code: 'SC3',
        nameDe: 'Rainbow Roll',
        nameEn: 'Rainbow Roll',
        descriptionDe: 'Surimi und Avocado innen, außen belegt mit verschiedenen Fischsorten (8 Stk.)',
        descriptionEn: 'Surimi and avocado inside, wrapped with assorted fresh fish varieties on the outside (8 pcs)',
        price: 13.50
      },
      {
        code: 'SC4',
        nameDe: 'Sake Philadelphia Gunkan',
        nameEn: 'Salmon Philadelphia Gunkan',
        descriptionDe: 'Schiffchen-Maki mit Lachs und Frischkäse (6 Stk.)',
        descriptionEn: 'Gunkan style sushi filled with minced salmon and cream cheese (6 pcs)',
        price: 14.00
      }
    ]
  },
  {
    id: 'rolls',
    titleDe: 'Rolls (8 Stk.)',
    titleEn: 'Rolls (8 pcs)',
    items: [
      {
        code: 'R1',
        nameDe: 'Sake California Roll',
        nameEn: 'Sake California Roll',
        descriptionDe: 'Lachs, Avocado, Surimi, Masago (Tobiko)',
        descriptionEn: 'Salmon, avocado, surimi, coated with Tobiko fish roe',
        price: 11.50
      },
      {
        code: 'R2',
        nameDe: 'Lachs Sesam Roll',
        nameEn: 'Salmon Sesame Roll',
        descriptionDe: 'Lachs, Avocado, Sesam',
        descriptionEn: 'Salmon, avocado, coated with toasted sesame seeds',
        price: 10.20
      },
      {
        code: 'R3',
        nameDe: 'Cream Cheese Roll',
        nameEn: 'Cream Cheese Roll',
        descriptionDe: 'Lachs, Avocado, Frischkäse',
        descriptionEn: 'Salmon, avocado, and creamy cream cheese',
        price: 11.00
      },
      {
        code: 'R4',
        nameDe: 'Bonsai Roll',
        nameEn: 'Bonsai Roll',
        descriptionDe: 'Lachs, Avocado, Masago',
        descriptionEn: 'Salmon, avocado, topped with capelin roe (masago)',
        price: 12.50
      },
      {
        code: 'R5',
        nameDe: 'Dragon Roll',
        nameEn: 'Dragon Roll',
        descriptionDe: 'Knusprige Ente, Jungzwiebel, Avocado, Aalsauce',
        descriptionEn: 'Crispy duck, green onion, avocado, finished with eel sauce',
        price: 13.00
      },
      {
        code: 'R6',
        nameDe: 'Kamo Roll',
        nameEn: 'Kamo Roll',
        descriptionDe: 'Knusprige Ente, Jungzwiebel, Teriyakisauce',
        descriptionEn: 'Crispy duck, green onion, drizzled with sweet teriyaki sauce',
        price: 11.20
      },
      {
        code: 'R7',
        nameDe: 'Mikado Roll',
        nameEn: 'Mikado Roll',
        descriptionDe: 'Surimi, gemischtes Gemüse',
        descriptionEn: 'Surimi crab stick and mixed crunchy vegetables',
        price: 10.00
      },
      {
        code: 'R8',
        nameDe: 'Beetroot Roll',
        nameEn: 'Beetroot Roll',
        descriptionDe: 'Avocado, Gurke, Oshinko (Rettich), rote Rüben',
        descriptionEn: 'Avocado, cucumber, pickled radish, wrapped in red beetroot',
        price: 12.20,
        isVegetarian: true,
        isVegan: true
      },
      {
        code: 'R9',
        nameDe: 'Mango Roll',
        nameEn: 'Mango Roll',
        descriptionDe: 'Frische Mango, Avocado, Frischkäse',
        descriptionEn: 'Sweet fresh mango, avocado, and cream cheese',
        price: 12.50,
        isVegetarian: true
      },
      {
        code: 'R10',
        nameDe: 'Ebi Tempura Roll',
        nameEn: 'Ebi Tempura Roll',
        descriptionDe: 'Knusprig panierte Garnele, Blattsalat, Spicy Mayo',
        descriptionEn: 'Crispy fried tempura prawn, green salad, spicy mayonnaise',
        price: 11.90,
        isSpicy: true
      }
    ]
  },
  {
    id: 'nigiri-sashimi',
    titleDe: 'Nigiri & Sashimi',
    titleEn: 'Nigiri & Sashimi',
    items: [
      {
        code: 'S1',
        nameDe: 'Sake Nigiri Set',
        nameEn: 'Salmon Nigiri Set',
        descriptionDe: 'Lachs Nigiri und Maki (Klein: 8 Stk. | Groß: 12 Stk. + Maki)',
        descriptionEn: 'Salmon nigiri set with maki rolls (Small: 8 pcs | Large: 12 pcs + maki)',
        price: 14.90,
        priceLarge: 25.00
      },
      {
        code: 'S2',
        nameDe: 'Flamed Sake Nigiri',
        nameEn: 'Flamed Salmon Nigiri',
        descriptionDe: 'Leicht flambiertes Lachs Nigiri (8 Stk.)',
        descriptionEn: 'Seared/flamed salmon nigiri (8 pcs) with chef sauce',
        price: 15.50
      },
      {
        code: 'S3',
        nameDe: 'Unagi Nigiri',
        nameEn: 'Unagi Nigiri',
        descriptionDe: 'Gegrilltes Aal Nigiri mit Unagi Sauce (8 Stk.)',
        descriptionEn: 'Grilled eel (unagi) nigiri with sweet eel sauce (8 pcs)',
        price: 14.80
      },
      {
        code: 'S4',
        nameDe: 'Sushi Mix Klein',
        nameEn: 'Sushi Mix Small',
        descriptionDe: 'Auswahl von 6 Nigiri und 3 Maki',
        descriptionEn: 'Assorted platter of 6 nigiri pieces and 3 maki rolls',
        price: 13.50
      },
      {
        code: 'S5',
        nameDe: 'Sushi Mix Mittel',
        nameEn: 'Sushi Mix Medium',
        descriptionDe: 'Auswahl von 8 Nigiri und 3 Maki',
        descriptionEn: 'Assorted platter of 8 nigiri pieces and 3 maki rolls',
        price: 15.50
      },
      {
        code: 'S6',
        nameDe: 'Sushi Mix Groß',
        nameEn: 'Sushi Mix Large',
        descriptionDe: 'Auswahl von 10 Nigiri und 3 Maki',
        descriptionEn: 'Assorted platter of 10 nigiri pieces and 3 maki rolls',
        price: 17.50
      },
      {
        code: 'S7',
        nameDe: 'Sake Sashimi',
        nameEn: 'Salmon Sashimi',
        descriptionDe: 'Fein geschnittener roher Lachs (Klein: 9 Scheiben | Groß: 15 Scheiben)',
        descriptionEn: 'Thick slices of fresh raw salmon (Small: 9 slices | Large: 15 slices)',
        price: 17.00,
        priceLarge: 23.00,
        isGlutenFree: true
      },
      {
        code: 'S8',
        nameDe: 'Sashimi Mix Klein',
        nameEn: 'Sashimi Mix Small',
        descriptionDe: 'Gemischte rohe Fischscheiben (8 Scheiben)',
        descriptionEn: 'Assorted raw fish sashimi (8 slices)',
        price: 13.50,
        isGlutenFree: true
      },
      {
        code: 'S9',
        nameDe: 'Sashimi Mix Groß',
        nameEn: 'Sashimi Mix Large',
        descriptionDe: 'Gemischte rohe Fischscheiben (12 Scheiben)',
        descriptionEn: 'Assorted raw fish sashimi (12 slices)',
        price: 18.50,
        isGlutenFree: true
      },
      {
        code: 'S10',
        nameDe: 'Vegan Sushi Set',
        nameEn: 'Vegan Sushi Set',
        descriptionDe: 'Auswahl an 6 veganen Nigiri und 6 veganen Maki',
        descriptionEn: 'Assorted platter of 6 vegan nigiri and 6 vegan maki rolls',
        price: 11.50,
        isVegetarian: true,
        isVegan: true
      }
    ]
  },
  {
    id: 'signatures',
    titleDe: 'Kaido Signature',
    titleEn: 'Kaido Signatures',
    items: [
      {
        code: 'K1',
        nameDe: 'Sushi Chef Platte',
        nameEn: 'Sushi Chef Platter',
        descriptionDe: 'Exklusive Zusammenstellung des Sushi-Chefs (Für 1 Person | Für 2 Personen)',
        descriptionEn: 'Exclusive custom-curated platter from the chef (For 1 person | For 2 people)',
        price: 27.50,
        priceLarge: 52.00
      },
      {
        code: 'K2',
        nameDe: "Kaido's Signature Roll",
        nameEn: "Kaido's Signature Roll",
        descriptionDe: 'Knuspriges Hühnerfleisch, cremige Guacamole, getoppt mit feinen Kartoffelfäden',
        descriptionEn: 'Crispy fried chicken, creamy house guacamole, topped with crispy potato strings',
        price: 17.80
      },
      {
        code: 'K3',
        nameDe: 'Spicy Volcano Roll',
        nameEn: 'Spicy Volcano Roll',
        descriptionDe: 'Zweifach Tempura Garnele, Gurke, außen Lachs, Röstzwiebeln, Masago und Spicy Mayo',
        descriptionEn: 'Double tempura prawn, cucumber, wrapped with salmon, crunchy fried onions, roe, and spicy mayo',
        price: 17.80,
        isSpicy: true
      }
    ]
  },
  {
    id: 'mains',
    titleDe: 'Hauptspeisen',
    titleEn: 'Main Dishes',
    items: [
      {
        code: 'H1',
        nameDe: 'Bulgogi Beef',
        nameEn: 'Bulgogi Beef',
        descriptionDe: 'Mariniertes zartes Rindfleisch nach koreanischer Art, mit Zwiebeln und Sesam. Inkl. Reis',
        descriptionEn: 'Tender marinated Korean style beef wok-fried with onions and sesame. Served with rice',
        price: 16.50
      },
      {
        code: 'H2',
        nameDe: 'Black Pepper Beef',
        nameEn: 'Black Pepper Beef',
        descriptionDe: 'Rindfleisch mit Broccoli und Zwiebeln in einer aromatischen schwarzen Pfeffersauce. Inkl. Reis',
        descriptionEn: 'Beef wok-fried with broccoli and onions in a black pepper sauce. Served with rice',
        price: 15.50,
        isSpicy: true
      },
      {
        code: 'H3',
        nameDe: 'Thai Basil Beef',
        nameEn: 'Thai Basil Beef',
        descriptionDe: 'Gebratenes Rindfleisch mit Gemüse in scharfer thailändischer Basilikumsauce. Inkl. Reis',
        descriptionEn: 'Wok-fried beef with mixed vegetables in a hot Thai basil sauce. Served with rice',
        price: 15.50,
        isSpicy: true
      },
      {
        code: 'H5',
        nameDe: 'Chop Suey Chicken',
        nameEn: 'Chop Suey Chicken',
        descriptionDe: 'Hühnerfleisch mit einer bunten Auswahl an knackigem, frischem Gemüse. Inkl. Reis',
        descriptionEn: 'Stir-fried chicken slices with an assortment of fresh wok vegetables. Served with rice',
        price: 13.50
      },
      {
        code: 'H6',
        nameDe: 'Red or Green Curry Chicken',
        nameEn: 'Red / Green Curry Chicken',
        descriptionDe: 'Hühnerfleisch mit frischem Gemüse in roter oder grüner Kokos-Curry-Sauce. Inkl. Reis',
        descriptionEn: 'Chicken and fresh vegetables simmered in spicy red or green coconut curry. Served with rice',
        price: 13.50,
        isSpicy: true
      },
      {
        code: 'H7',
        nameDe: 'Sweet Thai Duck',
        nameEn: 'Sweet Thai Duck',
        descriptionDe: 'Knusprig gebackene Ente auf buntem Gemüse mit süß-scharfer thailändischer Sauce. Inkl. Reis',
        descriptionEn: 'Crispy fried duck served over mixed vegetables with a sweet and spicy Thai sauce. Served with rice',
        price: 15.50,
        isSpicy: true
      },
      {
        code: 'H8',
        nameDe: 'Chop Suey Duck',
        nameEn: 'Chop Suey Duck',
        descriptionDe: 'Knusprig gebackene Ente mit gebratenem frischem Gemüse. Inkl. Reis',
        descriptionEn: 'Crispy duck served with fresh wok-fried mixed vegetables. Served with rice',
        price: 15.50
      },
      {
        code: 'H9',
        nameDe: 'Sake Teriyaki',
        nameEn: 'Salmon Teriyaki',
        descriptionDe: 'Gegrilltes Lachsfilet mit frischem Saisongemüse und süßer Teriyakisauce. Inkl. Reis',
        descriptionEn: 'Grilled salmon fillet served with fresh seasonal vegetables and sweet teriyaki glaze. Served with rice',
        price: 16.00
      },
      {
        code: 'H10',
        nameDe: 'Cashew Shrimps',
        nameEn: 'Cashew Shrimps',
        descriptionDe: 'Gebratene Riesengarnelen mit Gemüse und gerösteten Cashewnüssen. Inkl. Reis',
        descriptionEn: 'Wok-fried king prawns with crunchy vegetables and roasted cashew nuts. Served with rice',
        price: 15.50
      },
      {
        code: 'H12',
        nameDe: 'Yasai Wok',
        nameEn: 'Yasai Wok',
        descriptionDe: 'Knackig gebratenes Gemüse mit Tofuwürfeln in pikanter Sojasauce. Inkl. Reis',
        descriptionEn: 'Crispy stir-fried vegetables and tofu cubes in savory soy sauce. Served with rice',
        price: 12.50,
        isVegetarian: true,
        isVegan: true
      },
      {
        code: 'H13',
        nameDe: 'Red or Green Curry Vegetables',
        nameEn: 'Red / Green Curry Veggies',
        descriptionDe: 'Frisches Gemüse und Tofu in cremiger roter oder grüner Kokos-Curry-Sauce. Inkl. Reis',
        descriptionEn: 'Seasonal vegetables and tofu cubes simmered in spicy red or green coconut curry. Served with rice',
        price: 13.00,
        isSpicy: true,
        isVegetarian: true,
        isVegan: true
      }
    ]
  },
  {
    id: 'soups-rice-noodles',
    titleDe: 'Pho, Reis & Nudeln',
    titleEn: 'Pho, Rice & Noodles',
    items: [
      {
        code: 'PH1',
        nameDe: 'Pho mit Rindfleisch',
        nameEn: 'Pho Beef Soup',
        descriptionDe: 'Traditionelle vietnamesische Rindsuppe mit Reisbandnudeln, zartem Rindfleisch, frischem Koriander, Minze und Frühlingszwiebeln',
        descriptionEn: 'Traditional Vietnamese beef broth soup with flat rice noodles, tender beef slices, coriander, mint, and green onions',
        price: 15.50
      },
      {
        code: 'G1',
        nameDe: 'Gebratene Reis / Nudeln (Huhn)',
        nameEn: 'Fried Rice / Noodles (Chicken)',
        descriptionDe: 'Gebratener Reis oder Nudeln mit Hühnerfleisch, Ei, Karotten, Zwiebeln und Sojasprossen',
        descriptionEn: 'Wok-fried rice or egg noodles with chicken, egg, carrots, onions, and bean sprouts',
        price: 12.90
      },
      {
        code: 'G2',
        nameDe: 'Gebratene Reis / Nudeln (Ente)',
        nameEn: 'Fried Rice / Noodles (Duck)',
        descriptionDe: 'Gebratener Reis oder Nudeln mit knuspriger Ente, Ei, Karotten, Zwiebeln und Sojasprossen',
        descriptionEn: 'Wok-fried rice or egg noodles topped with crispy duck, egg, carrots, onions, and bean sprouts',
        price: 13.90
      },
      {
        code: 'G3',
        nameDe: 'Gebratene Reis / Nudeln (Shrimps)',
        nameEn: 'Fried Rice / Noodles (Shrimp)',
        descriptionDe: 'Gebratener Reis oder Nudeln mit Shrimps, Ei, Karotten, Zwiebeln und Sojasprossen',
        descriptionEn: 'Wok-fried rice or egg noodles with prawns, egg, carrots, onions, and bean sprouts',
        price: 13.90
      },
      {
        code: 'G4',
        nameDe: 'Gebratene Reis / Nudeln (Gemüse)',
        nameEn: 'Fried Rice / Noodles (Veg)',
        descriptionDe: 'Gebratener Reis oder Nudeln mit frischem Gemüse, Tofu, Ei (optional vegan), Karotten, Zwiebeln und Sprossen',
        descriptionEn: 'Wok-fried rice or egg noodles with mixed vegetables, tofu, egg (optional vegan option), carrots, and sprouts',
        price: 11.90,
        isVegetarian: true
      }
    ]
  },
  {
    id: 'donburi-bento',
    titleDe: 'Donburi & Bento',
    titleEn: 'Donburi & Bento',
    items: [
      {
        code: 'D1',
        nameDe: 'Katsu Don',
        nameEn: 'Katsu Don',
        descriptionDe: 'Gebackenes Hühnerfilet auf Reis mit geschlagenem Ei, Zwiebeln und süßer japanischer Sauce',
        descriptionEn: 'Crispy fried chicken cutlet cooked with egg and onions in a sweet soy dashi sauce over rice',
        price: 13.50
      },
      {
        code: 'D2',
        nameDe: 'Gyu Don',
        nameEn: 'Gyu Don',
        descriptionDe: 'Dünn geschnittenes Rindfleisch mit Zwiebeln, geschmort in einer süßen Sojasauce auf Reis',
        descriptionEn: 'Thinly sliced beef simmered with onions in a sweet savory soy-dashi broth served over rice',
        price: 13.90
      },
      {
        code: 'D3',
        nameDe: 'Kaisen Don',
        nameEn: 'Kaisen Don',
        descriptionDe: 'Bunte Auswahl an feinen Scheiben rohen Fischs (Sashimi-Stil) auf gewürztem Sushi Reis',
        descriptionEn: 'Assortment of fresh sliced raw fish (sashimi-style) beautifully arranged on seasoned sushi rice',
        price: 13.90
      },
      {
        code: 'BT1',
        nameDe: 'Yasai Bento',
        nameEn: 'Yasai Bento',
        descriptionDe: 'Wok-Gemüse mit Tofu, 4 Stk. Maki, Reis. Inklusive Miso-Suppe und frischem Obst',
        descriptionEn: 'Stir-fried vegetables with tofu, 4 pcs maki rolls, and rice. Includes Miso soup and fresh fruit',
        price: 13.50,
        isVegetarian: true
      },
      {
        code: 'BT2',
        nameDe: 'Bulgogi Bento',
        nameEn: 'Bulgogi Bento',
        descriptionDe: 'Koreanisches mariniertes Rindfleisch, 4 Stk. Maki, Reis. Inklusive Miso-Suppe und frischem Obst',
        descriptionEn: 'Korean marinated bulgogi beef, 4 pcs maki rolls, and rice. Includes Miso soup and fresh fruit',
        price: 15.90
      },
      {
        code: 'BT3',
        nameDe: 'Sake Bento',
        nameEn: 'Salmon Bento',
        descriptionDe: 'Gegrillter Lachs in Teriyakisauce, 4 Stk. Maki, Reis. Inklusive Miso-Suppe und frischem Obst',
        descriptionEn: 'Grilled salmon fillet in teriyaki glaze, 4 pcs maki rolls, and rice. Includes Miso soup and fresh fruit',
        price: 15.50
      },
      {
        code: 'BT4',
        nameDe: 'Agamo Bento',
        nameEn: 'Duck Bento',
        descriptionDe: 'Knusprige Ente mit Gemüse, 4 Stk. Maki, Reis. Inklusive Miso-Suppe und frischem Obst',
        descriptionEn: 'Crispy fried duck, stir-fried vegetables, 4 pcs maki rolls, and rice. Includes Miso soup and fresh fruit',
        price: 15.50
      },
      {
        code: 'BT5',
        nameDe: 'Sushi Bento',
        nameEn: 'Sushi Bento',
        descriptionDe: 'Sushi Box mit 4 Stk. Sashimi, 4 Stk. Nigiri und 4 Stk. Maki. Inklusive Miso-Suppe und frischem Obst',
        descriptionEn: 'Assorted box with 4 pcs sashimi, 4 pcs nigiri, and 4 pcs maki. Includes Miso soup and fresh fruit',
        price: 15.50
      }
    ]
  },
  {
    id: 'bowls',
    titleDe: 'Poké Bowls',
    titleEn: 'Poké Bowls',
    items: [
      {
        code: 'P1',
        nameDe: 'Sake Bowl',
        nameEn: 'Salmon Poké Bowl',
        descriptionDe: 'Frischer roher Lachs, Edamame, Avocado, Mango, Gurken, Masago auf Sushi Reis mit hausgemachter Sauce',
        descriptionEn: 'Fresh raw salmon cubes, edamame, avocado, mango, cucumber, and roe on sushi rice with signature house sauce',
        price: 12.50
      },
      {
        code: 'P2',
        nameDe: 'Bulgogi Bowl',
        nameEn: 'Bulgogi Poké Bowl',
        descriptionDe: 'Koreanisch mariniertes Rindfleisch, Paprika, Gurken, Oshinko, Sesam auf warmem Reis mit japanischer Sauce',
        descriptionEn: 'Korean marinated beef, bell pepper, cucumber, pickled radish, sesame on warm rice with savory sauce',
        price: 13.50
      },
      {
        code: 'P3',
        nameDe: 'Vegan Bowl',
        nameEn: 'Vegan Poké Bowl',
        descriptionDe: 'Edamame, Avocado, Paprika, Mango, Gurken, Oshinko auf Sushi Reis mit süßlicher Teriyakisauce',
        descriptionEn: 'Edamame, avocado, bell pepper, mango, cucumber, pickled radish on sushi rice with sweet teriyaki glaze',
        price: 10.90,
        isVegetarian: true,
        isVegan: true
      }
    ]
  },
  {
    id: 'desserts-sides',
    titleDe: 'Nachspeisen & Beilagen',
    titleEn: 'Desserts & Sides',
    items: [
      {
        code: 'DS1',
        nameDe: 'Apfel Gyoza',
        nameEn: 'Apple Gyoza',
        descriptionDe: 'Knusprig gebackene süße Teigtaschen gefüllt mit Apfelstücken (5 Stk.)',
        descriptionEn: 'Crispy fried sweet dumplings filled with caramelized apple chunks (5 pcs)',
        price: 6.20,
        isVegetarian: true
      },
      {
        code: 'DS2',
        nameDe: 'Mochi (1 Stk.)',
        nameEn: 'Mochi (1 pc)',
        descriptionDe: 'Japanischer Reiskuchen aus Klebreis mit Füllung: Rote Bohnen (Anko), Grüner Tee (Matcha) oder Melone',
        descriptionEn: 'Traditional Japanese sweet rice cake filled with: Red bean paste, Green tea, or Melon flavor',
        price: 2.20,
        isVegetarian: true,
        isGlutenFree: true
      },
      {
        code: 'B1',
        nameDe: 'Jasmin Reis',
        nameEn: 'Jasmine Rice',
        descriptionDe: 'Gekochter Jasmin Duftreis',
        descriptionEn: 'Steamed fragrant jasmine rice',
        price: 3.50,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        code: 'B2',
        nameDe: 'Sushi Reis',
        nameEn: 'Sushi Rice',
        descriptionDe: 'Gewürzter, gekühlter Sushireis',
        descriptionEn: 'Sweetened and seasoned sushi rice',
        price: 3.90,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true
      },
      {
        code: 'B3',
        nameDe: 'Gebratener Eierreis',
        nameEn: 'Fried Egg Rice',
        descriptionDe: 'Gebratener Reis mit Ei, Karotten, Sojasprossen und Zwiebeln',
        descriptionEn: 'Stir-fried rice with egg, carrots, bean sprouts, and onions',
        price: 6.50,
        isVegetarian: true
      },
      {
        code: 'B4',
        nameDe: 'Gebratene Nudeln',
        nameEn: 'Fried Noodles',
        descriptionDe: 'Gebratene Nudeln mit Ei, Karotten, Sojasprossen und Zwiebeln',
        descriptionEn: 'Stir-fried egg noodles with carrots, bean sprouts, and onions',
        price: 6.50,
        isVegetarian: true
      }
    ]
  },
  {
    id: 'drinks',
    titleDe: 'Getränke',
    titleEn: 'Drinks',
    items: [
      {
        code: 'DR1',
        nameDe: 'Jasmin Tee / Grüner Tee / Genmai Tee',
        nameEn: 'Jasmine / Green / Genmai Tea',
        descriptionDe: 'Heißer japanischer/asiatischer Tee (Kännchen)',
        descriptionEn: 'Freshly brewed hot tea pot',
        price: 4.50
      },
      {
        code: 'DR2',
        nameDe: 'Sake (Warm / Kalt) 0,1l',
        nameEn: 'Sake (Warm / Cold) 0.1l',
        descriptionDe: 'Traditioneller japanischer Reiswein (14.5% Vol)',
        descriptionEn: 'Traditional Japanese rice wine (14.5% Vol)',
        price: 6.00
      },
      {
        code: 'DR3',
        nameDe: 'Weißer Spritzer 1/4l',
        nameEn: 'Weißer Spritzer 1/4l',
        descriptionDe: 'Weißwein mit Soda aufgespritzt',
        descriptionEn: 'White wine diluted with soda water',
        price: 4.50
      },
      {
        code: 'DR4',
        nameDe: 'Grüner Veltliner / Zweigelt 1/8l',
        nameEn: 'Austrian House Wine 1/8l',
        descriptionDe: 'Landwein Weiß (2021) oder Rotwein Zweigelt Carnuntum (2020)',
        descriptionEn: 'Quality white wine (2021) or red wine (Zweigelt, 2020)',
        price: 4.80
      },
      {
        code: 'DR5',
        nameDe: 'Lycheesaft 0,35l',
        nameEn: 'Lychee Juice 0.35l',
        descriptionDe: 'Asiatischer Lycheesaft pur (Spritzer mit Soda/Wasser: 0.25l € 4.20 | 0.5l € 4.90)',
        descriptionEn: 'Sweet lychee juice pure (or mixed with soda/water: 0.25l € 4.20 | 0.5l € 4.90)',
        price: 3.90
      },
      {
        code: 'DR6',
        nameDe: 'Aloe Vera Saft 0,5l',
        nameEn: 'Aloe Vera Juice 0.5l',
        descriptionDe: 'Erfrischendes Aloe Vera Getränk',
        descriptionEn: 'Refreshing sweet aloe vera juice',
        price: 4.50
      },
      {
        code: 'DR7',
        nameDe: 'Coca Cola / Zero 0,33l',
        nameEn: 'Coca Cola / Zero 0.33l',
        descriptionDe: 'Flasche',
        descriptionEn: 'Bottle',
        price: 4.50
      },
      {
        code: 'DR8',
        nameDe: 'Fanta / Almdudler 0,33l',
        nameEn: 'Fanta / Almdudler 0.33l',
        descriptionDe: 'Flasche',
        descriptionEn: 'Bottle',
        price: 4.50
      },
      {
        code: 'DR9',
        nameDe: 'Römerquelle 0,33l / 0,75l',
        nameEn: 'Römerquelle Mineral Water',
        descriptionDe: 'Prickelnd oder Still (Klein € 3.20 | Groß € 6.70)',
        descriptionEn: 'Sparkling or still mineral water (Small € 3.20 | Large € 6.70)',
        price: 3.20
      },
      {
        code: 'DR10',
        nameDe: 'Asahi / Kirin Ichiban / Tsing Tao 0,33l',
        nameEn: 'Asian Beers 0.33l',
        descriptionDe: 'Japanisches Premium Lager / Japanischer Klassiker / Chinesisches Lager',
        descriptionEn: 'Premium Japanese lager / Classic dry Japanese beer / Chinese lager',
        price: 4.80 // Note: Kirin Ichiban is 5.10, we will set base as 4.80 or specify
      }
    ]
  }
];

export interface LunchItem {
  number: number;
  nameDe: string;
  nameEn: string;
  descriptionDe: string;
  descriptionEn: string;
  price: number;
}

export const lunchMenu: LunchItem[] = [
  {
    number: 1,
    nameDe: 'Reisnudel Salat mit Tofu',
    nameEn: 'Rice Noodle Salad with Tofu',
    descriptionDe: 'Reisnudeln, frisches Gemüse, Tofu, Koriander und Minze (Wahlweise mit Rind, Ente oder Shrimps: +€ 1,50)',
    descriptionEn: 'Rice noodles, fresh veggies, tofu, coriander, and mint (Options with beef, duck, or prawns: +€ 1.50)',
    price: 10.90
  },
  {
    number: 2,
    nameDe: 'Red Curry Chicken mit Reis',
    nameEn: 'Red Curry Chicken with Rice',
    descriptionDe: 'Zartes Hühnerfleisch und frisches Gemüse in rotem Kokos-Curry mit Reis',
    descriptionEn: 'Tender chicken and fresh vegetables cooked in red coconut curry, served with rice',
    price: 11.90
  },
  {
    number: 3,
    nameDe: 'Black Pepper Beef mit Reis',
    nameEn: 'Black Pepper Beef with Rice',
    descriptionDe: 'Rindfleisch und frisches Gemüse in pikanter schwarzer Pfeffer-Sauce mit Reis',
    descriptionEn: 'Wok-fried beef and fresh vegetables in a savory black pepper sauce, served with rice',
    price: 12.90
  },
  {
    number: 4,
    nameDe: 'Special Roll (8 Stk.)',
    nameEn: 'Special Roll (8 pcs)',
    descriptionDe: 'Flambierter Lachs auf Ebi Tempura Rolle mit würziger Spicy-Mayo-Sauce',
    descriptionEn: 'Seared salmon on top of tempura prawn rolls with rich spicy mayo',
    price: 12.90
  },
  {
    number: 5,
    nameDe: 'Sake Set',
    nameEn: 'Sake Set Bento Box',
    descriptionDe: 'Sushi-Kombination aus 4 Stk. Sashimi, 4 Stk. Nigiri und 4 Stk. Maki',
    descriptionEn: 'Beautiful sushi assortment of 4 pcs sashimi, 4 pcs nigiri, and 4 pcs maki rolls',
    price: 12.90
  },
  {
    number: 6,
    nameDe: 'Sake Bowl oder Vegan Bowl',
    nameEn: 'Salmon Poké Bowl / Vegan Bowl',
    descriptionDe: 'Sake: Roher Lachs, Avocado, Gurke, Bohnen, Sushi-Reis, Haussauce (€ 11.90) | Vegan: Bohnen, Oshinko, Paprika, Mango, Gurke, Sushi-Reis, Teriyakisauce (€ 10.90)',
    descriptionEn: 'Sake: Raw salmon, avocado, cucumber, edamame, sushi rice, house sauce (€ 11.90) | Vegan: Edamame, pickled radish, bell pepper, mango, cucumber, sushi rice, teriyaki (€ 10.90)',
    price: 11.90 // We will handle price toggles in UI
  },
  {
    number: 7,
    nameDe: 'Gebratene Nudeln mit Hühnerfleisch',
    nameEn: 'Fried Noodles with Chicken',
    descriptionDe: 'Eiernudeln gebraten mit Hühnerfleisch, Ei, Karotten, Zwiebeln und Sprossen',
    descriptionEn: 'Wok-fried egg noodles with chicken, egg, carrots, onions, and bean sprouts',
    price: 11.90
  },
  {
    number: 8,
    nameDe: 'Gebratener Reis mit Hühnerfleisch',
    nameEn: 'Fried Rice with Chicken',
    descriptionDe: 'Eierreis gebraten mit Hühnerfleisch, Ei, Karotten, Zwiebeln und Sprossen',
    descriptionEn: 'Wok-fried egg rice with chicken, egg, carrots, onions, and bean sprouts',
    price: 11.90
  }
];
