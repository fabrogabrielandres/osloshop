import { number } from "zod";

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
  gender: Categorie;
  producStock?:ProductStock | null
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity:number;
  size: Size;
  image: string;
}

export interface ProductStock {
  id?: string;
  XS?: number;
  S?: number;
  M?: number;
  L?: number;
  XL?: number;
  XXL?: number;
  XXXL?: number;
  producStockId?: string;
}


export type Categorie = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type TypeProduct = "shirts" | "pants" | "hoodies" | "hats";
