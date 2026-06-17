import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
