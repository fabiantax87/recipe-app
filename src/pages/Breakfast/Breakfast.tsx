import RecipeList from "components/RecipeList/RecipeList";
import { db } from "../../firebase/firebase-actions";
import { collection, where, query, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

const Breakfast = () => {
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);

  const getBreakfastRecipes = async () => {
    try {
      const q = query(collection(db, "recipes"), where("recipeType.breakfast", "==", true));
      await getDocs(q).then((docs: any) => {
        console.log(docs.docs.map((doc: any) => doc.data()));
        setBreakfastRecipes(docs.docs.map((doc: any) => ({ ...doc.data() })));
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBreakfastRecipes();
  }, []);

  return (
    <div className="breakfast-container">
      <RecipeList recipeList={breakfastRecipes} />
    </div>
  );
};

export default Breakfast;
