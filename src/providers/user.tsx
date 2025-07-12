import { useState, useEffect } from "react";
import {
  signIn as signInService,
  getCurrentUser,
  signOut as signOutService,
} from "../services/localStorage/auth";
import { AuthContext } from "./context";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signIn = async (username: string, password: string) => {
    console.log(username, password);

    try {
      const user = await signInService(username, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const signOut = async () => {
    try {
      await signOutService();
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
