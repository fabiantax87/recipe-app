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

  const submitRecipe = async (e: any) => {
    e.preventDefault();

    const imgRef = ref(storage, `recipe-images/${recipeImg.name + v4()}`);
    await uploadBytes(imgRef, recipeImg).then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          if (recipeName !== "" && groceryList.length > 0 && recipeStepList.length > 0 && url !== "") {
            createRecipe(recipeName, groceryList, recipeStepList, url);
          } else {
            alert("Not all fields have been filled, try again");
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
          <input type="text" placeholder="Recipe name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <form onSubmit={(e) => addGrocery(e)} className="modal-form">
            <label>Meal picture</label>
            <input type="file" onChange={(e: any) => setRecipeImg(e.target.files[0])} />
            <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} />
            <label>Grocery list</label>
            <div className="grocery-list-input">
              <input type="text" placeholder="Grocery name" value={groceryItem} onChange={(e) => setGroceryItem(e.target.value)} />
              <button onClick={(e) => addGrocery(e)}>Add</button>
            </div>
          </form>
          <form onSubmit={(e) => addRecipeStep(e)} className="modal-form">
            <RecipeStepList recipeStepList={recipeStepList} setRecipeStepList={setRecipeStepList} />
            <label>Recipe steps</label>
            <div className="recipe-step-input">
              <input type="text" placeholder="Step description" value={recipeStep} onChange={(e) => setRecipeStep(e.target.value)} />
              <button onClick={(e) => addRecipeStep(e)}>Add</button>
            </div>
          </form>
          <button onClick={(e) => submitRecipe(e)}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeModal;
