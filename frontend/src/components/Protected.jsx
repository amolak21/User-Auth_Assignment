import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Protected() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/protected",
          {
            withCredentials: true,
          }
        );
        setMessage(response.data.msg);
      } catch (err) {
        console.log(err);
        const errorMsg = err.response?.data?.msg || "Something went wrong";
        alert(errorMsg);
        setMessage(errorMsg);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  async function handleLogout() {
    try {
      const response = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      alert(response.data.msg);
      navigate("/login");
    } catch (err) {
      console.log("error logging out", err);
    }
  }

  return (
    <div className="bg-slate-600 h-screen flex flex-col items-center justify-center">
      <div className="font-bold text-4xl mb-4">{message}</div>
      <div className="text-white ">
        Sign in as new user:{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="absolute top-10 right-20 w-50 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Logout
      </button>
    </div>
  );
}
export default Protected;
