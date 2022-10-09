import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home">
      <div className="buttons">
        <button onClick={() => navigate("breakfast")}>Breakfast</button>
        <button onClick={() => navigate("lunch")}>Lunch</button>
        <button onClick={() => navigate("dinner")}>Dinner</button>
      </div>
    </div>
  );
};

export default Home;
