import RecipeStep from "components/RecipeStep/RecipeStep";
import "./RecipeStepList.scss";

type RecipeStepListProps = {
  recipeStepList: Array<any>;
};

const RecipeStepList = ({ recipeStepList }: RecipeStepListProps) => {
  return (
    <div className="recipe-step-list">
      {recipeStepList.map((recipeStepItem: any, index: number) => {
        return <RecipeStep key={index} recipeStepItem={recipeStepItem} index={index} />;
      })}
    </div>
  );
};

export default RecipeStepList;
