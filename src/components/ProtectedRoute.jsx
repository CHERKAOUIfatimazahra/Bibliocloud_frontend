import React from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
