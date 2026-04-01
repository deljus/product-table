export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  images: string[]
  category: string
};