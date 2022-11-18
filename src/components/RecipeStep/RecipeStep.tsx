import "./RecipeStep.scss";

type RecipeStepProps = {
  index: number;
  recipeStepItem: any;
  recipeStepList: Array<any>;
  setRecipeStepList: Function;
};

const RecipeStep = ({ index, recipeStepItem, recipeStepList, setRecipeStepList }: RecipeStepProps) => {
  const deleteRecipeStep = () => {
    const tempArray = [...recipeStepList];
    tempArray.splice(index, 1);

    setRecipeStepList(tempArray);
  };

  return (
    <div className="recipe-step-item">
      <div className="content">
        <span>{index + 1}.</span>
        <p>{recipeStepItem}</p>
      </div>
      <svg onClick={(e) => deleteRecipeStep()} viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  );
};

export default RecipeStep;
