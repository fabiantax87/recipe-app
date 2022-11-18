import RecipeStep from "components/RecipeStep/RecipeStep";
import "./RecipeStepList.scss";

type RecipeStepListProps = {
  recipeStepList: Array<any>;
  setRecipeStepList: Function;
};

const RecipeStepList = ({ recipeStepList, setRecipeStepList }: RecipeStepListProps) => {
  return (
    <div className="recipe-step-list">
      {recipeStepList.map((recipeStepItem: any, index: number) => {
        return <RecipeStep key={index} recipeStepItem={recipeStepItem} index={index} recipeStepList={recipeStepList} setRecipeStepList={setRecipeStepList} />;
      })}
    </div>
  );
};

export default RecipeStepList;
