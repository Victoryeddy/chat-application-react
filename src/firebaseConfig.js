// firebase.js
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFunctions, /*connectFunctionsEmulator */} from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth /*signInWithEmailAndPassword */} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);


export { firebaseApp, db, auth, functions };
