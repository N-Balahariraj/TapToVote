import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Config/fb.config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;