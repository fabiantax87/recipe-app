import RecipeCard from "components/RecipeCard/RecipeCard";
import "./RecipeList.scss";

type RecipeListProps = {
  recipeList: Array<any>;
};

const RecipeList = ({ recipeList }: RecipeListProps) => {
  return (
    <div className="recipe-list">
      {recipeList.map((recipe: any) => {
        return <RecipeCard recipe={recipe} />;
      })}
    </div>
  );
};

export default RecipeList;
