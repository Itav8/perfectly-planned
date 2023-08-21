import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  authDomain: import.meta.env.VITE_GOOGLE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_GOOGLE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GOOGLE_AUTH_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GOOGLE_AUTH_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_GOOGLE_AUTH_APP_ID,
  measurementId: import.meta.env.VITE_GOOGLE_AUTH_MEASUREMENT_ID,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
