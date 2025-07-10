import { useContext, type ReactNode } from "react";
import { AuthContext } from "../providers/context";
import { Redirect } from "wouter";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const authContext = useContext(AuthContext);

  if (!authContext.isLoading && !authContext.currentUser) {
    return <Redirect to="/login" />;
  }

  return children;
}
