export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: TypeProduct;
  gender: Categorie;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity:number;
  size: Size;
  images: string;
}

export type Categorie = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type TypeProduct = "shirts" | "pants" | "hoodies" | "hats";
