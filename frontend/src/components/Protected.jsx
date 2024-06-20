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
  return (
    <div>
      <h2>{message}</h2>
      <p>
        Sign in as new user <Link to="/login"> Login</Link>
      </p>
    </div>
  );
}
export default Protected;
