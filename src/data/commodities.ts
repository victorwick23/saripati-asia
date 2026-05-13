export type LocaleText = { en: string; id: string };

export type CommodityItem = {
  id: string;
  name: LocaleText;
  variants?: LocaleText[];
};

export type CommodityCategory = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  items: CommodityItem[];
};

export const commodityCategories: CommodityCategory[] = [
  {
    id: "spices-roots-herbs",
    title: { en: "Spices, Roots & Herbs", id: "Rempah, Akar & Herba" },
    description: {
      en: "Premium dried spices and botanicals sourced for consistent aroma, oil content, and export-grade sorting.",
      id: "Rempah kering dan botani grade ekspor dengan aroma, kandungan minyak, dan sortasi yang konsisten.",
    },
    items: [
      { id: "turmeric", name: { en: "Turmeric (Kunyit)", id: "Kunyit" }, variants: [{ en: "Dried", id: "Kering" }] },
      { id: "galangal", name: { en: "Galangal (Laos)", id: "Laos" }, variants: [{ en: "Dried", id: "Kering" }] },
      {
        id: "ginger",
        name: { en: "Ginger (Jahe)", id: "Jahe" },
        variants: [
          { en: "Elephant Dried", id: "Jahe Gajah Kering" },
          { en: "Red", id: "Merah" },
          { en: "Emprit", id: "Emprit" },
        ],
      },
      { id: "sand-ginger", name: { en: "Sand Ginger (Kencur)", id: "Kencur" }, variants: [{ en: "Dried", id: "Kering" }] },
      {
        id: "nutmeg",
        name: { en: "Nutmeg (Pala)", id: "Pala" },
        variants: [
          { en: "AB Round", id: "AB Bulat" },
          { en: "AB Oval", id: "AB Oval" },
          { en: "SS Round", id: "SS Bulat" },
          { en: "BWP Round 6", id: "BWP Bulat 6" },
          { en: "Shell Round", id: "Shell Bulat" },
          { en: "Shell Oval Tuli", id: "Shell Oval Tuli" },
          { en: "Shell Oval Kocak", id: "Shell Oval Kocak" },
        ],
      },
      {
        id: "mace",
        name: { en: "Mace (Bunga Pala)", id: "Bunga Pala" },
        variants: [{ en: "Asalan Sulawesi", id: "Asalan Sulawesi" }],
      },
      {
        id: "pepper",
        name: { en: "Pepper (Lada)", id: "Lada" },
        variants: [
          { en: "Lampung Black (480–500 g/L)", id: "Lampung Hitam (480–500 g/L)" },
          { en: "Sulawesi White", id: "Sulawesi Putih" },
        ],
      },
      {
        id: "cinnamon",
        name: { en: "Cinnamon (Kayumanis)", id: "Kayumanis" },
        variants: [
          { en: "KA Whole", id: "KA Utuh" },
          { en: "Meniran / Small Broken", id: "Meniran / Pecah Kecil" },
          { en: "Cutting 8 cm", id: "Potongan 8 cm" },
        ],
      },
      { id: "coriander", name: { en: "Coriander (Ketumbar)", id: "Ketumbar" }, variants: [{ en: "Bulgaria", id: "Bulgaria" }] },
      {
        id: "cumin",
        name: { en: "Cumin (Jinten)", id: "Jinten" },
        variants: [{ en: "Black", id: "Hitam" }, { en: "Caraway", id: "Caraway" }],
      },
      {
        id: "clove",
        name: { en: "Clove (Cengkeh)", id: "Cengkeh" },
        variants: [{ en: "Standard", id: "Standar" }, { en: "Stem", id: "Tangkai" }],
      },
      { id: "cardamom", name: { en: "Cardamom (Kapol)", id: "Kapol" } },
      { id: "vanilla", name: { en: "Vanilla", id: "Vanili" } },
    ],
  },
  {
    id: "coconut-derivatives",
    title: { en: "Coconut & Derivatives", id: "Kelapa & Derivatif" },
    description: {
      en: "Copra, mature nuts, and high-protein coconut meal for food, feed, and industrial buyers.",
      id: "Kopra, kelapa tua, dan bungkil kelapa berprotein tinggi untuk pangan, pakan, dan industri.",
    },
    items: [
      { id: "copra", name: { en: "Copra (Kopra)", id: "Kopra" } },
      { id: "mature-coconut", name: { en: "Mature Coconut (Kelapa Tua)", id: "Kelapa Tua" } },
      {
        id: "coconut-expeller",
        name: { en: "Seed Cake / Coconut Expeller (Bungkil)", id: "Bungkil Kelapa" },
      },
    ],
  },
  {
    id: "charcoal-energy",
    title: { en: "Charcoal & Energy", id: "Arang & Energi" },
    description: {
      en: "High-calorie charcoal grades for grilling, metallurgy, and activated carbon feedstocks.",
      id: "Grade arang kalori tinggi untuk pemanggangan, metalurgi, dan bahan baku karbon aktif.",
    },
    items: [
      { id: "coconut-shell-charcoal", name: { en: "Coconut Shell Charcoal (Arang Batok)", id: "Arang Batok Kelapa" } },
      { id: "wood-charcoal", name: { en: "Wood Charcoal (Arang Kayu)", id: "Arang Kayu" } },
    ],
  },
  {
    id: "coffee-beans",
    title: { en: "Coffee Beans", id: "Biji Kopi" },
    description: {
      en: "Traceable arabica and robusta lots with screen sizing and moisture specs for roasters.",
      id: "Lot arabika dan robusta terlacak dengan ukuran screen dan spesifikasi kelembaban untuk roaster.",
    },
    items: [
      {
        id: "coffee",
        name: { en: "Coffee (Kopi)", id: "Kopi" },
        variants: [{ en: "Arabica", id: "Arabika" }, { en: "Robusta", id: "Robusta" }],
      },
    ],
  },
  {
    id: "essential-oils-aromatic",
    title: { en: "Essential Oils & Aromatic Woods", id: "Minyak Atsiri & Kayu Aromatik" },
    description: {
      en: "Patchouli oil and agarwood for fragrance, wellness, and specialty export markets.",
      id: "Minyak nilam dan gaharu untuk parfum, wellness, dan pasar ekspor spesialis.",
    },
    items: [
      { id: "patchouli-oil", name: { en: "Patchouli Oil (Minyak Nilam)", id: "Minyak Nilam" } },
      { id: "agarwood", name: { en: "Agarwood (Gaharu)", id: "Gaharu" } },
    ],
  },
  {
    id: "other-agricultural",
    title: { en: "Other Agricultural Products", id: "Produk Pertanian Lainnya" },
    description: {
      en: "Specialty produce and ingredients for food service, retail packs, and ingredient manufacturers.",
      id: "Produk dan bahan spesialis untuk food service, kemasan ritel, dan produsen bahan baku.",
    },
    items: [
      { id: "basil-seeds", name: { en: "Basil Seeds (Biji Selasih)", id: "Biji Selasih" } },
      { id: "banana-leaves", name: { en: "Banana Leaves (Daun Pisang)", id: "Daun Pisang" } },
      {
        id: "cilembu-sweet-potato",
        name: { en: "Cilembu Sweet Potato (Ubi Cilembu)", id: "Ubi Cilembu" },
      },
    ],
  },
];

export type CommodityCategoryId = (typeof commodityCategories)[number]["id"];
