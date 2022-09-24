import { useNavigate } from "react-router-dom";
import { logOut } from "../../firebase/firebase-config";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="home">
      <div className="buttons">
        <button onClick={() => navigate("dinner")}>Dinner</button>
        <button onClick={() => navigate("lunch")}>Lunch</button>
        <button onClick={() => navigate("breakfast")}>Breakfast</button>
      </div>

      <button onClick={(e) => logOut()}>Log out</button>
    </div>
  );
};

export default Home;
