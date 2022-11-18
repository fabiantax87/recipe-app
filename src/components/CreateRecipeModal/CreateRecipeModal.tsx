import { createRecipe, storage } from "../../firebase/firebase-actions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import "./CreateRecipeModal.scss";
import GroceryList from "components/GroceryList/GroceryList";
import RecipeStepList from "components/RecipeStepList/RecipeStepList";

type CreateRecipeModalProps = {
  switchModalOpen: any;
};

const CreateRecipeModal = ({ switchModalOpen }: CreateRecipeModalProps) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImg, setRecipeImg] = useState<any>([]);
  const [groceryList, setGroceryList] = useState<any>([]);
  const [groceryItem, setGroceryItem] = useState("");
  const [recipeStepList, setRecipeStepList] = useState<any>([]);
  const [recipeStep, setRecipeStep] = useState("");
  const [mealType, setMealType] = useState({ breakfast: false, lunch: false, dinner: false });

  const addGrocery = (e: any) => {
    e.preventDefault();
    if (groceryItem !== "") {
      setGroceryList([...groceryList, groceryItem]);
    }
    setGroceryItem("");
  };

  const addRecipeStep = (e: any) => {
    e.preventDefault();
    if (recipeStep !== "") {
      setRecipeStepList([...recipeStepList, recipeStep]);
    }
    setRecipeStep("");
  };

  const toggleBreakfast = () => {
    setMealType({ breakfast: !mealType.breakfast, lunch: mealType.lunch, dinner: mealType.dinner });
  };

  const toggleLunch = () => {
    setMealType({ breakfast: mealType.breakfast, lunch: !mealType.lunch, dinner: mealType.dinner });
  };

  const toggleDinner = () => {
    setMealType({ breakfast: mealType.breakfast, lunch: mealType.lunch, dinner: !mealType.dinner });
  };

  const submitRecipe = async (e: any) => {
    e.preventDefault();

    const imgRef = ref(storage, `recipe-images/${recipeImg.name + v4()}`);
    await uploadBytes(imgRef, recipeImg).then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          if (mealType.breakfast === false && mealType.lunch === false && mealType.dinner === false) {
            alert("Not all fields have been filled, try again");
          } else {
            if (recipeName !== "" && groceryList.length > 0 && recipeStepList.length > 0 && recipeImg.name) {
              createRecipe(recipeName, groceryList, recipeStepList, url, mealType);
            } else {
              alert("Not all fields have been filled, try again");
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <header className="modal-header">
          <h3>Create a recipe</h3>
          <svg onClick={() => switchModalOpen()} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </header>
        <div className="modal-content">
          <label>Recipe name</label>
          <input type="text" placeholder="Give your recipe a name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <label>Meal picture</label>
          <input type="file" onChange={(e: any) => setRecipeImg(e.target.files[0])} accept="image/png, image/jpeg" />
          <form onSubmit={(e) => addGrocery(e)} className="modal-form">
            <label>Grocery list</label>
            <div className="grocery-list-input">
              <input type="text" placeholder="Grocery name" value={groceryItem} onChange={(e) => setGroceryItem(e.target.value)} />
              <button onClick={(e) => addGrocery(e)}>Add</button>
            </div>
            <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} />
          </form>
          <form onSubmit={(e) => addRecipeStep(e)} className="modal-form">
            <label>Recipe steps</label>
            <div className="recipe-step-input">
              <input type="text" placeholder="Step description" value={recipeStep} onChange={(e) => setRecipeStep(e.target.value)} />
              <button onClick={(e) => addRecipeStep(e)}>Add</button>
            </div>
            <RecipeStepList recipeStepList={recipeStepList} setRecipeStepList={setRecipeStepList} />
          </form>
          <div className="meal-type">
            <label className="breakfast-check">
              <input type="checkbox" name="breakfast" onChange={() => toggleBreakfast()} />
              Breakfast
            </label>
            <label className="lunch-check">
              <input type="checkbox" name="lunch" onChange={() => toggleLunch()} />
              Lunch
            </label>
            <label className="dinner-check">
              <input type="checkbox" name="dinner" onChange={() => toggleDinner()} />
              Dinner
            </label>
          </div>
        </div>
        <footer className="modal-footer">
          <button className="create-btn" onClick={(e) => submitRecipe(e)}>
            Create Recipe
          </button>
          <button className="cancel-btn" onClick={() => switchModalOpen()}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateRecipeModal;
