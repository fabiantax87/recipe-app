import { createRecipe, storage } from "../../firebase/firebase-actions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import "./CreateRecipeModal.scss";
import GroceryList from "components/GroceryList/GroceryList";
import RecipeStepList from "components/RecipeStepList/RecipeStepList";
import { useNavigate } from "react-router-dom";

const CreateRecipeModal = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImg, setRecipeImg] = useState<any>([]);
  const [recipeDesc, setRecipeDesc] = useState("");
  const [groceryList, setGroceryList] = useState<any>([]);
  const [groceryItem, setGroceryItem] = useState("");
  const [recipeStepList, setRecipeStepList] = useState<any>([]);
  const [recipeStep, setRecipeStep] = useState("");
  const [estimateTime, setEstimateTime] = useState({ value: 0, timeType: "minutes", timeTypeShort: "min" });
  const [estimateCalories, setEstimateCalories] = useState(0);
  const [recipeType, setRecipeType] = useState({ breakfast: false, lunch: false, dinner: false });

  let navigate = useNavigate();

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
    setRecipeType({ breakfast: !recipeType.breakfast, lunch: recipeType.lunch, dinner: recipeType.dinner });
  };

  const toggleLunch = () => {
    setRecipeType({ breakfast: recipeType.breakfast, lunch: !recipeType.lunch, dinner: recipeType.dinner });
  };

  const toggleDinner = () => {
    setRecipeType({ breakfast: recipeType.breakfast, lunch: recipeType.lunch, dinner: !recipeType.dinner });
  };

  const estimateTimeTypeChange = (timeType: any) => {
    if (timeType === "minutes") {
      setEstimateTime({ value: estimateTime.value, timeType: "minutes", timeTypeShort: "min" });
    } else if (timeType === "hours") {
      setEstimateTime({ value: estimateTime.value, timeType: "hours", timeTypeShort: "h" });
    }
  };

  const submitRecipe = async (e: any) => {
    e.preventDefault();

    const imgRef = ref(storage, `recipe-images/${recipeImg.name + v4()}`);
    await uploadBytes(imgRef, recipeImg).then(() => {
      getDownloadURL(imgRef)
        .then((url) => {
          if (recipeType.breakfast === false && recipeType.lunch === false && recipeType.dinner === false) {
            alert("Not all fields have been filled, try again");
          } else {
            if (recipeName !== "" && groceryList.length > 0 && recipeStepList.length > 0 && recipeImg.name) {
              createRecipe(recipeName, url, recipeDesc, groceryList, recipeStepList, estimateTime, estimateCalories, recipeType);
            } else {
              alert("Not all fields have been filled, try again");
            }
          }
        })
        .then(() => {
          navigate("/");
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
          <svg onClick={() => navigate("/")} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </header>
        <div className="modal-content">
          <form className="basic-info-form">
            <label>Recipe name</label>
            <input type="text" placeholder="Give your recipe a name" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />

            <div className="file-input">
              <label>Recipe picture</label>
              <label htmlFor="file-upload" className="custom-file-upload">
                <svg className="upload-icon" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                {recipeImg.name ? <p>{recipeImg.name}</p> : <p>Add a picture</p>}
              </label>
              <input type="file" onChange={(e: any) => setRecipeImg(e.target.files[0])} id="file-upload" accept="image/png, image/jpeg" />
            </div>

            <label>Recipe description</label>
            <textarea placeholder="Description" value={recipeDesc} onChange={(e) => setRecipeDesc(e.target.value)} />
          </form>

          <form onSubmit={(e) => addGrocery(e)} className="modal-form">
            <label>Grocery list</label>
            <div className="grocery-list-input">
              <input type="text" placeholder="Grocery name" value={groceryItem} onChange={(e) => setGroceryItem(e.target.value)} />
              <button onClick={(e) => addGrocery(e)}>Add</button>
            </div>
            {groceryList.length > 0 ? <GroceryList groceryList={groceryList} setGroceryList={setGroceryList} /> : <></>}
          </form>

          <form onSubmit={(e) => addRecipeStep(e)} className="modal-form">
            <label>Recipe steps</label>
            <div className="recipe-step-input">
              <input type="text" placeholder="Step description" value={recipeStep} onChange={(e) => setRecipeStep(e.target.value)} />
              <button onClick={(e) => addRecipeStep(e)}>Add</button>
            </div>
            {recipeStepList.length > 0 ? <RecipeStepList recipeStepList={recipeStepList} setRecipeStepList={setRecipeStepList} /> : <></>}
          </form>

          <label>Estimate time to make</label>
          <div className="estimate-time">
            <input
              type="number"
              placeholder="Estimate time"
              min={0}
              value={estimateTime.value}
              onChange={(e) => setEstimateTime({ value: parseInt(e.target.value), timeType: estimateTime.timeType, timeTypeShort: estimateTime.timeTypeShort })}
            />
            <select onChange={(e) => estimateTimeTypeChange(e.target.value)} name="time">
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>

          <label>Estimate amount of calories</label>
          <input type="number" placeholder="Estimate calories" min={0} value={estimateCalories} onChange={(e) => setEstimateCalories(parseInt(e.target.value))} />

          <div className="recipe-type">
            <label>Recipe type</label>
            <label className="recipe-check">
              <input type="checkbox" name="breakfast" onChange={() => toggleBreakfast()} />
              Breakfast
            </label>
            <label className="recipe-check">
              <input type="checkbox" name="lunch" onChange={() => toggleLunch()} />
              Lunch
            </label>
            <label className="recipe-check">
              <input type="checkbox" name="dinner" onChange={() => toggleDinner()} />
              Dinner
            </label>
          </div>
        </div>
        <footer className="modal-footer">
          <button className="create-btn" onClick={(e) => submitRecipe(e)}>
            Create Recipe
          </button>
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateRecipeModal;
