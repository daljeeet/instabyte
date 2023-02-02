import { initializeApp } from "firebase/app";
import { getAuth, signOut, sendPasswordResetEmail, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDjNLDNt-KrmHyB8am6NTlSV-X8jlbbses",
  authDomain: "directed-sun-365908.firebaseapp.com",
  projectId: "directed-sun-365908",
  storageBucket: "directed-sun-365908.appspot.com",
  messagingSenderId: "657580500087",
  appId: "1:657580500087:web:081f5df58eb9758db2d272",
  measurementId: "G-XZTVSKKZ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export {auth, google,github, signOut, sendPasswordResetEmail}