import { clientApi } from "@/libs/api";
import type { User, Product } from '@/types'

const expiresInMins = Number(import.meta.env.VITE_TOKEN_EXPIRED);

type LoginDTO = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const auth = {
  login: (data: LoginDTO) =>
    clientApi.post<LoginResponse>("/auth/login", { ...data, expiresInMins }),
  me: () => clientApi.get<User>("/auth/me"),
};

type ProductDTO = {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

type ProductResponce = {
    products: Product[],
    total: number, 
    skip: number, 
    limit: number
}

export const productsService = {
  get: ({ search, ...rest }: ProductDTO) => {
    const params = new URLSearchParams(rest);

    const url = search
      ? `/product/search?q=${search}&${params.toString()}`
      : `/product?${params.toString()}`;

    return clientApi.get<ProductResponce>(url);
  },
};
