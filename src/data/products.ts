import { getAssetSrc } from "@/lib/assetPath";

export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  detailsKey: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes?: string[]; // <-- ADDED: Optional sizes array
  /** Maps each `colors` entry (hex or paired `hex|hex`) to a `{id}-{slug}.png` filename in `src/assets` */
  colorNames?: { [hex: string]: string };
}

export const products: Product[] = [
  {
    id: "rose",
    nameKey: "product.rose.name",
    descKey: "product.rose.desc",
    detailsKey: "product.rose.details", 
    price: 349.99,
    image: getAssetSrc("ROSE.jpg"),
    category: "Sets",
    colors: ["#B87333", "#E5E5E5", "#1A1A1A"], 
  },
  {
    id: "lara",
    nameKey: "product.lara.name",
    descKey: "product.lara.desc",
    detailsKey: "product.lara.details",
    price: 249.99,
    image: getAssetSrc("LARA.jpg"),
    category: "Sets",
    colors: ["#B87333", "#E5E5E5"],
  },
  {
    id: "asil",
    nameKey: "product.asil.name",
    descKey: "product.asil.desc",
    detailsKey: "product.asil.details",
    price: 399.99,
    image: getAssetSrc("ASIL.png"),
    category: "Sets",
    colors: ["#B87333", "#E5E5E5", "#1A1A1A"],
  },
  {
    id: "pot-set",
    nameKey: "product.pot-set.name",
    descKey: "product.pot-set.desc",
    detailsKey: "product.pot-set.details",
    price: 129.99,
    image: getAssetSrc("POT-set.png"),
    category: "Sets",
    colors: ["#E5E5E5", "#1A1A1A"],
    sizes: ["24cm", "26cm", "30cm"],
  },
  {
    id: "pan-set",
    nameKey: "product.pan-set.name",
    descKey: "product.pan-set.desc",
    detailsKey: "product.pan.details",
    price: 89.99,
    image: getAssetSrc("PAN.jpg"),
    category: "Sets",
    colors: ["#1A1A1A", "#B87333"],
    sizes: ["20cm", "24cm", "28cm"],
  },
  // SINGULAR ITEMS
  {
    id: "pot",
    nameKey: "product.pot.name",
    descKey: "product.pot.desc",
    detailsKey: "product.pot.details",
    price: 49.99,
    image: getAssetSrc("pot-purple.png"),
    category: "Pots",
    colors: ["#5B4075", "#6B2D37", "#224DA1", "#2D4F44"],
    sizes: ["18cm", "20cm", "24cm", "28cm", "32cm"],
    colorNames: {
      "#5B4075": "purple",
      "#6B2D37": "burgundy",
      "#224DA1": "blue",
      "#2D4F44": "green",
    },
  },
  {
    id: "milk-pot",
    nameKey: "product.milk-pot.name",
    descKey: "product.milk-pot.desc",
    detailsKey: "product.milk-pot.details",
    price: 69.99,
    image: getAssetSrc("milk-pot-purple.png"),
    category: "Pots",
    colors: ["#5B4075", "#6B2D37", "#224DA1", "#2D4F44"],
    sizes: ["16cm"],
    colorNames: {
      "#5B4075": "purple",
      "#6B2D37": "burgundy",
      "#224DA1": "blue",
      "#2D4F44": "green",
    },
  },
  {
    id: "grill-pan",
    nameKey: "product.grill-pan.name",
    descKey: "product.grill-pan.desc",
    detailsKey: "product.grill-pan.details",
    price: 89.99,
    image: getAssetSrc("grill-pan-purple.png"),
    category: "Pans",
    colors: ["#5B4075", "#6B2D37", "#224DA1", "#2D4F44"],
    sizes: ["28cm"],
    colorNames: {
      "#5B4075": "purple",
      "#6B2D37": "burgundy",
      "#224DA1": "blue",
      "#2D4F44": "green",
    },
  },
  {
    id: "pan",
    nameKey: "product.pan.name",
    descKey: "product.pan.desc",
    detailsKey: "product.pan.details",
    price: 54.99,
    image: getAssetSrc("pan-purple.png"),
    category: "Pans",
    colors: ["#5B4075", "#6B2D37", "#224DA1", "#2D4F44"],
    sizes: ["20cm", "24cm", "28cm"],
    colorNames: {
      "#5B4075": "purple",
      "#6B2D37": "burgundy",
      "#224DA1": "blue",
      "#2D4F44": "green",
    },
  },
  
];