import axios from "axios";
import * as TokenStorage from "@/libs/token-storage";

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

clientApi.interceptors.request.use((config) => {
  const tokens = TokenStorage.get();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

clientApi.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    const tokens = TokenStorage.get();

    if (error.response.status === 401 && !originalRequest._retry && tokens) {
      originalRequest._retry = true;
      try {
        const response = await clientApi.post("/auth/refresh", {
          refreshToken: tokens?.refreshToken,
        });

        TokenStorage.set({ ...response.data, isSesson: tokens?.isSesson });

        return clientApi(originalRequest);
      } catch {
        TokenStorage.clear();
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

export { clientApi };
