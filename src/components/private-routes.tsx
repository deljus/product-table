import { Navigate, Outlet, useLocation } from "react-router-dom";
import * as TokenStorage from "@/libs/token-storage";

type Props = {
  redirectTo: string;
};

export function PrivateRoutes({ redirectTo }: Props) {
  const location = useLocation();

  const isAuthenticated = TokenStorage.hasToken();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={redirectTo}
      replace
      state={{ from: location }}
    />
  );
}
