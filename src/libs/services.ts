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
  limit?: string;
  skip?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const products = {
  get: ({ search, ...rest }: ProductDTO) => {
    const params = new URLSearchParams(rest);

    const url = search
      ? `/product/search?q=${search}&${params.toString()}`
      : `/product?${params.toString()}`;

    return clientApi.get<Product[]>(url);
  },
};
