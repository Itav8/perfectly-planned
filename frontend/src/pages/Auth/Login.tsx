import { useEffect } from "react";
import { firebaseApp } from "../../hooks/useAuth/firebaseConfig";
// needs firebase(v9) compat to work with firebase ui
import firebase from "firebase/compat/app";
// needs to be imported like this to work with ESM (es modules)
import * as firebaseui from "firebaseui";
import "firebase/compat/auth";
// default firebaseui styles
import "firebaseui/dist/firebaseui.css";
import "./Login.css";

export const Login = () => {
  useEffect(() => {
    const setupAuth = () => {
      // check if firebaseui instance already exists
      let ui = firebaseui.auth.AuthUI.getInstance();
      // if not, create a new one
      if (!ui) {
         ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
      }

      const uiConfig: firebaseui.auth.Config = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            console.log("Sign in Success Auth Result", authResult);
            console.log("Sign in Success Redirect URL", redirectUrl);
            // Boolean determines if we should redirect after successful login
            return false;
          },
        },
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      };

      ui.start("#firebaseui-auth-container", uiConfig);
    };

    setupAuth();
  }, []);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div id="firebaseui-auth-container" />
    </div>
  );
};
