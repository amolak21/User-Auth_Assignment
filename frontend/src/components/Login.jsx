/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setMessage(response.data.msg);
      alert("You are Signed in");
      setEmail("");
      setPassword("");
      navigate("/protected");
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.errors[0].msg ||
        "Some error has occured";
      console.error(errorMsg);
      alert(errorMsg);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handelLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit" className="button">
          Login
        </button>
      </form>
      <h4>
        Already signed in? <Link to="/protected">Go to you account</Link>
      </h4>
      <h4>
        Don't have an account? <Link to="/Register">Register here</Link>{" "}
      </h4>
      <p>{message}</p>
    </div>
  );
}
export default Login;
