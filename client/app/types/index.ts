export type MainMenu = {
  title: string;
  to: string;
};

export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";

export type MediaFile = {
  url: string;
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
