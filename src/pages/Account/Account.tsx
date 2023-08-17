import { auth, logout } from "../../firebase/firebase-actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      Account
      <button onClick={(e) => logout()}>Log out</button>
    </div>
  );
};

export default Account;
