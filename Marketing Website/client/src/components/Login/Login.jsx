import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/login";
import style from "../Login/login.module.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', email, password)
    try {
      const credentials = { email, password };
      const response = await loginService.login(credentials);
      console.log("Login successful:", response);
      localStorage.setItem("userEmail", email);
      if (response.token) {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        console.error("Token not received");
        setErrorMessage("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <form className={style.container} action="" onSubmit={handleLogin}>
        <div className={style.containerParrafo}>
          email
          <input
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className={style.containerParrafo}>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
