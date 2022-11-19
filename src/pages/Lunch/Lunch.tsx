import { collection, where, query, getDocs } from "@firebase/firestore";
import { db } from "../../firebase/firebase-actions";
import { useEffect, useState } from "react";
import RecipeList from "components/RecipeList/RecipeList";
import "./Lunch.scss";

const Lunch = () => {
  const [lunchRecipes, setLunchRecipes] = useState([]);

  const getLunchRecipes = async () => {
    try {
      const q = query(collection(db, "recipes"), where("recipeType.lunch", "==", true));
      await getDocs(q).then((docs: any) => {
        setLunchRecipes(docs.docs.map((doc: any) => ({ ...doc.data() })));
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLunchRecipes();
  }, []);

  return (
    <div className="lunch-container">
      <RecipeList recipeList={lunchRecipes} />
    </div>
  );
};

export default Lunch;
