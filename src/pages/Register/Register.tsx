import { registerWithEmailAndPassword, auth } from "../../firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  const submitRegister = async (e: any) => {
    e.preventDefault();
    if (password === confirmPass) {
      await registerWithEmailAndPassword(username, email, password);
    } else {
      alert("Passwords do not match, try again");
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={(e) => submitRegister(e)}>
        <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" value={confirmPass} placeholder="Confirm password" onChange={(e) => setConfirmPass(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/login"}>Login instead</Link>
    </div>
  );
};

export default Register;
