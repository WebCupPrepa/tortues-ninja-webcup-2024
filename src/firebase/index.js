import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const realfirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:521344449514:web:ef87caf6e6d23d8b6f9093",
};

// const initApp = initializeApp(firebaseConfig);
const initApp = initializeApp(realfirebaseConfig);
const db = getFirestore(initApp);
const database = getDatabase(initApp);
const storage = getStorage(initApp);
const auth = getAuth(initApp);

export { db, storage, auth, database };
