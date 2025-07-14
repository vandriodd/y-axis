import { AuthContext } from "@/providers/context";
import { useContext } from "react";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return {
    currentUser: context.currentUser,
    isLoading: context.isLoading,
    signIn: context.signIn,
    signOut: context.signOut,
    signUp: context.signUp,
  };
}
