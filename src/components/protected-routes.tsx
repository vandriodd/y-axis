import { Redirect } from "wouter";
import useAuthContext from "@/hooks/useAuthContext";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { currentUser, isLoading } = useAuthContext();

  if (!isLoading && !currentUser) {
    return <Redirect to="/login" />;
  }

  return children;
}
