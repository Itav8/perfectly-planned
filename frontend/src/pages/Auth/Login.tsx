import { useEffect } from "react";
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
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        authDomain: import.meta.env.VITE_GOOGLE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_GOOGLE_AUTH_PROJECT_ID,
        storageBucket: import.meta.env.VITE_GOOGLE_AUTH_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_GOOGLE_AUTH_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_GOOGLE_AUTH_APP_ID,
        measurementId: import.meta.env.VITE_GOOGLE_AUTH_MEASUREMENT_ID,
      };
      console.log(firebaseConfig);
      const app = firebase.initializeApp(firebaseConfig);
      // check if firebaseui instance already exists
      let ui = firebaseui.auth.AuthUI.getInstance();
      // if not, create a new one
      if (!ui) ui = new firebaseui.auth.AuthUI(app.auth());

      ui.start("#firebaseui-auth-container", {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          },
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      });
    };

    setupAuth();
  }, []);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};
