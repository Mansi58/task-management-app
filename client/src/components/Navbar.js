import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav>
      <h3>Task Manager</h3>
      {token && <button onClick={logoutHandler}>Logout</button>}
    </nav>
  );
}

export default Navbar;

