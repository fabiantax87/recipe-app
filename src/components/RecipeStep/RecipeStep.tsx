import "./RecipeStep.scss";

type RecipeStepProps = {
  index: number;
  recipeStepItem: any;
};

const RecipeStep = ({ index, recipeStepItem }: RecipeStepProps) => {
  return (
    <div className="recipe-step-item">
      <span>{index + 1}.</span>
      <p>{recipeStepItem}</p>
    </div>
  );
};

export default RecipeStep;
