import { logInWithEmailAndPassword, auth } from "../../firebase/firebase-config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const login = (e: any) => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      return;
    } else {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
        <Link to={"/register"}>Register instead</Link>
      </form>
    </div>
  );
};

export default Login;
