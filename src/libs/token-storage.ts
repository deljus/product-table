const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  isSesson: boolean
};

export const set = (tokens: Tokens) => {
  (tokens.isSesson ? sessionStorage : localStorage).setItem(
    TOKEN_KEY,
    JSON.stringify(tokens),
  );
};

export const hasToken = () =>
  !!(sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY));

export const get = (): Tokens | undefined => {
  if (hasToken()) {
    return JSON.parse(
      sessionStorage.getItem(TOKEN_KEY) ||
        (localStorage.getItem(TOKEN_KEY) as string),
    );
  }
};

export const clear = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY)
}
