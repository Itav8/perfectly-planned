import { createContext, useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseApp } from "./firebaseConfig";

interface AuthContextState {
  isLoggedIn: boolean;
  userId: string | null;
  userData: firebase.User | null;
  setAuthState?: (authState: AuthContextState) => void;
}

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  userId: null,
  userData: null,
  setAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // here is where we will do all our logic for checking if the user is logged in
  const [authContextState, setAuthContextState] = useState<AuthContextState>({
    isLoggedIn: false,
    userId: null,
    userData: null,
  });

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          setAuthContextState({
            isLoggedIn: true,
            userId: user.uid,
            userData: user,
          });
        } else {
          setAuthContextState({
            isLoggedIn: false,
            userId: null,
            userData: null,
          });
        }
      },
      (error) => {
        console.log("Error firebase auth", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const providerValue = {
    ...authContextState,
    setAuthState: setAuthContextState,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
