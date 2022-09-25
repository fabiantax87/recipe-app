import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.scss";

const Home = () => {
  const [user] = useAuthState(auth);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="home">
      <div className="buttons">
        <button onClick={() => navigate("breakfast")}>Breakfast</button>
        <button onClick={() => navigate("lunch")}>Lunch</button>
        <button onClick={() => navigate("dinner")}>Dinner</button>
      </div>

      <button onClick={(e) => logout()}>Log out</button>
    </div>
  );
};

export default Home;
