import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/"); // go to tasks page
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
