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
      <svg viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  );
};

export default RecipeStep;
