import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  userType,
  allowedType,
  redirectTo = "/",
  children,
}) => {
  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se o tipo de usuário não corresponder ao permitido, redireciona
  if (allowedType && userType !== allowedType) {
    return <Navigate to={redirectTo} replace />;
  }

  // Se tudo estiver correto, renderiza o conteúdo protegido
  return children;
};

export default ProtectedRoute;
