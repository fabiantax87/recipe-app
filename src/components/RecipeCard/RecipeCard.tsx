import "./RecipeCard.scss";

type RecipeCardProps = {
  recipe: any;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <div className="recipe-img">
        <img src={recipe.recipeImage} alt="recipe" />
      </div>
      <div className="recipe-content">
        <p className="recipe-title">{recipe.name}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
