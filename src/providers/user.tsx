import { useState, useEffect } from "react";
import {
  signIn as signInService,
  getCurrentUser,
  signOut as signOutService,
  signUp as signUpService,
  getUserData as getUserDataService,
  saveProfileData as saveProfileDataService,
} from "../services/localStorage/auth";
import { AuthContext } from "./context";
import type { UserWithData } from "@/lib/types";

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

  const signUp = async (user: UserWithData) => {
    try {
      const newUser = await signUpService(user);
      setCurrentUser(newUser?.username || null);
      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getUserData = async () => {
    try {
      const user = await getUserDataService();
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const saveProfileData = async () => {
    try {
      await saveProfileDataService();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signIn,
        signOut,
        signUp,
        getUserData,
        saveProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
