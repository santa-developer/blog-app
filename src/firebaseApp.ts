// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export let app: FirebaseApp;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}
// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);

// export default firebase;

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
