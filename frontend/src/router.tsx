import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AppLayout from "./layouts/AuthenticatedLayout";
import UserAuthentication from "./Pages/UserAuthentication";
import Dashboard from "./Pages/Dashboard";
import type { JSX } from "react";
import PublicLayout from "./layouts/PublicLayout";
import Introduction from "./Pages/Introduction";

function Protected({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

export const router = createBrowserRouter([
  // ROTAS PÚBLICAS (layout público)
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <Introduction /> },
      { path: "/signin", element: <UserAuthentication type="signIn" /> },
      { path: "/signup", element: <UserAuthentication type="signUp" /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
    ],
  },
]);