import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="create-recipe-btn" onClick={(e) => navigate("/create-recipe")}>
        Create Recipe
      </button>
      <div className="home">
        <div className="buttons">
          <button onClick={() => navigate("breakfast")}>Breakfast</button>
          <button onClick={() => navigate("lunch")}>Lunch</button>
          <button onClick={() => navigate("dinner")}>Dinner</button>
          <button onClick={() => navigate("other-recipes")}>Other</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
