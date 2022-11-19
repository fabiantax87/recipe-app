import { collection, where, query, getDocs } from "@firebase/firestore";
import { db } from "../../firebase/firebase-actions";
import { useEffect, useState } from "react";
import RecipeList from "components/RecipeList/RecipeList";
import "./Dinner.scss";

const Dinner = () => {
  const [dinnerRecipes, setDinnerRecipes] = useState([]);

  const getDinnerRecipes = async () => {
    try {
      const q = query(collection(db, "recipes"), where("recipeType.dinner", "==", true));
      await getDocs(q).then((docs: any) => {
        console.log(docs.docs.map((doc: any) => doc.data()));
        setDinnerRecipes(docs.docs.map((doc: any) => ({ ...doc.data() })));
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDinnerRecipes();
  }, []);

  return (
    <div className="dinner-container">
      <RecipeList recipeList={dinnerRecipes} />
    </div>
  );
};

export default Dinner;
