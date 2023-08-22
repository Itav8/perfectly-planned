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

const initialAuthState: AuthContextState = {
  isLoggedIn: false,
  userId: null,
  userData: null,
  setAuthState: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialAuthState);

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
          const createAccount = async () => {
            const authData = {
              email: user.email,
              uid: user.uid,
            };

            const fetchUrl = `${import.meta.env.VITE_API_URL}/account`;
            const fetchConfig = {
              method: "post",
              body: JSON.stringify(authData),
              headers: {
                "Content-Type": "application/json",
              },
            };

            try {
              const accountResponse = await fetch(fetchUrl, fetchConfig);
              if (accountResponse.ok) {
                setAuthContextState({
                  isLoggedIn: true,
                  userId: user.uid,
                  userData: user,
                });
                // Redirect user if successfully created account
                if (window.location.pathname === "/login") {
                  window.location.href = "/";
                }
              }
            } catch (e) {
              console.error("Error creating account", e);
            }
          };

          createAccount();
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
  console.log("AUTH CONTEXT STATE", authContextState);
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
