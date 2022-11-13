import GroceryListItem from "components/GroceryListItem/GroceryListItem";
import RecipeStep from "components/RecipeStep/RecipeStep";
import { useState } from "react";
import "./CreateRecipeModal.scss";

const CreateRecipeModal = () => {
  const [groceryList, setGroceryList] = useState<any>([]);
  const [recipeStepList, setRecipeStepList] = useState<any>([]);
  const [groceryItem, setGroceryItem] = useState("");
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

  const submitRecipe = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Create a recipe</h3>
        </div>
        <div className="modal-content">
          <form onSubmit={(e) => addGrocery(e)} className="modal-form">
            <label>Recipe name</label>
            <input type="text" placeholder="Recipe name" />
            <label>Meal picture</label>
            <input type="file" placeholder="Recipe picture" />
            <div className="grocery-list">
              {groceryList.map((grocery: any, index: number) => {
                return <GroceryListItem grocery={grocery} index={index} />;
              })}
            </div>
            <label>Grocery list</label>
            <div className="grocery-list-input">
              <input type="text" placeholder="Grocery name" value={groceryItem} onChange={(e) => setGroceryItem(e.target.value)} />
              <button onClick={(e) => addGrocery(e)}>Add</button>
            </div>
          </form>
          <form onSubmit={(e) => addRecipeStep(e)}>
            <div className="recipe-step-list">
              {recipeStepList.map((recipeStepItem: any, index: number) => {
                return <RecipeStep recipeStepItem={recipeStepItem} index={index} />;
              })}
            </div>
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
