import { logInWithEmailAndPassword, auth } from "../../firebase/firebase-config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";

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
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => login(e)}>
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
      </form>
      <Link to={"/register"}>Register instead</Link>
    </div>
  );
};

export default Login;
