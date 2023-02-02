import { initializeApp } from "firebase/app";
import { getAuth, signOut, sendPasswordResetEmail, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const  apiKey =  process.env.NEXT_PUBLIC_API_KEY
const  authDomain =  process.env.NEXT_PUBLIC_AUTHdOMAIN
const  projectId =  process.env.NEXT_PUBLIC_PROJECT_ID
const  storageBucket =  process.env.NEXT_PUBLIC_STOREAGE_BUCKET
const  messagingSenderId =  process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
const  appId =  process.env.NEXT_PUBLIC_APP_ID
const  measurementId =  process.env.NEXT_PUBLIC_MEASUREMENT_ID

const firebaseConfig = {
  apiKey:apiKey,
  authDomain:authDomain,
  projectId:projectId,
  storageBucket:storageBucket,
  messagingSenderId:messagingSenderId,
  appId:appId,
  measurementId:measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider();
const github = new GithubAuthProvider();

export {auth, google,github, signOut, sendPasswordResetEmail}