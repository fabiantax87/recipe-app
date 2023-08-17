import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, getFirestore, collection, query, where, getDocs } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const googleAuthentication = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const currUser = await getDocs(q);
    if (currUser.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        authProvider: "google",
        savedRecipes: [],
        createdRecipes: [],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

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
      authProvider: "local",
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

const createRecipe = async (recipeName, recipeImageUrl, recipeDesc, groceryList, recipeStepList, estimateTime, estimateCalories, recipeType) => {
  try {
    const user = auth.currentUser;
    const date = Date.now();

    if (user) {
      await addDoc(collection(db, "recipes"), {
        uid: user.uid,
        name: recipeName,
        recipeImage: recipeImageUrl,
        recipeDesc: recipeDesc,
        groceryList: groceryList,
        recipeSteps: recipeStepList,
        estimateTime: estimateTime,
        estimateCalories: estimateCalories,
        recipeType: recipeType,
        dateCreated: date,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export { db, analytics, auth, storage, logInWithEmailAndPassword, registerWithEmailAndPassword, logout, googleAuthentication, createRecipe };
