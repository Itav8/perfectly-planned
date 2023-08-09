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
        apiKey: "AIzaSyBodTJni4xSli2NfAS3BE-DI4TK400AlEY",
        authDomain: "perfectly-planned-395119.firebaseapp.com",
        projectId: "perfectly-planned-395119",
        storageBucket: "perfectly-planned-395119.appspot.com",
        messagingSenderId: "447075764646",
        appId: "1:447075764646:web:e255b546a04501afb9e767",
        measurementId: "G-1TC4219P80",
      };

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
