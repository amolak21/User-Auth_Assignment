import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="welcome">Welcome To User Authentication</h1>
      <Link to="/register" className="button">
        Register
      </Link>
      {"  "}
      <Link to="/login" className="button">
        Login
      </Link>
    </div>
  );
}
export default Home;
