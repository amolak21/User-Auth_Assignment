import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        username,
        email,
        password,
      });
      setEmail("");
      setUsername("");
      setPassword("");
      setMessage(response.data.msg);
    } catch (e) {
      console.log(e);
      const errorMsg =
        e.response?.data?.msg ||
        e.response?.data?.errors[0].msg ||
        "Error registering user";
      console.error(errorMsg);
      alert(errorMsg);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setMessage("");
          }}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <button className="button" type="submit">
          Register
        </button>
        <br />
        <p>{message}</p>
        Already a User? {<Link to="/login">Login</Link>}
      </form>
    </div>
  );
}
export default Register;
