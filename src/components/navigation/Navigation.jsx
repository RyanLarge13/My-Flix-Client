import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = ({ user }) => {
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/profile"></Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
