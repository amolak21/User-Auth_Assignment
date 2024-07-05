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
    <div className="bg-slate-600 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <h1 className="font-bold text-3xl text-center p-3">Login</h1>
          <form onSubmit={handelLogin}>
            <input
              className="w-full px-2 py-2 mb-2 border rounded border-slate-200 "
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
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button
              type="submit"
              className="button w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Login
            </button>
          </form>
          <h4 className="pt-2">
            Already signed in?{" "}
            <Link to="/protected" className="underline">
              Go to you account
            </Link>
          </h4>
          <h4 className="pb-2">
            Don't have an account?{" "}
            <Link to="/Register" className="underline">
              Register here
            </Link>{" "}
          </h4>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
