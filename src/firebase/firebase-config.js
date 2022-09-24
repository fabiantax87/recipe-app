import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, getFirestore, collection } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqr8xDQev0hRjEYTdlqKPyL93HzZ2ovzc",
  authDomain: "recipe-app-32909.firebaseapp.com",
  projectId: "recipe-app-32909",
  storageBucket: "recipe-app-32909.appspot.com",
  messagingSenderId: "15083685829",
  appId: "1:15083685829:web:0c0f4121579902914fedac",
  measurementId: "G-FR3HQRG1PX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: name,
      email,
      savedRecipes: [],
      createdRecipes: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { analytics, auth, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
