import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      navigate("/login");
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
    <div className="bg-slate-600 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h2 className="font-bold text-4xl py-6">Register</h2>
          <form onSubmit={handleRegister}>
            <input
              className="w-full px-2 py-1 border rounded border-slate-200"
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
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <input
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <button
              className="button w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              type="submit"
            >
              Register
            </button>
            <br />
            <p>{message}</p>
            Already a User?{" "}
            {
              <Link to="/login" className="underline">
                Login
              </Link>
            }
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
