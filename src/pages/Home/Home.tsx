import CreateRecipeModal from "components/CreateRecipeModal/CreateRecipeModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  return (
    <div className="home-container">
      {modalOpen ? <CreateRecipeModal /> : <></>}
      <button className="create-recipe-btn" onClick={(e) => setModalOpen(!modalOpen)}>
        Create Recipe
      </button>
      <div className="home">
        <div className="buttons">
          <button onClick={() => navigate("breakfast")}>Breakfast</button>
          <button onClick={() => navigate("lunch")}>Lunch</button>
          <button onClick={() => navigate("dinner")}>Dinner</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
