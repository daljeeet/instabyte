import { initializeApp } from "firebase/app";
import { getAuth, signOut, sendPasswordResetEmail, GoogleAuthProvider } from "firebase/auth";

const  apiKey =  process.env.NEXT_PUBLIC_API_KEY
const  authDomain =  process.env.NEXT_PUBLIC_AUTHdOMAIN
const  projectId =  process.env.NEXT_PUBLIC_PROJECT_ID
const  storageBucket =  process.env.NEXT_PUBLIC_STOREAGE_BUCKET
const  messagingSenderId =  process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
const  appId =  process.env.NEXT_PUBLIC_APP_ID
const  measurementId =  process.env.NEXT_PUBLIC_MEASUREMENT_ID

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider, signOut, sendPasswordResetEmail}