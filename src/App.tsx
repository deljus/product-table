import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SignInPage } from "@/pages/sign-in";
import { DashboardPage } from "@/pages/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={DashboardPage} />
          <Route path="/sign-in" Component={SignInPage} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}
