export type MainMenu = {
  title: string;
  to: string;
};

export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";

export type MediaFile = {
  path: string;
  type: MediaType;
};

export type ProductListItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  rate: number;
  images: MediaFile[];
};

export type Filament = {
  id: number;
  color: string;
  type: string;
};

export type ProductVariant = {
  id: number;
  filament: Filament;
  images: MediaFile[];
  price: number;
};

export type Size = {
  x: number;
  y: number;
  z: number;
};

export type Review = {
  id: number;
  user: string;
  product: string;
  rate: number;
  date: string;
  text: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  weight: number;
  size: Size;
  variants: ProductVariant[];
  rate: number;
  favorite: boolean;
  reviews: Review[];
  discount: number;
};
