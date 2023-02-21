import { initializeApp } from "firebase/app";
import { getAuth, signOut, sendPasswordResetEmail, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHdOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STOREAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export {auth, google,github, signOut, sendPasswordResetEmail}