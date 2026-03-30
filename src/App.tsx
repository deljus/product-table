import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SignInPage } from "@/pages/sign-in";
import { DashboardPage } from "@/pages/dashboard";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={DashboardPage} />
        <Route path="/sign-in" Component={SignInPage} />
      </Routes>
    </BrowserRouter>
  );
}
