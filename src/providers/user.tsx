import { useState, useEffect } from "react";
import {
  signIn as signInService,
  getCurrentUser,
  signOut as signOutService,
} from "../services/localstorage/auth";
import { AuthContext } from "./context";

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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

  const signIn = async (username, password) => {
    console.log(username, password);

    try {
      const user = await signInService(username, password);
      return user;
    } catch (error) {
      console.error(error);
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
